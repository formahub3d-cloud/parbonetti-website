/*!
 * consent.js — Gestione consenso cookie / contenuti di terze parti
 * Dott. Giovanni Parbonetti — vanilla JS, zero dipendenze.
 *
 * Blocca gli iframe con attributo data-consent-src (YouTube, Google Maps)
 * finché l'utente non presta il consenso. La scelta è salvata in localStorage.
 */
(function () {
  'use strict';

  var KEY = 'cookieConsent';

  function getChoice() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function saveChoice(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  /* ---- Attiva gli embed: imposta src dai data-consent-src ---- */
  function activateEmbeds() {
    document.querySelectorAll('iframe[data-consent-src]').forEach(function (f) {
      if (!f.getAttribute('src')) { f.setAttribute('src', f.getAttribute('data-consent-src')); }
      f.style.display = '';
      var wrap = f.parentNode;
      if (wrap) {
        var ph = wrap.querySelector('.consent-ph');
        if (ph) { ph.parentNode.removeChild(ph); }
      }
    });
  }

  /* ---- Blocca gli embed: nasconde l'iframe e mostra un'anteprima ---- */
  function blockEmbeds() {
    document.querySelectorAll('iframe[data-consent-src]').forEach(function (f) {
      var wrap = f.parentNode;
      if (!wrap || wrap.querySelector('.consent-ph')) { return; }
      f.removeAttribute('src');
      f.style.display = 'none';
      var ph = document.createElement('div');
      ph.className = 'consent-ph';
      ph.innerHTML =
        '<div class="consent-ph-inner">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>' +
        '<p>Contenuto di terze parti (YouTube / Google Maps) bloccato. Per visualizzarlo accetta i cookie di terze parti.</p>' +
        '<button type="button" class="btn btn-green" data-consent="accept">Accetta e mostra</button>' +
        '</div>';
      wrap.appendChild(ph);
    });
  }

  /* ---- Banner ---- */
  function buildBanner() {
    if (document.getElementById('cookieBanner')) { return; }
    var b = document.createElement('div');
    b.className = 'cookie-banner';
    b.id = 'cookieBanner';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', 'Avviso sui cookie');
    b.innerHTML =
      '<div class="cookie-banner-inner">' +
      '<div class="cookie-banner-text">' +
      '<strong>Rispettiamo la tua privacy</strong>' +
      '<p>Questo sito utilizza cookie tecnici e, previo consenso, contenuti di terze parti (YouTube, Google Maps) che possono installare cookie. Dettagli nella <a href="cookie.html">Cookie Policy</a>.</p>' +
      '</div>' +
      '<div class="cookie-banner-actions">' +
      '<button type="button" class="btn btn-outline-blue" data-consent="reject">Rifiuta</button>' +
      '<button type="button" class="btn btn-green" data-consent="accept">Accetta</button>' +
      '</div>' +
      '</div>';
    document.body.appendChild(b);
    requestAnimationFrame(function () { b.classList.add('open'); });
  }
  function showBanner() { buildBanner(); }
  function hideBanner() {
    var b = document.getElementById('cookieBanner');
    if (b) { b.classList.remove('open'); setTimeout(function () { if (b.parentNode) b.parentNode.removeChild(b); }, 300); }
  }

  function accept() { saveChoice('accepted'); activateEmbeds(); hideBanner(); }
  function reject() { saveChoice('rejected'); blockEmbeds(); hideBanner(); }

  /* ---- Delego i click (banner, anteprime, link "Preferenze cookie") ---- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-consent],[data-cookie-prefs]') : null;
    if (!el) { return; }
    if (el.hasAttribute('data-cookie-prefs')) { e.preventDefault(); showBanner(); return; }
    var action = el.getAttribute('data-consent');
    if (action === 'accept') { accept(); }
    else if (action === 'reject') { reject(); }
  });

  /* ---- Inizializzazione ---- */
  function init() {
    var choice = getChoice();
    if (choice === 'accepted') { activateEmbeds(); }
    else if (choice === 'rejected') { blockEmbeds(); }
    else { blockEmbeds(); showBanner(); }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
