# from django.conf.urls import url
from django.urls import path, include
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from . import views

app_name = 'accounts'
urlpatterns = [
    path('', views.DashboardView.as_view(), name="dashboard"),
    path('get_shareholder_list', views.ShareHolderView.as_view(), name="get_shareholder_list"),
    path('add_shareholder', views.AddShareHolderView.as_view(), name="add_shareholder"),
    path('add_share_amount/', views.AddShareAmount.as_view(), name='add_share_amount'),
    path('get_share_amount_details/', views.ShareAmountView.as_view(), name='get_share_amount_details'),
    path('get_share_amount_installments/', views.ShareAmountInstallmentView.as_view(), name='get_share_amount_installments'),
    path('make_payment/', views.MakePaymentView.as_view(), name='make_payment'),
    path('share_summary', views.ShareAmountSummary.as_view(), name="share_summary"),
    path('share_summary_view', views.ShareAmountSummaryView.as_view(), name="share_summary_view"),
]
