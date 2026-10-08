import React, { useState, useEffect } from 'react';
import { 
  X, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff, 
  MessageSquare, 
  Send, 
  FileText, 
  ShieldCheck, 
  Maximize2, 
  User, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { Doctor } from '../types';

interface TeleconsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor | null;
  patientName?: string;
}

export const TeleconsultationModal: React.FC<TeleconsultationModalProps> = ({
  isOpen,
  onClose,
  doctor,
  patientName = 'Harshit',
}) => {
  const [micActive, setMicActive] = useState(true);
  const [videoActive, setVideoActive] = useState(true);
  const [activeTab, setActiveTab] = useState<'video' | 'chat'>('video');
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string; time: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    if (doctor) {
      setChatMessages([
        {
          sender: doctor.name,
          text: `Hello ${patientName}! Welcome to your LifeCare Teleconsultation. Can you hear and see me clearly?`,
          time: '10:30 AM',
        },
      ]);
    }
  }, [doctor, patientName]);

  useEffect(() => {
    if (!isOpen) {
      setCallDuration(0);
      return;
    }
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen || !doctor) return null;

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      {
        sender: patientName,
        text: chatInput.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    const userText = chatInput.trim();
    setChatInput('');

    // Doctor simulated quick response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: doctor.name,
          text: `Thank you for sharing that, ${patientName}. I have reviewed your latest vitals and ECG profile; they look stable. Let's discuss your symptoms in detail.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 max-w-4xl w-full h-[90vh] max-h-[800px] flex flex-col overflow-hidden text-white animate-in zoom-in-95 duration-200">
        
        {/* Top Video Header */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <div>
              <h3 className="text-sm sm:text-base font-bold flex items-center gap-2">
                <span>Teleconsultation: {doctor.name}</span>
                <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Encrypted HD
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {doctor.specialty} · Duration: {formatTimer(callDuration)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab(activeTab === 'video' ? 'chat' : 'video')}
              className={`p-2 rounded-xl border transition-colors ${
                activeTab === 'chat' 
                  ? 'bg-[#0878E8] border-[#0878E8] text-white' 
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              }`}
              title="Toggle In-Call Chat"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Call Workspace */}
        <div className="flex-1 relative flex flex-col md:flex-row overflow-hidden bg-slate-950">
          
          {/* Main Doctor Video Feed */}
          <div className="flex-1 relative bg-slate-950 flex items-center justify-center overflow-hidden">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-full object-cover object-top opacity-90"
            />

            {/* Doctor Overlay Info */}
            <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-bold">{doctor.name}</span>
              <span className="text-slate-400">({doctor.specialty})</span>
            </div>

            {/* Patient Self-View PIP (Bottom Right) */}
            <div className="absolute bottom-20 right-4 w-32 sm:w-44 aspect-4/3 rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-800 shadow-2xl z-10">
              {videoActive ? (
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
                  alt="Patient Self View"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-slate-400 text-xs">
                  <User className="w-6 h-6 mb-1" />
                  <span>Camera Off</span>
                </div>
              )}
              <div className="absolute bottom-1.5 left-2 text-[10px] bg-black/60 px-1.5 py-0.5 rounded text-slate-200">
                You ({patientName})
              </div>
            </div>

          </div>

          {/* In-Call Chat Sidebar (Desktop or toggled) */}
          {activeTab === 'chat' && (
            <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-slate-800 bg-slate-900 flex flex-col h-1/2 md:h-full z-20 animate-in slide-in-from-right duration-200">
              <div className="p-3 border-b border-slate-800 text-xs font-bold text-slate-300">
                Live Consultation Chat
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {chatMessages.map((m, idx) => (
                  <div key={idx} className={`space-y-1 ${m.sender === patientName ? 'text-right' : 'text-left'}`}>
                    <div className="text-[10px] text-slate-400">{m.sender} · {m.time}</div>
                    <div className={`p-2.5 rounded-xl text-xs inline-block max-w-[90%] text-left ${
                      m.sender === patientName
                        ? 'bg-[#0878E8] text-white'
                        : 'bg-slate-800 text-slate-200 border border-slate-700'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendChat} className="p-3 border-t border-slate-800 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type a message to doctor..."
                  className="flex-1 text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-hidden focus:border-[#0878E8]"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-[#0878E8] text-white hover:bg-[#0769cc] transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

        </div>

        {/* Video Control Bar */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-[#20B26B]" />
            <span>HIPAA Compliant Video Pipeline</span>
          </div>

          <div className="flex items-center gap-3 mx-auto sm:mx-0">
            {/* Mic Toggle */}
            <button
              onClick={() => setMicActive(!micActive)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                micActive
                  ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-white'
                  : 'bg-red-500/20 border-red-500/50 text-red-400'
              }`}
              title={micActive ? 'Mute Microphone' : 'Unmute Microphone'}
            >
              {micActive ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>

            {/* Video Toggle */}
            <button
              onClick={() => setVideoActive(!videoActive)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                videoActive
                  ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-white'
                  : 'bg-red-500/20 border-red-500/50 text-red-400'
              }`}
              title={videoActive ? 'Turn Off Camera' : 'Turn On Camera'}
            >
              {videoActive ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>

            {/* End Call Button */}
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-red-600/30 transition-all cursor-pointer"
            >
              <PhoneOff className="w-4 h-4" />
              <span>End Call</span>
            </button>
          </div>

          <div className="hidden sm:block text-xs text-slate-400">
            Dr. Status: Speaking
          </div>
        </div>

      </div>
    </div>
  );
};
