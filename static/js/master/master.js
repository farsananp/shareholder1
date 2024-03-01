$(document).ready(function(){
    var datagrid_masterlist;
    var datagrid_share_amount_details;
    var datagrid_share_amount_installments;
    function loadMasterLists(){
        if(!datagrid_masterlist){
            datagrid_masterlist = $('#id_table_masterlist').DataTable({
            'order':[[ 1, 'asc' ]],
            'paging' : true,
            'lengthChange': true,
            'searching' : false,
            'ordering' : true,
            'info' : true,
            'autoWidth' : false,
            'destroy' : true,
            "processing": true,
            "serverSide": true,
            "columnDefs"  : [
                        {
                            "targets": [0],
                            "visible": false,
                            "searchable": false
                        },

                    ],
            responsive: true,
            // keys: true,
            "pageLength": 10,
            ajax: {
                url : $('#id_table_masterlist').data('url'),
                type : "GET",
    //            headers: {
    //                "X-CSRFToken": $('input[name="csrfmiddlewaretoken"]').val()
    //            },
                dataSrc: function ( response ) {
                    if(response.hasOwnProperty('STATUS')){
                        if(response.STATUS== 401){
                            error401();
                        }

                    }else{
                        return response.data;
                    }
                },
            "dataSrc": function ( response ) {
                if(response.hasOwnProperty('STATUS')){
                    if(response.STATUS== 401){
                        error401();
                    }
                }else{
                    return response.data;
                }
            },
            },

            });
        }else{
            datagrid_masterlist.ajax.url($('#id_table_masterlist').data('url')).load()
        }
    }
    loadMasterLists()
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== "") {
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
                }
            }
        }
        return cookieValue;
    }
    function showLoader(show){
        if(show){
            $("div.spanner").addClass("show");
            $("div.overlay").addClass("show");
        }else{
            $("div.spanner").removeClass("show");
            $("div.overlay").removeClass("show");
        }
    }
    function performAjaxCalls(url,ajaxdata,method,loader){
        var ajax ;
        ajax = $.ajax({
            url: url,
            type: method,
            // async: false,
            dataType: "json",
            data: ajaxdata,

            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "X-CSRFToken": getCookie("csrftoken"),  // don't forget to include the 'getCookie' function
            },beforeSend: function () {
                if(loader){
                    showLoader(true);
                }

            },
            complete: function () {
                if(loader){
                    showLoader(false);
                }
            },
            success: (data) => {
                response = data;
            },
            error: (error) => {
                console.log(error);
            }
        });
        return ajax
    }
    ////save master form
    $('#add_shareholder').on('click',function(e){
        $('#add_shareholders').modal('show')
        $('#add_shareholder_form')[0].reset;
        $('#id_name').val('');
        $('#id_email').val('');
        $('#ïd_country').val('');
        $('#id_mobile').val('');
        $('#officeStaff').val();
    });
    $('.close').on('click',function(e){
        $('#share_amount_form')[0].reset;
        $('#add_share_amount_modal').modal('hide');
        $('#installmentTableBody').empty();
    });



    //save master form
    $('#id_save_share_holder').on('click',function(e){
        if(FormValidation('add_shareholder_form')){
            performAjaxCalls($('#add_shareholder_form').data('url'),$('#add_shareholder_form').serialize(),'POST').done(function(response){
                if(response.STATUS == 1){
                    swal.fire(response.MSG);
                    $('#add_shareholders').modal('hide');
                    loadMasterLists()


                }else{
                     Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: response.MSG,
            })
                }
            })
        }
    });


    $('body').on('click', 'button.id_add_details', function(event) {
        $('#add_share_amount_modal').modal('show');
        $('#share_amount_form')[0].reset;
        $('#shareAmount').val('');
        $('#startDate').val('');
        $('#installmentType').val('');
        $('#duration').val('');
        $('#paymentMode').val('');
        $('#share_holder_id').val( $(this).data('shareholderid'))
        $('#installmentTableBody').empty();
    });
    $('#btn_cancel_master,#id_close_modal_add').on('click',function(){
        formid = $(this).closest('form').attr('id');
        $('#add_shareholders').modal('hide');
    });
    $("#installmentType,#duration,#shareAmount,#startDate").change(function() {

        var type = $('#installmentType').val();
        var duration = parseInt($("#duration").val());
        var amount = parseFloat($("#shareAmount").val());
        var paymode = $("#paymentMode").val();
        var startDate = $("#startDate").val();
        var officestaff =$("#officeStaff").val();
        if (type != '' && duration != '' && amount != 0 && paymode != null && startDate != ''&& officeStaff!= ''   ){
            if (type === 'C') {
                $("#customInstallment").css("display", "block");
                $('#installmentTableBody').empty();
            } else {
                $("#customInstallment").css("display", "none");

                    generateInstallmentDetails(duration, amount,type );
            }
        }
    });

    function generateInstallmentDetails(duration, amount, type) {
        var installmentTableBody = $("#installmentTableBody");
        $('#installmentTableBody').empty(); // Clear previous data

        var startDate = new Date($("#startDate").val());
        var totalAmount = amount;
        var emis;

        if (type == 'M') {
            emis = 12 * duration;
            var installmentAmount = totalAmount / emis;
        } else if (type == 'Q') {
            emis = 4 * duration;
            var installmentAmount = totalAmount / emis;
        } else if (type == 'H') {
            emis = 2 * duration;
            var installmentAmount = totalAmount / emis;
        } else if (type == 'Y') {
            emis = duration;
            var installmentAmount = totalAmount / emis;
        }

        for (var i = 0; i < emis; i++) {
            var currentDate = new Date(startDate); // Create a new date object for each iteration
            var row = $('<tr>');
            row.append($('<td>').text(formatDate(currentDate)));
            row.append($('<td>').text(installmentAmount.toFixed(2)));
            installmentTableBody.append(row);

            if (type === 'M') {
                startDate.setMonth(startDate.getMonth() + 1);
            } else if (type == 'Q') {
                startDate.setMonth(startDate.getMonth() + 3);
            } else if (type == 'H') {
                startDate.setMonth(startDate.getMonth() + 6);
            } else if (type == 'Y') {
                startDate.setFullYear(startDate.getFullYear() + 1);
            }
        }

    // Update total amount
        $("#totalAmount").text("Total Amount: " + totalAmount.toFixed(2));
   }


    $("#id_save_share_amount").click(function() {
            // Get the share amount
        var shareAmount = parseFloat($('#shareAmount').val());

        // Calculate the total installment amount
        var totalInstallmentAmount = 0;
        $('#installmentTableBody tr').each(function() {
            totalInstallmentAmount += parseFloat($(this).find('td:eq(1)').text());
        });

        // Compare total installment amount with share amount
        if (totalInstallmentAmount === shareAmount) {

            var formData = $("#share_amount_form").serialize(); // Serialize form data
            var tableData = []; // Array to store table data
            $("#installmentTableBody tr").each(function() {
                var rowData = {};
                $(this).find("td").each(function(index, cell) {
                    if (index === 0) {
                        rowData.date = $(cell).text(); // Get date
                    } else if (index === 1) {
                        rowData.amount = $(cell).text(); // Get amount
                    }
                });
                tableData.push(rowData); // Push row data to array
            });
             data= {
                    'form_data' : formData,
                    'table_data' : JSON.stringify(tableData) // Convert table data to JSON string
                },
            performAjaxCalls($('#share_amount_form').data('url'),data,'POST').done(function(response){
            // AJAX request to send form data and table data to the server
                if(response.STATUS == 1){
                    // Handle success response from the server
                     swal.fire(response.MSG);
                        $('#add_share_amount_modal').modal('hide');
                        $('#share_amount_form')[0].reset;

                }
                else{
                    Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: response.MSG,
                        })
                    }
            });
        }
        else{
        alert("Total installment amount is not equal to share amount.");}
    });

    function formatDate(dateString) {
        var date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric'
        });
    }

    function formReset(formname){
        $('#'+formname)[0].reset;
        $('#'+formname+' input[type="hidden"]').val('');
    }

    $('#addCustomInstallment').click(function() {
        var customDate = $('#customDate').val();
        var customDateFormatted = formatDate($('#customDate').val())
        var customAmount = $('#customAmount').val();
        var totalInstallmentAmount = 0;
            $('#installmentTableBody tr').each(function() {
                totalInstallmentAmount += parseFloat($(this).find('td:eq(1)').text());
            });

        var startDate = $('#startDate').val();
        var duration = $('#duration').val();
        var totalAmount = $('#shareAmount').val();
        var totalInstallmentAmount = 0;
            $('#installmentTableBody tr').each(function() {
                totalInstallmentAmount += parseFloat($(this).find('td:eq(1)').text());
            });

        // Check if date and amount are entered
        if (!customDate || !customAmount) {
            alert('Please enter both date and amount.');
            return;
        }

        // Validate date
        var currentDate = new Date();
        var selectedDate = new Date(customDate);
        var startDateObj = new Date(startDate);
        var endDate = new Date(startDate);
        endDate.setFullYear(endDate.getFullYear() + parseInt(duration));

        if (selectedDate < startDateObj || selectedDate > endDate) {
            alert('Date must be within the duration period starting from the start date.');
            return;
        }

        // Validate amount
        if (parseFloat(customAmount) > (parseFloat(totalAmount)-totalInstallmentAmount)) {
            alert('Amount cannot be greater than the total share amount.');
            return;
        }

        // Add validated data to installmentTableBody
        var newRow = '<tr>' +
            '<td>' + customDateFormatted + '</td>' +
            '<td>' + customAmount + '</td>' +
            '<td><button type="button" class="btn btn-danger btn-sm remove-row">Remove</button></td>' +
            '</tr>';
        $('#installmentTableBody').append(newRow);
        updateTotalAmount();


        // Clear the input fields after validation
        $('#customDate').val('');
        $('#customAmount').val('');
    });
    $('body').on('click', '.remove-row', function() {
            // Remove the closest row of the clicked button
            $(this).closest('tr').remove();
             updateTotalAmount();
        });

    function updateTotalAmount() {
        var total = 0;
        $('#installmentTableBody tr').each(function() {
            var amount = parseFloat($(this).find('td:eq(1)').text());
            total += amount;
        });
        $('#totalAmount').text(total.toFixed(2));
    }

    function loadShareAmountDetails(shareholderid){
        if(!datagrid_share_amount_details){
            datagrid_share_amount_details = $('#id_table_shareamount_list').DataTable({
            'order':[[ 1, 'asc' ]],
            'paging' : true,
            'lengthChange': true,
            'searching' : false,
            'ordering' : true,
            'info' : true,
            'autoWidth' : false,
            'destroy' : true,
            "processing": true,
            "serverSide": true,
            select: 'single',
            "columnDefs"  : [
                        {
                            "targets": [0],
                            "visible": false,
                            "searchable": false
                        },

                    ],
            responsive: true,
            // keys: true,
            "pageLength": 10,
            ajax: {
                url : $('#id_table_shareamount_list').data('url')+'?share_holder_id='+shareholderid,
                type : "GET",
                dataSrc: function ( response ) {
                    if(response.hasOwnProperty('STATUS')){
                        if(response.STATUS== 401){
                            error401();
                        }

                    }else{
                        return response.data;
                    }
                },
            "dataSrc": function ( response ) {
                if(response.hasOwnProperty('STATUS')){
                    if(response.STATUS== 401){
                        error401();
                    }
                }else{
                    return response.data;
                }
            },
            },

            });
        }
        else{
            datagrid_share_amount_details.ajax.url($('#id_table_shareamount_list').data('url')+'?share_holder_id='+shareholderid).load()
        }

    }

    $('body').on('click', '.id_view_details', function(event) {
        $('#shareAmountViewModal').modal('show');
        $('#share_holder').val($(this).data('shareholderid'));
        loadShareAmountDetails($(this).data('shareholderid'));
    });

    $('#id_table_shareamount_list tbody').on('click', 'tr', function() {
        var rowData = datagrid_share_amount_details.row(this).data();
        if (rowData) {
        loadShareAmountInstallments(rowData[6]);
        loadShareAmountInstallments('');
        }
    });
    function loadShareAmountInstallments(shareamountref){
        if(!datagrid_share_amount_installments){
            datagrid_share_amount_installments = $('#id_table_shareamount_installments').DataTable({
            'order':[[ 1, 'asc' ]],
            'paging' : true,
            'lengthChange': true,
            'searching' : false,
            'ordering' : true,
            'info' : true,
            'autoWidth' : false,
            'destroy' : true,
            "processing": true,
            "serverSide": true,
            "columnDefs"  : [
                        {
                            "targets": [],
                            "visible": false,
                            "searchable": false
                        },

                    ],
            responsive: true,
            // keys: true,
            "pageLength": 10,
            ajax: {
                url : $('#id_table_shareamount_installments').data('url')+'?shareamountref='+shareamountref,
                type : "GET",
                dataSrc: function ( response ) {
                    if(response.hasOwnProperty('STATUS')){
                        if(response.STATUS== 401){
                            error401();
                        }

                    }else{
                        return response.data;
                    }
                },
            "dataSrc": function ( response ) {
                if(response.hasOwnProperty('STATUS')){
                    if(response.STATUS== 401){
                        error401();
                    }
                }else{
                    return response.data;
                }
            },
            },

            });
        }
        else{
            datagrid_share_amount_installments.ajax.url($('#id_table_shareamount_installments').data('url')+'?shareamountref='+shareamountref).load()
        }

    }
    $('body').on('click', 'button.makePayment', function(event) {
            // Get the share amount
        var shareAmountRef = $(this).data('shareamountref');
        var slno = $(this).data('slno');
        data={
            'shareAmountRef':shareAmountRef,
            'slno':slno
        }
        Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to make this payment?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
            if (result.isConfirmed) {

            performAjaxCalls($('#id_table_shareamount_installments').data('popup-url'),data,'POST').done(function(response){
                console.log(response);
                if(response.STATUS == 1){
                    swal.fire(response.MSG);
                    loadShareAmountInstallments(shareAmountRef);
                }
            })
        }
        })
    });

});