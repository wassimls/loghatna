import React from 'react';
import { Tab, TabId } from '../types';

interface TabsProps {
    tabs: Tab[];
    activeTab: TabId;
    onTabClick: (tabId: TabId) => void;
}

const TabsComponent: React.FC<TabsProps> = ({ tabs, activeTab, onTabClick }) => (
    <div className="flex bg-white dark:bg-slate-800/80 dark:backdrop-blur-sm shadow-md flex-wrap border-b border-gray-200 dark:border-slate-700 transition-colors duration-500">
        {tabs.map((tab) => (
            <button
                key={tab.id}
                onClick={() => onTabClick(tab.id)}
                className={`flex-1 py-4 px-2 text-center font-bold transition-all duration-300 relative flex items-center justify-center gap-3 text-sm md:text-base hover:bg-primary/5 hover:text-primary dark:hover:bg-primary/20
                    ${activeTab === tab.id ? 'text-primary' : 'text-dark dark:text-gray-300'}
                `}
            >
                <i className={tab.icon}></i>
                {tab.label}
                {tab.isNew && <span className="bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full ml-2">جديد</span>}
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple rounded-t-full"></div>}
            </button>
        ))}
    </div>
);

export default TabsComponent;