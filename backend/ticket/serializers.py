from rest_framework import serializers
from .models import Ticket
from django.contrib.auth import get_user_model
from account.serializers import UserSerializer



User = get_user_model()


class TicketSerializer(serializers.ModelSerializer):
    created_by=UserSerializer()
    assigned_to=UserSerializer()
    date_created = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")
    class Meta:
        model = Ticket
        fields = ["id", "ticket_number", "title", "description", "created_by","date_created", "assigned_to","is_resolved","accepted_date","closed_date","ticket_status"]

class TicketCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ["id", "ticket_number", "title", "description", "created_by","date_created", "assigned_to","is_resolved","accepted_date","closed_date","ticket_status"]
