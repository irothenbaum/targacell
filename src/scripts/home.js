(function($, window) {
  let $counter
  let count = 0
  $(document).ready(function() {
    $counter = $('#counter')
    countStep()

    configureGallery()
  })

  function countStep() {
    setTimeout(function() {
      $counter.text(count)
      count++
      if (count <= 10) {
        countStep()
      }
    }, 50 + (count * 30))
  }

  function configureGallery() {
    const $gallery = $('.gallery-container')

    $gallery.find('.dot').click(function() {
      const $dot = $(this)
      const index = $dot.index()
      $dot.addClass('active').siblings().removeClass('active');
      $gallery.find('.testimonial').removeClass('active').eq(index).addClass('active');
    })

    $gallery.find('.dot').eq(0).click()
  }
})(jQuery, window, undefined)
