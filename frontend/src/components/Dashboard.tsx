import { Users, DollarSign, CalendarCheck, TrendingUp, Clock } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StatCard = ({ title, value, sub, icon: Icon, trend }: any) => (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-colors">
        <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-[#f75d00] group-hover:bg-[#f75d00]/10 transition-colors">
                <Icon size={20} />
            </div>
            {trend && (
                <span className="text-xs font-mono text-green-500 flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded">
                    <TrendingUp size={12} /> {trend}
                </span>
            )}
        </div>
        <div className="relative z-10">
            <h3 className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-1">{title}</h3>
            <div className="text-2xl font-bold text-white mb-1">{value}</div>
            <p className="text-slate-500 text-xs">{sub}</p>
        </div>
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#f75d00]/5 rounded-full blur-xl group-hover:bg-[#f75d00]/10 transition-colors"></div>
    </div>
);

const Dashboard = () => {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Revenue"
                    value="$12,450"
                    sub="Today's Earnings"
                    icon={DollarSign}
                    trend="+12%"
                />
                <StatCard
                    title="Active Tables"
                    value="8 / 24"
                    sub="Currently Seated"
                    icon={Users}
                />
                <StatCard
                    title="Pending Bookings"
                    value="12"
                    sub="Needs Approval"
                    icon={CalendarCheck}
                    trend="+4"
                />
                <StatCard
                    title="Avg. Dining Time"
                    value="1h 45m"
                    sub="Per Table"
                    icon={Clock}
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-white font-bold mb-6">Live Activity Feed</h3>
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex gap-4 items-start border-b border-slate-800 pb-4 last:border-0 last:pb-0">
                                <div className="w-2 h-2 mt-2 rounded-full bg-[#f75d00]"></div>
                                <div>
                                    <p className="text-sm text-slate-300">
                                        <span className="font-bold text-white">Table 5</span> requested the bill.
                                    </p>
                                    <p className="text-xs text-slate-500 font-mono mt-1">2 mins ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-white font-bold mb-6">Quick Actions</h3>
                    <div className="space-y-3">
                        <button className="w-full py-3 bg-[#f75d00] hover:bg-orange-600 text-white rounded-xl text-sm font-bold transition-colors">
                            + Create Walk-in
                        </button>
                        <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-medium transition-colors">
                            Close Kitchen
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;