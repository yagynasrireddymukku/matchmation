    const video = document.getElementById('heroVideo');

    document.addEventListener('click', function enableAudio() {
      if (video.muted) {
        video.muted = false;
        video.currentTime = 0;
        video.play().catch(error => {
          console.error('Playback error:', error);
        });
      }
      document.removeEventListener('click', enableAudio);
    });

    const hamburger = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('show');
    });

    // Footage Length Dynamic Functionality
    function handleFootageTypeChange() {
      const footageTypeSelect = document.getElementById('footageTypeSelect');
      const footageInputRow = document.getElementById('footageInputRow');
      const framesInputRow = document.getElementById('framesInputRow');
      const footageDisplaySelect = document.getElementById('footageDisplaySelect');
      const footageValueInput = document.getElementById('footageValueInput');
      const framesInput = document.getElementById('framesInput');

      footageInputRow.style.display = 'none';
      framesInputRow.style.display = 'none';

      footageValueInput.removeAttribute('required');
      framesInput.removeAttribute('required');

      if (footageTypeSelect.value === 'min-seconds') {
        footageInputRow.style.display = 'flex';
        footageDisplaySelect.innerHTML = '<option>Min : Seconds</option>';
        footageValueInput.placeholder = '01:59';
        footageValueInput.setAttribute('required', 'required');
      } else if (footageTypeSelect.value === 'frames') {
        framesInputRow.style.display = 'block';
        framesInput.setAttribute('required', 'required');
      }
    }

    document.getElementById('footageValueInput').addEventListener('input', function(e) {
      let value = e.target.value.replace(/[^\d]/g, '');
      
      if (value.length >= 3) {
        value = value.substring(0, 2) + ':' + value.substring(2, 4);
      }
      
      e.target.value = value;
    });

    window.addEventListener('load', function() {
      const trackingComplexitySelect = document.getElementById('trackingComplexitySelect');
      if (trackingComplexitySelect) {
        trackingComplexitySelect.selectedIndex = 0;
        trackingComplexitySelect.value = '';
      }
      
      const footageTypeSelect = document.getElementById('footageTypeSelect');
      if (footageTypeSelect) {
        footageTypeSelect.selectedIndex = 0;
      }
      
      const footageInputRow = document.getElementById('footageInputRow');
      const framesInputRow = document.getElementById('framesInputRow');
      if (footageInputRow) footageInputRow.style.display = 'none';
      if (framesInputRow) framesInputRow.style.display = 'none';
      
      const allInputs = document.querySelectorAll('.custom-input, .footage-value-input');
      allInputs.forEach(input => {
        if (input.type !== 'date') {
          input.value = '';
        }
      });
      
      const framesInput = document.getElementById('framesInput');
      if (framesInput) framesInput.value = '';
      
      const footageValueInput = document.getElementById('footageValueInput');
      if (footageValueInput) footageValueInput.removeAttribute('required');
      if (framesInput) framesInput.removeAttribute('required');
    });

    // FAQ Toggle Function
    function toggleFaq(element) {
      const answer = element.querySelector('.faq-answer');
      const isActive = element.classList.contains('active');
      
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-answer').classList.remove('show');
      });
      
      if (!isActive) {
        element.classList.add('active');
        answer.classList.add('show');
      }
    }

    // VFX Services Section JavaScript
    function scrollServicesLeft() {
      const wrapper = document.getElementById('servicesCardsWrapper');
      wrapper.scrollBy({ left: -430, behavior: 'smooth' });
    }

    function scrollServicesRight() {
      const wrapper = document.getElementById('servicesCardsWrapper');
      wrapper.scrollBy({ left: 430, behavior: 'smooth' });
    }

    // Initialize VFX Services interactions with text scrolling
    document.addEventListener('DOMContentLoaded', function() {
      const servicesWrapper = document.getElementById('servicesCardsWrapper');
      
      // Mouse wheel horizontal scrolling
      servicesWrapper.addEventListener('wheel', function(e) {
        e.preventDefault();
        const scrollAmount = e.deltaY * 2;
        this.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });

      // Enhanced hover effects
      const serviceCards = document.querySelectorAll('.service-card-item');
      serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
          const image = this.querySelector('.service-img');
          const contentCard = this.querySelector('.service-content-card');
          
          image.style.transform = 'translateY(-8px) scale(1.02)';
          contentCard.style.transform = 'translateX(-50%) translateY(-8px)';
          contentCard.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
          const image = this.querySelector('.service-img');
          const contentCard = this.querySelector('.service-content-card');
          
          image.style.transform = 'translateY(0) scale(1)';
          contentCard.style.transform = 'translateX(-50%) translateY(0)';
          contentCard.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
      });

      // Text scrolling functionality for each card
      const textContainers = document.querySelectorAll('.service-text-container');
      
      textContainers.forEach(container => {
        const textElement = container.querySelector('.service-text');
        const scrollThumb = container.querySelector('.scroll-thumb');
        const scrollTrack = container.querySelector('.scroll-track');
        
        let isScrolling = false;
        let startY = 0;
        let startScrollTop = 0;
        let maxScroll = 0;
        
        function updateMaxScroll() {
          const containerHeight = container.offsetHeight;
          const textHeight = textElement.scrollHeight;
          maxScroll = Math.max(0, textHeight - containerHeight);
          updateThumbPosition();
        }
        
        function updateThumbPosition() {
          if (maxScroll > 0) {
            const currentScroll = Math.abs(getCurrentScroll());
            const scrollPercentage = Math.min(currentScroll / maxScroll, 1);
            
            const trackHeight = scrollTrack.offsetHeight;
            const thumbHeight = scrollThumb.offsetHeight;
            const maxThumbTop = trackHeight - thumbHeight;
            
            const thumbTop = scrollPercentage * maxThumbTop;
            scrollThumb.style.top = thumbTop + 'px';
            
            scrollThumb.style.opacity = maxScroll > 0 ? '0.8' : '0';
          } else {
            scrollThumb.style.top = '0px';
            scrollThumb.style.opacity = '0';
          }
        }
        
        function getCurrentScroll() {
          const transform = textElement.style.transform;
          const match = transform.match(/translateY$$(-?\d+(?:\.\d+)?)px$$/);
          return match ? parseFloat(match[1]) : 0;
        }
        
        function setScroll(scrollY) {
          const clampedScroll = Math.max(-maxScroll, Math.min(0, scrollY));
          textElement.style.transform = `translateY(${clampedScroll}px)`;
          updateThumbPosition();
        }
        
        function startScrolling(e) {
          isScrolling = true;
          startY = e.clientY;
          startScrollTop = getCurrentScroll();
          textElement.style.cursor = 'grabbing';
          e.preventDefault();
        }
        
        textElement.addEventListener('mousedown', startScrolling);
        scrollThumb.addEventListener('mousedown', startScrolling);
        
        document.addEventListener('mousemove', (e) => {
          if (!isScrolling) return;
          
          const deltaY = e.clientY - startY;
          const sensitivity = 1.0;
          const newScroll = startScrollTop - deltaY;
          setScroll(newScroll);
        });
        
        document.addEventListener('mouseup', () => {
          if (isScrolling) {
            isScrolling = false;
            textElement.style.cursor = 'grab';
          }
        });
        
        container.addEventListener('wheel', (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          const currentScroll = getCurrentScroll();
          const scrollSensitivity = 1.0;
          const newScroll = currentScroll - (e.deltaY * scrollSensitivity);
          setScroll(newScroll);
        });
        
        updateMaxScroll();
        
        window.addEventListener('resize', () => {
          setTimeout(updateMaxScroll, 100);
        });
      });

      // Drag scrolling for main container
      let isDown = false;
      let startX;
      let scrollLeft;

      servicesWrapper.addEventListener('mousedown', (e) => {
        if (!e.target.closest('.service-text-container')) {
          isDown = true;
          startX = e.pageX - servicesWrapper.offsetLeft;
          scrollLeft = servicesWrapper.scrollLeft;
          servicesWrapper.style.cursor = 'grabbing';
        }
      });

      servicesWrapper.addEventListener('mouseleave', () => {
        isDown = false;
        servicesWrapper.style.cursor = 'grab';
      });

      servicesWrapper.addEventListener('mouseup', () => {
        isDown = false;
        servicesWrapper.style.cursor = 'grab';
      });

      servicesWrapper.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - servicesWrapper.offsetLeft;
        const walk = (x - startX) * 2;
        servicesWrapper.scrollLeft = scrollLeft - walk;
      });

      servicesWrapper.style.cursor = 'grab';
    });


    // Add smooth animations when cards come into view
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all matchmation cards
    const cards = document.querySelectorAll('.matchmation-card');
    cards.forEach((card, index) => {
        // Initial state for animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        
        observer.observe(card);
    });

    // Add hover effect enhancement
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Parallax effect for background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const section = document.querySelector('.matchmation-about-section');
        
        if (section) {
            const rate = scrolled * -0.5;
            section.style.backgroundPosition = `center ${rate}px`;
        }
    });

    // Add loading animation for content
    const content = document.querySelector('.matchmation-content');
    if (content) {
        content.style.opacity = '0';
        content.style.transform = 'translateX(-30px)';
        content.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        observer.observe(content);
    }
});

