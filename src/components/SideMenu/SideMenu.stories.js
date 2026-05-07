import { createSideMenu } from './SideMenu.js';
import '../../tokens/variables.css';

export default {
  title: 'Components/SideMenu',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'light' },
    docs: {
      description: {
        component: 'Menu lateral de navegação. Suporta seções agrupadas, ícones, badge, estado ativo e modo recolhido.',
      },
    },
  },
};

const defaultSections = [
  {
    label: null,
    items: [
      { id: 'painel', label: 'Painel', icon: 'home', href: '#' },
    ],
  },
  {
    label: 'Contabilidade',
    items: [
      { id: 'empresa',       label: 'Empresa',         icon: 'building',     href: '#' },
      { id: 'impostos',      label: 'Impostos',         icon: 'tax',          href: '#' },
      { id: 'declaracoes',   label: 'Declarações',      icon: 'declaration',  href: '#' },
      { id: 'notas',         label: 'Notas fiscais',    icon: 'invoice',      href: '#' },
      { id: 'assinatura',    label: 'Assinatura',       icon: 'credit',       href: '#', badge: '1' },
    ],
  },
  {
    label: 'Minha Conta',
    items: [
      { id: 'dados',         label: 'Dados pessoais',   icon: 'user',         href: '#' },
      { id: 'certificado',   label: 'Certificado (e-CPF)', icon: 'certificate', href: '#' },
      { id: 'empresas',      label: 'Minhas empresas',  icon: 'companies',    href: '#' },
    ],
  },
  {
    label: 'Benefícios',
    items: [
      { id: 'parceiros',     label: 'Nossos parceiros', icon: 'partners',     href: '#' },
    ],
  },
];

export const Default = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display:flex; height:100vh; overflow:hidden;';

    const menu = createSideMenu({
      sections: defaultSections,
      activeItem: 'painel',
      logoText: 'contasy',
    });

    const main = document.createElement('main');
    main.style.cssText = `
      flex:1;
      margin-left:260px;
      padding:32px;
      background:#f5f6fa;
      font-family:var(--font-family);
      color:var(--color-text-muted);
      display:flex;
      align-items:center;
      justify-content:center;
    `;
    main.innerHTML = `<p style="font-size:15px">← Clique nos itens do menu</p>`;

    menu.addEventListener('sidemenu:click', (e) => {
      main.innerHTML = `<p style="font-size:15px">Item clicado: <strong>${e.detail.item.label}</strong></p>`;
      menu.setActiveItem(e.detail.item.id);
    });

    menu.addEventListener('sidemenu:toggle', (e) => {
      main.style.marginLeft = e.detail.collapsed ? '72px' : '260px';
    });

    wrapper.appendChild(menu);
    wrapper.appendChild(main);
    return wrapper;
  },
};

export const ActiveAssinatura = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display:flex; height:100vh; overflow:hidden;';

    const menu = createSideMenu({
      sections: defaultSections,
      activeItem: 'assinatura',
      logoText: 'contasy',
    });

    const main = document.createElement('main');
    main.style.cssText = 'flex:1; margin-left:260px; padding:32px; background:#f5f6fa;';
    menu.addEventListener('sidemenu:toggle', (e) => {
      main.style.marginLeft = e.detail.collapsed ? '72px' : '260px';
    });

    wrapper.appendChild(menu);
    wrapper.appendChild(main);
    return wrapper;
  },
};

export const Collapsed = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display:flex; height:100vh; overflow:hidden;';

    const menu = createSideMenu({
      sections: defaultSections,
      activeItem: 'painel',
      logoText: 'contasy',
    });
    menu.classList.add('is-collapsed');

    const main = document.createElement('main');
    main.style.cssText = 'flex:1; margin-left:72px; padding:32px; background:#f5f6fa;';
    menu.addEventListener('sidemenu:toggle', (e) => {
      main.style.marginLeft = e.detail.collapsed ? '72px' : '260px';
    });

    wrapper.appendChild(menu);
    wrapper.appendChild(main);
    return wrapper;
  },
};
