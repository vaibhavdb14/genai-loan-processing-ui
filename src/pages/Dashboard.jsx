import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FilePlus, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  LayoutList,
  ArrowUpRight
} from 'lucide-react';

// Mock data to populate the dashboard table
const recentApplications = [
  { id: 'APP-2026-001024', name: 'Arjun Mehta', type: 'Home Loan', amount: '₹75,00,000', status: 'Pending', date: '12 Aug 2026' },
  { id: 'APP-2026-001023', name: 'Priya Sharma', type: 'Personal Loan', amount: '₹5,00,000', status: 'Approved', date: '11 Aug 2026' },
  { id: 'APP-2026-001022', name: 'Rohan Desai', type: 'Business Loan', amount: '₹1,50,00,000', status: 'Declined', date: '10 Aug 2026' },
  { id: 'APP-2026-001021', name: 'Neha Gupta', type: 'Education Loan', amount: '₹20,00,000', status: 'Pending', date: '10 Aug 2026' },
  { id: 'APP-2026-001020', name: 'Vikram Singh', type: 'Vehicle Loan', amount: '₹12,50,000', status: 'Approved', date: '09 Aug 2026' },
];

const Dashboard = () => {
  const navigate = useNavigate();

  // Helper function to apply the strict status colors defined in the Master Prompt
  const getStatusBadge = (status) => {
    switch(status) {
      case 'Approved':
        return <span className="px-2.5 py-1 text-xs font-medium rounded-md border bg-green-50 text-banking-success border-green-200">Approved</span>;
      case 'Pending':
        return <span className="px-2.5 py-1 text-xs font-medium rounded-md border bg-yellow-50 text-banking-warning border-yellow-200">Pending</span>;
      case 'Declined':
        return <span className="px-2.5 py-1 text-xs font-medium rounded-md border bg-red-50 text-banking-error border-red-200">Declined</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-medium rounded-md border bg-gray-50 text-text-secondary border-gray-200">{status}</span>;
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Top Header & Actions */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Good Morning, Manager</h1>
          <p className="text-text-secondary mt-1">Loan Application Overview</p>
        </div>
        <button 
          onClick={() => navigate('/new')}
          className="bg-banking-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-md font-medium flex items-center gap-2 transition-colors shadow-sm"
        >
          <FilePlus size={18} />
          File New Application
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Card */}
        <div className="bg-banking-card p-6 rounded-lg border border-border shadow-sm flex flex-col">
          <div className="flex items-center gap-3 text-text-secondary mb-3">
            <LayoutList size={20} />
            <h3 className="font-medium">Total Applications</h3>
          </div>
          <p className="text-3xl font-bold text-text-primary">1,248</p>
        </div>

        {/* Pending Card */}
        <div className="bg-banking-card p-6 rounded-lg border border-border shadow-sm flex flex-col border-b-4 border-b-banking-warning">
          <div className="flex items-center gap-3 text-text-secondary mb-3">
            <Clock size={20} className="text-banking-warning" />
            <h3 className="font-medium">Pending Review</h3>
          </div>
          <p className="text-3xl font-bold text-text-primary">320</p>
        </div>

        {/* Approved Card */}
        <div className="bg-banking-card p-6 rounded-lg border border-border shadow-sm flex flex-col border-b-4 border-b-banking-success">
          <div className="flex items-center gap-3 text-text-secondary mb-3">
            <CheckCircle2 size={20} className="text-banking-success" />
            <h3 className="font-medium">Approved</h3>
          </div>
          <p className="text-3xl font-bold text-text-primary">814</p>
        </div>

        {/* Declined Card */}
        <div className="bg-banking-card p-6 rounded-lg border border-border shadow-sm flex flex-col border-b-4 border-b-banking-error">
          <div className="flex items-center gap-3 text-text-secondary mb-3">
            <XCircle size={20} className="text-banking-error" />
            <h3 className="font-medium">Declined</h3>
          </div>
          <p className="text-3xl font-bold text-text-primary">114</p>
        </div>
      </div>

      {/* Recent Applications Table Area */}
      <div className="bg-banking-card border border-border rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border-light flex justify-between items-center bg-banking-softBlue/30">
          <h2 className="text-lg font-semibold text-text-primary">Recent Applications</h2>
          <button 
            onClick={() => navigate('/applications')}
            className="text-sm font-medium text-banking-primary hover:underline flex items-center gap-1"
          >
            View All Applications
            <ArrowUpRight size={16} />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-light bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Application No.</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Applicant Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Loan Type</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light text-sm">
              {recentApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-text-primary">{app.id}</td>
                  <td className="px-6 py-4 text-text-secondary">{app.name}</td>
                  <td className="px-6 py-4 text-text-secondary">{app.type}</td>
                  <td className="px-6 py-4 font-medium text-text-primary">{app.amount}</td>
                  <td className="px-6 py-4 text-text-muted">{app.date}</td>
                  <td className="px-6 py-4">
                    {getStatusBadge(app.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-banking-primary font-medium text-sm hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;