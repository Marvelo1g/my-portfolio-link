/* =============================================
   TWITCHKOD PORTFOLIO - script.js
   ============================================= */

// ---- EMAILJS INIT ----
emailjs.init('UeGZz1qv7UBt9ICv7');


// ---- NAVBAR SCROLL EFFECT ----
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');

  const spans = hamburger.querySelectorAll('span');
  const isOpen = navLinks.classList.contains('open');

  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});


// ---- SCROLL REVEAL ANIMATION ----
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      const siblings = Array.from(entry.target.parentElement.children);
      const siblingIndex = siblings.indexOf(entry.target);
      const delay = Math.min(siblingIndex * 80, 400);

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => {
  revealObserver.observe(el);
});


// ---- ACTIVE NAV LINK HIGHLIGHT ----
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active-nav');
        }
      });
    }
  });
}, {
  threshold: 0.4
});

sections.forEach(section => sectionObserver.observe(section));


// ---- CONTACT FORM HANDLER (EmailJS) ----
const contactForm = document.getElementById('contact-form');
const formNote = document.getElementById('form-note');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const service = document.getElementById('service').value;

  if (!name || !email || !message) {
    formNote.textContent = 'Please fill in all required fields.';
    formNote.className = 'form-note error';
    return;
  }

  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  const templateParams = {
    from_name: name,
    from_email: email,
    service_type: service || 'Not specified',
    message: message,
  };

  emailjs.send('service_k471h4k', 'template_y4b2kwc', templateParams)
    .then(() => {
      formNote.textContent = 'Message sent! I will get back to you shortly.';
      formNote.className = 'form-note success';
      contactForm.reset();
      btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
      btn.disabled = false;

      setTimeout(() => {
        formNote.textContent = '';
      }, 5000);
    })
    .catch((error) => {
      console.error('EmailJS error:', error);
      formNote.textContent = 'Something went wrong. Please try again or reach out directly.';
      formNote.className = 'form-note error';
      btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
      btn.disabled = false;
    });
});


// ---- CERTIFICATE IMAGE FALLBACK ----
const certImg = document.querySelector('.cert-img');

if (certImg) {
  certImg.addEventListener('error', () => {
    const wrapper = certImg.closest('.cert-img-wrapper');
    if (wrapper) {
      wrapper.classList.add('cert-img-fallback');
      const placeholder = wrapper.querySelector('.cert-img-placeholder');
      if (placeholder) {
        placeholder.style.display = 'flex';
      }
    }
  });
}


// ---- SMOOTH HOVER TILT ON SERVICE CARDS ----
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 4;
    const rotateY = ((x - centerX) / centerX) * 4;
    card.style.transform = `perspective(800px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


// ---- COUNTER ANIMATION FOR STATS ----
function animateCounter(element, target, suffix) {
  let current = 0;
  const increment = target / 40;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current) + suffix;
  }, 40);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat-num');
      statNums.forEach(num => {
        const text = num.textContent;
        if (text.includes('+')) {
          const val = parseInt(text);
          animateCounter(num, val, '+');
        } else if (text.includes('%')) {
          const val = parseInt(text);
          animateCounter(num, val, '%');
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);


// ---- ACTIVE NAV STYLE (CSS inject) ----
const style = document.createElement('style');
style.textContent = `
  .nav-links a.active-nav {
    color: var(--accent) !important;
  }
`;
document.head.appendChild(style);