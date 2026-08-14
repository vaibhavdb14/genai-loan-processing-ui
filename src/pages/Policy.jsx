// import React from 'react';
import { ShieldAlert, Plus, History, FileText } from 'lucide-react';

const mockPolicies = [
  { id: 'POL-001', name: 'Income Verification Policy', version: '2.1', updated: '12 Aug 2026', author: 'System Admin', status: 'Active' },
  { id: 'POL-002', name: 'Risk Assessment Thresholds', version: '1.4', updated: '05 Aug 2026', author: 'Risk Dept', status: 'Active' },
  { id: 'POL-003', name: 'Acceptable Document Formats', version: '3.0', updated: '22 Jul 2026', author: 'IT Security', status: 'Active' },
  { id: 'POL-004', name: 'Emergency Decline Protocols', version: '1.1', updated: '10 Jan 2026', author: 'Compliance', status: 'Under Review' },
];

const Policy = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Policy & Rules Management</h1>
          <p className="text-text-secondary mt-1">Manage automated verification rules and compliance policies.</p>
        </div>
        <button className="bg-banking-primary hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors shadow-sm">
          <Plus size={18} />
          Add New Policy
        </button>
      </div>

      {/* Info Banner */}
      <div className="bg-banking-info/10 border border-banking-info/30 p-4 rounded-md flex gap-3 text-sm text-text-primary">
        <ShieldAlert size={20} className="text-banking-info shrink-0" />
        <p>
          <strong>Notice:</strong> Modifying active policies directly impacts the AI/RAG verification pipeline. All changes are strictly audited and require secondary authorization.
        </p>
      </div>

      {/* Policy Table */}
      <div className="bg-banking-card border border-border rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border-light bg-gray-50/50 flex items-center gap-2">
          <FileText size={18} className="text-text-secondary" />
          <h2 className="text-lg font-semibold text-text-primary">Active Policies</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-light bg-white">
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Policy ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Policy Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Version</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Updated By</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light text-sm bg-white">
              {mockPolicies.map((policy) => (
                <tr key={policy.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-text-primary">{policy.id}</td>
                  <td className="px-6 py-4 font-medium text-text-primary">{policy.name}</td>
                  <td className="px-6 py-4 text-text-secondary">v{policy.version}</td>
                  <td className="px-6 py-4 text-text-secondary">{policy.updated}</td>
                  <td className="px-6 py-4 text-text-secondary">{policy.author}</td>
                  <td className="px-6 py-4">
                    {policy.status === 'Active' ? (
                      <span className="px-2.5 py-1 text-xs font-medium rounded-md border bg-green-50 text-banking-success border-green-200">Active</span>
                    ) : (
                      <span className="px-2.5 py-1 text-xs font-medium rounded-md border bg-yellow-50 text-banking-warning border-yellow-200">{policy.status}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-text-secondary hover:text-banking-primary transition-colors" title="View Version History">
                      <History size={18} />
                    </button>
                    <button className="text-banking-primary font-medium text-sm hover:underline">
                      Edit
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

export default Policy;