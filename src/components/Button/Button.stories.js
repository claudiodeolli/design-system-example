import { createButton } from './Button.js';
import '../../tokens/variables.css';

export default {
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    label:    { control: 'text', description: 'Texto do botão' },
    variant:  { control: 'select', options: ['primary','secondary','ghost','danger','success','white'], description: 'Variante visual' },
    size:     { control: 'select', options: ['xs','sm','md','lg','xl'], description: 'Tamanho' },
    disabled: { control: 'boolean' },
    loading:  { control: 'boolean' },
    pill:     { control: 'boolean', description: 'Formato pílula' },
    block:    { control: 'boolean', description: 'Largura total' },
  },
  args: {
    label: 'Botão',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    pill: false,
    block: false,
  },
  parameters: {
    docs: {
      description: {
        component: 'Componente de botão altamente customizável com múltiplas variantes, tamanhos e estados.',
      },
    },
  },
};

export const Default = {
  render: (args) => createButton({ ...args, onClick: () => alert('Clicou!') }),
};

export const AllVariants = {
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; flex-wrap:wrap; gap:12px; padding:24px; align-items:center;';
    const variants = ['primary','secondary','ghost','danger','success','white'];
    variants.forEach(v => {
      wrap.appendChild(createButton({ label: v.charAt(0).toUpperCase() + v.slice(1), variant: v }));
    });
    return wrap;
  },
  parameters: { controls: { disable: true } },
};

export const AllSizes = {
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; flex-wrap:wrap; gap:12px; padding:24px; align-items:center;';
    const sizes = ['xs','sm','md','lg','xl'];
    sizes.forEach(s => {
      wrap.appendChild(createButton({ label: s.toUpperCase(), size: s }));
    });
    return wrap;
  },
  parameters: { controls: { disable: true } },
};

export const WithIcons = {
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; flex-wrap:wrap; gap:12px; padding:24px; align-items:center;';
    const calIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
    const chevron = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;
    const plus    = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
    wrap.appendChild(createButton({ label: '2026', iconLeft: calIcon }));
    wrap.appendChild(createButton({ label: 'Pagar', variant: 'success' }));
    wrap.appendChild(createButton({ label: 'Próximo', iconRight: chevron, variant: 'secondary' }));
    wrap.appendChild(createButton({ label: 'Novo', iconLeft: plus, variant: 'primary', pill: true }));
    return wrap;
  },
  parameters: { controls: { disable: true } },
};

export const States = {
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; flex-wrap:wrap; gap:12px; padding:24px; align-items:center;';
    wrap.appendChild(createButton({ label: 'Normal' }));
    wrap.appendChild(createButton({ label: 'Carregando...', loading: true }));
    wrap.appendChild(createButton({ label: 'Desabilitado', disabled: true }));
    return wrap;
  },
  parameters: { controls: { disable: true } },
};

export const PayButton = {
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding:24px; display:flex; gap:12px;';
    const btn = createButton({ label: 'PAGAR', variant: 'success', size: 'sm' });
    btn.addEventListener('click', () => {
      btn.setLoading(true);
      btn.setLabel('Processando...');
      setTimeout(() => {
        btn.setLoading(false);
        btn.setLabel('PAGAR');
      }, 2000);
    });
    wrap.appendChild(btn);
    return wrap;
  },
  parameters: { controls: { disable: true } },
};
