import { render, screen } from '@testing-library/react'
import React from 'react'
import App from 'src/App'

test("ts", () => {
  jest.mock('react-leaflet', () => jest.fn());
  render(<App />)

  const title = screen.queryAllByText(/PORTAL DA DENGUE/i)

  expect(title).toBeTruthy()

})
