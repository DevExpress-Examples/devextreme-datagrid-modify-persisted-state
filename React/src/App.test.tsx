import { render, screen } from '@testing-library/react';
import App from './App.tsx';

test('renders app', () => {
  render(<App />);
  expect(screen.getByRole('grid')).toBeInTheDocument();
});
