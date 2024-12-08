import { fireEvent, render, screen } from '@testing-library/react'
import App from 'src/App';

test("ts", async () => {
  jest.mock('react-leaflet', () => jest.fn());
  render(<App />);
  fireEvent.click(screen.getAllByText("LOGIN").at(0)!);

  expect(screen.getAllByText("FAÇA O LOGIN")).not.toBeEmpty();
  fireEvent.click(screen.getByText("LOGIN"));

})
