// ===== انتظار تحميل الصفحة =====
document.addEventListener('DOMContentLoaded', function() {
    // تفعيل AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
    
    // تفعيل Typed.js
    initTyped();
});

// ===== تفعيل القائمة المتنقلة =====
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== تفعيل الكتابة التلقائية =====
function initTyped() {
    if (document.querySelector('.typed-text')) {
        new Typed('.typed-text', {
            strings: [
                'مطور فرونت إند',
                'مطور باك إند',
                'خبير أمن سيبراني',
                'متخصص تحسين SEO',
                'من الشرقية'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            rtl: true
        });
    }
}

// ===== عدادات الأرقام التصاعدية =====
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

const animateCounter = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        
        const inc = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(animateCounter, 20);
        } else {
            counter.innerText = target;
        }
    });
};

// تشغيل العدادات عندما تظهر في الشاشة
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

if (document.querySelector('.hero-stats')) {
    observer.observe(document.querySelector('.hero-stats'));
}

// ===== فلترة المشاريع =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // إزالة الكلاس النشط من جميع الأزرار
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // إضافة الكلاس النشط للزر الحالي
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== نموذج الاتصال عبر واتساب =====
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // جمع بيانات النموذج
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // التحقق من الحقول المطلوبة
    if (!name || !email || !message) {
        alert('يرجى ملء جميع الحقول المطلوبة');
        return;
    }
    
    // تكوين رسالة واتساب
    const whatsappMessage = `
        *رسالة جديدة من موقع محمود محمد عطيه*
        
        *الاسم:* ${name}
        *البريد:* ${email}
        *الهاتف:* ${phone || 'غير محدد'}
        *الخدمة:* ${service || 'غير محدد'}
        
        *الرسالة:*
        ${message}
    `;
    
    // رقم واتساب محمود (غير الرقم لرقمك الفعلي)
    const phoneNumber = '201123961290'; // بدون + أو 00
    
    // إنشاء رابط واتساب
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // فتح واتساب في نافذة جديدة
    window.open(whatsappUrl, '_blank');
    
    // رسالة تأكيد للمستخدم
    alert('تم تحويلك إلى واتساب لإكمال المحادثة');
    
    // تفريغ النموذج
    this.reset();
});

// ===== إضافة كلاس نشط للرابط الحالي في القائمة =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== زر العودة للأعلى =====
const createBackToTop = () => {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'العودة للأعلى');
    
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.style.display = 'flex';
        } else {
            btn.style.display = 'none';
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

createBackToTop();

// ===== تحميل صور المشاريع بشكل تدريجي =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== تفعيل الوضع الليلي حسب تفضيلات النظام =====
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
}

// متابعة تغيير الوضع الليلي
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (e.matches) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});

// ===== تحسين أداء التمرير =====
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // يمكن إضافة تحديثات هنا إذا لزم الأمر
            ticking = false;
        });
        ticking = true;
    }
});

// ===== كشف اتصال الإنترنت =====
window.addEventListener('online', () => {
    document.body.classList.remove('offline');
    // يمكن إظهار إشعار للمستخدم
});

window.addEventListener('offline', () => {
    document.body.classList.add('offline');
    alert('انقطع اتصال الإنترنت. بعض الميزات قد لا تعمل.');
});

// ===== منع تقديم النموذج إذا كان المستخدم غير متصل =====
window.addEventListener('offline', () => {
    const submitBtn = document.querySelector('.btn-submit');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.title = 'لا يمكن الإرسال بدون اتصال بالإنترنت';
    }
});

window.addEventListener('online', () => {
    const submitBtn = document.querySelector('.btn-submit');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.title = '';
    }
});

// ===== تحسين تجربة المستخدم على الأجهزة اللمسية =====
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

// ===== حفظ تفضيلات المستخدم =====
const saveUserPreference = (key, value) => {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        console.log('LocalStorage غير متاح');
    }
};

const getUserPreference = (key) => {
    try {
        return localStorage.getItem(key);
    } catch (e) {
        return null;
    }
};

// ===== تفعيل التمرير السلس للروابط الداخلية =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});