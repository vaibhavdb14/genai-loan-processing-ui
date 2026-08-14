import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronRight, AlertTriangle } from 'lucide-react';

const mockApplications = [
  { id: 'APP-2026-001025', name: 'Rajesh Kumar', type: 'Personal Loan', amount: '₹8,50,000', date: '13 Aug 2026', status: 'Pending', risk: 'Medium' },
  { id: 'APP-2026-001024', name: 'Arjun Mehta', type: 'Home Loan', amount: '₹75,00,000', date: '12 Aug 2026', status: 'Pending', risk: 'Low' },
  { id: 'APP-2026-001023', name: 'Priya Sharma', type: 'Personal Loan', amount: '₹5,00,000', date: '11 Aug 2026', status: 'Approved', risk: 'Low' },
  { id: 'APP-2026-001022', name: 'Rohan Desai', type: 'Business Loan', amount: '₹1,50,00,000', date: '10 Aug 2026', status: 'Declined', risk: 'High' },
  { id: 'APP-2026-001021', name: 'Neha Gupta', type: 'Education Loan', amount: '₹20,00,000', date: '10 Aug 2026', status: 'Pending', risk: 'Low' },
  { id: 'APP-2026-001020', name: 'Vikram Singh', type: 'Vehicle Loan', amount: '₹12,50,000', date: '09 Aug 2026', status: 'Approved', risk: 'Low' },
];

const Applications = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Pending');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = ['Pending', 'Approved', 'Declined'];

  const filteredApps = mockApplications.filter(app => 
    app.status === activeTab && 
    (app.name.toLowerCase().includes(searchTerm.toLowerCase()) || app.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Approved':
        return <span className="px-2.5 py-1 text-xs font-medium rounded-md border bg-green-50 text-banking-success border-green-200">Approved</span>;
      case 'Pending':
        return <span className="px-2.5 py-1 text-xs font-medium rounded-md border bg-yellow-50 text-banking-warning border-yellow-200">Pending Review</span>;
      case 'Declined':
        return <span className="px-2.5 py-1 text-xs font-medium rounded-md border bg-red-50 text-banking-error border-red-200">Declined</span>;
      default:
        return null;
    }
  };

  const getRiskIndicator = (risk) => {
    switch(risk) {
      case 'Low':
        return <span className="flex items-center gap-1 text-banking-success text-sm font-medium"><div className="w-2 h-2 rounded-full bg-banking-success"></div> Low</span>;
      case 'Medium':
        return <span className="flex items-center gap-1 text-banking-warning text-sm font-medium"><div className="w-2 h-2 rounded-full bg-banking-warning"></div> Medium</span>;
      case 'High':
        return <span className="flex items-center gap-1 text-banking-error text-sm font-medium"><AlertTriangle size={14} /> High</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto h-full flex flex-col">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Applications</h1>
          <p className="text-text-secondary mt-1">Manage and review all loan applications.</p>
        </div>
      </div>

      <div className="bg-banking-card border border-border rounded-lg shadow-sm flex-1 flex flex-col min-h-[500px]">
        
        {/* Tab Navigation & Toolbar */}
        <div className="px-2 pt-2 border-b border-border-light flex justify-between items-center bg-gray-50/50 rounded-t-lg">
          <div className="flex gap-1 px-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab 
                    ? 'border-banking-primary text-banking-primary bg-white rounded-t-md' 
                    : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-gray-100/50 rounded-t-md'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 pr-4 pb-2">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input 
                type="text" 
                placeholder="Search applicant or ID..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-1.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-banking-primary focus:outline-none w-64"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-md text-sm font-medium text-text-secondary hover:bg-gray-50 transition-colors">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        {/* Applications Table */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-light bg-white">
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">App ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Applicant Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Loan Type</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Risk Level</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light text-sm bg-white">
              {filteredApps.length > 0 ? (
                filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-banking-softBlue/20 transition-colors group">
                    <td className="px-6 py-4 font-medium text-text-primary">{app.id}</td>
                    <td className="px-6 py-4 font-medium text-text-primary">{app.name}</td>
                    <td className="px-6 py-4 text-text-secondary">{app.type}</td>
                    <td className="px-6 py-4 font-medium text-text-primary">{app.amount}</td>
                    <td className="px-6 py-4 text-text-muted">{app.date}</td>
                    <td className="px-6 py-4">{getRiskIndicator(app.risk)}</td>
                    <td className="px-6 py-4">{getStatusBadge(app.status)}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => navigate(`/applications/${app.id}`)}
                        className="text-banking-primary font-medium text-sm hover:underline inline-flex items-center gap-1"
                      >
                        View Details <ChevronRight size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-text-muted">
                    No {activeTab.toLowerCase()} applications found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="px-6 py-4 border-t border-border-light bg-gray-50 flex justify-between items-center rounded-b-lg">
          <span className="text-sm text-text-secondary">Showing {filteredApps.length} entries</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-border rounded-md text-sm bg-white text-text-muted cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 border border-border rounded-md text-sm bg-white text-text-secondary hover:bg-gray-50">Next</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Applications;