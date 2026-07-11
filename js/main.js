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

    // Editorial/inner pages: slide nav + logo up out of view when scrolled
    const rtPageHero = document.querySelector('.rt-page-hero');
    const isRtPage = document.body.classList.contains('page-rt');
    if (!heroSection && !rtPageHero && !isRtPage) {
      const hidden = window.scrollY > 80;
      nav.classList.toggle('nav-scrolled-away', hidden);
      if (heroBrand) heroBrand.classList.toggle('nav-scrolled-away', hidden);
    }

    // RT page: lock logo and eyebrow in place
    if (isRtPage && heroBrand) {
      heroBrand.classList.remove('nav-scrolled-away');
      heroBrand.style.removeProperty('opacity');
      heroBrand.style.removeProperty('transform');
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

    // Reveal RT eyebrow letters only while inside the logo circle
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

    // Homepage: logo fades over testimonials, locks when RT section enters view
    if (heroSection && heroBrand) {
      const grid = document.querySelector('.testimonials-grid');
      const rtSection = document.querySelector('.round-table-section');
      if (grid) {
        const logoH = heroBrand.offsetHeight;
        const rtTop = rtSection ? rtSection.getBoundingClientRect().top : 9999;
        const rtInView = rtTop <= logoH;

        // Pin the RT eyebrow inside the logo when it reaches logo centre
        const rtEyebrowEl = document.querySelector('.rt-eyebrow');
        if (rtEyebrowEl) {
          const eyebrowTop = rtEyebrowEl.getBoundingClientRect().top;
          const lockY = logoH * 0.5;
          if (eyebrowTop <= lockY && rtInView) {
            rtEyebrowEl.style.position = 'fixed';
            rtEyebrowEl.style.top = lockY + 'px';
            rtEyebrowEl.style.left = heroBrand.getBoundingClientRect().left + heroBrand.offsetWidth / 2 + 'px';
            rtEyebrowEl.style.transform = 'translate(-50%, -50%)';
            rtEyebrowEl.style.zIndex = '1001';
          } else {
            rtEyebrowEl.style.position = '';
            rtEyebrowEl.style.top = '';
            rtEyebrowEl.style.left = '';
            rtEyebrowEl.style.transform = '';
            rtEyebrowEl.style.zIndex = '';
          }
        }

        if (rtInView) {
          heroBrand.style.opacity = '1';
          heroBrand.style.pointerEvents = '';
        } else {
          const gridTop = grid.getBoundingClientRect().top;
          const fadeDownStart = logoH + 200;
          const fadeDownEnd = logoH - 60;
          const fadeDown = Math.min(1, Math.max(0, (fadeDownStart - gridTop) / (fadeDownStart - fadeDownEnd)));
          let opacity = 1 - fadeDown * 0.88;
          const gridBottom = grid.getBoundingClientRect().bottom;
          if (gridBottom < logoH) {
            const restore = Math.min(1, Math.max(0, (logoH - gridBottom) / 180));
            opacity = Math.max(opacity, restore);
          }
          heroBrand.style.opacity = opacity;
          heroBrand.style.pointerEvents = opacity < 0.4 ? 'none' : '';
        }
      } else {
        heroBrand.style.opacity = '1';
        heroBrand.style.pointerEvents = '';
      }
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
