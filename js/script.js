document.addEventListener('DOMContentLoaded', () => {
    // Show loader
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '1';
    }

    // Hide loader and show content after 500ms
    setTimeout(() => {
        if (loader) {
            loader.style.opacity = '0';
            loader.addEventListener('transitionend', () => {
                loader.style.display = 'none';
            }, { once: true });
        }
        // Add show class to hero section for fade-in effect
        const heroSection = document.getElementById('home');
        if (heroSection) {
            heroSection.classList.add('show');
        }
    }, 500); // Adjust this delay if needed for a smoother load effect

    // Theme Toggle Functionality
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    } else {
        // Default to light mode if no theme is set
        document.body.classList.add('light-mode');
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');

        let theme = 'light-mode';
        if (document.body.classList.contains('dark-mode')) {
            theme = 'dark-mode';
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
        localStorage.setItem('theme', theme);
    });

    // Dynamic Greeting and Date/Time
    const greetingElement = document.getElementById('greeting');
    const datetimeElement = document.getElementById('datetime');

    function updateGreetingAndDateTime() {
        const now = new Date();
        const hour = now.getHours();
        let greeting;

        if (hour >= 5 && hour < 12) {
            greeting = 'Selamat Pagi!';
        } else if (hour >= 12 && hour < 18) {
            greeting = 'Selamat Siang!';
        } else if (hour >= 18 && hour < 22) {
            greeting = 'Selamat Sore!';
        } else {
            greeting = 'Selamat Malam!';
        }

        const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const dateString = now.toLocaleDateString('id-ID', optionsDate);
        const timeString = now.toLocaleTimeString('id-ID', optionsTime);

        if (greetingElement) {
            greetingElement.textContent = greeting;
        }
        if (datetimeElement) {
            datetimeElement.textContent = `${dateString}, ${timeString} WIB`;
        }
    }

    // Update greeting and time every second
    updateGreetingAndDateTime();
    setInterval(updateGreetingAndDateTime, 1000);

    // Auto-close Navbar on Link Click for Mobile
    const navbarNav = document.getElementById('navbarNav');
    if (navbarNav) {
        const navLinks = navbarNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Check if the navbar is currently open (has 'show' class)
                const bsCollapse = bootstrap.Collapse.getInstance(navbarNav);
                if (navbarNav.classList.contains('show')) {
                    if (bsCollapse) {
                        bsCollapse.hide(); // Hide the navbar using Bootstrap's API
                    } else {
                        // Fallback if getInstance fails (shouldn't happen with Bootstrap 5.3)
                        navbarNav.classList.remove('show');
                    }
                }
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});