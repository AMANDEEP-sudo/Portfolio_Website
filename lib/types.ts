export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  features: string[];
  github: string;
  demo: string;
}

export interface Skill {
  name: string;
  category: 'languages' | 'web' | 'tools' | 'concepts';
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Achievement {
  icon: React.ElementType;
  title: string;
  description: string;
  issuer: string;
  color: string;
}

export interface Education {
  level: string;
  school: string;
  duration: string;
  cgpa: string;
  icon: React.ElementType;
  color: string;
}

export interface ContactInfo {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
}

export interface SocialLink {
  icon: React.ElementType;
  label: string;
  href: string;
}
