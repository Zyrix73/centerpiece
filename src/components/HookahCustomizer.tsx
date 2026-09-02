import { useState, useEffect, useCallback } from 'react';
import {
  X, Check, Snowflake, Droplet, Flame, Crown, Sparkles,
  ArrowRight, ArrowLeft, Wine, Wind, Leaf,
} from 'lucide-react';
import { OrnamentDivider } from './PageShell';

export interface Mix {
  id: number;
  name: string;
  flavors: string;
  description: string;
  tagline: string;
  category: string;
  sort_order: number;
  image_url?: string;
}

interface HookahCustomizerProps {
  open: boolean;
  onClose: () => void;
  mixes: Mix[];
}

type StepId = 'base' | 'flavor' | 'ice' | 'review';

interface Step {
  id: StepId;
  label: string;
  icon: typeof Flame;
}

const STEPS: Step[] = [
  { id: 'base', label: 'Choose Your Base', icon: Wine },
  { id: 'flavor', label: 'Pick Your Flavor', icon: Leaf },
  { id: 'ice', label: 'Select Your Ice', icon: Snowflake },
  { id: 'review', label: 'Your Mix', icon: Sparkles },
];

const BASE_OPTIONS = [
  { id: 'classic', label: 'Classic Bowl', desc: 'Traditional Egyptian clay bowl', icon: Flame },
  { id: 'fruit', label: 'Fruit Head', desc: 'Carved fruit bowl for a sweeter smoke', icon: Crown },
  { id: 'phunnel', label: 'Phunnel Bowl', desc: 'Keeps juices in for longer sessions', icon: Wine },
];

const ICE_OPTIONS = [
  { id: 'none', label: 'No Ice', desc: 'Warm, full-bodied smoke', icon: Wind },
  { id: 'standard', label: 'Ice in Base', desc: 'Cooler, smoother draw', icon: Snowflake },
  { id: 'mint', label: 'Mint Infusion', desc: 'Refreshing minty finish', icon: Droplet },
];

