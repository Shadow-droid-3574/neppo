
import React, { useState } from 'react';
import { generateText } from '../services/geminiService';
import Loader from './Loader';

const ContentGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt) {
      setError('Please enter a prompt.');
      return;
    }
    setError('');
    setIsLoading(true);
    setGeneratedContent('');
    try {
      const content = await generateText(prompt);
      setGeneratedContent(content);
    } catch (err) {
      setError('Failed to generate content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 space-y-6">
        <div>
          <label htmlFor="prompt" className="block text-lg font-medium text-gray-300 mb-2">
            Your Prompt
          </label>
          <textarea
            id="prompt"
            rows={4}
            className="w-full bg-gray-700 border border-gray-600 rounded-md p-4 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="e.g., Write a Telegram announcement about a new feature..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors duration-300 shadow-lg"
          >
            {isLoading ? 'Generating...' : 'Generate Content'}
          </button>
        </div>
      </div>
      
      {error && <p className="text-red-400 mt-4 text-center">{error}</p>}

      {isLoading && (
        <div className="mt-8 text-center">
          <Loader />
        </div>
      )}

      {generatedContent && (
        <div className="mt-8 bg-gray-800 rounded-lg shadow-xl p-8">
          <h3 className="text-2xl font-semibold mb-4 text-white border-b border-gray-600 pb-2">Generated Content</h3>
          <p className="text-gray-300 whitespace-pre-wrap">{generatedContent}</p>
        </div>
      )}
    </div>
  );
};

export default ContentGenerator;
