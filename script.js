
// Mobile nav toggle
const btn = document.querySelector('.menu-toggle');
const mobile = document.querySelector('.mobile-nav');
if (btn) {
  btn.addEventListener('click', () => {
    mobile.style.display = mobile.style.display === 'block' ? 'none' : 'block';
  });
}

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
