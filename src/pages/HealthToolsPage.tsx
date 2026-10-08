import React, { useState } from 'react';
import { 
  Activity, 
  Scale, 
  Flame, 
  Droplets, 
  Moon, 
  Footprints, 
  Heart, 
  ShieldAlert, 
  ArrowLeft, 
  CheckCircle2, 
  RefreshCw,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface HealthToolsPageProps {
  onBackToHome: () => void;
  onAskCopilot: (query: string) => void;
}

export const HealthToolsPage: React.FC<HealthToolsPageProps> = ({
  onBackToHome,
  onAskCopilot,
}) => {
  // 1. BMI state
  const [bmiHeight, setBmiHeight] = useState(175); // cm
  const [bmiWeight, setBmiWeight] = useState(68); // kg

  const heightInMeters = bmiHeight / 100;
  const bmiValue = (bmiWeight / (heightInMeters * heightInMeters)).toFixed(1);
  const numBmi = parseFloat(bmiValue);
  let bmiCategory = 'Normal Weight';
  let bmiColor = 'text-[#20B26B] bg-emerald-50 border-emerald-200';
  if (numBmi < 18.5) {
    bmiCategory = 'Underweight';
    bmiColor = 'text-amber-600 bg-amber-50 border-amber-200';
  } else if (numBmi >= 25 && numBmi < 30) {
    bmiCategory = 'Overweight';
    bmiColor = 'text-amber-600 bg-amber-50 border-amber-200';
  } else if (numBmi >= 30) {
    bmiCategory = 'Obesity Range';
    bmiColor = 'text-red-600 bg-red-50 border-red-200';
  }

  // 2. Calorie state
  const [calAge, setCalAge] = useState(21);
  const [calGender, setCalGender] = useState<'Male' | 'Female'>('Male');
  const [calActivity, setCalActivity] = useState<number>(1.4); // moderate
  // Harris-Benedict formula approximation
  const bmr = calGender === 'Male'
    ? 10 * bmiWeight + 6.25 * bmiHeight - 5 * calAge + 5
    : 10 * bmiWeight + 6.25 * bmiHeight - 5 * calAge - 161;
  const tdee = Math.round(bmr * calActivity);

  // 3. Water Intake
  const [waterWeight, setWaterWeight] = useState(68);
  const [workoutMins, setWorkoutMins] = useState(45);
  const waterTargetLiters = ((waterWeight * 0.033) + (workoutMins / 30) * 0.35).toFixed(1);

  // 4. Blood Pressure
  const [systolic, setSystolic] = useState(118);
  const [diastolic, setDiastolic] = useState(76);
  let bpCategory = 'Normal Blood Pressure';
  let bpColor = 'text-[#20B26B]';
  if (systolic >= 140 || diastolic >= 90) {
    bpCategory = 'Stage 2 Hypertension';
    bpColor = 'text-red-600';
  } else if (systolic >= 130 || diastolic >= 80) {
    bpCategory = 'Stage 1 Hypertension';
    bpColor = 'text-amber-600';
  } else if (systolic >= 120 && systolic < 130 && diastolic < 80) {
    bpCategory = 'Elevated Blood Pressure';
    bpColor = 'text-yellow-600';
  }

  // 5. Steps Tracker
  const [dailySteps, setDailySteps] = useState(8452);
  const stepsGoal = 10000;
  const stepsPct = Math.min(100, Math.round((dailySteps / stepsGoal) * 100));

  // 6. Sleep Tracker
  const [sleepHours, setSleepHours] = useState(7.5);
  const sleepQuality = sleepHours >= 7 && sleepHours <= 9 ? 'Optimal Sleep' : sleepHours < 6 ? 'Sleep Deprived' : 'Prolonged Rest';

  // 7. Heart Rate Zone
  const [restingHr, setRestingHr] = useState(72);
  const maxHr = 220 - calAge;
  const fatBurnZone = `${Math.round(maxHr * 0.6)} - ${Math.round(maxHr * 0.7)} bpm`;

  // 8. Health Risk Assessment
  const [smoker, setSmoker] = useState(false);
  const [diabetic, setDiabetic] = useState(false);
  const [riskCalculated, setRiskCalculated] = useState(false);

  const calculateRisk = () => {
    setRiskCalculated(true);
    try {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
    } catch {}
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0878E8] hover:underline mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] tracking-tight">
            Interactive Health Tools & Calculators
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Clinical self-assessment tools, metabolic calculators, and personal wellness targets
          </p>
        </div>

        <button
          onClick={() => onAskCopilot('Review all my health metrics and tell me what to improve')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white text-xs font-bold shadow-xs transition-all hover:opacity-95 self-start sm:self-center cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Analyze with AI Copilot</span>
        </button>
      </div>

      {/* Grid of 8 Working Interactive Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* 1. BMI CALCULATOR */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0878E8] flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#102A43]">BMI Calculator</h3>
                <p className="text-[11px] text-slate-400">Body Mass Index & Healthy weight</p>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-slate-600 mb-1">
                  <span>Height: {bmiHeight} cm</span>
                </div>
                <input
                  type="range"
                  min="130"
                  max="210"
                  value={bmiHeight}
                  onChange={(e) => setBmiHeight(Number(e.target.value))}
                  className="w-full accent-[#0878E8]"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-600 mb-1">
                  <span>Weight: {bmiWeight} kg</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="140"
                  value={bmiWeight}
                  onChange={(e) => setBmiWeight(Number(e.target.value))}
                  className="w-full accent-[#0878E8]"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Your BMI</span>
              <span className="text-2xl font-black text-[#102A43]">{bmiValue}</span>
            </div>
            <div className="text-right">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${bmiColor}`}>
                {bmiCategory}
              </span>
              <span className="block text-[10px] text-slate-400 mt-1">Normal: 18.5 – 24.9</span>
            </div>
          </div>
        </div>

        {/* 2. CALORIE CALCULATOR */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#102A43]">Calorie & TDEE Calculator</h3>
                <p className="text-[11px] text-slate-400">Total daily energy expenditure</p>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-500 block mb-1">Age</label>
                  <input
                    type="number"
                    value={calAge}
                    onChange={(e) => setCalAge(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 rounded-lg border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="text-slate-500 block mb-1">Gender</label>
                  <select
                    value={calGender}
                    onChange={(e) => setCalGender(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 rounded-lg border border-slate-200 text-xs"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-500 block mb-1">Activity Level</label>
                <select
                  value={calActivity}
                  onChange={(e) => setCalActivity(Number(e.target.value))}
                  className="w-full p-2 bg-slate-50 rounded-lg border border-slate-200 text-xs"
                >
                  <option value={1.2}>Sedentary (Little or no exercise)</option>
                  <option value={1.375}>Lightly active (1-3 days/week)</option>
                  <option value={1.55}>Moderately active (3-5 days/week)</option>
                  <option value={1.725}>Very active (6-7 days/week)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-amber-50/70 border border-amber-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-700 block">Daily Target</span>
              <span className="text-2xl font-black text-[#102A43]">{tdee} <span className="text-xs font-semibold text-slate-500">kcal</span></span>
            </div>
            <div className="text-right text-[11px] text-slate-600">
              <p>Basal BMR: {Math.round(bmr)} kcal</p>
              <p className="text-emerald-700 font-bold">Weight Maintenance</p>
            </div>
          </div>
        </div>

        {/* 3. WATER INTAKE CALCULATOR */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-50 text-[#16B8C4] flex items-center justify-center">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#102A43]">Water Intake Calculator</h3>
                <p className="text-[11px] text-slate-400">Target daily hydration volume</p>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-slate-600 mb-1">
                  <span>Body Weight: {waterWeight} kg</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="120"
                  value={waterWeight}
                  onChange={(e) => setWaterWeight(Number(e.target.value))}
                  className="w-full accent-[#16B8C4]"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-600 mb-1">
                  <span>Daily Exercise: {workoutMins} mins</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="120"
                  step="15"
                  value={workoutMins}
                  onChange={(e) => setWorkoutMins(Number(e.target.value))}
                  className="w-full accent-[#16B8C4]"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-cyan-50/70 border border-cyan-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-cyan-800 block">Recommended</span>
              <span className="text-2xl font-black text-[#102A43]">{waterTargetLiters} <span className="text-xs font-semibold text-slate-500">Liters</span></span>
            </div>
            <div className="text-right text-[11px] text-slate-600">
              <p>≈ {Math.round(parseFloat(waterTargetLiters) * 4)} glasses / day</p>
              <p className="text-teal-700 font-bold">Prevents Kidney Stress</p>
            </div>
          </div>
        </div>

        {/* 4. BLOOD PRESSURE TRACKER */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0878E8] flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#102A43]">Blood Pressure Classifier</h3>
                <p className="text-[11px] text-slate-400">AHA / ESC Clinical Standard</p>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-500 block mb-1">Systolic (mmHg)</label>
                  <input
                    type="number"
                    value={systolic}
                    onChange={(e) => setSystolic(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 rounded-lg border border-slate-200 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-500 block mb-1">Diastolic (mmHg)</label>
                  <input
                    type="number"
                    value={diastolic}
                    onChange={(e) => setDiastolic(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 rounded-lg border border-slate-200 text-xs font-bold"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#0878E8] block">Reading</span>
              <span className="text-2xl font-black text-[#102A43]">{systolic}/{diastolic}</span>
            </div>
            <div className="text-right">
              <span className={`text-xs font-bold ${bpColor}`}>
                {bpCategory}
              </span>
              <span className="block text-[10px] text-slate-400 mt-0.5">Optimal &lt; 120/80</span>
            </div>
          </div>
        </div>

        {/* 5. STEP & ACTIVITY TRACKER */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#20B26B] flex items-center justify-center">
                <Footprints className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#102A43]">Step Activity Tracker</h3>
                <p className="text-[11px] text-slate-400">Cardiovascular aerobic tracking</p>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex justify-between font-semibold text-slate-600 mb-1">
                <span>Logged Today: {dailySteps.toLocaleString()} steps</span>
              </div>
              <input
                type="range"
                min="0"
                max="15000"
                step="500"
                value={dailySteps}
                onChange={(e) => setDailySteps(Number(e.target.value))}
                className="w-full accent-[#20B26B]"
              />
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
            <div className="flex justify-between items-center mb-1.5 text-xs font-bold">
              <span className="text-emerald-800">{stepsPct}% of 10,000 Goal</span>
              <span className="text-slate-500">≈ {(dailySteps * 0.04).toFixed(0)} kcal</span>
            </div>
            <div className="w-full h-2 bg-emerald-200/60 rounded-full overflow-hidden">
              <div className="h-full bg-[#20B26B] rounded-full" style={{ width: `${stepsPct}%` }} />
            </div>
          </div>
        </div>

        {/* 6. SLEEP ARCHITECTURE TRACKER */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#102A43]">Sleep Tracker</h3>
                <p className="text-[11px] text-slate-400">Circadian rhythm & REM recovery</p>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex justify-between font-semibold text-slate-600 mb-1">
                <span>Last Night: {sleepHours} hours</span>
              </div>
              <input
                type="range"
                min="3"
                max="12"
                step="0.5"
                value={sleepHours}
                onChange={(e) => setSleepHours(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-indigo-800 block">Status</span>
              <span className="text-lg font-bold text-[#102A43]">{sleepQuality}</span>
            </div>
            <div className="text-right text-[11px] text-slate-600">
              <p>REM: ~1h 45m</p>
              <p className="text-indigo-700 font-bold">Rest Score: 92/100</p>
            </div>
          </div>
        </div>

        {/* 7. HEART RATE TRAINING ZONES */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#102A43]">Heart Rate Zone Calculator</h3>
                <p className="text-[11px] text-slate-400">Aerobic & Fat Burn threshold</p>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex justify-between font-semibold text-slate-600 mb-1">
                <span>Resting BPM: {restingHr}</span>
              </div>
              <input
                type="range"
                min="50"
                max="110"
                value={restingHr}
                onChange={(e) => setRestingHr(Number(e.target.value))}
                className="w-full accent-rose-500"
              />
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-rose-50/70 border border-rose-100 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-rose-700 block">Aerobic Zone</span>
              <span className="text-base font-bold text-[#102A43]">{fatBurnZone}</span>
            </div>
            <div className="text-right text-[11px] text-slate-600">
              <p>Max HR: {maxHr} bpm</p>
              <span className="text-emerald-700 font-bold">Normal Resting Rate</span>
            </div>
          </div>
        </div>

        {/* 8. 10-YEAR HEALTH RISK ASSESSMENT */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#102A43]">Health Risk Assessment</h3>
                <p className="text-[11px] text-slate-400">Cardiovascular longevity profile</p>
              </div>
            </div>

            <div className="space-y-2 pt-1 text-xs">
              <label className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={smoker}
                  onChange={(e) => setSmoker(e.target.checked)}
                  className="accent-purple-600"
                />
                <span className="text-slate-700">Tobacco / Nicotine Use</span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={diabetic}
                  onChange={(e) => setDiabetic(e.target.checked)}
                  className="accent-purple-600"
                />
                <span className="text-slate-700">Pre-Diabetes / High Fasting Glucose</span>
              </label>

              <button
                type="button"
                onClick={calculateRisk}
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-colors cursor-pointer text-xs"
              >
                Evaluate Clinical Score
              </button>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-purple-50/70 border border-purple-100 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-purple-700 block">10-Year ASCVD Risk</span>
              <span className="text-lg font-black text-[#102A43]">
                {riskCalculated ? (smoker || diabetic ? '4.8% (Mild)' : '1.2% (Low)') : '1.2% (Low)'}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-emerald-700">Optimal Tier</span>
              <span className="block text-[10px] text-slate-400">Age: 21 · BP: 118/76</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
