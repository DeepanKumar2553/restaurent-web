import { UtensilsCrossed, Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-slate-950 text-white pt-20 pb-10 border-t border-slate-900">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 group">
                            <div className="bg-[#f75d00] p-2 rounded-lg text-white">
                                <UtensilsCrossed size={24} />
                            </div>
                            <span className="text-2xl font-bold tracking-tight uppercase">
                                NeoDine
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            Experience the future of fine dining. Precision ingredients, interactive booking, and an unforgettable atmosphere.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-[#f75d00] hover:text-white transition-colors text-slate-400">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-[#f75d00] hover:text-white transition-colors text-slate-400">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-[#f75d00] hover:text-white transition-colors text-slate-400">
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-6 font-mono uppercase tracking-wider">Explore</h3>
                        <ul className="space-y-4">
                            {['Home', 'Menu', 'Story', 'Careers', 'Privacy Policy'].map((item) => (
                                <li key={item}>
                                    <Link to="/" className="text-slate-400 hover:text-[#f75d00] transition-colors text-sm">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-6 font-mono uppercase tracking-wider">Contact</h3>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-3 text-slate-400 text-sm">
                                <MapPin size={20} className="text-[#f75d00] shrink-0" />
                                <span>123 Culinary Avenue,<br />Metropolis, NY 10012</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400 text-sm">
                                <Phone size={20} className="text-[#f75d00] shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400 text-sm">
                                <Mail size={20} className="text-[#f75d00] shrink-0" />
                                <span>reservations@neodine.com</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-6 font-mono uppercase tracking-wider">Hours</h3>
                        <ul className="space-y-3">
                            <li className="flex justify-between text-sm border-b border-slate-900 pb-2">
                                <span className="text-slate-400">Mon - Thu</span>
                                <span className="font-mono font-bold text-white">8:00 AM - 10:00 PM</span>
                            </li>
                            <li className="flex justify-between text-sm border-b border-slate-900 pb-2">
                                <span className="text-slate-400">Fri - Sat</span>
                                <span className="font-mono font-bold text-white">8:00 AM - 10:00 PM</span>
                            </li>
                            <li className="flex justify-between text-sm border-b border-slate-900 pb-2">
                                <span className="text-slate-400">Sunday</span>
                                <span className="font-mono font-bold text-white">8:00 AM - 10:00 PM</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
                    <span className="text-slate-500 text-xs">
                        © 2025 NeoDine Restaurant Group. All rights reserved.
                    </span>
                    <span className="text-slate-500 text-xs flex items-center gap-1">
                        Designed for the <span className="text-[#f75d00]">Future</span>.
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;