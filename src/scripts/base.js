(function($, window) {
  $(document).ready(function() {
    maxHeights()
    minHeights()
    minWidths()
    maxWidths()
    $(window).on('resize', maxHeights)
  })

  let alreadyComputed = {}
  function maxHeights() {
    _genericMatch('data-max-heights', 'height', ($elem, current) => {
      return Math.max(current, $elem.outerHeight())
    }, 0)
  }

  function minHeights() {
    _genericMatch('data-min-heights', 'height', ($elem, current) => {
      return Math.min(current, $elem.outerHeight())
    }, 10000)
  }

  function minWidths() {
    _genericMatch('data-min-widths', 'width', ($elem, current) => {
      return Math.min(current, $elem.outerWidth())
    }, 10000)
  }

  function maxWidths() {
    _genericMatch('data-max-widths', 'width', ($elem, current) => {
      return Math.max(current, $elem.outerWidth())
    }, 0)
  }

  function _genericMatch(rawAttr, style, aggregateFunc, initial) {
    const attr= `[${rawAttr}]`
    if (alreadyComputed[attr]) {
      $(attr).each(function(i, elem) {
        $(elem).css(style, '')
      })
    }

    const lookup = alreadyComputed[attr] || {}
    setTimeout(() => {
      $(attr).each(function(i, elem) {
        const $elem = $(elem)
        const group = $elem.attr(rawAttr)
        lookup[group] = lookup[group] || {elems: [], agg: initial}
        lookup[group].elems.push($elem)
        lookup[group].agg = aggregateFunc($elem, lookup[group].agg)
      })

      Object.keys(lookup).forEach(group => {
        lookup[group].elems.forEach($elem => {
          $elem.css(style, lookup[group].agg)
        })
      })
      alreadyComputed[attr] = lookup
    }, 100)
  }
})(jQuery, window, undefined)
