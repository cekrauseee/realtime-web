import { Outlet } from 'react-router'

export const PublicLayout = () => (
  <div className='flex h-svh items-center justify-center'>
    <Outlet />
  </div>
)
