'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Settings,
  Layers,
  FileText,
  BookOpen,
  Inbox,
  Users,
  MessageSquare,
  HelpCircle,
  Puzzle,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Search,
  Save,
  ShieldAlert,
  Loader2,
  CheckCircle2,
  Eye,
  KeyRound,
} from 'lucide-react';
import {
  SiteSettings,
  Service,
  CaseStudy,
  BlogPost,
  TeamMember,
  Testimonial,
  FAQItem,
  CustomSection,
  LeadSubmission,
} from '@/types';

type ActiveTab =
  | 'overview'
  | 'settings'
  | 'services'
  | 'caseStudies'
  | 'blogs'
  | 'leads'
  | 'sections'
  | 'team'
  | 'testimonials'
  | 'faqs'
  | 'security';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [currentUser, setCurrentUser] = useState<{ username: string; email: string; role: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Core Data States
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [sections, setSections] = useState<CustomSection[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);

  // Modal Editing States
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [editingCaseStudy, setEditingCaseStudy] = useState<Partial<CaseStudy> | null>(null);
  const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);
  const [editingLead, setEditingLead] = useState<LeadSubmission | null>(null);
  const [editingSection, setEditingSection] = useState<Partial<CustomSection> | null>(null);
  const [editingTeam, setEditingTeam] = useState<Partial<TeamMember> | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [editingFaq, setEditingFaq] = useState<Partial<FAQItem> | null>(null);

  // Password change state
  const [passwordState, setPasswordState] = useState({ currentPassword: '', newPassword: '', confirm: '' });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Check auth & load data
  const loadAllData = async () => {
    try {
      const [
        authRes,
        settingsRes,
        servicesRes,
        caseStudiesRes,
        blogsRes,
        leadsRes,
        sectionsRes,
        teamRes,
        testimonialsRes,
        faqsRes,
      ] = await Promise.all([
        fetch('/api/auth/me'),
        fetch('/api/admin/settings').then((r) => r.json()).catch(() => ({})),
        fetch('/api/admin/services').then((r) => r.json()).catch(() => ({})),
        fetch('/api/admin/case-studies').then((r) => r.json()).catch(() => ({})),
        fetch('/api/admin/blogs').then((r) => r.json()).catch(() => ({})),
        fetch('/api/leads').then((r) => r.json()).catch(() => ({})),
        fetch('/api/admin/custom-sections').then((r) => r.json()).catch(() => ({})),
        fetch('/api/admin/team').then((r) => r.json()).catch(() => ({})),
        fetch('/api/admin/testimonials').then((r) => r.json()).catch(() => ({})),
        fetch('/api/admin/faqs').then((r) => r.json()).catch(() => ({})),
      ]);

      if (!authRes.ok) {
        router.push('/admin/login');
        return;
      }
      const authData = await authRes.json();
      if (authData.user) {
        setCurrentUser(authData.user);
      }

      if (settingsRes.settings) setSettings(settingsRes.settings);
      if (servicesRes.services) setServices(servicesRes.services);
      if (caseStudiesRes.caseStudies) setCaseStudies(caseStudiesRes.caseStudies);
      if (blogsRes.blogs) setBlogs(blogsRes.blogs);
      if (leadsRes.leads) setLeads(leadsRes.leads);
      if (sectionsRes.sections) setSections(sectionsRes.sections);
      if (teamRes.team) setTeam(teamRes.team);
      if (testimonialsRes.testimonials) setTestimonials(testimonialsRes.testimonials);
      if (faqsRes.faqs) setFaqs(faqsRes.faqs);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };


  // --- Settings Save ---
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        showToast('Site settings updated & live!');
      }
    } finally {
      setSaving(false);
    }
  };

  // --- Services CRUD ---
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    setSaving(true);
    try {
      const isNew = !editingService.id;
      const url = isNew ? '/api/admin/services' : `/api/admin/services/${editingService.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingService),
      });

      if (res.ok) {
        showToast(isNew ? 'New service created!' : 'Service updated successfully!');
        setEditingService(null);
        const ref = await fetch('/api/admin/services').then((r) => r.json());
        setServices(ref.services || []);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    const res = await fetch(`/api/admin/services/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setServices(services.filter((s) => s.id !== id));
      showToast('Service deleted');
    }
  };

  // --- Case Studies CRUD ---
  const handleSaveCaseStudy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCaseStudy) return;
    setSaving(true);
    try {
      const isNew = !editingCaseStudy.id;
      const url = isNew ? '/api/admin/case-studies' : `/api/admin/case-studies/${editingCaseStudy.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCaseStudy),
      });

      if (res.ok) {
        showToast(isNew ? 'Case study created!' : 'Case study updated!');
        setEditingCaseStudy(null);
        const ref = await fetch('/api/admin/case-studies').then((r) => r.json());
        setCaseStudies(ref.caseStudies || []);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCaseStudy = async (id: string) => {
    if (!confirm('Delete this case study?')) return;
    const res = await fetch(`/api/admin/case-studies/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setCaseStudies(caseStudies.filter((cs) => cs.id !== id));
      showToast('Case study deleted');
    }
  };

  // --- Blogs CRUD ---
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;
    setSaving(true);
    try {
      const isNew = !editingBlog.id;
      const url = isNew ? '/api/admin/blogs' : `/api/admin/blogs/${editingBlog.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingBlog),
      });

      if (res.ok) {
        showToast(isNew ? 'Article created!' : 'Article updated!');
        setEditingBlog(null);
        const ref = await fetch('/api/admin/blogs').then((r) => r.json());
        setBlogs(ref.blogs || []);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Delete this blog post?')) return;
    const res = await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setBlogs(blogs.filter((b) => b.id !== id));
      showToast('Blog deleted');
    }
  };

  // --- Leads Status Update ---
  const handleUpdateLeadStatus = async (id: string, status: LeadSubmission['status']) => {
    const res = await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setLeads(leads.map((l) => (l.id === id ? { ...l, status } : l)));
      showToast(`Lead marked as ${status}`);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Remove this lead inquiry?')) return;
    const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setLeads(leads.filter((l) => l.id !== id));
      showToast('Lead removed');
    }
  };

  // --- Custom Sections CRUD ---
  const handleSaveSection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSection) return;
    setSaving(true);
    try {
      const isNew = !editingSection.id;
      const url = isNew ? '/api/admin/custom-sections' : `/api/admin/custom-sections/${editingSection.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingSection),
      });

      if (res.ok) {
        showToast('Section saved!');
        setEditingSection(null);
        const ref = await fetch('/api/admin/custom-sections').then((r) => r.json());
        setSections(ref.sections || []);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSection = async (id: string) => {
    if (!confirm('Delete this custom section?')) return;
    const res = await fetch(`/api/admin/custom-sections/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setSections(sections.filter((s) => s.id !== id));
      showToast('Section deleted');
    }
  };

  // --- Team CRUD ---
  const handleSaveTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeam) return;
    setSaving(true);
    try {
      const isNew = !editingTeam.id;
      const url = isNew ? '/api/admin/team' : `/api/admin/team/${editingTeam.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingTeam),
      });

      if (res.ok) {
        showToast('Team member saved!');
        setEditingTeam(null);
        const ref = await fetch('/api/admin/team').then((r) => r.json());
        setTeam(ref.team || []);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTeam = async (id: string) => {
    if (!confirm('Delete this team member?')) return;
    const res = await fetch(`/api/admin/team/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setTeam(team.filter((t) => t.id !== id));
      showToast('Team member removed');
    }
  };

  // --- Testimonials CRUD ---
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial) return;
    setSaving(true);
    try {
      const isNew = !editingTestimonial.id;
      const url = isNew ? '/api/admin/testimonials' : `/api/admin/testimonials/${editingTestimonial.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingTestimonial),
      });

      if (res.ok) {
        showToast('Testimonial saved!');
        setEditingTestimonial(null);
        const ref = await fetch('/api/admin/testimonials').then((r) => r.json());
        setTestimonials(ref.testimonials || []);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setTestimonials(testimonials.filter((t) => t.id !== id));
      showToast('Testimonial removed');
    }
  };

  // --- FAQs CRUD ---
  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;
    setSaving(true);
    try {
      const isNew = !editingFaq.id;
      const url = isNew ? '/api/admin/faqs' : `/api/admin/faqs/${editingFaq.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingFaq),
      });

      if (res.ok) {
        showToast('FAQ saved!');
        setEditingFaq(null);
        const ref = await fetch('/api/admin/faqs').then((r) => r.json());
        setFaqs(ref.faqs || []);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteFaq = async (id: string) => {
    if (!confirm('Delete this FAQ?')) return;
    const res = await fetch(`/api/admin/faqs/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setFaqs(faqs.filter((f) => f.id !== id));
      showToast('FAQ removed');
    }
  };

  // --- Password Change ---
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordState.newPassword !== passwordState.confirm) {
      alert('New passwords do not match');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/auth/me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordState.currentPassword,
          newPassword: passwordState.newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to update password');
      } else {
        showToast('Password updated successfully!');
        setPasswordState({ currentPassword: '', newPassword: '', confirm: '' });
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#090a0d', color: '#ffffff' }}>
        <div style={{ textAlign: 'center' }}>
          <Loader2 size={36} className="animate-spin" color="var(--accent-teal)" style={{ margin: '0 auto 16px' }} />
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Loading Consilio CMS Engine...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            background: 'var(--accent-teal)',
            color: '#0c0e12',
            padding: '12px 24px',
            borderRadius: 'var(--radius-md)',
            fontWeight: 700,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            zIndex: 9999,
            animation: 'slideUp 0.3s ease-out',
          }}
        >
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Left Sidebar */}
      <aside className="admin-sidebar">
        {/* Brand header */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #ffffff 0%, var(--accent-teal) 100%)',
              color: '#0c0e12',
              fontWeight: 800,
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            C
          </div>
          <div>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.1 }}>
              Consilio CMS
            </h2>
            <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-teal)', fontFamily: 'var(--font-mono)' }}>
              Master Control
            </span>
          </div>
        </div>

        {/* Navigation list */}
        <nav style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 2, flex: 1, overflowY: 'auto' }}>
          <button
            onClick={() => setActiveTab('overview')}
            className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
          >
            <LayoutDashboard size={18} />
            Overview
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`admin-nav-item ${activeTab === 'leads' ? 'active' : ''}`}
          >
            <Inbox size={18} />
            Leads & Inquiries
            {leads.filter((l) => l.status === 'new').length > 0 && (
              <span
                style={{
                  marginLeft: 'auto',
                  padding: '2px 7px',
                  borderRadius: '9999px',
                  background: 'var(--accent-teal)',
                  color: '#0c0e12',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                }}
              >
                {leads.filter((l) => l.status === 'new').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`admin-nav-item ${activeTab === 'services' ? 'active' : ''}`}
          >
            <Layers size={18} />
            Services ({services.length})
          </button>

          <button
            onClick={() => setActiveTab('caseStudies')}
            className={`admin-nav-item ${activeTab === 'caseStudies' ? 'active' : ''}`}
          >
            <FileText size={18} />
            Case Studies ({caseStudies.length})
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className={`admin-nav-item ${activeTab === 'blogs' ? 'active' : ''}`}
          >
            <BookOpen size={18} />
            Blog Articles ({blogs.length})
          </button>

          <button
            onClick={() => setActiveTab('sections')}
            className={`admin-nav-item ${activeTab === 'sections' ? 'active' : ''}`}
          >
            <Puzzle size={18} />
            Page Sections ({sections.length})
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
          >
            <Settings size={18} />
            Branding & Settings
          </button>

          <button
            onClick={() => setActiveTab('team')}
            className={`admin-nav-item ${activeTab === 'team' ? 'active' : ''}`}
          >
            <Users size={18} />
            Team Members ({team.length})
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`admin-nav-item ${activeTab === 'testimonials' ? 'active' : ''}`}
          >
            <MessageSquare size={18} />
            Testimonials ({testimonials.length})
          </button>

          <button
            onClick={() => setActiveTab('faqs')}
            className={`admin-nav-item ${activeTab === 'faqs' ? 'active' : ''}`}
          >
            <HelpCircle size={18} />
            FAQs ({faqs.length})
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`admin-nav-item ${activeTab === 'security' ? 'active' : ''}`}
          >
            <KeyRound size={18} />
            Admin Security
          </button>
        </nav>

        {/* Bottom actions */}
        <div style={{ padding: '16px 14px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: 10 }}>

          <button
            onClick={handleLogout}
            className="btn btn-danger btn-sm"
            style={{ width: '100%', fontSize: '0.785rem', justifyContent: 'flex-start' }}
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main">
        {/* Top Header */}
        <header className="admin-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Logged in as <strong style={{ color: '#ffffff' }}>{currentUser?.username || currentUser?.email || 'admin'}</strong>
            </span>
            <span
              style={{
                padding: '3px 8px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(20, 243, 193, 0.1)',
                color: 'var(--accent-teal)',
                fontSize: '0.7rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {currentUser?.role || 'Superadmin'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Link
              href="/"
              target="_blank"
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <ExternalLink size={14} />
              View Live Website
            </Link>
          </div>
        </header>

        {/* Tab Contents */}
        <div style={{ padding: '36px 32px' }}>
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <div style={{ marginBottom: 32 }}>
                <h1 className="heading-1" style={{ color: '#ffffff', marginBottom: 8 }}>
                  Executive CMS Dashboard
                </h1>
                <p className="text-secondary" style={{ fontSize: '0.95rem' }}>
                  Manage and customize all pages, services, case studies, blogs, and client leads in real time.
                </p>
              </div>

              {/* Stat Cards */}
              <div className="grid-4" style={{ marginBottom: 40 }}>
                <div className="card-editorial" style={{ padding: '24px' }}>
                  <span className="text-muted" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Active Services
                  </span>
                  <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--accent-teal)', fontFamily: 'var(--font-mono)', marginTop: 8 }}>
                    {services.length}
                  </div>
                  <span style={{ fontSize: '0.785rem', color: 'var(--text-secondary)' }}>
                    {services.filter((s) => s.featured).length} Featured on Home
                  </span>
                </div>

                <div className="card-editorial" style={{ padding: '24px' }}>
                  <span className="text-muted" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Client Case Studies
                  </span>
                  <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)', marginTop: 8 }}>
                    {caseStudies.length}
                  </div>
                  <span style={{ fontSize: '0.785rem', color: 'var(--text-secondary)' }}>
                    Published Transformations
                  </span>
                </div>

                <div className="card-editorial" style={{ padding: '24px' }}>
                  <span className="text-muted" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Published Insights
                  </span>
                  <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)', marginTop: 8 }}>
                    {blogs.filter((b) => b.published).length}
                  </div>
                  <span style={{ fontSize: '0.785rem', color: 'var(--text-secondary)' }}>
                    {blogs.length - blogs.filter((b) => b.published).length} Drafts
                  </span>
                </div>

                <div className="card-editorial" style={{ padding: '24px' }}>
                  <span className="text-muted" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    New Inquiries
                  </span>
                  <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--accent-teal)', fontFamily: 'var(--font-mono)', marginTop: 8 }}>
                    {leads.filter((l) => l.status === 'new').length}
                  </div>
                  <span style={{ fontSize: '0.785rem', color: 'var(--text-secondary)' }}>
                    {leads.length} Total Submissions
                  </span>
                </div>
              </div>

              {/* Recent Leads Table */}
              <div className="card-editorial" style={{ padding: '28px', marginBottom: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div>
                    <h3 className="heading-3" style={{ color: '#ffffff', marginBottom: 4 }}>
                      Recent Inquiries & Consultations
                    </h3>
                    <p className="text-secondary" style={{ fontSize: '0.85rem' }}>
                      Prospective clients who booked a consultation or submitted a project brief.
                    </p>
                  </div>
                  <button onClick={() => setActiveTab('leads')} className="btn btn-secondary btn-sm">
                    View All Leads &rarr;
                  </button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Client Name</th>
                        <th>Company</th>
                        <th>Email & Phone</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.slice(0, 5).map((lead) => (
                        <tr key={lead.id}>
                          <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </td>
                          <td style={{ fontWeight: 600 }}>{lead.name}</td>
                          <td style={{ color: 'var(--text-secondary)' }}>{lead.company || '—'}</td>
                          <td>
                            <div style={{ fontSize: '0.85rem' }}>{lead.email}</div>
                            {lead.phone && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{lead.phone}</div>}
                          </td>
                          <td>
                            <span
                              style={{
                                padding: '3px 10px',
                                borderRadius: 'var(--radius-full)',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                background:
                                  lead.status === 'new'
                                    ? 'rgba(20, 243, 193, 0.15)'
                                    : lead.status === 'in_progress'
                                    ? 'rgba(245, 158, 11, 0.15)'
                                    : 'rgba(255, 255, 255, 0.08)',
                                color:
                                  lead.status === 'new'
                                    ? 'var(--accent-teal)'
                                    : lead.status === 'in_progress'
                                    ? '#f59e0b'
                                    : 'var(--text-secondary)',
                              }}
                            >
                              {lead.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td>
                            <button
                              onClick={() => setEditingLead(lead)}
                              className="btn btn-secondary btn-sm"
                              style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                            >
                              Review Message
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LEADS INBOX */}
          {activeTab === 'leads' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                <div>
                  <h1 className="heading-1" style={{ color: '#ffffff', marginBottom: 6 }}>
                    Client Inquiries & Consultations ({leads.length})
                  </h1>
                  <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
                    Leads submitted from the Contact page and Consultation Booking Modals.
                  </p>
                </div>
              </div>

              <div className="card-editorial" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Contact Info</th>
                        <th>Objective / Message</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((lead) => (
                        <tr key={lead.id}>
                          <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </td>
                          <td style={{ fontWeight: 700, color: '#ffffff' }}>{lead.name}</td>
                          <td>{lead.company || '—'}</td>
                          <td>
                            <div>{lead.email}</div>
                            {lead.phone && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{lead.phone}</div>}
                          </td>
                          <td style={{ maxWidth: 280 }}>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {lead.message}
                            </p>
                          </td>
                          <td>
                            <select
                              value={lead.status}
                              onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as LeadSubmission['status'])}
                              className="form-select"
                              style={{ padding: '5px 8px', fontSize: '0.8rem', borderRadius: 'var(--radius-sm)' }}
                            >
                              <option value="new">New</option>
                              <option value="in_progress">In Progress</option>
                              <option value="contacted">Contacted</option>
                              <option value="archived">Archived</option>
                            </select>
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: 6 }}>
                              <button
                                onClick={() => setEditingLead(lead)}
                                className="btn btn-secondary btn-sm"
                                title="Read complete message"
                              >
                                <Eye size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="btn btn-danger btn-sm"
                                title="Delete lead"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SERVICES MANAGER */}
          {activeTab === 'services' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                <div>
                  <h1 className="heading-1" style={{ color: '#ffffff', marginBottom: 6 }}>
                    Advisory Services ({services.length})
                  </h1>
                  <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
                    Create, edit, or remove advisory service practices. All changes reflect live on the website.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingService({
                      title: '',
                      slug: '',
                      category: 'Strategy & Growth',
                      iconName: 'TrendingUp',
                      shortDescription: '',
                      fullOverview: '',
                      deliverables: ['Deliverable 1', 'Deliverable 2'],
                      metrics: [{ value: '+30%', label: 'Key Result' }],
                      featured: true,
                      order: services.length + 1,
                    })
                  }
                  className="btn btn-teal"
                >
                  <Plus size={16} />
                  Add New Service
                </button>
              </div>

              <div className="card-editorial" style={{ padding: 0, overflow: 'hidden' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title & Slug</th>
                      <th>Category</th>
                      <th>Short Description</th>
                      <th>Featured</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((srv) => (
                      <tr key={srv.id}>
                        <td>
                          <div style={{ fontWeight: 700, color: '#ffffff' }}>{srv.title}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                            /services/{srv.slug}
                          </div>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.85rem', color: 'var(--accent-teal)' }}>{srv.category}</span>
                        </td>
                        <td style={{ maxWidth: 320 }}>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            {srv.shortDescription}
                          </span>
                        </td>
                        <td>
                          {srv.featured ? (
                            <span style={{ color: 'var(--accent-teal)', fontWeight: 700, fontSize: '0.8rem' }}>✓ Yes</span>
                          ) : (
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>No</span>
                          )}
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button
                              onClick={() => setEditingService(srv)}
                              className="btn btn-secondary btn-sm"
                            >
                              <Edit2 size={14} /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteService(srv.id)}
                              className="btn btn-danger btn-sm"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: CASE STUDIES MANAGER */}
          {activeTab === 'caseStudies' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                <div>
                  <h1 className="heading-1" style={{ color: '#ffffff', marginBottom: 6 }}>
                    Case Studies ({caseStudies.length})
                  </h1>
                  <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
                    Document client transformations, challenges, methodologies, metrics, and executive quotes.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingCaseStudy({
                      title: '',
                      slug: '',
                      client: '',
                      industry: 'Technology',
                      serviceCategory: 'Strategic Advisory',
                      location: 'Austin, Texas',
                      summary: '',
                      challenge: '',
                      approach: '',
                      outcome: '',
                      keyMetric: '+40%',
                      metricLabel: 'Revenue Lift',
                      metrics: [{ value: '+40%', label: 'Revenue Lift' }],
                      clientQuote: '',
                      clientAuthor: '',
                      clientRole: 'CEO',
                      featured: true,
                      order: caseStudies.length + 1,
                    })
                  }
                  className="btn btn-teal"
                >
                  <Plus size={16} />
                  Add New Case Study
                </button>
              </div>

              <div className="card-editorial" style={{ padding: 0, overflow: 'hidden' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Client & Industry</th>
                      <th>Title & Slug</th>
                      <th>Key Metric</th>
                      <th>Quote Author</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {caseStudies.map((cs) => (
                      <tr key={cs.id}>
                        <td>
                          <div style={{ fontWeight: 700, color: '#ffffff' }}>{cs.client}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--accent-teal)' }}>{cs.industry}</div>
                        </td>
                        <td style={{ maxWidth: 300 }}>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{cs.title}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                            /case-studies/{cs.slug}
                          </div>
                        </td>
                        <td>
                          <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-teal)', fontFamily: 'var(--font-mono)' }}>
                            {cs.keyMetric}
                          </span>
                        </td>
                        <td>
                          <div style={{ fontSize: '0.85rem' }}>{cs.clientAuthor}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cs.clientRole}</div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button
                              onClick={() => setEditingCaseStudy(cs)}
                              className="btn btn-secondary btn-sm"
                            >
                              <Edit2 size={14} /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteCaseStudy(cs.id)}
                              className="btn btn-danger btn-sm"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: BLOGS MANAGER */}
          {activeTab === 'blogs' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                <div>
                  <h1 className="heading-1" style={{ color: '#ffffff', marginBottom: 6 }}>
                    Blog Posts & Insights ({blogs.length})
                  </h1>
                  <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
                    Publish strategic articles, industry analysis, and executive think pieces.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingBlog({
                      title: '',
                      slug: '',
                      excerpt: '',
                      content: 'Write your insights here in standard paragraphs or ### Headings...',
                      category: 'Leadership',
                      author: 'Jay Bothroyd',
                      authorRole: 'Managing Director',
                      readTime: '5 min read',
                      publishedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                      published: true,
                      featured: false,
                      tags: ['Strategy', 'Growth'],
                    })
                  }
                  className="btn btn-teal"
                >
                  <Plus size={16} />
                  Write New Article
                </button>
              </div>

              <div className="card-editorial" style={{ padding: 0, overflow: 'hidden' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title & Slug</th>
                      <th>Category</th>
                      <th>Author</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs.map((b) => (
                      <tr key={b.id}>
                        <td style={{ maxWidth: 340 }}>
                          <div style={{ fontWeight: 700, color: '#ffffff' }}>{b.title}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                            /blogs/{b.slug}
                          </div>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.85rem', color: 'var(--accent-teal)' }}>{b.category}</span>
                        </td>
                        <td>
                          <div style={{ fontSize: '0.85rem' }}>{b.author}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{b.publishedDate}</div>
                        </td>
                        <td>
                          <span
                            style={{
                              padding: '2px 8px',
                              borderRadius: 'var(--radius-full)',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              background: b.published ? 'rgba(20, 243, 193, 0.15)' : 'rgba(255, 255, 255, 0.08)',
                              color: b.published ? 'var(--accent-teal)' : 'var(--text-muted)',
                            }}
                          >
                            {b.published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button
                              onClick={() => setEditingBlog(b)}
                              className="btn btn-secondary btn-sm"
                            >
                              <Edit2 size={14} /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteBlog(b.id)}
                              className="btn btn-danger btn-sm"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: CUSTOM SECTIONS & PAGE BUILDER */}
          {activeTab === 'sections' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                <div>
                  <h1 className="heading-1" style={{ color: '#ffffff', marginBottom: 6 }}>
                    Dynamic Page Sections ({sections.length})
                  </h1>
                  <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
                    Control layout blocks, comparison tables, principles, and custom promotional banners across the site.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingSection({
                      key: 'custom_section_' + Date.now(),
                      title: 'New Content Section',
                      subtitle: 'Add descriptive text here...',
                      badge: 'New Feature',
                      page: 'home',
                      contentJson: '[]',
                      enabled: true,
                      order: sections.length + 1,
                    })
                  }
                  className="btn btn-teal"
                >
                  <Plus size={16} />
                  Add Section
                </button>
              </div>

              <div className="card-editorial" style={{ padding: 0, overflow: 'hidden' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Key & Title</th>
                      <th>Target Page</th>
                      <th>Subtitle / Description</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sections.map((sec) => (
                      <tr key={sec.id}>
                        <td>
                          <div style={{ fontWeight: 700, color: '#ffffff' }}>{sec.title}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--accent-teal)', fontFamily: 'var(--font-mono)' }}>
                            #{sec.key}
                          </div>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                            {sec.page}
                          </span>
                        </td>
                        <td style={{ maxWidth: 300 }}>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            {sec.subtitle}
                          </span>
                        </td>
                        <td>
                          <span style={{ color: sec.enabled ? 'var(--accent-teal)' : 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700 }}>
                            {sec.enabled ? 'Enabled' : 'Disabled'}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button onClick={() => setEditingSection(sec)} className="btn btn-secondary btn-sm">
                              <Edit2 size={14} /> Edit
                            </button>
                            <button onClick={() => handleDeleteSection(sec.id)} className="btn btn-danger btn-sm">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: BRANDING & SITE SETTINGS */}
          {activeTab === 'settings' && settings && (
            <div style={{ maxWidth: 880 }}>
              <div style={{ marginBottom: 28 }}>
                <h1 className="heading-1" style={{ color: '#ffffff', marginBottom: 6 }}>
                  Site Settings & Global Branding
                </h1>
                <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
                  Update global metadata, hero messages, top announcement strip, contact details, and footer text.
                </p>
              </div>

              <form onSubmit={handleSaveSettings}>
                {/* Branding card */}
                <div className="card-editorial" style={{ marginBottom: 24, padding: '28px' }}>
                  <h3 className="heading-3" style={{ marginBottom: 20, color: '#ffffff' }}>
                    Brand Identity
                  </h3>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Brand Name</label>
                      <input
                        type="text"
                        className="form-input"
                        value={settings.brandName}
                        onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Website Meta Title</label>
                      <input
                        type="text"
                        className="form-input"
                        value={settings.siteTitle}
                        onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Brand Tagline</label>
                    <input
                      type="text"
                      className="form-input"
                      value={settings.tagline}
                      onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Company Description</label>
                    <textarea
                      rows={2}
                      className="form-textarea"
                      value={settings.description}
                      onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                    />
                  </div>
                </div>

                {/* Hero Banner Controls */}
                <div className="card-editorial" style={{ marginBottom: 24, padding: '28px' }}>
                  <h3 className="heading-3" style={{ marginBottom: 20, color: '#ffffff' }}>
                    Hero Banner Configuration
                  </h3>
                  <div className="form-group">
                    <label className="form-label">Hero Badge Text</label>
                    <input
                      type="text"
                      className="form-input"
                      value={settings.heroBadge}
                      onChange={(e) => setSettings({ ...settings, heroBadge: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Hero Main Title (H1)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={settings.heroTitle}
                      onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Hero Subtitle</label>
                    <textarea
                      rows={3}
                      className="form-textarea"
                      value={settings.heroSubtitle}
                      onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                    />
                  </div>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Hero Button Text</label>
                      <input
                        type="text"
                        className="form-input"
                        value={settings.heroCtaText}
                        onChange={(e) => setSettings({ ...settings, heroCtaText: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Hero Button Target Link</label>
                      <input
                        type="text"
                        className="form-input"
                        value={settings.heroCtaLink}
                        onChange={(e) => setSettings({ ...settings, heroCtaLink: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Announcement Strip */}
                <div className="card-editorial" style={{ marginBottom: 24, padding: '28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <h3 className="heading-3" style={{ color: '#ffffff', margin: 0 }}>
                      Top Announcement Banner
                    </h3>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'var(--accent-teal)', fontSize: '0.85rem' }}>
                      <input
                        type="checkbox"
                        checked={settings.announcementEnabled}
                        onChange={(e) => setSettings({ ...settings, announcementEnabled: e.target.checked })}
                      />
                      Enable Announcement
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Announcement Message</label>
                    <input
                      type="text"
                      className="form-input"
                      value={settings.announcementText}
                      onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                    />
                  </div>
                </div>

                {/* Contact & Socials */}
                <div className="card-editorial" style={{ marginBottom: 32, padding: '28px' }}>
                  <h3 className="heading-3" style={{ marginBottom: 20, color: '#ffffff' }}>
                    Contact Info & Social Links
                  </h3>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Contact Email</label>
                      <input
                        type="email"
                        className="form-input"
                        value={settings.contactEmail}
                        onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Hotline</label>
                      <input
                        type="text"
                        className="form-input"
                        value={settings.phone}
                        onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Office Address</label>
                    <input
                      type="text"
                      className="form-input"
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    />
                  </div>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">LinkedIn URL</label>
                      <input
                        type="url"
                        className="form-input"
                        value={settings.linkedinUrl}
                        onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Twitter / X URL</label>
                      <input
                        type="url"
                        className="form-input"
                        value={settings.twitterUrl}
                        onChange={(e) => setSettings({ ...settings, twitterUrl: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={saving} className="btn btn-teal btn-lg" style={{ minWidth: 200 }}>
                  {saving ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Save & Publish Settings
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* TAB 8: TEAM MANAGER */}
          {activeTab === 'team' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                <div>
                  <h1 className="heading-1" style={{ color: '#ffffff', marginBottom: 6 }}>
                    Executive Leadership Team ({team.length})
                  </h1>
                  <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
                    Manage the partners and practice leaders shown on the About page.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingTeam({
                      name: '',
                      role: '',
                      bio: '',
                      order: team.length + 1,
                    })
                  }
                  className="btn btn-teal"
                >
                  <Plus size={16} />
                  Add Team Member
                </button>
              </div>

              <div className="grid-3">
                {team.map((member) => (
                  <div key={member.id} className="card-editorial">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                        {member.name}
                      </h3>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button onClick={() => setEditingTeam(member)} className="btn btn-secondary btn-sm" style={{ padding: 6 }}>
                          <Edit2 size={13} />
                        </button>
                        <button onClick={() => handleDeleteTeam(member.id)} className="btn btn-danger btn-sm" style={{ padding: 6 }}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--accent-teal)', fontWeight: 600, display: 'block', marginBottom: 12 }}>
                      {member.role}
                    </span>
                    <p className="text-secondary" style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
                      {member.bio}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                <div>
                  <h1 className="heading-1" style={{ color: '#ffffff', marginBottom: 6 }}>
                    Client Testimonials ({testimonials.length})
                  </h1>
                  <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
                    Manage client quotes, executive reviews, and star ratings.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingTestimonial({
                      quote: '',
                      clientName: '',
                      clientRole: '',
                      company: '',
                      rating: 5,
                      featured: true,
                      order: testimonials.length + 1,
                    })
                  }
                  className="btn btn-teal"
                >
                  <Plus size={16} />
                  Add Testimonial
                </button>
              </div>

              <div className="grid-2">
                {testimonials.map((t) => (
                  <div key={t.id} className="card-editorial">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                      <span style={{ color: '#f59e0b', fontSize: '0.9rem' }}>{'★'.repeat(t.rating)}</span>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button onClick={() => setEditingTestimonial(t)} className="btn btn-secondary btn-sm" style={{ padding: 6 }}>
                          <Edit2 size={13} />
                        </button>
                        <button onClick={() => handleDeleteTestimonial(t.id)} className="btn btn-danger btn-sm" style={{ padding: 6 }}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                    <p style={{ fontStyle: 'italic', color: '#ffffff', fontSize: '0.95rem', marginBottom: 16 }}>
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-teal)' }}>
                      {t.clientName} — <span style={{ color: 'var(--text-secondary)' }}>{t.clientRole}, {t.company}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: FAQS */}
          {activeTab === 'faqs' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                <div>
                  <h1 className="heading-1" style={{ color: '#ffffff', marginBottom: 6 }}>
                    Frequently Asked Questions ({faqs.length})
                  </h1>
                  <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
                    Manage questions and answers displayed in accordion sections.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingFaq({
                      question: '',
                      answer: '',
                      category: 'General',
                      order: faqs.length + 1,
                    })
                  }
                  className="btn btn-teal"
                >
                  <Plus size={16} />
                  Add FAQ
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {faqs.map((faq) => (
                  <div key={faq.id} className="card-editorial" style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                        {faq.question}
                      </h4>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button onClick={() => setEditingFaq(faq)} className="btn btn-secondary btn-sm" style={{ padding: '4px 8px' }}>
                          <Edit2 size={13} />
                        </button>
                        <button onClick={() => handleDeleteFaq(faq.id)} className="btn btn-danger btn-sm" style={{ padding: '4px 8px' }}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                    <p className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 11: SECURITY */}
          {activeTab === 'security' && (
            <div style={{ maxWidth: 640 }}>
              <div style={{ marginBottom: 28 }}>
                <h1 className="heading-1" style={{ color: '#ffffff', marginBottom: 6 }}>
                  Admin Security & Credentials
                </h1>
                <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
                  Manage and monitor administrative access to the Consilio CMS.
                </p>
              </div>

              <div className="card-editorial" style={{ padding: '32px', marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '10px',
                      background: 'rgba(20, 243, 193, 0.1)',
                      border: '1px solid var(--accent-teal)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-teal)',
                    }}
                  >
                    <ShieldAlert size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                      Environment-Secured Credentials
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Server-side authentication enforced via environment variables
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    marginBottom: 20,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Active Username</span>
                    <strong style={{ fontSize: '0.85rem', color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                      {currentUser?.username || 'admin'}
                    </strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Account Role</span>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--accent-teal)' }}>
                      {currentUser?.role || 'Superadmin'}
                    </strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Credential Storage</span>
                    <strong style={{ fontSize: '0.85rem', color: '#a3e635' }}>
                      Server Environment (.env.local)
                    </strong>
                  </div>
                </div>

                <div
                  style={{
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(20, 243, 193, 0.05)',
                    border: '1px solid rgba(20, 243, 193, 0.2)',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  <div style={{ fontWeight: 600, color: 'var(--accent-teal)', marginBottom: 6 }}>
                    How to update admin login credentials:
                  </div>
                  <p style={{ margin: 0 }}>
                    To change the admin username or password, update <code style={{ color: '#ffffff', background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: 4 }}>ADMIN_USERNAME</code> and <code style={{ color: '#ffffff', background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: 4 }}>ADMIN_PASSWORD</code> in your <code style={{ color: '#ffffff', background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: 4 }}>.env.local</code> file. These variables are strictly server-side and never exposed to the client.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- EDIT SERVICE MODAL --- */}
      {editingService && (
        <div className="modal-backdrop" onClick={() => setEditingService(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 720 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 className="heading-2" style={{ color: '#ffffff' }}>
                {editingService.id ? 'Edit Service Practice' : 'Create New Service'}
              </h3>
              <button onClick={() => setEditingService(null)} style={{ cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveService}>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Service Title *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={editingService.title || ''}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = editingService.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      setEditingService({ ...editingService, title, slug });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">URL Slug *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={editingService.slug || ''}
                    onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editingService.category || ''}
                    onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Lucide Icon Name</label>
                  <select
                    className="form-select"
                    value={editingService.iconName || 'TrendingUp'}
                    onChange={(e) => setEditingService({ ...editingService, iconName: e.target.value })}
                  >
                    <option value="TrendingUp">TrendingUp (Growth)</option>
                    <option value="DollarSign">DollarSign (Finance)</option>
                    <option value="Compass">Compass (Strategy)</option>
                    <option value="Cpu">Cpu (Operations)</option>
                    <option value="Globe">Globe (Expansion)</option>
                    <option value="Users">Users (Leadership)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Short Tagline / Description *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={editingService.shortDescription || ''}
                  onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Full Practice Overview</label>
                <textarea
                  rows={4}
                  className="form-textarea"
                  value={editingService.fullOverview || ''}
                  onChange={(e) => setEditingService({ ...editingService, fullOverview: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Deliverables (one per line)</label>
                <textarea
                  rows={4}
                  className="form-textarea"
                  value={(editingService.deliverables || []).join('\n')}
                  onChange={(e) => setEditingService({ ...editingService, deliverables: e.target.value.split('\n').filter(Boolean) })}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 24 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#ffffff' }}>
                  <input
                    type="checkbox"
                    checked={editingService.featured ?? true}
                    onChange={(e) => setEditingService({ ...editingService, featured: e.target.checked })}
                  />
                  Feature on Homepage
                </label>

                <div style={{ display: 'flex', gap: 12 }}>
                  <button type="button" onClick={() => setEditingService(null)} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="btn btn-teal">
                    {saving ? 'Saving...' : 'Save Service'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- EDIT CASE STUDY MODAL --- */}
      {editingCaseStudy && (
        <div className="modal-backdrop" onClick={() => setEditingCaseStudy(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 760 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 className="heading-2" style={{ color: '#ffffff' }}>
                {editingCaseStudy.id ? 'Edit Case Study' : 'Create Case Study'}
              </h3>
              <button onClick={() => setEditingCaseStudy(null)} style={{ cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveCaseStudy}>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Client Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={editingCaseStudy.client || ''}
                    onChange={(e) => setEditingCaseStudy({ ...editingCaseStudy, client: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Industry</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editingCaseStudy.industry || ''}
                    onChange={(e) => setEditingCaseStudy({ ...editingCaseStudy, industry: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Title *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={editingCaseStudy.title || ''}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = editingCaseStudy.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    setEditingCaseStudy({ ...editingCaseStudy, title, slug });
                  }}
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Slug</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={editingCaseStudy.slug || ''}
                    onChange={(e) => setEditingCaseStudy({ ...editingCaseStudy, slug: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Primary Metric (e.g. +48%)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editingCaseStudy.keyMetric || ''}
                    onChange={(e) => setEditingCaseStudy({ ...editingCaseStudy, keyMetric: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Summary</label>
                <textarea
                  rows={2}
                  className="form-textarea"
                  value={editingCaseStudy.summary || ''}
                  onChange={(e) => setEditingCaseStudy({ ...editingCaseStudy, summary: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phase I: The Challenge</label>
                <textarea
                  rows={3}
                  className="form-textarea"
                  value={editingCaseStudy.challenge || ''}
                  onChange={(e) => setEditingCaseStudy({ ...editingCaseStudy, challenge: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phase II: The Approach</label>
                <textarea
                  rows={3}
                  className="form-textarea"
                  value={editingCaseStudy.approach || ''}
                  onChange={(e) => setEditingCaseStudy({ ...editingCaseStudy, approach: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phase III: The Commercial Outcome</label>
                <textarea
                  rows={3}
                  className="form-textarea"
                  value={editingCaseStudy.outcome || ''}
                  onChange={(e) => setEditingCaseStudy({ ...editingCaseStudy, outcome: e.target.value })}
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Executive Quote</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editingCaseStudy.clientQuote || ''}
                    onChange={(e) => setEditingCaseStudy({ ...editingCaseStudy, clientQuote: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Quote Author & Role</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Olivia Brooks (CEO)"
                    value={`${editingCaseStudy.clientAuthor || ''} ${editingCaseStudy.clientRole ? `(${editingCaseStudy.clientRole})` : ''}`}
                    onChange={(e) => {
                      const parts = e.target.value.split('(');
                      const author = parts[0]?.trim() || '';
                      const role = parts[1]?.replace(')', '').trim() || '';
                      setEditingCaseStudy({ ...editingCaseStudy, clientAuthor: author, clientRole: role });
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
                <button type="button" onClick={() => setEditingCaseStudy(null)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn btn-teal">
                  {saving ? 'Saving...' : 'Save Case Study'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- EDIT BLOG MODAL --- */}
      {editingBlog && (
        <div className="modal-backdrop" onClick={() => setEditingBlog(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 800 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 className="heading-2" style={{ color: '#ffffff' }}>
                {editingBlog.id ? 'Edit Article' : 'Write New Article'}
              </h3>
              <button onClick={() => setEditingBlog(null)} style={{ cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveBlog}>
              <div className="form-group">
                <label className="form-label">Article Title *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={editingBlog.title || ''}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = editingBlog.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    setEditingBlog({ ...editingBlog, title, slug });
                  }}
                />
              </div>

              <div className="grid-3">
                <div className="form-group">
                  <label className="form-label">Slug</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={editingBlog.slug || ''}
                    onChange={(e) => setEditingBlog({ ...editingBlog, slug: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editingBlog.category || 'Leadership'}
                    onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Estimated Read Time</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editingBlog.readTime || '5 min read'}
                    onChange={(e) => setEditingBlog({ ...editingBlog, readTime: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Excerpt / Teaser</label>
                <textarea
                  rows={2}
                  className="form-textarea"
                  value={editingBlog.excerpt || ''}
                  onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Article Body Content (Supports ### headings and paragraphs)</label>
                <textarea
                  rows={10}
                  className="form-textarea"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}
                  value={editingBlog.content || ''}
                  onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 24 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#ffffff' }}>
                  <input
                    type="checkbox"
                    checked={editingBlog.published ?? true}
                    onChange={(e) => setEditingBlog({ ...editingBlog, published: e.target.checked })}
                  />
                  Publish live immediately
                </label>

                <div style={{ display: 'flex', gap: 12 }}>
                  <button type="button" onClick={() => setEditingBlog(null)} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="btn btn-teal">
                    {saving ? 'Saving...' : 'Save Article'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- REVIEW LEAD MODAL --- */}
      {editingLead && (
        <div className="modal-backdrop" onClick={() => setEditingLead(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 600 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 className="heading-2" style={{ color: '#ffffff' }}>
                Inquiry Details
              </h3>
              <button onClick={() => setEditingLead(null)} style={{ cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <span className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Prospect</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>{editingLead.name}</div>
                <div style={{ color: 'var(--accent-teal)' }}>{editingLead.company || 'Private Entity'}</div>
              </div>

              <div className="grid-2" style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 16, borderRadius: 'var(--radius-md)' }}>
                <div>
                  <span className="text-muted" style={{ fontSize: '0.75rem' }}>Email:</span>
                  <div><a href={`mailto:${editingLead.email}`} style={{ color: '#ffffff' }}>{editingLead.email}</a></div>
                </div>
                <div>
                  <span className="text-muted" style={{ fontSize: '0.75rem' }}>Phone:</span>
                  <div>{editingLead.phone ? <a href={`tel:${editingLead.phone}`} style={{ color: '#ffffff' }}>{editingLead.phone}</a> : 'Not provided'}</div>
                </div>
              </div>

              <div>
                <span className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Focus Area</span>
                <div style={{ fontWeight: 600, color: '#ffffff' }}>{editingLead.serviceNeeded || 'General Consultation'}</div>
              </div>

              <div>
                <span className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Message / Situation</span>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 16, borderRadius: 'var(--radius-md)', color: '#ffffff', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                  {editingLead.message}
                </div>
              </div>

              <div>
                <span className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Lead Status</span>
                <select
                  value={editingLead.status}
                  onChange={(e) => {
                    const status = e.target.value as LeadSubmission['status'];
                    handleUpdateLeadStatus(editingLead.id, status);
                    setEditingLead({ ...editingLead, status });
                  }}
                  className="form-select"
                  style={{ marginTop: 6 }}
                >
                  <option value="new">New</option>
                  <option value="in_progress">In Progress</option>
                  <option value="contacted">Contacted</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                <button onClick={() => setEditingLead(null)} className="btn btn-primary">
                  Close Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- EDIT CUSTOM SECTION MODAL --- */}
      {editingSection && (
        <div className="modal-backdrop" onClick={() => setEditingSection(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 680 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 className="heading-2" style={{ color: '#ffffff' }}>
                {editingSection.id ? 'Edit Page Section' : 'Add Content Section'}
              </h3>
              <button onClick={() => setEditingSection(null)} style={{ cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveSection}>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Section Key (Identifier)</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={editingSection.key || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, key: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Target Page</label>
                  <select
                    className="form-select"
                    value={editingSection.page || 'home'}
                    onChange={(e) => setEditingSection({ ...editingSection, page: e.target.value })}
                  >
                    <option value="home">Home Page</option>
                    <option value="about">About Page</option>
                    <option value="services">Services Page</option>
                    <option value="all">All Pages</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Section Title *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={editingSection.title || ''}
                  onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subtitle / Description</label>
                <input
                  type="text"
                  className="form-input"
                  value={editingSection.subtitle || ''}
                  onChange={(e) => setEditingSection({ ...editingSection, subtitle: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Section Content (JSON Payload)</label>
                <textarea
                  rows={5}
                  className="form-textarea"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
                  value={editingSection.contentJson || '[]'}
                  onChange={(e) => setEditingSection({ ...editingSection, contentJson: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 24 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#ffffff' }}>
                  <input
                    type="checkbox"
                    checked={editingSection.enabled ?? true}
                    onChange={(e) => setEditingSection({ ...editingSection, enabled: e.target.checked })}
                  />
                  Enable Section
                </label>

                <div style={{ display: 'flex', gap: 12 }}>
                  <button type="button" onClick={() => setEditingSection(null)} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="btn btn-teal">
                    {saving ? 'Saving...' : 'Save Section'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- EDIT TEAM MODAL --- */}
      {editingTeam && (
        <div className="modal-backdrop" onClick={() => setEditingTeam(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 540 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 className="heading-2" style={{ color: '#ffffff' }}>
                {editingTeam.id ? 'Edit Team Member' : 'Add Team Member'}
              </h3>
              <button onClick={() => setEditingTeam(null)} style={{ cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveTeam}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={editingTeam.name || ''}
                  onChange={(e) => setEditingTeam({ ...editingTeam, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Role / Position *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={editingTeam.role || ''}
                  onChange={(e) => setEditingTeam({ ...editingTeam, role: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Bio Description</label>
                <textarea
                  rows={3}
                  className="form-textarea"
                  value={editingTeam.bio || ''}
                  onChange={(e) => setEditingTeam({ ...editingTeam, bio: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
                <button type="button" onClick={() => setEditingTeam(null)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn btn-teal">
                  {saving ? 'Saving...' : 'Save Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- EDIT TESTIMONIAL MODAL --- */}
      {editingTestimonial && (
        <div className="modal-backdrop" onClick={() => setEditingTestimonial(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 540 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 className="heading-2" style={{ color: '#ffffff' }}>
                {editingTestimonial.id ? 'Edit Testimonial' : 'Add Testimonial'}
              </h3>
              <button onClick={() => setEditingTestimonial(null)} style={{ cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveTestimonial}>
              <div className="form-group">
                <label className="form-label">Client Quote *</label>
                <textarea
                  rows={3}
                  required
                  className="form-textarea"
                  value={editingTestimonial.quote || ''}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })}
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Client Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={editingTestimonial.clientName || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, clientName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Company</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editingTestimonial.company || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Client Role</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editingTestimonial.clientRole || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, clientRole: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Star Rating (1-5)</label>
                  <select
                    className="form-select"
                    value={editingTestimonial.rating || 5}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rating: Number(e.target.value) })}
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
                <button type="button" onClick={() => setEditingTestimonial(null)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn btn-teal">
                  {saving ? 'Saving...' : 'Save Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- EDIT FAQ MODAL --- */}
      {editingFaq && (
        <div className="modal-backdrop" onClick={() => setEditingFaq(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 580 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 className="heading-2" style={{ color: '#ffffff' }}>
                {editingFaq.id ? 'Edit FAQ' : 'Add FAQ'}
              </h3>
              <button onClick={() => setEditingFaq(null)} style={{ cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveFaq}>
              <div className="form-group">
                <label className="form-label">Question *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={editingFaq.question || ''}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Answer *</label>
                <textarea
                  rows={4}
                  required
                  className="form-textarea"
                  value={editingFaq.answer || ''}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
                <button type="button" onClick={() => setEditingFaq(null)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn btn-teal">
                  {saving ? 'Saving...' : 'Save FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
