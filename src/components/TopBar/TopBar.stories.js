import { createTopBar, createBreadcrumb, createPageHeader } from './TopBar.js';
import { createButton } from '../Button/Button.js';
import '../../tokens/variables.css';

export default {
  title: 'Components/TopBar',
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'light' },
    docs: {
      description: {
        component: 'Barra superior com nome da empresa, breadcrumb e cabeçalho de página.',
      },
    },
  },
};

export const Default = {
  render: () => {
    const wrap = document.createElement('div');
    wrap.appendChild(createTopBar({
      company: 'MARSHALLS EMPRESARIAIS E DIGITAIS NEGOCIOS DIGITAIS LTDA',
    }));
    return wrap;
  },
};

export const WithActions = {
  render: () => {
    const calIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
    const wrap = document.createElement('div');
    wrap.appendChild(createTopBar({
      company: 'MARSHALLS EMPRESARIAIS E DIGITAIS NEGOCIOS DIGITAIS LTDA',
      actions: [createButton({ label: '2026', iconLeft: calIcon, size: 'sm' })],
    }));
    return wrap;
  },
};

export const BreadcrumbStory = {
  name: 'Breadcrumb',
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.padding = '24px';
    const homeIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
    wrap.appendChild(createBreadcrumb([
      { label: '', href: '#', icon: homeIcon },
      { label: 'Painel' },
    ]));
    return wrap;
  },
};

export const PageHeaderStory = {
  name: 'PageHeader',
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding:24px; background:var(--color-bg);';
    const homeIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
    const calIcon  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
    wrap.appendChild(createPageHeader({
      title: 'Painel',
      breadcrumb: [
        { label: '', href: '#', icon: homeIcon },
        { label: 'Painel' },
      ],
      actions: [createButton({ label: '2026', iconLeft: calIcon })],
    }));
    return wrap;
  },
};
