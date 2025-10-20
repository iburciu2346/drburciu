/* =========================================
   Dr. Ana Burciu – Scripts (clean)
   ========================================= */
(() => {
  // ===== Mobile menu toggle & auto-close =====
  const menuBtn   = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const navLinks  = document.querySelectorAll('.mobile-nav a, .nav a');

  const openMenu = () => {
    document.body.classList.add('menu-open');
    menuBtn?.setAttribute('aria-expanded', 'true');
  };
  const closeMenu = () => {
    document.body.classList.remove('menu-open');
    menuBtn?.setAttribute('aria-expanded', 'false');
  };
  const toggleMenu = () => {
    if (document.body.classList.contains('menu-open')) closeMenu();
    else openMenu();
  };

  // Toggle buton
  menuBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Închide când se alege un link (mobil sau desktop)
  navLinks.forEach(a => {
    a.addEventListener('click', () => closeMenu());
  });

  // Închide dacă se apasă în afara meniului mobil
  document.addEventListener('click', (e) => {
    if (!document.body.classList.contains('menu-open')) return;
    const isClickInside = mobileNav?.contains(e.target) || menuBtn?.contains(e.target);
    if (!isClickInside) closeMenu();
  });

  // Închide la Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Închide dacă lățimea depășește breakpointul mobil
  let resizeTO;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTO);
    resizeTO = setTimeout(() => {
      if (window.innerWidth > 900) closeMenu();
    }, 120);
  });

  // Închide la schimbarea hash-ului (#servicii etc.)
  window.addEventListener('hashchange', closeMenu);

  // ===== Marchează linkul activ (pagina / ancora curentă) =====
  const markActiveLink = () => {
    const links = document.querySelectorAll('.nav a');
    const curURL = location.origin + location.pathname;
    const curHash = location.hash;

    links.forEach(link => link.classList.remove('active'));

    // 1) dacă e pagină separată (programari.html) – potrivim exact href-ul
    const exact = Array.from(links).find(a => a.href === location.href);
    if (exact) {
      exact.classList.add('active');
      return;
    }

    // 2) dacă suntem pe index și avem hash (#servicii etc.)
    if (curHash) {
      const hashLink = Array.from(links).find(a => a.hash === curHash && a.href.startsWith(curURL));
      if (hashLink) hashLink.classList.add('active');
      return;
    }

    // 3) fallback: dacă suntem pe index fără hash – nu marcăm nimic sau marchează primul
    // (comentat intenționat)
    // links[0]?.classList.add('active');
  };
  markActiveLink();
  window.addEventListener('hashchange', markActiveLink);

  // Opțional: marchează activ în timp ce derulezi pe secțiuni (#servicii, #despre, #tarife, #contact)
  const sections = document.querySelectorAll('section[id]');
  if ('IntersectionObserver' in window && sections.length) {
    const io = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const id = '#' + visible.target.id;
      document.querySelectorAll('.nav a').forEach(a => {
        a.classList.toggle('active', a.hash === id);
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });
    sections.forEach(sec => io.observe(sec));
  }

  // ===== Formular simplu (contact / programări – mailto fallback) =====
  const form = document.querySelector('#appointmentForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // validare câmpuri required
      const required = form.querySelectorAll('[required]');
      for (const input of required) {
        if (!String(input.value || '').trim()) {
          alert('Te rugăm să completezi toate câmpurile obligatorii.');
          input.focus();
          return;
        }
      }

      // pregătește mailto
      const data = new FormData(form);
      const subject = encodeURIComponent('Programare nouă – Dr. Ana Burciu');
      const body = encodeURIComponent(
        `Nume: ${data.get('nume') || ''}\n` +
        `Telefon: ${data.get('telefon') || ''}\n` +
        `Email: ${data.get('email') || ''}\n` +
        `Motiv: ${data.get('motiv') || ''}\n` +
        `Mesaj: ${data.get('mesaj') || ''}\n` +
        `\n— trimis din formularul de pe drburciu.ro`
      );

      // deschide clientul de email al utilizatorului
      window.location.href = `mailto:contact@drburciu.ro?subject=${subject}&body=${body}`;

      // feedback vizual
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Se deschide emailul…';
        setTimeout(() => { btn.disabled = false; btn.textContent = 'Trimite cererea'; }, 4000);
      }
    });
  }
})();
