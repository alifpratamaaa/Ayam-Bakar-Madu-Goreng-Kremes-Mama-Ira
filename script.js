/* SHOW MENU */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-menu'); // If user clicks any nav link, it should close on mobile

if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
    });
}

/* REMOVE MENU MOBILE */
const navLinks = document.querySelectorAll('.nav-link, .nav-btn-mobile a');

const linkAction = () => {
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));

/* CHANGE BACKGROUND HEADER */
const scrollHeader = () => {
    const header = document.getElementById('header');
    if(!header) return;
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    window.scrollY >= 50 ? header.classList.add('scroll-header') 
                         : header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/* TESTIMONIAL CAROUSEL */
const carouselInner = document.getElementById('carousel-inner');
const items = document.querySelectorAll('.testimonial-item');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
let carouselInterval;

const showSlide = (index) => {
    if (index >= items.length) currentIndex = 0;
    else if (index < 0) currentIndex = items.length - 1;
    else currentIndex = index;

    // Update Transform
    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update Visibility for animation
    items.forEach((item, idx) => {
        item.classList.toggle('active', idx === currentIndex);
    });

    // Update Dots
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
    });
}

const nextSlide = () => {
    showSlide(currentIndex + 1);
}

// Global function for dot clicking
window.currentSlide = (index) => {
    showSlide(index);
    resetInterval();
}

const startInterval = () => {
    carouselInterval = setInterval(nextSlide, 5000);
}

const resetInterval = () => {
    clearInterval(carouselInterval);
    startInterval();
}

startInterval();

/* SCROLL REVEAL ANIMATION */
const sections = document.querySelectorAll('.section');

const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

/* FAQ ACCORDION */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header.addEventListener('click', () => {
        const isOpen = item.classList.contains('active-faq');
        
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active-faq');
            }
        });

        // Toggle current item
        item.classList.toggle('active-faq', !isOpen);
    });
});

/* WEB SHARE API */
const shareBtn = document.getElementById('share-btn');

if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Ayam Bakar Mama Ira',
                    text: 'Yuk cobain Ayam Bakar Madu & Goreng Kremes Mama Ira. Rasanya juara!',
                    url: window.location.href
                });
            } catch (err) {
                console.log('Share error:', err);
            }
        } else {
            // Fallback: Copy to clipboard
            const dummy = document.createElement('input');
            const text = window.location.href;
            document.body.appendChild(dummy);
            dummy.value = text;
            dummy.select();
            document.execCommand('copy');
            document.body.removeChild(dummy);
            alert('Link berhasil disalin ke clipboard!');
        }
    });
}

/* SCROLL ACTIVE LINK */
const sectionIds = ['home', 'menu', 'about', 'testimonials', 'faq', 'location'];

function scrollActive() {
    const scrollY = window.pageYOffset;

    sectionIds.forEach(currentId => {
        const section = document.getElementById(currentId);
        if(!section) return;

        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 58;

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            const link = document.querySelector(`.nav-menu a[href*=${currentId}]`);
            if(link) link.classList.add('active-link');
        } else {
            const link = document.querySelector(`.nav-menu a[href*=${currentId}]`);
            if(link) link.classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);
