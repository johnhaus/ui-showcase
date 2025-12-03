import Header from './Header';

export default {
  title: 'Navbar/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = {
  render: (args) => <Header {...args} />,
  parameters: {
    screenshot: true
  }
};
