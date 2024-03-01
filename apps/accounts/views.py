import urllib.parse
from django.shortcuts import render
from django.shortcuts import render
# from prjoecttest.settings import API_HOST
from django.views.generic import TemplateView, View
# import requests
import json
from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.http import JsonResponse
from .forms import Shareholderform
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.contrib.auth.tokens import default_token_generator
from django.template.loader import render_to_string
from django.core.mail import BadHeaderError, send_mail
from django.core.mail import EmailMessage
from django.contrib.sites.shortcuts import get_current_site
from apps.accounts.models import Shareholders, Shareamountdetails, Shareamountinstallments,Countrymas
from django.views.generic.edit import FormView
from django.http import JsonResponse
import datetime
from django.db.models import Sum
import calendar
from django.utils import timezone

# Create your views here.



# Create your views here.
class DashboardView(TemplateView):
    #index template view
    template_name = 'accounts/dashboard.html'

    def get_context_data(self, **kwargs):
        context = super(DashboardView, self).get_context_data(**kwargs)
        context['country'] = Countrymas.objects.order_by('name')
        return context


class ShareHolderView(View):
    #view to shareholder list in the grid
    def get(self, request, *args, **kwargs):
        context = {}
        data_list = list()
        result_dict = {}
        draw = request.GET.get('draw', None)
        start = int(request.GET.get('start', 0))
        tab_length = int(request.GET.get('length', 10))

        end = start + tab_length
        coloumns = {0: 'shareholderid',
                    1: 'name',
                    2: 'email',
                    3: 'mobile',
                    4: 'country__name',
                    5: ''

                    }
        str_order_by = ''
        for col_index in range(0, 4):
            col_order = request.GET.get('order[' + str(col_index) + '][column]', None)
            col_order_dir = request.GET.get('order[' + str(col_index) + '][dir]', None)
            if col_order:
                orderdir = '-' if col_order_dir == 'desc' else ''
                str_order_by = orderdir + coloumns[int(col_order)]
                break

        result_dict = {}
        queryset =Shareholders.objects.all()
        data_list = list()
        if queryset:
            for record in queryset:
                row_list = []
                buttons = ''
                iconpath = "/static/node_modules/@coreui/icons/sprites/free.svg#cil-options"
                row_list.append(record.shareholderid)
                row_list.append(record.name)
                row_list.append(record.email)
                row_list.append(record.mobile)
                row_list.append(record.country.name)
                action_btns ='<div class="d-flex"> ' \
                             '<button type="button" class="btn btn-sm  id_add_details" title="Add Share Amount" ' \
                             'data-shareholderid=" '+str(record.shareholderid)+'"><i class="fa fa-plus"></i> </button>' \
                             '<button type="button" class="btn btn_sm id_view_details" title="View Share Amount Details"' \
                             ' data-shareholderid="'+str( record.shareholderid)+'"> <i class="fa fa-eye"></i></button></div>'

                row_list.append(action_btns)
                data_list.append(row_list)
            result_dict['data'] = data_list
            result_dict['recordsTotal'] = queryset.count()
            result_dict['recordsFiltered'] = queryset.count()
            return JsonResponse(result_dict)
        result_dict['recordsTotal'] = 0
        result_dict['recordsFiltered'] = 0
        return JsonResponse(result_dict)

class  AddShareHolderView(View):

    #shareholeder create view
    def post(self, request, *args, **kwargs):
        context = {}
        name= request.POST.get('name')
        id = request.POST.get('id')
        email = request.POST.get('email')
        country = request.POST.get('country')
        if country:
            country_instance= Countrymas.objects.get(countryid=country)
        else:
            country_instance = None
        mobile = request.POST.get('mobile')
        try:
            if id:
                modelinstance = Shareholders.objects.get(shareholderid=id)
                modelinstance.name = name
                modelinstance.mobile = mobile
                modelinstance.email = email
                modelinstance.country = country_instance
                modelinstance.save()
                msg = "Updated Successfully"
            else:

                Shareholders.objects.create(name=name,
                                                mobile=mobile, country=country_instance, email=email)
                msg = "Added  Successfully"

            return JsonResponse({'STATUS': 1, 'MSG': msg})
        except:
            return JsonResponse({'STATUS':0, 'MSG':'Something went wrong'})


