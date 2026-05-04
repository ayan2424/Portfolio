/**
 * ══════════════════════════════════════════════
 * PORTFOLIO — Premium Interactive Engine
 * ══════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ── Typewriter Effect ──
    const typewriters = [
        { el: document.getElementById('typewriter'), words: ['WordPress Developer', 'Frontend Developer', 'UI/UX Designer'] },
        { el: document.getElementById('typewriter2'), words: ['Design', 'Create', 'Craft'] }
    ];
    typewriters.forEach(tw => {
        if (!tw.el) return;
        let wordIdx = 0, charIdx = 0, deleting = false;
        const speed = 100, delSpeed = 60, pause = 2000;
        function tick() {
            const word = tw.words[wordIdx];
            if (deleting) {
                tw.el.textContent = word.substring(0, charIdx--);
                if (charIdx < 0) { deleting = false; wordIdx = (wordIdx + 1) % tw.words.length; setTimeout(tick, 400); return; }
            } else {
                tw.el.textContent = word.substring(0, ++charIdx);
                if (charIdx === word.length) { deleting = true; setTimeout(tick, pause); return; }
            }
            setTimeout(tick, deleting ? delSpeed : speed);
        }
        setTimeout(tick, 1000);
    });

    // ── Counter Animation ──
    const counters = document.querySelectorAll('.counter');
    const animateCounter = (el) => {
        const target = parseInt(el.dataset.target);
        const duration = 2000;
        const start = performance.now();
        const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    // ── Intersection Observer for Animations ──
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('counter')) animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.animate-in, .counter').forEach(el => observer.observe(el));

    // ── GSAP ScrollTrigger Animations ──
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Animate sections on scroll
        gsap.utils.toArray('.section').forEach(section => {
            const heading = section.querySelector('h1, h3');
            if (heading) {
                gsap.from(heading, {
                    scrollTrigger: { trigger: heading, start: 'top 85%', toggleActions: 'play none none none' },
                    y: 40, opacity: 0, duration: 0.8, ease: 'power3.out'
                });
            }
        });

        // Timeline items stagger
        gsap.utils.toArray('.timeline-item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: { trigger: item, start: 'top 88%' },
                x: -30, opacity: 0, duration: 0.6, delay: i * 0.1, ease: 'power2.out'
            });
        });

        // Service items stagger
        gsap.utils.toArray('.service-item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: { trigger: item, start: 'top 88%' },
                y: 30, opacity: 0, duration: 0.6, delay: i * 0.1, ease: 'power2.out'
            });
        });

        // Portfolio items
        gsap.utils.toArray('.portfolio-item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: { trigger: item, start: 'top 85%' },
                y: 60, opacity: 0, duration: 0.8, delay: i * 0.15, ease: 'power3.out'
            });
        });

        // Stat cards
        gsap.utils.toArray('.stat-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: { trigger: card, start: 'top 90%' },
                y: 40, opacity: 0, duration: 0.6, delay: i * 0.15, ease: 'power2.out'
            });
        });
    }

    // ── Dot Navigation Active Tracking ──
    const sections = document.querySelectorAll('.section');
    const navDots = document.querySelectorAll('.nav-dot');
    const mobileLinks = document.querySelectorAll('.mobile-menu .menu-links a');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navDots.forEach(dot => dot.classList.toggle('active', dot.dataset.section === id));
                mobileLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + id));
            }
        });
    }, { threshold: 0.3, rootMargin: '-10% 0px -10% 0px' });

    sections.forEach(s => sectionObserver.observe(s));

    // Smooth scroll on nav click
    [...navDots, ...mobileLinks, ...document.querySelectorAll('.mobile-menu .menu-links a')].forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Close mobile menu
                document.getElementById('mobileMenu')?.classList.remove('active');
                document.getElementById('menuOverlay')?.classList.remove('active');
            }
        });
    });

    // Also handle sidebar buttons & other anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // ── Pricing Tabs ──
    const tabBtns = document.querySelectorAll('#pricingTabs button');
    const cards = document.querySelectorAll('.pricing-card');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            cards.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab)?.classList.add('active');
        });
    });

    // ── Budget Tags Toggle ──
    document.querySelectorAll('#budgetTags a').forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('#budgetTags a').forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
        });
    });

    // ── Testimonial Swiper ──
    if (typeof Swiper !== 'undefined') {
        new Swiper('.testimonial-slider', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: { delay: 5000, disableOnInteraction: false },
            navigation: {
                prevEl: '.swiper-prev',
                nextEl: '.swiper-next'
            }
        });
    }

    // ── Mobile Menu ──
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            menuOverlay.classList.add('active');
        });
    }
    [menuClose, menuOverlay].forEach(el => {
        if (el) el.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
        });
    });

    // ── Contact Form ──
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (formStatus) {
                formStatus.style.display = 'block';
                formStatus.textContent = 'Sending message...';
                formStatus.className = 'form-status';
                formStatus.style.color = '#fff';
            }

            const formData = new FormData(contactForm);

            try {
                // Submit to the form's action URL (Web3Forms)
                const res = await fetch(contactForm.action, { 
                    method: 'POST', 
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                
                const data = await res.json();
                
                if (res.status === 200) {
                    if (formStatus) {
                        formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                        formStatus.className = 'form-status success';
                    } else {
                        alert('Message sent successfully! I\'ll get back to you soon.');
                    }
                    contactForm.reset();
                } else {
                    if (formStatus) {
                        formStatus.textContent = data.message || 'Something went wrong. Please try again.';
                        formStatus.className = 'form-status error';
                    } else {
                        alert(data.message || 'Something went wrong. Please try again.');
                    }
                }
            } catch (error) {
                if (formStatus) {
                    formStatus.textContent = 'Failed to send message. Please check your connection.';
                    formStatus.className = 'form-status error';
                } else {
                    alert('Failed to send message.');
                }
            }
            
            if (formStatus) {
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            }
        });
    }

    console.log('🚀 Portfolio loaded successfully');
});
