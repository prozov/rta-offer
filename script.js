/**
 * RTA AI Transformation Presentation
 * Interactive JavaScript functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initScrollAnimations();
    initTabs();
    initPricingToggle();
    initSmoothScroll();
    initCounters();
    initParallax();
    initCalculator();
});

/**
 * Scroll Animations using Intersection Observer
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.dataset.delay || 0;

                setTimeout(() => {
                    el.classList.add('animated');
                }, parseInt(delay));

                observer.unobserve(el);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Tabs functionality
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            // Update buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update panels
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetTab) {
                    panel.classList.add('active');
                }
            });
        });
    });
}

/**
 * Pricing toggle functionality
 */
function initPricingToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const pricingPanels = document.querySelectorAll('.pricing-panel');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetPricing = button.dataset.pricing;

            // Update buttons
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update panels
            pricingPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetPricing) {
                    panel.classList.add('active');
                }
            });
        });
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');

    anchors.forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Animated counters
 */
function initCounters() {
    const counters = document.querySelectorAll('.count');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };

    const animateCounter = (element, target) => {
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const currentValue = Math.floor(start + (target - start) * easedProgress);

            element.textContent = formatNumber(currentValue);

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };

        requestAnimationFrame(updateCounter);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);

                if (target) {
                    animateCounter(el, target);
                }

                observer.unobserve(el);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

/**
 * Parallax effect for decorative elements
 */
function initParallax() {
    const gradientLines = document.querySelectorAll('.gradient-line');
    const blurCircles = document.querySelectorAll('.blur-circle');

    let ticking = false;

    const updateParallax = () => {
        const scrollY = window.scrollY;

        gradientLines.forEach((line, index) => {
            const speed = 0.1 + (index * 0.05);
            line.style.transform = `translateY(${scrollY * speed}px)`;
        });

        blurCircles.forEach((circle, index) => {
            const speed = 0.05 + (index * 0.03);
            circle.style.transform = `translateY(${scrollY * speed}px) scale(${1 + scrollY * 0.0001})`;
        });

        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

/**
 * Add hover effects to cards with mouse tracking
 */
function initCardEffects() {
    const cards = document.querySelectorAll('.card, .solution-card, .scenario-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

/**
 * Typing effect for hero title (optional enhancement)
 */
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    heroTitle.style.opacity = '1';

    let charIndex = 0;
    const typeSpeed = 30;

    const typeChar = () => {
        if (charIndex < text.length) {
            // Handle HTML tags
            if (text[charIndex] === '<') {
                const closeIndex = text.indexOf('>', charIndex);
                heroTitle.innerHTML += text.substring(charIndex, closeIndex + 1);
                charIndex = closeIndex + 1;
            } else {
                heroTitle.innerHTML += text[charIndex];
                charIndex++;
            }
            setTimeout(typeChar, typeSpeed);
        }
    };

    setTimeout(typeChar, 500);
}

/**
 * Add active state to timeline items on scroll
 */
function initTimelineScroll() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

/**
 * Mobile menu toggle (if needed in future)
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        document.body.classList.toggle('menu-open');
    });
}

/**
 * Reveal sections on scroll with stagger effect
 */
function initStaggerReveal() {
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');

                // Stagger child elements
                const children = entry.target.querySelectorAll('[data-animate]');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animated');
                    }, index * 100);
                });

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * Handle form submission (for future contact form)
 */
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');

        submitButton.disabled = true;
        submitButton.textContent = 'Отправка...';

        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 1500));

            form.reset();
            submitButton.textContent = 'Отправлено!';

            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'Отправить';
            }, 2000);
        } catch (error) {
            submitButton.disabled = false;
            submitButton.textContent = 'Ошибка. Попробуйте снова';
        }
    });
}

/**
 * Lazy load images (if needed)
 */
function initLazyLoad() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

/**
 * Add scroll progress indicator
 */
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.prepend(progressBar);

    const bar = progressBar.querySelector('.scroll-progress-bar');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        bar.style.width = `${scrollPercent}%`;
    });

    // Add styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: rgba(0, 0, 0, 0.1);
            z-index: 9999;
        }
        .scroll-progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #fe8aaf 0%, #fe3678 100%);
            width: 0%;
            transition: width 0.1s ease;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Investment Calculator
 */
