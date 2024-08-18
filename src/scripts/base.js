(function($, window) {
  $(document).ready(function() {
    matchHeights()
    $(window).on('resize', matchHeights)
  })

  let matchedHeights = false

  const lookup = {}
  function matchHeights() {
    if (matchedHeights) {
      $('[data-match-heights]').each(function(i, elem) {
        $(elem).css('height', '')
      })
    }
    setTimeout(() => {
      $('[data-match-heights]').each(function(i, elem) {
        const $elem = $(elem)
        const group = $elem.attr('data-match-heights')
        lookup[group] = lookup[group] || {elems: [], max: 0}
        lookup[group].elems.push($elem)
        lookup[group].max = Math.max(lookup[group].max, $elem.outerHeight())
      })

      Object.keys(lookup).forEach(group => {
        lookup[group].elems.forEach($elem => {
          $elem.css('height', lookup[group].max)
        })
      })

      matchedHeights = true
    }, 100)
  }
})(jQuery, window, undefined)
