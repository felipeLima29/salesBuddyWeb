import PortalLogin from "./pages/login.jsx";
import Menu from "./components/menu.jsx";
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function AppRoutes() {
    return (
        <div>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<PortalLogin />} />
                <Route path="/menu" element={<Menu />} />
            </Routes>
        </div>
    )
}
export default AppRoutes;