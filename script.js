// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav ul');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    nav.classList.remove('active');
                }
            }
        });
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            fetch('send_email.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                alert(data);
                if (data.includes('Thank You')) {
                    this.reset();
                }
            })
            .catch(error => {
                alert('Error: ' + error.message);
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            });
        });
    }
    
    // Scroll animation
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.timeline-item, .experience-item, .project-card, .certificate-item, .workshop-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.timeline-item, .experience-item, .project-card, .certificate-item, .workshop-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.5s ease';
    });
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});