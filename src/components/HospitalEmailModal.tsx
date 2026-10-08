import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Send, 
  Inbox, 
  Star, 
  Trash2, 
  Search, 
  Paperclip, 
  CheckCircle2, 
  Reply, 
  User, 
  Building, 
  Clock, 
  ArrowLeft, 
  Plus, 
  FileText 
} from 'lucide-react';
import { HospitalEmail, INITIAL_EMAILS } from '../data/emailData';
import { PatientProfile } from '../types';

interface HospitalEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: PatientProfile;
  initialComposeTo?: string;
}

export const HospitalEmailModal: React.FC<HospitalEmailModalProps> = ({
  isOpen,
  onClose,
  patient,
  initialComposeTo,
}) => {
  const [emails, setEmails] = useState<HospitalEmail[]>(() => {
    try {
      const saved = localStorage.getItem('lifecare_emails');
      return saved ? JSON.parse(saved) : INITIAL_EMAILS;
    } catch {
      return INITIAL_EMAILS;
    }
  });

  const [activeFolder, setActiveFolder] = useState<'Inbox' | 'Sent' | 'Starred'>('Inbox');
  const [selectedEmail, setSelectedEmail] = useState<HospitalEmail | null>(null);
  const [isComposing, setIsComposing] = useState<boolean>(!!initialComposeTo);
  const [searchQuery, setSearchQuery] = useState('');

  // Compose fields
  const [recipient, setRecipient] = useState(initialComposeTo || 'medicalsupdt@sgtuniversity.org');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  React.useEffect(() => {
    localStorage.setItem('lifecare_emails', JSON.stringify(emails));
  }, [emails]);

  if (!isOpen) return null;

  const unreadCount = emails.filter((e) => e.category === 'Inbox' && !e.read).length;

  const filteredEmails = emails.filter((email) => {
    const matchesSearch =
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.senderName.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFolder === 'Starred') {
      return matchesSearch && email.starred;
    }
    return matchesSearch && email.category === activeFolder;
  });

  const handleSelectEmail = (email: HospitalEmail) => {
    setSelectedEmail(email);
    setIsComposing(false);
    if (!email.read) {
      setEmails((prev) =>
        prev.map((e) => (e.id === email.id ? { ...e, read: true } : e))
      );
    }
  };

  const handleToggleStar = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setEmails((prev) =>
      prev.map((item) => (item.id === id ? { ...item, starred: !item.starred } : item))
    );
  };

  const handleDeleteEmail = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setEmails((prev) => prev.filter((item) => item.id !== id));
    if (selectedEmail?.id === id) setSelectedEmail(null);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) return;

    setSending(true);

    setTimeout(() => {
      const newSentEmail: HospitalEmail = {
        id: `email-sent-${Date.now()}`,
        senderName: patient.name,
        senderEmail: patient.email || 'harshitjakhar020@gmail.com',
        recipientName: getRecipientDisplayName(recipient),
        recipientEmail: recipient,
        subject: subject.trim(),
        body: body.trim(),
        date: 'Today',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: true,
        starred: false,
        category: 'Sent',
      };

      setEmails((prev) => [newSentEmail, ...prev]);
      setSending(false);
      setSendSuccess(true);

      setTimeout(() => {
        setSendSuccess(false);
        setIsComposing(false);
        setSubject('');
        setBody('');
        setActiveFolder('Sent');
        setSelectedEmail(newSentEmail);
      }, 1200);
    }, 700);
  };

  const getRecipientDisplayName = (email: string) => {
    switch (email) {
      case 'care@lifecarehospital.org':
        return 'LifeCare General Patient Care';
      case 'appointments@lifecarehospital.org':
        return 'Appointments & Scheduling Desk';
      case 'records@lifecarehospital.org':
        return 'Diagnostic Pathology & Records Dept';
      case 'pharmacy@lifecarehospital.org':
        return 'LifeCare Pharmacy Express';
      case 'priya.sharma@lifecarehospital.org':
        return 'Dr. Priya Sharma (Cardiology)';
      case 'sameer.kapoor@lifecarehospital.org':
        return 'Dr. Sameer Kapoor (Internal Medicine)';
      default:
        return 'Hospital Department';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-4xl w-full h-[88vh] max-h-[750px] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50/70 via-white to-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0878E8] flex items-center justify-center text-white shadow-xs">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-[#102A43]">
                  SGT Hospital Secure Email & Messages
                </h3>
                {unreadCount > 0 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-[#0878E8]">
                    {unreadCount} unread
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Official encrypted communications · Connected to <strong>{patient.email}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Workspace Layout */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* LEFT SIDEBAR: Folders & Compose Action */}
          <div className="w-52 sm:w-60 border-r border-slate-100 bg-slate-50/60 p-3 flex flex-col justify-between shrink-0">
            <div className="space-y-3">
              
              {/* Compose New Email Button */}
              <button
                onClick={() => {
                  setIsComposing(true);
                  setSelectedEmail(null);
                }}
                className="w-full py-2.5 px-3 bg-[#0878E8] hover:bg-[#0769cc] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Compose Email</span>
              </button>

              {/* Navigation Folders */}
              <nav className="space-y-1 text-xs font-semibold">
                <button
                  onClick={() => {
                    setActiveFolder('Inbox');
                    setIsComposing(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-colors ${
                    activeFolder === 'Inbox' && !isComposing
                      ? 'bg-blue-100/70 text-[#0878E8] font-bold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Inbox className="w-4 h-4" />
                    <span>Inbox</span>
                  </div>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-bold bg-[#0878E8] text-white px-1.5 py-0.2 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    setActiveFolder('Sent');
                    setIsComposing(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-colors ${
                    activeFolder === 'Sent' && !isComposing
                      ? 'bg-blue-100/70 text-[#0878E8] font-bold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    <span>Sent</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setActiveFolder('Starred');
                    setIsComposing(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-colors ${
                    activeFolder === 'Starred' && !isComposing
                      ? 'bg-blue-100/70 text-[#0878E8] font-bold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    <span>Starred</span>
                  </div>
                </button>
              </nav>

              {/* Department Contact Directory */}
              <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500 space-y-1.5">
                <p className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">
                  Official Hospital Desks
                </p>
                <div className="truncate hover:text-[#0878E8] cursor-pointer" onClick={() => { setRecipient('care@lifecarehospital.org'); setIsComposing(true); }}>
                  care@lifecarehospital.org
                </div>
                <div className="truncate hover:text-[#0878E8] cursor-pointer" onClick={() => { setRecipient('appointments@lifecarehospital.org'); setIsComposing(true); }}>
                  appointments@lifecarehospital.org
                </div>
                <div className="truncate hover:text-[#0878E8] cursor-pointer" onClick={() => { setRecipient('records@lifecarehospital.org'); setIsComposing(true); }}>
                  records@lifecarehospital.org
                </div>
              </div>

            </div>

            <div className="p-2 bg-white rounded-xl border border-slate-200 text-[10px] text-slate-400 text-center">
              HIPAA & TLS 1.3 Certified
            </div>
          </div>

          {/* MAIN VIEW AREA: Email List OR Reading Pane OR Compose Pane */}
          <div className="flex-1 flex flex-col overflow-hidden bg-white">
            
            {/* Search Bar */}
            <div className="p-3 border-b border-slate-100 flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search emails by sender, subject, or keywords..."
                className="w-full text-xs outline-hidden text-[#102A43] placeholder-slate-400"
              />
            </div>

            {/* A: COMPOSE PANE */}
            {isComposing && (
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="text-sm font-bold text-[#102A43]">
                    New Secure Clinical Message
                  </h4>
                  <button
                    onClick={() => setIsComposing(false)}
                    className="text-xs text-slate-400 hover:text-slate-600"
                  >
                    Discard
                  </button>
                </div>

                {sendSuccess ? (
                  <div className="p-8 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#20B26B] flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-base font-bold text-[#102A43]">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-xs text-slate-500">
                      Dispatched to <strong>{recipient}</strong>. You will receive an email response in your LifeCare inbox.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSendEmail} className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        To (Hospital Department or Doctor)
                      </label>
                      <select
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-hidden focus:border-[#0878E8]"
                      >
                        <option value="medicalsupdt@sgtuniversity.org">Medical Superintendent Office (medicalsupdt@sgtuniversity.org)</option>
                        <option value="appointments@sgtuniversity.org">SGT Hospital OPD Appointments Desk (appointments@sgtuniversity.org)</option>
                        <option value="records@sgtuniversity.org">Diagnostic Pathology & Lab Reports (records@sgtuniversity.org)</option>
                        <option value="priya.sharma@sgtuniversity.org">Dr. Priya Sharma - Cardiology (priya.sharma@sgtuniversity.org)</option>
                        <option value="sameer.kapoor@sgtuniversity.org">Dr. Sameer Kapoor - Internal Medicine (sameer.kapoor@sgtuniversity.org)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Question regarding recent blood report / Follow-up schedule"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:border-[#0878E8]"
                      />
                    </div>

                    {/* Quick Subject Presets */}
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {['Inquiry on Lab Results', 'Prescription Clarification', 'Appointment Query', 'General Health Question'].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setSubject(preset)}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Message Content
                      </label>
                      <textarea
                        required
                        rows={6}
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Write your message to the hospital staff or attending doctor..."
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:border-[#0878E8]"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[11px] text-slate-400">
                        From: {patient.name} &lt;{patient.email}&gt;
                      </span>

                      <button
                        type="submit"
                        disabled={sending || !subject.trim() || !body.trim()}
                        className="py-2.5 px-5 rounded-xl bg-[#0878E8] hover:bg-[#0769cc] disabled:bg-slate-300 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{sending ? 'Sending...' : 'Send Email'}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* B: READING PANE (if an email is selected) */}
            {!isComposing && selectedEmail && (
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <button
                    onClick={() => setSelectedEmail(null)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0878E8] hover:underline cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to {activeFolder}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleToggleStar(e, selectedEmail.id)}
                      className={`p-1.5 rounded-lg border cursor-pointer ${
                        selectedEmail.starred ? 'text-amber-500 bg-amber-50 border-amber-200' : 'text-slate-400 border-slate-200'
                      }`}
                      title="Star email"
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteEmail(e, selectedEmail.id)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                      title="Delete email"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Email Subject & Sender Bar */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#102A43]">
                    {selectedEmail.subject}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0878E8] flex items-center justify-center font-bold">
                        {selectedEmail.senderName[0]}
                      </div>
                      <div>
                        <p className="font-bold text-[#102A43]">{selectedEmail.senderName}</p>
                        <p className="text-[11px] text-slate-400">&lt;{selectedEmail.senderEmail}&gt;</p>
                      </div>
                    </div>
                    <div className="text-right text-[11px] text-slate-400">
                      <span>{selectedEmail.date} at {selectedEmail.time}</span>
                    </div>
                  </div>
                </div>

                {/* Email Body */}
                <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-100 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-normal">
                  {selectedEmail.body}
                </div>

                {/* Attachments if any */}
                {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                    <p className="text-xs font-bold text-slate-600">Attached Documents:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedEmail.attachments.map((att, idx) => (
                        <div
                          key={idx}
                          onClick={() => alert(`Downloading ${att.name}...`)}
                          className="flex items-center gap-2 p-2 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-lg text-xs font-semibold text-[#0878E8] cursor-pointer"
                        >
                          <FileText className="w-4 h-4" />
                          <span>{att.name}</span>
                          <span className="text-[10px] text-slate-400">({att.size})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reply shortcut */}
                <button
                  onClick={() => {
                    setRecipient(selectedEmail.senderEmail);
                    setSubject(`Re: ${selectedEmail.subject}`);
                    setBody(`\n\n--- On ${selectedEmail.date}, ${selectedEmail.senderName} wrote: ---\n${selectedEmail.body.slice(0, 150)}...`);
                    setIsComposing(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>Reply to this message</span>
                </button>
              </div>
            )}

            {/* C: LIST PANE (when no email is actively open) */}
            {!isComposing && !selectedEmail && (
              <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
                {filteredEmails.length === 0 ? (
                  <div className="p-12 text-center text-slate-400 space-y-2">
                    <Mail className="w-10 h-10 mx-auto opacity-30" />
                    <p className="text-sm font-bold">No messages in {activeFolder}</p>
                    <p className="text-xs">Your clinical email inbox is completely up to date.</p>
                  </div>
                ) : (
                  filteredEmails.map((email) => (
                    <div
                      key={email.id}
                      onClick={() => handleSelectEmail(email)}
                      className={`p-4 flex items-start gap-3 cursor-pointer transition-colors ${
                        email.read ? 'bg-white hover:bg-slate-50/70' : 'bg-[#EAF6FF]/40 hover:bg-[#EAF6FF]/70'
                      }`}
                    >
                      <button
                        onClick={(e) => handleToggleStar(e, email.id)}
                        className={`p-1 mt-0.5 rounded cursor-pointer ${
                          email.starred ? 'text-amber-500' : 'text-slate-300 hover:text-slate-500'
                        }`}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <span className={`text-xs truncate ${email.read ? 'font-medium text-slate-700' : 'font-bold text-[#102A43]'}`}>
                            {email.senderName}
                          </span>
                          <span className="text-[10px] text-slate-400 shrink-0">
                            {email.date}
                          </span>
                        </div>

                        <p className={`text-xs truncate ${email.read ? 'text-slate-600' : 'font-bold text-[#102A43]'}`}>
                          {email.subject}
                        </p>

                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 font-normal">
                          {email.body.replace(/\n/g, ' ')}
                        </p>
                      </div>

                      <button
                        onClick={(e) => handleDeleteEmail(e, email.id)}
                        className="p-1 text-slate-300 hover:text-rose-600 rounded transition-colors self-center"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
