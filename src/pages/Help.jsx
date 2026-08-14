import React from 'react';
import { 
  FilePlus, 
  UploadCloud, 
  BrainCircuit, 
  FileSearch, 
  UserCheck, 
  ArrowDown,
  Info,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

const Help = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      
      <div>
        <h1 className="text-2xl font-bold text-text-primary">System Help & Process Guide</h1>
        <p className="text-text-secondary mt-1">Reference guide for loan processing workflows and AI analysis.</p>
      </div>

      {/* Process Flow Section */}
      <div className="bg-banking-card border border-border rounded-lg shadow-sm p-8">
        <h2 className="text-lg font-semibold text-text-primary mb-6 flex items-center gap-2">
          <Info size={20} className="text-banking-primary" />
          Standard Application Workflow
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto">
          <FlowStep icon={<FilePlus size={24} />} title="1. New Application" desc="Enter applicant & loan details" />
          <FlowArrow />
          <FlowStep icon={<UploadCloud size={24} />} title="2. Upload Docs" desc="Provide required evidence" />
          <FlowArrow />
          <FlowStep icon={<BrainCircuit size={24} />} title="3. AI Processing" desc="Extraction & RAG Summary" />
          <FlowArrow />
          <FlowStep icon={<FileSearch size={24} />} title="4. Verification" desc="Cross-document checks" />
          <FlowArrow />
          <FlowStep icon={<UserCheck size={24} />} title="5. Manager Review" desc="Final decision & auth" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Status Definitions */}
        <div className="bg-banking-card border border-border rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Understanding Statuses</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="px-2.5 py-1 text-xs font-medium rounded-md border bg-yellow-50 text-banking-warning border-yellow-200 shrink-0">Pending</span>
              <p className="text-sm text-text-secondary">Application has been processed by AI and is awaiting human underwriter review.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="px-2.5 py-1 text-xs font-medium rounded-md border bg-green-50 text-banking-success border-green-200 shrink-0">Approved</span>
              <p className="text-sm text-text-secondary">Application was successfully reviewed and approved by an authorized manager.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="px-2.5 py-1 text-xs font-medium rounded-md border bg-red-50 text-banking-error border-red-200 shrink-0">Declined</span>
              <p className="text-sm text-text-secondary">Application was rejected. Can be revoked by administrators in special cases.</p>
            </div>
          </div>
        </div>

        {/* Risk Levels */}
        <div className="bg-banking-card border border-border rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">AI Risk Levels</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center gap-1 text-banking-success text-sm font-medium shrink-0 w-24">
                <div className="w-2 h-2 rounded-full bg-banking-success"></div> Low
              </div>
              <p className="text-sm text-text-secondary">All documents verify perfectly. Income aligns with requested loan amounts.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex items-center gap-1 text-banking-warning text-sm font-medium shrink-0 w-24">
                <div className="w-2 h-2 rounded-full bg-banking-warning"></div> Medium
              </div>
              <p className="text-sm text-text-secondary">Minor discrepancies found (e.g., spelling differences, old addresses). Requires careful review.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex items-center gap-1 text-banking-error text-sm font-medium shrink-0 w-24">
                <AlertTriangle size={14} /> High
              </div>
              <p className="text-sm text-text-secondary">Major discrepancies detected (e.g., income mismatch, suspected document tampering).</p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="md:col-span-2 bg-banking-card border border-border rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-1">Does the AI make the final approval decision?</h3>
              <p className="text-sm text-text-secondary">No. The RAG model is strictly a decision-support system. It extracts data, verifies consistency, and summarizes risk. The final decision always belongs to the bank manager.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-1">How do I handle a "Medium Risk" discrepancy?</h3>
              <p className="text-sm text-text-secondary">Navigate to the "Cross-Document Verification" panel on the application details page. Click "View Evidence" to see exactly which documents conflict and make a manual judgment.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-1">Why am I asked for a verification code?</h3>
              <p className="text-sm text-text-secondary">Approving, declining, or revoking a loan are sensitive actions. The system requires re-authentication to ensure the logged-in manager is actively authorizing the action.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-1">What documents are mandatory?</h3>
              <p className="text-sm text-text-secondary">At minimum, every application requires an Identity Proof (PAN/Aadhaar) and Income Proof (Salary Slip/ITR). Specific loans will require additional asset documentation.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// Reusable micro-components for the visual flow
const FlowStep = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center text-center w-36">
    <div className="w-14 h-14 bg-banking-softBlue text-banking-primary rounded-full flex items-center justify-center mb-3 border border-border-light shadow-sm">
      {icon}
    </div>
    <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
    <p className="text-xs text-text-muted mt-1 leading-tight">{desc}</p>
  </div>
);

const FlowArrow = () => (
  <div className="hidden md:block text-border-light px-2">
    <div className="w-8 h-0.5 bg-border-light relative">
      <div className="absolute -right-1 -top-1 w-2 h-2 border-t-2 border-r-2 border-border-light transform rotate-45"></div>
    </div>
  </div>
);

export default Help;