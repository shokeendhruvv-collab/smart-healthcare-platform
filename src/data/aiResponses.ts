export interface AIResponseOutcome {
  text: string;
  isEmergency?: boolean;
  suggestedActions?: string[];
}

export function generateHealthCopilotResponse(query: string, patientName: string = 'Harshit'): AIResponseOutcome {
  const lower = query.toLowerCase().trim();

  // Emergency red flags detection
  const emergencyKeywords = [
    'chest pain', 'heart attack', 'shortness of breath', 'can\'t breathe',
    'severe bleeding', 'stroke', 'face drooping', 'unconscious', 'poison',
    'suicidal', 'anaphylaxis', 'overdose'
  ];

  if (emergencyKeywords.some(keyword => lower.includes(keyword))) {
    return {
      text: `⚠️ **CRITICAL MEDICAL NOTICE**: The symptoms you described may indicate a medical emergency. 

Please **do not wait**. Call emergency services immediately at **112** (or your local emergency number), or proceed to the nearest emergency room at LifeCare Hospital.

Our 24/7 LifeCare Emergency Trauma Center is located at Main Wing, Level 0. Immediate medical evaluation by emergency physicians is vital.`,
      isEmergency: true,
      suggestedActions: ['Call Emergency (112)', 'Emergency Hotline', 'View Nearest Trauma Center'],
    };
  }

  // Uploaded record analysis / walkthrough
  if (lower.includes('uploaded') || lower.includes('precaution') || lower.includes('walkthrough') || lower.includes('external record')) {
    return {
      text: `📋 **AI Analysis & Follow-up for Your Uploaded Record**:

1. **Clinical Summary**:
   • Your uploaded document has been verified and securely indexed into your LifeCare patient vault.
   • Physiological parameters fall within expected tolerances with zero critical red-flag anomalies detected.

2. **Essential Precautions & Health Guidance**:
   • **Medication & Supplement Timing**: If taking medications, maintain prescribed post-meal intervals to protect digestive lining.
   • **Dietary Synchronization**: Sustain a daily hydration target (2.8L - 3.2L) and avoid extreme processed sodium.
   • **Clinical Review**: Share the electronic copy of this report with your consulting physician at LifeCare.

3. **Important Details**:
   • File authenticity and digital signature verified under HIPAA / NABH protocols.
   • Risk categorization: **Low Risk / Stable**.

Would you like me to book a follow-up review slot or explain any specific test markers in detail?`,
      suggestedActions: ['View Medical Records', 'Ask about precautions', 'Book Doctor Review'],
    };
  }

  // Explain lab reports
  if (lower.includes('lab report') || lower.includes('test') || lower.includes('cbc') || lower.includes('lipid') || lower.includes('blood test')) {
    return {
      text: `Based on your recent reports in LifeCare Records:

1. **Complete Blood Count (CBC - Oct 4, 2026)**:
   • Hemoglobin is **14.8 g/dL** (Optimal range 13.5 - 17.5 g/dL).
   • Platelets and White Blood Cells are healthy, showing no signs of acute infection or anemia.

2. **Comprehensive Lipid Profile (Sep 28, 2026)**:
   • Total Cholesterol: **172 mg/dL** (Desirable < 200).
   • Good HDL: **56 mg/dL** (Protective).
   • Bad LDL: **94 mg/dL** (Optimal < 100).

Overall, your metabolic and hematology panels are within target parameters. Remember, lab metrics must always be correlated with your clinical status by your primary physician, Dr. Sameer Kapoor.`,
      suggestedActions: ['View Medical Records', 'Ask about cholesterol', 'Book Dr. Kapoor Follow-up'],
    };
  }

  // Medicines / Paracetamol / Atorvastatin
  if (lower.includes('medicine') || lower.includes('pill') || lower.includes('paracetamol') || lower.includes('atorvastatin') || lower.includes('safe')) {
    return {
      text: `Here is a review of your currently active prescriptions:

• **Paracetamol (500mg)**: Prescribed for acute symptom relief twice daily after meals (max 2g/day). It is safe when taken with food and without alcohol. You have **4 pills remaining** (Refill recommended soon).
• **Atorvastatin (10 mg)**: Standard nighttime cholesterol maintenance. Take after dinner with water. Avoid grapefruit juice as it interferes with liver metabolism.
• **Vitamin D3 (60,000 IU)**: Taken once weekly on Sundays.

*Important Note: Never change dosages or stop prescribed medications without discussing with your prescribing doctor.*`,
      suggestedActions: ['Refill Paracetamol', 'View Full Prescriptions', 'Set Medication Reminder'],
    };
  }

  // Diet / nutrition / what should I eat
  if (lower.includes('eat') || lower.includes('food') || lower.includes('diet') || lower.includes('nutrition') || lower.includes('calorie')) {
    return {
      text: `Hello ${patientName}! For optimal vitality, balanced blood pressure (yours is currently 118/76 mmHg), and heart health:

🥗 **Heart-Healthy Foundations**:
• **Focus on soluble fiber**: Oats, legumes, chia seeds, and citrus fruits to support your excellent lipid profile.
• **Lean proteins**: Grilled fish, paneer/tofu, lentils, and sprouted grains.
• **Hydration goal**: Aim for 2.8 - 3.2 liters of water daily.
• **Limit processed sodium**: Keep table salt under 5g/day to maintain your normal blood pressure.

Would you like me to calculate your daily recommended calorie intake or schedule a clinical nutritionist session?`,
      suggestedActions: ['Open Calorie Calculator', 'Water Intake Tracker', 'Consult Nutritionist'],
    };
  }

  // Health summary
  if (lower.includes('summary') || lower.includes('profile') || lower.includes('how am i doing') || lower.includes('health status')) {
    return {
      text: `📊 **Health Summary for ${patientName} Jakhar (ID: LH982736)**:

• **Vitals**: Resting heart rate **72 bpm** (Normal), Blood Pressure **118/76 mmHg** (Optimal), BMI **22.2 kg/m²** (Normal range).
• **Sleep Quality**: Averaging **7h 30m** with consistent deep sleep cycles.
• **Physical Activity**: **8,452 steps** logged today (Target: 8,000 steps achieved).
• **Upcoming Care**: In-person consultation with **Dr. Priya Sharma** tomorrow at 10:30 AM (Room 304).

You are in great health maintenance! Keep up hydration and your scheduled follow-up.`,
      suggestedActions: ['View Health Analytics', 'Upcoming Appointments', 'Update Vitals'],
    };
  }

  // Blood pressure or heart rate questions
  if (lower.includes('blood pressure') || lower.includes('bp') || lower.includes('heart rate') || lower.includes('pulse')) {
    return {
      text: `Your cardiovascular parameters are currently optimal:
• **Heart Rate**: 72 beats per minute (Normal resting range: 60-100 bpm).
• **Blood Pressure**: 118 mmHg systolic / 76 mmHg diastolic. According to AHA/ESC guidelines, this is classified as 'Normal & Healthy'.

To maintain this: continue regular cardiovascular walks (30 mins daily), maintain restful sleep patterns, and moderate caffeine intake.`,
      suggestedActions: ['View Heart Rate Chart', 'Log New BP Reading', 'Consult Cardiologist'],
    };
  }

  // Headache / fever / cold
  if (lower.includes('headache') || lower.includes('fever') || lower.includes('cold') || lower.includes('cough')) {
    return {
      text: `For mild temporary symptoms such as mild headache or low-grade fatigue:
• Ensure proper hydration (warm fluids, electrolyte water).
• Rest in a quiet, dim room.
• You have Paracetamol 500mg prescribed by Dr. Sameer Kapoor (take only after food).

⚠️ **When to seek medical evaluation immediately**:
If fever exceeds 102°F (38.9°C), or is accompanied by stiff neck, confusion, difficulty breathing, or severe persistent vomiting, please visit LifeCare Urgent Care or book an immediate teleconsultation.`,
      suggestedActions: ['Start Teleconsultation', 'Book General Physician', 'Call Emergency (112)'],
    };
  }

  // Default intelligent assistant response
  return {
    text: `Hello ${patientName}! As your LifeCare AI Health Copilot, I can help you review lab results, explain medication schedules, suggest preventive wellness tips, track your vitals, or connect you with LifeCare specialists.

What specific area of your health would you like guidance on today?

*Disclaimer: AI Health Copilot provides supportive informational guidance and does not diagnose conditions or replace professional medical consultations.*`,
    suggestedActions: ['Explain my lab report', 'Is this medicine safe?', 'What should I eat?', 'My health summary'],
  };
}
