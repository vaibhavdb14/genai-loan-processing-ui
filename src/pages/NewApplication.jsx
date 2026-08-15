import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  UploadCloud, 
  FileText, 
  ChevronRight, 
  ChevronLeft,
  ServerCog,
  CheckCircle2,
  CircleDashed,
  X,
  AlertTriangle
} from 'lucide-react';

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
const ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png'];

const formatFileSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(bytes < 10 * 1024 ? 1 : 0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const getFileKey = (file) => `${file.name}-${file.size}-${file.lastModified}`;

const isAllowedFileType = (file) => {
  if (ALLOWED_MIME_TYPES.includes(file.type)) return true;
  const extension = file.name.includes('.')
    ? file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
    : '';
  return ALLOWED_EXTENSIONS.includes(extension);
};

const validateFile = (file) => {
  if (!isAllowedFileType(file)) {
    return {
      valid: false,
      reason: `${file.name}: unsupported file type. Allowed: PDF, JPG, PNG.`,
    };
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      reason: `${file.name}: exceeds 10 MB limit.`,
    };
  }
  return { valid: true };
};

const NewApplication = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  
  // Basic state to hold form data for the review step
  const [formData, setFormData] = useState({
    applicantName: '',
    panNumber: '',
    loanType: '',
    amount: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const processFiles = (fileList) => {
    if (!fileList || fileList.length === 0) return;

    const incomingFiles = Array.from(fileList);
    const errors = [];
    const acceptedFiles = [];

    incomingFiles.forEach((file) => {
      const result = validateFile(file);
      if (result.valid) {
        acceptedFiles.push(file);
      } else {
        errors.push(result.reason);
      }
    });

    if (errors.length > 0) {
      setValidationErrors(errors);
    } else {
      setValidationErrors([]);
    }

    if (acceptedFiles.length > 0) {
      setSelectedFiles((prev) => {
        const existingKeys = new Set(prev.map(getFileKey));
        const nextFiles = [...prev];
        acceptedFiles.forEach((file) => {
          const key = getFileKey(file);
          if (!existingKeys.has(key)) {
            existingKeys.add(key);
            nextFiles.push(file);
          }
        });
        return nextFiles;
      });
    }
  };

  const handleFileInputChange = (e) => {
    processFiles(e.target.files);
    e.target.value = '';
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (fileKey) => {
    setSelectedFiles((prev) => prev.filter((file) => getFileKey(file) !== fileKey));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    processFiles(e.dataTransfer.files);
  };

  // Simulated AI Processing Pipeline
  const startProcessing = () => {
    setIsProcessing(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 15;
      if (progress > 100) {
        clearInterval(interval);
        // After processing, redirect back to applications list
        setTimeout(() => navigate('/applications'), 1000);
      } else {
        setProcessingProgress(progress);
      }
    }, 800);
  };

  const steps = [
    { num: 1, title: 'Applicant Details' },
    { num: 2, title: 'Loan Details' },
    { num: 3, title: 'Documents' },
    { num: 4, title: 'Review & Submit' }
  ];

  if (isProcessing) {
    return (
      <div className="p-8 max-w-3xl mx-auto mt-10">
        <div className="bg-banking-card border border-border p-10 rounded-lg shadow-sm text-center">
          <ServerCog size={48} className="mx-auto text-banking-primary animate-pulse mb-6" />
          <h2 className="text-2xl font-bold text-text-primary mb-2">AI Processing Pipeline</h2>
          <p className="text-text-secondary mb-8">Analyzing APP-2026-001025</p>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div 
              className="bg-banking-primary h-2 rounded-full transition-all duration-500" 
              style={{ width: `${Math.min(processingProgress, 100)}%` }}
            ></div>
          </div>

          <div className="space-y-4 text-left max-w-md mx-auto">
            <PipelineStep label="Document Upload & Pre-processing" progress={processingProgress} threshold={15} />
            <PipelineStep label="Document Classification" progress={processingProgress} threshold={30} />
            <PipelineStep label="GenAI Data Extraction" progress={processingProgress} threshold={45} />
            <PipelineStep label="Cross-document Verification" progress={processingProgress} threshold={60} />
            <PipelineStep label="Risk & Exception Detection" progress={processingProgress} threshold={75} />
            <PipelineStep label="AI Summary Generation" progress={processingProgress} threshold={90} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">File New Application</h1>
        <p className="text-text-secondary mt-1">Enter applicant details and upload required documents.</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-border-light -z-10"></div>
        {steps.map((s) => (
          <div key={s.num} className="flex flex-col items-center bg-banking-background px-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${
              step > s.num ? 'bg-banking-success border-banking-success text-white' : 
              step === s.num ? 'bg-banking-primary border-banking-primary text-white' : 
              'bg-banking-card border-border text-text-muted'
            }`}>
              {step > s.num ? <Check size={20} /> : s.num}
            </div>
            <span className={`text-sm mt-2 font-medium ${step >= s.num ? 'text-text-primary' : 'text-text-muted'}`}>
              {s.title}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-banking-card border border-border rounded-lg shadow-sm">
        <div className="p-8 min-h-[400px]">
          
          {/* STEP 1: Applicant Details */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-semibold text-text-primary border-b border-border-light pb-4">1. Generic Applicant Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Applicant Name" name="applicantName" placeholder="Full legal name" value={formData.applicantName} onChange={handleInputChange} />
                <InputField label="Date of Birth" type="date" />
                <InputField label="Mobile Number" placeholder="+91" />
                <InputField label="Email Address" type="email" placeholder="applicant@email.com" />
                <InputField label="PAN / Identification Number" name="panNumber" placeholder="ABCDE1234F" value={formData.panNumber} onChange={handleInputChange} />
                <InputField label="Customer ID (Optional)" placeholder="If existing customer" />
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-text-primary mb-1">Residential Address</label>
                  <textarea className="w-full px-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-banking-primary focus:outline-none text-sm text-text-primary" rows="3"></textarea>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Loan Details */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-semibold text-text-primary border-b border-border-light pb-4">2. Loan Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-text-primary mb-1">Loan Type</label>
                  <select 
                    name="loanType" 
                    value={formData.loanType} 
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-banking-primary focus:outline-none text-sm text-text-primary"
                  >
                    <option value="">Select a loan type...</option>
                    <option value="Personal Loan">Personal Loan</option>
                    <option value="Home Loan">Home Loan</option>
                    <option value="Business Loan">Business Loan</option>
                  </select>
                </div>

                {formData.loanType && (
                  <>
                    <InputField label="Requested Amount" name="amount" placeholder="e.g., ₹50,00,000" value={formData.amount} onChange={handleInputChange} />
                    <InputField label="Monthly Income / Turnover" placeholder="e.g., ₹1,50,000" />
                    <InputField label="Employment / Business Type" placeholder="Salaried / Self-employed" />
                    <InputField label="Existing EMI / Liabilities" placeholder="e.g., ₹15,000" />
                  </>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Documents */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-semibold text-text-primary border-b border-border-light pb-4">3. Document Upload</h2>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                className="hidden"
                onChange={handleFileInputChange}
              />
              
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-center transition-colors ${
                  isDragOver
                    ? 'border-banking-primary bg-banking-softBlue/40'
                    : 'border-border-light bg-banking-softBlue/20 hover:bg-banking-softBlue/30'
                }`}
              >
                <UploadCloud size={48} className="text-banking-primary mb-4" />
                <h3 className="font-semibold text-text-primary text-lg mb-1">Drag & Drop Documents</h3>
                <p className="text-text-secondary text-sm mb-4">Supported formats: PDF, JPG, PNG (Max 10MB each)</p>
                <button
                  type="button"
                  onClick={handleBrowseClick}
                  className="bg-banking-card border border-border text-text-primary px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50"
                >
                  Browse Files
                </button>
              </div>

              {validationErrors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <div className="flex items-start gap-2 text-banking-error text-sm font-medium mb-2">
                    <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                    <span>Some files could not be added:</span>
                  </div>
                  <ul className="space-y-1 text-sm text-banking-error list-disc list-inside">
                    {validationErrors.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6">
                <h4 className="text-sm font-medium text-text-primary mb-3">
                  Selected Documents ({selectedFiles.length})
                </h4>
                {selectedFiles.length === 0 ? (
                  <p className="text-sm text-text-muted border border-dashed border-border-light rounded-md p-4 text-center">
                    No documents selected yet. Use Browse Files or drag and drop documents above.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {selectedFiles.map((file) => (
                      <FileRow
                        key={getFileKey(file)}
                        name={file.name}
                        size={formatFileSize(file.size)}
                        onRemove={() => handleRemoveFile(getFileKey(file))}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: Review & Submit */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-semibold text-text-primary border-b border-border-light pb-4">4. Review & Submit</h2>
              
              <div className="bg-banking-background p-6 rounded-lg border border-border-light">
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                  <div>
                    <span className="text-text-secondary block mb-1">Applicant Name</span>
                    <span className="font-semibold text-text-primary">{formData.applicantName || 'Not Provided'}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary block mb-1">PAN Number</span>
                    <span className="font-semibold text-text-primary">{formData.panNumber || 'Not Provided'}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary block mb-1">Loan Type</span>
                    <span className="font-semibold text-text-primary">{formData.loanType || 'Not Provided'}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary block mb-1">Requested Amount</span>
                    <span className="font-semibold text-text-primary">{formData.amount || 'Not Provided'}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-text-primary mb-3">
                  Selected Documents ({selectedFiles.length})
                </h3>
                {selectedFiles.length === 0 ? (
                  <div className="flex items-center gap-2 text-banking-warning font-medium bg-yellow-50 p-4 rounded-md border border-yellow-200 text-sm">
                    <AlertTriangle size={18} />
                    No documents selected. Go back to Step 3 to add documents before submitting.
                  </div>
                ) : (
                  <>
                    <div className="space-y-2 mb-4">
                      {selectedFiles.map((file) => (
                        <FileRow
                          key={getFileKey(file)}
                          name={file.name}
                          size={formatFileSize(file.size)}
                          readOnly
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-banking-success font-medium bg-green-50 p-4 rounded-md border border-green-200 text-sm">
                      <CheckCircle2 size={18} />
                      {selectedFiles.length} document{selectedFiles.length === 1 ? '' : 's'} selected and ready for submission.
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation */}
        <div className="px-8 py-5 border-t border-border-light bg-gray-50 flex justify-between rounded-b-lg">
          <button 
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
            className={`px-5 py-2.5 rounded-md font-medium flex items-center gap-2 transition-colors ${step === 1 ? 'opacity-50 cursor-not-allowed text-text-muted' : 'text-text-primary bg-white border border-border hover:bg-gray-100'}`}
          >
            <ChevronLeft size={18} />
            Back
          </button>

          {step < 4 ? (
            <button 
              onClick={() => setStep(step + 1)}
              className="bg-banking-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-md font-medium flex items-center gap-2 transition-colors shadow-sm"
            >
              Next Step
              <ChevronRight size={18} />
            </button>
          ) : (
            <button 
              onClick={startProcessing}
              className="bg-banking-success hover:bg-green-700 text-white px-6 py-2.5 rounded-md font-medium flex items-center gap-2 transition-colors shadow-sm"
            >
              Submit Application
              <Check size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Reusable Sub-Components ---

const InputField = ({ label, type = "text", placeholder, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-text-primary mb-1">{label}</label>
    <input 
      type={type} 
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder} 
      className="w-full px-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-banking-primary focus:outline-none text-sm text-text-primary"
    />
  </div>
);

const FileRow = ({ name, size, onRemove, readOnly = false }) => (
  <div className="flex items-center justify-between p-3 border border-border-light rounded-md bg-white">
    <div className="flex items-center gap-3 min-w-0">
      <FileText size={20} className="text-text-secondary shrink-0" />
      <div className="min-w-0">
        <p className="text-sm font-medium text-text-primary truncate">{name}</p>
        <p className="text-xs text-text-muted">{size}</p>
      </div>
    </div>
    {readOnly ? (
      <span className="text-xs font-medium text-text-secondary bg-gray-50 px-2 py-1 rounded border border-border-light shrink-0">
        Selected
      </span>
    ) : (
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs font-medium text-text-secondary bg-gray-50 px-2 py-1 rounded border border-border-light">
          Selected
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="p-1 text-text-muted hover:text-banking-error hover:bg-red-50 rounded transition-colors"
          aria-label={`Remove ${name}`}
        >
          <X size={16} />
        </button>
      </div>
    )}
  </div>
);

const PipelineStep = ({ label, progress, threshold }) => {
  const isComplete = progress > threshold;
  const isCurrent = progress > threshold - 15 && progress <= threshold;
  
  return (
    <div className="flex items-center gap-3">
      {isComplete ? (
        <CheckCircle2 size={20} className="text-banking-success" />
      ) : isCurrent ? (
        <ServerCog size={20} className="text-banking-primary animate-spin" />
      ) : (
        <CircleDashed size={20} className="text-border" />
      )}
      <span className={`text-sm font-medium ${isComplete ? 'text-text-primary' : isCurrent ? 'text-banking-primary' : 'text-text-muted'}`}>
        {label}
      </span>
    </div>
  );
};

export default NewApplication;