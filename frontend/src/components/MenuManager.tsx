import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Loader2, AlertCircle, X, Save, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../config';

const CATEGORIES = ["Starters", "Mains", "Desserts", "Drinks", "Seafood"];

interface MenuItem {
    _id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    description: string;
    isAvailable: boolean;
}

const MenuManager = () => {
    const [items, setItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: CATEGORIES[0],
        image: '',
        description: '',
        isAvailable: true
    });

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/menu`);
            if (!response.ok) throw new Error('Failed to fetch menu');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error(error);
            toast.error('Could not load menu items');
        } finally {
            setLoading(false);
        }
    };

    const openAddModal = () => {
        setIsEditing(false);
        setEditId(null);
        setFormData({ name: '', price: '', category: CATEGORIES[0], image: '', description: '', isAvailable: true });
        setIsModalOpen(true);
    };

    const openEditModal = (item: MenuItem) => {
        setIsEditing(true);
        setEditId(item._id);

        setFormData({
            name: item.name,
            price: item.price.toString(),
            category: item.category,
            image: item.image,
            description: item.description,
            isAvailable: item.isAvailable
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.description || !formData.image) {
            toast.error("Please fill in all fields");
            return;
        }
        setIsSubmitting(true);

        try {
            const token = localStorage.getItem('adminToken');
            const url = isEditing ? `${API_BASE_URL}/menu/${editId}` : `${API_BASE_URL}/menu`;
            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    price: Number(formData.price)
                })
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Operation failed');

            if (isEditing) {
                setItems(prev => prev.map(item => item._id === editId ? data : item));
                toast.success('Dish updated successfully');
            } else {
                setItems(prev => [...prev, data]);
                toast.success('Dish added successfully');
            }

            setIsModalOpen(false);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this dish?')) return;
        setItems(prev => prev.filter(item => item._id !== id));

        try {
            const token = localStorage.getItem('adminToken');
            await fetch(`${API_BASE_URL}/menu/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            toast.success('Dish removed');
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete');
            fetchMenuItems();
        }
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="h-96 flex items-center justify-center text-slate-500"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-8 relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Menu Manager</h1>
                    <p className="text-slate-400 text-sm">Manage your dishes, prices, and availability.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-2.5 text-slate-500 group-focus-within:text-[#f75d00]" size={18} />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-slate-900 border border-slate-800 text-white rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-[#f75d00] w-64"
                        />
                    </div>
                    <button
                        onClick={openAddModal}
                        className="bg-[#f75d00] hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-orange-900/20 active:scale-95 transition-all"
                    >
                        <Plus size={18} /> Add Dish
                    </button>
                </div>
            </div>

            {filteredItems.length === 0 ? (
                <div className="py-20 text-center text-slate-500 border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center gap-4">
                    <AlertCircle size={48} className="opacity-50" />
                    <p>No dishes found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredItems.map((item) => (
                        <div key={item._id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group hover:border-slate-700 transition-colors relative">
                            <div className="aspect-[4/3] relative overflow-hidden bg-slate-800">
                                {item.image ? (
                                    <img src={item.image} alt={item.name} className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${!item.isAvailable && 'grayscale opacity-50'}`} />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-600"><ImageIcon size={32} /></div>
                                )}
                                <div className={`absolute top-3 right-3 px-2 py-1 rounded text-[10px] font-mono uppercase font-bold ${item.isAvailable ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                                    {item.isAvailable ? 'In Stock' : 'Sold Out'}
                                </div>
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-[2px]">
                                    <button
                                        onClick={() => openEditModal(item)}
                                        className="p-3 bg-white text-black rounded-xl hover:scale-110 transition-transform"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(item._id)} className="p-3 bg-red-500 text-white rounded-xl hover:scale-110 transition-transform"><Trash2 size={18} /></button>
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-white truncate pr-2">{item.name}</h3>
                                    <span className="font-mono text-[#f75d00]">${item.price}</span>
                                </div>
                                <div className="text-slate-500 text-xs line-clamp-2 mb-3 h-8">{item.description}</div>
                                <div className="inline-block px-2 py-1 rounded bg-slate-800 text-slate-400 text-xs font-medium">{item.category}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/50 shrink-0">
                            <h2 className="text-lg font-bold text-white">
                                {isEditing ? 'Edit Dish' : 'Add New Dish'}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-slate-800 rounded-lg"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">

                            <div className="space-y-1.5">
                                <label className="text-xs font-mono uppercase text-slate-500">Dish Name</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-[#f75d00] outline-none transition-colors"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono uppercase text-slate-500">Price ($)</label>
                                    <input
                                        required
                                        type="number"
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-[#f75d00] outline-none transition-colors"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono uppercase text-slate-500">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-[#f75d00] outline-none transition-colors cursor-pointer"
                                    >
                                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-mono uppercase text-slate-500">Image URL</label>
                                <input
                                    required
                                    type="url"
                                    value={formData.image}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-[#f75d00] outline-none transition-colors text-sm"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-mono uppercase text-slate-500">Description</label>
                                <textarea
                                    required
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-[#f75d00] outline-none h-20 resize-none transition-colors text-sm"
                                />
                            </div>

                            <div className="flex items-center justify-between bg-slate-950 border border-slate-800 p-3 rounded-xl">
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-white">isAvailable</span>
                                    <span className="text-[10px] text-slate-500 uppercase font-mono">
                                        {formData.isAvailable ? "In Stock" : "Sold Out"}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, isAvailable: !formData.isAvailable })}
                                    className={`w-11 h-6 rounded-full transition-colors duration-200 flex items-center px-0.5 ${formData.isAvailable ? 'bg-green-500' : 'bg-slate-700'}`}
                                >
                                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${formData.isAvailable ? 'translate-x-5' : 'translate-x-0'}`} />
                                </button>
                            </div>

                            <div className="h-2"></div>

                        </form>

                        <div className="p-4 border-t border-slate-800 bg-slate-950/50 shrink-0">
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="w-full bg-[#f75d00] hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" /> : <><Save size={18} /> {isEditing ? 'Update Dish' : 'Save Dish'}</>}
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuManager;