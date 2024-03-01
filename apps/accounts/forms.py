from django import forms
from crispy_forms.helper import FormHelper


class Shareholderform(forms.Form):
	def __init__(self, *args, **kwargs):
		super(Shareholderform, self).__init__(*args, **kwargs)
		self.helper = FormHelper()
		self.helper.form_show_labels = False
	departmentname = forms.CharField(max_length=50,widget=forms.TextInput(attrs={'class':'form-control form-control-sm'}))
	active = forms.CharField(widget=forms.CheckboxInput(),required=False)
	maintenance = forms.CharField(widget=forms.CheckboxInput(),required=False)

