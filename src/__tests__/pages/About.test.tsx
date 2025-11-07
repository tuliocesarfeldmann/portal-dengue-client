import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { App } from '../../App'

// Mock global de react-leaflet no ambiente de teste
vi.mock('react-leaflet', () => ({
  MapContainer: () => <div />,
  TileLayer: () => <div />,
  Marker: () => <div />,
  Popup: () => <div />
}));

test("abre pagina Sobre e exibe os autores", async () => {
  render(<App />);

  // Clicar no botão SOBRE
  const sobreBtn = screen.getByRole('button', { name: /sobre/i });
  fireEvent.click(sobreBtn);

  // Aguarda o texto ser carregado na tela
  const autores = await screen.findByText(/michel felipe krohn forsch/i);
  expect(autores).toBeInTheDocument();
});
