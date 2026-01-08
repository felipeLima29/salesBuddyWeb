import PortalLogin from "./pages/home";
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function AppRoutes() {
    return (
        <div>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<PortalLogin />} />
            </Routes>
        </div>
    )
}
export default AppRoutes;