import { render } from '@testing-library/react'
import App from 'src/App'

test("ts", () => {
  jest.mock('react-leaflet', () => jest.fn());
  const app = render(<App />);

  expect(app.findByTitle("PORTAL DA DENGUE")).not.toBeEmpty();

})
