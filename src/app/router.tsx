import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'

const Layout = lazy(() => import('./layout').then((module) => ({ default: module.Layout })))
const Auth = lazy(() => import('../domain/identity/auth/ui/fragments/auth').then((module) => ({ default: module.Auth })))

const PublicLayout = lazy(() => import('./public/public.layout').then((module) => ({ default: module.PublicLayout })))
const SignInPage = lazy(() => import('./public/sign-in.page').then((module) => ({ default: module.SignInPage })))
const SignUpPage = lazy(() => import('./public/sign-up.page').then((module) => ({ default: module.SignUpPage })))

const ProtectedLayout = lazy(() => import('./protected/protected.layout').then((module) => ({ default: module.ProtectedLayout })))
const ProtectedPage = lazy(() => import('./protected/protected.page').then((module) => ({ default: module.ProtectedPage })))

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route element={<Auth />}>
          <Route element={<PublicLayout />}>
            <Route
              path='/sign-in'
              element={<SignInPage />}
            />
            <Route
              path='/sign-up'
              element={<SignUpPage />}
            />
          </Route>
          <Route element={<ProtectedLayout />}>
            <Route
              element={<ProtectedPage />}
              index
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
)
