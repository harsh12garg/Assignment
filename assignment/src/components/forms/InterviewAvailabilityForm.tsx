
import React from 'react';
import { Calendar, Clock, Search, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InterviewAvailability } from '../../types/form';

interface InterviewAvailabilityFormProps {
  data: InterviewAvailability;
  onChange: (data: InterviewAvailability) => void;
  onBack: () => void;
  onSubmit: () => void;
  isCompleted: boolean;
  isValid: boolean;
}

const InterviewAvailabilityForm = ({ data, onChange, onBack, onSubmit, isCompleted, isValid }: InterviewAvailabilityFormProps) => {
  const handleChange = (field: keyof InterviewAvailability, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const timezones = [
    'UTC',
    'EST (Eastern Standard Time)',
    'PST (Pacific Standard Time)',
    'IST (Indian Standard Time)',
    'GMT (Greenwich Mean Time)',
    'CET (Central European Time)'
  ];

  const mediums = [
    'Video Call (Zoom)',
    'Video Call (Google Meet)',
    'Video Call (Microsoft Teams)',
    'Phone Call',
    'In-Person'
  ];

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://assessments-xhy0.onrender.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        console.log('Form submitted successfully');
        onSubmit();
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
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
          <Label htmlFor="interview-email" className="text-sm font-medium text-gray-700">
            1. Email* {data.email && <span className="text-green-600">✓</span>}
          </Label>
          <Input
            id="interview-email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Example : userid@gmail.com"
            className={`mt-1 ${data.email ? 'border-green-300' : ''}`}
          />
        </div>

        <div>
          <Label htmlFor="location" className="text-sm font-medium text-gray-700">
            2. Location* {data.location && <span className="text-green-600">✓</span>}
          </Label>
          <div className="relative mt-1">
            <Input
              id="location"
              value={data.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="Search or enter your location"
              className={`pl-10 ${data.location ? 'border-green-300' : ''}`}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div>
          <Label htmlFor="interview-date" className="text-sm font-medium text-gray-700">
            3. Interview Date* {data.date && <span className="text-green-600">✓</span>}
          </Label>
          <div className="relative mt-1">
            <Input
              id="interview-date"
              type="date"
              value={data.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className={`pr-10 ${data.date ? 'border-green-300' : ''}`}
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div>
          <Label htmlFor="interview-time" className="text-sm font-medium text-gray-700">
            4. Interview Time* {data.time && <span className="text-green-600">✓</span>}
          </Label>
          <div className="relative mt-1">
            <Input
              id="interview-time"
              type="time"
              value={data.time}
              onChange={(e) => handleChange('time', e.target.value)}
              className={`pr-10 ${data.time ? 'border-green-300' : ''}`}
            />
            <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            5. Time Zone* {data.timezone && <span className="text-green-600">✓</span>}
          </Label>
          <Select value={data.timezone} onValueChange={(value) => handleChange('timezone', value)}>
            <SelectTrigger className={data.timezone ? 'border-green-300' : ''}>
              <SelectValue placeholder="Search or Select a time zone from below" />
            </SelectTrigger>
            <SelectContent>
              {timezones.map((timezone) => (
                <SelectItem key={timezone} value={timezone}>
                  {timezone}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            6. Interview Medium* {data.medium && <span className="text-green-600">✓</span>}
          </Label>
          <Select value={data.medium} onValueChange={(value) => handleChange('medium', value)}>
            <SelectTrigger className={data.medium ? 'border-green-300' : ''}>
              <SelectValue placeholder="Search or Select medium of Interview from below" />
            </SelectTrigger>
            <SelectContent>
              {mediums.map((medium) => (
                <SelectItem key={medium} value={medium}>
                  {medium}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
              <span className="text-green-600">✓ All fields completed</span> : 
              <span className="text-orange-600">⚠ Please fill all required fields</span>
            }
          </div>
          <Button 
            onClick={handleSubmit}
            disabled={!isValid}
            className={`px-8 py-2 ${
              isValid 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            SUBMIT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewAvailabilityForm;
