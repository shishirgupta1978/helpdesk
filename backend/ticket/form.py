from django.forms import ModelForm
from .models import Ticket

class CreateTicketForm(ModelForm):
    class Meta:
        model = Ticket
        fields = ['title','description']

class UpdateTicketForm(ModelForm):
    class Meta:
        model = Ticket
        fields = ['title','description']