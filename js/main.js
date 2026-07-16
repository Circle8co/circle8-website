// ============================================
// CIRCLE8 — MAIN JS
// ============================================

// Hero stagger animation
const heroAnimEls = [
  document.querySelector('.hero-eyebrow'),
  document.querySelector('.hero h1'),
  document.querySelector('.hero-ctas'),
  document.querySelector('.hero-founder')
].filter(Boolean);
heroAnimEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(22px)';
  el.style.transition = 'opacity 0.75s ease, transform 0.75s ease';
});
heroAnimEls.forEach((el, i) => {
  setTimeout(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, 200 + i * 180);
});

// Hero parallax
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    heroBg.style.transform = `translateY(${window.scrollY * 0.35}px)`;
  }, { passive: true });
}

// Brand transition mark parallax
const brandMark = document.querySelector('.brand-transition-inner');
if (brandMark) {
  window.addEventListener('scroll', () => {
    const rect = brandMark.closest('.brand-transition').getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      brandMark.style.transform = `translateY(${(progress - 0.5) * -60}px)`;
    }
  }, { passive: true });
}

// Navigation scroll behaviour
const nav = document.querySelector('.nav');
const heroBrand = document.querySelector('.hero-brand');
const heroSection = document.querySelector('.hero');
if (nav) {
  window.addEventListener('scroll', () => {
    // Homepage: fade nav out past hero
    if (heroSection) {
      const heroBottom = heroSection.offsetHeight;
      const pastHero = window.scrollY >= heroBottom - nav.offsetHeight;
      nav.classList.toggle('past-hero', pastHero);
    }

    // Inner pages (excluding editorial articles): slide nav + logo up out of view when scrolled
    const rtPageHero = document.querySelector('.rt-page-hero');
    const isRtPage = document.body.classList.contains('page-rt');
    const isEditorialPage = document.body.classList.contains('page-editorial');
    if (!heroSection && !rtPageHero && !isRtPage && !isEditorialPage) {
      const hidden = window.scrollY > 80;
      nav.classList.toggle('nav-scrolled-away', hidden);
      if (heroBrand) heroBrand.classList.toggle('nav-scrolled-away', hidden);
    }

    // RT page: eyebrow disappears and logo fades as soon as scrolling starts
    if (isRtPage && heroBrand) {
      heroBrand.classList.remove('nav-scrolled-away');
      document.body.classList.toggle('rt-scrolled', window.scrollY > 20);
    }

    // Reveal GDS eyebrow letters only while inside the logo circle
    if (window._gdsLetters && heroBrand) {
      const logoRect = heroBrand.getBoundingClientRect();
      const cx = logoRect.left + logoRect.width / 2;
      const cy = logoRect.top + logoRect.height / 2;
      const r = logoRect.width * 0.30;
      window._gdsLetters.forEach(span => {
        const lr = span.getBoundingClientRect();
        const x = lr.left + lr.width / 2;
        const y = lr.top + lr.height / 2;
        const inside = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) <= r;
        span.style.color = inside ? 'var(--terracotta)' : 'transparent';
      });
    }

    // Reveal About eyebrow letters only while inside the logo circle
    if (window._aboutLetters && heroBrand) {
      const logoRect = heroBrand.getBoundingClientRect();
      const cx = logoRect.left + logoRect.width / 2;
      const cy = logoRect.top + logoRect.height / 2;
      const r = logoRect.width * 0.30;
      window._aboutLetters.forEach(span => {
        const lr = span.getBoundingClientRect();
        const x = lr.left + lr.width / 2;
        const y = lr.top + lr.height / 2;
        const inside = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) <= r;
        span.style.color = inside ? 'var(--terracotta)' : 'transparent';
      });
    }

    // RT eyebrow: letter-reveal only while inside the logo circle (same as About/GDS/Testimonials)
    if (window._rtLetters && heroBrand) {
      const logoRect = heroBrand.getBoundingClientRect();
      const cx = logoRect.left + logoRect.width / 2;
      const cy = logoRect.top + logoRect.height / 2;
      const r = logoRect.width * 0.30;
      window._rtLetters.forEach(span => {
        const lr = span.getBoundingClientRect();
        const x = lr.left + lr.width / 2;
        const y = lr.top + lr.height / 2;
        const inside = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) <= r;
        span.style.color = inside ? 'var(--terracotta)' : 'transparent';
      });
    }

    // Reveal each letter only while it's inside the logo circle
    if (window._eyebrowLetters && heroBrand) {
      const logoRect = heroBrand.getBoundingClientRect();
      const cx = logoRect.left + logoRect.width / 2;
      const cy = logoRect.top + logoRect.height / 2;
      const r = logoRect.width * 0.30;
      window._eyebrowLetters.forEach(span => {
        const lr = span.getBoundingClientRect();
        const x = lr.left + lr.width / 2;
        const y = lr.top + lr.height / 2;
        const inside = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) <= r;
        span.style.color = inside ? 'var(--terracotta)' : 'transparent';
      });
    }

    // Reveal Testimonials eyebrow letters only while inside the logo circle
    if (window._testimonialsLetters && heroBrand) {
      const logoRect = heroBrand.getBoundingClientRect();
      const cx = logoRect.left + logoRect.width / 2;
      const cy = logoRect.top + logoRect.height / 2;
      const r = logoRect.width * 0.30;
      window._testimonialsLetters.forEach(span => {
        const lr = span.getBoundingClientRect();
        const x = lr.left + lr.width / 2;
        const y = lr.top + lr.height / 2;
        const inside = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) <= r;
        span.style.color = inside ? 'var(--terracotta)' : 'transparent';
      });
    }

    // Homepage: logo watermarks over GDS map and over testimonials, locks solid when the section after each enters view
    if (heroSection && heroBrand) {
      const logoH = heroBrand.offsetHeight;
      const fadeDownStart = logoH + 200;
      const fadeDownEnd = logoH - 60;
      const fadeFactor = (el) => {
        const top = el.getBoundingClientRect().top;
        return Math.min(1, Math.max(0, (fadeDownStart - top) / (fadeDownStart - fadeDownEnd)));
      };

      const gdsMap = document.querySelector('.gds-map-wrap');
      const subscribeSection = document.querySelector('.subscribe-strip');
      const grid = document.querySelector('.testimonials-grid');
      const rtSection = document.querySelector('.round-table-section');

      let opacity = 1;

      if (gdsMap) {
        const subscribeTop = subscribeSection ? subscribeSection.getBoundingClientRect().top : 9999;
        const gdsTop = gdsMap.getBoundingClientRect().top;
        if (subscribeTop <= 180 || gdsTop < fadeDownStart) {
          opacity = subscribeTop <= 180 ? 1 : 1 - fadeFactor(gdsMap) * 0.88;
        }
      }

      if (grid) {
        const rtTop = rtSection ? rtSection.getBoundingClientRect().top : 9999;
        const gridTop = grid.getBoundingClientRect().top;
        if (rtTop <= 180 || gridTop < fadeDownStart) {
          opacity = rtTop <= 180 ? 1 : 1 - fadeFactor(grid) * 0.88;
        }
      }

      const contactSection = document.querySelector('.contact');
      if (contactSection) {
        const contactTop = contactSection.getBoundingClientRect().top;
        const downStart = 369, downEnd = 239, upEnd = 100;
        if (contactTop <= upEnd) {
          opacity = 1;
        } else if (contactTop <= downEnd) {
          const t = (downEnd - contactTop) / (downEnd - upEnd);
          opacity = 0.12 + t * 0.88;
        } else if (contactTop < downStart) {
          const t = (downStart - contactTop) / (downStart - downEnd);
          opacity = 1 - t * 0.88;
        }
      }

      // Logo lands full-colour just above the Contact "buttons / follow the journey" divider
      const contactWatermark = document.querySelector('.contact-watermark');
      if (contactWatermark) {
        const wmTop = contactWatermark.getBoundingClientRect().top;
        const landed = wmTop <= window.innerHeight * 0.82;
        contactWatermark.classList.toggle('visible', landed);
        if (landed) opacity = 0;
      }

      heroBrand.style.opacity = opacity;
      heroBrand.style.pointerEvents = opacity < 0.4 ? 'none' : '';
    }
  }, { passive: true });
}

