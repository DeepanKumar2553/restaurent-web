import { useState } from 'react';
import { Mail, MapPin, Phone, Send, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import Footer from './Footer';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            toast.success("Message received! We'll get back to you shortly.");
            setFormData({ name: '', email: '', message: '' });
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 animate-in fade-in duration-500">
            <div className="bg-slate-900 text-white py-20 px-6 text-center">
                <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
                <p className="text-slate-400 max-w-xl mx-auto">
                    Questions about allergies? Private events? Or just want to say hi? We'd love to hear from you.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

                    <div className="space-y-12">

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-700 shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900">Visit Us</h3>
                                    <p className="text-slate-500 mt-1">123 Culinary Avenue, <br />Tech District, San Francisco, CA 94103</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-700 shrink-0">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900">Email Us</h3>
                                    <p className="text-slate-500 mt-1">concierge@neodine.com</p>
                                    <p className="text-slate-500">events@neodine.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-700 shrink-0">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900">Call Us</h3>
                                    <p className="text-slate-500 mt-1">+1 (555) 123-4567</p>
                                    <p className="text-xs text-slate-400 mt-1">Mon-Sun from 10am to 10pm</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <Clock className="text-[#f75d00]" size={24} />
                                <h3 className="font-bold text-xl text-slate-900">Opening Hours</h3>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Monday - Thursday</span>
                                    <span className="font-mono font-bold text-slate-900">17:00 - 22:00</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Friday - Saturday</span>
                                    <span className="font-mono font-bold text-slate-900">17:00 - 23:00</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Sunday</span>
                                    <span className="font-mono font-bold text-slate-900">16:00 - 21:00</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-xl">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Send a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Your Name</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 outline-none focus:border-[#f75d00] focus:ring-2 focus:ring-[#f75d00]/20 transition-all"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 outline-none focus:border-[#f75d00] focus:ring-2 focus:ring-[#f75d00]/20 transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Message</label>
                                <textarea
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 outline-none focus:border-[#f75d00] focus:ring-2 focus:ring-[#f75d00]/20 transition-all resize-none"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#f75d00] hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
                            >
                                {loading ? "Sending..." : <>Send Message <Send size={18} /></>}
                            </button>

                        </form>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;