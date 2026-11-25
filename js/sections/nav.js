/* ==========================================================================
   NAV: mobile menu open/close
   Same behaviour as the reference, plus three accessibility additions:
     1. aria-expanded on the hamburger is kept in sync
     2. Escape key closes the menu
     3. Focus moves into the menu on open and back to the hamburger on close
        (otherwise keyboard users are left "behind" the overlay)
   ========================================================================== */

(function () {
  const hamburger  = document.querySelector('.nav-hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuClose  = document.getElementById('menuClose');

  function openMenu() {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';   // stop the page scrolling behind the menu
    hamburger.setAttribute('aria-expanded', 'true');
    menuClose.focus();
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.focus();
  }

  hamburger.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);

  // Close when a link is tapped
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
  });
})();
