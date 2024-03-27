import { Route, Routes as Switch } from 'react-router-dom'

import routes from './routes'

export function Router (): JSX.Element {
  const renderRouter = (Component: JSX.Element): JSX.Element => {
    return Component
  }

  return (
    <>
      <Switch>
        {routes.map((route, index) => {
          const { Component, path } = route

          const authorized = true

          return (
            <Route
              key={index}
              path={path}
              element={
                authorized
                  ? (
                      renderRouter(<Component />)
                    )
                  : <>UNAUTHORIZED</>
              }
            />
          )
        })}
      </Switch>
    </>
  )
}
