import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PortalLogin from "./pages/login.jsx";
import Menu from "./components/menu.jsx";
import UserList from "./pages/usersList.jsx";
import MainLayout from "./components/mainLayout.jsx";
import SalesList from "./pages/salesList.jsx";
import AddNewUser from './pages/addNewUser.jsx';
import EditUser from './pages/editUser.jsx';
import ConfirmModalDelete from './components/confirmModal.jsx';
import PaymentReceiptModal from './components/paymentReceiptModal.jsx';
import ForgotPassword from './pages/forgotPassword.jsx';
import ResetPasswordModal from './components/resetPasswordModal.jsx';

function AppRoutes() {
    return (
        <div>
            
            <Routes>
                <Route path="/" element={<PortalLogin />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route element={<MainLayout />}>
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/usersList" element={<UserList />} />
                    <Route path="/salesList" element={<SalesList />} />
                    <Route path="/usersList/addNewUser" element={<AddNewUser />} />
                    <Route path="/usersList/editUser/:id" element={<EditUser />} />
                    <Route path="/usersList/modelDeleteUser" element={<ConfirmModalDelete />} />
                    <Route path="/salesList/paymentReceiptModal" element={<PaymentReceiptModal />} />
                    <Route path="/usersList/editUser/resetPasswordModal/" element={<ResetPasswordModal />} />
                </Route>

            </Routes>
        </div>
    )
}
export default AppRoutes;