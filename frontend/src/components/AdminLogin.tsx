import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UtensilsCrossed, Lock, User, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../config';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('adminToken', data.token);

            toast.success("Welcome back, Chef.");
            navigate('/admin/dashboard');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Login Error:", error);
            toast.error(error.message || "Connection failed. Is the server running?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-orange-600/20 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]"></div>
            </div>
            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl relative z-10 shadow-2xl">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#f75d00] to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/20">
                        <UtensilsCrossed size={32} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Admin Portal</h1>
                    <p className="text-slate-400 text-sm mt-2">Enter your credentials to manage the restaurant.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-xs font-mono uppercase text-slate-500 ml-1">Username</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-[#f75d00] transition-colors" size={20} />
                            <input
                                type="text"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#f75d00] transition-colors placeholder:text-slate-600"
                                placeholder="Enter username"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-mono uppercase text-slate-500 ml-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-[#f75d00] transition-colors" size={20} />
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#f75d00] transition-colors placeholder:text-slate-600"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#f75d00] hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="animate-pulse">Verifying...</span>
                        ) : (
                            <>
                                Access Dashboard <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </form>
                <div className="mt-8 text-center">
                    <p className="text-slate-600 text-xs">
                        Protected Area. Authorized Personnel Only.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;