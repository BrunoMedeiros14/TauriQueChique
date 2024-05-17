import { Outlet, createFileRoute, redirect, useRouter } from '@tanstack/react-router'

import { LogOut, Menu, Users } from 'lucide-react'
import { Suspense, useRef, useState } from 'react'

import { SidebarLi } from '../components/sidebar-li'
import { Dialog, DialogTrigger } from '../components/ui/dialog'
import { useAuth } from '../hooks/use-auth'
import logo from '/images/logo.png'

// const GerarRelatorioComponent = lazy(() => import('../components/GerarRelatorioComponent'))
// const TanStackRouterDevtools = lazy(() => import('../components/TanStackRouterDevtools'))

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
      })
    }
  },
  component: AppLayout,
})

function AppLayout() {
  const [menuAtivo, setMenuAtivo] = useState(true)
  const [mostrarPopupRelatorio, setMostrarPopupRelatorio] = useState(false)
  const refBotaoRelatorio = useRef<HTMLButtonElement | null>(null)
  const auth = useAuth()
  const router = useRouter()
  const navigate = Route.useNavigate()
  const handleLogout = () => {
    auth.logout()
    router.invalidate().finally(() => {
      navigate({ to: '/login', replace: true })
    })
  }

  return (
    <>
      <aside
        id='sidebar-multi-level-sidebar'
        className={`transition-all ease-linear fixed top-0 left-0 z-40 ${menuAtivo ? 'w-64' : 'w-16'} h-screen`}
        aria-label='Sidebar'>
        <div className='h-full px-3 py-4 overflow-y-auto bg-gray-100 flex flex-col justify-between'>
          <ul className='space-y-2 font-medium'>
            <li className='flex h-12 justify-between items-center'>
              {menuAtivo && <img src={logo} alt='Logomarca que Chique' className='ps-2 h-full' />}
              <a
                onClick={() => setMenuAtivo(!menuAtivo)}
                className='flex items-center p-2 text-gray-900 rounded-lg group [&.active]:bg-gray-200 [&.active]:bg-opacity-75 hover:bg-gray-200 w-fit right-0'>
                <Menu />
              </a>
            </li>
            <SidebarLi icone={<Users />} texto='Clientes' to='/clientes' ativo={menuAtivo} />
            {/* <li>
              <div
                onClick={() => refBotaoRelatorio.current?.click()}
                className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg group [&.active]:bg-gray-200 [&.active]:bg-opacity-75 hover:bg-gray-200"
              >
                <Table2Icon />
                {menuAtivo && <span className="ms-3">Relatórios</span>}
              </div>
            </li> */}
          </ul>
          <ul>
            <li>
              <div
                onClick={handleLogout}
                className='font-medium cursor-pointer flex items-center p-2 text-gray-900 rounded-lg group [&.active]:bg-gray-200 [&.active]:bg-opacity-75 hover:bg-gray-200'>
                <LogOut />
                {menuAtivo && <span className='ms-3'>Sair da aplicação</span>}
              </div>
            </li>
          </ul>
        </div>
      </aside>

      <div className={`p-4 ${menuAtivo ? 'ml-64' : 'ml-16'}`}>
        <Outlet />
        <Dialog onOpenChange={setMostrarPopupRelatorio}>
          <DialogTrigger ref={refBotaoRelatorio} />
          {mostrarPopupRelatorio && <Suspense>{/* <GerarRelatorioComponent /> */}</Suspense>}
        </Dialog>
      </div>
    </>
  )
}