// Split GDS eyebrow into per-letter spans for logo reveal effect
const gdsEyebrow = document.querySelector('.gds-eyebrow');
if (gdsEyebrow) {
  gdsEyebrow.innerHTML = gdsEyebrow.innerHTML.replace(/<br\s*\/?>/gi, '<br>').split('<br>').map(line =>
    line.trim().split('').map(ch =>
      ch === ' '
        ? '<span class="letter" style="display:inline-block;min-width:0.3em;">&nbsp;</span>'
        : `<span class="letter">${ch}</span>`
    ).join('')
  ).join('<br>');
  window._gdsLetters = Array.from(gdsEyebrow.querySelectorAll('.letter'));
}

// Split about eyebrow into per-letter spans for logo reveal effect
const aboutEyebrow = document.querySelector('.about-eyebrow');
if (aboutEyebrow) {
  aboutEyebrow.innerHTML = aboutEyebrow.textContent.split('').map(ch =>
    ch === ' '
      ? '<span class="letter" style="display:inline-block;min-width:0.3em;">&nbsp;</span>'
      : `<span class="letter">${ch}</span>`
  ).join('');
  window._aboutLetters = Array.from(aboutEyebrow.querySelectorAll('.letter'));
}

// Split round table eyebrow into per-letter spans for logo reveal effect
const rtEyebrow = document.querySelector('.rt-eyebrow');
if (rtEyebrow) {
  rtEyebrow.innerHTML = rtEyebrow.textContent.split('').map(ch =>
    ch === ' '
      ? '<span class="letter" style="display:inline-block;min-width:0.3em;">&nbsp;</span>'
      : `<span class="letter">${ch}</span>`
  ).join('');
  window._rtLetters = Array.from(rtEyebrow.querySelectorAll('.letter'));
}

