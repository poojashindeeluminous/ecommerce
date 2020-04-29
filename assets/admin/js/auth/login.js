$(document).ready(function()
{
   $('input[name="email"]').focus();

   $('#loginForm').validator().on('submit', function (e) 
   {
      if (!e.isDefaultPrevented()) 
      {
         $('.content').LoadingOverlay("show", {
            background  : "rgba(165, 190, 100, 0.2)",
         });

         const $this    = $(this); 
         const action   = $this.attr('action');
         const formData = new FormData($this[0]); 
         
         axios.post(action,formData)
         .then(function (response) 
         {
            const resp =  response.data;

            if (resp.status == 'success') 
            {
               window.location.href = resp.url;
               $this[0].reset();
               $('.content').LoadingOverlay("hide");
            }

            if (resp.status == 'error') 
            {
               $('.content').LoadingOverlay("hide");
               toastr.error(resp.msg);
            }
         })
         .catch(function (error) 
         {
            $('.content').LoadingOverlay("hide");

            const errorBag = error.response.data.errors;
            $.each(errorBag, function(fieldName, value) 
            {
               $('.err_'+fieldName).closest('div').addClass('has-error has-danger'); 
               $('.err_'+fieldName).text(value[0]).closest('span').show(); 
            })

         }); 

         return false;
      }
   })
})
