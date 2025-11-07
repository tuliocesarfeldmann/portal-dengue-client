import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { App } from '../../App'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
});

vi.mock('react-leaflet', () => ({
  MapContainer: () => <div />,
  TileLayer: () => <div />,
  Marker: () => <div />,
  Popup: () => <div />
}));

test("abre e navega na tela de estatísticas", async () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /estatísticas/i }));
  fireEvent.click(screen.getByRole('button', { name: /pontos corrigidos/i }));
  fireEvent.click(screen.getByRole('button', { name: /90 dias/i }));
  fireEvent.click(screen.getByRole('button', { name: /180 dias/i }));

  expect(screen.getByText(/estatísticas gerais/i)).toBeInTheDocument();
});