class AddShareAmount(FormView):
    def post(self, request, *args, **kwargs):
        try:
            # Extract form data
            # Parse form data string
            form_data_str = request.POST.get('form_data')
            form_data = urllib.parse.parse_qs(form_data_str)

            # Access duration value
            id = Shareholders.objects.get(shareholderid=form_data['share_holder_id'][0])

            share_amount_data = {
                'duration': form_data['duration'][0],
                'amount': form_data['shareAmount'][0],
                'paymentmode':form_data['paymentMode'][0],
                'startdate': datetime.datetime.strptime(form_data['startDate'][0], '%Y-%m-%d').date(),
                'officestaff':form_data['officeStaff'][0],
                'installmenttype': form_data['installmentType'][0],
                'shareholderid':id,
            }
            # Create Shareamountdetails object
            share_amount = Shareamountdetails.objects.create(**share_amount_data)

            # Extract and save installment table data
            table_data = json.loads(request.POST.get('table_data'))
            for data in table_data:
                date_obj = datetime.datetime.strptime(data['date'], '%d/%m/%Y').date()
                installment_data = {
                    'shareamountref': share_amount.shareamountref,
                    'dueamount': data['amount'],
                    'duedate': date_obj
                }
                Shareamountinstallments.objects.create(**installment_data)

            return JsonResponse({'STATUS': 1,'MSG':'Amount Added Successfully'})
        except Exception as e:
            return JsonResponse({'STATUS': 0, 'MSG': str(e)})

class ShareAmountView(View):
    #view to shareholder list in the grid
    def get(self, request, *args, **kwargs):
        context = {}
        data_list = list()
        result_dict = {}
        draw = request.GET.get('draw', None)
        start = int(request.GET.get('start', 0))
        tab_length = int(request.GET.get('length', 10))
        shareholderid=request.GET.get('share_holder_id')

        end = start + tab_length
        coloumns = {0: 'shareholderid',
                    1: 'name',
                    2: 'amount',
                    3: 'startdate',
                    4: '',
                    5: '',
                    6: '',
                    }
        str_order_by = ''
        for col_index in range(0, 4):
            col_order = request.GET.get('order[' + str(col_index) + '][column]', None)
            col_order_dir = request.GET.get('order[' + str(col_index) + '][dir]', None)
            if col_order:
                orderdir = '-' if col_order_dir == 'desc' else ''
                str_order_by = orderdir + coloumns[int(col_order)]
                break
        result_dict = {}
        queryset =Shareamountdetails.objects.filter(shareholderid=shareholderid).all()
        data_list = list()
        if queryset:
            for record in queryset:
                row_list = []
                buttons = ''
                iconpath = "/static/node_modules/@coreui/icons/sprites/free.svg#cil-options"
                paidamount = Shareamountinstallments.objects.filter(shareamountref=record.shareamountref).aggregate(
                        total_paid_amount=Sum('paidamount'))['total_paid_amount']
                if paidamount is None:
                    paidamount = 0

                balanceamount = record.amount-paidamount

                row_list.append(record.shareholderid_id)
                row_list.append(record.shareholderid.name)
                row_list.append(record.amount)
                row_list.append(record.startdate.strftime('%d/%m/%Y'))
                row_list.append(paidamount)
                row_list.append(balanceamount)
                row_list.append(record.shareamountref)
                data_list.append(row_list)
            result_dict['data'] = data_list
            result_dict['recordsTotal'] = queryset.count()
            result_dict['recordsFiltered'] = queryset.count()
            return JsonResponse(result_dict)
        result_dict['recordsTotal'] = 0
        result_dict['recordsFiltered'] = 0
        return JsonResponse(result_dict)


class ShareAmountInstallmentView(View):
    # view to shareholder list in the grid
    def get(self, request, *args, **kwargs):
        context = {}
        data_list = list()
        result_dict = {}
        draw = request.GET.get('draw', None)
        start = int(request.GET.get('start', 0))
        tab_length = int(request.GET.get('length', 10))
        shareamountref = request.GET.get('shareamountref')

        end = start + tab_length
        coloumns = {0: '',
                    1: 'dueamount',
                    2: 'duedate',
                    3: 'paidamount',
                    4: '',
                    5:'',

                    }
        str_order_by = ''
        for col_index in range(0, 4):
            col_order = request.GET.get('order[' + str(col_index) + '][column]', None)
            col_order_dir = request.GET.get('order[' + str(col_index) + '][dir]', None)
            if col_order:
                orderdir = '-' if col_order_dir == 'desc' else ''
                str_order_by = orderdir + coloumns[int(col_order)]
                break
        result_dict = {}

        data_list = list()
        if shareamountref:
            queryset = Shareamountinstallments.objects.filter(shareamountref=shareamountref).all()
            if queryset:
                for record in queryset:
                    row_list = []
                    buttons = ''
                    iconpath = "/static/node_modules/@coreui/icons/sprites/free.svg#cil-options"

                    balanceamount = record.dueamount - record.paidamount
                    if record.status == 'N':
                        button_html = '<button type="button" class="btn btn-warning">Pending</button>'
                    else:
                        button_html = '<button type="button" class="btn btn-success">Paid</button>'

                    row_list.append(button_html)
                    row_list.append(record.dueamount)
                    row_list.append(record.duedate.strftime('%m/%d/%Y'))
                    row_list.append(record.paidamount)
                    row_list.append(balanceamount)
                    if record.status == 'N':
                        payment_html = '<button type="button" data-shareamountref="'+str(record.shareamountref)+ '" data-slno="'+str(record.slno)+'" class="btn btn-primary makePayment">Make Payment</button>'
                    else:
                        payment_html = '';
                    row_list.append(payment_html)
                    data_list.append(row_list)
                result_dict['data'] = data_list
                result_dict['recordsTotal'] = queryset.count()
                result_dict['recordsFiltered'] = queryset.count()
                return JsonResponse(result_dict)
        result_dict['recordsTotal'] = 0
        result_dict['recordsFiltered'] = 0
        return JsonResponse(result_dict)


