/* ============================================================
   Major1 — cookie-consent.js
   Google Consent Mode v2 · banner · settings panel · localStorage
   Vanilla JS, zero deps.
   ============================================================ */

(function () {
  'use strict';

  var STORAGE_KEY = 'major1_cookie_consent';
  var STORAGE_VERSION = 1;
  var POLICY_URL = 'polityka-prywatnosci.html';

  /* ---------- 1) Google Consent Mode v2 — default DENIED ---------- */
  // dataLayer + gtag muszą istnieć ZANIM gtag.js się załaduje.
  // Stub działa nawet bez GA4 — zachowuje historię eventów do późniejszego
  // pobrania, gdy podłączymy measurement ID.
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  // Domyślny stan przed zgodą — wszystko DENIED.
  // 'security_storage' jest zawsze granted (niezbędne).
  gtag('consent', 'default', {
    'ad_storage':            'denied',
    'ad_user_data':          'denied',
    'ad_personalization':    'denied',
    'analytics_storage':     'denied',
    'functionality_storage': 'denied',
    'personalization_storage': 'denied',
    'security_storage':      'granted',
    'wait_for_update':       500
  });

  /* ---------- 2) Storage helpers ---------- */
  function loadConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (data.v !== STORAGE_VERSION) return null;
      return data;
    } catch (e) {
      return null;
    }
  }

  function saveConsent(consent) {
    var data = {
      v: STORAGE_VERSION,
      ts: new Date().toISOString(),
      analytics: !!consent.analytics,
      marketing: !!consent.marketing
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      // private mode / quota — silently fail
    }
    return data;
  }

  function applyConsent(consent) {
    var update = {
      'analytics_storage':     consent.analytics ? 'granted' : 'denied',
      'ad_storage':            consent.marketing ? 'granted' : 'denied',
      'ad_user_data':          consent.marketing ? 'granted' : 'denied',
      'ad_personalization':    consent.marketing ? 'granted' : 'denied',
      'functionality_storage': consent.analytics ? 'granted' : 'denied',
      'personalization_storage': consent.marketing ? 'granted' : 'denied'
    };
    gtag('consent', 'update', update);
    // Custom event — przydaje się jeśli ktoś chce się podpiąć później.
    window.dataLayer.push({
      event: 'cookie_consent_update',
      consent_analytics: consent.analytics,
      consent_marketing: consent.marketing
    });
  }

  /* ---------- 3) Banner + modal — utwórz DOM ---------- */
  function createBanner() {
    var banner = document.createElement('aside');
    banner.className = 'cc';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-labelledby', 'cc-title');
    banner.setAttribute('aria-describedby', 'cc-text');
    banner.innerHTML =
      '<div class="cc__body">' +
        '<p class="cc__label">Pliki cookies</p>' +
        '<h2 id="cc-title" class="cc__title">Szanujemy Twoją prywatność</h2>' +
        '<p id="cc-text" class="cc__text">' +
          'Używamy plików cookies, aby zapewnić działanie strony oraz — za Twoją zgodą — ' +
          'mierzyć ruch i skuteczność reklam. Szczegóły: ' +
          '<a href="' + POLICY_URL + '">Polityka prywatności</a>.' +
        '</p>' +
      '</div>' +
      '<div class="cc__actions">' +
        '<button type="button" class="cc__btn" data-cc-action="reject">Tylko niezbędne</button>' +
        '<button type="button" class="cc__btn" data-cc-action="settings">Ustawienia</button>' +
        '<button type="button" class="cc__btn cc__btn--accent" data-cc-action="accept-all">Akceptuj wszystkie</button>' +
      '</div>';
    return banner;
  }

  function createWidget() {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cc-widget';
    btn.setAttribute('aria-label', 'Ustawienia plików cookies');
    btn.setAttribute('data-open-cc-settings', '');
    // Cookie icon — okrąg z kęsami
    btn.innerHTML =
      '<svg class="cc-widget__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M21.5 12.5a9 9 0 1 1-9.4-9.4 5 5 0 0 0 5.2 5.2 5 5 0 0 0 4.2 4.2z"/>' +
        '<circle cx="9" cy="10" r="1.1" fill="currentColor"/>' +
        '<circle cx="14" cy="14" r="1.1" fill="currentColor"/>' +
        '<circle cx="9.5" cy="15.5" r="1" fill="currentColor"/>' +
        '<circle cx="15.5" cy="9" r="0.8" fill="currentColor"/>' +
      '</svg>';
    return btn;
  }

  function createModal() {
    var modal = document.createElement('div');
    modal.className = 'cc-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'cc-modal-title');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML =
      '<div class="cc-modal__inner">' +
        '<h2 id="cc-modal-title" class="cc-modal__title">Ustawienia cookies</h2>' +
        '<p class="cc-modal__lead">' +
          'Wybierz, jakie kategorie plików cookies chcesz zaakceptować. Niezbędne są wymagane do działania strony i nie można ich wyłączyć.' +
        '</p>' +

        '<div class="cc-cat">' +
          '<div>' +
            '<div class="cc-cat__name"><h3>Niezbędne</h3><span class="cc-cat__tag">Zawsze włączone</span></div>' +
            '<p>Wymagane do działania strony — sesja, zapamiętanie wyboru zgód, podstawowe funkcje. Nie można ich wyłączyć.</p>' +
          '</div>' +
          '<div class="cc-cat__col-toggle">' +
            '<label class="cc-toggle">' +
              '<input type="checkbox" checked disabled aria-label="Niezbędne — zawsze włączone">' +
              '<span class="cc-toggle__track"></span>' +
            '</label>' +
          '</div>' +
        '</div>' +

        '<div class="cc-cat">' +
          '<div>' +
            '<div class="cc-cat__name"><h3>Analityczne</h3></div>' +
            '<p>Pomagają zrozumieć, jak użytkownicy korzystają ze strony — anonimowe statystyki ruchu i wydajności (Google Analytics 4).</p>' +
          '</div>' +
          '<div class="cc-cat__col-toggle">' +
            '<label class="cc-toggle">' +
              '<input type="checkbox" data-cc-cat="analytics" aria-label="Analityczne">' +
              '<span class="cc-toggle__track"></span>' +
            '</label>' +
          '</div>' +
        '</div>' +

        '<div class="cc-cat">' +
          '<div>' +
            '<div class="cc-cat__name"><h3>Marketingowe</h3></div>' +
            '<p>Wykorzystywane do mierzenia skuteczności reklam i remarketingu (Google Ads, piksele zewnętrzne).</p>' +
          '</div>' +
          '<div class="cc-cat__col-toggle">' +
            '<label class="cc-toggle">' +
              '<input type="checkbox" data-cc-cat="marketing" aria-label="Marketingowe">' +
              '<span class="cc-toggle__track"></span>' +
            '</label>' +
          '</div>' +
        '</div>' +

        '<div class="cc-modal__actions">' +
          '<button type="button" class="cc__btn" data-cc-action="reject">Tylko niezbędne</button>' +
          '<button type="button" class="cc__btn cc__btn--accent" data-cc-action="save">Zapisz ustawienia</button>' +
        '</div>' +
      '</div>';
    return modal;
  }

  /* ---------- 4) Wire up ---------- */
  function init() {
    var banner = createBanner();
    var modal = createModal();
    var widget = createWidget();
    document.body.appendChild(banner);
    document.body.appendChild(modal);
    document.body.appendChild(widget);

    var inAnalytics = modal.querySelector('[data-cc-cat="analytics"]');
    var inMarketing = modal.querySelector('[data-cc-cat="marketing"]');

    function syncWidget() {
      // widget widoczny tylko gdy banner i modal są zamknięte
      var visible = !banner.hasAttribute('data-cc-open') && !modal.hasAttribute('data-cc-modal-open');
      widget.toggleAttribute('data-cc-widget-visible', visible);
    }

    function showBanner() {
      banner.setAttribute('data-cc-open', '');
      document.body.classList.add('cc-banner-open');
      syncWidget();
    }
    function hideBanner() {
      banner.removeAttribute('data-cc-open');
      document.body.classList.remove('cc-banner-open');
      syncWidget();
    }
    function showModal()  {
      // załaduj aktualny stan do toggle’i
      var current = loadConsent();
      inAnalytics.checked = !!(current && current.analytics);
      inMarketing.checked = !!(current && current.marketing);
      modal.setAttribute('data-cc-modal-open', '');
      document.body.classList.add('cc-modal-open'); // body scroll lock
      syncWidget();
      // a11y — przywróć focus
      var firstFocusable = modal.querySelector('input:not(:disabled), button');
      if (firstFocusable) setTimeout(function () { firstFocusable.focus(); }, 50);
    }
    function hideModal()  {
      modal.removeAttribute('data-cc-modal-open');
      document.body.classList.remove('cc-modal-open');
      syncWidget();
    }

    function persistAndApply(consent, opts) {
      saveConsent(consent);
      applyConsent(consent);
      hideBanner();
      hideModal();
    }

    // Banner buttons
    banner.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-cc-action]');
      if (!btn) return;
      var action = btn.dataset.ccAction;
      if (action === 'accept-all') {
        persistAndApply({ analytics: true, marketing: true });
      } else if (action === 'reject') {
        persistAndApply({ analytics: false, marketing: false });
      } else if (action === 'settings') {
        showModal();
      }
    });

    // Modal buttons
    modal.addEventListener('click', function (e) {
      // close on backdrop click
      if (e.target === modal) { hideModal(); return; }
      var btn = e.target.closest('[data-cc-action]');
      if (!btn) return;
      var action = btn.dataset.ccAction;
      if (action === 'save') {
        persistAndApply({
          analytics: inAnalytics.checked,
          marketing: inMarketing.checked
        });
      } else if (action === 'reject') {
        persistAndApply({ analytics: false, marketing: false });
      }
    });

    // Globalne triggery „Ustawienia cookies" (np. w stopce, w polityce)
    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('[data-open-cc-settings]');
      if (!trigger) return;
      e.preventDefault();
      showModal();
    });

    // Esc zamyka modal
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.hasAttribute('data-cc-modal-open')) {
        hideModal();
      }
    });

    // Initial state
    var stored = loadConsent();
    if (stored) {
      // już mamy decyzję — zastosuj, nie pokazuj baneru
      applyConsent(stored);
      syncWidget(); // widget widoczny od razu
    } else {
      // pierwsza wizyta — pokaż baner po małym delay (lepsze CLS / czytelność)
      setTimeout(showBanner, 600);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
