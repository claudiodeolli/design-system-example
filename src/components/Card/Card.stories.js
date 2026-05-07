import { createCard, createStatCard } from './Card.js';
import '../../tokens/variables.css';

export default {
  title: 'Components/Card',
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'light' },
    docs: {
      description: {
        component: 'Componentes de card para containers de conteúdo e métricas do dashboard.',
      },
    },
  },
};

export const BasicCard = {
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding:24px; max-width:500px;';
    wrap.appendChild(createCard({
      title: 'Histórico de cobranças',
      body: '<p style="color:var(--color-text-muted);font-size:14px;">Conteúdo do card aqui.</p>',
    }));
    return wrap;
  },
};

export const StatCards = {
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding:24px; display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:16px;';

    const cards = [
      {
        value: 'R$ 0,00',
        label: 'Entradas',
        color: 'green',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M8 12h8M12 8v8"/></svg>`,
      },
      {
        value: 'R$ 0,00',
        label: 'Saídas',
        color: 'orange',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-4 0v2M8 7V5a2 2 0 0 0-4 0v2"/></svg>`,
      },
      {
        value: 'R$ 0,00',
        label: 'NFs | Receita',
        color: 'blue',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"/></svg>`,
      },
      {
        value: 'R$ 0,00',
        label: 'Impostos pagos',
        color: 'teal',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
      },
    ];

    cards.forEach(c => wrap.appendChild(createStatCard(c)));
    return wrap;
  },
  parameters: { controls: { disable: true } },
};

export const HoverableCard = {
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding:24px; max-width:400px;';
    wrap.appendChild(createCard({
      title: 'Contabilidade',
      subtitle: 'Plano Básico',
      hoverable: true,
      body: '<p style="font-size:14px;color:var(--color-text-muted);">Passe o mouse para ver o efeito de elevação.</p>',
    }));
    return wrap;
  },
};