// Split strategic eyebrow into per-letter spans for logo reveal effect
const strategicEyebrow = document.querySelector('.strategic-eyebrow');
if (strategicEyebrow) {
  strategicEyebrow.innerHTML = strategicEyebrow.textContent.split('').map(ch =>
    ch === ' '
      ? '<span class="letter" style="display:inline-block;min-width:0.3em;">&nbsp;</span>'
      : `<span class="letter">${ch}</span>`
  ).join('');
  window._eyebrowLetters = Array.from(strategicEyebrow.querySelectorAll('.letter'));

}

// Split testimonials eyebrow into per-letter spans for logo reveal effect
const testimonialsEyebrow = document.querySelector('.testimonials-eyebrow');
if (testimonialsEyebrow) {
  testimonialsEyebrow.innerHTML = testimonialsEyebrow.textContent.split('').map(ch =>
    ch === ' '
      ? '<span class="letter" style="display:inline-block;min-width:0.3em;">&nbsp;</span>'
      : `<span class="letter">${ch}</span>`
  ).join('');
  window._testimonialsLetters = Array.from(testimonialsEyebrow.querySelectorAll('.letter'));
}

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    const isOpen = mobileMenu.classList.contains('open');
    spans[0].style.transform = isOpen ? 'rotate(45deg) translate(4px, 4px)' : '';
    spans[1].style.opacity = isOpen ? '0' : '';
    spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(4px, -4px)' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => { mobileMenu.classList.remove('open'); });
  });
}

// Fade-in on scroll
const fadeEls = document.querySelectorAll('.fade-in');
if (fadeEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  fadeEls.forEach(el => observer.observe(el));
}

// Share buttons
document.querySelectorAll('.share-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const type = btn.dataset.share;
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);

    if (type === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=500');
    } else if (type === 'copy') {
      navigator.clipboard.writeText(window.location.href).then(() => {
        const orig = btn.innerHTML;
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
        setTimeout(() => { btn.innerHTML = orig; }, 2000);
      });
    } else if (type === 'instagram') {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link copied — paste it into your Instagram bio or story.');
      });
    }
  });
});

// Subscribe form
const subscribeForm = document.querySelector('.subscribe-form');
if (subscribeForm) {
  subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = subscribeForm.querySelector('input');
    const btn = subscribeForm.querySelector('button');
    if (input.value) {
      btn.textContent = 'You\'re in ✓';
      btn.style.background = '#5a8a5a';
      input.value = '';
      input.placeholder = 'Thank you — we\'ll be in touch.';
      setTimeout(() => {
        btn.textContent = 'Subscribe';
        btn.style.background = '';
        input.placeholder = 'Your email address';
      }, 4000);
    }
  });
}

// Floating nav button
const floatBtn = document.getElementById('floatNavBtn');
const floatOverlay = document.getElementById('floatNavOverlay');
if (floatBtn && floatOverlay) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      floatBtn.classList.add('visible');
    } else {
      floatBtn.classList.remove('visible');
      floatBtn.classList.remove('open');
      floatOverlay.classList.remove('open');
    }
  }, { passive: true });

  floatBtn.addEventListener('click', () => {
    floatBtn.classList.toggle('open');
    floatOverlay.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!floatBtn.contains(e.target) && !floatOverlay.contains(e.target)) {
      floatBtn.classList.remove('open');
      floatOverlay.classList.remove('open');
    }
  });
}


// Round Table interest form
const rtForm = document.querySelector('.rt-form');
if (rtForm) {
  rtForm.addEventListener('submit', (e) => {
    e.preventDefault();
    rtForm.innerHTML = `
      <div style="text-align:center; padding: 2rem 0; color: rgba(255,255,255,0.75);">
        <div style="font-family:'Cinzel',serif; font-size:1.2rem; color:var(--terracotta); margin-bottom:0.75rem;">Interest Received</div>
        <p style="font-size:0.9rem; line-height:1.7;">Thank you. Paulette will be in touch with details of the next Round Table session.</p>
      </div>`;
  });
}

