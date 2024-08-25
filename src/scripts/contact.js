const CONTACT_URL = 'https://euc2kaqzl4.execute-api.us-east-1.amazonaws.com/contact';

(function($, window) {
  $(document).ready(function() {
    connectForm($('.contact-form'));
  })

  function connectForm($form) {
    $form.on('submit', function (e) {
      e.preventDefault();
      const $form = $(this);
      const data = $form.serialize();
      $.ajax({
        url: CONTACT_URL,
        type: 'POST',
        data: data,
        dataType: 'json',
        success: function () {
          alert('Message sent!');
        },
        error: function () {
          alert('Error sending message');
        }
      });
    })
  }
})(jQuery, window, undefined)

