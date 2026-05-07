import './TopBar.css';

/**
 * TopBar component.
 *
 * @param {Object} options
 * @param {string}   [options.company='']    - Company name displayed on the right
 * @param {Array}    [options.actions=[]]    - Array of HTMLElements for action area
 * @param {Function} [options.onMenuClick]   - Mobile menu icon click handler
 */
export function createTopBar({
  company = '',
  actions = [],
  onMenuClick = null,
} = {}) {
  const el = document.createElement('header');
  el.className = 'c-topbar';

  // Mobile menu toggle
  const menuToggle = document.createElement('button');
  menuToggle.className = 'c-topbar__menu-toggle';
  menuToggle.setAttribute('aria-label', 'Abrir menu');
  menuToggle.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>`;
  menuToggle.addEventListener('click', () => {
    if (onMenuClick) onMenuClick();
    el.dispatchEvent(new CustomEvent('topbar:menu', { bubbles: true }));
  });
  el.appendChild(menuToggle);

  // Company name
  const companyEl = document.createElement('span');
  companyEl.className = 'c-topbar__company';
  companyEl.textContent = company;
  el.appendChild(companyEl);

  // Actions
  if (actions.length > 0) {
    const actionsWrapper = document.createElement('div');
    actionsWrapper.className = 'c-topbar__actions';
    actions.forEach(a => actionsWrapper.appendChild(a));
    el.appendChild(actionsWrapper);
  }

  // Scroll shadow
  const scrollHandler = () => {
    el.classList.toggle('is-scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', scrollHandler, { passive: true });

  el.setCompany = (name) => { companyEl.textContent = name; };
  el.destroy = () => window.removeEventListener('scroll', scrollHandler);

  return el;
}

/**
 * Breadcrumb component.
 *
 * @param {Array} items - [{ label, href?, icon? }]
 */
export function createBreadcrumb(items = []) {
  const nav = document.createElement('nav');
  nav.className = 'c-breadcrumb';
  nav.setAttribute('aria-label', 'Breadcrumb');

  items.forEach((item, idx) => {
    const span = document.createElement('span');
    span.className = 'c-breadcrumb__item';

    if (idx === items.length - 1) {
      // Current
      const current = document.createElement('span');
      current.className = 'c-breadcrumb__current';
      current.setAttribute('aria-current', 'page');
      current.textContent = item.label;
      span.appendChild(current);
    } else {
      // Link
      const a = document.createElement('a');
      a.className = 'c-breadcrumb__link';
      a.href = item.href || '#';
      if (item.icon) a.innerHTML = item.icon + item.label;
      else a.textContent = item.label;
      span.appendChild(a);

      // Separator
      const sep = document.createElement('span');
      sep.className = 'c-breadcrumb__separator';
      sep.setAttribute('aria-hidden', 'true');
      sep.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;
      span.appendChild(sep);
    }

    nav.appendChild(span);
  });

  return nav;
}

/**
 * PageHeader component.
 *
 * @param {Object} options
 * @param {string}   options.title          - Page title
 * @param {Array}    [options.breadcrumb=[]] - Breadcrumb items
 * @param {Array}    [options.actions=[]]    - HTMLElements for action row
 */
export function createPageHeader({
  title = '',
  breadcrumb = [],
  actions = [],
} = {}) {
  const el = document.createElement('div');
  el.className = 'c-page-header';

  const left = document.createElement('div');
  left.className = 'c-page-header__left';

  if (breadcrumb.length > 0) {
    left.appendChild(createBreadcrumb(breadcrumb));
  }

  const titleEl = document.createElement('h1');
  titleEl.className = 'c-page-header__title';
  titleEl.textContent = title;
  left.appendChild(titleEl);
  el.appendChild(left);

  if (actions.length > 0) {
    const actionsWrapper = document.createElement('div');
    actionsWrapper.className = 'c-page-header__actions';
    actions.forEach(a => actionsWrapper.appendChild(a));
    el.appendChild(actionsWrapper);
  }

  return el;
}
