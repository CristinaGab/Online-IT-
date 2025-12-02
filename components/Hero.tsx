import React from 'react';

interface HeroProps {
  onOpenApply: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenApply }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-shift {
          background: linear-gradient(-45deg, #05050a, #1a0b2e, #0a1f30, #05050a);
          background-size: 400% 400%;
          animation: gradient-shift 15s ease infinite;
        }
        .animate-gradient-text {
            background-size: 200% auto;
            animation: gradient-x 4s linear infinite;
        }
      `}</style>

      {/* Dynamic Background */}
      <div className="absolute inset-0 animate-gradient-shift z-0">
        {/* Animated Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-neon-purple/20 rounded-full blur-[120px] animate-pulse-slow mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-neon-blue/20 rounded-full blur-[120px] animate-pulse-slow mix-blend-screen" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[30%] left-[40%] w-[400px] h-[400px] bg-neon-blue/10 rounded-full blur-[100px] animate-[float_8s_ease-in-out_infinite] mix-blend-screen"></div>
        
        {/* Noise Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-block mb-4 px-3 py-1 rounded-full border border-neon-green/30 bg-neon-green/10 text-neon-green text-xs font-semibold tracking-wide uppercase animate-fadeIn backdrop-blur-sm">
          New Cohorts Starting October 2025
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-6 leading-tight drop-shadow-2xl">
          UPGRADE YOUR <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-white to-neon-purple animate-gradient-text">REALITY</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          Master the code of tomorrow. Join the world's most advanced technology institute specializing in AI, Blockchain, and Spatial Computing.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#courses"
            className="px-8 py-4 bg-neon-blue text-dark-bg font-bold rounded-lg hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:shadow-[0_0_30px_rgba(0,243,255,0.6)] w-full sm:w-auto transform hover:-translate-y-1 block text-center"
          >
            Explore Courses
          </a>
          <button 
            onClick={onOpenApply}
            className="px-8 py-4 bg-white/5 border border-white/20 text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300 w-full sm:w-auto backdrop-blur-md hover:border-white/40 transform hover:-translate-y-1"
          >
            Apply Now
          </button>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-10 backdrop-blur-sm bg-black/10 rounded-2xl p-6">
          {[
            { label: 'Graduates', value: '12k+' },
            { label: 'Hiring Partners', value: '500+' },
            { label: 'Avg Sal. Increase', value: '65%' },
            { label: 'Global Campuses', value: '14' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center group cursor-default">
              <div className="text-2xl md:text-3xl font-display font-bold text-white mb-1 group-hover:text-neon-blue transition-colors duration-300">{stat.value}</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest group-hover:text-gray-300 transition-colors duration-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;