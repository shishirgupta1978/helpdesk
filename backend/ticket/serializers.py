from rest_framework import serializers
from .models import Ticket


User = get_user_model()


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ["id", "ticket_number", "title", "description", "created_by","date_created", "assigned_to","is_resolved","accepted_date","closed_date","ticket_status"]

