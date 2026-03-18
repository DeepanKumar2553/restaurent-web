import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './components/Home'
import AdminLogin from './components/AdminLogin';
import AdminLayout from './components/AdminLayout';
import Dashboard from './components/Dashboard';
import MenuManager from './components/MenuManager';
import Menu from './components/Menu';
import Reservation from './components/Reservation';
import Story from './components/Story';
import Contact from './components/Contact';
import ReservationManager from './components/ReservationManager';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isPublicPage = !location.pathname.startsWith('/admin');
  return (
    <>
      {isPublicPage && <Navbar />}
      {children}
    </>
  );
};

function App() {
  return (
    <Router>
      <Toaster position="top-center" />

      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/story" element={<Story />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="menu" element={<MenuManager />} />
            <Route path="reservations" element={<ReservationManager />} />
          </Route>

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;