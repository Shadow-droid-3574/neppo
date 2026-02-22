
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { MOCK_ANALYTICS_DATA, MOCK_MESSAGE_TYPE_DATA } from '../constants';
import StatCard from './StatCard';

const UsersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-2.253 9.527 9.527 0 0 0-4.12-9.255 9.337 9.337 0 0 0-2.625-.372m-1.5 0a9.345 9.345 0 0 0-2.625.372A9.337 9.337 0 0 0 3.879 7.521a9.527 9.527 0 0 0-4.12 9.255 9.337 9.337 0 0 0 2.625.372m6.5 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6.5 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);

const MessagesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
);


const AnalyticsDashboard: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Users" value="1,257" icon={<UsersIcon />} />
                <StatCard title="Messages Sent (24h)" value="8,921" icon={<MessagesIcon />} />
                <StatCard title="Active Subs" value="97%" icon={<ChartBarIcon />} />
                <StatCard title="New Users (24h)" value="+42" icon={<UsersIcon />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4 text-white">User Growth</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={MOCK_ANALYTICS_DATA}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                            <XAxis dataKey="name" stroke="#A0AEC0" />
                            <YAxis stroke="#A0AEC0" />
                            <Tooltip contentStyle={{ backgroundColor: '#2D3748', border: '1px solid #4A5568' }} />
                            <Legend />
                            <Line type="monotone" dataKey="users" stroke="#6366F1" strokeWidth={2} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4 text-white">Message Types</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={MOCK_MESSAGE_TYPE_DATA}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                            <XAxis dataKey="name" stroke="#A0AEC0" />
                            <YAxis stroke="#A0AEC0" />
                            <Tooltip contentStyle={{ backgroundColor: '#2D3748', border: '1px solid #4A5568' }} />
                            <Legend />
                            <Bar dataKey="value" fill="#6366F1" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
// Dummy Icon for compile
const ChartBarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg {...props}></svg>);

export default AnalyticsDashboard;
