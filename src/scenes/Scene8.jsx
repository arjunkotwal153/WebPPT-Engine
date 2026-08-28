import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Check, X } from 'lucide-react';

const DECISIONS = [
  { id: 'identity', label: 'IDENTITY?',  sub: 'Is the user authenticated?' },
  { id: 'mfa',      label: 'MFA?',       sub: 'Multi-factor verified?' },
  { id: 'tenant',   label: 'TENANT?',    sub: 'Does tenant match?' },
  { id: 'role',     label: 'ROLE?',      sub: 'Is role permitted?' },
  { id: 'policy',   label: 'POLICY?',    sub: 'Does policy allow?' },
];

const Scene8 = ({ coords, active }) => {
  const ref = useRef(null);
  const [activeStep, setActiveStep] = useState(-1);
  const [stepStates, setStepStates] = useState(DECISIONS.map(() => 'idle')); // idle | checking | pass

  useEffect(() => {
    if (!active || !ref.current) return;
    setActiveStep(-1);
    setStepStates(DECISIONS.map(() => 'idle'));

    gsap.fromTo(ref.current.querySelector('.s8-title'),
      { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
    );

    const run = async () => {
      await new Promise(r => setTimeout(r, 700));
      for (let i = 0; i < DECISIONS.length; i++) {
        setActiveStep(i);
        setStepStates(prev => prev.map((s, idx) => idx === i ? 'checking' : s));
        await new Promise(r => setTimeout(r, 750));
        setStepStates(prev => prev.map((s, idx) => idx === i ? 'pass' : s));
        await new Promise(r => setTimeout(r, 500));
      }
      setActiveStep(DECISIONS.length); // final — ALLOW
    };
    run();
  }, [active]);

  const allPassed = activeStep === DECISIONS.length;

  const Diamond = ({ decision, index }) => {
    const state = stepStates[index];
    const isActive = state === 'checking';
    const isPassed = state === 'pass';
    const size = 130;

    return (
      <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          background: isActive ? '#DBEAFE' : isPassed ? '#ECFDF5' : '#F9FAFB',
          border: `2.5px solid ${isActive ? '#2563EB' : isPassed ? '#10B981' : '#D1D5DB'}`,
          transform: 'rotate(45deg)', borderRadius: 10,
          boxShadow: isActive ? '0 0 20px rgba(37,99,235,0.25)' : 'none',
          transition: 'all 0.4s ease'
        }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: 8 }}>
          <div className="font-heading" style={{ fontSize: '0.75rem', fontWeight: 700, color: isActive ? '#1E40AF' : isPassed ? '#047857' : '#6B7280', lineHeight: 1.2, transition: 'color 0.4s' }}>
            {isActive ? '...' : isPassed ? '✓' : decision.label}
          </div>
          {!isActive && !isPassed && (
            <div className="font-mono" style={{ fontSize: '0.55rem', color: '#9CA3AF', marginTop: 2 }}>{decision.label}</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="scene" style={{ left: coords.x, top: coords.y }}>
      <div ref={ref} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '50px 80px', gap: 30 }}>

        <div className="s8-title" style={{ textAlign: 'center' }}>
          <h2 className="font-heading" style={{ fontSize: '3.2rem', color: '#172554', fontWeight: 800, marginBottom: 6 }}>
            ACCESS DECISION ENGINE
          </h2>
          <p className="font-mono" style={{ fontSize: '0.85rem', color: '#9CA3AF', letterSpacing: '0.1em' }}>EVERY REQUEST EVALUATED IN REAL-TIME</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginTop: 20 }}>

          {/* Entry */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            <div className="glass-panel" style={{ padding: '12px 20px', background: '#1E3A8A', color: 'white', borderRadius: 30, border: 'none', flexShrink: 0 }}>
              <span className="font-mono" style={{ fontWeight: 700, fontSize: '0.85rem' }}>ACCESS REQUEST</span>
            </div>
            <div style={{ width: 40, height: 2, background: '#9CA3AF' }} />
          </div>

          {/* Decision flow — horizontal */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {DECISIONS.map((d, i) => (
              <React.Fragment key={d.id}>
                <Diamond decision={d} index={i} />
                {i < DECISIONS.length - 1 && (
                  <div style={{ width: 30, height: 2, background: stepStates[i] === 'pass' ? '#10B981' : '#D1D5DB', transition: 'background 0.5s', position: 'relative', zIndex: 0 }} />
                )}
              </React.Fragment>
            ))}

            {/* Fork */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginLeft: 30, alignItems: 'flex-start', position: 'relative' }}>
              
              {/* Vertical connector line for fork */}
              <div style={{ position: 'absolute', left: 0, top: '25%', bottom: '25%', width: 2, background: '#D1D5DB', zIndex: 0 }} />
              
              {/* ALLOW branch */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 30, height: 2, background: allPassed ? '#10B981' : '#D1D5DB', transition: 'background 0.5s' }} />
                <div style={{
                  padding: '14px 24px', borderRadius: 12,
                  background: allPassed ? '#ECFDF5' : '#F9FAFB',
                  border: `2.5px solid ${allPassed ? '#10B981' : '#D1D5DB'}`,
                  display: 'flex', alignItems: 'center', gap: 10,
                  transition: 'all 0.5s',
                  boxShadow: allPassed ? '0 0 24px rgba(16,185,129,0.2)' : 'none'
                }}>
                  <Check size={22} color={allPassed ? '#10B981' : '#9CA3AF'} />
                  <span className="font-heading" style={{ fontWeight: 700, color: allPassed ? '#047857' : '#9CA3AF', fontSize: '1.2rem', transition: 'color 0.5s' }}>ALLOW</span>
                </div>
                <span className="font-mono" style={{ fontSize: '0.65rem', color: '#10B981', fontWeight: 700 }}>YES</span>
              </div>

              {/* DENY branch */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 30, height: 2, background: '#D1D5DB' }} />
                <div style={{ padding: '14px 24px', borderRadius: 12, background: '#FEF2F2', border: '2px solid #FCA5A5', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <X size={22} color="#EF4444" />
                  <span className="font-heading" style={{ fontWeight: 700, color: '#B91C1C', fontSize: '1.2rem' }}>DENY</span>
                </div>
                <span className="font-mono" style={{ fontSize: '0.65rem', color: '#EF4444', fontWeight: 700 }}>NO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scene8;