class MakePaymentView(FormView):
    def post(self, request, *args, **kwargs):
        try:
            share_amount_ref = request.POST.get('shareAmountRef')
            slno = request.POST.get('slno')

            # Update the Shareamountinstallments record
            installment = Shareamountinstallments.objects.filter(shareamountref=share_amount_ref, slno=slno)

            paidamount= installment[0].dueamount
            installment = Shareamountinstallments.objects.filter(shareamountref=share_amount_ref, slno=slno).update(paidamount = paidamount,
                                                                                                                    status = 'P',
                                                                                                                    paiddate=timezone.now().date())

            return JsonResponse({'STATUS': 1,'MSG':'Amount Added Successfully'})
        except Exception as e:
            return JsonResponse({'STATUS': 0, 'MSG': str(e)})


# Create your views here.
class ShareAmountSummary(TemplateView):
    #index template view
    template_name = 'report_summary.html'

    def get_context_data(self, **kwargs):
        context = super(ShareAmountSummary, self).get_context_data(**kwargs)
        context['country'] = Countrymas.objects.all().order_by('name')
        context['shareholders']= Shareholders.objects.all().order_by('name')
        context['today'] = datetime.datetime.now().date()
        today = timezone.now()
        context['first_day'] = today.replace(day=1)

        context['last_day'] = today.replace(day=calendar.monthrange(today.year, today.month)[1])

        return context

class ShareAmountSummaryView(View):
    # view to shareholder list in the grid
    def get(self, request, *args, **kwargs):
        context = {}
        data_list = list()
        result_dict = {}
        draw = request.GET.get('draw', None)
        start = int(request.GET.get('start', 0))
        tab_length = int(request.GET.get('length', 10))
        country = request.GET.get('country')
        shareholder = request.GET.get('shareholder')
        enddate = request.GET.get('enddate')
        startdate = request.GET.get('startdate')
        if enddate:
            enddate = datetime.datetime.strptime(enddate, "%Y-%m-%d").date()
        if startdate:
            startdate = datetime.datetime.strptime(startdate, "%Y-%m-%d").date()
        end = start + tab_length
        coloumns = {0: '',
                    1: 'dueamount',
                    2: 'duedate',
                    3: 'paidamount',
                    4: '',
                    5:'',

                    }
        str_order_by = ''
        for col_index in range(0, 4):
            col_order = request.GET.get('order[' + str(col_index) + '][column]', None)
            col_order_dir = request.GET.get('order[' + str(col_index) + '][dir]', None)
            if col_order:
                orderdir = '-' if col_order_dir == 'desc' else ''
                str_order_by = orderdir + coloumns[int(col_order)]
                break
        result_dict = {}

        data_list = list()
        queryset = Shareamountinstallments.objects.filter(duedate__lte=enddate,duedate__gte=startdate)
        if queryset:
            for record in queryset:
                shareholder_inst = Shareamountdetails.objects.filter(shareamountref=record.shareamountref).all()
                row_list = []
                balanceamount = record.dueamount - record.paidamount
                if shareholder:
                    if shareholder_inst[0].shareholderid_id ==int(shareholder):
                        countinue ='Y'
                    else:
                        countinue = 'N'

                else:
                    countinue='Y'
                if countinue == 'Y':
                    row_list.append(shareholder_inst[0].shareholderid.name)
                    row_list.append(record.duedate.strftime('%d/%m/%Y'))
                    row_list.append(record.dueamount)
                    row_list.append(record.paidamount)
                    if record.paiddate:
                        row_list.append(record.paiddate.strftime('%d/%m/%Y'))
                    else:
                        row_list.append('')
                    payment_html = '<button type="button" class="btn btn-warning ">'+str(balanceamount)+'</button>'
                    row_list.append(payment_html)
                    data_list.append(row_list)
            result_dict['data'] = data_list
            result_dict['recordsTotal'] = queryset.count()
            result_dict['recordsFiltered'] = queryset.count()
            return JsonResponse(result_dict)
        result_dict['recordsTotal'] = 0
        result_dict['recordsFiltered'] = 0
        return JsonResponse(result_dict)
