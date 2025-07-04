

// This file contains all the core types used throughout the language learning application.

// ====================================================================================
// GENERAL & UI TYPES
// ====================================================================================

/** Defines the IDs for the main tabs in a lesson. */
export type TabId = 'words' | 'reading' | 'writing' | 'listening' | 'speaking' | 'quiz' | 'chat';

/** Defines the unique identifiers for each learning category. */
export type CategoryId = 
    'basics' | 'greetings' | 'food' | 'family' | 'home' | 'work' | 
    'travel' | 'numbers' | 'colors' | 'time' | 'weather' | 'shopping' | 
    'body' | 'clothing' | 'verbs' | 'adjectives' | 'places' | 'nature' | 'hobbies' | 'emotions';

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

/** A collection of different mini-games. */
export type GamesCollection = {
    games: (MatchGame | MissingWordGame | SentenceScrambleGame)[];
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
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    onend: () => void;
    start: () => void;
    stop: () => void;
    abort: () => void;
}

/** The event fired by the SpeechRecognition API when speech is recognized. */
export interface SpeechRecognitionEvent extends Event {
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}