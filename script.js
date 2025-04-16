/* script.js */
document.addEventListener('DOMContentLoaded', function() {
   // Basic smooth scrolling for navigation links
   document.querySelectorAll('nav a').forEach(anchor => {
       anchor.addEventListener('click', function(e) {
           e.preventDefault();
           document.querySelector(this.getAttribute('href')).scrollIntoView({
               behavior: 'smooth'
           });
       });
   });

   // --- Advanced JavaScript Effects ---
   // 1. Hero Section Animation (Fade-in and Slide-up)
   const heroContent = document.querySelector('.hero-content');
   if (heroContent) {
       heroContent.style.opacity = 0;
       heroContent.style.transform = 'translateY(20px)';
       setTimeout(() => {
           heroContent.style.opacity = 1;
           heroContent.style.transform = 'translateY(0)';
           heroContent.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
       }, 300);
   }

   // 2. Scroll-triggered Animations for Sections (Fade-in)
   const sections = document.querySelectorAll('.section');
   const observer = new IntersectionObserver(entries => {
       entries.forEach(entry => {
           if (entry.isIntersecting) {
               entry.target.style.opacity = 1;
               entry.target.style.transform = 'translateY(0)';
               entry.target.style.transition = 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out';
               observer.unobserve(entry.target);
           } else {
               entry.target.style.opacity = 0;
               entry.target.style.transform = 'translateY(30px)';
           }
       });
   }, {
       threshold: 0.1
   });
   sections.forEach(section => {
       section.style.opacity = 0;
       section.style.transform = 'translateY(30px)';
       observer.observe(section);
   });

   // 3. Project Card Hover Effect (Subtle Lift and Shadow)
   const projectCards = document.querySelectorAll('.project-card');
   projectCards.forEach(card => {
       card.addEventListener('mouseenter', () => {
           card.style.transform = 'translateY(-3px)';
           card.style.boxShadow = '0 3px 7px rgba(0, 0, 0, 0.1)';
           card.style.transition = 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out';
       });
       card.addEventListener('mouseleave', () => {
           card.style.transform = 'translateY(0)';
           card.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
           card.style.transition = 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out';
       });
   });

   // --- Hero Background Animation (Particle Effect) ---
   function createParticle() {
       const particle = document.createElement('div');
       particle.classList.add('particle');
       const heroElement = document.getElementById('hero');
       if (heroElement) {
           heroElement.appendChild(particle);
           // Random position
           const x = Math.random() * 100;
           const y = Math.random() * 100;
           particle.style.left = `${x}vw`;
           particle.style.top = `${y}vh`;
           // Random size
           const size = Math.random() * 5 + 5;
           particle.style.width = `${size}px`;
           particle.style.height = `${size}px`;
           const colors = ['#e65100', '#d84315', '#c62828', '#b71c1c', '#4a148c', '#311b92', '#1a237e'];
           const randomColor = colors[Math.floor(Math.random() * colors.length)];
           particle.style.backgroundColor = randomColor;
           // Random movement direction
           particle.style.setProperty('--x', (Math.random() - 0.5) * 1);
           particle.style.setProperty('--y', (Math.random() - 0.5) * 1);
           // Random animation delay
           particle.style.animationDelay = `${Math.random() * 2}s`;
           // Remove particle after animation completes
           particle.addEventListener('animationend', () => {
               particle.remove();
           });
       }
   }
   // Create particles every 200 milliseconds
   setInterval(createParticle, 200);

   // --- Theme Switch ---
   const themeButton = document.getElementById('theme-button');
   const body = document.body;
   const navElement = document.querySelector('nav');
   const sectionElements = document.querySelectorAll('.section');
   const heroElement = document.getElementById('hero');
   const heroContentElements = document.querySelectorAll('.hero-content h2, .hero-content p, .hero-content .button');
   const projectCardElements = document.querySelectorAll('.project-card');
   const projectCardTitleElements = document.querySelectorAll('.project-card h3');
   const projectCardTextElements = document.querySelectorAll('.project-card p');
   const projectCardLinkElements = document.querySelectorAll('.project-card a');
   const hamburgerBtn = document.getElementById('hamburger-btn');
   const navList = document.querySelector('nav ul');
   const contactH2 = document.querySelector('#contact h2');
   const contactDetails = document.querySelectorAll('#contact-details p, #contact-details a');
   const navLinks = document.querySelectorAll('nav ul li a');

   function setTheme(theme) {
       const isDark = theme === 'dark';
       body.classList.toggle('dark-theme', isDark);
       if (navElement) navElement.classList.toggle('dark-theme', isDark);
       sectionElements.forEach(section => section.classList.toggle('dark-theme', isDark));
       if (heroElement) heroElement.classList.toggle('dark-theme', isDark);
       heroContentElements.forEach(element => element.classList.toggle('dark-theme', isDark));
       projectCardElements.forEach(card => card.classList.toggle('dark-theme', isDark));
       projectCardTitleElements.forEach(title => title.classList.toggle('dark-theme', isDark));
       projectCardTextElements.forEach(text => text.classList.toggle('dark-theme', isDark));
       projectCardLinkElements.forEach(link => link.classList.toggle('dark-theme', isDark));
       if (hamburgerBtn) hamburgerBtn.classList.toggle('dark-theme', isDark);
       if (contactH2) contactH2.classList.toggle('dark-theme', isDark);
       contactDetails.forEach(detail => detail.classList.toggle('dark-theme', isDark));
       localStorage.setItem('theme', theme);
       themeButton.textContent = isDark ? 'Light Mode' : 'Dark Mode';
   }

   const currentTheme = localStorage.getItem('theme');
   if (currentTheme) {
       setTheme(currentTheme);
   } else {
       setTheme('light');
   }

   themeButton.addEventListener('click', () => {
       setTheme(localStorage.getItem('theme') === 'dark' ? 'light' : 'dark');
   });

   if (hamburgerBtn && navList) {
       hamburgerBtn.addEventListener('click', () => {
           navList.classList.toggle('active');
       });

       navLinks.forEach(link => {
           link.addEventListener('click', () => {
               navList.classList.remove('active');
           });
       });
   }
});