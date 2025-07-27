// This file contains all the core types used throughout the language learning application.

// ====================================================================================
// GENERAL & UI TYPES
// ====================================================================================

/** Defines the possible views/pages in the application. */
export type View = 'dashboard' | 'lesson' | 'games' | 'grammar' | 'account' | 'explore' | 'placement_test' | 'chat' | 'admin';


/** Defines the IDs for the main tabs in a lesson. */
export type TabId = 'words' | 'reading' | 'writing' | 'listening' | 'speaking' | 'quiz' | 'chat';

/** Defines the unique identifiers for each learning category. */
export type CategoryId = 
    'alphabet' | 'basics' | 'greetings' | 'food' | 'family' | 'home' | 'work' | 
    'travel' | 'numbers' | 'colors' | 'time' | 'weather' | 'shopping' | 
    'body' | 'clothing' | 'verbs' | 'adjectives' | 'places' | 'nature' | 'hobbies' | 'emotions' |
    'animals' | 'transportation' | 'education' | 'health' | 'technology' | 'restaurant' |
    'daily_routines' | 'countries' | 'sports' | 'music_arts';


/** Represents a language available in the app. */
export type Language = {
    code: string; // BCP 47 language code, e.g., "en-US"
    name: string;
};

/** Represents a single vocabulary word with its details. */
export type Word = {
    word: string;
    translation: string;
    pronunciation: string;
    emoji: string;
};

/** Represents a learning category with its display properties. */
export type Category = {
    id: CategoryId;
    name: string;
    icon: string;
};

/** Represents a single tab in the lesson UI. */
export type Tab = {
    id: TabId;
    label: string;
    icon: string;
    isNew?: boolean;
};

// ====================================================================================
// USER & AUTHENTICATION
// ====================================================================================

/** Represents a logged-in user. */
export type User = {
    id: string;
    email: string;
    name: string;
    avatar: string;
    subscription_ends_at?: string;
    is_subscribed?: boolean;
    subscription_tier?: 'bronze' | 'silver' | 'gold';
};

/** Represents a full subscription record from the database, for admin use. */
export type Subscription = {
  id: number;
  user_id: string;
  email: string;
  tier: 'bronze' | 'silver' | 'gold';
  status: 'active' | 'canceled' | 'expired' | null;
  ends_at: string | null;
  created_at: string;
};

/** Represents a user's learning progress for a specific language. */
export type UserProgress = {
    completed_lessons: CategoryId[];
    total_score: number;
    total_questions_answered: number;
};

/** Represents a single entry on the weekly leaderboard. */
export type LeaderboardEntry = {
    language_code: string;
    user_name: string;
    user_avatar: string;
    total_score: number;
};


// ====================================================================================
// LESSON & CONTENT STRUCTURE
// ====================================================================================

/** An exercise for practicing reading comprehension. */
export type ReadingExercise = {
    sentence: string;
    hint: string;
    correctAnswer: string;
    options: string[];
};

/** An exercise for practicing listening skills. */
export type ListeningExercise = {
    audioWord: string;
    hint: string;
    correctAnswer: string;
    options: string[];
};

/** A single question within a quiz. */
export type QuizQuestion = {
    questionText: string;
    options: string[];
    correctAnswer: string;
};

/** A collection of quiz questions. */
export type Quiz = {
    title: string;
    questions: QuizQuestion[];
};

/** The complete set of learning materials for a single category. */
export type CategoryContent = {
    words: Word[];
    readingExercises: ReadingExercise[];
    listeningExercises: ListeningExercise[];
};

/** The dynamically generated content for a lesson, including exercises and a quiz. */
export type GeneratedContent = {
    words: Word[];
    readingExercise: ReadingExercise;
    listeningExercise: ListeningExercise;
    quiz: Quiz;
};

/** A single question for the placement test. */
export type PlacementTestQuestion = {
  questionText: string;
  options: string[];
  correctAnswer: string;
  level: 'easy' | 'medium' | 'hard';
};

/** Represents a YouTube video for shadowing practice. */
export type YouTubeVideo = {
    videoId: string;
    title: string;
};

// ====================================================================================
// GAME TYPES
// ====================================================================================

/** A game where the user matches words to their translations. */
export type MatchGame = {
    type: 'match';
    title: string;
    description: string;
    items: { id: string; word: string; translation: string; }[];
};

/** A game where the user fills in a blank in a sentence. */
export type MissingWordGame = {
    type: 'missing_word';
    title: string;
    description: string;
    sentence: string;
    correctWord: string;
    options: string[];
};

/** A game where the user unscrambles words to form a correct sentence. */
export type SentenceScrambleGame = {
    type: 'sentence_scramble';
    title: string;
    description: string;
    words: string[];
    correctSentence: string;
};

