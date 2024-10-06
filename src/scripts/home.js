(function($, window) {
  $(document).ready(function() {
    $('.counter').each(function(i, elem) {
      window.onElementInView(elem, () => {
        // wait a second, then start the counter
        setTimeout(() => {
          countStep($(elem))
        }, 1000)
      })
    })

    const $header = $('#mobile-header')
    $header.click(() => {
      $('body').toggleClass('nav-open')
    })

    configureGallery()
  })

  function countStep($counter, count = 0) {
    let to = parseFloat($counter.data('to'))
    setTimeout(function() {
      $counter.text(count % 1 === 0 ? count : count.toFixed(1))
      if (count <= to) {
        let nextCount = count + Math.max(0.1, (to - count) / to)
        countStep($counter, nextCount)
      } else {
        $counter.text(to)
      }
      // this lets us slowly approach the final value
    }, 50)
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
