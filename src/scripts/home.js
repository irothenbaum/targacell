(function($, window) {
  let $counter
  let count = 0
  $(document).ready(function() {
    $counter = $('#counter')
    countStep()
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
})(jQuery, window, undefined)