/** A game where the user answers a multiple-choice question. */
export type QuizGame = {
    type: 'quiz';
    title: string;
    description: string;
    question: string;
    options: string[];
    correctAnswer: string;
};

/** A collection of different mini-games. */
export type GamesCollection = {
    games: (MatchGame | MissingWordGame | SentenceScrambleGame | QuizGame)[];
};

// ====================================================================================
// PAYMENT TYPES
// ====================================================================================

/** Represents an invoice from the payment gateway. */
export type Invoice = {
    id: string;
    status: string;
    payment_url: string;
    amount: number;
};

// ====================================================================================
// CHAT
// ====================================================================================

/** A single message in a chat session. */
export type ChatMessage = {
    role: 'user' | 'model';
    text: string;
};


// ====================================================================================
// BROWSER API & EXTERNAL SERVICE TYPES
// ====================================================================================

/** Interface for the Web Speech API's SpeechRecognition object. */
export interface SpeechRecognition {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onstart: () => void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    onend: () => void;
    start: () => void;
    stop: () => void;
    abort: () => void;
}

/** The event fired by the SpeechRecognition API when speech is recognized. */
export interface SpeechRecognitionEvent extends Event {
    resultIndex: number;
    results: SpeechRecognitionResultList;
}

/** A list of recognition results. */
export interface SpeechRecognitionResultList {
    [index: number]: SpeechRecognitionResult;
    length: number;
}

/** A single recognition result, which may contain multiple alternatives. */
export interface SpeechRecognitionResult extends Array<{ transcript: string }> {
    isFinal: boolean;
}

/** The event fired when a speech recognition error occurs. */
export interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message: string;
}

/** This declaration is necessary to inform TypeScript about the vendor-prefixed SpeechRecognition API. */
declare global {
  interface Window {
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

/** Represents a single voice available for speech synthesis. */
export interface SpeechSynthesisVoice {
    default: boolean;
    lang: string;
    localService: boolean;
    name: string;
    voiceURI: string;
}

// ====================================================================================
// DATABASE TYPES (SUPABASE)
// ====================================================================================

/** A generic type for JSON data stored in the database. */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

/** The schema definition for the Supabase database. */
export interface Database {
  public: {
    Tables: {
      chat_history: {
        Row: {
          created_at: string
          id: number
          language_code: string
          messages: Json
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          language_code: string
          messages: Json
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          language_code?: string
          messages?: Json
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      referral_usage: {
        Row: {
          id: number
          created_at: string
          referrer_user_id: string
          referred_user_id: string
          referred_user_name: string | null
          referred_user_email: string | null
        }
        Insert: {
          id?: number
          created_at?: string
          referrer_user_id: string
          referred_user_id: string
          referred_user_name?: string | null
          referred_user_email?: string | null
        }
        Update: {
          id?: number
          created_at?: string
          referrer_user_id?: string
          referred_user_id?: string
          referred_user_name?: string | null
          referred_user_email?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          id: number
          created_at: string
          user_id: string
          email: string | null
          tier: string
          status: string | null
          ends_at: string | null
        }
        Insert: {
          id?: number
          created_at?: string
          user_id: string
          email?: string | null
          tier: string
          status?: string | null
          ends_at?: string | null
        }
        Update: {
          id?: number
          created_at?: string
          user_id?: string
          email?: string | null
          tier?: string
          status?: string | null
          ends_at?: string | null
        }
        Relationships: []
      }
      user_favorite_words: {
        Row: {
          created_at: string
          id: number
          language_code: string
          user_id: string
          word: Json
        }
        Insert: {
          created_at?: string
          id?: number
          language_code: string
          user_id: string
          word: Json
        }
        Update: {
          created_at?: string
          id?: number
          language_code?: string
          user_id?: string
          word?: Json
        }
        Relationships: []
      }
      user_progress: {
        Row: {
            id: number
            user_id: string
            language_code: string
            completed_lessons: Json | null
            total_score: number
            total_questions_answered: number
            created_at: string
            updated_at: string | null
        }
        Insert: {
            id?: number
            user_id: string
            language_code: string
            completed_lessons?: Json | null
            total_score?: number
            total_questions_answered?: number
            created_at?: string
            updated_at?: string | null
        }
        Update: {
            id?: number
            user_id?: string
            language_code?: string
            completed_lessons?: Json | null
            total_score?: number
            total_questions_answered?: number
            created_at?: string
            updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      backfill_subscription_emails: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      get_all_subscriptions_with_details: {
        Args: Record<PropertyKey, never>
        Returns: {
            id: number
            user_id: string
            email: string
            tier: string
            status: string | null
            ends_at: string | null
            created_at: string
        }[]
      }
      get_leaderboard: {
        Args: Record<PropertyKey, never>
        Returns: {
            language_code: string
            user_name: string
            user_avatar: string
            total_score: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}