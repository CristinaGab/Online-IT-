import React, { useState } from 'react';

const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="relative py-24 bg-dark-bg overflow-hidden border-t border-white/5">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-20 left-20 w-[300px] h-[300px] bg-neon-blue/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neon-blue text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse"></span>
              Transmission
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
              Initiate <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Connection</span>
            </h2>
            
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Have questions about the curriculum, enterprise partnerships, or just want to discuss the singularity? Our neural network is listening.
            </p>

            <div className="space-y-6">
              {[
                { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", text: "admissions@neolearn.io", label: "Email Frequency" },
                { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z", text: "Neo-Tokyo District 9, Node 42", label: "Physical Uplink" },
                { icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9", text: "global.neolearn.io", label: "Global Network" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-neon-blue/10 group-hover:border-neon-blue/30 transition-all">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-neon-blue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path></svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">{item.label}</div>
                    <div className="text-white font-medium">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 rounded-3xl blur-xl transform rotate-3"></div>
             <div className="bg-dark-surface border border-white/10 rounded-3xl p-8 relative shadow-2xl backdrop-blur-sm">
                
                {isSuccess ? (
                  <div className="h-[460px] flex flex-col items-center justify-center text-center animate-fadeIn">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Transmission Received</h3>
                    <p className="text-gray-400">Our agents will contact you within 24 cycles.</p>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="mt-8 text-neon-blue hover:text-white font-bold text-sm transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-bold text-gray-400 uppercase tracking-wider">Identity</label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          required
                          value={formState.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-bold text-gray-400 uppercase tracking-wider">Contact Node</label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          required
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-xs font-bold text-gray-400 uppercase tracking-wider">Subject Protocol</label>
                      <select 
                        id="subject" 
                        name="subject" 
                        value={formState.subject}
                        onChange={handleChange}
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all appearance-none"
                      >
                        <option value="" disabled selected>Select a topic...</option>
                        <option value="admissions" className="bg-dark-surface">Course Admissions</option>
                        <option value="enterprise" className="bg-dark-surface">Enterprise Partnership</option>
                        <option value="support" className="bg-dark-surface">Technical Support</option>
                        <option value="other" className="bg-dark-surface">Other Inquiry</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-xs font-bold text-gray-400 uppercase tracking-wider">Data Packet</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        required
                        rows={4}
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="Your message here..."
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all resize-none"
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-4 bg-white text-dark-bg font-bold rounded-lg hover:bg-neon-blue hover:text-white transition-all duration-300 shadow-lg hover:shadow-neon-blue/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          Encrypting & Sending...
                        </>
                      ) : (
                        <>
                          Transmit Data
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </>
                      )}
                    </button>
                  </form>
                )}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;