function initCalculator() {
    const calculator = document.querySelector('.calculator');
    if (!calculator) return;

    // State
    const state = {
        training: 'online',
        platform: 'onpremise',
        employees: 71,
        period: 12
    };

    // Pricing constants
    const pricing = {
        training: {
            online: 45000,
            offline: 140000
        },
        platform: {
            saas: {
                perUser: 900,
                initial: 0
            },
            onpremise: {
                license: 250000,
                support: 25000,
                server: 17500
            }
        },
        llmTokens: 300 // per employee per month
    };

    // Launch times
    const launchTimes = {
        saas: '2–3 недели',
        onpremise: '3–4 недели'
    };

    // DOM Elements
    const trainingBtns = calculator.querySelectorAll('[data-training]');
    const platformBtns = calculator.querySelectorAll('[data-platform]');
    const employeesSlider = calculator.querySelector('#employeesSlider');
    const employeesValue = calculator.querySelector('#employeesValue');
    const periodSlider = calculator.querySelector('#periodSlider');
    const periodValue = calculator.querySelector('#periodValue');

    const calcStart = calculator.querySelector('#calcStart');
    const calcStartBreakdown = calculator.querySelector('#calcStartBreakdown');
    const calcMonthly = calculator.querySelector('#calcMonthly');
    const calcMonthlyBreakdown = calculator.querySelector('#calcMonthlyBreakdown');
    const calcTco = calculator.querySelector('#calcTco');
    const calcTcoBreakdown = calculator.querySelector('#calcTcoBreakdown');
    const tcoMonths = calculator.querySelector('#tcoMonths');
    const calcLaunch = calculator.querySelector('#calcLaunch');

    // Format number with spaces
    function formatNumber(num) {
        return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    // Calculate and update display
    function calculate() {
        // Training cost
        const trainingCost = pricing.training[state.training];

        // LLM tokens (monthly)
        const llmCost = state.employees * pricing.llmTokens;

        // Platform costs
        let platformInitial = 0;
        let platformMonthly = 0;
        let startTotal = 0;
        let tcoTotal = 0;

        if (state.platform === 'saas') {
            // SaaS: first month included in start
            platformMonthly = state.employees * pricing.platform.saas.perUser;
            const firstMonth = platformMonthly + llmCost;
            startTotal = trainingCost + firstMonth;
            // TCO: start + remaining months
            tcoTotal = startTotal + ((platformMonthly + llmCost) * (state.period - 1));
        } else {
            // On-premise: license upfront, monthly support
            platformInitial = pricing.platform.onpremise.license;
            platformMonthly = pricing.platform.onpremise.support + pricing.platform.onpremise.server;
            startTotal = trainingCost + platformInitial;
            tcoTotal = startTotal + ((platformMonthly + llmCost) * state.period);
        }

        const monthlyTotal = platformMonthly + llmCost;

        // Update display with animation
        animateValue(calcStart, startTotal);
        animateValue(calcMonthly, monthlyTotal);
        animateValue(calcTco, tcoTotal);

        // Update breakdowns
        if (state.platform === 'saas') {
            const firstMonth = platformMonthly + llmCost;
            calcStartBreakdown.textContent = `Обучение: ${formatNumber(trainingCost)} ₽ + 1-й мес.: ${formatNumber(firstMonth)} ₽`;
        } else {
            calcStartBreakdown.textContent = `Обучение: ${formatNumber(trainingCost)} ₽ + Лицензия: ${formatNumber(platformInitial)} ₽`;
        }

        if (state.platform === 'saas') {
            calcMonthlyBreakdown.textContent = `SaaS (${state.employees} чел.): ${formatNumber(platformMonthly)} ₽ + Токены: ${formatNumber(llmCost)} ₽`;
        } else {
            calcMonthlyBreakdown.textContent = `Поддержка + сервер: ${formatNumber(platformMonthly)} ₽ + Токены: ${formatNumber(llmCost)} ₽`;
        }

        tcoMonths.textContent = state.period;
        if (state.platform === 'saas') {
            calcTcoBreakdown.textContent = `Старт + (Ежемесячно × ${state.period - 1} мес.)`;
        } else {
            calcTcoBreakdown.textContent = `Старт + (Ежемесячно × ${state.period} мес.)`;
        }

        // Update launch time
        calcLaunch.textContent = launchTimes[state.platform];
    }

    // Animate value change
    function animateValue(element, newValue) {
        const formattedValue = formatNumber(newValue) + ' ₽';

        // Simple CSS animation trigger
        element.style.transform = 'scale(1.05)';
        element.textContent = formattedValue;

        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 150);
    }

    // Toggle button handlers
    function setupToggle(buttons, stateKey) {
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const value = btn.dataset[stateKey];
                state[stateKey] = value;

                // Update active state
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                calculate();
            });
        });
    }

    // Setup slider handler
    function setupSlider(slider, valueElement, stateKey, suffix = '') {
        slider.addEventListener('input', () => {
            state[stateKey] = parseInt(slider.value);
            valueElement.textContent = slider.value + suffix;
            calculate();
        });
    }

    // Initialize handlers
    setupToggle(trainingBtns, 'training');
    setupToggle(platformBtns, 'platform');
    setupSlider(employeesSlider, employeesValue, 'employees', '');
    setupSlider(periodSlider, periodValue, 'period', ' мес.');

    // Initial calculation
    calculate();
}

// Initialize scroll progress
initScrollProgress();
