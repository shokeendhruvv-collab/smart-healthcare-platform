export interface HospitalEmail {
  id: string;
  senderName: string;
  senderEmail: string;
  recipientName: string;
  recipientEmail: string;
  subject: string;
  body: string;
  date: string;
  time: string;
  read: boolean;
  starred: boolean;
  category: 'Inbox' | 'Sent' | 'Clinical Notices';
  attachments?: { name: string; size: string }[];
  tag?: 'Lab Update' | 'Doctor Note' | 'Appointment' | 'Pharmacy';
}

export const INITIAL_EMAILS: HospitalEmail[] = [
  {
    id: 'email-1',
    senderName: 'Dr. Priya Sharma (Cardiology)',
    senderEmail: 'priya.sharma@lifecarehospital.org',
    recipientName: 'Harshit Jakhar',
    recipientEmail: 'harshitjakhar020@gmail.com',
    subject: 'Pre-Consultation Preparation for Tomorrow’s ECG Review',
    body: `Dear Harshit,

I hope you are keeping well. Ahead of your scheduled consultation tomorrow at 10:30 AM in Cardiology OPD (Room 304), please ensure the following:

1. Bring along your recent Lipid Profile report (completed Sep 28).
2. Refrain from heavy caffeinated beverages (coffee/energy drinks) 2 hours prior to your clinic visit so we can obtain a calm baseline resting ECG.
3. Your vitals logged in the portal (72 bpm, BP 118/76 mmHg) look very steady.

If you have any specific queries or symptom notes to share in advance, you can reply directly to this email or bring them to the consultation.

Warm regards,
Dr. Priya Sharma, MD, DM
Consultant Cardiologist & Heart Failure Specialist
LifeCare Hospital, New Delhi / NCR`,
    date: 'Today',
    time: '08:45 AM',
    read: false,
    starred: true,
    category: 'Inbox',
    tag: 'Doctor Note',
  },
  {
    id: 'email-2',
    senderName: 'LifeCare Diagnostic Labs',
    senderEmail: 'records@lifecarehospital.org',
    recipientName: 'Harshit Jakhar',
    recipientEmail: 'harshitjakhar020@gmail.com',
    subject: 'Verified Lab Release: Complete Blood Count & Lipid Profile',
    body: `Dear Harshit Jakhar (Patient ID: LH982736),

Your diagnostic test reports conducted on Oct 04, 2026, have been verified by the Chief Pathologist and released to your confidential digital health records.

• Investigation: Complete Blood Count (CBC) with Automated Differential
• Status: All parameters within standard reference ranges (Hemoglobin: 14.8 g/dL, WBC: 6,800 /uL)
• Pathology Seal: Digitally signed (SHA-256 Verified)

You can download your certified PDF copy directly from the "Medical Records" section or view the AI-assisted breakdown on your LifeCare patient dashboard.

Yours in Health,
Central Diagnostic Laboratories
LifeCare Hospital`,
    date: 'Yesterday',
    time: '04:15 PM',
    read: true,
    starred: false,
    category: 'Inbox',
    tag: 'Lab Update',
    attachments: [
      { name: 'CBC_Report_LH982736.pdf', size: '1.4 MB' },
    ],
  },
  {
    id: 'email-3',
    senderName: 'LifeCare Pharmacy Express',
    senderEmail: 'pharmacy@lifecarehospital.org',
    recipientName: 'Harshit Jakhar',
    recipientEmail: 'harshitjakhar020@gmail.com',
    subject: 'Prescription Refill Ready for Dispatch: Paracetamol 500mg',
    body: `Hello Harshit,

This is an automated notification from LifeCare Express Pharmacy. 

Your active prescription for Paracetamol 500mg (prescribed by Dr. Sameer Kapoor) has 4 doses remaining. 

To ensure continuous adherence without interruption, our 3-hour doorstep express refill dispatch is available. You can request a refill with 1-click through your portal or by replying "REFILL" to this message.

Pharmacy Desk Contact: +91 124 456 7010
LifeCare Central Dispensary`,
    date: 'Oct 06, 2026',
    time: '11:20 AM',
    read: true,
    starred: false,
    category: 'Inbox',
    tag: 'Pharmacy',
  },
];
