import { fireEvent, render, screen } from '@testing-library/react'
import App from 'src/App';

test("ts", () => {
  jest.mock('react-leaflet', () => jest.fn());
  render(<App />);
  fireEvent.click(screen.getAllByText("SOBRE").at(0)!);

  expect(screen.findAllByText("MICHEL FELIPE KROHN FORSCH")).not.toBeEmpty();

})