// Add click ripple effect to cards
document.querySelectorAll('.matchmation-card').forEach(card => {
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .matchmation-card {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(254, 0, 0, 0.1);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
// YMR Style Hamburger Menu JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburgerBtn');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const mobileContactBtn = document.querySelector('.mobile-contact-btn');

    // Check if elements exist
    if (!hamburger || !mobileMenuOverlay) {
        console.error('Hamburger menu elements not found');
        return;
    }

    // Toggle menu function
    function toggleMenu() {
        const isOpen = hamburger.classList.contains('active');
        
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // Open menu function
    function openMenu() {
        hamburger.classList.add('active');
        mobileMenuOverlay.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        console.log('Menu opened');
    }

    // Close menu function
    function closeMenu() {
        hamburger.classList.remove('active');
        mobileMenuOverlay.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
        console.log('Menu closed');
    }

    // Smooth scroll to section
    function scrollToSection(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Hamburger click event
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking on nav links and scroll to section
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            closeMenu();
            
            // Small delay to allow menu to close before scrolling
            setTimeout(() => {
                scrollToSection(targetId);
            }, 400);
        });
    });

    // Contact button click
    if (mobileContactBtn) {
        mobileContactBtn.addEventListener('click', function() {
            closeMenu();
            // Add your contact action here
            console.log('Contact clicked');
        });
    }

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && hamburger.classList.contains('active')) {
            closeMenu();
        }
    });

    // Close menu on window resize if open
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991 && hamburger.classList.contains('active')) {
            closeMenu();
        }
    });

    // Close menu when clicking outside (on overlay)
    mobileMenuOverlay.addEventListener('click', function(e) {
        if (e.target === mobileMenuOverlay) {
            closeMenu();
        }
    });
});