// GDS map — editorial popup clusters on country pins (data-driven, add new countries below)
(() => {
  const GDS_EDITIONS = {
    turkey: [
      { title: 'Galataport', image: 'design-series/turkey/Galataport%20precinct%20images/IMG_0894.jpeg', href: 'design-series/turkey/galataport.html' },
      { title: 'Hagia Sophia', image: 'design-series/turkey/Hagia%20Sophia%20images/IMG_1036.jpeg', href: 'design-series/turkey/hagia-sophia.html' },
      { title: 'Blue Mosque', image: 'design-series/turkey/Blue%20mosque%20images/blue_mosque_08.jpg', href: 'design-series/turkey/blue-mosque.html' },
      { title: 'Topkapi Palace', image: 'design-series/turkey/Topkapi%20Palace%20images/IMG_1094.jpeg', href: 'design-series/turkey/topkapi-palace.html' },
    ],
  };

  const OFFSETS = [
    { dx: -78, dy: -86, tilt: -6 },
    { dx: -16, dy: -124, tilt: 4 },
    { dx: 48, dy: -98, tilt: -3 },
    { dx: 96, dy: -38, tilt: 5 },
    { dx: 60, dy: 50, tilt: -4 },
  ];

  const pins = document.querySelectorAll('.gds-pin');
  if (!pins.length) return;
  const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  const svgNS = 'http://www.w3.org/2000/svg';
  let closeTimer = null;

  pins.forEach(pin => {
    const editions = GDS_EDITIONS[pin.dataset.country];
    if (!editions || !editions.length) return;
    pin.dataset.hasEditions = 'true';

    const leftPct = parseFloat(pin.style.left) || 50;
    const topPct = parseFloat(pin.style.top) || 50;
    const flipX = leftPct > 65 ? -1 : 1;
    const flipY = topPct > 55 ? -1 : 1;

    const cluster = document.createElement('div');
    cluster.className = 'gds-pin-cluster';

    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('class', 'gds-pin-lines');
    svg.setAttribute('width', '400');
    svg.setAttribute('height', '400');
    svg.style.left = '-200px';
    svg.style.top = '-200px';
    cluster.appendChild(svg);

    editions.slice(0, 5).forEach((ed, i) => {
      const off = OFFSETS[i];
      const dx = off.dx * flipX;
      const dy = off.dy * flipY;

      const line = document.createElementNS(svgNS, 'line');
      line.setAttribute('x1', 200);
      line.setAttribute('y1', 200);
      line.setAttribute('x2', 200 + dx);
      line.setAttribute('y2', 200 + dy);
      svg.appendChild(line);

      const item = document.createElement('a');
      item.className = 'gds-pin-item';
      item.href = ed.href;
      item.style.left = `${dx}px`;
      item.style.top = `${dy}px`;
      item.style.setProperty('--tilt', `${off.tilt}deg`);
      item.innerHTML = `
        <span class="gds-pin-thumb"><img src="${ed.image}" alt="${ed.title}" loading="lazy"></span>
        <span class="gds-pin-item-label">${ed.title}</span>`;
      cluster.appendChild(item);
    });

    pin.appendChild(cluster);

    const show = () => {
      clearTimeout(closeTimer);
      document.querySelectorAll('.gds-pin-cluster.is-visible').forEach(c => { if (c !== cluster) c.classList.remove('is-visible'); });
      cluster.classList.add('is-visible');
    };
    const scheduleHide = () => {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(() => cluster.classList.remove('is-visible'), 350);
    };

    if (isTouch) {
      pin.addEventListener('click', (e) => {
        if (e.target.closest('.gds-pin-item')) return;
        e.preventDefault();
        cluster.classList.toggle('is-visible');
      });
    } else {
      pin.addEventListener('mouseenter', show);
      pin.addEventListener('mouseleave', scheduleHide);
      cluster.addEventListener('mouseenter', show);
      cluster.addEventListener('mouseleave', scheduleHide);
    }
  });

  if (isTouch) {
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.gds-pin')) {
        document.querySelectorAll('.gds-pin-cluster.is-visible').forEach(c => c.classList.remove('is-visible'));
      }
    });
  }
})();

// Testimonials marquee
(() => {
  const track = document.getElementById('testimonialsTrack');
  if (!track) return;

  Array.from(track.children).forEach(card => {
    const clone = card.cloneNode(true);
    clone.classList.remove('fade-in', 'visible');
    track.appendChild(clone);
  });

  const SPEED = 45; // pixels per second
  const halfWidth = track.scrollWidth / 2;
  track.style.animationDuration = `${halfWidth / SPEED}s`;
})();
