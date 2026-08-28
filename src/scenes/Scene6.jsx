import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const STAGES = [
  { id: 'user',    label: 'USER / APPLICATION',   color: '#6B7280', meta: 'REQ_ID: 8F2A · TENANT: A', checking: null,               pass: null },
  { id: 'id',      label: 'IDENTITY + MFA',        color: '#2563EB', meta: 'USER: analyst@corp.com',   checking: 'VERIFYING...',      pass: '✓ VERIFIED' },
  { id: 'policy',  label: 'POLICY ENGINE',         color: '#7C3AED', meta: 'ROLE: ANALYST · ACT: READ', checking: 'EVALUATING...',     pass: '✓ ALLOW' },
  { id: 'tenant',  label: 'TENANT VERIFICATION',   color: '#F59E0B', meta: 'USER_TENANT: A · REQ: A',  checking: 'CHECKING...',       pass: '✓ MATCH' },
  { id: 'priv',    label: 'LEAST PRIVILEGE',       color: '#10B981', meta: 'SCOPE: SALES_READ ONLY',   checking: 'SCOPE CHECK...',    pass: '✓ GRANTED' },
  { id: 'db',      label: 'DATA WAREHOUSE',        color: '#10B981', meta: 'TABLE: sales · ROWS: 142', checking: null,               pass: '✓ ACCESS GRANTED' },
];

const STEP_DELAY = 1100; // ms between stages

const Scene6 = ({ coords, active }) => {
  const ref = useRef(null);
  const packetRef = useRef(null);
  const [stageStates, setStageStates] = useState(STAGES.map(() => 'idle')); // idle | checking | pass
  const animRef = useRef(null);

  useEffect(() => {
    if (!active || !ref.current) return;

    // Reset
    setStageStates(STAGES.map(() => 'idle'));
    if (animRef.current) clearTimeout(animRef.current);

    // Slide in cards
    gsap.fromTo(ref.current.querySelectorAll('.s6-card'),
      { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
    );
    gsap.fromTo(ref.current.querySelector('.s6-title'),
      { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
    );

    // Animate packet through stages
    const runStages = async () => {
      await new Promise(r => setTimeout(r, 800));
      for (let i = 0; i < STAGES.length; i++) {
        setStageStates(prev => prev.map((s, idx) => idx === i ? 'checking' : s));
        await new Promise(r => setTimeout(r, STAGES[i].checking ? 700 : 300));
        setStageStates(prev => prev.map((s, idx) => idx === i ? 'pass' : s));
        if (i < STAGES.length - 1) await new Promise(r => setTimeout(r, STEP_DELAY - 700));
      }
    };
    runStages();

    return () => { if (animRef.current) clearTimeout(animRef.current); };
  }, [active]);

  return (
    <div className="scene" style={{ left: coords.x, top: coords.y }}>
      <div ref={ref} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 80px', gap: 32 }}>

        <div className="s6-title" style={{ textAlign: 'center' }}>
          <h2 className="font-heading" style={{ fontSize: '3.2rem', color: '#172554', fontWeight: 800, marginBottom: 6 }}>
            ZERO-TRUST ARCHITECTURE
          </h2>
          <p className="font-mono" style={{ fontSize: '0.85rem', color: '#9CA3AF', letterSpacing: '0.1em' }}>
            LIVE REQUEST SIMULATION — TENANT A · ANALYST · SALES READ
          </p>
        </div>

        <div style={{ position: 'relative', width: '100%', maxWidth: 900 }}>
          {/* Vertical pipeline rail */}
          <div style={{ position: 'absolute', left: 28, top: 0, bottom: 0, width: 4, background: '#E5E7EB', borderRadius: 2, zIndex: 0 }} />

          {/* Animated packet dot — travels along the rail */}
          <div ref={packetRef} style={{ position: 'absolute', left: 16, top: 0, zIndex: 30, pointerEvents: 'none' }}>
            {stageStates.map((state, i) => state === 'checking' && (
              <div key={i} style={{
                position: 'absolute',
                left: 0,
                top: `calc(${i * (100 / STAGES.length)}% + ${i * 8}px)`,
                width: 28, height: 28, borderRadius: '50%',
                background: '#2563EB',
                boxShadow: '0 0 0 6px rgba(37,99,235,0.2), 0 0 20px rgba(37,99,235,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: 'packet-glow 1s ease-in-out infinite',
                transition: 'background 0.4s'
              }} />
            ))}
          </div>

          {/* Stage cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingLeft: 60 }}>
            {STAGES.map((stage, i) => {
              const state = stageStates[i];
              const isChecking = state === 'checking';
              const isPassed = state === 'pass';

              return (
                <div key={stage.id} className="s6-card" style={{
                  padding: '16px 24px', borderRadius: 12, background: '#fff',
                  border: `2px solid ${isChecking ? stage.color : isPassed ? (stage.color === '#EF4444' ? '#EF4444' : '#10B981') : '#E5E7EB'}`,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  boxShadow: isChecking ? `0 0 20px ${stage.color}30` : '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'all 0.4s ease',
                  position: 'relative', zIndex: 10,
                }}>
                  {/* Step number dot */}
                  <div style={{
                    position: 'absolute', left: -42, width: 24, height: 24, borderRadius: '50%',
                    background: isPassed ? '#10B981' : isChecking ? stage.color : '#E5E7EB',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: isPassed || isChecking ? '#fff' : '#9CA3AF',
                    fontSize: '0.7rem', fontWeight: 700,
                    transition: 'all 0.4s', zIndex: 20,
                    boxShadow: isChecking ? `0 0 0 5px ${stage.color}25` : 'none'
                  }}>
                    {isPassed ? '✓' : i + 1}
                  </div>

                  <div>
                    <h3 className="font-heading" style={{ fontSize: '1.1rem', fontWeight: 700, color: isChecking ? stage.color : '#172554', transition: 'color 0.3s' }}>{stage.label}</h3>
                    <p className="font-mono" style={{ fontSize: '0.72rem', color: isChecking ? stage.color : '#9CA3AF', marginTop: 3, transition: 'color 0.3s' }}>
                      {isChecking ? stage.checking : stage.meta}
                    </p>
                  </div>

                  {isPassed && stage.pass && (
                    <span className="badge badge-pass" style={{ animation: 'fade-up 0.3s ease forwards' }}>
                      {stage.pass}
                    </span>
                  )}
                  {isChecking && (
                    <span className="badge badge-checking" style={{ animation: 'status-flash 0.8s ease-in-out infinite' }}>
                      PROCESSING
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scene6;
