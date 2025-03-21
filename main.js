
document.addEventListener('DOMContentLoaded', () => {
  // Initialize animations
  initAnimations();
  
  // Initialize mobile menu
  initMobileMenu();
  
  // Initialize lazy loading
  initLazyLoading();
});

// Add page transition animations
function initAnimations() {
  document.body.classList.add('page-loaded');
  
  const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up, .animate-slide-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0', 'translate-x-0');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animatedElements.forEach(el => {
    observer.observe(el);
    // Set initial state
    if (el.classList.contains('animate-fade-in')) {
      el.classList.add('opacity-0', 'transition-opacity', 'duration-700');
    } else if (el.classList.contains('animate-slide-up')) {
      el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
    } else if (el.classList.contains('animate-slide-in')) {
      el.classList.add('opacity-0', 'translate-x-4', 'transition-all', 'duration-700');
    }
  });
}

// Mobile menu functionality
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMenu = document.getElementById('close-menu');
  
  if (!menuToggle || !mobileMenu || !closeMenu) return;
  
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });
  
  closeMenu.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    document.body.style.overflow = '';
  });
  
  // Close menu when clicking on a link
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      document.body.style.overflow = '';
    });
  });
}

// Lazy load images
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('.lazy-image');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.addEventListener('load', () => {
            img.classList.add('loaded');
          });
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.classList.add('loaded');
    });
  }
}

// Smooth reveal for reviews on hover
function initReviewHover() {
  const reviewCards = document.querySelectorAll('.review-card');
  
  reviewCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('scale-105', 'shadow-medium');
    });
    
    card.addEventListener('mouseleave', () => {
      card.classList.remove('scale-105', 'shadow-medium');
    });
  });
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector('.hero-image');
  
  if (heroImage) {
    heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
  }
});
