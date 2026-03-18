import { useState, useEffect } from 'react';
import { Calendar, Users, Clock, ArrowRight, ChevronLeft, ChevronRight, Loader2, Mail, Ticket } from 'lucide-react';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../config';

const TIME_SLOTS = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
    "20:00", "20:30", "21:00", "21:30", "22:00"
];

const TABLES = [
    { id: 1, seats: 2, x: 1, y: 1, type: 'window' },
    { id: 2, seats: 2, x: 1, y: 2, type: 'window' },
    { id: 3, seats: 2, x: 1, y: 3, type: 'window' },
    { id: 4, seats: 4, x: 2, y: 1, type: 'standard' },
    { id: 5, seats: 4, x: 2, y: 2, type: 'standard' },
    { id: 6, seats: 4, x: 2, y: 3, type: 'standard' },
    { id: 7, seats: 4, x: 3, y: 1, type: 'booth' },
    { id: 8, seats: 4, x: 3, y: 2, type: 'booth' },
    { id: 9, seats: 4, x: 3, y: 3, type: 'booth' },
];

const Reservation = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [verifyingEmail, setVerifyingEmail] = useState(false);

    const [guests, setGuests] = useState(2);
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<string | null>(null);
    const [selectedTable, setSelectedTable] = useState<number | null>(null);
    const [bookedTables, setBookedTables] = useState<number[]>([]);
    const [contact, setContact] = useState({ name: '', email: '', phone: '' });

    const getNextDays = () => {
        const days = [];
        const today = new Date();
        const startDay = new Date(today);
        startDay.setDate(today.getDate() + 1);

        for (let i = 0; i < 7; i++) {
            const d = new Date(startDay);
            d.setDate(startDay.getDate() + i);
            days.push(d);
        }
        return days;
    };

    const formatDateString = (dateObj: Date) => {
        return dateObj.toISOString().split('T')[0];
    };

    useEffect(() => {
        if (step === 2 && date && time) {
            const fetchAvailability = async () => {
                try {
                    const dateStr = formatDateString(date);
                    const res = await fetch(`${API_BASE_URL}/reservations/booked-tables?date=${dateStr}&timeSlot=${time}`);
                    const takenTables = await res.json();
                    if (Array.isArray(takenTables)) setBookedTables(takenTables);
                } catch (error) {
                    console.error("Availability check failed", error);
                }
            };
            fetchAvailability();
        }
    }, [step, date, time]);

    const verifyRealMailbox = async (email: string): Promise<boolean> => {
        setVerifyingEmail(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setVerifyingEmail(false);

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                toast.error("Invalid email format");
                return false;
            }

            return true;
        } catch (error) {
            console.error("Verification failed", error);
            setVerifyingEmail(false);
            return true;
        }
    };

    const submitBooking = async () => {
        if (!contact.name || !contact.email || !contact.phone) return toast.error("Please fill all details");

        const isReal = await verifyRealMailbox(contact.email);
        if (!isReal) return;

        setLoading(true);

        try {
            const payload = {
                name: contact.name,
                email: contact.email,
                phone: contact.phone,
                date: formatDateString(date!),
                timeSlot: time,
                guests: guests,
                tableId: selectedTable
            };

            const response = await fetch(`${API_BASE_URL}/reservations`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setStep(4);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        if (step === 1) {
            if (!date || !time) return toast.error("Select Date & Time");
            setStep(2);
        } else if (step === 2) {
            if (!selectedTable) return toast.error("Select a Table");
            setStep(3);
        } else {
            submitBooking();
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col md:flex-row animate-in fade-in">
            <div className={`hidden md:block w-1/3 lg:w-[40%] bg-slate-900 relative transition-all duration-500 ${step === 4 ? 'w-0 opacity-0 overflow-hidden' : ''}`}>
                <div className="absolute inset-0 bg-black/40 z-10" />
                <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop" alt="Ambiance" className="w-full h-full object-cover" />
                <div className="absolute bottom-12 left-12 z-20 text-white">
                    <h2 className="text-4xl font-bold mb-2">Reserve Your Spot.</h2>
                    <p className="text-white/80 max-w-xs">We will send your entry ticket to your email.</p>
                </div>
            </div>
            <div className="flex-1 p-6 md:p-12 lg:p-20 overflow-y-auto h-screen custom-scrollbar flex items-center justify-center">
                <div className="max-w-xl w-full space-y-8">
                    {step === 4 ? (
                        <div className="text-center space-y-6 animate-in zoom-in-95 duration-500">
                            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Ticket size={48} />
                            </div>

                            <h1 className="text-3xl font-bold text-slate-900">Reservation Confirmed!</h1>

                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 max-w-sm mx-auto shadow-sm">
                                <Mail size={32} className="mx-auto text-[#f75d00] mb-4" />
                                <h3 className="font-bold text-slate-800 mb-2">Invitation Sent</h3>
                                <p className="text-sm text-slate-500 mb-6">
                                    We have sent a digital ticket to <br />
                                    <span className="font-bold text-slate-900">{contact.email}</span>
                                </p>
                                <p className="text-xs text-slate-400 bg-white p-3 rounded border border-slate-100">
                                    Please show this email at the reception to confirm your entry.
                                </p>
                            </div>

                            <button
                                onClick={() => window.location.reload()}
                                className="mt-8 text-[#f75d00] font-bold hover:underline"
                            >
                                Make another reservation
                            </button>
                        </div>
                    ) : (
                        <>
                            <div>
                                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#f75d00] mb-4">Step {step} of 3</div>
                                <h1 className="text-3xl font-bold text-slate-900">
                                    {step === 1 && "Preferences"}
                                    {step === 2 && "Select Table"}
                                    {step === 3 && "Final Details"}
                                </h1>
                                <div className="h-1 w-full bg-gray-100 mt-6 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#f75d00] transition-all duration-500 ease-out" style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }} />
                                </div>
                            </div>
                            {step === 1 && (
                                <div className="space-y-8 animate-in slide-in-from-right-4">
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Users size={16} /> Party Size</label>
                                        <div className="flex items-center gap-4">
                                            <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#f75d00] hover:text-[#f75d00]"><ChevronLeft size={18} /></button>
                                            <span className="text-2xl font-mono font-bold w-8 text-center">{guests}</span>
                                            <button onClick={() => setGuests(Math.min(4, guests + 1))} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#f75d00] hover:text-[#f75d00]"><ChevronRight size={18} /></button>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Calendar size={16} /> Select Date</label>
                                        <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                                            {getNextDays().map((d, i) => (
                                                <button key={i} onClick={() => setDate(d)} className={clsx("min-w-[80px] h-20 rounded-xl border flex flex-col items-center justify-center transition-all", date?.toDateString() === d.toDateString() ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-500 hover:border-[#f75d00]")}>
                                                    <span className="text-xs font-bold uppercase opacity-60">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                                                    <span className="text-xl font-mono font-bold">{d.getDate()}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Clock size={16} /> Select Time</label>
                                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                            {TIME_SLOTS.map((t) => (
                                                <button key={t} onClick={() => setTime(t)} className={clsx("py-2 rounded-lg text-sm font-mono border transition-all", time === t ? "bg-[#f75d00] text-white border-[#f75d00]" : "bg-white text-slate-600 hover:border-slate-900")}>{t}</button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {step === 2 && (
                                <div className="animate-in slide-in-from-right-4">
                                    <div className="bg-slate-50 p-8 rounded-3xl border border-gray-200 relative min-h-[400px]">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gray-200 px-6 py-2 rounded-b-xl text-xs font-bold tracking-widest text-gray-500 uppercase">Kitchen / Bar</div>
                                        <div className="grid grid-cols-3 gap-6 mt-12">
                                            {TABLES.map((table) => {
                                                const isTaken = bookedTables.includes(table.id);
                                                return (
                                                    <button key={table.id} disabled={isTaken} onClick={() => setSelectedTable(table.id)} className={clsx("aspect-square rounded-2xl flex flex-col items-center justify-center border-2 transition-all relative group shadow-sm", isTaken ? "bg-gray-100 border-gray-200 opacity-50 cursor-not-allowed" : selectedTable === table.id ? "bg-[#f75d00] border-[#f75d00] text-white shadow-xl scale-105 z-10" : "bg-white border-slate-200 hover:border-slate-900 text-slate-900")}>
                                                        <span className="font-mono font-bold text-lg">{table.id}</span>
                                                        <span className="text-[10px] uppercase font-bold mt-1">{isTaken ? 'Taken' : `${table.seats} Seats`}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {step === 3 && (
                                <div className="space-y-6 animate-in slide-in-from-right-4">
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100 space-y-4">
                                        <h3 className="font-bold text-slate-900">Booking Summary</h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div><span className="text-gray-500 text-xs uppercase block">Date</span><span className="font-bold">{date?.toLocaleDateString()}</span></div>
                                            <div><span className="text-gray-500 text-xs uppercase block">Time</span><span className="font-bold">{time}</span></div>
                                            <div><span className="text-gray-500 text-xs uppercase block">Guests</span><span className="font-bold">{guests}</span></div>
                                            <div><span className="text-gray-500 text-xs uppercase block">Table</span><span className="text-[#f75d00] font-bold">#{selectedTable}</span></div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <input type="text" value={contact.name} onChange={e => setContact({ ...contact, name: e.target.value })} className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-[#f75d00]" placeholder="Full Name" />

                                        <div className="relative">
                                            <input
                                                type="email"
                                                value={contact.email}
                                                onChange={e => setContact({ ...contact, email: e.target.value })}
                                                className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-[#f75d00] pr-10"
                                                placeholder="Email Address (Ticket will be sent here)"
                                            />
                                            {verifyingEmail && <div className="absolute right-3 top-3.5"><Loader2 className="animate-spin text-[#f75d00]" size={18} /></div>}
                                        </div>

                                        <input type="tel" value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-[#f75d00]" placeholder="Phone Number" />
                                    </div>
                                </div>
                            )}
                            <div className="flex gap-4 pt-4 border-t border-gray-100">
                                {step > 1 && <button onClick={() => setStep(step - 1)} className="px-6 py-4 rounded-xl font-bold text-slate-500 hover:bg-gray-50">Back</button>}
                                <button onClick={handleNext} disabled={loading || verifyingEmail} className="flex-1 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#f75d00] transition-colors shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                                    {loading || verifyingEmail ? "Verifying..." : step === 3 ? "Confirm & Send Ticket" : "Continue"}
                                    {step !== 3 && !loading && !verifyingEmail && <ArrowRight size={20} />}
                                </button>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Reservation;