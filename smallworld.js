/* Native disclosures are usable before the shared dialog controller starts. */
(() => {
  const members = {};
  document.querySelectorAll('.creator-entry').forEach(entry => {
    const key = entry.dataset.member;
    const summary = entry.querySelector('summary');
    members[key] = {
      en: summary.querySelector('.card-en').textContent,
      ja: summary.querySelector('.card-ja [lang]').textContent,
      desc: entry.querySelector('p').textContent,
    };
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'creator-card';
    button.dataset.member = key;
    button.setAttribute('aria-haspopup', 'dialog');
    button.setAttribute('aria-controls', 'modalBg');
    button.append(...summary.children);
    entry.replaceWith(button);
  });
  window.BGSCreatorMembers = members;

  const compact = matchMedia('(max-width: 767px)');
  const index = document.querySelector('.toc details');
  function setIndexLayout() {
    index.open = !compact.matches;
  }
  setIndexLayout();
  compact.addEventListener('change', setIndexLayout);

  const sections = [...document.querySelectorAll('.section')];
  const links = [...document.querySelectorAll('.toc-list a')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({target, isIntersecting}) => {
        if (isIntersecting) target.classList.add('seen');
      });
      const current = sections.findLast(section => section.getBoundingClientRect().top <= innerHeight * .28)
        || sections[0];
      links.forEach(link => {
        if (link.hash === '#' + current.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, {rootMargin: '-25% 0px -73% 0px'});
    sections.forEach(section => observer.observe(section));
  }
  document.querySelectorAll('main img').forEach(image => {
    image.addEventListener('contextmenu', event => event.preventDefault());
  });
})();
