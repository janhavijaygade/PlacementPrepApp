import React, { useState } from 'react';
import { X, Calendar, CheckCircle, Clock, Star, Paperclip, Send, Award } from 'lucide-react';
import { Mentor, FeedbackSummary } from '../types';
import { INITIAL_MENTORS } from '../data/mockAiEngine';

interface MentorBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentFeedback?: FeedbackSummary | null;
}

export const MentorBookingModal: React.FC<MentorBookingModalProps> = ({
  isOpen,
  onClose,
  recentFeedback
}) => {
  const [selectedMentor, setSelectedMentor] = useState<Mentor>(INITIAL_MENTORS[0]);
  const [selectedSlot, setSelectedSlot] = useState<string>('Tomorrow, 6:00 PM');
  const [attachFeedback, setAttachFeedback] = useState<boolean>(true);
  const [customNote, setCustomNote] = useState<string>('');
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
  };

  const handleReset = () => {
    setBookingSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl border border-[#E2E4F0] max-w-xl w-full flex flex-col shadow-2xl overflow-hidden my-auto">
        
        {/* Header */}
        <div className="bg-[#14237F] text-white p-5 flex items-center justify-between border-b border-blue-900/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FF6B4A] text-white shadow-md">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Book a Senior Mentor Slot</h2>
              <p className="text-xs text-blue-200">Reallocate mentor time to advanced polish & judgment calls</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {bookingSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-[#12142B]">
              Mentor Slot Confirmed!
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7280] max-w-md mx-auto">
              Your session with <strong>{selectedMentor.name}</strong> ({selectedMentor.company}) is scheduled for <strong>{selectedSlot}</strong>.
            </p>

            {attachFeedback && recentFeedback && (
              <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-xl text-xs text-left max-w-md mx-auto space-y-1">
                <span className="font-bold text-[#1E33BE] flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> AI Warm-Up Summary Attached for {selectedMentor.name}:
                </span>
                <p className="text-[#12142B]">Readiness Score: <strong>{recentFeedback.readinessBadge}</strong></p>
                <p className="text-[#6B7280] truncate">Key Focus: {recentFeedback.keyTakeaway}</p>
              </div>
            )}

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-[#1E33BE] text-white text-xs font-semibold hover:bg-[#14237F] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleConfirmBooking} className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
            
            {/* Mentor Selection */}
            <div>
              <label className="block text-xs uppercase font-bold text-[#6B7280] mb-2">
                1. Select Senior/Alum Mentor
              </label>
              <div className="space-y-2">
                {INITIAL_MENTORS.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => {
                      setSelectedMentor(m);
                      setSelectedSlot(m.nextAvailableSlot);
                    }}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      selectedMentor.id === m.id
                        ? 'border-[#1E33BE] bg-blue-50/70 ring-2 ring-blue-500/20'
                        : 'border-[#E2E4F0] bg-[#F5F6FA] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={m.avatar}
                        alt={m.name}
                        className="w-11 h-11 rounded-full object-cover border border-[#E2E4F0]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-[#12142B]">{m.name}</h4>
                          <span className="text-[10px] bg-blue-100 text-[#1E33BE] font-semibold px-1.5 py-0.5 rounded">
                            {m.batch}
                          </span>
                        </div>
                        <p className="text-xs text-[#6B7280]">{m.role} • <strong>{m.company}</strong></p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold justify-end">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{m.rating}</span>
                      </div>
                      <span className="text-[11px] text-[#6B7280]">{m.slotsGiven} slots given</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slot Time Selection */}
            <div>
              <label className="block text-xs uppercase font-bold text-[#6B7280] mb-1.5">
                2. Choose Available Slot
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['Tomorrow, 6:00 PM', 'Thursday, 8:30 PM', 'Friday, 5:00 PM', 'Saturday, 11:00 AM'].map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-2.5 rounded-lg border text-left font-medium transition-all flex items-center justify-between cursor-pointer ${
                      selectedSlot === slot
                        ? 'border-[#1E33BE] bg-[#1E33BE] text-white font-bold'
                        : 'border-[#E2E4F0] bg-white text-[#12142B] hover:bg-slate-50'
                    }`}
                  >
                    <span>{slot}</span>
                    <Clock className="w-3.5 h-3.5 opacity-80" />
                  </button>
                ))}
              </div>
            </div>

            {/* Attach Warm-Up Feedback Checkbox */}
            {recentFeedback && (
              <div className="bg-orange-50 border border-orange-200 p-3.5 rounded-xl space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={attachFeedback}
                    onChange={(e) => setAttachFeedback(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#FF6B4A] focus:ring-[#FF6B4A]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#12142B] flex items-center gap-1">
                      <Paperclip className="w-3.5 h-3.5 text-[#FF6B4A]" />
                      Attach AI Practice Warm-Up Feedback ({recentFeedback.readinessBadge})
                    </span>
                    <p className="text-[11px] text-[#6B7280]">
                      Shares your rubric breakdown & key focus areas with {selectedMentor.name} so session starts at advanced polish.
                    </p>
                  </div>
                </label>
              </div>
            )}

            {/* Custom Note */}
            <div>
              <label className="block text-xs uppercase font-bold text-[#6B7280] mb-1">
                Note for {selectedMentor.name} (Optional)
              </label>
              <textarea
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="e.g., I have warmed up on STAR structure and want to focus on my Result metrics and McKinsey style pushback..."
                className="w-full text-xs p-2.5 rounded-xl border border-[#E2E4F0] focus:ring-2 focus:ring-blue-500/20 focus:border-[#1E33BE] outline-none"
                rows={2}
              />
            </div>

            {/* Footer Buttons */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#E2E4F0]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#6B7280] hover:text-[#12142B]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#FF6B4A] hover:bg-[#e05939] text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Confirm Booking for {selectedSlot}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
