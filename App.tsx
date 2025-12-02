import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CourseCatalog from './components/CourseCatalog';
import AIAdvisor from './components/AIAdvisor';
import CommunitySection from './components/CommunitySection';
import ContactSection from './components/ContactSection';
import ApplyModal from './components/ApplyModal';
import Footer from './components/Footer';

function App() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyCourseInterest, setApplyCourseInterest] = useState<string | undefined>(undefined);

  const handleOpenApply = (courseTitle?: string) => {
    setApplyCourseInterest(courseTitle);
    setIsApplyModalOpen(true);
  };

  return (
    <div className="bg-dark-bg min-h-screen text-gray-200 selection:bg-neon-purple selection:text-white">
      <Navbar onOpenApply={() => handleOpenApply()} />
      <main>
        <Hero onOpenApply={() => handleOpenApply()} />
        <AIAdvisor />
        <CourseCatalog onOpenApply={handleOpenApply} />
        {/* Testimonial Section Inline for Simplicity */}
        <section className="py-24 bg-dark-bg border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-center text-white mb-16">
              Voices of the <span className="text-neon-purple">Alumni</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "I never thought I could switch from marketing to AI Engineering in 6 months. NeoLearn made it possible.",
                  author: "Sarah J.",
                  role: "AI Engineer @ DeepMind"
                },
                {
                  quote: "The curriculum is constantly updated. We were learning tools that were released just weeks prior.",
                  author: "David K.",
                  role: "Full Stack Dev @ Shopify"
                },
                {
                  quote: "The career support is unmatched. The AI Pathfinder actually predicted my current role perfectly.",
                  author: "Elena R.",
                  role: "Cyber Analyst @ CrowdStrike"
                }
              ].map((t, i) => (
                <div key={i} className="bg-dark-card p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-colors">
                  <div className="mb-6 text-neon-blue">
                    <svg className="w-8 h-8 opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.896 14.325 16.053 14.941 15.471C15.557 14.89 16.502 14.599 17.776 14.599C18.339 14.599 18.913 14.654 19.498 14.764L20.534 9.381C19.782 9.216 19.123 9.216 18.557 9.216C16.941 9.216 15.589 9.771 14.5 10.881C13.411 11.991 12.866 13.566 12.866 15.606L12.866 21L14.017 21ZM5.23 21L5.23 18C5.23 16.896 5.538 16.053 6.154 15.471C6.77 14.89 7.715 14.599 8.989 14.599C9.552 14.599 10.126 14.654 10.711 14.764L11.747 9.381C10.995 9.271 10.336 9.216 9.77 9.216C8.154 9.216 6.802 9.771 5.713 10.881C4.624 11.991 4.079 13.566 4.079 15.606L4.079 21L5.23 21Z"/></svg>
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{t.quote}"</p>
                  <div>
                    <div className="text-white font-bold">{t.author}</div>
                    <div className="text-xs text-gray-500 uppercase">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <CommunitySection />
        <ContactSection />
      </main>
      <Footer />
      <ApplyModal 
        isOpen={isApplyModalOpen} 
        onClose={() => setIsApplyModalOpen(false)} 
        defaultCourseInterest={applyCourseInterest}
      />
    </div>
  );
}

export default App;