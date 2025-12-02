import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10 text-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-gradient-to-br from-neon-blue to-neon-purple rounded-md"></div>
              <span className="text-xl font-display font-bold text-white tracking-wider">NEO<span className="text-neon-blue">LEARN</span></span>
            </div>
            <p className="text-gray-500 max-w-sm mb-6">
              The premier destination for future-focused technology education. 
              We don't just teach the future; we help you build it.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'Discord', 'GitHub'].map(social => (
                <a key={social} href="#" className="text-gray-400 hover:text-white transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 font-display">Programs</h4>
            <ul className="space-y-4 text-gray-500">
              <li className="hover:text-neon-blue cursor-pointer transition-colors">Web Development</li>
              <li className="hover:text-neon-blue cursor-pointer transition-colors">Data Science & AI</li>
              <li className="hover:text-neon-blue cursor-pointer transition-colors">Cybersecurity</li>
              <li className="hover:text-neon-blue cursor-pointer transition-colors">Corporate Training</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-display">Institute</h4>
            <ul className="space-y-4 text-gray-500">
              <li className="hover:text-neon-blue cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-neon-blue cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-neon-blue cursor-pointer transition-colors">Press</li>
              <li>
                <a href="#contact" className="hover:text-neon-blue transition-colors">Contact</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-600">
          <p>&copy; 2025 NeoLearn Institute. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;