export default function HookahCustomizer({ open, onClose, mixes }: HookahCustomizerProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedBase, setSelectedBase] = useState<string | null>(null);
  const [selectedMix, setSelectedMix] = useState<Mix | null>(null);
  const [selectedIce, setSelectedIce] = useState<string | null>(null);

  const reset = useCallback(() => {
    setStepIndex(0);
    setSelectedBase(null);
    setSelectedMix(null);
    setSelectedIce(null);
  }, []);

  useEffect(() => {
    if (open) {
      reset();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open, reset]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  const currentStep = STEPS[stepIndex];
  const isLastStep = stepIndex === STEPS.length - 1;
  const canAdvance = (() => {
    if (currentStep.id === 'base') return selectedBase !== null;
    if (currentStep.id === 'flavor') return selectedMix !== null;
    if (currentStep.id === 'ice') return selectedIce !== null;
    return true;
  })();

  const handleNext = () => {
    if (!canAdvance) return;
    if (!isLastStep) setStepIndex((i) => i + 1);
  };
  const handleBack = () => { if (stepIndex > 0) setStepIndex((i) => i - 1); };

  const selectedBaseObj = BASE_OPTIONS.find((b) => b.id === selectedBase);
  const selectedIceObj = ICE_OPTIONS.find((i) => i.id === selectedIce);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#150f0d] border border-amber-700/40 rounded-sm shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#150f0d]/95 backdrop-blur-sm border-b border-amber-900/30 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-500 text-xs tracking-[0.3em] uppercase">
            <Sparkles size={16} aria-hidden="true" />
            Build Your Hookah
          </div>
          <button
            onClick={onClose}
            className="text-sand-400 hover:text-amber-300 transition-colors p-1"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Step indicator */}
        <div className="px-6 pt-6 pb-2">
          <div className="flex items-center justify-between mb-2">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isComplete = i < stepIndex;
              const isActive = i === stepIndex;
              return (
                <div key={step.id} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        isComplete
                          ? 'bg-amber-600 border-amber-600 text-white'
                          : isActive
                            ? 'bg-amber-600/20 border-amber-500 text-amber-300'
                            : 'border-amber-800/40 text-amber-700/50'
                      }`}
                    >
                      {isComplete ? <Check size={16} /> : <Icon size={16} />}
                    </div>
                    <span
                      className={`text-[9px] tracking-widest uppercase whitespace-nowrap ${
                        isActive ? 'text-amber-300' : isComplete ? 'text-amber-500/70' : 'text-amber-800/40'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-px mx-2 mb-5 transition-colors duration-300 ${
                        i < stepIndex ? 'bg-amber-600/60' : 'bg-amber-900/30'
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step content */}
        <div className="px-6 py-6">
          {currentStep.id === 'base' && (
            <div>
              <h3 className="font-serif text-2xl text-amber-100 mb-2">Choose Your Base</h3>
              <p className="text-sand-400 text-sm mb-6">Select the bowl style for your session.</p>
              <div className="space-y-3">
                {BASE_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = selectedBase === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedBase(opt.id)}
                      className={`w-full flex items-center gap-4 p-4 border rounded-sm transition-all duration-300 text-left ${
                        isSelected
                          ? 'border-amber-500 bg-amber-600/15'
                          : 'border-amber-900/30 hover:border-amber-700/50 bg-[#1a1210]/60'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'bg-amber-600 text-white' : 'bg-amber-900/20 text-amber-400'
                      }`}>
                        <Icon size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="font-serif text-amber-100 text-base">{opt.label}</p>
                        <p className="text-sand-400 text-sm">{opt.desc}</p>
                      </div>
                      {isSelected && <Check size={18} className="text-amber-400 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {currentStep.id === 'flavor' && (
            <div>
              <h3 className="font-serif text-2xl text-amber-100 mb-2">Pick Your Flavor</h3>
              <p className="text-sand-400 text-sm mb-6">Choose from our signature mixes.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mixes.map((mix) => {
                  const isSelected = selectedMix?.id === mix.id;
                  return (
                    <button
                      key={mix.id}
                      onClick={() => setSelectedMix(mix)}
                      className={`relative flex flex-col border rounded-sm overflow-hidden transition-all duration-300 text-left ${
                        isSelected
                          ? 'border-amber-500 ring-1 ring-amber-500/40'
                          : 'border-amber-900/30 hover:border-amber-700/50'
                      }`}
                    >
                      {mix.image_url && (
                        <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#1a1210]">
                          <img
                            src={mix.image_url}
                            alt={mix.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1210] via-transparent to-transparent" aria-hidden="true" />
                        </div>
                      )}
                      <div className="p-3 flex-1">
                        <p className="font-serif text-amber-100 text-sm">{mix.name}</p>
                        <p className="text-amber-400/70 text-xs italic">{mix.tagline}</p>
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-amber-600 flex items-center justify-center">
                          <Check size={14} className="text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {currentStep.id === 'ice' && (
            <div>
              <h3 className="font-serif text-2xl text-amber-100 mb-2">Select Your Ice</h3>
              <p className="text-sand-400 text-sm mb-6">Customize the temperature of your smoke.</p>
              <div className="space-y-3">
                {ICE_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = selectedIce === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedIce(opt.id)}
                      className={`w-full flex items-center gap-4 p-4 border rounded-sm transition-all duration-300 text-left ${
                        isSelected
                          ? 'border-amber-500 bg-amber-600/15'
                          : 'border-amber-900/30 hover:border-amber-700/50 bg-[#1a1210]/60'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'bg-amber-600 text-white' : 'bg-amber-900/20 text-amber-400'
                      }`}>
                        <Icon size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="font-serif text-amber-100 text-base">{opt.label}</p>
                        <p className="text-sand-400 text-sm">{opt.desc}</p>
                      </div>
                      {isSelected && <Check size={18} className="text-amber-400 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {currentStep.id === 'review' && selectedMix && selectedBaseObj && selectedIceObj && (
            <div className="text-center">
              <h3 className="font-serif text-2xl text-amber-100 mb-2">Your Perfect Mix</h3>
              <p className="text-sand-400 text-sm mb-6">Here's what your hookah master will prepare.</p>
              <OrnamentDivider />
              <div className="my-8 flex flex-col items-center gap-6">
                {selectedMix.image_url && (
                  <div className="relative w-40 h-40 rounded-sm overflow-hidden border border-amber-700/30">
                    <img src={selectedMix.image_url} alt={selectedMix.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-amber-300/60 mb-1">Flavor</p>
                    <p className="font-serif text-xl text-amber-100">{selectedMix.name}</p>
                    <p className="text-amber-400/70 text-sm italic">{selectedMix.tagline}</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-amber-300/60 mb-1">Base</p>
                    <p className="font-serif text-lg text-amber-200">{selectedBaseObj.label}</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-amber-300/60 mb-1">Ice</p>
                    <p className="font-serif text-lg text-amber-200">{selectedIceObj.label}</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#1a1210]/60 border border-amber-900/30 rounded-sm p-4 mb-2">
                <p className="text-sand-300 text-sm leading-relaxed">
                  {selectedMix.description}
                </p>
                <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                  {selectedMix.flavors.split(' • ').map((f) => (
                    <span key={f} className="inline-block px-2.5 py-1 text-xs rounded-full bg-amber-100/10 text-amber-200/80 border border-amber-300/20">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-amber-200/90 italic text-sm mt-6">
                "Ask your server to build this for you, or let Mina craft something custom."
              </p>
            </div>
          )}
        </div>

        {/* Footer nav */}
        <div className="sticky bottom-0 z-10 bg-[#150f0d]/95 backdrop-blur-sm border-t border-amber-900/30 px-6 py-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={stepIndex === 0}
            className={`flex items-center gap-2 px-4 py-2 text-sm tracking-widest uppercase transition-all duration-300 ${
              stepIndex === 0
                ? 'text-amber-800/30 cursor-not-allowed'
                : 'text-sand-300 hover:text-amber-300'
            }`}
          >
            <ArrowLeft size={16} />
            Back
          </button>
          {!isLastStep ? (
            <button
              onClick={handleNext}
              disabled={!canAdvance}
              className={`flex items-center gap-2 px-6 py-2.5 text-sm tracking-widest uppercase rounded-sm transition-all duration-300 ${
                canAdvance
                  ? 'bg-amber-600 hover:bg-amber-500 text-white font-semibold'
                  : 'bg-amber-900/20 text-amber-700/50 cursor-not-allowed'
              }`}
            >
              Next
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-sm tracking-widest uppercase font-semibold rounded-sm transition-all duration-300"
            >
              <Check size={16} />
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
