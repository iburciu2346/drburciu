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
