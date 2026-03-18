import { useState, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { API_BASE_URL } from '../config';

interface MenuItem {
    _id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    description: string;
    isAvailable: boolean;
}

const Menu = () => {
    const [items, setItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/menu`);
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error("Error loading menu:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, []);

    const categories = ["All", ...new Set(items.map(item => item.category))];

    const filteredItems = activeCategory === "All"
        ? items
        : items.filter(item => item.category === activeCategory);

    return (
        <div className="min-h-screen bg-white animate-in fade-in duration-500">
            <section className="bg-slate-900 py-20 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 z-10" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#f75d00]/20 rounded-full blur-[100px]" />

                <div className="relative z-20 max-w-2xl mx-auto space-y-4">
                    <span className="text-[#f75d00] font-mono uppercase tracking-widest text-xs font-bold">
                        Taste the Future
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        Our Menu
                    </h1>
                    <p className="text-slate-400 text-sm md:text-base">
                        A culinary journey crafted with precision, passion, and the finest ingredients.
                    </p>
                </div>
            </section>
            <section className="sticky top-16 z-30 bg-white/80 backdrop-blur border-b border-gray-100 py-4 px-6">
                <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto custom-scrollbar pb-2 md:pb-0 justify-start md:justify-center">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-mono uppercase font-bold transition-all whitespace-nowrap ${activeCategory === cat
                                ? 'bg-slate-900 text-white shadow-lg'
                                : 'bg-gray-100 text-slate-500 hover:bg-gray-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>
            <section className="max-w-7xl mx-auto px-6 py-16 min-h-[50vh]">

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-[#f75d00]" size={40} />
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="text-center py-20 text-slate-400 flex flex-col items-center gap-4">
                        <AlertCircle size={48} className="opacity-20" />
                        <p>No dishes found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                        {filteredItems.map((item) => (
                            <div key={item._id} className="group flex gap-4 md:gap-6 items-start">
                                <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${!item.isAvailable && 'grayscale opacity-60'}`}
                                    />
                                </div>

                                <div className="flex-1 space-y-2">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#f75d00] transition-colors">
                                            {item.name}
                                        </h3>
                                        <span className="text-lg font-mono font-bold text-slate-900">
                                            ${item.price}
                                        </span>
                                    </div>

                                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                                        {item.description}
                                    </p>

                                    {!item.isAvailable && (
                                        <span className="inline-block px-2 py-1 bg-red-100 text-red-600 text-[10px] font-bold uppercase rounded tracking-wide">
                                            Sold Out
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Menu;