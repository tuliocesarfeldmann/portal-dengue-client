import { fireEvent, render, screen } from '@testing-library/react'
import App from 'src/App';

test("ts", async () => {
  jest.mock('react-leaflet', () => jest.fn());
  const app = render(<App />);
  fireEvent.click(screen.getAllByText("INFORMATIVOS").at(0)!);

  expect(screen.getAllByText("Nenhum Informativo")).not.toBeEmpty();

})
