export interface Course {
  id: string;
  title: string;
  category: 'AI & Data' | 'Development' | 'Cybersecurity' | 'Design';
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;
  technologies: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export interface PathfinderResponse {
  recommendedCourseIds: string[];
  reasoning: string;
  careerPath: string;
}