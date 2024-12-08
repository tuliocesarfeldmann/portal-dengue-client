import { fireEvent, render, screen } from '@testing-library/react'
import App from 'src/App';

test("ts", async () => {
  jest.mock('react-leaflet', () => jest.fn());
  const app = render(<App />);
  fireEvent.click(screen.getAllByText("CADASTRAR PONTO").at(0)!.parentElement!);

  expect(screen.getAllByText("Relatar ponto")).not.toBeEmpty();
  fireEvent.click(screen.getByText("Relatar ponto"));

})
