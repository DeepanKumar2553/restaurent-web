import { ArrowRight, ChefHat, Cpu, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const Story = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-white animate-in fade-in duration-700">
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
                        alt="Futuristic Kitchen"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/0 to-slate-950" />
                </div>

                <div className="relative z-10 text-center max-w-4xl px-6 space-y-6">
                    <span className="text-[#f75d00] font-mono uppercase tracking-[0.2em] text-sm font-bold">The Origin</span>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                        Dining, <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Re-Engineered.</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        We didn't just want to build a restaurant. We wanted to debug the culinary experience.
                    </p>
                </div>
            </section>
            <section className="max-w-7xl mx-auto px-6 py-24 space-y-32">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
                    <div className="flex-1 space-y-6">
                        <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-[#f75d00] mb-4">
                            <Cpu size={24} />
                        </div>
                        <h2 className="text-3xl font-bold">2023: The Codebase</h2>
                        <p className="text-slate-400 leading-relaxed">
                            It started in a small test kitchen in Silicon Valley. Our founder, Chef Alexander Neo, realized that traditional dining was stuck in the past. Inconsistent quality, food waste, and archaic reservation systems were bugs in the system.
                        </p>
                        <p className="text-slate-400 leading-relaxed">
                            He combined his background in Software Engineering with his Michelin-star training to create <strong>NeoDine</strong>: a restaurant run on a proprietary OS that optimizes flavor profiles and service efficiency.
                        </p>
                    </div>
                    <div className="flex-1 relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#f75d00] to-purple-600 rounded-2xl opacity-20 group-hover:opacity-40 blur-xl transition-opacity duration-500" />
                        <img
                            src="https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?q=80&w=1000&auto=format&fit=crop"
                            alt="Chef Working"
                            className="relative rounded-2xl shadow-2xl border border-white/10"
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24">
                    <div className="flex-1 space-y-6">
                        <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-green-500 mb-4">
                            <Leaf size={24} />
                        </div>
                        <h2 className="text-3xl font-bold">Zero-Waste Algorithm</h2>
                        <p className="text-slate-400 leading-relaxed">
                            Efficiency isn't just about speed; it's about respect for the planet. NeoDine uses a predictive AI model to order ingredients with 99.8% accuracy, virtually eliminating food waste.
                        </p>
                        <p className="text-slate-400 leading-relaxed">
                            Every steak, every scallop, and every leaf of garnish is tracked from farm to fork, ensuring ethical sourcing and absolute freshness.
                        </p>
                    </div>
                    <div className="flex-1 relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl opacity-20 group-hover:opacity-40 blur-xl transition-opacity duration-500" />
                        <img
                            src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=1000&auto=format&fit=crop"
                            alt="Fresh Ingredients"
                            className="relative rounded-2xl shadow-2xl border border-white/10"
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
                    <div className="flex-1 space-y-6">
                        <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-purple-500 mb-4">
                            <ChefHat size={24} />
                        </div>
                        <h2 className="text-3xl font-bold">The Human Touch</h2>
                        <p className="text-slate-400 leading-relaxed">
                            Despite our love for technology, we know that hospitality is human. Technology handles the logistics so our staff can focus on <strong>you</strong>.
                        </p>
                        <p className="text-slate-400 leading-relaxed">
                            No waving for a waiter. No waiting for the bill. It's seamless, silent, and magical.
                        </p>
                        <div className="pt-4">
                            <Link to="/reservation" className="inline-flex items-center gap-2 text-[#f75d00] font-bold hover:text-white transition-colors">
                                Experience it yourself <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-20 group-hover:opacity-40 blur-xl transition-opacity duration-500" />
                        <img
                            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop"
                            alt="Restaurant Ambience"
                            className="relative rounded-2xl shadow-2xl border border-white/10"
                        />
                    </div>
                </div>

            </section>
            <Footer />
        </div>
    );
};

export default Story;