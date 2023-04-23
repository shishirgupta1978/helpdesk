import datetime
from django.utils import timezone
from django.shortcuts import render,redirect
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from django.contrib import messages
from .models import Ticket
from .form import CreateTicketForm,UpdateTicketForm
from account.models import User
from django.contrib.auth.decorators import login_required
from .serializers import TicketSerializer,TicketCreateSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

#view ticket details
@login_required
def ticket_details(request,pk):
    ticket= Ticket.objects.get(pk=pk)
    t=User.objects.get(username=ticket.created_by)
    tickets_per_user=t.created_by.all()
    context={'ticket':ticket,'tickets_per_user':tickets_per_user}
    return render(request,'ticket/ticket_details.html',context)



"""For Customer"""
#creating a ticket
@login_required
def create_ticket(request):
    if request.method=="POST":
        form=CreateTicketForm(request.POST)
        if form.is_valid():
            temp = form.save(commit=False)
            temp.created_by=request.user
            temp.ticket_status="Pending"
            temp.save()
            messages.info(request, "your ticket has been successfully submitted. An engineer would be assigned soon.")
            return redirect('dashboard')
        else:
            messages.info(request, "Something went wrong. Please check form input.")
            return redirect('create-ticket')
    else:
        form = CreateTicketForm()
        context={'form':form}
        return render(request,'ticket/create_ticket.html',context)


#updating a ticket
@login_required
def update_ticket(request,pk):
    ticket=Ticket.objects.get(pk=pk)
    if not ticket.is_resolved:
        if request.method=="POST":
            form=UpdateTicketForm(request.POST,instance=ticket)
            if form.is_valid():
                form.save()
                messages.info(request, "your ticket info has been updated and all the changes are saved in the database.")
                return redirect('dashboard')
            else:
                messages.info(request, "Something went wrong. Please check form input.")
                #return redirect('create-ticket')
        else:
            form = UpdateTicketForm(instance=ticket)
            context={'form':form}
            return render(request,'ticket/update_ticket.html',context)
    else:
        messages.warning(request,"You can not make any changes.")
        return redirect('dashboard')
# viewing all created tickets

@login_required
def all_tickets(request):
    tickets= Ticket.objects.filter(created_by=request.user).order_by("-date_created")
    context={'tickets':tickets}
    return render(request,'ticket/all_tickets.html',context)


""" For Enginners"""

# view ticket queue
@login_required
def ticket_queue(request):
    tickets= Ticket.objects.filter(ticket_status='Pending')
    context={'tickets':tickets}
    return render(request,'ticket/ticket_queue.html',context)


# accept a ticket from the queue
@login_required
def accept_ticket(request,pk):
    ticket= Ticket.objects.get(pk=pk)
    ticket.assigned_to=request.user
    ticket.ticket_status="Active"
    ticket.accepted_date=datetime.datetime.now()
    ticket.save()
    messages.info(request,"Ticket has been accepted. Please resolve as soon as possible!")
    return redirect('workspace')

# close a ticket
@login_required
def close_ticket(request,pk):
    ticket= Ticket.objects.get(pk=pk)
    ticket.ticket_status="Completed"
    ticket.is_resolved=True
    ticket.closed_date=datetime.datetime.now()
    ticket.save()
    messages.info(request,"Ticket has been resolved. Thank you brilliant Support Engineer!")
    return redirect('ticket-queue')


# tickets engineer is working on
@login_required
def workplace(request):
    tickets= Ticket.objects.filter(assigned_to=request.user,is_resolved=False)
    context={'tickets':tickets}
    return render(request,'ticket/workspace.html',context)

# all closed/resolved tickets
@login_required
def all_closed_tickets(request):
    tickets= Ticket.objects.filter(assigned_to=request.user,is_resolved=True)
    context={'tickets':tickets}
    return render(request,'ticket/all_closed_tickets.html',context)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_ticket_details(request,pk):
    try:
        ticket= Ticket.objects.get(pk=pk)
    except Ticket.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    try:
        t=User.objects.get(username=ticket.created_by)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    tickets_per_user=t.created_by.all()
    ticket_serializer=TicketSerializer(ticket)
    serializer = TicketSerializer(tickets_per_user, many=True)
    return Response({'ticket':ticket_serializer.data,'tickets_per_user':serializer.data}, status=status.HTTP_200_OK)

    
    
    



"""For Customer"""
#creating a ticket
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_create_ticket(request):
    data=request.data
    data["created_by"]=request.user.pk
    data["ticket_status"]="Pending"
    print(data)
    serializer = TicketCreateSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    

@api_view(['GET','PUT'])
@permission_classes([IsAuthenticated])
def api_update_ticket(request,pk):
    if request.method=="GET":
        try:
            ticket=Ticket.objects.get(pk=pk,created_by=request.user,is_resolved=False)
            serializer = TicketSerializer(ticket)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Ticket.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method=="PUT":    
        try:
            ticket=Ticket.objects.get(pk=pk,created_by=request.user,is_resolved=False)
        except Ticket.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        try:
           
            ticket.title=request.data["title"]
            
            ticket.description=request.data["description"]
            
            ticket.save()
            
            return Response({"message":'success'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message":str(e)}, status=status.HTTP_400_BAD_REQUEST)
            
        

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_all_tickets(request):
    tickets= Ticket.objects.filter(created_by=request.user).order_by("-date_created")
    serializer = TicketSerializer(tickets, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)



""" For Enginners"""

# view ticket queue
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_ticket_queue(request):
    tickets= Ticket.objects.filter(ticket_status='Pending')
    serializer = TicketSerializer(tickets, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)



# accept a ticket from the queue
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_accept_ticket(request,pk):
    try:
        ticket= Ticket.objects.get(pk=pk)
    except Ticket.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    ticket.assigned_to=request.user
    ticket.ticket_status="Active"
    ticket.accepted_date=datetime.datetime.now(tz=timezone.utc)
    ticket.save()
    return Response({"message":"Ticket has been accepted. Please resolve as soon as possible!"},status=status.HTTP_200_OK)

# close a ticket
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_close_ticket(request,pk):
    try:
        ticket= Ticket.objects.get(pk=pk)
    except Ticket.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
   
    ticket.ticket_status="Completed"
    ticket.is_resolved=True
    ticket.closed_date=datetime.datetime.now()
    ticket.save()

    return Response({"message":"Ticket has been resolved. Thank you brilliant Support Engineer!"},status=status.HTTP_200_OK)


# tickets engineer is working on
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_workplace(request):
    tickets= Ticket.objects.filter(assigned_to=request.user,is_resolved=False)
    serializer = TicketSerializer(tickets, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# all closed/resolved tickets
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_all_closed_tickets(request):
    tickets= Ticket.objects.filter(assigned_to=request.user,is_resolved=True)
    serializer = TicketSerializer(tickets, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

