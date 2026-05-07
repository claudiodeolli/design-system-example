import { createBadge, createAlert } from './Badge.js';
import '../../tokens/variables.css';

export default {
  title: 'Components/Badge',
  tags: ['autodocs'],
  argTypes: {
    label:   { control: 'text' },
    variant: { control: 'select', options: ['success','warning','danger','info','primary','neutral','dark'] },
    size:    { control: 'select', options: ['sm','','lg'] },
    dot:     { control: 'boolean' },
    outline: { control: 'boolean' },
  },
  args: {
    label: 'Status',
    variant: 'success',
    size: '',
    dot: false,
    outline: false,
  },
  parameters: {
    docs: {
      description: {
        component: 'Badges e alertas para indicar status (Pago, Pendente, Cancelada, etc).',
      },
    },
  },
};

export const Default = {
  render: (args) => {
    const wrap = document.createElement('div');
    wrap.style.padding = '24px';
    wrap.appendChild(createBadge(args));
    return wrap;
  },
};

export const AllVariants = {
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; flex-wrap:wrap; gap:10px; padding:24px; align-items:center;';
    const variants = [
      { label: 'Pago',       variant: 'success' },
      { label: 'Pendente',   variant: 'warning' },
      { label: 'Cancelada',  variant: 'danger'  },
      { label: 'Ativo',      variant: 'info'    },
      { label: 'Contasy',    variant: 'primary' },
      { label: 'Neutro',     variant: 'neutral' },
      { label: 'Dark',       variant: 'dark'    },
    ];
    variants.forEach(v => wrap.appendChild(createBadge(v)));
    return wrap;
  },
  parameters: { controls: { disable: true } },
};

export const WithDot = {
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; flex-wrap:wrap; gap:10px; padding:24px; align-items:center;';
    [
      { label: 'Pago',      variant: 'success', dot: true },
      { label: 'Pendente',  variant: 'warning', dot: true },
      { label: 'Cancelada', variant: 'danger',  dot: true },
    ].forEach(v => wrap.appendChild(createBadge(v)));
    return wrap;
  },
  parameters: { controls: { disable: true } },
};

export const Outlined = {
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; flex-wrap:wrap; gap:10px; padding:24px; align-items:center;';
    ['success','warning','danger','primary'].forEach(v =>
      wrap.appendChild(createBadge({ label: v.charAt(0).toUpperCase()+v.slice(1), variant: v, outline: true }))
    );
    return wrap;
  },
  parameters: { controls: { disable: true } },
};

export const Alerts = {
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; flex-direction:column; gap:12px; padding:24px; max-width:600px;';
    wrap.appendChild(createAlert({
      variant: 'danger',
      message: 'A sua mensalidade está pendente. Realize o pagamento da mensalidade para que sua empresa não fique irregular perante a receita federal.',
    }));
    wrap.appendChild(createAlert({
      variant: 'warning',
      title: 'Atenção',
      message: 'Enquanto você possuir mensalidades em atraso, a Contasy se isenta 100% das responsabilidades contábeis da sua empresa.',
    }));
    wrap.appendChild(createAlert({
      variant: 'success',
      message: 'Pagamento realizado com sucesso!',
    }));
    return wrap;
  },
  parameters: { controls: { disable: true } },
};
