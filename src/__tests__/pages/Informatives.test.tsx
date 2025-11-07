import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { App } from '../../App'

// Mock básico do react-leaflet para evitar erros de renderização no Vitest
vi.mock('react-leaflet', () => ({
  MapContainer: () => <div />,
  TileLayer: () => <div />,
  Marker: () => <div />,
  Popup: () => <div />
}));

test("abre tela de informativos", async () => {
  render(<App />);

  // Clicar no botão INFORMATIVOS
  fireEvent.click(screen.getByRole('button', { name: /informativos/i }));

  // Verifica que o texto aparece na tela
  expect(screen.getByText(/nenhum informativo/i)).toBeInTheDocument();
});
