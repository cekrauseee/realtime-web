import { Toaster } from '@/domain/ui/cn/components/sonner'
import { Outlet } from 'react-router'

export const Layout = () => (
  <>
    <Outlet />
    <Toaster richColors />
  </>
)
