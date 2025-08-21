import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import LogIn from './pages/Login';
import DashBoardHome from './pages/DashBoardHome';
import ForgotPassword from './pages/ForgotPassword';
import VerfEmail from './pages/VerfifEmail';
import NewPassword from './pages/NewPassword';
import History from './pages/History';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import UsersPage from './pages/UsersPage';
import { SidebarProvider } from './contexts/SidebarContext';
import { UserProvider } from './contexts/UserContext';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
/*  */


function App() {
  return (
    <>
      <UserProvider>
        <SidebarProvider>
          <LanguageProvider>
            <ThemeProvider>
              <Router>
                <Routes>
                  <Route path='/' element={<LogIn />}></Route>
                  <Route path='/users' element={<UsersPage />} />
                  <Route path='/forgot' element={<ForgotPassword />}></Route>
                  <Route path='/dashboardhome' element={<DashBoardHome />}></Route>
                  <Route path='/verifemail' element={<VerfEmail />}></Route>
                  <Route path='/new-password' element={<NewPassword />}></Route>
                  <Route path='/history' element={<History />}></Route>
                  <Route path='/setting' element={<Settings />}></Route>
                  <Route path='/notif' element={<Notifications />}></Route>
                </Routes>
              </Router>
            </ThemeProvider>
          </LanguageProvider>
        </SidebarProvider>
      </UserProvider>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      /></>
  );
}

export default App;
