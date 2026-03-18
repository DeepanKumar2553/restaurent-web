import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

const HeroSketch = () => {
    return (
        <section className="relative bg-white min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-orange-50/50 rounded-full blur-3xl -z-10"></div>
            <div className="max-w-[1400px] mx-auto px-6 w-full py-12 md:py-0">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    <div className="md:col-span-5 flex flex-col gap-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 w-fit">
                            <span className="w-2 h-2 rounded-full bg-[#f75d00] animate-pulse"></span>
                            <span className="text-xs font-mono uppercase tracking-wider text-[#f75d00]">Now Serving / Season 4</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                            Taste the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f75d00] to-orange-600">
                                Future.
                            </span>
                        </h1>
                        <p className="text-lg text-gray-500 font-mono max-w-md leading-relaxed">
                            Experience fine dining reimagined. Precision ingredients, technical mastery, and unforgettable flavors served in a modern setting.
                        </p>
                        <div className="flex items-center gap-4 mt-4">
                            <Link to="/reservation" className="px-8 py-4 bg-[#f75d00] text-white rounded hover:bg-[#c64a00] transition-colors font-mono uppercase text-sm tracking-wider font-bold flex items-center gap-2">
                                Book A Table <ArrowRight size={16} />
                            </Link>
                            <Link to="/menu" className="px-8 py-4 border border-gray-300 text-black rounded hover:border-black transition-colors font-mono uppercase text-sm tracking-wider font-bold">
                                View Menu
                            </Link>
                        </div>

                    </div>
                    <div className="md:col-span-7 relative">
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-orange-200/50 bg-gray-100 aspect-[4/3] transform hover:scale-[1.01] transition-transform duration-500">
                            <img
                                src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=1600&auto=format&fit=crop"
                                alt="Fine Dining Dish"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur p-3 rounded-2xl shadow-lg flex items-center gap-3">
                                <div className="bg-orange-100 p-2 rounded-xl text-[#f75d00]">
                                    <Star size={20} fill="currentColor" />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900">4.9 Rating</div>
                                    <div className="text-xs text-gray-500 font-mono uppercase">Based on 1.2k reviews</div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-orange-500/10 rounded-full -z-10 blur-xl"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSketch;