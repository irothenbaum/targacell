const CONTACT_URL = 'https://euc2kaqzl4.execute-api.us-east-1.amazonaws.com/contact';

(function($, window) {
  $(document).ready(function() {
    connectForm($('.contact-form'));
  })

  function connectForm($form) {
    $form.on('submit', function (e) {
      e.preventDefault();
      const $form = $(this);

      $form.find('.alert').remove()

      // Dynamically collect all form data
      const formDataArray = $form.serializeArray()

      // Convert the form data array into a JSON object
      const formData = {}
      $.each(formDataArray, function() {
        formData[this.name] = this.value;
      })

      const $buttonContainer = $form.find('.button-container')
      $buttonContainer.append('<i class="fa fa-spinner"></i>')
      $buttonContainer.find('.button').prop('disabled', true).addClass('sending')

      $.ajax({
        url: CONTACT_URL,
        type: 'POST',
        data: JSON.stringify(formData),
        dataType: 'json',
        success: function () {
          $form.empty().html(successHTML)
        },
        error: function () {
          $form.find('.message-container').after(errorHTML)
        },
        complete: function () {
          $buttonContainer.find('.fa-spinner').remove()
          $buttonContainer.find('.button').prop('disabled', false).removeClass('sending')
        }
      })
    })
  }

  const successHTML = `
    <div class="alert success" role="alert">
      <h4 class="alert-heading">Thank you!</h4>
      <p>Your message has been received. We'll be in contact with you shortly.</p>
    </div>
  `

  const errorHTML = `
    <div class="alert error" role="alert">
      <h4 class="alert-heading">Hmmm, something went wrong.</h4>
      <p>
        Please try sending your message again. <br />
        If you continue to experience issues you can 
        <a href="https://www.linkedin.com/company/targacell/" target="_blank">contact us on LinkedIn.</a>
      </p>
    </div>
  `

})(jQuery, window, undefined)

