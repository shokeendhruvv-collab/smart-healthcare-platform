import React from 'react';
import { 
  X, 
  Bell, 
  Check, 
  CheckCheck, 
  Trash2, 
  Calendar, 
  FileText, 
  Pill, 
  Activity, 
  ArrowRight 
} from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: string) => void;
  onNavigate: (page: string) => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="w-4 h-4 text-[#0878E8]" />;
      case 'record':
        return <FileText className="w-4 h-4 text-indigo-600" />;
      case 'medication':
        return <Pill className="w-4 h-4 text-emerald-600" />;
      case 'health':
        return <Activity className="w-4 h-4 text-purple-600" />;
    }
  };

  const handleAction = (notif: NotificationItem) => {
    onMarkAsRead(notif.id);
    onClose();
    if (notif.type === 'appointment') onNavigate('appointments');
    else if (notif.type === 'record') onNavigate('records');
    else if (notif.type === 'medication') onNavigate('medicines');
    else onNavigate('tools');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-2xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm sm:max-w-md h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        
        {/* Panel Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0878E8] flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#102A43]">
                Notifications
              </h3>
              <p className="text-xs text-slate-500">
                {notifications.filter((n) => !n.read).length} unread updates
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onMarkAllAsRead}
              className="p-2 rounded-lg text-xs font-semibold text-[#0878E8] hover:bg-blue-50 transition-colors flex items-center gap-1 cursor-pointer"
              title="Mark all as read"
            >
              <CheckCheck className="w-4 h-4" />
              <span className="hidden sm:inline">Mark All</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <Bell className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm font-semibold">No notifications right now</p>
              <p className="text-xs mt-1">You're all caught up on your health events!</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-4 flex items-start gap-3 transition-colors ${
                  n.read ? 'bg-white hover:bg-slate-50/70' : 'bg-[#EAF6FF]/40 hover:bg-[#EAF6FF]/70'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                  {getIcon(n.type)}
                </div>

                <div className="flex-1 min-w-0" onClick={() => handleAction(n)}>
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className="text-xs font-bold text-[#102A43] truncate">
                      {n.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {n.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {n.message}
                  </p>
                  <button className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0878E8] mt-1 hover:underline cursor-pointer">
                    <span>View details</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex items-center gap-1 shrink-0 self-start">
                  {!n.read && (
                    <button
                      onClick={() => onMarkAsRead(n.id)}
                      className="p-1 rounded text-slate-400 hover:text-[#0878E8] transition-colors"
                      title="Mark as read"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => onDeleteNotification(n.id)}
                    className="p-1 rounded text-slate-400 hover:text-rose-600 transition-colors"
                    title="Delete notification"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-400">
          Push notifications enabled for verified patient ID LH982736
        </div>

      </div>
    </div>
  );
};
