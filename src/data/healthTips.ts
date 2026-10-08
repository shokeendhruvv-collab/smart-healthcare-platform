export interface HealthTip {
  id: string;
  title: string;
  category: 'Cardiovascular' | 'Nutrition' | 'Sleep & Recovery' | 'Preventive Medicine' | 'Mental Well-being' | 'Metabolic Health';
  summary: string;
  actionableStep: string;
  statOrFact: string;
  source: string;
  reviewedBy: string;
  tags: string[];
}

export const HEALTH_TIPS: HealthTip[] = [
  {
    id: 'tip-1',
    title: 'The "Post-Meal 10-Minute Walk" Lowers Glucose Spikes by 22%',
    category: 'Metabolic Health',
    summary: 'Taking a gentle 10 to 15-minute walk within 30 minutes of eating significantly blunts postprandial glycemic excursions. Skeletal muscle contractions pull glucose from the bloodstream independent of insulin.',
    actionableStep: 'Schedule a light 10-minute stroll after your largest meal today rather than immediately sitting or resting.',
    statOrFact: 'Reduces peak post-meal blood sugar by up to 22% compared to sedentary rest.',
    source: 'American Diabetes Association & Sports Medicine Journal (2025/2026)',
    reviewedBy: 'Dr. Sameer Kapoor, Consultant Physician',
    tags: ['Blood Sugar', 'Digestion', 'Daily Routine'],
  },
  {
    id: 'tip-2',
    title: 'Consistent Wake-Up Times Anchor Your Circadian Blood Pressure Rhythm',
    category: 'Sleep & Recovery',
    summary: 'Waking up within a 30-minute window every day—even on weekends—synchronizes the suprachiasmatic nucleus. This optimizes cortisol release, improves deep slow-wave sleep cycles, and stabilizes morning arterial tension.',
    actionableStep: 'Set your morning alarm for the same time tomorrow and get 5-10 minutes of natural outdoor daylight in your eyes.',
    statOrFact: 'Associated with an 18% improvement in nighttime blood pressure dipping.',
    source: 'Harvard Sleep Medicine & Journal of the American Heart Association',
    reviewedBy: 'Dr. Vikramaditya Rao, Neurologist',
    tags: ['Circadian Rhythm', 'Sleep Hygiene', 'Blood Pressure'],
  },
  {
    id: 'tip-3',
    title: 'Hydration Pre-Loading: 500ml Water Before Breakfast Boosts Metabolic Rate',
    category: 'Nutrition',
    summary: 'Drinking 500ml of room-temperature or cool water upon waking gently activates resting energy expenditure by approximately 24% for 60 minutes while restoring fluid lost through overnight respiration.',
    actionableStep: 'Keep a full glass of water by your bedside and drink it before reaching for morning tea or coffee.',
    statOrFact: 'Aids renal clearance of nighttime metabolic byproducts and supports digestive motility.',
    source: 'The Journal of Clinical Endocrinology & Metabolism',
    reviewedBy: 'Dr. Sameer Kapoor, Consultant Physician',
    tags: ['Hydration', 'Kidney Health', 'Metabolism'],
  },
  {
    id: 'tip-4',
    title: 'Soluble Beta-Glucan Fiber Directly Reduces ApoB and LDL Cholesterol',
    category: 'Cardiovascular',
    summary: 'Consuming at least 3 grams of soluble beta-glucan fiber daily (found in steel-cut oats, barley, and chia seeds) binds bile acids in the gut, signaling the liver to clear LDL particles from the bloodstream.',
    actionableStep: 'Add 2 tablespoons of chia seeds or a bowl of oatmeal to your breakfast rotation today.',
    statOrFact: 'Lowers circulating LDL cholesterol by 5% to 8% within 4 to 6 weeks of continuous intake.',
    source: 'European Society of Cardiology & AHA Preventive Cardiology Guidelines',
    reviewedBy: 'Dr. Priya Sharma, Chief of Cardiology',
    tags: ['Heart Health', 'Cholesterol', 'Fiber'],
  },
  {
    id: 'tip-5',
    title: 'The "20-20-20" Rule Prevents Digital Asthenopia & Headaches',
    category: 'Preventive Medicine',
    summary: 'Staring at screens decreases blink rates by 66%, leading to tear film evaporation and ciliary muscle fatigue. Resting accommodation muscles every 20 minutes reduces micro-tension headaches.',
    actionableStep: 'Every 20 minutes, look at an object at least 20 feet (6 meters) away for 20 seconds.',
    statOrFact: 'Decreases dry eye symptoms and visual fatigue scores by 43%.',
    source: 'American Academy of Ophthalmology',
    reviewedBy: 'Dr. Anjali Verma, Consultant Specialist',
    tags: ['Eye Health', 'Screen Fatigue', 'Focus'],
  },
  {
    id: 'tip-6',
    title: 'Box Breathing (4-4-4-4) Rapidly Down-Regulates Sympathetic Overdrive',
    category: 'Mental Well-being',
    summary: 'Inhaling for 4 seconds, holding for 4, exhaling for 4, and holding for 4 stimulates the vagus nerve. This slows sinoatrial node firing, lowers acute heart rate variability stress, and mitigates tension.',
    actionableStep: 'Practice 4 consecutive cycles of box breathing during high-focus tasks or before meetings.',
    statOrFact: 'Lowers acute salivary cortisol and reduces systolic spikes within 3 minutes.',
    source: 'Mayo Clinic Integrative Medicine & Frontiers in Neuroscience',
    reviewedBy: 'Dr. Priya Sharma, Chief of Cardiology',
    tags: ['Stress Relief', 'Vagus Nerve', 'Mental Calm'],
  },
  {
    id: 'tip-7',
    title: 'Adequate Magnesium Intake Enhances Deep N3 Restorative Sleep',
    category: 'Nutrition',
    summary: 'Magnesium regulates the neurotransmitter GABA and binds to NMDA receptors. Adequate dietary magnesium from dark leafy greens, pumpkin seeds, and almonds facilitates physical muscle relaxation and deeper sleep.',
    actionableStep: 'Incorporate a handful of raw pumpkin seeds or a cup of steamed spinach into your evening dinner.',
    statOrFact: 'Improves sleep efficiency by 9% and reduces restless leg sensations.',
    source: 'National Institutes of Health (NIH) Office of Dietary Supplements',
    reviewedBy: 'Dr. Sameer Kapoor, Consultant Physician',
    tags: ['Magnesium', 'Muscle Recovery', 'Sleep Quality'],
  },
];

/**
 * Returns today's deterministically calculated health tip based on the current date,
 * ensuring everyone sees a consistent, new tip each day.
 */
export function getDailyHealthTip(dayOffset: number = 0): { tip: HealthTip; dateString: string; dayIndex: number } {
  const now = new Date();
  // Adjust for dayOffset if browsing previous/next tips
  now.setDate(now.getDate() + dayOffset);

  // Use day of year to cycle through tips
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const tipIndex = Math.abs(dayOfYear) % HEALTH_TIPS.length;

  const dateString = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return {
    tip: HEALTH_TIPS[tipIndex],
    dateString,
    dayIndex: tipIndex,
  };
}
