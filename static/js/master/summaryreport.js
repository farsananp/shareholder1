$(document).ready(function() {
    // Initialize
    var datagridreport ;
    function loadLists(){
        if(!datagridreport){
            var
            datagridreport = $('#summaryTable').DataTable({
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
                url : $('#summaryTable').data('url')+'?country='+$('#countryFilter').val()+'&shareholder='+
                        $('#nameFilter').val()+'&startdate='+$('#startDate').val()+'&enddate='+$('#endDate').val()  ,
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
    loadLists();
    // Add custom filter listeners and date range picker
    $('#countryFilter,#startDate,#nameFilter,#endDate').on('change', function() {
        loadLists();
    });

});
