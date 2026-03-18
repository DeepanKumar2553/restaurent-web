import { useState, useEffect } from 'react';
import { Search, Loader2, Calendar, Clock, Users, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../config';

interface Reservation {
    _id: string;
    name: string;
    email: string;
    phone: string;
    date: string;
    timeSlot: string;
    guests: number;
    tableId: number;
    status: string;
}

const ReservationManager = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const token = localStorage.getItem('adminToken');

            const response = await fetch(`${API_BASE_URL}/reservations`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Failed to fetch reservations');

            const data = await response.json();
            setReservations(data);
        } catch (error) {
            console.error(error);
            toast.error('Could not load reservations');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_BASE_URL}/reservations/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) throw new Error('Failed to update status');

            toast.success(`Reservation marked as ${newStatus}`);

            setReservations(prev =>
                prev.map(res => res._id === id ? { ...res, status: newStatus } : res)
            );
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const filteredReservations = reservations.filter(res => {
        const matchesSearch = res.name.toLowerCase().includes(searchTerm.toLowerCase()) || res.phone.includes(searchTerm);
        const matchesStatus = filterStatus === 'All' || res.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    if (loading) return <div className="h-96 flex items-center justify-center text-slate-500"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Reservations</h1>
                    <p className="text-slate-400 text-sm">Manage bookings and table statuses.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="bg-slate-900 border border-slate-800 text-white rounded-xl py-2 px-4 focus:outline-none focus:border-[#f75d00]"
                    >
                        <option value="All">All Statuses</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>

                    <div className="relative group">
                        <Search className="absolute left-3 top-2.5 text-slate-500 group-focus-within:text-[#f75d00]" size={18} />
                        <input
                            type="text"
                            placeholder="Search name or phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-slate-900 border border-slate-800 text-white rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-[#f75d00] w-64"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-400">
                        <thead className="bg-slate-950 text-slate-500 font-mono uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">Guest Details</th>
                                <th className="px-6 py-4">Date & Time</th>
                                <th className="px-6 py-4">Table Info</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {filteredReservations.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">No reservations found.</td>
                                </tr>
                            ) : (
                                filteredReservations.map((res) => (
                                    <tr key={res._id} className="hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-white text-base">{res.name}</div>
                                            <div className="text-xs">{res.email}</div>
                                            <div className="text-xs">{res.phone}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-white font-medium mb-1">
                                                <Calendar size={14} className="text-[#f75d00]" /> {res.date}
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <Clock size={14} /> {res.timeSlot}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-white font-bold mb-1">
                                                Table #{res.tableId}
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <Users size={14} /> {res.guests} Guests
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${res.status === 'Confirmed' ? 'bg-blue-500/20 text-blue-500' :
                                                res.status === 'Completed' ? 'bg-green-500/20 text-green-500' :
                                                    res.status === 'Cancelled' ? 'bg-red-500/20 text-red-500' :
                                                        'bg-slate-700 text-slate-300'
                                                }`}>
                                                {res.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {res.status === 'Confirmed' && (
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleUpdateStatus(res._id, 'Completed')}
                                                        className="p-2 bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white rounded-lg transition-colors"
                                                        title="Mark as Completed"
                                                    >
                                                        <CheckCircle size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleUpdateStatus(res._id, 'Cancelled')}
                                                        className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                                                        title="Cancel Reservation"
                                                    >
                                                        <XCircle size={18} />
                                                    </button>
                                                </div>
                                            )}
                                            {res.status !== 'Confirmed' && (
                                                <span className="text-xs text-slate-600 uppercase font-mono tracking-widest">Locked</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default ReservationManager;