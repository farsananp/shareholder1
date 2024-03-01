$('#id_form_assetdetails [name="brand"]').select2({
    ajax: {
        url: url_brand_list,
        dataType: 'json',
        delay: 250,
        data: function (params) {
            return {
            q: params.term, // search term
            
            };
        },
        processResults: function (data, params) {
            return {
                results: $.map(data.data, function (item) {
                    return {
                        text: item[1],
                        id: item[0]
                    }
                })
            };
        },
        cache: true
        },
        minimumInputLength: 2,
});
$('#id_form_assetdetails [name="currentlocation"]').select2({
    ajax: {
        url: url_rooms_list,
        dataType: 'json',
        delay: 250,
        data: function (params) {
            return {
            q: params.term, // search term
            
            };
        },
        processResults: function (data, params) {
            return {
                results: $.map(data.data, function (item) {
                    return {
                        text: item[1],
                        id: item[0]
                    }
                })
            };
        },
        cache: true
        },
        minimumInputLength: 2,
});
$('#id_btn_assetdetails').on('click',function(e){
    e.preventDefault();
    if(FormValidation('id_form_assetdetails')){
        $.ajax({
            url: $('#id_form_assetdetails').data('url'),
            type: "POST",
            dataType: "json",
            data: $('#id_form_assetdetails').serialize(),
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "X-CSRFToken": getCookie("csrftoken"),  // don't forget to include the 'getCookie' function
            },
            success: (data) => {
              console.log(data);
            },
            error: (error) => {
              console.log(error);
            }
        });
    }
})