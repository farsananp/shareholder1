$('input.letter-only').keypress(function (e) {
    var regex = new RegExp("^[a-zA-Z ]+$");
    var strigChar = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(strigChar)) {
        return true;
    }
    return false
  });


$('input.mobile-only').keypress(function (e) {
    var regex = new RegExp("^[0-9,(,),+]+$");
    var strigChar = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(strigChar)) {
        return true;
    }
    return false
});

function FormValidation(formid,action){
    if(action == 'reset'){
      $('#'+formid).find('input:visible,select:visible,textarea:visible').removeClass('validation-error');
      $('#'+formid).find('span.select2-selection.select2-selection--single.validation-error').removeClass('validation-error');
      return true;
    }
    var formvalidated = true;

    $('#'+formid).find('input:visible:not(:disabled)').each(function(){
        if($(this).prop('required')){
          if($(this).val().trim().length == 0 ){
            $(this).addClass('validation-error');
            formvalidated = false;
          }else{
            $(this).removeClass('validation-error');
  
          }
      }
    })
    $('#'+formid).find('select:not(:disabled)').each(function(){
      if($(this).prop('required')){
        if($(this).val() == '0'||$(this).val()== ''){
          console.log($(this).attr('id'))
          if($(this).parent().find('span[aria-labelledby="select2-'+$(this).attr('id')+'-container"]').length>0){
            console.log('no value')
            $(this).parent().find('span[aria-labelledby="select2-'+$(this).attr('id')+'-container"]').addClass('validation-error');
            formvalidated = false;
          }else{
            $(this).addClass('validation-error');
            formvalidated = false;
          }
          
        }else{
          $(this).removeClass('validation-error');


        }
      
    }
    })
    $('#'+formid).find('textarea:not(:disabled)').each(function(){
      if($(this).prop('required')){
        if($(this).val() == '0'||$(this).val()== ''){
          $(this).addClass('validation-error');
          formvalidated = false;
        }else{
          $(this).removeClass('validation-error');

        }
      }
    })
    $('#'+formid).find('input[type="email"]:visible:not(:disabled)').each(function(){
      console.log('email')
      if($(this).prop('required')){
        if($(this).val() == '0'||$(this).val()== ''){
          $(this).addClass('validation-error');
          formvalidated = false;
        }else if(validateEmail($(this).val())){
          formvalidated = true;
          $(this).removeClass('validation-error');
        }
        // else{

        //   $(this).removeClass('validation-error');

        // }
      }else if($(this).val() != ''){
          if(validateEmail($(this).val())){
              formvalidated = true;
              $(this).removeClass('validation-error');
          }else{
              toastr.error("Enter vaid Email Id")
            formvalidated = false;
          }
      }
    })
    return formvalidated;
  
    //$('#'+formid).find('select').on("select2:close", function (e) {  
    //$(this).valid(); 
    //});
}
const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};