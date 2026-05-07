import { createTable } from './Table.js';
import { createBadge } from '../Badge/Badge.js';
import '../../tokens/variables.css';

export default {
  title: 'Components/Table',
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'white' },
    docs: {
      description: {
        component: 'Tabela com suporte a ordenação, paginação, células customizadas e estado vazio.',
      },
    },
  },
};

const billingColumns = [
  { key: 'descricao', label: 'Descrição', sortable: true,
    render: (val, row) => row.href
      ? `<a class="c-table__link" href="${row.href}">${val}</a>`
      : val,
  },
  { key: 'periodo',   label: 'Período',   sortable: false },
  { key: 'total',     label: 'Total',     sortable: true  },
  {
    key: 'status',
    label: 'Status',
    render: (val) => {
      const map = { Pago: 'success', Pendente: 'warning', Cancelada: 'danger', Atrasado: 'danger' };
      const badge = createBadge({ label: val, variant: map[val] || 'neutral' });
      return badge;
    },
  },
  { key: 'pago_em', label: 'Pago em' },
  {
    key: 'action',
    label: '',
    render: (val, row) => {
      if (row.status !== 'Pendente') return '';
      const btn = document.createElement('button');
      btn.className = 'c-btn c-btn--success c-btn--sm';
      btn.textContent = 'PAGAR';
      btn.addEventListener('click', () => alert(`Pagar: ${row.descricao} - ${row.total}`));
      return btn;
    },
  },
];

const billingRows = [
  { descricao: 'Contabilidade', href: '#', periodo: '02 Jun, 24 - 02 Jul, 24', total: 'R$ 290,00', status: 'Pendente', pago_em: '' },
  { descricao: 'Contabilidade', href: '',  periodo: '02 Mai, 24 - 02 Jun, 24', total: 'R$ 0,00',   status: 'Pago',     pago_em: '02 Mai, 24' },
];

export const BillingTable = {
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding:24px; max-width:900px;';
    wrap.appendChild(createTable({
      columns: billingColumns,
      rows: billingRows,
      pagination: { page: 1, total: 2, perPage: 10, onChange: (p) => console.log('page', p) },
    }));
    return wrap;
  },
  parameters: { controls: { disable: true } },
};

export const EmptyState = {
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding:24px; max-width:700px;';
    wrap.appendChild(createTable({
      columns: billingColumns,
      rows: [],
      emptyText: 'Nenhum registro encontrado',
    }));
    return wrap;
  },
  parameters: { controls: { disable: true } },
};

export const Sortable = {
  render: () => {
    const cols = [
      { key: 'nome',     label: 'Nome',     sortable: true },
      { key: 'empresa',  label: 'Empresa',  sortable: true },
      { key: 'valor',    label: 'Valor',    sortable: true },
      { key: 'status',   label: 'Status',
        render: (v) => createBadge({ label: v, variant: v === 'Ativo' ? 'success' : 'warning' }) },
    ];
    const rows = [
      { nome: 'João Silva',   empresa: 'Tech LTDA',    valor: 'R$ 1.200,00', status: 'Ativo'    },
      { nome: 'Maria Souza',  empresa: 'Digital ME',   valor: 'R$ 850,00',   status: 'Pendente' },
      { nome: 'Carlos Lima',  empresa: 'Fast EIRELI',  valor: 'R$ 2.400,00', status: 'Ativo'    },
      { nome: 'Ana Costa',    empresa: 'Prime LTDA',   valor: 'R$ 350,00',   status: 'Pendente' },
    ];
    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding:24px; max-width:800px;';
    wrap.appendChild(createTable({ columns: cols, rows,
      pagination: { page: 1, total: 4, perPage: 10 } }));
    return wrap;
  },
  parameters: { controls: { disable: true } },
};
