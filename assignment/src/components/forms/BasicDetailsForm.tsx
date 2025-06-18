
import React from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BasicDetails } from '../../types/form';

interface BasicDetailsFormProps {
  data: BasicDetails;
  onChange: (data: BasicDetails) => void;
  onNext: () => void;
  isCompleted: boolean;
  isValid: boolean;
}

const BasicDetailsForm = ({ data, onChange, onNext, isCompleted, isValid }: BasicDetailsFormProps) => {
  const handleChange = (field: keyof BasicDetails, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      {isCompleted && (
        <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <span className="text-sm font-medium text-green-800">This section is completed</span>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
            1. Name* {data.name && <span className="text-green-600">✓</span>}
          </Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Enter your full name"
            className={`mt-1 ${data.name ? 'border-green-300' : ''}`}
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            2. Email* {data.email && <span className="text-green-600">✓</span>}
          </Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Example : userid@gmail.com"
            className={`mt-1 ${data.email ? 'border-green-300' : ''}`}
          />
        </div>

        <div>
          <Label htmlFor="mobile" className="text-sm font-medium text-gray-700">
            3. Mobile Number {data.mobile && <span className="text-green-600">✓</span>}
          </Label>
          <Input
            id="mobile"
            value={data.mobile}
            onChange={(e) => handleChange('mobile', e.target.value)}
            placeholder="Enter your 10 digit contact no"
            className={`mt-1 ${data.mobile ? 'border-green-300' : ''}`}
          />
        </div>

        <div>
          <Label htmlFor="dob" className="text-sm font-medium text-gray-700">
            4. Date of Birth {data.dateOfBirth && <span className="text-green-600">✓</span>}
          </Label>
          <div className="relative mt-1">
            <Input
              id="dob"
              type="date"
              value={data.dateOfBirth}
              onChange={(e) => handleChange('dateOfBirth', e.target.value)}
              className={`pr-10 ${data.dateOfBirth ? 'border-green-300' : ''}`}
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {isValid ? 
            <span className="text-green-600">✓ Required fields completed</span> : 
            <span className="text-orange-600">⚠ Please fill required fields marked with *</span>
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
  );
};

export default BasicDetailsForm;
