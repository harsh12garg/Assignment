
import React from 'react';
import { FileText, Upload, MessageSquare, Calendar, CheckCircle2 } from 'lucide-react';
import { FormStep } from '../types/form';

interface FormTemplatesProps {
  currentStep: FormStep;
  onStepChange: (step: FormStep) => void;
  completedSteps: Set<FormStep>;
  isStepValid: (step: FormStep) => boolean;
}

const FormTemplates = ({ currentStep, onStepChange, completedSteps, isStepValid }: FormTemplatesProps) => {
  const templates = [
    {
      id: 'basic',
      title: 'Basic Details',
      description: 'Collect information from Candidates on their education, work experience, contact no etc',
      icon: FileText,
      step: 'basic' as FormStep
    },
    {
      id: 'documents',  
      title: 'Document Collection',
      description: 'Save time and efforts. Explore this template to find a set of questions required for document collection',
      icon: Upload,
      step: 'documents' as FormStep
    },
    {
      id: 'statement',
      title: 'Statement of Purpose',
      description: 'Collect detailed responses about candidate experience and motivations',
      icon: MessageSquare,
      step: 'statement' as FormStep
    },
    {
      id: 'interview',
      title: 'Interview Availability',
      description: 'Schedule interview appointments with preferred time slots and medium',
      icon: Calendar,
      step: 'interview' as FormStep
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">New Form</h3>
              <p className="text-sm text-gray-600">Start creating a new form with the wide options of fields available</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-4">Form Sections:</h4>
        <div className="space-y-3">
          {templates.map((template) => {
            const IconComponent = template.icon;
            const isActive = currentStep === template.step;
            const isCompleted = completedSteps.has(template.step);
            const isValid = isStepValid(template.step);
            
            return (
              <div
                key={template.id}
                onClick={() => onStepChange(template.step)}
                className={`bg-white rounded-lg border-2 p-4 hover:shadow-md transition-all cursor-pointer relative ${
                  isActive 
                    ? 'border-blue-300 bg-blue-50' 
                    : isCompleted 
                      ? 'border-green-300 bg-green-50'
                      : isValid
                        ? 'border-orange-300 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isActive 
                      ? 'bg-blue-200' 
                      : isCompleted 
                        ? 'bg-green-200'
                        : isValid
                          ? 'bg-orange-200'
                          : 'bg-gray-200'
                  }`}>
                    <IconComponent className={`w-5 h-5 ${
                      isActive 
                        ? 'text-blue-600' 
                        : isCompleted 
                          ? 'text-green-600'
                          : isValid
                            ? 'text-orange-600'
                            : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-medium mb-1 ${
                        isActive 
                          ? 'text-blue-900' 
                          : isCompleted 
                            ? 'text-green-900'
                            : isValid
                              ? 'text-orange-900'
                              : 'text-gray-900'
                      }`}>
                        {template.title}
                      </h3>
                      {isCompleted && (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    <p className={`text-xs ${
                      isActive 
                        ? 'text-blue-700' 
                        : isCompleted 
                          ? 'text-green-700'
                          : isValid
                            ? 'text-orange-700'
                            : 'text-gray-600'
                    }`}>
                      {template.description}
                    </p>
                    <div className="mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isCompleted 
                          ? 'bg-green-100 text-green-800'
                          : isValid
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-gray-100 text-gray-600'
                      }`}>
                        {isCompleted ? 'Completed' : isValid ? 'In Progress' : 'Not Started'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FormTemplates;
