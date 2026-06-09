document.addEventListener('DOMContentLoaded', () => {
    // Preloader Logic
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            // Add a tiny delay to ensure a smooth transition even if it loads too fast
            setTimeout(() => {
                preloader.classList.add('fade-out');
            }, 300);
        }
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('ion-icon');
            if(navLinks.classList.contains('active')) {
                icon.setAttribute('name', 'close-outline');
            } else {
                icon.setAttribute('name', 'menu-outline');
            }
        });
    }

    // Close menu when clicking a link
    if (navItems) {
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if(hamburger.querySelector('ion-icon')){
                    hamburger.querySelector('ion-icon').setAttribute('name', 'menu-outline');
                }
            });
        });
    }

    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 350, // Ultra-fast animation
            easing: 'ease-in-out',
            once: true, // Animation only happens once when scrolling down
            offset: 0, // Trigger immediately the moment it enters viewport
        });
    }

    // --- Drawer Logic (SSS & Privacy) ---
    const openSssBtn = document.getElementById('openSssDrawer');
    const sssDrawer = document.getElementById('sssDrawer');
    const drawerContent = document.getElementById('drawerContent');
    const drawerHandle = document.querySelector('.drawer-handle-container');

    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    // Open Drawer
    if (openSssBtn) {
        openSssBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sssDrawer.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }

    // Close when clicking overlay
    if (sssDrawer) {
        sssDrawer.addEventListener('click', (e) => {
            if (e.target === sssDrawer) {
                closeDrawer();
            }
        });
    }

    function closeDrawer() {
        drawerContent.style.transform = `translateY(100%)`;
        sssDrawer.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            drawerContent.style.transform = ''; // Reset for next open
        }, 500); 
    }

    // Drag to close functionality
    function handleDragStart(y) {
        startY = y;
        isDragging = true;
        drawerContent.style.transition = 'none'; // Disable transition for smooth dragging
    }

    function handleDragMove(y) {
        if (!isDragging) return;
        currentY = y - startY;
        if (currentY > 0) { // Only allow dragging downwards
            drawerContent.style.transform = `translateY(${currentY}px)`;
        }
    }

    function handleDragEnd() {
        if (!isDragging) return;
        isDragging = false;
        drawerContent.style.transition = 'transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)';
        
        // If dragged down more than 100px, close it
        if (currentY > 100) {
            closeDrawer();
        } else {
            // Snap back
            drawerContent.style.transform = 'translateY(0)';
        }
        currentY = 0;
    }

    // Mouse events for dragging
    if (drawerHandle) {
        drawerHandle.addEventListener('mousedown', (e) => handleDragStart(e.clientY));
        window.addEventListener('mousemove', (e) => handleDragMove(e.clientY));
        window.addEventListener('mouseup', handleDragEnd);

        // Touch events for dragging
        drawerHandle.addEventListener('touchstart', (e) => handleDragStart(e.touches[0].clientY), {passive: true});
        window.addEventListener('touchmove', (e) => handleDragMove(e.touches[0].clientY), {passive: true});
        window.addEventListener('touchend', handleDragEnd);
    }
});
