import '../src/tokens/variables.css';

/** @type { import('@storybook/html').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f5f6fa' },
        { name: 'white', value: '#ffffff' },
        { name: 'dark', value: '#2c2c2c' },
      ],
    },
  },
};

export default preview;
