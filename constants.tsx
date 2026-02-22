
import React from 'react';
import type { NavItemType, AnalyticsData } from './types';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import ContentGenerator from './components/ContentGenerator';
import ImageGenerator from './components/ImageGenerator';
import AutomatedReplies from './components/AutomatedReplies';

const ChartBarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
);

const DocumentTextIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
);

const PhotoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
  </svg>
);

const ChatBubbleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.455.09-.934.09-1.425v-2.552c0-3.543 2.62-6.447 6.024-6.762a8.75 8.75 0 0 1 6.474 3.048Zm-4.131-8.131a8.75 8.75 0 0 0-10.318 0m-4.091 10.318a8.75 8.75 0 0 0 0 10.318m10.318-10.318a8.75 8.75 0 0 0-10.318 0m4.091 10.318a8.75 8.75 0 0 0 10.318 0m-10.318-10.318 10.318 10.318" />
  </svg>
);


export const NAV_ITEMS: NavItemType[] = [
  {
    name: 'Dashboard',
    icon: <ChartBarIcon className="h-6 w-6" />,
    component: AnalyticsDashboard,
  },
  {
    name: 'Content Generation',
    icon: <DocumentTextIcon className="h-6 w-6" />,
    component: ContentGenerator,
  },
  {
    name: 'Image Generation',
    icon: <PhotoIcon className="h-6 w-6" />,
    component: ImageGenerator,
  },
  {
    name: 'Automated Replies',
    icon: <ChatBubbleIcon className="h-6 w-6" />,
    component: AutomatedReplies,
  },
];

export const MOCK_ANALYTICS_DATA: AnalyticsData[] = [
    { name: 'Jan', users: 400, messages: 2400 },
    { name: 'Feb', users: 300, messages: 1398 },
    { name: 'Mar', users: 200, messages: 9800 },
    { name: 'Apr', users: 278, messages: 3908 },
    { name: 'May', users: 189, messages: 4800 },
    { name: 'Jun', users: 239, messages: 3800 },
    { name: 'Jul', users: 349, messages: 4300 },
];

export const MOCK_MESSAGE_TYPE_DATA = [
    { name: 'Text', value: 400 },
    { name: 'Image', value: 300 },
    { name: 'Command', value: 300 },
    { name: 'Sticker', value: 200 },
];
