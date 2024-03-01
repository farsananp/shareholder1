from django.db import models


class Countrymas(models.Model):
    countryid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'countrymas'



class Shareamountdetails(models.Model):
    shareamountref = models.AutoField(primary_key=True)
    duration = models.SmallIntegerField(blank=True, null=True)
    amount = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True)
    paymentmode = models.CharField(max_length=20, blank=True, null=True)
    shareholderid = models.ForeignKey('Shareholders', models.DO_NOTHING, db_column='shareholderid', blank=True, null=True)
    startdate = models.DateField(blank=True, null=True)
    officestaff = models.CharField(max_length=150, blank=True, null=True)
    installmenttype = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'shareamountdetails'

class Shareamountinstallments(models.Model):
    shareamountref = models.IntegerField(primary_key=True)  # The composite primary key (shareamountref, slno) found, that is not supported. The first column is selected.
    slno = models.IntegerField()
    dueamount = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True)
    duedate = models.DateField(blank=True, null=True)
    paidamount = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True)
    status = models.CharField(max_length=1, blank=True, null=True)
    paiddate = models.DateField(blank=True, null=True)


    class Meta:
        managed = False
        db_table = 'shareamountinstallments'
        unique_together = (('shareamountref', 'slno'),)

class Shareholders(models.Model):
    shareholderid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=150, blank=True, null=True)
    mobile = models.CharField(max_length=15, blank=True, null=True)
    email = models.CharField(max_length=100, blank=True, null=True)
    country = models.ForeignKey(Countrymas, models.DO_NOTHING, db_column='country', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'shareholders'
