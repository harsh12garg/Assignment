
import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { Progress } from './ui/progress';
import FormTemplates from './FormTemplates';
import FormPreview from './FormPreview';
import { FormData, FormStep } from '../types/form';

const FormBuilder = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>('basic');
  const [formData, setFormData] = useState<FormData>({
    basic: {
      name: '',
      email: '',
      mobile: '',
      dateOfBirth: ''
    },
    documents: {
      class10: null,
      class12: null,
      graduation: null,
      postGraduation: null,
      resume: null,
      recommendationLetter: null,
      salarySlips: null,
      others: null
    },
    statement: {
      question1: '',
      question2: '',
      question3: ''
    },
    interview: {
      email: '',
      location: '',
      date: '',
      time: '',
      timezone: '',
      medium: ''
    }
  });

  const [completedSteps, setCompletedSteps] = useState<Set<FormStep>>(new Set());

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    const savedCompletedSteps = localStorage.getItem('completedSteps');
    
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading form data from localStorage:', error);
      }
    }
    
    if (savedCompletedSteps) {
      try {
        setCompletedSteps(new Set(JSON.parse(savedCompletedSteps)));
      } catch (error) {
        console.error('Error loading completed steps from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
    console.log('Form data updated:', formData);
  }, [formData]);

  // Save completed steps to localStorage
  useEffect(() => {
    localStorage.setItem('completedSteps', JSON.stringify(Array.from(completedSteps)));
  }, [completedSteps]);

  // Only show Form Selection as active, others as future steps
  const steps = [
    { key: 'form-selection' as const, title: 'Form Selection', completed: false, active: true },
    { key: 'setup' as const, title: 'Set up', completed: false, active: false },
    { key: 'form-creation' as const, title: 'Form Creation', completed: false, active: false },
    { key: 'review' as const, title: 'Review', completed: false, active: false }
  ];

  const formSteps: FormStep[] = ['basic', 'documents', 'statement', 'interview'];

  const getProgressPercentage = () => {
    const totalSteps = formSteps.length;
    const completed = completedSteps.size;
    return Math.round((completed / totalSteps) * 100);
  };

  const isStepValid = (step: FormStep): boolean => {
    switch (step) {
      case 'basic':
        return !!(formData.basic.name && formData.basic.email);
      case 'documents':
        return !!(formData.documents.class10 && formData.documents.class12 && 
                 formData.documents.graduation && formData.documents.resume);
      case 'statement':
        return !!(formData.statement.question1 && formData.statement.question2 && 
                 formData.statement.question3);
      case 'interview':
        return !!(formData.interview.email && formData.interview.location && 
                 formData.interview.date && formData.interview.time && 
                 formData.interview.timezone && formData.interview.medium);
      default:
        return false;
    }
  };

  const handleStepCompletion = (step: FormStep) => {
    if (isStepValid(step)) {
      setCompletedSteps(prev => new Set([...prev, step]));
      console.log(`Step "${step}" completed successfully`);
    }
  };

  const handleFinalSubmit = () => {
    const allStepsCompleted = formSteps.every(step => completedSteps.has(step));
    
    if (allStepsCompleted) {
      const submissionData = {
        ...formData,
        submittedAt: new Date().toISOString(),
        completionStatus: 'submitted'
      };
      
      console.log('=== FORM SUBMISSION SUCCESSFUL ===');
      console.log('Complete Form Data:', submissionData);
      console.log('Completed Steps:', Array.from(completedSteps));
      console.log('Progress:', getProgressPercentage() + '%');
      
      // Store final submission in localStorage
      localStorage.setItem('submittedFormData', JSON.stringify(submissionData));
      localStorage.setItem('submissionTimestamp', new Date().toISOString());
      
      alert('Form submitted successfully! Check console for details.');
    } else {
      console.warn('Cannot submit: Not all required steps are completed');
      alert('Please complete all required steps before submitting.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              {steps.map((step, index) => (
                <div key={step.key} className="flex items-center">
                  <div className={`flex items-center ${
                    step.active ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    {step.completed ? (
                      <CheckCircle className="w-5 h-5 mr-2" />
                    ) : (
                      <div className={`w-5 h-5 rounded-full border-2 mr-2 ${
                        step.active ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                      }`} />
                    )}
                    <span className="font-medium">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`ml-4 w-16 h-0.5 ${
                      step.active ? 'bg-blue-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Dynamic Progress Bar for Form Sections */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-semibold text-gray-800">
                Talent Acquisition Form Progress
              </span>
              <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                {completedSteps.size}/{formSteps.length} sections completed
              </span>
            </div>
            <Progress value={getProgressPercentage()} className="h-3 mb-2" />
            <div className="flex justify-between text-xs text-gray-600">
              <span>Progress: {getProgressPercentage()}% Complete</span>
              <span>
                {completedSteps.size === formSteps.length ? '🎉 Ready to Submit!' : 
                 completedSteps.size > 0 ? '📝 In Progress' : '🚀 Let\'s Start!'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Templates */}
          <div className="lg:col-span-1">
            <FormTemplates 
              currentStep={currentStep} 
              onStepChange={setCurrentStep}
              completedSteps={completedSteps}
              isStepValid={isStepValid}
            />
          </div>

          {/* Right Content - Form Preview */}
          <div className="lg:col-span-2">
            <FormPreview 
              currentStep={currentStep}
              formData={formData}
              setFormData={setFormData}
              onStepChange={setCurrentStep}
              onStepComplete={handleStepCompletion}
              completedSteps={completedSteps}
              isStepValid={isStepValid}
              onFinalSubmit={handleFinalSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
