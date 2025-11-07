import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { App } from '../../App'

// Mock necessário para React Leaflet no ambiente de teste
vi.mock('react-leaflet', () => ({
  MapContainer: () => <div />,
  TileLayer: () => <div />,
  Marker: () => <div />,
  Popup: () => <div />
}));

test("abre tela de login ao clicar no menu", async () => {
  render(<App />);

  // Clicar no botão LOGIN
  const loginBtn = screen.getByRole('button', { name: /login/i });
  fireEvent.click(loginBtn);

  // Verifica se o texto da tela de login foi exibido
  expect(screen.getByText(/faça o login/i)).toBeInTheDocument();

  // Clicar no botão LOGIN dentro da tela de login (caso exista)
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
});
