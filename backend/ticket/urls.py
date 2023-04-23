from django.urls import path
from . import views


urlpatterns=[
    path('ticket-details/<int:pk>/',views.ticket_details,name='ticket-details'),
    path('create-ticket/',views.create_ticket,name='create-ticket'),
    path('update-ticket/',views.update_ticket,name='update-ticket'),
    path('all-tickets/',views.all_tickets,name='all-tickets'),
    path('ticket-queue/',views.ticket_queue,name='ticket-queue'),
    path('accept-ticket/<int:pk>/',views.accept_ticket,name='accept-ticket'),
    path('close-ticket/<int:pk>/',views.close_ticket,name='close-ticket'),
    path('workspace/',views.workplace,name='workspace'),
    path('all-closed-tickets/',views.all_closed_tickets,name='all-closed-tickets'),

    path('api/ticket-details/<int:pk>/',views.api_ticket_details,name='api-ticket-details'),
    path('api/create-ticket/',views.api_create_ticket,name='api-create-ticket'),
    path('api/update-ticket/<int:pk>/',views.api_update_ticket,name='api-update-ticket'),
    path('api/all-tickets/',views.api_all_tickets,name='api-all-tickets'),
    path('api/ticket-queue/',views.api_ticket_queue,name='api-ticket-queue'),
    path('api/accept-ticket/<int:pk>/',views.api_accept_ticket,name='api-accept-ticket'),
    path('api/close-ticket/<int:pk>/',views.api_close_ticket,name='api-close-ticket'),
    path('api/workspace/',views.api_workplace,name='api-workspace'),
    path('api/all-closed-tickets/',views.api_all_closed_tickets,name='api-all-closed-tickets'),


]