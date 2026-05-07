import './Card.css';

/**
 * Card component.
 *
 * @param {Object} options
 * @param {string}  [options.title='']     - Card header title
 * @param {string}  [options.subtitle='']  - Card header subtitle
 * @param {string}  [options.body='']      - HTML content for body
 * @param {string}  [options.footer='']    - HTML content for footer
 * @param {*}       [options.headerAction] - Element for header right side
 * @param {boolean} [options.hoverable=false]
 * @param {string}  [options.bodySize='']  - ''|'sm'|'lg'
 */
export function createCard({
  title = '',
  subtitle = '',
  body = '',
  footer = '',
  headerAction = null,
  hoverable = false,
  bodySize = '',
} = {}) {
  const el = document.createElement('div');
  el.className = 'c-card' + (hoverable ? ' c-card--hoverable' : '');

  if (title || headerAction) {
    const header = document.createElement('div');
    header.className = 'c-card__header';
    const headLeft = document.createElement('div');
    headLeft.innerHTML = `
      <div class="c-card__title">${title}</div>
      ${subtitle ? `<div class="c-card__subtitle">${subtitle}</div>` : ''}
    `;
    header.appendChild(headLeft);
    if (headerAction) header.appendChild(headerAction);
    el.appendChild(header);
  }

  const bodyEl = document.createElement('div');
  bodyEl.className = 'c-card__body' + (bodySize ? ` c-card__body--${bodySize}` : '');
  if (typeof body === 'string') bodyEl.innerHTML = body;
  else bodyEl.appendChild(body);
  el.appendChild(bodyEl);

  if (footer) {
    const footerEl = document.createElement('div');
    footerEl.className = 'c-card__footer';
    if (typeof footer === 'string') footerEl.innerHTML = footer;
    else footerEl.appendChild(footer);
    el.appendChild(footerEl);
  }

  el.setBody = (content) => {
    if (typeof content === 'string') bodyEl.innerHTML = content;
    else { bodyEl.innerHTML = ''; bodyEl.appendChild(content); }
  };

  return el;
}

/**
 * StatCard — dashboard metric card.
 *
 * @param {Object} options
 * @param {string}  options.value       - e.g. 'R$ 0,00'
 * @param {string}  options.label       - e.g. 'Entradas'
 * @param {string}  [options.icon='']   - SVG string
 * @param {string}  [options.color='green'] - 'green'|'orange'|'blue'|'teal'|'pink'
 */
export function createStatCard({
  value = 'R$ 0,00',
  label = 'Entradas',
  icon = '',
  color = 'green',
} = {}) {
  const el = document.createElement('div');
  el.className = `c-stat-card c-stat-card--${color}`;

  el.innerHTML = `
    <div class="c-stat-card__content">
      <div class="c-stat-card__value">${value}</div>
      <div class="c-stat-card__label">${label}</div>
    </div>
    <div class="c-stat-card__icon" aria-hidden="true">
      ${icon || defaultStatIcon(color)}
    </div>
  `;

  el.setValue = (v) => {
    el.querySelector('.c-stat-card__value').textContent = v;
  };

  return el;
}

function defaultStatIcon(color) {
  const icons = {
    green:  `<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="8"/><path d="M8 12h8M12 8v8"/></svg>`,
    orange: `<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-4 0v2"/><path d="M8 7V5a2 2 0 0 0-4 0v2"/></svg>`,
    blue:   `<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"/></svg>`,
    teal:   `<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
    pink:   `<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01z"/></svg>`,
  };
  return icons[color] || icons.green;
}
