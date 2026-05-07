import './Table.css';

/**
 * Table component.
 *
 * @param {Object} options
 * @param {Array}  options.columns    - [{ key, label, sortable?, render? }]
 * @param {Array}  options.rows       - Array of row data objects
 * @param {string} [options.emptyText='Nenhum registro encontrado']
 * @param {boolean}[options.sortable=false]
 * @param {Object} [options.pagination] - { page, total, perPage, onChange }
 */
export function createTable({
  columns = [],
  rows = [],
  emptyText = 'Nenhum registro encontrado',
  pagination = null,
} = {}) {
  const wrapper = document.createElement('div');
  wrapper.className = 'c-table-wrapper';

  let sortKey = '';
  let sortDir = 'asc';

  const render = (data) => {
    wrapper.innerHTML = '';

    const table = document.createElement('table');
    table.className = 'c-table';
    table.setAttribute('role', 'table');

    // ----- Head -----
    const thead = document.createElement('thead');
    thead.className = 'c-table__head';
    const headRow = document.createElement('tr');

    columns.forEach(col => {
      const th = document.createElement('th');
      th.setAttribute('scope', 'col');
      if (col.sortable) {
        th.classList.add('is-sortable');
        if (sortKey === col.key) th.classList.add('is-sorted');
        th.innerHTML = `
          ${col.label}
          <span class="c-table__sort-icon" aria-hidden="true">
            ${sortSvg(sortKey === col.key ? sortDir : null)}
          </span>
        `;
        th.addEventListener('click', () => {
          if (sortKey === col.key) {
            sortDir = sortDir === 'asc' ? 'desc' : 'asc';
          } else {
            sortKey = col.key;
            sortDir = 'asc';
          }
          const sorted = [...data].sort((a, b) => {
            const av = a[sortKey], bv = b[sortKey];
            const cmp = typeof av === 'string' ? av.localeCompare(bv) : (av > bv ? 1 : av < bv ? -1 : 0);
            return sortDir === 'asc' ? cmp : -cmp;
          });
          render(sorted);
        });
      } else {
        th.textContent = col.label;
      }
      headRow.appendChild(th);
    });

    thead.appendChild(headRow);
    table.appendChild(thead);

    // ----- Body -----
    const tbody = document.createElement('tbody');
    tbody.className = 'c-table__body';
    tbody.setAttribute('role', 'rowgroup');

    if (data.length === 0) {
      const emptyRow = document.createElement('tr');
      const emptyCell = document.createElement('td');
      emptyCell.colSpan = columns.length;
      emptyCell.innerHTML = `
        <div class="c-table__empty">
          <div class="c-table__empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </div>
          <div class="c-table__empty-text">${emptyText}</div>
        </div>
      `;
      emptyRow.appendChild(emptyCell);
      tbody.appendChild(emptyRow);
    } else {
      data.forEach((row, rowIdx) => {
        const tr = document.createElement('tr');
        tr.setAttribute('role', 'row');
        columns.forEach(col => {
          const td = document.createElement('td');
          td.setAttribute('role', 'cell');
          if (col.render) {
            const rendered = col.render(row[col.key], row, rowIdx);
            if (typeof rendered === 'string') td.innerHTML = rendered;
            else td.appendChild(rendered);
          } else {
            td.textContent = row[col.key] ?? '';
          }
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
    }

    table.appendChild(tbody);
    wrapper.appendChild(table);

    // ----- Pagination -----
    if (pagination) {
      const pager = buildPagination(pagination);
      wrapper.appendChild(pager);
    }
  };

  render(rows);

  wrapper.updateRows = (newRows) => render(newRows);

  return wrapper;
}

function buildPagination({ page = 1, total = 0, perPage = 10, onChange = null } = {}) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const from = total === 0 ? 0 : (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);

  const pager = document.createElement('div');
  pager.className = 'c-pagination';

  pager.innerHTML = `
    <span class="c-pagination__info">Mostrando ${from} até ${to} de ${total} registros</span>
    <div class="c-pagination__controls"></div>
  `;

  const controls = pager.querySelector('.c-pagination__controls');

  // Prev
  const prev = paginationBtn(chevronSvg('left'), page <= 1);
  prev.addEventListener('click', () => { if (page > 1 && onChange) onChange(page - 1); });
  controls.appendChild(prev);

  // Pages
  for (let p = 1; p <= totalPages; p++) {
    const btn = paginationBtn(String(p), false);
    if (p === page) btn.classList.add('is-active');
    btn.addEventListener('click', () => { if (onChange) onChange(p); });
    controls.appendChild(btn);
  }

  // Next
  const next = paginationBtn(chevronSvg('right'), page >= totalPages);
  next.addEventListener('click', () => { if (page < totalPages && onChange) onChange(page + 1); });
  controls.appendChild(next);

  return pager;
}

function paginationBtn(content, disabled = false) {
  const btn = document.createElement('button');
  btn.className = 'c-pagination__btn';
  btn.innerHTML = content;
  btn.disabled = disabled;
  return btn;
}

function chevronSvg(dir) {
  return dir === 'left'
    ? `<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>`
    : `<svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>`;
}

function sortSvg(dir) {
  const up   = `<svg width="8" height="5" viewBox="0 0 8 5" fill="currentColor"><path d="M4 0L8 5H0z"/></svg>`;
  const down = `<svg width="8" height="5" viewBox="0 0 8 5" fill="currentColor"><path d="M4 5L0 0h8z"/></svg>`;
  if (dir === 'asc')  return up;
  if (dir === 'desc') return down;
  return up + down;
}
