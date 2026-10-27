/* Shared behavior for BGS Chronicles. Loaded with defer after page data is parsed. */
(() => {
  'use strict';

  document.querySelectorAll('[data-x-share]').forEach(link => {
    const canonical = document.querySelector('link[rel="canonical"]');
    const url = canonical ? canonical.href : window.location.href;
    link.href = 'https://x.com/intent/tweet?text=' +
      encodeURIComponent((document.title || 'BGS Chronicles') + ' #BGSChronicles') +
      '&url=' + encodeURIComponent(url);
  });

  const buttons = [...document.querySelectorAll('.filter-btn')];
  const cards = [...document.querySelectorAll('.card[data-cat]')];
  if (buttons.length) {
    function setFilter(category) {
      buttons.forEach(button => {
        const selected = button.dataset.filter === category;
        button.classList.toggle('on', selected);
        button.setAttribute('aria-pressed', String(selected));
      });
      cards.forEach(card => {
        card.style.display = category === 'all' || card.dataset.cat === category ? '' : 'none';
      });
    }
    function revealHashTarget() {
      const id = window.location.hash.slice(1);
      const card = cards.find(item => item.id === id);
      if (card && card.style.display === 'none') setFilter(card.dataset.cat);
      return card;
    }
    buttons.forEach(button => button.addEventListener('click', () => setFilter(button.dataset.filter)));
    document.querySelectorAll('#toc a[href^="#"]').forEach(link => {
      link.addEventListener('click', () => {
        const card = cards.find(item => '#' + item.id === link.getAttribute('href'));
        if (card && card.style.display === 'none') setFilter(card.dataset.cat);
        // Let the native anchor action scroll, update history and preserve normal link behavior.
      });
    });
    window.addEventListener('hashchange', () => {
      const card = revealHashTarget();
      if (card) card.scrollIntoView();
    });
    revealHashTarget();
  }

  const modal = document.getElementById('modalBg') || document.getElementById('modal');
  if (!modal) return;
  const closeButton = modal.querySelector('button');
  if (!closeButton) return;
  const members = window.BGSCreatorMembers;
  let opener = null;
  let oldOverflow = '';
  let background = [];
  let focusFrame = 0;
  const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function focusableItems() {
    return [...modal.querySelectorAll(focusableSelector)].filter(item =>
      !item.closest('[inert]') && item.getClientRects().length && getComputedStyle(item).visibility !== 'hidden');
  }
  function focusClose() {
    closeButton.focus({ preventScroll: true });
  }
  function focusWhenVisible() {
    if (!modal.classList.contains('open')) return;
    focusClose();
    if (document.activeElement !== closeButton) {
      focusFrame = requestAnimationFrame(focusWhenVisible);
    }
  }
  function openModal(trigger) {
    if (modal.classList.contains('open')) return;
    if (members) {
      const member = members[trigger.dataset.member];
      if (!member) return;
      modal.querySelector('.modal-name-en').textContent = member.en;
      modal.querySelector('.modal-name-ja').textContent = member.ja;
      modal.querySelector('.modal-desc').textContent = member.desc;
    }
    opener = trigger;
    oldOverflow = document.body.style.overflow;
    modal.inert = false;
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('open');
    background = [...document.body.children]
      .filter(item => item !== modal && !item.contains(modal) && !['SCRIPT', 'STYLE', 'LINK'].includes(item.tagName))
      .map(item => ({ item, inert: item.inert }));
    background.forEach(({ item }) => { item.inert = true; });
    document.body.style.overflow = 'hidden';
    focusWhenVisible();
  }
  function closeModal() {
    if (!modal.classList.contains('open')) return;
    cancelAnimationFrame(focusFrame);
    modal.classList.remove('open');
    background.forEach(({ item, inert }) => { item.inert = inert; });
    background = [];
    document.body.style.overflow = oldOverflow;
    if (opener && opener.isConnected) opener.focus({ preventScroll: true });
    modal.inert = true;
    modal.setAttribute('aria-hidden', 'true');
  }

  const triggers = members ? document.querySelectorAll('.creator-card[data-member]') :
    document.querySelectorAll('#notice-trigger');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => openModal(trigger));
    if (trigger.tagName !== 'BUTTON') trigger.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openModal(trigger);
      }
    });
  });
  closeButton.addEventListener('click', closeModal);
  modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
  document.addEventListener('keydown', event => {
    if (!modal.classList.contains('open')) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
    } else if (event.key === 'Tab') {
      const items = focusableItems();
      const first = items[0] || closeButton;
      const last = items[items.length - 1] || closeButton;
      if (event.shiftKey && (document.activeElement === first || !modal.contains(document.activeElement))) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !modal.contains(document.activeElement))) {
        event.preventDefault(); first.focus();
      }
    }
  });
  document.addEventListener('focusin', () => {
    if (modal.classList.contains('open') && !modal.contains(document.activeElement)) focusClose();
  });
})();
