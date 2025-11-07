import { fireEvent, render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import { App } from '../../App'

import '@testing-library/jest-dom';

// Mock básico do react-leaflet para evitar erros de renderização no Vitest
vi.mock('react-leaflet', () => ({
  MapContainer: () => <div />,
  TileLayer: () => <div />,
  Marker: () => <div />,
  Popup: () => <div />
}));

test("abre modal ao clicar em CADASTRAR PONTO", async () => {
  render(<App />);

  const cadastrarBtn = screen.getByRole('button', { name: /cadastrar ponto/i });

  // Clicar no botão CADASTRAR PONTO
  fireEvent.click(cadastrarBtn);

  // Verifica que o texto do modal aparece na tela
  expect(screen.getByText(/relatar ponto/i)).toBeInTheDocument();

  fireEvent.click(screen.getByText(/relatar ponto/i));
});
