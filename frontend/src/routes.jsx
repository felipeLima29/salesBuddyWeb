import PortalLogin from "./pages/login.jsx";
import Menu from "./components/menu.jsx";
import UserList from "./pages/usersList.jsx";
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MainLayout from "./components/mainLayout.jsx";

function AppRoutes() {
    return (
        <div>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<PortalLogin />} />
                <Route element={<MainLayout />}>
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/usersList" element={<UserList />} />
                </Route>

            </Routes>
        </div>
    )
}
export default AppRoutes;