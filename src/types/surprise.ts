export interface StoryScene {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  dialogue?: string;
  speaker?: 'Nayan' | 'Mili' | 'Both';
  actionMood: 'tired' | 'approach' | 'cheer' | 'caring' | 'moon-peace' | 'warm-hug';
  backgroundNote: string;
}

export interface CareItem {
  id: string;
  question: string;
  shortLabel: string;
  icon: 'food' | 'break' | 'rest' | 'water' | 'peace';
  responseTitle: string;
  comfortMessage: string;
  actionTip: string;
  completed?: boolean;
}

export interface FlirtMessage {
  id: string;
  text: string;
  reaction: string;
}

export interface JokeItem {
  id: string;
  punchline: string;
  reaction: string;
}

export interface MissMoment {
  id: string;
  text: string;
  starColor?: string;
}

export interface BookPage {
  pageNumber: number;
  header: string;
  text: string;
  footerSign?: string;
}

export interface SurpriseState {
  hasHugged: boolean;
  hasKissed: boolean;
  hasExploredWorld: boolean;
  activeStoryScene: number;
  activeBookPage: number;
  completedCareIds: string[];
}
