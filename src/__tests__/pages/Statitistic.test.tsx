import { fireEvent, render, screen } from '@testing-library/react'
import App from 'src/App';

test("ts", async () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  jest.mock('react-leaflet', () => jest.fn());
  render(<App />);
  fireEvent.click(screen.getAllByText("ESTATÍSTICAS").at(0)!);
  fireEvent.click(screen.getAllByText("Pontos corrigidos").at(0)!);
  fireEvent.click(screen.getAllByText("90 dias").at(0)!);
  fireEvent.click(screen.getAllByText("180 dias").at(0)!);

  expect(screen.getAllByText("Estatísticas Gerais")).not.toBeEmpty();

})
