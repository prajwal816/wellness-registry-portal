
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { LightbulbIcon } from 'lucide-react';

interface IdeaExplanationProps {
  value: string;
  onChange: (value: string) => void;
}

const IdeaExplanation = ({ value, onChange }: IdeaExplanationProps) => {
  return (
    <div className="bg-ayush-light-green p-6 rounded-lg mb-6">
      <div className="flex items-center mb-4">
        <LightbulbIcon size={20} className="mr-2 text-ayush-green" />
        <h3 className="text-lg font-semibold text-ayush-green">Explain Your Idea</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Please provide a detailed explanation of your startup idea. This will help evaluators understand 
        your vision, innovation, market potential, and how it aligns with AYUSH principles.
      </p>
      
      <div className="space-y-2">
        <Label htmlFor="ideaExplanation">Your Startup Idea *</Label>
        <Textarea 
          id="ideaExplanation" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Describe your innovative AYUSH startup idea in detail. Include information about what problem you're solving, your target market, competitive advantage, and how your business aligns with AYUSH principles."
          className="min-h-[200px]"
          required
        />
      </div>
      
      <p className="text-xs text-gray-500 mt-2">
        This explanation will be analyzed by our AI system to provide an initial assessment of your application's potential.
      </p>
    </div>
  );
};

export default IdeaExplanation;
