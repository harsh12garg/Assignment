
import React from 'react';
import BasicDetailsForm from './forms/BasicDetailsForm';
import DocumentCollectionForm from './forms/DocumentCollectionForm';
import StatementOfPurposeForm from './forms/StatementOfPurposeForm';
import InterviewAvailabilityForm from './forms/InterviewAvailabilityForm';
import { FormData, FormStep } from '../types/form';

interface FormPreviewProps {
  currentStep: FormStep;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onStepChange: (step: FormStep) => void;
  onStepComplete: (step: FormStep) => void;
  completedSteps: Set<FormStep>;
  isStepValid: (step: FormStep) => boolean;
  onFinalSubmit: () => void;
}

const FormPreview = ({ 
  currentStep, 
  formData, 
  setFormData, 
  onStepChange, 
  onStepComplete,
  completedSteps,
  isStepValid,
  onFinalSubmit
}: FormPreviewProps) => {
  const handleNext = (step: FormStep, nextStep?: FormStep) => {
    if (isStepValid(step)) {
      onStepComplete(step);
      if (nextStep) {
        onStepChange(nextStep);
      }
    }
  };

  const renderForm = () => {
    switch (currentStep) {
      case 'basic':
        return (
          <BasicDetailsForm
            data={formData.basic}
            onChange={(data) => setFormData(prev => ({ ...prev, basic: data }))}
            onNext={() => handleNext('basic', 'documents')}
            isCompleted={completedSteps.has('basic')}
            isValid={isStepValid('basic')}
          />
        );
      case 'documents':
        return (
          <DocumentCollectionForm
            data={formData.documents}
            onChange={(data) => setFormData(prev => ({ ...prev, documents: data }))}
            onNext={() => handleNext('documents', 'statement')}
            onBack={() => onStepChange('basic')}
            isCompleted={completedSteps.has('documents')}
            isValid={isStepValid('documents')}
          />
        );
      case 'statement':
        return (
          <StatementOfPurposeForm
            data={formData.statement}
            onChange={(data) => setFormData(prev => ({ ...prev, statement: data }))}
            onNext={() => handleNext('statement', 'interview')}
            onBack={() => onStepChange('documents')}
            isCompleted={completedSteps.has('statement')}
            isValid={isStepValid('statement')}
          />
        );
      case 'interview':
        return (
          <InterviewAvailabilityForm
            data={formData.interview}
            onChange={(data) => setFormData(prev => ({ ...prev, interview: data }))}
            onBack={() => onStepChange('statement')}
            onSubmit={() => {
              handleNext('interview');
              onFinalSubmit();
            }}
            isCompleted={completedSteps.has('interview')}
            isValid={isStepValid('interview')}
          />
        );
      default:
        return (
          <BasicDetailsForm
            data={formData.basic}
            onChange={(data) => setFormData(prev => ({ ...prev, basic: data }))}
            onNext={() => handleNext('basic', 'documents')}
            isCompleted={completedSteps.has('basic')}
            isValid={isStepValid('basic')}
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Preview</h2>
          <p className="text-sm text-gray-600">You will be able to customize the fields in the later stage</p>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Talent Acquisition Form</h3>
          <p className="text-sm text-gray-600 mb-4">Complete all sections to submit your application</p>
          <p className="text-sm text-blue-600">Provide the following information to process your application</p>
        </div>

        {renderForm()}
      </div>
    </div>
  );
};

export default FormPreview;
