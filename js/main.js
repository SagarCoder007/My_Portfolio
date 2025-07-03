/* ==========================================================================
   MODERN PORTFOLIO - MAIN JAVASCRIPT
   ========================================================================== */

// Main App Controller
class Portfolio {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initNavigation();
    this.initContactForm();
    this.initSmoothScrolling();
    this.handleReducedMotion();
  }

  // Event Listeners
  setupEventListeners() {
    // Check if DOM is already loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.onDOMContentLoaded();
      });
    } else {
      // DOM is already loaded
      this.onDOMContentLoaded();
    }

    window.addEventListener('scroll', this.throttle(() => {
      this.handleNavbarScroll();
    }, 16));

    window.addEventListener('resize', this.debounce(() => {
      this.handleResize();
    }, 250));
  }

  onDOMContentLoaded() {
    // Initialize typing effect with delay to ensure DOM is ready
    setTimeout(() => {
      this.initTypingEffect();
    }, 500);

    // Add fade-in class to sections for subtle entrance
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
      setTimeout(() => {
        section.classList.add('fade-in');
      }, index * 100);
    });

    // Set up intersection observer for subtle animations
    this.setupIntersectionObserver();
  }

  // Navigation Management
  initNavigation() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
      });

      // Close menu when clicking nav links
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
          mobileToggle.classList.remove('active');
          document.body.style.overflow = '';
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
          navMenu.classList.remove('active');
          mobileToggle.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }

    // Active nav link highlighting
    this.updateActiveNavLink();
  }

  handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
      } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
      }
    }
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove('active'));
          const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-20% 0px -20% 0px'
    });

    sections.forEach(section => observer.observe(section));
  }

  // Typing Effect
  initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    
    if (!typingText) {
      console.log('Typing text element not found!');
      return;
    }

    console.log('Initializing typing effect...');

    const roles = [
      'Full-Stack Developer',
      'Tech Enthusiast', 
      'Problem Solver',
      'Code Craftsman'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 150;
    
    const typeRole = () => {
      const currentRole = roles[roleIndex];
      let displayText = '';
      
      if (isDeleting) {
        displayText = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 75; // Faster deletion
      } else {
        displayText = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100; // Typing speed
      }
      
      // Always show cursor after the current text
      if (isDeleting || (!isDeleting && charIndex < currentRole.length)) {
        // Normal blinking cursor during typing/deleting
        typingText.innerHTML = displayText + '<span class="cursor-inline blink">|</span>';
      } else if (!isDeleting && charIndex === currentRole.length) {
        // Pulse cursor during pause
        typingText.innerHTML = displayText + '<span class="cursor-inline pulse">|</span>';
      }
      
      // When finished typing current role
      if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Pause at end to read
        isDeleting = true;
      } 
      // When finished deleting current role
      else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length; // Loop back to start
        typeSpeed = 300; // Brief pause before next role
      }
      
      // Continue the loop
      setTimeout(typeRole, typeSpeed);
    };
    
    // Clear any existing text and start typing
    typingText.innerHTML = '<span class="cursor-inline blink">|</span>';
    typeRole();
  }

  // Smooth Scrolling
  initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const headerHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = targetSection.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Contact Form
  initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.handleFormSubmission(form);
    });

    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearError(input));
    });
  }

  async handleFormSubmission(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const successMsg = document.getElementById('form-success');

    // Validate all fields
    const isValid = this.validateForm(form);
    if (!isValid) return;

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
      // Simulate form submission (replace with actual endpoint)
      await this.simulateFormSubmission(new FormData(form));
      
      // Show success message
      successMsg.classList.add('show');
      form.reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        successMsg.classList.remove('show');
      }, 5000);

    } catch (error) {
      this.showFormError('Failed to send message. Please try again.');
    } finally {
      // Reset button state
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  }

  validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let errorMessage = '';

    // Required field validation
    if (field.hasAttribute('required') && !value) {
      errorMessage = 'This field is required';
      isValid = false;
    }
    // Email validation
    else if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMessage = 'Please enter a valid email address';
        isValid = false;
      }
    }
    // Minimum length validation
    else if (field.name === 'message' && value && value.length < 10) {
      errorMessage = 'Message must be at least 10 characters long';
      isValid = false;
    }

    this.showFieldError(field, errorMessage);
    return isValid;
  }

  showFieldError(field, message) {
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) {
      errorElement.textContent = message;
      field.classList.toggle('error', !!message);
    }
  }

  clearError(field) {
    this.showFieldError(field, '');
  }

  showFormError(message) {
    // Could implement a toast notification or error display
    alert(message); // Simple fallback
  }

  async simulateFormSubmission(formData) {
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Form data:', Object.fromEntries(formData));
        resolve();
      }, 1500);
    });
  }

  // Intersection Observer for subtle animations
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-up');
          
          // Animate tech cards proficiency bars
          if (entry.target.classList.contains('tech-card')) {
            entry.target.classList.add('animate');
          }
        }
      });
    }, observerOptions);

    // Observe elements for subtle animations
    const elementsToAnimate = document.querySelectorAll(
      '.timeline-card, .tech-card, .project-card, .content-card, .info-card, .tool-item'
    );
    
    elementsToAnimate.forEach(el => observer.observe(el));
  }



  // Handle resize events
  handleResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
      const navMenu = document.getElementById('nav-menu');
      const mobileToggle = document.getElementById('mobile-toggle');
      
      if (navMenu && mobileToggle) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  }

  // Accessibility: Handle reduced motion preference
  handleReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      // Disable animations for users who prefer reduced motion
      document.documentElement.style.setProperty('--transition-fast', '0ms');
      document.documentElement.style.setProperty('--transition-normal', '0ms');
      document.documentElement.style.setProperty('--transition-slow', '0ms');
    }

    // Listen for changes in motion preference
    prefersReducedMotion.addEventListener('change', (e) => {
      if (e.matches) {
        document.documentElement.style.setProperty('--transition-fast', '0ms');
        document.documentElement.style.setProperty('--transition-normal', '0ms');
        document.documentElement.style.setProperty('--transition-slow', '0ms');
      } else {
        document.documentElement.style.setProperty('--transition-fast', '150ms ease');
        document.documentElement.style.setProperty('--transition-normal', '300ms ease');
        document.documentElement.style.setProperty('--transition-slow', '500ms ease');
      }
    });
  }

  // Utility Functions
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Initialize Portfolio when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded - Initializing Portfolio...');
  const portfolio = new Portfolio();
  
  // Add some professional interactive touches
  setTimeout(() => {
    // Add hover effects to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
      link.classList.add('icon-bounce');
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
      btn.classList.add('btn-hover-effect');
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.skill-category, .project-card');
    cards.forEach(card => {
      card.classList.add('card-hover');
    });

    // Add underline effect to nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.add('underline-effect');
    });
  }, 100);
}); 