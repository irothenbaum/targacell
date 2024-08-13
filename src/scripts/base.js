(function($, window) {
  $(document).ready(function() {
    setTimeout(matchHeights, 100)
  })

  const lookup = {}
  function matchHeights() {
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
  }
})(jQuery, window, undefined)
