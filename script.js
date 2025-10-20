// ===== Mobile menu toggle & auto-close =====
const menuBtn   = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const allLinks  = document.querySelectorAll('.mobile-nav a, .nav a');

function openMenu() {
  document.body.classList.add('menu-open');
  if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
}
function closeMenu() {
  document.body.classList.remove('menu-open');
  if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
}

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('menu-open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });
}

// Închide meniul după ce utilizatorul alege un link
allLinks.forEach(a => {
  a.addEventListener('click', () => {
    closeMenu();
  });
});

// Închide la Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// Închide dacă lățimea depășește breakpointul mobil
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) closeMenu();
});

// Închide la schimbarea hash-ului (navigare spre #secțiuni)
window.addEventListener('hashchange', closeMenu);



// Simple appointment form handler (prevents empty fields)
const form = document.querySelector('#appointmentForm');
if (form) {
  form.addEventListener('submit', (e) => {
    const required = form.querySelectorAll('[required]');
    for (const input of required) {
      if (!input.value.trim()) {
        alert('Te rugăm completează toate câmpurile obligatorii.');
        input.focus();
        e.preventDefault();
        return;
      }
    }
  });
}


// Mailto fallback for form submission
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent('Programare nouă – Dr. Ana Burciu');
    const body = encodeURIComponent(
      `Nume: ${data.get('nume')}\n` +
      `Telefon: ${data.get('telefon')}\n` +
      `Email: ${data.get('email')}\n` +
      `Motiv: ${data.get('motiv')}\n` +
      `Mesaj: ${data.get('mesaj') || ''}`
    );
    window.location.href = `mailto:contact@drburciu.ro?subject=${subject}&body=${body}`;
  }, { once: true });
}
