import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onOpenApply: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenApply }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark-bg/80 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg transform group-hover:rotate-45 transition-transform duration-300"></div>
          <span className="text-2xl font-display font-bold text-white tracking-wider">NEO<span className="text-neon-blue">LEARN</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Courses', 'Community', 'Methodology', 'Campus', 'Enterprise'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-green transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <button 
          onClick={onOpenApply}
          className="hidden md:block px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-white text-sm font-semibold transition-all hover:shadow-[0_0_15px_rgba(0,243,255,0.3)]"
        >
          Apply Now
        </button>

        {/* Mobile Menu Icon */}
        <button className="md:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;