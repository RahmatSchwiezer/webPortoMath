// --- Dark Mode Logic ---
const toggleSwitch = document.querySelector('#theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') { toggleSwitch.checked = true; }
}

toggleSwitch.addEventListener('change', function(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

// --- Mobile Menu Hamburger Logic ---
const mobileMenuBtn = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show-menu');
});

// Tutup menu saat link diklik (di mode HP)
document.querySelectorAll('.nav-item').forEach(n => n.addEventListener('click', () => {
    navLinks.classList.remove('show-menu');
}));

// --- Scroll Spy & Nav Pill Logic ---
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-item");
const projectSection = document.getElementById('project');
const projectLink = document.getElementById('project-link');

window.addEventListener("scroll", () => {
    let current = "";
    let scrollY = window.pageYOffset;

    // 1. Deteksi section yang sedang aktif
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - (window.innerHeight / 2)) {
            current = section.getAttribute("id");
        }
    });

    // 2. Terapkan kelas active ke menu
    navItems.forEach((a) => {
        a.classList.remove("active");
        a.classList.remove("active-half"); // Hapus kelas half-line
        if (a.getAttribute("href").includes(current)) {
            a.classList.add("active");
        }
    });

    // 3. Logic Spesifik untuk Section "Project" (Nav Pill & Half-Line)
    if (projectSection) {
        const projectTop = projectSection.offsetTop;
        const projectHeight = projectSection.clientHeight;
        const projectBottom = projectTop + projectHeight;
        
        // Cek jika viewport sedang berada di dalam area Project
        if (scrollY >= projectTop - 100 && scrollY < projectBottom - 100) {
            // Ubah bentuk Navbar jadi Pill
            navbar.classList.add('nav-pill');
            
            // Hitung persentase scroll di dalam section Project
            let scrollProgress = scrollY - projectTop;
            
            if (scrollProgress < projectHeight / 3) {
                // Jika masih di bagian awal project, garisnya setengah
                projectLink.classList.add('active-half');
                projectLink.classList.remove('active');
            } else {
                // Jika sudah scroll agak ke bawah di project, garisnya full
                projectLink.classList.add('active');
                projectLink.classList.remove('active-half');
            }
        } else {
            // Kembalikan Navbar ke bentuk normal
            navbar.classList.remove('nav-pill');
        }
    }
});

// --- Scroll Animation (Fade In) dengan Intersection Observer ---
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        // Jika elemen masuk ke area layar
        if (entry.isIntersecting) {
            entry.target.classList.add('show-anim');
            // Stop mengawasi elemen ini setelah animasinya jalan (biar performa ringan)
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1, 
    rootMargin: "0px 0px -50px 0px" // Memicu animasi sedikit sebelum elemen benar-benar masuk
});

// Pilih elemen yang mau diberi animasi
const elementsToAnimate = document.querySelectorAll(
    '.hero-box, .hero-desc, .hero-image, ' +
    '.section-title, .timeline-row, ' +
    '.card, .exp-text, ' +
    '.project-item, ' +
    '.social-pill, .quote-box'
);

// Pasangkan class "hidden-anim" di awal
elementsToAnimate.forEach((el) => {
    el.classList.add('hidden-anim');
    observer.observe(el);
});