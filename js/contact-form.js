/* ============================================================
   Major1 — contact-form.js
   AJAX submit z progressive enhancement (form działa też bez JS).
   Walidacja klient-side (checkbox RODO, honeypot), POST do send.php,
   pokazanie success/error state inline.
   ============================================================ */

(function () {
  'use strict';

  function init() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    var msgSuccess = document.getElementById('form-success');
    var msgError   = document.getElementById('form-error');

    // Pokaz komunikatu po PHP-redirect (gdy fetch nie był dostępny / non-JS).
    try {
      var params = new URLSearchParams(window.location.search);
      if (params.get('sent') === '1' && msgSuccess) {
        msgSuccess.hidden = false;
        form.reset();
      } else if (params.get('error') === '1' && msgError) {
        msgError.hidden = false;
      }
    } catch (e) { /* IE — nie wspieramy */ }
    var consentRow = form.querySelector('.contact-form__consent');
    var consentBox = form.querySelector('#f-consent');
    var submitBtn  = form.querySelector('[data-submit]');
    var submitLabel = form.querySelector('[data-submit-label]');
    var labelOriginal = submitLabel ? submitLabel.textContent : '';

    function hideMsgs() {
      if (msgSuccess) msgSuccess.hidden = true;
      if (msgError)   msgError.hidden = true;
    }

    function setLoading(on) {
      if (!submitBtn) return;
      submitBtn.classList.toggle('is-loading', on);
      submitBtn.disabled = on;
      if (submitLabel) {
        submitLabel.textContent = on ? 'Wysyłanie…' : labelOriginal;
      }
    }

    consentBox && consentBox.addEventListener('change', function () {
      if (consentBox.checked && consentRow) consentRow.classList.remove('is-error');
    });

    form.addEventListener('submit', function (e) {
      hideMsgs();

      // Native HTML5 validity (required, pattern, minlength itd.)
      if (!form.checkValidity()) {
        // Wymuś natywne wiadomości
        form.reportValidity();
        if (consentBox && !consentBox.checked && consentRow) {
          consentRow.classList.add('is-error');
        }
        e.preventDefault();
        return;
      }

      // Honeypot — jeśli bot wypełnił, blokujemy cicho
      var hp = form.querySelector('[name="website"]');
      if (hp && hp.value.trim() !== '') {
        e.preventDefault();
        // udajemy sukces dla bota (nic się nie dzieje, ale brak alertu)
        if (msgSuccess) msgSuccess.hidden = false;
        form.reset();
        return;
      }

      // Mamy fetch — wyślij AJAX-em. Inaczej (stare przeglądarki) — pozwól na zwykły submit.
      if (typeof window.fetch !== 'function') {
        return; // domyślne POST do send.php zadziała
      }

      e.preventDefault();
      setLoading(true);

      var data = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' },
        credentials: 'same-origin'
      })
        .then(function (res) {
          return res.json().catch(function () { return { ok: res.ok }; })
            .then(function (json) { return { res: res, json: json }; });
        })
        .then(function (out) {
          setLoading(false);
          if (out.res.ok && out.json && out.json.ok) {
            if (msgSuccess) msgSuccess.hidden = false;
            form.reset();
            // dataLayer event — zaczyta się jeśli user dał zgodę analityczną
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ event: 'contact_form_submit', form_id: 'contact-form' });
            // scroll do komunikatu
            if (msgSuccess) msgSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            if (msgError) msgError.hidden = false;
          }
        })
        .catch(function () {
          setLoading(false);
          if (msgError) msgError.hidden = false;
        });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
