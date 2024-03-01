$('#id_table_masterlist').on('click','.jq_master_steps',function(){
    checklistid = $(this).data('id');
    $('#id_form_checklistdetails input[name="checklistid"]').val(checklistid);
    console.log('table steps')
    $('#id_modal_checklist_details').modal('show');
    loadCheckListDetails(checklistid)
})


var datagrid_checklistdetails;
function loadCheckListDetails(checklistid){
    if(!datagrid_checklistdetails){
        datagrid_checklistdetails = $('#id_table_checkliststeps').DataTable({
        'order':[[ 0, 'asc' ]],
        'paging' : true,
        'lengthChange': true,
        'searching' : true,
        'ordering' : true,
        'info' : true,
        'autoWidth' : false,
        'destroy' : true,
        "processing": true,
        "serverSide": true,
        responsive: true,
        // keys: true,
        "pageLength": 10,
        ajax: {
            url : $('#id_table_checkliststeps').data('url')+'?checklist='+checklistid,
            type : "POST",
            headers: {
                "X-CSRFToken": $('input[name="csrfmiddlewaretoken"]').val()
            },
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
        datagrid_checklistdetails.ajax.url($('#id_table_checkliststeps').data('url')+'?checklist='+checklistid).load()
    }
}
$('#btn_save_details').on('click',function(e){
    e.preventDefault();
    if(FormValidation('id_form_checklistdetails')){
        performAjaxCalls($('#id_form_checklistdetails').data('url'),$('#id_form_checklistdetails').serialize(),'POST').done(function(response){
            if(response.STATUS == 1){
                toastr.success(response.MSG);
                loadCheckListDetails($('#id_form_checklistdetails input[name="checklistid"]').val());
                formReset('id_form_checklistdetails');
            }else{
                toastr.error(response.MSG);
            }
        })
    }
})

// edit 
$('#id_table_checkliststeps').on('click','.jq_checklist_edit',function(){
    $('#id_table_checkliststeps tr').removeClass('tr-selected');

    $(this).closest('tr').addClass('tr-selected');
    id = $(this).data('id');
    slno = $(this).data('slno');
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to edit this!",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
            formReset('id_form_checklistdetails');
            $('#id_new_span').hide();
            $('#id_edit_span').show();
            performAjaxCalls($('#id_form_checklistdetails').data('url'),{'id':id,'slno':slno},'GET').done(function(response){
                if(response.STATUS == 1){
                    // $('.accordion-dev-button').attr('aria-expanded',true)
                    console.log(response.DATA);
                    data = response.DATA;
                    // $('#id_form_master input[name="id"]').val(data.identity);
                    // $('#id_form_master input[name="description"]').val(data.description);
                    // if(data.active == 'Y'){
                    //     $('#id_form_master input[name="active"]').prop('checked',true);
                    // }
                    loadForCheckListUpdation(data);
                }else{
                    toastr.error(response.MSG);
                }
            })
        }
      })
})
function loadForCheckListUpdation(data){
    console.log(data);
    $('#id_form_checklistdetails input[name="checklistid"]').val(data.id_id);
    $('#id_form_checklistdetails input[name="slno"]').val(data.slno);
    $('#id_form_checklistdetails input[name="displayorder"]').val(data.displayorder);
    $('#id_form_checklistdetails input[name="description"]').val(data.description);
    if(data.active == 'Y'){
        $('#id_form_checklistdetails input[name="active"]').prop('checked',true);
    }
    
}
$('#id_table_checkliststeps').on('click','.jq_checklist_delete',function(){
    $('#id_table_checkliststeps tr').removeClass('tr-selected')
    $(this).closest('tr').addClass('tr-selected');
    id = $(this).data('id');
    slno = $(this).data('slno');
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            performAjaxCalls($('#id_form_checklistdetails').data('url'),{'id':id,'slno':slno},'DELETE').done(function(response){
                if(response.STATUS == 1){
                    toastr.success(response.MSG);
                    loadCheckListDetails($('#id_form_checklistdetails input[name="checklistid"]').val());
                }else{
                    toastr.error(response.MSG)
                }
            })
        }
      })
})
