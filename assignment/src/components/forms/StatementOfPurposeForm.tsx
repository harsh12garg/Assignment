
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { StatementOfPurpose } from '../../types/form';

interface StatementOfPurposeFormProps {
  data: StatementOfPurpose;
  onChange: (data: StatementOfPurpose) => void;
  onNext: () => void;
  onBack: () => void;
  isCompleted: boolean;
  isValid: boolean;
}

const StatementOfPurposeForm = ({ data, onChange, onNext, onBack, isCompleted, isValid }: StatementOfPurposeFormProps) => {
  const handleChange = (field: keyof StatementOfPurpose, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const questions = [
    {
      key: 'question1' as keyof StatementOfPurpose,
      text: '1. Tell me about a time you were asked to do something you had never done before. How did you react? What did you learn?'
    },
    {
      key: 'question2' as keyof StatementOfPurpose,
      text: '2. Tell me about the last time something significant didn\'t go according to plan at work. What was your role? What was the outcome?'
    },
    {
      key: 'question3' as keyof StatementOfPurpose,
      text: '3. What are the three things that are most important to you in a job?'
    }
  ];

  return (
    <div className="space-y-6">
      {isCompleted && (
        <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <span className="text-sm font-medium text-green-800">This section is completed</span>
        </div>
      )}

      <div className="space-y-6">
        {questions.map((question) => (
          <div key={question.key}>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              {question.text} {data[question.key] && <span className="text-green-600">✓</span>}
            </Label>
            <Textarea
              value={data[question.key]}
              onChange={(e) => handleChange(question.key, e.target.value)}
              placeholder="Enter a description for the long answer"
              className={`min-h-[120px] resize-none ${data[question.key] ? 'border-green-300' : ''}`}
              maxLength={300}
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {data[question.key]?.length || 0}/300 word limit
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <Button 
          onClick={onBack}
          variant="outline"
          className="px-8 py-2"
        >
          BACK
        </Button>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            {isValid ? 
              <span className="text-green-600">✓ All questions answered</span> : 
              <span className="text-orange-600">⚠ Please answer all questions</span>
            }
          </div>
          <Button 
            onClick={onNext}
            disabled={!isValid}
            className={`px-8 py-2 ${
              isValid 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            NEXT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatementOfPurposeForm;
