export interface MaterialItem {
  name: string;
  estimatedPrice: string;
  source: string;
  essential: boolean;
}

export interface BlogComment {
  id: string;
  author: string;
  role: string;
  avatarBg: string;
  date: string;
  text: string;
  likes: number;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Classroom Decor' | 'Organization' | 'Nails' | 'Teacher Hacks';
  theme: string;
  gradeLevel: string;
  prepTime: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishDate: string;
  likes: number;
  coverImage: string;
  imageBg: string;
  accentColor: string;
  badgeNumber: string;
  summary: string;
  colorPalette: { name: string; hex: string }[];
  overviewHtml: string;
  materials: MaterialItem[];
  detailedSteps: {
    title: string;
    description: string;
    proTip?: string;
  }[];
  proTips: string[];
  commonPitfalls: string[];
  selImpact: string;
  comments: BlogComment[];
  saved?: boolean;
}
