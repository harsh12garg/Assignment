
import React from 'react';
import { Upload, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { DocumentCollection } from '../../types/form';

interface DocumentCollectionFormProps {
  data: DocumentCollection;
  onChange: (data: DocumentCollection) => void;
  onNext: () => void;
  onBack: () => void;
  isCompleted: boolean;
  isValid: boolean;
}

const DocumentCollectionForm = ({ data, onChange, onNext, onBack, isCompleted, isValid }: DocumentCollectionFormProps) => {
  const handleFileUpload = async (field: keyof DocumentCollection, file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://assessments-xhy0.onrender.com/upload-file', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const result = await response.json();
        onChange({ ...data, [field]: result.url });
        console.log(`File uploaded for ${field}:`, result.url);
      } else {
        console.error('File upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const documents = [
    { key: 'class10' as keyof DocumentCollection, label: '1. 10th Marksheet*', required: true },
    { key: 'class12' as keyof DocumentCollection, label: '2. 12th Marksheet*', required: true },
    { key: 'graduation' as keyof DocumentCollection, label: '3. Graduation Marksheet*', required: true },
    { key: 'postGraduation' as keyof DocumentCollection, label: '4. Post Graduation Marksheet', required: false },
    { key: 'resume' as keyof DocumentCollection, label: '5. Resume/CV*', required: true },
    { key: 'recommendationLetter' as keyof DocumentCollection, label: '6. Recommendation Letter', required: false },
    { key: 'salarySlips' as keyof DocumentCollection, label: '7. Salary Slips', required: false },
    { key: 'others' as keyof DocumentCollection, label: '8. Others', required: false }
  ];

  return (
    <div className="space-y-6">
      {isCompleted && (
        <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <span className="text-sm font-medium text-green-800">This section is completed</span>
        </div>
      )}

      <div className="space-y-4">
        {documents.map((doc) => (
          <div key={doc.key}>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              {doc.label} {data[doc.key] && <span className="text-green-600">✓</span>}
            </Label>
            <div className={`border-2 border-dashed rounded-lg p-4 hover:border-gray-400 transition-colors ${
              data[doc.key] ? 'border-green-300 bg-green-50' : 'border-gray-300'
            }`}>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <Upload className={`w-8 h-8 mx-auto mb-2 ${
                    data[doc.key] ? 'text-green-500' : 'text-gray-400'
                  }`} />
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFileUpload(doc.key, file);
                      }
                    }}
                    className="hidden"
                    id={doc.key}
                  />
                  <label
                    htmlFor={doc.key}
                    className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    {data[doc.key] ? 'File uploaded - Click to replace' : 'Attach file upto 5kb'}
                  </label>
                  {data[doc.key] && (
                    <p className="text-xs text-green-600 mt-1">✓ File uploaded successfully</p>
                  )}
                </div>
              </div>
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
              <span className="text-green-600">✓ Required documents uploaded</span> : 
              <span className="text-orange-600">⚠ Please upload required documents marked with *</span>
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

export default DocumentCollectionForm;
