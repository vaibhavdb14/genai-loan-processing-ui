import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert,
  ShieldCheck,
  X
} from 'lucide-react';

const ApplicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Modal state for Re-authentication
  const [authModal, setAuthModal] = useState({ isOpen: false, action: null });
  const [authCode, setAuthCode] = useState('');

  const handleFinalAction = (e) => {
    e.preventDefault();
    // In a real app, verify code/password here, then update status
    setAuthModal({ isOpen: false, action: null });
    navigate('/applications');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center gap-4 mb-2">
        <button 
          onClick={() => navigate('/applications')}
          className="p-2 hover:bg-gray-100 rounded-full text-text-secondary transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-3">
            Application: {id || 'APP-2026-001025'}
            <span className="px-2.5 py-1 text-xs font-medium rounded-md border bg-yellow-50 text-banking-warning border-yellow-200">
              Pending Review
            </span>
          </h1>
          <p className="text-text-secondary mt-1">Submitted on 13 Aug 2026</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Main Details & AI Analysis */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* SECTION 1: User Details */}
          <div className="bg-banking-card border border-border rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              <User size={20} className="text-banking-primary" />
              Applicant Details
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4 text-sm">
              <div>
                <p className="text-text-secondary mb-1">Full Name</p>
                <p className="font-semibold text-text-primary">Rajesh Kumar</p>
              </div>
              <div>
                <p className="text-text-secondary mb-1">Loan Type</p>
                <p className="font-semibold text-text-primary">Personal Loan</p>
              </div>
              <div>
                <p className="text-text-secondary mb-1">Requested Amount</p>
                <p className="font-semibold text-text-primary">₹8,50,000</p>
              </div>
              <div>
                <p className="text-text-secondary mb-1">PAN Number</p>
                <p className="font-semibold text-text-primary">ABCDE1234F</p>
              </div>
              <div>
                <p className="text-text-secondary mb-1">Monthly Income</p>
                <p className="font-semibold text-text-primary">₹80,000</p>
              </div>
            </div>
          </div>

          {/* SECTION 2: AI / RAG GENERATED SUMMARY */}
          <div className="bg-banking-card border border-banking-info/30 rounded-lg shadow-sm p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-banking-info"></div>
            <h2 className="text-lg font-semibold text-banking-info mb-4 flex items-center gap-2">
              <Sparkles size={20} />
              AI-GENERATED LOAN SUMMARY
            </h2>
            <div className="bg-banking-softBlue/20 p-4 rounded-md text-sm text-text-primary leading-relaxed mb-4 border border-border-light">
              <p className="mb-3">The submitted documents are mostly consistent. The applicant's income and employment information were successfully verified across the Salary Slip and Bank Statement.</p>
              <p><strong>Note:</strong> A minor address mismatch was detected between the Identity Proof and the Bank Statement, requiring manual review.</p>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1 bg-white border border-border-light p-3 rounded-md">
                <p className="text-xs text-text-secondary mb-1">Overall Risk</p>
                <p className="font-semibold text-banking-warning flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-banking-warning"></div> LOW–MEDIUM
                </p>
              </div>
              <div className="flex-1 bg-white border border-border-light p-3 rounded-md">
                <p className="text-xs text-text-secondary mb-1">AI Confidence Score</p>
                <p className="font-semibold text-text-primary text-lg">87%</p>
              </div>
            </div>
          </div>

          {/* SECTION 4: Verification Details */}
          <div className="bg-banking-card border border-border rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Cross-Document Verification</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-border">
                    <th className="p-3 font-medium text-text-secondary">FIELD</th>
                    <th className="p-3 font-medium text-text-secondary">SALARY SLIP</th>
                    <th className="p-3 font-medium text-text-secondary">BANK STATEMENT</th>
                    <th className="p-3 font-medium text-text-secondary">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                  <tr>
                    <td className="p-3 font-medium">Monthly Income</td>
                    <td className="p-3">₹80,000</td>
                    <td className="p-3">₹80,000</td>
                    <td className="p-3 text-banking-success flex items-center gap-1"><CheckCircle2 size={16}/> Match</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Employer Name</td>
                    <td className="p-3">ABC Tech Pvt Ltd</td>
                    <td className="p-3">ABC Tech Pvt Ltd</td>
                    <td className="p-3 text-banking-success flex items-center gap-1"><CheckCircle2 size={16}/> Match</td>
                  </tr>
                  <tr className="bg-red-50/50">
                    <td className="p-3 font-medium text-banking-error">Current Address</td>
                    <td className="p-3">Navi Mumbai, 400706</td>
                    <td className="p-3">Pune, 411001</td>
                    <td className="p-3 text-banking-error flex items-center gap-1"><AlertTriangle size={16}/> Mismatch</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Risk, Documents & Final Actions */}
        <div className="space-y-6">
          
          {/* SECTION 5: Risk Panel */}
          <div className="bg-banking-card border border-border rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              <ShieldAlert size={20} className="text-banking-warning" />
              Risk Exceptions
            </h2>
            <div className="space-y-4">
              <div className="p-3 border border-red-200 bg-red-50 rounded-md">
                <p className="text-sm font-semibold text-banking-error flex items-center gap-2 mb-1">
                  <AlertTriangle size={16} /> Address Discrepancy
                </p>
                <p className="text-xs text-text-secondary mb-2">Mismatch detected between ID Proof and Bank Statement headers.</p>
                <button className="text-xs font-medium text-banking-primary hover:underline">View Evidence</button>
              </div>
            </div>
          </div>

          {/* SECTION 3: Uploaded Documents */}
          <div className="bg-banking-card border border-border rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Uploaded Documents</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-border-light rounded-md bg-gray-50">
                <div className="flex items-center gap-3">
                  <FileText size={18} className="text-text-secondary" />
                  <span className="text-sm font-medium">Salary_Slip.pdf</span>
                </div>
                <button className="text-xs font-medium text-banking-primary hover:underline">View</button>
              </div>
              <div className="flex items-center justify-between p-3 border border-border-light rounded-md bg-gray-50">
                <div className="flex items-center gap-3">
                  <FileText size={18} className="text-text-secondary" />
                  <span className="text-sm font-medium">Bank_Statement.pdf</span>
                </div>
                <button className="text-xs font-medium text-banking-primary hover:underline">View</button>
              </div>
            </div>
          </div>

          {/* SECTION 6: Final Action */}
          <div className="bg-banking-card border border-border rounded-lg shadow-sm p-6">
            <h2 className="text-sm font-semibold text-text-secondary mb-4 uppercase tracking-wider">Manager Decision</h2>
            <div className="space-y-3">
              <button 
                onClick={() => setAuthModal({ isOpen: true, action: 'Approve' })}
                className="w-full bg-banking-success hover:bg-green-700 text-white py-2.5 rounded-md font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <CheckCircle2 size={18} /> APPROVE APPLICATION
              </button>
              <button 
                onClick={() => setAuthModal({ isOpen: true, action: 'Decline' })}
                className="w-full bg-white border-2 border-banking-error text-banking-error hover:bg-red-50 py-2.5 rounded-md font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <X size={18} /> DECLINE APPLICATION
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* RE-AUTHENTICATION MODAL */}
      {authModal.isOpen && (
        <div className="fixed inset-0 bg-banking-navy/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-banking-card w-full max-w-md rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-border-light flex justify-between items-center bg-gray-50">
              <h3 className="font-semibold text-text-primary flex items-center gap-2">
                <ShieldCheck size={18} className="text-banking-primary" />
                Additional Verification Required
              </h3>
              <button onClick={() => setAuthModal({ isOpen: false, action: null })} className="text-text-muted hover:text-text-primary">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleFinalAction} className="p-6">
              <p className="text-sm text-text-secondary mb-4">
                You are about to <strong className={authModal.action === 'Approve' ? 'text-banking-success' : 'text-banking-error'}>{authModal.action.toUpperCase()}</strong> application {id}. This sensitive action requires re-authentication.
              </p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-text-primary mb-1">Enter Verification Code / Password</label>
                <input
                  type="password"
                  required
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                  placeholder="******"
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-banking-primary text-sm"
                />
              </div>

              <div className="flex gap-3 justify-end">
                <button 
                  type="button"
                  onClick={() => setAuthModal({ isOpen: false, action: null })}
                  className="px-4 py-2 text-sm font-medium text-text-secondary bg-white border border-border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className={`px-4 py-2 text-sm font-medium text-white rounded-md flex items-center gap-2 ${
                    authModal.action === 'Approve' ? 'bg-banking-success hover:bg-green-700' : 'bg-banking-error hover:bg-red-700'
                  }`}
                >
                  {authModal.action === 'Approve' ? <CheckCircle2 size={16} /> : <X size={16} />}
                  Confirm {authModal.action}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default ApplicationDetail;