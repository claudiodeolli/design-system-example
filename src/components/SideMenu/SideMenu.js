import './SideMenu.css';

/**
 * SideMenu — Vertical navigation sidebar.
 *
 * @param {Object} options
 * @param {string} [options.logoText='contasy'] - Brand name to display
 * @param {string} [options.logoHref='#'] - Logo link href
 * @param {Array}  [options.sections=[]]   - Array of { label, items[] }
 * @param {string} [options.activeItem=''] - Active item id
 * @param {boolean}[options.collapsible=true] - Show toggle button
 * @param {Function}[options.onItemClick]  - Callback (item) => void
 */
export function createSideMenu({
  logoText = 'contasy',
  logoHref = '#',
  sections = [],
  activeItem = '',
  collapsible = true,
  onItemClick = null,
} = {}) {
  const el = document.createElement('aside');
  el.className = 'c-sidemenu';

  // ---- Logo ----
  const logo = document.createElement('a');
  logo.className = 'c-sidemenu__logo';
  logo.href = logoHref;
  logo.innerHTML = `
    <span class="c-sidemenu__logo-icon">
      ${iconSvg('logo')}
    </span>
    <span class="c-sidemenu__logo-text">${logoText}</span>
  `;
  el.appendChild(logo);

  // ---- Toggle button ----
  if (collapsible) {
    const toggle = document.createElement('button');
    toggle.className = 'c-sidemenu__toggle';
    toggle.title = 'Toggle menu';
    toggle.setAttribute('aria-label', 'Toggle sidebar');
    toggle.innerHTML = iconSvg('chevron-left');
    toggle.addEventListener('click', () => {
      el.classList.toggle('is-collapsed');
      const isCollapsed = el.classList.contains('is-collapsed');
      toggle.title = isCollapsed ? 'Expand menu' : 'Collapse menu';
      el.dispatchEvent(new CustomEvent('sidemenu:toggle', { detail: { collapsed: isCollapsed }, bubbles: true }));
    });
    el.appendChild(toggle);
  }

  // ---- Navigation ----
  const nav = document.createElement('nav');
  nav.className = 'c-sidemenu__nav';
  nav.setAttribute('role', 'navigation');

  sections.forEach(({ label, items }) => {
    const section = document.createElement('div');
    section.className = 'c-sidemenu__section';

    if (label) {
      const sectionLabel = document.createElement('span');
      sectionLabel.className = 'c-sidemenu__section-label';
      sectionLabel.textContent = label;
      section.appendChild(sectionLabel);
    }

    items.forEach((item) => {
      const link = document.createElement('a');
      link.className = 'c-sidemenu__item' + (item.id === activeItem ? ' is-active' : '');
      link.href = item.href || '#';
      link.setAttribute('data-item-id', item.id || '');
      link.setAttribute('role', 'menuitem');
      if (item.title) link.title = item.title;

      link.innerHTML = `
        <span class="c-sidemenu__item-icon" aria-hidden="true">
          ${iconSvg(item.icon || 'circle')}
        </span>
        <span class="c-sidemenu__item-label">${item.label}</span>
        ${item.badge ? `<span class="c-sidemenu__item-badge">${item.badge}</span>` : ''}
      `;

      link.addEventListener('click', (e) => {
        if (!item.href || item.href === '#') e.preventDefault();
        // Update active
        nav.querySelectorAll('.c-sidemenu__item').forEach(i => i.classList.remove('is-active'));
        link.classList.add('is-active');
        if (onItemClick) onItemClick(item);
        el.dispatchEvent(new CustomEvent('sidemenu:click', { detail: { item }, bubbles: true }));
      });

      section.appendChild(link);
    });

    nav.appendChild(section);
  });

  el.appendChild(nav);

  // ---- Mobile overlay handling ----
  let overlay = null;
  el.openMobile = () => {
    el.classList.add('is-open');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'c-sidemenu-overlay';
      document.body.appendChild(overlay);
      overlay.addEventListener('click', el.closeMobile);
    }
    requestAnimationFrame(() => overlay.classList.add('is-visible'));
    document.body.style.overflow = 'hidden';
  };
  el.closeMobile = () => {
    el.classList.remove('is-open');
    if (overlay) {
      overlay.classList.remove('is-visible');
      setTimeout(() => {
        overlay?.remove();
        overlay = null;
      }, 300);
    }
    document.body.style.overflow = '';
  };

  // ---- API ----
  el.setActiveItem = (id) => {
    nav.querySelectorAll('.c-sidemenu__item').forEach(i => {
      i.classList.toggle('is-active', i.dataset.itemId === id);
    });
  };

  el.collapse = () => el.classList.add('is-collapsed');
  el.expand = () => el.classList.remove('is-collapsed');

  return el;
}

/* ---- Icon SVG library ---- */
function iconSvg(name) {
  const icons = {
    logo: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 3C9.373 3 4 8.373 4 15c0 4.5 2.3 8.47 5.78 10.76L16 29l6.22-3.24C25.7 23.47 28 19.5 28 15 28 8.373 22.627 3 16 3z" fill="currentColor" opacity="0.9"/>
      <path d="M16 8c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 11c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="white"/>
    </svg>`,
    home: `<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    building: `<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    tax: `<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
    declaration: `<svg viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
    invoice: `<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
    credit: `<svg viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
    user: `<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    certificate: `<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>`,
    companies: `<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    partners: `<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    'chevron-left': `<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>`,
    'chevron-right': `<svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>`,
    circle: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/></svg>`,
    settings: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M12 2v2M4.93 4.93l1.41 1.41M2 12h2M4.93 19.07l1.41-1.41M12 20v2M19.07 19.07l-1.41-1.41M20 12h2"/></svg>`,
    menu: `<svg viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  };
  return icons[name] || icons['circle'];
}

export { iconSvg };
