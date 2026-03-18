import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UtensilsCrossed, Menu, X } from 'lucide-react';
import clsx from 'clsx';

const SNAPPY_EASE = "cubic-bezier(0.17,0.25,0.30,1.00)";

const RolloverLink = ({ to, text, isActive, onClick }: { to: string; text: string; isActive?: boolean, onClick?: () => void }) => {
    return (
        <Link
            to={to}
            onClick={onClick}
            className="group relative block h-5 overflow-hidden text-xs font-mono uppercase tracking-wide"
        >
            <div
                className="flex flex-col transition-transform duration-300 group-hover:-translate-y-1/2"
                style={{ transitionTimingFunction: SNAPPY_EASE }}
            >
                <span className={clsx(
                    "flex h-5 items-center",
                    isActive ? "text-[#f75d00] font-bold" : "text-gray-600"
                )}>
                    {text}
                </span>
                <span className={clsx(
                    "flex h-5 items-center text-black font-semibold",
                    isActive && "text-[#f75d00]"
                )}>
                    {text}
                </span>
            </div>
        </Link>
    );
};

const Navbar = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const closeMenu = () => setIsMobileMenuOpen(false);

    return (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm h-16 border-b border-gray-100">
            <div className="max-w-[1400px] mx-auto px-6 h-full flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3 group" onClick={closeMenu}>
                    <div className="bg-gradient-to-br from-orange-600 to-orange-500 p-2.5 rounded-xl text-white shadow-lg shadow-orange-200 transition-transform group-hover:scale-105">
                        <UtensilsCrossed size={26} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold tracking-tight text-slate-800 leading-none">
                            Neo<span className="text-orange-600">Dine</span>
                        </span>
                        <span className="text-[10px] font-medium text-gray-400 tracking-widest uppercase">
                            Fine Dining
                        </span>
                    </div>
                </Link>
                <div className="hidden md:flex items-center gap-10">
                    <div className="flex items-center gap-8">
                        <RolloverLink to="/" text="Home" isActive={location.pathname === '/'} />
                        <RolloverLink to="/menu" text="Menu" isActive={location.pathname === '/menu'} />
                        <RolloverLink to="/story" text="Story" isActive={location.pathname === '/story'} />
                        <RolloverLink to="/contact" text="Contact" isActive={location.pathname === '/contact'} />
                    </div>
                    <div className="flex items-center gap-3">
                        <Link to="/admin/login">
                            <button className="relative overflow-hidden rounded border border-gray-300 bg-transparent px-5 py-2 text-xs font-mono uppercase tracking-wide text-black transition-all active:scale-95 group">
                                <div className="absolute inset-0 bg-black translate-y-full transition-transform duration-300 group-hover:translate-y-0" style={{ transitionTimingFunction: SNAPPY_EASE }} />
                                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Admin</span>
                            </button>
                        </Link>
                        <Link to="/reservation">
                            <button className="relative overflow-hidden rounded bg-[#f75d00] px-5 py-2 text-xs font-mono uppercase tracking-wide text-white transition-all active:scale-95 group">
                                <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0" style={{ transitionTimingFunction: SNAPPY_EASE }} />
                                <span className="relative z-10">Book Table</span>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center gap-4 md:hidden">
                    <Link to="/reservation">
                        <button className="bg-[#f75d00] p-2 rounded-lg text-white shadow-md active:scale-95 transition-transform">
                            <span className="text-xs font-mono uppercase tracking-wide">Book</span>
                        </button>
                    </Link>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 text-slate-800 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-xl flex flex-col p-6 gap-6 animate-in slide-in-from-top-5 fade-in duration-200">
                    <div className="flex flex-col gap-6 items-center">
                        <RolloverLink to="/" text="Home" isActive={location.pathname === '/'} onClick={closeMenu} />
                        <RolloverLink to="/menu" text="Menu" isActive={location.pathname === '/menu'} onClick={closeMenu} />
                        <RolloverLink to="/story" text="Story" isActive={location.pathname === '/story'} onClick={closeMenu} />
                        <RolloverLink to="/contact" text="Contact" isActive={location.pathname === '/contact'} onClick={closeMenu} />
                    </div>
                    <div className="border-t border-gray-100 pt-6 flex justify-center">
                        <Link to="/admin/login" onClick={closeMenu} className="text-xs font-mono uppercase tracking-wide text-gray-500 hover:text-black">
                            Admin Login
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;