import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  UploadCloud, 
  FileText, 
  ChevronRight, 
  ChevronLeft,
  ServerCog,
  CheckCircle2,
  CircleDashed
} from 'lucide-react';

const NewApplication = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  
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
              
              <div className="border-2 border-dashed border-border-light bg-banking-softBlue/20 rounded-lg p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-banking-softBlue/40 transition-colors">
                <UploadCloud size={48} className="text-banking-primary mb-4" />
                <h3 className="font-semibold text-text-primary text-lg mb-1">Drag & Drop Documents</h3>
                <p className="text-text-secondary text-sm mb-4">Supported formats: PDF, JPG, PNG (Max 10MB each)</p>
                <button className="bg-banking-card border border-border text-text-primary px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50">
                  Browse Files
                </button>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium text-text-primary mb-3">Uploaded Documents (3/5 Required)</h4>
                <div className="space-y-2">
                  <FileRow name="Salary_Slip_Last_3_Months.pdf" type="Income Proof" size="1.2 MB" />
                  <FileRow name="Bank_Statement_6_Months.pdf" type="Financials" size="3.4 MB" />
                  <FileRow name="PAN_Card_Copy.jpg" type="Identity Proof" size="840 KB" />
                </div>
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

              <div className="flex items-center gap-2 text-banking-success font-medium bg-green-50 p-4 rounded-md border border-green-200 text-sm">
                <CheckCircle2 size={18} />
                Completeness Status: All Required Documents Uploaded
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

const FileRow = ({ name, type, size }) => (
  <div className="flex items-center justify-between p-3 border border-border-light rounded-md bg-white">
    <div className="flex items-center gap-3">
      <FileText size={20} className="text-text-secondary" />
      <div>
        <p className="text-sm font-medium text-text-primary">{name}</p>
        <p className="text-xs text-text-muted">{type} • {size}</p>
      </div>
    </div>
    <span className="text-xs font-medium text-banking-success bg-green-50 px-2 py-1 rounded border border-green-200 flex items-center gap-1">
      <Check size={12} /> Uploaded
    </span>
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