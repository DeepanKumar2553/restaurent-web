import { useState } from 'react';
import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, UtensilsCrossed, CalendarDays, LogOut, Menu, X } from 'lucide-react';

const AdminLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem('adminToken');

    if (!token) {
        return <Navigate to="/" replace />;
    }

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    const navItems = [
        { path: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/admin/reservations', icon: <CalendarDays size={20} />, label: 'Reservations' },
        { path: '/admin/menu', icon: <UtensilsCrossed size={20} />, label: 'Menu' },
    ];

    return (
        <div className="flex h-screen bg-slate-950 overflow-hidden">

            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 z-50">
                <span className="text-[#f75d00] font-bold text-lg tracking-wider">NEODINE ADMIN</span>
                <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 p-2">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0 mt-16 md:mt-0' : '-translate-x-full'} md:translate-x-0 md:static md:block flex flex-col`}>

                <div className="hidden md:flex h-16 items-center px-6 border-b border-slate-800">
                    <span className="text-[#f75d00] font-bold text-xl tracking-wider">NEODINE ADMIN</span>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsOpen(false)} // Close menu when clicked on mobile
                            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-[#f75d00] text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                        >
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-400/10 transition-colors">
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pt-16 md:pt-0 bg-slate-950">
                <div className="p-4 md:p-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 bg-black/60 z-30 md:hidden mt-16" onClick={() => setIsOpen(false)} />
            )}

        </div>
    );
};

export default AdminLayout;