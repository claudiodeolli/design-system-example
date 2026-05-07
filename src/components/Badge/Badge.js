import './Badge.css';

/**
 * Badge component.
 *
 * @param {Object} options
 * @param {string}  [options.label='']        - Text inside badge
 * @param {string}  [options.variant='neutral'] - 'success'|'warning'|'danger'|'info'|'primary'|'neutral'|'dark'
 * @param {string}  [options.size='']         - ''|'sm'|'lg'
 * @param {boolean} [options.dot=false]       - Show leading dot
 * @param {boolean} [options.outline=false]   - Outlined style
 */
export function createBadge({
  label = '',
  variant = 'neutral',
  size = '',
  dot = false,
  outline = false,
} = {}) {
  const el = document.createElement('span');
  const classes = ['c-badge', `c-badge--${variant}`];
  if (size)    classes.push(`c-badge--${size}`);
  if (dot)     classes.push('c-badge--dot');
  if (outline) classes.push('c-badge--outline');
  el.className = classes.join(' ');
  el.textContent = label;

  el.setLabel = (text) => { el.textContent = text; };
  el.setVariant = (v) => {
    el.classList.forEach(c => { if (c.startsWith('c-badge--') && c !== 'c-badge--' + 'dot' && c !== 'c-badge--outline') el.classList.remove(c); });
    el.classList.add(`c-badge--${v}`);
  };

  return el;
}

/**
 * Alert component.
 *
 * @param {Object} options
 * @param {string}  [options.message='']   - Alert message HTML
 * @param {string}  [options.title='']     - Optional bold title
 * @param {string}  [options.variant='info'] - 'warning'|'danger'|'success'|'info'|'primary'
 * @param {boolean} [options.showIcon=true]
 */
export function createAlert({
  message = '',
  title = '',
  variant = 'info',
  showIcon = true,
} = {}) {
  const el = document.createElement('div');
  el.className = `c-alert c-alert--${variant}`;
  el.setAttribute('role', 'alert');

  const iconMap = {
    warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    danger:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    info:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
    primary: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  };

  el.innerHTML = `
    ${showIcon ? `<span class="c-alert__icon">${iconMap[variant] || iconMap.info}</span>` : ''}
    <div class="c-alert__content">
      ${title ? `<div class="c-alert__title">${title}</div>` : ''}
      <div>${message}</div>
    </div>
  `;

  return el;
}
