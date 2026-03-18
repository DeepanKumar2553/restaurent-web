import { Plus, ArrowRight } from 'lucide-react';

const SignatureDishes = () => {
    const dishes = [
        {
            id: 1,
            name: "Wagyu Ribeye",
            desc: "A5 Japanese Wagyu, charcoal grilled, served with garlic chips and truffle salt.",
            price: "$120",
            tag: "Signature",
            image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 2,
            name: "Seared Scallops",
            desc: "Hokkaido scallops, butternut squash purée, and crispy pancetta.",
            price: "$45",
            tag: "Seafood",
            image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 3,
            name: "Golden Citrus Tart",
            desc: "Yuzu curd, Italian meringue, and edible gold leaf.",
            price: "$24",
            tag: "Dessert",
            image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 4,
            name: "Herb-Crusted Lamb",
            desc: "Tender chops marinated in rosemary and garlic, served with a mint reduction.",
            price: "$65",
            tag: "Main",
            image: "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 5,
            name: "Miso Black Cod",
            desc: "Sustainably sourced cod marinated in sweet miso for 48 hours.",
            price: "$52",
            tag: "Seafood",
            image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 6,
            name: "Truffle Risotto",
            desc: "Acquerello rice, wild mushrooms, and 24-month aged Parmesan.",
            price: "$38",
            tag: "Vegetarian",
            image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=800&auto=format&fit=crop"
        }
    ];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <span className="text-[#f75d00] font-mono uppercase tracking-widest text-xs font-bold">
                            Curated Menu
                        </span>
                        <h2 className="mt-4 text-4xl font-bold text-slate-900 tracking-tight">
                            Chef's Highlights
                        </h2>
                    </div>
                    <button className="group flex items-center gap-2 text-sm font-mono uppercase font-bold text-slate-900 border-b border-gray-200 pb-1 hover:border-black transition-colors">
                        View Full Menu
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {dishes.map((dish) => (
                        <div key={dish.id} className="group relative bg-gray-50 rounded-[2rem] overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-100">
                            <div className="aspect-[4/3] overflow-hidden">
                                <img
                                    src={dish.image}
                                    alt={dish.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold text-slate-900 shadow-sm">
                                    {dish.tag}
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#f75d00] transition-colors">
                                        {dish.name}
                                    </h3>
                                    <span className="text-xl font-bold text-slate-900">
                                        {dish.price}
                                    </span>
                                </div>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6 min-h-[40px]">
                                    {dish.desc}
                                </p>
                                <button className="w-full py-3 rounded-xl border border-gray-200 text-sm font-mono uppercase font-bold text-slate-600 flex items-center justify-center gap-2 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all">
                                    <Plus size={16} /> Add to Order
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SignatureDishes;