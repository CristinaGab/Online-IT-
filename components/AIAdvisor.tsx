import React, { useState } from 'react';
import { getCareerPathAdvice } from '../services/geminiService';
import { PathfinderResponse } from '../types';
import { COURSES } from '../constants';

const AIAdvisor: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PathfinderResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResult(null);
    
    try {
      const response = await getCareerPathAdvice(input);
      setResult(response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        @keyframes fillBar {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg to-indigo-950/20"></div>
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="bg-dark-surface border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Decorative Blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column: Form */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-green"></span>
                </span>
                <span className="text-neon-green text-sm font-bold tracking-widest uppercase">AI Career Pathfinder</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                Not sure where to start? <br/>
                <span className="text-gray-400">Let Gemini AI build your roadmap.</span>
              </h2>
              
              <p className="text-gray-300 mb-8 leading-relaxed">
                Describe your interests, hobbies, or the kind of problems you want to solve. Our AI analyzes thousands of industry data points to recommend your perfect tech stack.
              </p>

              <form onSubmit={handleSubmit} className="relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g. I love digital art but I also enjoy logic puzzles and math..."
                  className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/50 transition-all h-32 resize-none"
                />
                <button 
                  type="submit" 
                  disabled={loading}
                  className="absolute bottom-4 right-4 bg-white text-dark-bg px-4 py-2 rounded-lg text-sm font-bold hover:bg-neon-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Generate Path
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Column: Result Display */}
            <div className="relative min-h-[300px] flex items-center justify-center">
              {!result && !loading && (
                <div className="text-center opacity-30">
                  <div className="text-6xl mb-4 grayscale">🔮</div>
                  <p className="text-sm font-display uppercase tracking-widest">Awaiting Input Data</p>
                </div>
              )}

              {loading && (
                 <div className="text-center">
                   <div className="relative w-16 h-16 mx-auto mb-4">
                     <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
                     <div className="absolute inset-0 border-4 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
                   </div>
                   <p className="text-neon-blue animate-pulse font-mono text-sm">Accessing Neural Lattice...</p>
                 </div>
              )}

              {result && (
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-full animate-fadeInUp shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                   <div className="mb-4">
                     <span className="text-xs text-gray-400 uppercase tracking-wide flex items-center gap-2">
                       <span className="w-2 h-2 bg-neon-purple rounded-full animate-pulse"></span>
                       Predicted Career Path
                     </span>
                     <h3 className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-emerald-400 mt-1">{result.careerPath}</h3>
                   </div>
                   
                   <div className="mb-6 relative">
                     <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-purple to-transparent opacity-50"></div>
                     <p className="text-gray-300 text-sm leading-relaxed pl-2 italic">
                       "{result.reasoning}"
                     </p>
                   </div>

                   <div>
                     <span className="text-xs text-gray-400 uppercase tracking-wide block mb-3 flex items-center gap-2">
                        Recommended Modules
                        <span className="block h-px flex-1 bg-white/10"></span>
                     </span>
                     <div className="space-y-3">
                       {result.recommendedCourseIds.map((id, idx) => {
                         const course = COURSES.find(c => c.id === id);
                         const displayTitle = course ? course.title : id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                         const displayDesc = course ? course.description : "Advanced module tailored to your generated career path.";
                         
                         return (
                           <div 
                              key={id} 
                              className="group relative flex items-center justify-between bg-black/40 p-3 rounded-lg border border-white/5 hover:border-neon-blue/40 hover:bg-white/5 hover:shadow-[0_0_15px_rgba(0,243,255,0.1)] transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fadeInUp opacity-0"
                              style={{ animationDelay: `${idx * 150 + 200}ms`, animationFillMode: 'forwards' }}
                            >
                              {/* Tooltip */}
                              <div className="absolute bottom-full left-0 mb-3 w-72 bg-[#0f111a] border border-white/20 rounded-xl p-4 shadow-[0_0_30px_rgba(0,0,0,0.8)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none transform translate-y-2 group-hover:translate-y-0 backdrop-blur-xl">
                                   <div className="absolute -bottom-2 left-8 w-4 h-4 bg-[#0f111a] border-r border-b border-white/20 transform rotate-45"></div>
                                   <div className="flex items-center gap-2 mb-2">
                                      <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse shrink-0"></span>
                                      <h4 className="text-white font-bold text-sm font-display leading-tight">{displayTitle}</h4>
                                   </div>
                                   <p className="text-xs text-gray-400 leading-relaxed mb-3">{displayDesc}</p>
                                   {course && (
                                     <div className="flex gap-1 flex-wrap border-t border-white/10 pt-2">
                                        {course.technologies.slice(0,3).map(t => (
                                          <span key={t} className="text-[10px] px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-gray-400">{t}</span>
                                        ))}
                                     </div>
                                   )}
                              </div>

                              <div className="flex items-center gap-4">
                                {/* Enhanced Visual ID Indicator with Corner Brackets */}
                                <div className="relative w-12 h-12 shrink-0">
                                    {/* Outer Glow on Hover */}
                                    <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${idx % 2 === 0 ? 'from-neon-blue/20 to-purple-600/20' : 'from-neon-green/20 to-teal-600/20'} blur opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                                    
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center relative overflow-hidden border border-white/10 bg-black/40 group-hover:border-neon-blue/50 transition-all duration-300 group-hover:shadow-[inset_0_0_10px_rgba(0,243,255,0.1)]">
                                        {/* Background Tint */}
                                        <div className={`absolute inset-0 opacity-20 transition-opacity duration-300 bg-gradient-to-br ${idx % 2 === 0 ? 'from-neon-blue via-transparent to-transparent' : 'from-neon-green via-transparent to-transparent'}`}></div>

                                        {/* Corner Accents */}
                                        <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-white/30 group-hover:border-neon-blue transition-colors"></div>
                                        <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-white/30 group-hover:border-neon-blue transition-colors"></div>
                                        <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-white/30 group-hover:border-neon-blue transition-colors opacity-30 group-hover:opacity-100"></div>
                                        <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-white/30 group-hover:border-neon-blue transition-colors opacity-30 group-hover:opacity-100"></div>
                                        
                                        {/* ID Text */}
                                        <span className="font-display font-bold text-sm relative z-10 text-white tracking-widest group-hover:scale-110 transition-transform duration-300 group-hover:text-neon-blue">
                                          {id.slice(0,2).toUpperCase()}
                                        </span>
                                        
                                        {/* Scan line */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-y-full group-hover:animate-[scan_1.5s_ease-in-out_infinite]"></div>
                                    </div>
                                </div>

                                <div>
                                  <div className="text-sm font-medium text-white group-hover:text-neon-blue transition-colors flex items-center gap-2">
                                    {id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                  </div>
                                  <div className="text-[10px] text-gray-500 flex items-center gap-1 mt-1 group-hover:text-gray-300 transition-colors">
                                    <span className={`w-1.5 h-1.5 rounded-full ${idx % 2 === 0 ? 'bg-neon-blue' : 'bg-neon-green'} animate-pulse`}></span> 
                                    High Relevance
                                  </div>
                                </div>
                              </div>
                              
                              {/* Match Score & Visuals */}
                              <div className="flex flex-col items-end gap-1">
                                  <div className="text-[10px] text-neon-green font-mono font-bold tracking-wider opacity-90">
                                    {96 + idx}% MATCH
                                  </div>
                                  <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                                      <div 
                                        className={`h-full ${idx % 2 === 0 ? 'bg-neon-blue' : 'bg-neon-green'}`} 
                                        style={{ width: `${96 + idx}%`, transform: 'translateX(-100%)', animation: 'fillBar 1s ease-out forwards 0.5s' }}
                                      ></div>
                                  </div>
                              </div>
                           </div>
                         );
                       })}
                     </div>
                   </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAdvisor;