
import React from 'react';

export interface NavItemType {
  name: string;
  // FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
  icon: React.ReactElement;
  component: React.FC;
}

export interface AnalyticsData {
  name: string;
  users: number;
  messages: number;
}