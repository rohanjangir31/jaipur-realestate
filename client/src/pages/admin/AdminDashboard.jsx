import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  Calendar,
  Layers,
  MessageSquare,
  Building,
  BedDouble,
  TrendingUp,
  Check,
  X,
  Download,
  Shield,
  UserCheck,
  AlertTriangle,
  Clock,
  Filter,
  FileSpreadsheet,
  ArrowRight,
} from 'lucide-react';
import { adminApi } from '../../services/api';
import { formatINR, formatDate } from '../../utils/formatters';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('listings'); // 'listings' | 'inquiries' | 'audit'
  const [listingModule, setListingModule] = useState('BUY'); // 'BUY' | 'STAY' | 'INVEST'
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listings state
  const [pendingListings, setPendingListings] = useState([]);
  const [listingsLoading, setListingsLoading] = useState(false);
  const [rejectionModalId, setRejectionModalId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  // Inquiries state
  const [inquiries, setInquiries] = useState([]);
  const [inquiriesLoading, setInquiriesLoading] = useState(false);
  const [inquiryTypeFilter, setInquiryTypeFilter] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('');
  const [staffList, setStaffList] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [statusUpdateNote, setStatusUpdateNote] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [newFollowUpDate, setNewFollowUpDate] = useState('');
  const [newAssignedTo, setNewAssignedTo] = useState('');
  const [savingInquiry, setSavingInquiry] = useState(false);

  // Audit Logs state
  const [auditLogs, setAuditLogs] = useState([]);
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditTargetFilter, setAuditTargetFilter] = useState('');
  const [auditTotal, setAuditTotal] = useState(0);

  const [actionMessage, setActionMessage] = useState('');
  const [exporting, setExporting] = useState(false);

  const fetchStats = async () => {
    try {
      const res = await adminApi.getStats();
      setStats(res.data.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const fetchStaff = async () => {
    try {
      const res = await adminApi.getStaff();
      setStaffList(res.data.data.staff || []);
    } catch (err) {
      console.error('Error fetching staff members:', err);
    }
  };

  const fetchPendingListings = async (type = listingModule) => {
    try {
      setListingsLoading(true);
      const res = await adminApi.getPendingListings(type);
      setPendingListings(res.data.data.listings || []);
    } catch (err) {
      console.error('Error fetching pending listings:', err);
    } finally {
      setListingsLoading(false);
    }
  };

  const fetchInquiries = async () => {
    try {
      setInquiriesLoading(true);
      const params = {};
      if (inquiryTypeFilter) params.type = inquiryTypeFilter;
      if (inquiryStatusFilter) params.status = inquiryStatusFilter;
      const res = await adminApi.getInquiries(params);
      setInquiries(res.data.data.inquiries || []);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
    } finally {
      setInquiriesLoading(false);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      setAuditLoading(true);
      const params = { limit: 50 };
      if (auditTargetFilter) params.targetType = auditTargetFilter;
      const res = await adminApi.getAuditLogs(params);
      setAuditLogs(res.data.data.logs || []);
      setAuditTotal(res.data.data.pagination?.total || 0);
    } catch (err) {
      console.error('Error fetching audit logs:', err);
    } finally {
      setAuditLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([fetchStats(), fetchStaff(), fetchPendingListings('BUY'), fetchInquiries(), fetchAuditLogs()]);
      setLoading(false);
    };
    init();
  }, []);

  // Refetch inquiries when filters change
  useEffect(() => {
    if (!loading) {
      fetchInquiries();
    }
  }, [inquiryTypeFilter, inquiryStatusFilter]);

  // Refetch audit logs when target filter changes
  useEffect(() => {
    if (!loading && activeTab === 'audit') {
      fetchAuditLogs();
    }
  }, [auditTargetFilter]);

  const handleModuleSwitch = (mod) => {
    setListingModule(mod);
    fetchPendingListings(mod);
  };

  const handleApproveListing = async (id) => {
    try {
      if (listingModule === 'BUY') {
        await adminApi.reviewBuyProperty(id, {
          status: 'APPROVED',
          titleVerified: true,
        });
      } else if (listingModule === 'STAY') {
        await adminApi.reviewStayListing(id, {
          status: 'APPROVED',
        });
      } else if (listingModule === 'INVEST') {
        await adminApi.reviewInvestmentAsset(id, {
          status: 'APPROVED',
          titleVerified: true,
        });
      }

      setActionMessage(`${listingModule} opportunity approved and published`);
      setPendingListings((prev) => prev.filter((item) => item._id !== id));
      fetchStats();
      fetchAuditLogs();
      setTimeout(() => setActionMessage(''), 3500);
    } catch (err) {
      alert(err.response?.data?.message || 'Error approving listing');
    }
  };

  const handleRejectListing = async () => {
    if (!rejectionModalId) return;
    try {
      const reason = rejectionReason || 'Information insufficient or non-compliant.';
      if (listingModule === 'BUY') {
        await adminApi.reviewBuyProperty(rejectionModalId, {
          status: 'REJECTED',
          rejectionReason: reason,
        });
      } else if (listingModule === 'STAY') {
        await adminApi.reviewStayListing(rejectionModalId, {
          status: 'REJECTED',
          rejectionReason: reason,
        });
      } else if (listingModule === 'INVEST') {
        await adminApi.reviewInvestmentAsset(rejectionModalId, {
          status: 'REJECTED',
          rejectionReason: reason,
        });
      }

      setActionMessage('Listing rejected');
      setPendingListings((prev) => prev.filter((item) => item._id !== rejectionModalId));
      setRejectionModalId(null);
      setRejectionReason('');
      fetchStats();
      fetchAuditLogs();
      setTimeout(() => setActionMessage(''), 3500);
    } catch (err) {
      alert(err.response?.data?.message || 'Error rejecting listing');
    }
  };

  const openInquiryModal = (inq) => {
    setSelectedInquiry(inq);
    setNewStatus(inq.status);
    setNewAssignedTo(inq.assignedTo?._id || inq.assignedTo || '');
    setNewFollowUpDate(
      inq.followUpDate ? new Date(inq.followUpDate).toISOString().split('T')[0] : ''
    );
    setStatusUpdateNote('');
  };

  const handleSaveInquiry = async () => {
    if (!selectedInquiry) return;
    try {
      setSavingInquiry(true);
      await adminApi.updateInquiry(selectedInquiry._id, {
        status: newStatus,
        note: statusUpdateNote,
        followUpDate: newFollowUpDate || null,
        assignedTo: newAssignedTo || null,
      });
      setActionMessage('Inquiry updated successfully');
      setSelectedInquiry(null);
      setStatusUpdateNote('');
      fetchInquiries();
      fetchStats();
      setTimeout(() => setActionMessage(''), 3500);
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating inquiry');
    } finally {
      setSavingInquiry(false);
    }
  };

  const handleExportInquiriesCsv = async () => {
    try {
      setExporting(true);
      const params = {};
      if (inquiryTypeFilter) params.type = inquiryTypeFilter;
      if (inquiryStatusFilter) params.status = inquiryStatusFilter;
      const res = await adminApi.exportInquiriesCsv(params);

      const blob = new Blob([res.data], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `jaipur-inquiries-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      alert('Error exporting inquiries CSV');
    } finally {
      setExporting(false);
    }
  };

  const handleExportAuditLogsCsv = async () => {
    try {
      setExporting(true);
      const params = {};
      if (auditTargetFilter) params.targetType = auditTargetFilter;
      const res = await adminApi.exportAuditLogsCsv(params);

      const blob = new Blob([res.data], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `jaipur-audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      alert('Error exporting audit logs CSV');
    } finally {
      setExporting(false);
    }
  };

  // Follow-up status helper
  const getFollowUpAlert = (followUpDate, status) => {
    if (!followUpDate) return null;
    if (status === 'CLOSED_WON' || status === 'CLOSED_LOST' || status === 'SPAM') {
      return { text: formatDate(followUpDate), badge: 'bg-gray-100 text-gray-600', icon: Calendar };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(followUpDate);
    target.setHours(0, 0, 0, 0);

    const diffDays = Math.round((target - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return {
        text: `Overdue: ${formatDate(followUpDate)}`,
        badge: 'bg-red-100 text-red-800 font-bold',
        icon: AlertTriangle,
      };
    }
    if (diffDays === 0) {
      return {
        text: 'Due Today',
        badge: 'bg-amber-100 text-amber-800 font-bold',
        icon: Clock,
      };
    }
    return {
      text: formatDate(followUpDate),
      badge: 'bg-blue-50 text-blue-700',
      icon: Calendar,
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen py-24 flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">Admin Operations Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">
              Unified governance: Listing review queues, polymorphic inquiry CRM, staff assignment, and audit logs.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge-blue text-xs px-3 py-1">Jaipur Real Estate Admin Core</span>
          </div>
        </div>

        {actionMessage && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg text-sm flex items-center gap-2 shadow-sm animate-fade-in">
            <CheckCircle size={16} />
            <span>{actionMessage}</span>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="card p-5">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pending Buy Properties</div>
            <div className="text-2xl font-bold text-amber-600 mt-2">{stats?.pendingProperties ?? 0}</div>
            <div className="text-xs text-gray-500 mt-1">Awaiting coordinator review</div>
          </div>
          <div className="card p-5">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pending Accommodations</div>
            <div className="text-2xl font-bold text-rose-600 mt-2">{stats?.pendingStays ?? 0}</div>
            <div className="text-xs text-gray-500 mt-1">Awaiting host verification</div>
          </div>
          <div className="card p-5">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pending Investment Assets</div>
            <div className="text-2xl font-bold text-emerald-700 mt-2">{stats?.pendingInvestments ?? 0}</div>
            <div className="text-xs text-gray-500 mt-1">Awaiting financial due diligence</div>
          </div>
          <div className="card p-5">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Inquiries CRM Status</div>
            <div className="text-2xl font-bold text-gray-900 mt-2">{stats?.totalInquiries ?? 0}</div>
            <div className="text-xs text-brand-600 font-medium mt-1">{stats?.newInquiries ?? 0} pending initial outreach</div>
          </div>
        </div>

        {/* Primary Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6 gap-6">
          <button
            onClick={() => setActiveTab('listings')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'listings'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Building size={16} />
            Moderation Queue
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'inquiries'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <MessageSquare size={16} />
            Inquiries CRM ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'audit'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Shield size={16} />
            Audit Trail & Logs ({auditTotal})
          </button>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            TAB 1: Moderation Queue
        ────────────────────────────────────────────────────────────── */}
        {activeTab === 'listings' && (
          <div>
            {/* Sub-toggle: BUY vs STAY vs INVEST */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => handleModuleSwitch('BUY')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
                  listingModule === 'BUY'
                    ? 'bg-brand-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                Buy Properties ({stats?.pendingProperties ?? 0})
              </button>
              <button
                onClick={() => handleModuleSwitch('STAY')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
                  listingModule === 'STAY'
                    ? 'bg-rose-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                Accommodations / Stays ({stats?.pendingStays ?? 0})
              </button>
              <button
                onClick={() => handleModuleSwitch('INVEST')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
                  listingModule === 'INVEST'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                Investment Assets ({stats?.pendingInvestments ?? 0})
              </button>
            </div>

            {listingsLoading ? (
              <div className="py-12 flex justify-center">
                <LoadingSpinner />
              </div>
            ) : pendingListings.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
                <CheckCircle size={40} className="mx-auto text-emerald-500 mb-3" />
                <h3 className="text-base font-semibold text-gray-800">Review Queue is Clear</h3>
                <p className="text-gray-500 text-xs mt-1">
                  No pending {listingModule} listings awaiting moderation.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingListings.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center shadow-sm"
                  >
                    <div className="flex gap-4 items-start">
                      <img
                        src={item.coverImageUrl}
                        alt=""
                        className="w-24 h-24 object-cover rounded-lg bg-gray-100 shrink-0"
                        onError={(e) => {
                          e.target.src =
                            'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="badge-amber text-xs">Pending Verification</span>
                          <span className="text-xs text-gray-500 font-medium">
                            {listingModule === 'BUY'
                              ? item.propertyType
                              : listingModule === 'STAY'
                              ? item.stayType
                              : item.assetClass}
                          </span>
                          <span className="badge-stone text-xs">Direct Verification</span>
                        </div>
                        <h4 className="text-base font-bold text-gray-900">{item.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.address}, {item.locality}, Jaipur ({item.pinCode})
                        </p>
                        <div className="text-xs text-gray-600 mt-2 flex flex-wrap gap-4">
                          {listingModule === 'BUY' ? (
                            <>
                              <span>
                                <strong>Price:</strong> {formatINR(item.price)}
                              </span>
                              <span>
                                <strong>Area:</strong> {item.superAreaSqFt} sqft ({item.bhk} BHK)
                              </span>
                              <span>
                                <strong>Owner:</strong> {item.ownerId?.name || 'Owner'}
                              </span>
                            </>
                          ) : listingModule === 'STAY' ? (
                            <>
                              <span>
                                <strong>Rate:</strong> ₹{item.basePricePerNight?.toLocaleString('en-IN')}/night
                              </span>
                              <span>
                                <strong>Capacity:</strong> {item.maxGuests} Guests ({item.bedrooms} Bed)
                              </span>
                              <span>
                                <strong>Host:</strong> {item.hostId?.name || 'Host'}
                              </span>
                            </>
                          ) : (
                            <>
                              <span>
                                <strong>Ticket:</strong> {formatINR(item.entryTicketSizeINR)}
                              </span>
                              <span>
                                <strong>Total Value:</strong> {formatINR(item.totalAssetValueINR)}
                              </span>
                              {item.historicalRentalYieldPct && (
                                <span>
                                  <strong>Hist. Yield:</strong> {item.historicalRentalYieldPct}%
                                </span>
                              )}
                              <span>
                                <strong>Tenant:</strong> {item.currentTenantProfile || 'N/A'}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 self-end md:self-center shrink-0">
                      <button
                        onClick={() => handleApproveListing(item._id)}
                        className="btn-primary text-xs py-2 px-3 bg-emerald-600 hover:bg-emerald-700"
                      >
                        <Check size={14} /> Approve & Publish
                      </button>
                      <button
                        onClick={() => {
                          setRejectionModalId(item._id);
                          setRejectionReason('');
                        }}
                        className="btn-secondary text-xs py-2 px-3 border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <X size={14} /> Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 2: Inquiries CRM
        ────────────────────────────────────────────────────────────── */}
        {activeTab === 'inquiries' && (
          <div>
            {/* Action Bar: Filters + CSV Export */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                  <Filter size={14} /> Filters:
                </div>
                {/* Vertical Filter */}
                <select
                  value={inquiryTypeFilter}
                  onChange={(e) => setInquiryTypeFilter(e.target.value)}
                  className="input-field text-xs py-1.5 px-3 w-36"
                >
                  <option value="">All Verticals</option>
                  <option value="BUY">Buy Property</option>
                  <option value="STAY">Stays</option>
                  <option value="INVEST">Investment</option>
                </select>

                {/* Status Filter */}
                <select
                  value={inquiryStatusFilter}
                  onChange={(e) => setInquiryStatusFilter(e.target.value)}
                  className="input-field text-xs py-1.5 px-3 w-44"
                >
                  <option value="">All Statuses</option>
                  <option value="NEW">NEW</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="VISIT_SCHEDULED">VISIT_SCHEDULED</option>
                  <option value="PROPOSAL_SENT">PROPOSAL_SENT</option>
                  <option value="IN_NEGOTIATION">IN_NEGOTIATION</option>
                  <option value="CLOSED_WON">CLOSED_WON</option>
                  <option value="CLOSED_LOST">CLOSED_LOST</option>
                  <option value="SPAM">SPAM</option>
                </select>
              </div>

              {/* Export CSV button */}
              <button
                onClick={handleExportInquiriesCsv}
                disabled={exporting}
                className="btn-secondary text-xs py-1.5 px-3.5 flex items-center gap-1.5 border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                <Download size={14} />
                {exporting ? 'Exporting...' : 'Export Inquiries (CSV)'}
              </button>
            </div>

            {inquiriesLoading ? (
              <div className="py-12 flex justify-center">
                <LoadingSpinner />
              </div>
            ) : inquiries.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
                <MessageSquare size={40} className="mx-auto text-gray-400 mb-3" />
                <h3 className="text-base font-semibold text-gray-800">No Inquiries Found</h3>
                <p className="text-gray-500 text-xs mt-1">No inquiry records match the selected filter criteria.</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 text-left text-xs">
                    <thead className="bg-gray-50 text-gray-600 uppercase font-semibold">
                      <tr>
                        <th className="px-4 py-3">Vertical</th>
                        <th className="px-4 py-3">Client Contact</th>
                        <th className="px-4 py-3">Details / Capital / Dates</th>
                        <th className="px-4 py-3">Assigned Staff</th>
                        <th className="px-4 py-3">Follow-up Schedule</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {inquiries.map((inq) => {
                        const alert = getFollowUpAlert(inq.followUpDate, inq.status);
                        const AlertIcon = alert?.icon;

                        return (
                          <tr key={inq._id} className="hover:bg-gray-50 transition-colors">
                            {/* Vertical */}
                            <td className="px-4 py-3">
                              <span
                                className={`badge ${
                                  inq.inquiryType === 'BUY'
                                    ? 'bg-blue-100 text-blue-800'
                                    : inq.inquiryType === 'STAY'
                                    ? 'bg-rose-100 text-rose-800'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {inq.inquiryType}
                              </span>
                            </td>

                            {/* Client Contact */}
                            <td className="px-4 py-3">
                              <div className="font-semibold text-gray-900">{inq.contactName}</div>
                              <div className="text-gray-500">{inq.contactEmail}</div>
                              <div className="text-gray-500">{inq.contactPhone}</div>
                            </td>

                            {/* Details */}
                            <td className="px-4 py-3">
                              <div className="font-medium text-gray-900 line-clamp-1 max-w-xs">
                                {inq.details?.propertyTitle ||
                                  inq.details?.stayTitle ||
                                  inq.details?.assetTitle ||
                                  inq.referenceId?.title ||
                                  'Listing Item'}
                              </div>

                              {inq.inquiryType === 'INVEST' && inq.details?.intendedCapital && (
                                <div className="text-emerald-800 text-[11px] font-semibold mt-0.5">
                                  Capital: {formatINR(inq.details.intendedCapital)} ({inq.details.investmentHorizonYears}y horizon)
                                </div>
                              )}

                              {inq.inquiryType === 'STAY' && inq.details?.checkInDate && (
                                <div className="text-rose-700 text-[11px] font-medium mt-0.5">
                                  {inq.details.checkInDate} ➔ {inq.details.checkOutDate} ({inq.details.guestsCount} guests)
                                </div>
                              )}

                              {inq.inquiryType === 'BUY' && inq.details?.preferredVisitDate && (
                                <div className="text-blue-700 text-[11px] mt-0.5">
                                  Visit: {inq.details.preferredVisitDate}
                                </div>
                              )}
                            </td>

                            {/* Assigned Staff */}
                            <td className="px-4 py-3">
                              {inq.assignedTo ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-800 font-medium">
                                  <UserCheck size={12} className="text-brand-600" />
                                  {inq.assignedTo.name || 'Assigned'}
                                </span>
                              ) : (
                                <span className="text-gray-400 text-xs italic">Unassigned</span>
                              )}
                            </td>

                            {/* Follow-up Schedule & Alert */}
                            <td className="px-4 py-3">
                              {alert ? (
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${alert.badge}`}>
                                  {AlertIcon && <AlertIcon size={12} />}
                                  {alert.text}
                                </span>
                              ) : (
                                <span className="text-gray-400 text-xs">—</span>
                              )}
                            </td>

                            {/* Status */}
                            <td className="px-4 py-3">
                              <span
                                className={`badge ${
                                  inq.status === 'NEW'
                                    ? 'badge-amber'
                                    : inq.status === 'CONTACTED'
                                    ? 'badge-blue'
                                    : inq.status === 'CLOSED_WON'
                                    ? 'badge-green'
                                    : inq.status === 'CLOSED_LOST' || inq.status === 'SPAM'
                                    ? 'badge-red'
                                    : 'bg-indigo-100 text-indigo-800'
                                }`}
                              >
                                {inq.status}
                              </span>
                            </td>

                            {/* Date */}
                            <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                              {formatDate(inq.createdAt)}
                            </td>

                            {/* Actions */}
                            <td className="px-4 py-3 text-right">
                              <button
                                onClick={() => openInquiryModal(inq)}
                                className="btn-ghost text-xs py-1 px-2.5 text-brand-600 hover:text-brand-800 font-medium"
                              >
                                Manage
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 3: Audit Trail & Compliance Logs
        ────────────────────────────────────────────────────────────── */}
        {activeTab === 'audit' && (
          <div>
            {/* Filter and CSV Export */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                  <Filter size={14} /> Filter Entity:
                </div>
                <select
                  value={auditTargetFilter}
                  onChange={(e) => setAuditTargetFilter(e.target.value)}
                  className="input-field text-xs py-1.5 px-3 w-48"
                >
                  <option value="">All Entities</option>
                  <option value="BuyProperty">Buy Properties</option>
                  <option value="StayListing">Accommodations</option>
                  <option value="InvestmentAsset">Investment Assets</option>
                </select>
              </div>

              <button
                onClick={handleExportAuditLogsCsv}
                disabled={exporting}
                className="btn-secondary text-xs py-1.5 px-3.5 flex items-center gap-1.5 border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                <Download size={14} />
                {exporting ? 'Exporting...' : 'Export Audit Logs (CSV)'}
              </button>
            </div>

            {auditLoading ? (
              <div className="py-12 flex justify-center">
                <LoadingSpinner />
              </div>
            ) : auditLogs.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
                <Shield size={40} className="mx-auto text-gray-400 mb-3" />
                <h3 className="text-base font-semibold text-gray-800">No Audit Events Logged</h3>
                <p className="text-gray-500 text-xs mt-1">Listing approvals, rejections, and review actions are recorded here.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {auditLogs.map((log) => {
                  const isApproved = log.action.includes('APPROVED');
                  const isRejected = log.action.includes('REJECTED');

                  return (
                    <div
                      key={log._id}
                      className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:border-gray-300 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-gray-100 pb-3 mb-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`badge text-xs font-semibold ${
                              isApproved
                                ? 'bg-emerald-100 text-emerald-800'
                                : isRejected
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {log.action}
                          </span>
                          <span className="text-xs font-medium text-gray-700">
                            Target: <span className="font-semibold text-gray-900">{log.targetType}</span> ({log.targetId?.slice(-6)})
                          </span>
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(log.createdAt).toLocaleString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        {/* Actor details */}
                        <div>
                          <div className="text-gray-400 font-medium mb-1">Actor (Administrator)</div>
                          <div className="font-semibold text-gray-800">{log.actorId?.name || 'Administrator'}</div>
                          <div className="text-gray-500">{log.actorId?.email || 'System'}</div>
                          <div className="text-[11px] text-gray-400 mt-0.5">Role: {log.actorRole}</div>
                        </div>

                        {/* State diff */}
                        <div className="md:col-span-2">
                          <div className="text-gray-400 font-medium mb-1">Audit State Differential</div>
                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-[11px] font-mono text-gray-700">
                            {log.changes?.before && (
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-gray-500 font-semibold">Before:</span>
                                <span className="bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded border border-amber-200">
                                  status: {log.changes.before.status}
                                </span>
                              </div>
                            )}
                            {log.changes?.after && (
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-gray-500 font-semibold">After:</span>
                                <span
                                  className={`px-1.5 py-0.5 rounded border ${
                                    log.changes.after.status === 'APPROVED'
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                      : 'bg-red-50 text-red-800 border-red-200'
                                  }`}
                                >
                                  status: {log.changes.after.status}
                                </span>
                                {log.changes.after.titleVerified !== undefined && (
                                  <span className="bg-blue-50 text-blue-800 px-1.5 py-0.5 rounded border border-blue-200">
                                    titleVerified: {String(log.changes.after.titleVerified)}
                                  </span>
                                )}
                                {log.changes.after.rejectionReason && (
                                  <span className="text-red-700 italic">
                                    reason: "{log.changes.after.rejectionReason}"
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                          {log.ipAddress && (
                            <div className="text-[10px] text-gray-400 mt-1">
                              Client IP: {log.ipAddress}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            MODAL: Rejection Form
        ────────────────────────────────────────────────────────────── */}
        {rejectionModalId && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg animate-fade-in">
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">Reject Listing</h3>
              <p className="text-xs text-gray-500 mb-4">
                Please provide feedback for rejection so the submitter can rectify their documentation.
              </p>
              <textarea
                rows={3}
                className="input-field text-xs mb-4 resize-none"
                placeholder="e.g. Missing ownership documents, unverified contact information, or incomplete pricing breakdown..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button onClick={() => setRejectionModalId(null)} className="btn-ghost text-xs">
                  Cancel
                </button>
                <button onClick={handleRejectListing} className="btn-primary text-xs bg-red-600 hover:bg-red-700">
                  Confirm Rejection
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            MODAL: Inquiry Detail / Follow-up / Assignment
        ────────────────────────────────────────────────────────────── */}
        {selectedInquiry && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-lg max-h-[90vh] overflow-y-auto animate-fade-in">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-serif font-bold text-gray-900">Inquiry Operations & CRM</h3>
                  <span className="badge-blue text-xs mt-1">{selectedInquiry.inquiryType} Workflow</span>
                </div>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Inquiry details summary */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-xs mb-4 border border-gray-100">
                <div>
                  <strong>Client:</strong> {selectedInquiry.contactName} ({selectedInquiry.contactEmail} | {selectedInquiry.contactPhone})
                </div>

                {selectedInquiry.inquiryType === 'INVEST' && (
                  <>
                    <div>
                      <strong>Proposed Capital:</strong> {formatINR(selectedInquiry.details?.intendedCapital)}
                    </div>
                    <div>
                      <strong>Investment Horizon:</strong> {selectedInquiry.details?.investmentHorizonYears} Years
                    </div>
                    <div>
                      <strong>Asset Reference:</strong> {selectedInquiry.details?.assetTitle} ({selectedInquiry.details?.locality})
                    </div>
                  </>
                )}

                {selectedInquiry.inquiryType === 'STAY' && (
                  <>
                    <div>
                      <strong>Dates:</strong> {selectedInquiry.details?.checkInDate} to {selectedInquiry.details?.checkOutDate} ({selectedInquiry.details?.nights || '—'} nights)
                    </div>
                    <div>
                      <strong>Guests:</strong> {selectedInquiry.details?.guestsCount}
                    </div>
                    {selectedInquiry.details?.estimatedCost && (
                      <div>
                        <strong>Estimated Total:</strong> ₹{selectedInquiry.details.estimatedCost.toLocaleString('en-IN')}
                      </div>
                    )}
                  </>
                )}

                {selectedInquiry.inquiryType === 'BUY' && (
                  <>
                    <div>
                      <strong>Property:</strong> {selectedInquiry.details?.propertyTitle || 'Listing'} ({selectedInquiry.details?.locality})
                    </div>
                    {selectedInquiry.details?.preferredVisitDate && (
                      <div>
                        <strong>Preferred Visit Date:</strong> {selectedInquiry.details.preferredVisitDate}
                      </div>
                    )}
                  </>
                )}

                {selectedInquiry.message && (
                  <div>
                    <strong>Message:</strong> "{selectedInquiry.message}"
                  </div>
                )}
              </div>

              {/* Activity Timeline */}
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-gray-700 mb-2">CRM Activity Timeline</h4>
                <div className="space-y-2 max-h-36 overflow-y-auto border border-gray-100 rounded-lg p-3 bg-white">
                  {selectedInquiry.timeline?.length > 0 ? (
                    selectedInquiry.timeline.map((entry, idx) => (
                      <div key={idx} className="text-xs border-b border-gray-50 pb-1.5 last:border-0 last:pb-0">
                        <div className="flex justify-between text-gray-500 text-[11px]">
                          <span className="font-semibold text-gray-700">{entry.status}</span>
                          <span>{formatDate(entry.timestamp)}</span>
                        </div>
                        {entry.note && <p className="text-gray-600 mt-0.5">{entry.note}</p>}
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-gray-400 italic">No notes recorded yet.</div>
                  )}
                </div>
              </div>

              {/* Edit Follow-up & Assignment */}
              <div className="space-y-3 pt-2 border-t border-gray-100">
                {/* Status */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Update Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="input-field text-xs py-2"
                  >
                    <option value="NEW">NEW</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="VISIT_SCHEDULED">VISIT_SCHEDULED</option>
                    <option value="PROPOSAL_SENT">PROPOSAL_SENT / DILIGENCE_SHARED</option>
                    <option value="IN_NEGOTIATION">IN_NEGOTIATION</option>
                    <option value="CLOSED_WON">CLOSED_WON</option>
                    <option value="CLOSED_LOST">CLOSED_LOST</option>
                    <option value="SPAM">SPAM</option>
                  </select>
                </div>

                {/* Staff Assignment */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Assign to Team Member / Agent</label>
                  <select
                    value={newAssignedTo}
                    onChange={(e) => setNewAssignedTo(e.target.value)}
                    className="input-field text-xs py-2"
                  >
                    <option value="">Unassigned</option>
                    {staffList.map((st) => (
                      <option key={st._id} value={st._id}>
                        {st.name} ({st.roles.join(', ')}) - {st.email}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Follow-up Date */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Schedule Follow-up Date</label>
                  <input
                    type="date"
                    value={newFollowUpDate}
                    onChange={(e) => setNewFollowUpDate(e.target.value)}
                    className="input-field text-xs py-2"
                  />
                </div>

                {/* Note */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Add Timeline Note</label>
                  <input
                    type="text"
                    value={statusUpdateNote}
                    onChange={(e) => setStatusUpdateNote(e.target.value)}
                    placeholder="e.g. Called client; scheduled site inspection for Thursday 3 PM"
                    className="input-field text-xs"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3">
                  <button onClick={() => setSelectedInquiry(null)} className="btn-ghost text-xs">
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveInquiry}
                    disabled={savingInquiry}
                    className="btn-primary text-xs"
                  >
                    {savingInquiry ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
