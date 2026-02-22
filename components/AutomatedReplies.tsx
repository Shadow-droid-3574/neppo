
import React, { useState } from 'react';
import { generateReply } from '../services/geminiService';
import Loader from './Loader';

const AutomatedReplies: React.FC = () => {
  const [userMessage, setUserMessage] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!userMessage) {
      setError('Please enter a user message.');
      return;
    }
    setError('');
    setIsLoading(true);
    setGeneratedReply('');
    try {
      const reply = await generateReply(userMessage);
      setGeneratedReply(reply);
    } catch (err) {
      setError('Failed to generate reply. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 space-y-6">
        <div>
          <label htmlFor="user-message" className="block text-lg font-medium text-gray-300 mb-2">
            Simulate User Message
          </label>
          <textarea
            id="user-message"
            rows={3}
            className="w-full bg-gray-700 border border-gray-600 rounded-md p-4 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="e.g., How do I reset my password?"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors duration-300 shadow-lg"
          >
            {isLoading ? 'Thinking...' : 'Generate Reply'}
          </button>
        </div>
      </div>

      {error && <p className="text-red-400 mt-4 text-center">{error}</p>}

      {(isLoading || generatedReply) && (
        <div className="mt-8 space-y-6">
          <div className="flex justify-end">
            <div className="bg-gray-700 text-white p-4 rounded-lg max-w-lg">
              <p className="font-semibold text-gray-400 mb-1">User</p>
              <p>{userMessage}</p>
            </div>
          </div>
          
          <div className="flex justify-start">
            <div className="bg-indigo-600 text-white p-4 rounded-lg max-w-lg">
              <p className="font-semibold text-indigo-200 mb-1">Bot Reply</p>
              {isLoading ? <Loader /> : <p>{generatedReply}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutomatedReplies;
