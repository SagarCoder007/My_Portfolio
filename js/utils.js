/* ==========================================================================
   UTILITY FUNCTIONS - PROFESSIONAL PORTFOLIO
   ========================================================================== */

// Device Detection
const DeviceUtils = {
  isMobile: () => window.innerWidth <= 768,
  isTablet: () => window.innerWidth > 768 && window.innerWidth <= 1024,
  isDesktop: () => window.innerWidth > 1024,
  
  // Get device type
  getDeviceType: () => {
    if (DeviceUtils.isMobile()) return 'mobile';
    if (DeviceUtils.isTablet()) return 'tablet';
    return 'desktop';
  }
};

// DOM Utilities
const DOMUtils = {
  // Query selector with error handling
  qs: (selector, parent = document) => {
    try {
      return parent.querySelector(selector);
    } catch (error) {
      console.warn(`Invalid selector: ${selector}`);
      return null;
    }
  },

  // Query selector all with error handling
  qsa: (selector, parent = document) => {
    try {
      return parent.querySelectorAll(selector);
    } catch (error) {
      console.warn(`Invalid selector: ${selector}`);
      return [];
    }
  },

  // Add class safely
  addClass: (element, className) => {
    if (element && className) {
      element.classList.add(className);
    }
  },

  // Remove class safely
  removeClass: (element, className) => {
    if (element && className) {
      element.classList.remove(className);
    }
  },

  // Toggle class safely
  toggleClass: (element, className) => {
    if (element && className) {
      element.classList.toggle(className);
    }
  },

  // Check if element has class
  hasClass: (element, className) => {
    return element && className && element.classList.contains(className);
  }
};

// Form Validation Utilities
const ValidationUtils = {
  // Email validation
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Phone validation (basic)
  isValidPhone: (phone) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  },

  // Name validation
  isValidName: (name) => {
    return name && name.trim().length >= 2;
  },

  // Message validation
  isValidMessage: (message, minLength = 10) => {
    return message && message.trim().length >= minLength;
  },

  // URL validation
  isValidURL: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
};

// Performance Utilities
const PerformanceUtils = {
  // Debounce function
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function
  throttle: (func, limit) => {
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
  },

  // Request Animation Frame wrapper
  requestFrame: (callback) => {
    return window.requestAnimationFrame(callback);
  },

  // Cancel Animation Frame wrapper
  cancelFrame: (id) => {
    return window.cancelAnimationFrame(id);
  }
};

// Scroll Utilities
const ScrollUtils = {
  // Get scroll position
  getScrollY: () => window.pageYOffset || document.documentElement.scrollTop,
  
  // Get scroll percentage
  getScrollPercentage: () => {
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollTop = ScrollUtils.getScrollY();
    return Math.round((scrollTop / (docHeight - winHeight)) * 100);
  },

  // Smooth scroll to element
  scrollToElement: (element, offset = 0) => {
    if (!element) return;
    
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  },

  // Smooth scroll to top
  scrollToTop: () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  },

  // Check if element is in viewport
  isInViewport: (element, threshold = 0) => {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    return (
      rect.top <= windowHeight - threshold &&
      rect.bottom >= threshold
    );
  }
};

// Storage Utilities
const StorageUtils = {
  // Local storage with JSON support
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
      return false;
    }
  },

  getItem: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
      return defaultValue;
    }
  },

  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
      return false;
    }
  },

  // Session storage
  setSessionItem: (key, value) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn('Failed to save to sessionStorage:', error);
      return false;
    }
  },

  getSessionItem: (key, defaultValue = null) => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn('Failed to read from sessionStorage:', error);
      return defaultValue;
    }
  }
};

// Animation Utilities (minimal)
const AnimationUtils = {
  // Add CSS class for animation
  animate: (element, animationClass, duration = 1000) => {
    if (!element) return Promise.resolve();

    return new Promise((resolve) => {
      DOMUtils.addClass(element, animationClass);
      
      setTimeout(() => {
        DOMUtils.removeClass(element, animationClass);
        resolve();
      }, duration);
    });
  },

  // Fade in element
  fadeIn: (element, duration = 300) => {
    if (!element) return Promise.resolve();
    
    element.style.opacity = '0';
    element.style.display = 'block';
    
    return new Promise((resolve) => {
      element.style.transition = `opacity ${duration}ms ease`;
      element.style.opacity = '1';
      
      setTimeout(() => {
        element.style.transition = '';
        resolve();
      }, duration);
    });
  },

  // Fade out element
  fadeOut: (element, duration = 300) => {
    if (!element) return Promise.resolve();
    
    return new Promise((resolve) => {
      element.style.transition = `opacity ${duration}ms ease`;
      element.style.opacity = '0';
      
      setTimeout(() => {
        element.style.display = 'none';
        element.style.transition = '';
        resolve();
      }, duration);
    });
  }
};

// Network Utilities
const NetworkUtils = {
  // Check if online
  isOnline: () => navigator.onLine,

  // Simple fetch wrapper with timeout
  fetchWithTimeout: async (url, options = {}, timeout = 5000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }
};

// Accessibility Utilities
const A11yUtils = {
  // Check if user prefers reduced motion
  prefersReducedMotion: () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  // Focus trap for modals
  trapFocus: (element) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    });
  },

  // Announce to screen readers
  announce: (message, priority = 'polite') => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'visually-hidden';
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  }
};

// Color Utilities
const ColorUtils = {
  // Convert hex to RGB
  hexToRgb: (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  },

  // Get contrast ratio
  getContrastRatio: (color1, color2) => {
    const getLuminance = (r, g, b) => {
      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const rgb1 = ColorUtils.hexToRgb(color1);
    const rgb2 = ColorUtils.hexToRgb(color2);
    
    if (!rgb1 || !rgb2) return null;
    
    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    
    return (brightest + 0.05) / (darkest + 0.05);
  }
};

// Export utilities for global use
if (typeof window !== 'undefined') {
  window.Utils = {
    Device: DeviceUtils,
    DOM: DOMUtils,
    Validation: ValidationUtils,
    Performance: PerformanceUtils,
    Scroll: ScrollUtils,
    Storage: StorageUtils,
    Animation: AnimationUtils,
    Network: NetworkUtils,
    A11y: A11yUtils,
    Color: ColorUtils
  };
} 