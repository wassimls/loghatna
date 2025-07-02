import { Category, Language } from './types';

export const CATEGORIES: Category[] = [
    { id: 'basics', name: 'الكلمات الأساسية', icon: 'fas fa-star' },
    { id: 'greetings', name: 'التحيات والتعارف', icon: 'fas fa-handshake' },
    { id: 'numbers', name: 'الأرقام', icon: 'fas fa-sort-numeric-down' },
    { id: 'colors', name: 'الألوان', icon: 'fas fa-palette' },
    { id: 'family', name: 'العائلة', icon: 'fas fa-users' },
    { id: 'food', name: 'الطعام والشراب', icon: 'fas fa-utensils' },
    { id: 'time', name: 'الوقت والأيام', icon: 'fas fa-clock' },
    { id: 'weather', name: 'الطقس', icon: 'fas fa-cloud-sun' },
    { id: 'home', name: 'المنزل', icon: 'fas fa-home' },
    { id: 'shopping', name: 'التسوق', icon: 'fas fa-shopping-cart' },
    { id: 'body', name: 'أجزاء الجسم', icon: 'fas fa-child' },
    { id: 'clothing', name: 'الملابس', icon: 'fas fa-tshirt' },
    { id: 'verbs', name: 'الأفعال الشائعة', icon: 'fas fa-running' },
    { id: "adjectives", name: "الصفات الوصفية", icon: "fas fa-magic" },
    { id: 'places', name: 'الأماكن والمدينة', icon: 'fas fa-city' },
    { id: 'nature', name: 'الطبيعة', icon: 'fas fa-leaf' },
    { id: 'hobbies', name: 'الهوايات والأنشطة', icon: 'fas fa-paint-brush' },
    { id: 'emotions', name: 'المشاعر والأحاسيس', icon: 'fas fa-grin-beam' },
    { id: 'work', name: 'العمل', icon: 'fas fa-briefcase' },
    { id: 'travel', name: 'السفر', icon: 'fas fa-plane-departure' },
];

export const LANGUAGES: Language[] = [
    { code: 'en-US', name: 'English' },
    { code: 'fr-FR', name: 'French' },
    { code: 'it-IT', name: 'Italian' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'ru-RU', name: 'Russian' },
    { code: 'tr-TR', name: 'Turkish' },
    { code: 'zh-CN', name: 'Chinese' },
    { code: 'ja-JP', name: 'Japanese' },
    { code: 'ko-KR', name: 'Korean' },
];

export const AVATAR_EMOJIS = ['👩‍💻', '👨‍💻', '🧑‍🏫', '👨‍🎓', '👩‍🎓', '🤔', '😊', '🥳', '😎', '🤓', '🤩', '😇', '🦊', '🦉', '🚀', '🤖'];
