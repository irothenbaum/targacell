(function($, window) {
  $(document).ready(function() {
    $('.question').click(function() {
      $(this).parent().toggleClass('open')
    })
  })
})(jQuery, window, undefined)
