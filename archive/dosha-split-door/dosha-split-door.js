    (function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isMobile = window.matchMedia('(max-width: 767px)').matches;
  if (reduceMotion || isMobile) return; // fallback CSS handles these cases

  var pin = document.getElementById('doshaPin');
  var slides = Array.prototype.slice.call(document.querySelectorAll('.dosha-slide'));
  var dots = document.querySelectorAll('#doshaDots span');
  var total = slides.length;
  var current = 0;
  var animating = false;
  var stepHeight = window.innerHeight; // one slide's worth of scroll

  slides.forEach(function (s, i) { s.style.zIndex = total - i; });

  function updateDots() {
    dots.forEach(function (d, i) { d.classList.toggle('active', i === current); });
  }

  function isPinned() {
    var rect = pin.getBoundingClientRect();
    return Math.abs(rect.top) < 2; // sticky is currently stuck at top
  }

  function goNext() {
    if (animating || current >= total - 1) return;
    animating = true;
    var leaving = slides[current];
    leaving.classList.add('is-opening');
    window.scrollBy({ top: stepHeight, behavior: 'smooth' });

    setTimeout(function () {
      leaving.style.visibility = 'hidden';
      current++;
      updateDots();
      animating = false;
    }, 900); // matches --door-duration
  }

  function goPrev() {
    if (animating || current <= 0) return;
    animating = true;
    var returning = slides[current - 1];
    returning.style.visibility = 'visible';
    // snap it instantly to the "open" position, then animate closed
    returning.classList.add('is-opening');
    void returning.offsetWidth; // force reflow
    returning.classList.remove('is-opening');

    window.scrollBy({ top: -stepHeight, behavior: 'smooth' });

    setTimeout(function () {
      current--;
      updateDots();
      animating = false;
    }, 900);
  }

  window.addEventListener('wheel', function (e) {
    if (!isPinned()) return;

    var goingDown = e.deltaY > 0;
    var goingUp = e.deltaY < 0;

    // let the browser scroll freely out of the section at either end
    if (goingDown && current >= total - 1) return;
    if (goingUp && current <= 0) return;

    e.preventDefault();
    if (animating) return;
    if (goingDown) goNext();
    else if (goingUp) goPrev();
  }, { passive: false });

  window.addEventListener('resize', function () {
    stepHeight = window.innerHeight;
  });
})();
