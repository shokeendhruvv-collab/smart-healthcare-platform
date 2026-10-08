import React, { useState } from 'react';
import { 
  X, 
  Pill, 
  CheckCircle2, 
  Truck, 
  MapPin, 
  CreditCard, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Medicine, PatientProfile } from '../types';

interface MedicineOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  medicine: Medicine | null;
  patient: PatientProfile;
  onOrderSuccess: (medicineId: string) => void;
}

export const MedicineOrderModal: React.FC<MedicineOrderModalProps> = ({
  isOpen,
  onClose,
  medicine,
  patient,
  onOrderSuccess,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState(patient.address);
  const [deliverySpeed, setDeliverySpeed] = useState<'express' | 'standard'>('express');
  const [paymentMethod, setPaymentMethod] = useState<'insurance' | 'cod' | 'card'>('insurance');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderDone, setOrderDone] = useState(false);

  React.useEffect(() => {
    if (isOpen && patient.address) {
      setDeliveryAddress(patient.address);
      setQuantity(1);
      setOrderDone(false);
    }
  }, [isOpen, patient.address]);

  if (!isOpen || !medicine) return null;

  const estimatedPricePerPack = 12.5;
  const totalPrice = (quantity * estimatedPricePerPack).toFixed(2);

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setOrderDone(true);
      onOrderSuccess(medicine.id);

      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#16B8C4', '#0878E8', '#20B26B']
        });
      } catch {}

      setTimeout(() => {
        setOrderDone(false);
        onClose();
      }, 1800);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <h3 className="text-lg font-bold text-[#102A43]">
              Prescription Refill & Delivery
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Verified pharmacy dispatch to your doorstep
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {orderDone ? (
          <div className="p-8 text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#20B26B] flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-[#102A43]">
              Refill Order Placed!
            </h4>
            <p className="text-sm text-slate-600 max-w-xs mx-auto">
              Your refill for <strong>{medicine.name} ({medicine.dosage})</strong> has been sent to LifeCare Central Pharmacy.
            </p>
            <p className="text-xs text-[#0878E8] font-semibold">
              Estimated Delivery: Today by 6:00 PM
            </p>
          </div>
        ) : (
          <form onSubmit={handleConfirmOrder} className="flex-1 overflow-y-auto p-5 space-y-4">
            
            {/* Medication Card Snippet */}
            <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-[#16B8C4] flex items-center justify-center shrink-0">
                <Pill className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#102A43]">
                  {medicine.name} ({medicine.dosage})
                </h4>
                <p className="text-xs text-slate-600 font-medium">
                  {medicine.genericName}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Prescribed by {medicine.doctor} · {medicine.frequency}
                </p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <label className="block text-xs font-bold text-[#102A43]">
                  Refill Quantity
                </label>
                <span className="text-[11px] text-slate-500">Standard pack (30 tablets)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center cursor-pointer"
                >
                  -
                </button>
                <span className="font-extrabold text-sm text-[#102A43] w-6 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(5, quantity + 1))}
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Delivery Speed */}
            <div>
              <label className="block text-xs font-bold text-[#102A43] mb-1.5 uppercase tracking-wide">
                Delivery Option
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDeliverySpeed('express')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-start transition-all cursor-pointer ${
                    deliverySpeed === 'express'
                      ? 'border-[#0878E8] bg-blue-50 text-[#0878E8]'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Express 3-Hour</span>
                  </div>
                  <span className="text-[10px] font-normal text-slate-500 mt-0.5">Today by 6:00 PM</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliverySpeed('standard')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-start transition-all cursor-pointer ${
                    deliverySpeed === 'standard'
                      ? 'border-[#0878E8] bg-blue-50 text-[#0878E8]'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Standard Free</span>
                  </div>
                  <span className="text-[10px] font-normal text-slate-500 mt-0.5">Tomorrow morning</span>
                </button>
              </div>
            </div>

            {/* Delivery Address */}
            <div>
              <label className="block text-xs font-bold text-[#102A43] mb-1">
                Delivery Address
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 focus:bg-white border border-slate-200 rounded-xl outline-hidden focus:border-[#0878E8]"
                />
              </div>
            </div>

            {/* Payment Mode */}
            <div>
              <label className="block text-xs font-bold text-[#102A43] mb-1.5 uppercase tracking-wide">
                Billing Method
              </label>
              <div className="space-y-1.5">
                <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'insurance'}
                      onChange={() => setPaymentMethod('insurance')}
                      className="accent-[#0878E8]"
                    />
                    <span className="text-xs font-semibold text-slate-800">
                      Direct Insurance Copay ({patient.insuranceProvider})
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#20B26B]">$0.00 Due</span>
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-[#0878E8]"
                    />
                    <span className="text-xs font-semibold text-slate-800">Pay on Delivery / Card</span>
                  </div>
                  <span className="text-xs font-bold text-slate-700">${totalPrice}</span>
                </label>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-[#0878E8] hover:bg-[#0769cc] disabled:bg-slate-300 text-white font-bold text-xs sm:text-sm shadow-md shadow-[#0878E8]/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Routing to Pharmacy...</span>
              ) : (
                <span>Confirm Refill Dispatch</span>
              )}
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
