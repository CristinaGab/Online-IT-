import React, { useState, useEffect } from 'react';
import { COURSES } from '../constants';
import { Course } from '../types';

interface CourseCatalogProps {
  onOpenApply: (courseTitle?: string) => void;
}

const CourseCatalog: React.FC<CourseCatalogProps> = ({ onOpenApply }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeLevel, setActiveLevel] = useState<string>('All');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  
  // Progress State with Persistence
  const [progressMap, setProgressMap] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('neo_course_progress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const updateProgress = (courseId: string, value: number) => {
    const updated = { ...progressMap, [courseId]: value };
    setProgressMap(updated);
    localStorage.setItem('neo_course_progress', JSON.stringify(updated));
  };

  const categories = ['All', ...Array.from(new Set(COURSES.map(c => c.category)))];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = COURSES.filter(c => {
    const categoryMatch = activeCategory === 'All' || c.category === activeCategory;
    const levelMatch = activeLevel === 'All' || c.level === activeLevel;
    return categoryMatch && levelMatch;
  });

  return (
    <section id="courses" className="py-24 bg-dark-bg relative">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-12 gap-8">
          <div className="max-w-md">
            <h2 className="text-4xl font-display font-bold text-white mb-4">Our Curriculum</h2>
            <p className="text-gray-400">Designed by industry leaders from Google, Meta, and OpenAI to make you job-ready in weeks.</p>
          </div>
          
          {/* Unified Filter Toolbar */}
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm w-full xl:w-auto shadow-lg">
             <div className="flex flex-col md:flex-row gap-6">
                {/* Category Filter */}
                <div className="flex-1">
                   <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                     <svg className="w-4 h-4 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
                     Focus Area
                   </div>
                   <div className="flex gap-2 flex-wrap">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap border ${
                          activeCategory === cat 
                            ? 'bg-white text-dark-bg border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                            : 'bg-black/20 text-gray-400 border-transparent hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px bg-white/10 my-1"></div>

                {/* Level Filter */}
                <div className="flex-1">
                   <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                     <svg className="w-4 h-4 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                     Difficulty
                   </div>
                   <div className="flex gap-2 flex-wrap">
                    {levels.map(lvl => (
                      <button
                        key={lvl}
                        onClick={() => setActiveLevel(lvl)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap border ${
                          activeLevel === lvl
                            ? 'bg-neon-blue/20 text-neon-blue border-neon-blue/50 shadow-[0_0_15px_rgba(0,243,255,0.2)]'
                            : 'bg-black/20 text-gray-400 border-transparent hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
             </div>
          </div>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {filteredCourses.map((course) => (
              <CourseCard 
                key={course.id} 
                course={course} 
                progress={progressMap[course.id] || 0}
                onClick={() => setSelectedCourse(course)}
              />
            ))}
          </div>
        ) : (
           <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl bg-white/5 flex flex-col items-center justify-center animate-fadeIn">
             <div className="text-4xl mb-4 grayscale opacity-50">🔭</div>
             <h3 className="text-xl font-display font-bold text-white mb-2">No Courses Found</h3>
             <p className="text-gray-400 max-w-sm mx-auto">It looks like we don't have a course that matches both filters yet.</p>
             <button 
                onClick={() => {setActiveCategory('All'); setActiveLevel('All');}}
                className="mt-6 px-6 py-2 bg-white text-dark-bg rounded-full text-sm font-bold hover:bg-gray-200 transition-colors shadow-lg hover:shadow-white/20"
             >
               Reset All Filters
             </button>
           </div>
        )}
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <CourseModal 
          course={selectedCourse} 
          progress={progressMap[selectedCourse.id] || 0}
          onUpdateProgress={(val) => updateProgress(selectedCourse.id, val)}
          onClose={() => setSelectedCourse(null)}
          onApply={() => {
            onOpenApply(selectedCourse.title);
            setSelectedCourse(null);
          }}
        />
      )}
    </section>
  );
};

const CourseCard: React.FC<{ course: Course; progress: number; onClick: () => void }> = ({ course, progress, onClick }) => {
  const isCompleted = progress === 100;
  
  return (
    <div 
      onClick={onClick}
      className="group relative bg-dark-card border border-white/5 rounded-2xl overflow-hidden hover:border-neon-purple/50 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(188,19,254,0.3)] flex flex-col h-full cursor-pointer"
    >
      {/* Image Overlay */}
      <div className="h-48 overflow-hidden relative shrink-0">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent"></div>
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10 z-20">
          {course.duration}
        </div>
        
        {/* Completed Overlay Badge */}
        {isCompleted && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm z-10 animate-fadeIn">
            <div className="bg-neon-green/20 border border-neon-green/50 text-neon-green px-4 py-2 rounded-full font-bold uppercase tracking-widest text-sm flex items-center gap-2 transform -rotate-6 shadow-[0_0_20px_rgba(10,255,104,0.4)]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              Completed
            </div>
          </div>
        )}
      </div>

      <div className="p-6 relative flex flex-col flex-grow">
        <div className="text-neon-blue text-xs font-bold uppercase tracking-wider mb-2">{course.category}</div>
        <h3 className="text-xl font-display font-bold text-white mb-3 leading-tight">{course.title}</h3>
        <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">{course.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {course.technologies.slice(0, 3).map(tech => (
            <span key={tech} className="text-xs text-gray-300 bg-white/5 px-2 py-1 rounded border border-white/5">
              {tech}
            </span>
          ))}
        </div>

        {/* Progress Bar (if started but not completed) */}
        {progress > 0 && !isCompleted && (
          <div className="mb-4 animate-fadeIn">
             <div className="flex justify-between text-[10px] text-gray-400 uppercase font-bold mb-1">
               <span>In Progress</span>
               <span className="text-neon-purple">{progress}%</span>
             </div>
             <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
               <div className="h-full bg-gradient-to-r from-neon-blue to-neon-purple shadow-[0_0_10px_rgba(188,19,254,0.5)]" style={{ width: `${progress}%` }}></div>
             </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
          <span className={`text-xs font-bold px-2 py-1 rounded border ${
            course.level === 'Beginner' ? 'text-green-400 border-green-400/20 bg-green-400/10' :
            course.level === 'Intermediate' ? 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10' :
            'text-red-400 border-red-400/20 bg-red-400/10'
          }`}>
            {course.level}
          </span>
          <button className="text-white text-sm font-bold group-hover:text-neon-purple transition-colors flex items-center gap-1">
            Details
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const CourseModal: React.FC<{ 
  course: Course; 
  progress: number;
  onUpdateProgress: (val: number) => void;
  onClose: () => void;
  onApply: () => void;
}> = ({ course, progress, onUpdateProgress, onClose, onApply }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden'; 
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-3xl bg-dark-surface border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-modalIn">
         <style>{`
          @keyframes modalIn {
            from { opacity: 0; transform: scale(0.95) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          .animate-modalIn {
            animation: modalIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}</style>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="relative h-64 shrink-0">
          <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <span className="inline-block px-3 py-1 mb-3 rounded-full bg-neon-blue/20 text-neon-blue border border-neon-blue/30 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              {course.category}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white shadow-black drop-shadow-lg">{course.title}</h2>
          </div>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
          <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-300">
             <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
               <svg className="w-4 h-4 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               {course.duration}
             </div>
             <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
               <svg className="w-4 h-4 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
               {course.level}
             </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
               <div>
                 <h3 className="text-xl font-bold text-white mb-3">About the Course</h3>
                 <p className="text-gray-400 leading-relaxed">{course.description}</p>
                 <p className="text-gray-400 leading-relaxed mt-4">
                   This comprehensive curriculum is designed to take you from {course.level.toLowerCase()} concepts to advanced implementation. 
                   You will work on real-world projects, collaborate with peers, and receive mentorship from industry experts.
                 </p>
               </div>
               
               <div>
                 <h3 className="text-lg font-bold text-white mb-3">What You'll Learn</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                   {['Advanced Algorithms', 'System Architecture', 'Production Deployment', 'Security Best Practices'].map((item, i) => (
                     <div key={i} className="flex items-center gap-2 text-gray-400">
                       <svg className="w-4 h-4 text-neon-blue shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                       {item}
                     </div>
                   ))}
                 </div>
               </div>
            </div>

            <div className="md:col-span-1 space-y-6">
               <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                 <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Tech Stack</h4>
                 <div className="flex flex-wrap gap-2">
                   {course.technologies.map(tech => (
                     <span key={tech} className="text-xs text-gray-300 bg-black/40 px-3 py-1.5 rounded border border-white/10">
                       {tech}
                     </span>
                   ))}
                 </div>
               </div>
               
               {/* Actions: Progress or Apply */}
               <div className="bg-white/5 rounded-xl p-5 border border-white/10 relative overflow-hidden">
                 
                 {progress === 0 ? (
                    <div className="space-y-3">
                       <button 
                         onClick={onApply}
                         className="w-full py-3 bg-neon-blue text-dark-bg font-bold rounded-xl hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(0,243,255,0.5)] transform hover:-translate-y-1 relative z-10"
                       >
                          Apply for Cohort
                       </button>
                       <button 
                         onClick={() => onUpdateProgress(10)}
                         className="w-full py-2 bg-white/5 text-gray-300 font-bold text-sm rounded-xl hover:bg-white/10 hover:text-white transition-colors border border-white/10"
                       >
                          Preview Curriculum
                       </button>
                       <p className="text-center text-xs text-gray-500 pt-2">
                        Next cohort starts Oct 15th
                      </p>
                    </div>
                 ) : (
                    <div className="space-y-4 relative z-10">
                       <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></span>
                          Your Progress
                       </h4>
                       <div className="flex justify-between items-end">
                          <span className={`text-3xl font-display font-bold ${progress === 100 ? 'text-neon-green' : 'text-white'}`}>
                            {progress}<span className="text-sm text-gray-400 font-sans font-normal ml-1">%</span>
                          </span>
                          {progress === 100 && (
                            <span className="text-neon-green text-[10px] font-bold uppercase border border-neon-green/30 px-2 py-0.5 rounded-full bg-neon-green/10 mb-2">
                              Done
                            </span>
                          )}
                       </div>
                       
                       <div className="relative pt-1">
                         <input 
                           type="range" 
                           min="0" 
                           max="100" 
                           step="5"
                           value={progress}
                           onChange={(e) => onUpdateProgress(parseInt(e.target.value))}
                           className="w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer accent-neon-blue hover:accent-neon-purple transition-all"
                           style={{ accentColor: '#00f3ff' }}
                         />
                       </div>
                       
                       <div className="flex gap-2 pt-2">
                          <button 
                            onClick={() => onUpdateProgress(0)}
                            className="flex-1 py-2 text-xs font-bold bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-400 border border-white/5 hover:border-red-500/30 rounded-lg transition-all"
                          >
                            Reset
                          </button>
                          {progress < 100 && (
                              <button 
                              onClick={() => onUpdateProgress(100)}
                              className="flex-1 py-2 text-xs font-bold bg-neon-green/10 hover:bg-neon-green/20 text-neon-green border border-neon-green/20 hover:border-neon-green/40 rounded-lg transition-all"
                            >
                              Complete
                            </button>
                          )}
                       </div>
                    </div>
                 )}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCatalog;