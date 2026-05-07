import './Button.css';

/**
 * Button component.
 *
 * @param {Object} options
 * @param {string}   [options.label='Button']     - Button text
 * @param {string}   [options.variant='primary']  - 'primary'|'secondary'|'ghost'|'danger'|'success'|'white'
 * @param {string}   [options.size='md']          - 'xs'|'sm'|'md'|'lg'|'xl'
 * @param {string}   [options.iconLeft='']        - SVG string for left icon
 * @param {string}   [options.iconRight='']       - SVG string for right icon
 * @param {boolean}  [options.pill=false]         - Rounded pill shape
 * @param {boolean}  [options.block=false]        - Full width
 * @param {boolean}  [options.disabled=false]     - Disabled state
 * @param {boolean}  [options.loading=false]      - Loading state
 * @param {string}   [options.type='button']      - button|submit|reset
 * @param {string}   [options.href='']            - If set, renders as <a>
 * @param {Function} [options.onClick=null]       - Click handler
 */
export function createButton({
  label = 'Button',
  variant = 'primary',
  size = 'md',
  iconLeft = '',
  iconRight = '',
  pill = false,
  block = false,
  disabled = false,
  loading = false,
  type = 'button',
  href = '',
  onClick = null,
  badge = '',
} = {}) {
  const tag = href ? 'a' : 'button';
  const el = document.createElement(tag);

  // Classes
  const classes = ['c-btn', `c-btn--${variant}`, `c-btn--${size}`];
  if (pill)     classes.push('c-btn--pill');
  if (block)    classes.push('c-btn--block');
  if (loading)  classes.push('is-loading');
  if (disabled) classes.push('is-disabled');
  el.className = classes.join(' ');

  if (tag === 'button') {
    el.type = type;
    if (disabled) el.disabled = true;
  } else {
    el.href = href;
  }

  // Content
  const parts = [];
  if (iconLeft)  parts.push(`<span class="c-btn__icon c-btn__icon--left" aria-hidden="true">${iconLeft}</span>`);
  parts.push(`<span class="c-btn__text">${label}</span>`);
  if (iconRight) parts.push(`<span class="c-btn__icon c-btn__icon--right" aria-hidden="true">${iconRight}</span>`);
  if (badge)     parts.push(`<span class="c-btn__badge">${badge}</span>`);
  el.innerHTML = parts.join('');

  // Events
  if (onClick && !disabled && !loading) {
    el.addEventListener('click', onClick);
  }

  // --- API ---
  el.setLoading = (state) => {
    loading = state;
    el.classList.toggle('is-loading', state);
    if (tag === 'button') el.disabled = state || disabled;
  };

  el.setDisabled = (state) => {
    disabled = state;
    el.classList.toggle('is-disabled', state);
    if (tag === 'button') el.disabled = state || loading;
  };

  el.setLabel = (text) => {
    const span = el.querySelector('.c-btn__text');
    if (span) span.textContent = text;
  };

  return el;
}
