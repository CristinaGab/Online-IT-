import { Course } from './types';

export const COURSES: Course[] = [
  {
    id: 'ai-gen',
    title: 'Generative AI Engineering',
    category: 'AI & Data',
    description: 'Master the art of LLMs, diffusion models, and building AI-powered applications with Python and LangChain.',
    duration: '12 Weeks',
    level: 'Advanced',
    image: 'https://picsum.photos/800/600?random=1',
    technologies: ['Python', 'TensorFlow', 'OpenAI API', 'Gemini API']
  },
  {
    id: 'full-stack',
    title: 'Full Stack Quantum Web',
    category: 'Development',
    description: 'Build scalable web applications prepared for the next generation of internet protocols using React and Node.js.',
    duration: '24 Weeks',
    level: 'Beginner',
    image: 'https://picsum.photos/800/600?random=2',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL']
  },
  {
    id: 'data-sci',
    title: 'Predictive Data Science',
    category: 'AI & Data',
    description: 'Learn to extract insights from massive datasets and predict future trends using machine learning algorithms.',
    duration: '16 Weeks',
    level: 'Intermediate',
    image: 'https://picsum.photos/800/600?random=3',
    technologies: ['Pandas', 'Scikit-Learn', 'SQL', 'Tableau']
  },
  {
    id: 'cyber-ops',
    title: 'Ethical Hacking & SecOps',
    category: 'Cybersecurity',
    description: 'Defend networks against modern threats. Learn penetration testing and automated security protocols.',
    duration: '14 Weeks',
    level: 'Intermediate',
    image: 'https://picsum.photos/800/600?random=4',
    technologies: ['Linux', 'Python', 'Wireshark', 'Metasploit']
  },
  {
    id: 'spatial-ux',
    title: 'Spatial Computing UX/UI',
    category: 'Design',
    description: 'Design immersive interfaces for AR/VR environments. The future of interaction beyond screens.',
    duration: '10 Weeks',
    level: 'Beginner',
    image: 'https://picsum.photos/800/600?random=5',
    technologies: ['Figma', 'Unity', 'Blender', 'WebXR']
  },
  {
    id: 'blockchain-dev',
    title: 'Decentralized App Development',
    category: 'Development',
    description: 'Architect smart contracts and decentralized applications on Ethereum and Solana.',
    duration: '12 Weeks',
    level: 'Advanced',
    image: 'https://picsum.photos/800/600?random=6',
    technologies: ['Solidity', 'Rust', 'Web3.js', 'Hardhat']
  }
];

export const TESTIMONIALS = [
  {
    name: "Sarah Jenko",
    role: "AI Engineer at DeepMind",
    text: "NeoLearn didn't just teach me to code; it taught me to think in algorithms. The Generative AI track is world-class.",
    image: "https://picsum.photos/100/100?random=10"
  },
  {
    name: "Marcus Chen",
    role: "Frontend Lead at Spotify",
    text: "The immersive project-based learning environment is exactly what I needed to switch careers from marketing to tech.",
    image: "https://picsum.photos/100/100?random=11"
  },
  {
    name: "Elena Rodriguez",
    role: "Security Analyst",
    text: "Intense, futuristic, and deeply practical. The cybersecurity labs were indistinguishable from real-world scenarios.",
    image: "https://picsum.photos/100/100?random=12"
  }
];