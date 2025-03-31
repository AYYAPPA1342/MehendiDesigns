document.addEventListener('DOMContentLoaded', function() {
    // ========== Mobile Menu Toggle ==========
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    function toggleMenu() {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    }
    
    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking on a link (for mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // ========== Responsive Navigation ==========
    function handleResponsiveNav() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = 'auto';
        }
    }

    // Initial check and on resize (with debounce)
    handleResponsiveNav();
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResponsiveNav, 250);
    });

    // ========== Smooth Scrolling ==========
    const scrollToSection = (targetId) => {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };

    // ========== Active Section Detection ==========
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-link');
    
    function highlightNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
    
    // Throttle scroll event for performance
    let scrollThrottle;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollThrottle);
        scrollThrottle = setTimeout(highlightNav, 100);
    });
    
    // ========== Navigation Click Handling ==========
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
            
            // Scroll to section
            scrollToSection(targetId);
            
            // Highlight clicked nav item
            navItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // ========== Responsive Contact Form ==========
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: this.querySelector('input[type="text"]').value.trim(),
                email: this.querySelector('input[type="email"]').value.trim(),
                phone: this.querySelector('input[type="tel"]').value.trim(),
                message: this.querySelector('textarea').value.trim()
            };
            
            // Validate required fields
            if (!formData.name || !formData.email || !formData.message) {
                alert('Please fill in all required fields (Name, Email, and Message)');
                return;
            }
            
            // Prepare messages
            const whatsappMessage = `New Booking Inquiry:%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone || 'Not provided'}%0A*Message:* ${formData.message}`;
            const emailSubject = 'New Booking Inquiry';
            const emailBody = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0APhone: ${formData.phone || 'Not provided'}%0D%0AMessage: ${formData.message}`;
            
            // Detect device type for better UX
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            if (isMobile) {
                // Mobile devices - try WhatsApp first
                window.location.href = `https://wa.me/919390696341?text=${whatsappMessage}`;
            } else {
                // Desktop - open email by default
                window.location.href = `mailto:ayyappa2607@gmail.com?subject=${emailSubject}&body=${emailBody}`;
            }
            
            // Reset form
            this.reset();
        });
    }

    // ========== Viewport Height Fix for Mobile ==========
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
});