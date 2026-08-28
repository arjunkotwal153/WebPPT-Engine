import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Database, Filter, Lock, AlertTriangle } from 'lucide-react';

const ROWS = [
  { tenant: 'A', id: '1001', data: 'Sales Q1 — $2.4M',  owned: true },
  { tenant: 'A', id: '1002', data: 'Sales Q2 — $3.1M',  owned: true },
  { tenant: 'B', id: '2001', data: 'HR Records',         owned: false },
  { tenant: 'B', id: '2002', data: 'Payroll Data',       owned: false },
  { tenant: 'C', id: '3001', data: 'Marketing Budget',   owned: false },
  { tenant: 'C', id: '3002', data: 'Campaign Results',   owned: false },
];

const Scene7 = ({ coords, active }) => {
  const ref = useRef(null);
  const [phase, setPhase] = useState('idle'); // idle | scanning | filtered | cross-attempt | blocked

  useEffect(() => {
    if (!active || !ref.current) return;
    setPhase('idle');

    const tl = gsap.timeline();
    tl.fromTo(ref.current.querySelectorAll('.s7-anim'),
      { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' }
    );

    const seq = async () => {
      await new Promise(r => setTimeout(r, 900));
      setPhase('scanning');
      await new Promise(r => setTimeout(r, 1000));
      setPhase('filtered');
      await new Promise(r => setTimeout(r, 1500));
      setPhase('cross-attempt');
      await new Promise(r => setTimeout(r, 800));
      setPhase('blocked');
    };
    seq();
  }, [active]);

  const isFiltered = phase === 'filtered' || phase === 'cross-attempt' || phase === 'blocked';
  const isBlocked = phase === 'blocked';
  const isCross = phase === 'cross-attempt' || phase === 'blocked';

  return (
    <div className="scene" style={{ left: coords.x, top: coords.y }}>
      <div ref={ref} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '50px 80px', gap: 32 }}>

        <div className="s7-anim" style={{ textAlign: 'center' }}>
          <h2 className="font-heading" style={{ fontSize: '3.2rem', color: '#172554', fontWeight: 800, marginBottom: 6 }}>TENANT ISOLATION + ROW-LEVEL SECURITY</h2>
          <p className="font-mono" style={{ fontSize: '0.85rem', color: '#9CA3AF', letterSpacing: '0.1em' }}>TENANT A USER QUERIES THE SHARED DATABASE</p>
        </div>

        <div style={{ display: 'flex', gap: 50, alignItems: 'flex-start', width: '100%', maxWidth: 1100 }}>

          {/* Query panel */}
          <div className="s7-anim" style={{ flex: '0 0 320px' }}>
            <div className="glass-panel" style={{ padding: '24px', background: '#1F2937', border: '1.5px solid #374151', borderRadius: 14 }}>
              <p className="font-mono" style={{ color: '#6B7280', fontSize: '0.75rem', marginBottom: 12 }}>// Incoming Query</p>
              <pre className="font-mono" style={{ color: '#93C5FD', fontSize: '1rem', margin: 0, lineHeight: 1.7 }}>SELECT *{'\n'}FROM customers</pre>
              <div style={{ marginTop: 18, padding: '12px 16px', background: '#374151', borderRadius: 10, borderLeft: '4px solid #10B981' }}>
                <span className="font-mono" style={{ color: '#6EE7B7', fontSize: '0.75rem', display: 'block', marginBottom: 4 }}>+ RLS POLICY APPLIED</span>
                <span className="font-mono" style={{ color: '#D1D5DB', fontSize: '0.85rem' }}>WHERE tenant_id = 'A'</span>
              </div>
            </div>

            <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Filter size={20} color="#2563EB" />
              <span className="font-mono" style={{ fontSize: '0.8rem', color: '#2563EB', fontWeight: 700 }}>
                {phase === 'scanning' ? 'SCANNING ROWS...' : isFiltered ? 'RLS FILTER ACTIVE' : 'AWAITING QUERY'}
              </span>
            </div>

            {/* Cross-tenant attempt alert */}
            {isCross && (
              <div style={{ marginTop: 16, padding: '14px 18px', background: '#FEF2F2', border: '2px solid #EF4444', borderRadius: 12, animation: 'fade-up 0.4s ease' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <AlertTriangle size={20} color="#EF4444" />
                  <span className="font-heading" style={{ fontWeight: 700, color: '#B91C1C', fontSize: '0.9rem' }}>CROSS-TENANT ATTEMPT</span>
                </div>
                <p className="font-mono" style={{ fontSize: '0.75rem', color: '#991B1B' }}>User A → Tenant B Data</p>
                {isBlocked && <div className="badge badge-fail" style={{ marginTop: 8 }}>✕ ACCESS DENIED · LOGGED</div>}
              </div>
            )}
          </div>

          {/* Database table */}
          <div className="s7-anim glass-panel" style={{ flex: 1, padding: '24px', background: '#fff', border: '2px solid #E5E7EB', position: 'relative', overflow: 'hidden' }}>

            {/* Scan line overlay */}
            {phase === 'scanning' && (
              <div style={{ position: 'absolute', left: 0, right: 0, height: 4, background: 'rgba(37,99,235,0.4)', animation: 'scan-line 0.9s linear forwards', zIndex: 20 }} />
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <Database size={22} color="#172554" />
              <h3 className="font-heading" style={{ fontSize: '1.1rem', color: '#172554', fontWeight: 700 }}>SHARED DATABASE — customers</h3>
            </div>

            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '60px 80px 1fr 80px', padding: '8px 12px', borderBottom: '2px solid #E5E7EB', marginBottom: 8 }}>
              {['TENANT', 'ID', 'DATA', 'STATUS'].map(h => (
                <span key={h} className="font-mono" style={{ fontSize: '0.7rem', color: '#6B7280', fontWeight: 700, letterSpacing: '0.08em' }}>{h}</span>
              ))}
            </div>

            {/* Rows */}
            {ROWS.map((row, i) => {
              const locked = isFiltered && !row.owned;
              const highlighted = isFiltered && row.owned;
              const crossTarget = isCross && !row.owned && row.tenant === 'B' && i < 4;

              return (
                <div key={row.id} style={{
                  display: 'grid', gridTemplateColumns: '60px 80px 1fr 80px',
                  padding: '10px 12px', borderRadius: 8, marginBottom: 4,
                  background: crossTarget && isBlocked ? '#FEF2F2' : highlighted ? '#DBEAFE' : locked ? '#F9FAFB' : '#fff',
                  border: `1.5px solid ${crossTarget && isBlocked ? '#FCA5A5' : highlighted ? '#93C5FD' : locked ? '#F3F4F6' : '#E5E7EB'}`,
                  opacity: locked && !crossTarget ? 0.45 : 1,
                  transition: 'all 0.5s ease',
                }}>
                  <span className="font-mono" style={{ fontWeight: 700, color: row.tenant === 'A' ? '#2563EB' : row.tenant === 'B' ? '#10B981' : '#7C3AED', fontSize: '0.9rem' }}>
                    {row.tenant}
                  </span>
                  <span className="font-mono" style={{ fontSize: '0.8rem', color: '#6B7280' }}>{row.id}</span>
                  <span className="font-mono" style={{ fontSize: '0.8rem', color: locked ? '#9CA3AF' : '#172554' }}>{row.data}</span>
                  <span>
                    {highlighted && <span className="badge badge-pass" style={{ fontSize: '0.6rem' }}>VISIBLE</span>}
                    {locked && !crossTarget && <Lock size={14} color="#9CA3AF" />}
                    {crossTarget && isBlocked && <span className="badge badge-fail" style={{ fontSize: '0.6rem' }}>DENIED</span>}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scene7;
