import React, { useState, useEffect } from 'react';
import { COURSES } from '../constants';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourseInterest?: string;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ isOpen, onClose, defaultCourseInterest }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    course: defaultCourseInterest || '',
    linkedin: '',
    background: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (defaultCourseInterest) {
      setFormData(prev => ({ ...prev, course: defaultCourseInterest }));
    }
  }, [defaultCourseInterest]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-2xl bg-dark-surface border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-modalIn">
         <style>{`
          @keyframes modalIn {
            from { opacity: 0; transform: scale(0.95) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          .animate-modalIn {
            animation: modalIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}</style>

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar">
          {!isSuccess ? (
            <>
              <div className="mb-8 text-center">
                <div className="inline-block px-3 py-1 mb-4 rounded-full bg-neon-blue/10 border border-neon-blue/30 text-neon-blue text-xs font-bold uppercase tracking-wider">
                  Applications Open for Oct 2025
                </div>
                <h2 className="text-3xl font-display font-bold text-white mb-2">Apply to NeoLearn</h2>
                <p className="text-gray-400 text-sm">Join the next generation of tech leaders. Limited spots available.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">First Name</label>
                    <input 
                      required
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                      placeholder="Jane"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Last Name</label>
                    <input 
                      required
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                    <input 
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
                    <input 
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Interested Course</label>
                  <select 
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all appearance-none"
                  >
                    <option value="" disabled>Select a program...</option>
                    {COURSES.map(course => (
                      <option key={course.id} value={course.title} className="bg-dark-surface">
                        {course.title} ({course.level})
                      </option>
                    ))}
                    <option value="Undecided" className="bg-dark-surface">I'm not sure yet</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">LinkedIn / Portfolio URL (Optional)</label>
                  <input 
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-neon-blue to-blue-600 text-white font-bold rounded-lg hover:shadow-[0_0_30px_rgba(0,243,255,0.4)] transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                     {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          Processing Application...
                        </>
                      ) : (
                        <>
                          Submit Application
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                        </>
                      )}
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-4">
                    By clicking submit, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12 animate-fadeIn">
              <div className="w-24 h-24 bg-neon-green/10 rounded-full flex items-center justify-center mb-8 border border-neon-green/20 shadow-[0_0_30px_rgba(10,255,104,0.2)]">
                <svg className="w-12 h-12 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 className="text-3xl font-display font-bold text-white mb-4">Application Received</h3>
              <p className="text-gray-400 max-w-sm mb-8">
                Thank you, {formData.firstName}. Our admissions team will review your profile and contact you within 48 hours to schedule an interview.
              </p>
              <button 
                onClick={onClose}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors border border-white/10"
              >
                Return to Campus
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;