/**
 * Portfolio JavaScript
 * Features: Mobile navigation toggle, smooth scroll active state,
 * clipboard copy with toast notifications, and dynamic year.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Elements
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('navbar');

  // Toggle mobile navigation
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      mobileToggle.classList.toggle('is-open', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

      // Prevent body scrolling when mobile menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('is-open')) {
          navMenu.classList.remove('is-open');
          mobileToggle.classList.remove('is-open');
          mobileToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('is-open') &&
        !navMenu.contains(e.target) &&
        !mobileToggle.contains(e.target)
      ) {
        navMenu.classList.remove('is-open');
        mobileToggle.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // 2. Active Navigation Highlight On Scroll
  const sections = document.querySelectorAll('section[id]');

  const handleScrollActiveLink = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          targetLink.classList.add('active');
        }
      }
    });

    // Add shadow when navbar is scrolled
    if (navbar) {
      if (window.scrollY > 20) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    }
  };

  window.addEventListener('scroll', handleScrollActiveLink);

  // 3. Dynamic Footer Year
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 4. Copy Email & Toast Notification
  const copyBtn = document.getElementById('copyEmailBtn');
  const toast = document.getElementById('toast');
  const emailVal = document.getElementById('emailVal');

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  };

  if (copyBtn && emailVal) {
    copyBtn.addEventListener('click', async () => {
      const textToCopy = emailVal.textContent.trim();
      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast('✓ Berhasil disalin ke clipboard!');
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('✓ Berhasil disalin ke clipboard!');
      }
    });
  }
});
