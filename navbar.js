/**
 * HRFA.MA - Global Navbar Component
 * Handles dynamic navigation based on user authentication and role.
 */

document.addEventListener('DOMContentLoaded', () => {
    const navbarContainer = document.querySelector('.navbar');
    if (!navbarContainer) return;

    const user = JSON.parse(localStorage.getItem('hrfa_user') || 'null');
    const isLoggedIn = !!localStorage.getItem('hrfa_token') && user;

    let dashboardLink = 'login.html';
    if (isLoggedIn) {
        dashboardLink = user.role === 'artisan' ? 'artisan-dashboard.html' : 'client-dashboard.html';
    }

    let navContent = `
        <div class="container nav-container">
            <a href="index.html" class="logo">HRFA<span class="text-orange">.MA</span></a>
            <div class="nav-links">
                <div class="mobile-nav-header">
                    <a href="index.html" class="logo">HRFA<span class="text-orange">.MA</span></a>
                    <button id="closeMenu" class="btn-close-menu"><i class="ri-close-line"></i></button>
                </div>
                <a href="index.html#services" class="nav-link"><i class="ri-service-line"></i> خدماتنا</a>
                <a href="artisans.html" class="nav-link"><i class="ri-tools-line"></i> تصفح الحرفيين</a>
                ${isLoggedIn ? `
                    <div class="user-profile-nav">
                        <div class="user-info" onclick="window.location.href='${dashboardLink}'">
                            <img src="${user.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name)}" class="user-avatar-sm">
                            <div class="user-details">
                                <span class="user-name-small">${user.name}</span>
                                <span class="user-role-small">لوحة التحكم</span>
                            </div>
                        </div>
                        ${user.role === 'artisan' ? `
                            <a href="shop.html" class="nav-link" style="margin-right:15px;"><i class="ri-shopping-bag-3-line"></i> المتجر</a>
                        ` : ''}
                        <button onclick="logout()" class="btn btn-outline-danger nav-logout-btn" title="تسجيل الخروج">
                            <i class="ri-logout-box-line"></i> خروج
                        </button>
                    </div>
                ` : `
                    <a href="register.html" class="nav-link"><i class="ri-user-add-line"></i> كن شريكاً معنا</a>
                    <div class="nav-auth-btns">
                        <a href="login.html" class="btn btn-secondary">تسجيل الدخول</a>
                        <a href="register.html" class="btn btn-primary">ابدأ الآن</a>
                    </div>
                `}
            </div>
            <div class="menu-toggle" id="menuToggle">
                <i class="ri-menu-3-line"></i>
            </div>
        </div>
    `;

    navbarContainer.innerHTML = navContent;

    // Add overlay to body
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    // Mobile menu toggle logic
    const toggle = document.getElementById('menuToggle');
    const closeBtn = document.getElementById('closeMenu');
    const navLinks = navbarContainer.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');

    const toggleMenu = (show) => {
        navLinks.classList.toggle('active', show);
        navOverlay.classList.toggle('active', show);
        document.body.style.overflow = show ? 'hidden' : '';
        if (show) {
            navbarContainer.style.background = 'white';
            navbarContainer.style.backdropFilter = 'none';
            navbarContainer.style.webkitBackdropFilter = 'none';
            navLinks.style.background = 'white';
            navLinks.style.opacity = '1';
        } else {
            updateNavbarStyle();
        }
    };

    const updateNavbarStyle = () => {
        if (window.scrollY > 50) {
            navbarContainer.style.background = 'white';
            navbarContainer.style.padding = '10px 0';
            navbarContainer.style.boxShadow = 'var(--shadow-premium)';
            navbarContainer.style.backdropFilter = 'blur(12px)';
        } else {
            navbarContainer.style.background = 'rgba(255, 255, 255, 0.97)';
            navbarContainer.style.padding = '16px 0';
            navbarContainer.style.boxShadow = 'none';
            navbarContainer.style.backdropFilter = 'blur(12px)';
        }
    };

    if (toggle) toggle.addEventListener('click', () => toggleMenu(true));
    if (closeBtn) closeBtn.addEventListener('click', () => toggleMenu(false));
    if (navOverlay) navOverlay.addEventListener('click', () => toggleMenu(false));

    // Close on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // Scroll effect
    window.addEventListener('scroll', updateNavbarStyle);
});

function logout() {
    localStorage.removeItem('hrfa_token');
    localStorage.removeItem('hrfa_user');
    window.location.href = 'index.html';
}
