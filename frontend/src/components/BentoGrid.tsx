import { CalendarCheck, ChefHat, Leaf, Star } from 'lucide-react';
import clsx from 'clsx';

const BentoGrid = () => {
    const cardBaseStyle = "relative overflow-hidden rounded-[2rem] p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group";

    return (
        <section className="py-24 bg-white/50 backdrop-blur-sm relative z-10">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="mb-16 text-center max-w-2xl mx-auto">
                    <span className="text-[#f75d00] font-mono uppercase tracking-widest text-x font-bold">
                        Why Choose NeoDine?
                    </span>
                    <h2 className="mt-4 text-4xl font-bold text-slate-900 tracking-tight">
                        More than just dinner. <br />
                        It's an <span className="text-[#f75d00]">Experience.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:min-h-[600px]">
                    <div className={clsx(cardBaseStyle, "md:col-span-2 md:row-span-1 bg-white border border-gray-100")}>
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                        </div>
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-[#f75d00] mb-6 group-hover:scale-110 transition-transform">
                                    <CalendarCheck size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900">Cinema-Style Booking</h3>
                                <p className="text-gray-500 mt-3 max-w-md leading-relaxed">
                                    Forget vague requests. View our live floor plan, see which tables are open, and pick the exact spot for your perfect evening.
                                </p>
                            </div>
                            <div className="absolute right-0 bottom-0 w-48 h-48 bg-gradient-to-tl from-orange-100/90 to-transparent rounded-tl-full -z-10 opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
                        </div>
                    </div>
                    <div className={clsx(cardBaseStyle, "md:col-span-1 md:row-span-2 bg-slate-900 text-white")}>
                        <img
                            src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=800&auto=format&fit=crop"
                            alt="Chef plating food"
                            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>

                        <div className="relative z-10 h-full flex flex-col justify-end p-2">
                            <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500">
                                <ChefHat size={24} className="text-white" />
                            </div>
                            <h3 className="text-3xl font-bold">Culinary Art</h3>
                            <p className="text-gray-300 mt-3 leading-relaxed">
                                Led by Executive Chef Marco Pierre, our kitchen transforms ingredients into unforgettable visual and tasteful experiences.
                            </p>
                        </div>
                    </div>
                    <div className={clsx(cardBaseStyle, "md:col-span-1 md:row-span-1 bg-white border border-gray-100 flex flex-col justify-between")}>
                        <svg className="absolute top-0 right-0 text-green-50/80 w-32 h-32 -translate-y-8 translate-x-8 group-hover:rotate-45 transition-transform duration-700" fill="currentColor" viewBox="0 0 200 200">
                            <path d="M45.3,-51.8C58.6,-38.7,69.3,-22.9,71.9,-6.1C74.5,10.7,69,28.4,58.1,43.7C47.2,58.9,30.8,71.7,12.9,73.7C-5,75.7,-24.5,66.9,-40.6,53.3C-56.7,39.6,-69.5,21.2,-71.8,2C-74.2,-17.2,-66.2,-37.1,-52.1,-50.5C-38,-63.9,-19,-70.8,-0.3,-70.5C18.4,-70.1,32,-64.8,45.3,-51.8Z" transform="translate(100 100)" />
                        </svg>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-4 group-hover:scale-110 transition-transform">
                                <Leaf size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Sourced Locally</h3>
                            <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                                We partner with 35+ local farms to ensure peak freshness daily.
                            </p>
                        </div>
                    </div>
                    <div className={clsx(cardBaseStyle, "md:col-span-1 md:row-span-1 bg-[#f75d00] text-white flex flex-col justify-between")}>
                        <div className="absolute inset-0 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-500"
                            style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '15px 15px' }}>
                        </div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-180 transition-transform duration-500">
                                <Star size={24} className="text-white" fill="currentColor" />
                            </div>
                            <div className="flex items-baseline gap-2">
                                <div className="text-4xl font-bold">4.9</div>
                                <div className="text-orange-200 font-mono text-sm">/ 5.0 Rating</div>
                            </div>
                            <p className="text-orange-100 mt-3 text-sm leading-relaxed font-medium">
                                "An absolute masterpiece of modern dining." — The Food Critic, 2024
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BentoGrid;