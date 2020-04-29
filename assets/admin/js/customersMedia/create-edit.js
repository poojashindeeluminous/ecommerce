$(document).ready(function () 
{

    // adding focus event to first field
    $('input[name="name"]').focus();
    $('input[name="mobile_number"]').mask('999-999-9999');

     //color picker with addon
    /*$('.my-colorpicker2').colorpicker();
    $('.my-colorpicker2').on('colorpickerChange', function(event) {
      $('.my-colorpicker2 .fa-square').css('color', event.color.toString());
    });*/

    $("#google_color").change(function () {

        let color_code = $(this).find(':selected').data('code');
        $("#preview").children('span').css({
            'background-color': color_code 
        });
    }); 

   // On change role
    // $(".role").on('change', function() { 
    //     if($(this).find("option:selected").attr('name') != '');
    //     var roleName = $(this).find("option:selected").attr('name').toLowerCase();

    //     // On selecting role as doctor, the color dropdown should display
    //     if(roleName == 'doctor')
    //       {    
    //         $("#colorId").css("display","block");
    //         $('#doctor').removeAttr("required");  
    //       } 
    //     else
    //       {
    //         $("#colorId").css("display","none"); 
    //         $("#doctor").prop('required',true);
    //       }

    //     // On selecting role as assistant, the doctor dropdown should display
    //     if(roleName == 'assistant')
    //       {    
    //         $("#doctorId").css("display","block");
    //         $('#google_color').removeAttr("required");
    //       }
    //     else
    //       {
    //         $("#doctorId").css("display","none"); 
    //         $("#google_color").prop('required',true);
    //       }
    // }); 

})

// submitting form after validation
$('#customerForm').validator().on('submit', function (e) 
{

    if (!e.isDefaultPrevented()) {

        const $this = $(this);
        const action = $this.attr('action');
        const formData = new FormData($this[0]);
        
        $('.card-body').LoadingOverlay("show", {
            background: "rgba(165, 190, 100, 0.4)",
        });

        axios.post(action, formData)
            .then(function (response) {
                const resp = response.data;
       
                if (resp.status == 'success') {
                    $this[0].reset();
                    toastr.success(resp.msg);
                    $('.card-body').LoadingOverlay("show");
                    setTimeout(function () {
                        window.location.href = resp.url;
                    }, 2000)
                }

                if (resp.status == 'error') {
                    $('.card-body').LoadingOverlay("show");
                    toastr.error(resp.msg);

                    const errorBag = resp.errors;

                    $.each(errorBag, function (fieldName, value) {
                        $('.err_' + fieldName).closest('.form-group').addClass('has-error has-danger');
                        $('.err_' + fieldName).text(value[0]).closest('span').show();
                    })
                }
            })
            .catch(function (error) {
                $('.card-body').LoadingOverlay("show");

                const errorBag = error.response.data.errors;

                $.each(errorBag, function (fieldName, value) {
                    $('.err_' + fieldName).closest('.form-group').addClass('has-error has-danger');
                    $('.err_' + fieldName).text(value[0]).closest('span').show();
                })
            });

        return false;
    }
})

// submitting form after validation
$('#updateCustomerForm').validator().on('submit', function (e) 
{
    if (!e.isDefaultPrevented()) {

        const $this = $(this);
        const action = $this.attr('action');
        const formData = new FormData($this[0]);
        
        $('.card-body').LoadingOverlay("show", {
            background: "rgba(165, 190, 100, 0.4)",
        });

        axios.post(action, formData)
            .then(function (response) {
                const resp = response.data;

                if (resp.status == 'success') {
                    $this[0].reset();
                    toastr.success(resp.msg);
                    $('.card-body').LoadingOverlay("show");
                    setTimeout(function () {
                        window.location.href = resp.url;
                    }, 2000)
                }

                if (resp.status == 'error') {
                    $('.card-body').LoadingOverlay("show");
                    toastr.error(resp.msg);

                    const errorBag = resp.errors;

                    $.each(errorBag, function (fieldName, value) {
                        $('.err_' + fieldName).closest('.form-group').addClass('has-error has-danger');
                        $('.err_' + fieldName).text(value[0]).closest('span').show();
                    })
                }
            })
            .catch(function (error) {
                $('.card-body').LoadingOverlay("show");

                const errorBag = error.response.data.errors;

                $.each(errorBag, function (fieldName, value) {
                    $('.err_' + fieldName).closest('.form-group').addClass('has-error has-danger');
                    $('.err_' + fieldName).text(value[0]).closest('span').show();
                })
            });

        return false;
    }
})






