/**
 * DevotedZen Labs - Master Client Controller
 * Manrope + Inter design system interactions
 */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. Hero Neural Canvas Initialization
  // -------------------------------------------------------------------------
  if (typeof window.initHeroNeuralCanvas === 'function') {
    window.initHeroNeuralCanvas('hero-canvas');
  }

  // -------------------------------------------------------------------------
  // 2. Navigation Scroll State & Mobile Drawer
  // -------------------------------------------------------------------------
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 25) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        mobileDrawer.classList.remove('open');
        mobileToggle.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        `;
      } else {
        mobileDrawer.classList.add('open');
        mobileToggle.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        `;
      }
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileDrawer.classList.remove('open'));
    });
  }

  // -------------------------------------------------------------------------
  // 3. Interactive Product Switcher Tabs (Accessible & Keyboard-Navigable)
  // -------------------------------------------------------------------------
  const switcherBtns = document.querySelectorAll('.switcher-btn');
  const productPanes = document.querySelectorAll('.tab-pane');

  if (switcherBtns.length > 0) {
    switcherBtns.forEach((btn, index) => {
      // Click handler
      btn.addEventListener('click', function() {
        const target = this.getAttribute('data-tab');

        // Reset all buttons and panes
        switcherBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
          b.setAttribute('tabindex', '-1');
        });
        productPanes.forEach(p => {
          p.classList.remove('active');
          p.setAttribute('hidden', '');
        });

        // Activate selected button and pane
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');
        this.setAttribute('tabindex', '0');

        const activePane = document.getElementById(`tab-${target}`);
        if (activePane) {
          activePane.classList.add('active');
          activePane.removeAttribute('hidden');
          // Dispatch window resize so canvas simulators in revealed container adapt immediately
          window.dispatchEvent(new Event('resize'));
        }
      });

      // Keyboard arrow navigation (Left/Right, Up/Down)
      btn.addEventListener('keydown', function(e) {
        let newIndex = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          newIndex = (index + 1) % switcherBtns.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          newIndex = (index - 1 + switcherBtns.length) % switcherBtns.length;
        } else if (e.key === 'Home') {
          newIndex = 0;
        } else if (e.key === 'End') {
          newIndex = switcherBtns.length - 1;
        }

        if (newIndex !== null) {
          e.preventDefault();
          switcherBtns[newIndex].focus();
          switcherBtns[newIndex].click();
        }
      });
    });
  }

  // -------------------------------------------------------------------------
  // 4. Stat Counter Animations
  // -------------------------------------------------------------------------
  const counterElements = document.querySelectorAll('.counter-animate');
  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetVal = parseFloat(el.getAttribute('data-target') || '0');
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const isFloat = el.getAttribute('data-float') === 'true';
        let current = 0;
        const steps = 40;
        const inc = targetVal / steps;

        const timer = setInterval(() => {
          current += inc;
          if (current >= targetVal) {
            current = targetVal;
            clearInterval(timer);
          }
          el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString()) + suffix;
        }, 30);

        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counterElements.forEach(el => counterObserver.observe(el));

  // -------------------------------------------------------------------------
  // 5. Interactive FAQ Accordions
  // -------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // -------------------------------------------------------------------------
  // 6. Interactive Road Survey ROI Calculator
  // -------------------------------------------------------------------------
  const roadKmSlider = document.getElementById('calc-road-km');
  const roadKmVal = document.getElementById('calc-road-km-val');
  const calcSavingsCost = document.getElementById('calc-savings-cost');
  const calcSavingsTime = document.getElementById('calc-savings-time');

  function updateCalculator() {
    if (!roadKmSlider) return;
    const km = parseInt(roadKmSlider.value, 10);
    if (roadKmVal) roadKmVal.textContent = km.toLocaleString() + ' km';

    const manualCost = km * 2800;
    const aiCost = km * 550;
    const savings = manualCost - aiCost;
    const daysSaved = Math.round(km * 0.18);

    if (calcSavingsCost) {
      calcSavingsCost.textContent = '₹' + (savings / 100000).toFixed(1) + ' Lakhs+';
    }
    if (calcSavingsTime) {
      calcSavingsTime.textContent = daysSaved + ' Days';
    }
  }

  if (roadKmSlider) {
    roadKmSlider.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  // -------------------------------------------------------------------------
  // 7. Schedule Demo Modal Dialog
  // -------------------------------------------------------------------------
  const modal = document.getElementById('demo-modal');
  const openModalBtns = document.querySelectorAll('.open-demo-modal');
  const closeModalBtns = document.querySelectorAll('.close-demo-modal');
  const demoForm = document.getElementById('demo-form');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const product = btn.getAttribute('data-product');
      if (product && demoForm) {
        const select = demoForm.querySelector('#modal-product-select');
        if (select) select.value = product;
      }
      modal?.classList.add('open');
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => modal?.classList.remove('open'));
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('open')) {
      modal.classList.remove('open');
    }
  });

  if (demoForm) {
    demoForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitBtn = demoForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `Confirming...`;

      setTimeout(() => {
        modal?.classList.remove('open');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        demoForm.reset();
        window.showToast('Briefing request confirmed! An AI systems engineer will contact you shortly.', 'success');
      }, 700);
    });
  }

  // -------------------------------------------------------------------------
  // 8. Toast Notifications
  // -------------------------------------------------------------------------
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  window.showToast = function(msg, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    const strokeColor = type === 'success' ? '#ef4444' : '#f87171';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
      <span>${msg}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  };
});
