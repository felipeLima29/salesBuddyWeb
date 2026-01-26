import AppRoutes from './routes'
import { ToastContainer } from 'react-toastify'

export default function App() {
  return (
    <>
      <ToastContainer />
      <div id='appContent'>
        <AppRoutes />
      </div>
    </>

  )
}