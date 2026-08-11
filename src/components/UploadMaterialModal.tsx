import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle2, Sparkles, Tag } from 'lucide-react';
import { AgentType, UploadedMaterial } from '../types';
import { AGENT_CONFIGS } from '../data/mockAiEngine';

interface UploadMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentType: AgentType;
  onMaterialUploaded: (material: UploadedMaterial) => void;
}

export const UploadMaterialModal: React.FC<UploadMaterialModalProps> = ({
  isOpen,
  onClose,
  agentType,
  onMaterialUploaded
}) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [tagsInput, setTagsInput] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const config = AGENT_CONFIGS[agentType];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newMaterial: UploadedMaterial = {
      id: `mat-${Date.now()}`,
      agentType,
      title: title.trim(),
      content: content.trim(),
      uploadedAt: 'Just now',
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean)
    };

    onMaterialUploaded(newMaterial);
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setTitle('');
    setContent('');
    setTagsInput('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl border border-[#E2E4F0] max-w-lg w-full flex flex-col shadow-2xl overflow-hidden my-auto">
        
        {/* Header */}
        <div className="bg-[#14237F] text-white p-5 flex items-center justify-between border-b border-blue-900/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600/40 border border-blue-400/30">
              <Upload className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Upload Practice Material</h2>
              <p className="text-xs text-blue-200">Inject past mentor notes & questions for {config.name}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#12142B]">
              Material Added to AI Context Bank!
            </h3>
            <p className="text-xs text-[#6B7280] max-w-sm mx-auto">
              <strong>"{title}"</strong> is now active. The {config.name} agent will draw from these notes during your warm-up questions.
            </p>
            <div className="pt-2">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-xl bg-[#1E33BE] text-white text-xs font-semibold hover:bg-[#14237F] transition-colors cursor-pointer"
              >
                Return to Practice
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl text-xs text-[#12142B] flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#1E33BE] shrink-0 mt-0.5" />
              <span>
                Add historical mentor feedback notes, past question banks, or college case writeups. The AI will use this as runtime context.
              </span>
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-[#6B7280] mb-1">
                Document Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. McKinsey 2025 Fit Round Notes / EV Market Sizing Data"
                className="w-full text-xs p-2.5 rounded-xl border border-[#E2E4F0] focus:ring-2 focus:ring-blue-500/20 focus:border-[#1E33BE] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-[#6B7280] mb-1">
                Paste Practice Notes / Question Context
              </label>
              <textarea
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste key observations, mentor feedback patterns, or reference statistics here..."
                rows={5}
                className="w-full text-xs p-2.5 rounded-xl border border-[#E2E4F0] focus:ring-2 focus:ring-blue-500/20 focus:border-[#1E33BE] outline-none font-mono text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-[#6B7280] mb-1">
                Tags (Comma Separated)
              </label>
              <div className="relative">
                <Tag className="w-3.5 h-3.5 text-[#6B7280] absolute left-3 top-3" />
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="STAR, Consulting, Placement2026"
                  className="w-full text-xs p-2.5 pl-9 rounded-xl border border-[#E2E4F0] focus:ring-2 focus:ring-blue-500/20 focus:border-[#1E33BE] outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#E2E4F0]">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-xs font-semibold text-[#6B7280] hover:text-[#12142B]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#1E33BE] hover:bg-[#14237F] text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Save to Context Bank</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
