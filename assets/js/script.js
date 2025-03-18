// Wait for the DOM to be fully loaded before running animations
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS styles for animations
    const styles = document.createElement('style');
    styles.textContent = `
        .pre-animation {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .card-hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(139, 159, 129, 0.2);
        }
        
        .card-leave {
            transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
        }
        
        .input-focused {
            transform: translateY(-5px);
        }
        
        .form-group {
            transition: transform 0.3s ease;
        }

        @keyframes slideInFromLeft {
            0% {
                transform: translateX(-100px);
                opacity: 0;
            }
            100% {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideInFromRight {
            0% {
                transform: translateX(100px);
                opacity: 0;
            }
            100% {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes fadeIn {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(styles);

    // ===== HOME SECTION SLIDE-IN ANIMATIONS =====
    // Make h1 slide in from left and phone from right
    const homeH1 = document.querySelector('.home h1');
    const homePhone = document.querySelector('.phone');
    const downloadBtn = document.querySelector('.download-btn');

    if (homeH1) {
        homeH1.style.opacity = '0';
        homeH1.style.transform = 'translateX(-100px)';
                
        setTimeout(() => {
            homeH1.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            homeH1.style.opacity = '1';
            homeH1.style.transform = 'translateX(0)';
        }, 300);
    }

    if (homePhone) {
        homePhone.style.opacity = '0';
        homePhone.style.transform = 'translateX(100px)';
        
        setTimeout(() => {
            homePhone.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            homePhone.style.opacity = '1';
            homePhone.style.transform = 'translateX(0)';
        }, 600); // Delay slightly after the h1 animation
    }

    if (downloadBtn) {
        downloadBtn.style.opacity = '0';
        
        setTimeout(() => {
            downloadBtn.style.transition = 'opacity 0.8s ease-out';
            downloadBtn.style.opacity = '1';
        }, 900); // Appear after both h1 and phone have animated
    }

    // ===== SCROLL ANIMATIONS =====
    // Elements to animate on scroll
    const animateElements = document.querySelectorAll('.service-card, .contact-card, .about-us-image, .about-us-text');
    
    // Observer options
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Create IntersectionObserver to handle scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Start observing elements
    animateElements.forEach(element => {
        element.classList.add('pre-animation');
        observer.observe(element);
    });

    // ===== PARALLAX EFFECT =====
    // Apply smooth parallax effect to the home section background
    const homeSection = document.querySelector('.home');
    if (homeSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            if (scrollPosition < window.innerHeight) {
                homeSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
            }
        });
    }

    // ===== INTERACTIVE ELEMENTS =====
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseover', () => {
            card.classList.add('card-hover');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.add('card-leave');
            setTimeout(() => {
                card.classList.remove('card-hover');
                card.classList.remove('card-leave');
            }, 300);
        });
    });

    // ===== SMOOTH SCROLLING =====
    // Add smooth scrolling to internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
                
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== CONTACT FORM ANIMATION =====
    // Animate form inputs on focus
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('input-focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value.trim()) {
                input.parentElement.classList.remove('input-focused');
            }
        });
    });
});