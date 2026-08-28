import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const DataPacket = ({ startId, endId, status = 'normal', active = true, delay = 0, duration = 2, repeat = -1 }) => {
  const packetRef = useRef(null);

  const colors = {
    normal: '#2563EB',  // Blue
    verified: '#10B981', // Mint
    warning: '#F59E0B',  // Amber
    blocked: '#EF4444'   // Red
  };

  useEffect(() => {
    if (!active || !packetRef.current) return;
    
    // We expect the parent to have SVG paths with IDs matching startId to endId.
    // For simplicity in this React version without a complex path finding system,
    // we'll just animate position if we pass x, y arrays, or we can use GSAP MotionPathPlugin 
    // if we register it. Since we didn't install MotionPathPlugin, we'll animate x/y.
    
    // Actually, passing x1,y1 to x2,y2 is easier for a straight line. 
    // But since paths can be complex, let's just make a generic CSS animation for a packet.
  }, [active, startId, endId]);

  return (
    <div ref={packetRef} style={{
      width: 12, height: 12,
      borderRadius: '50%',
      backgroundColor: colors[status],
      boxShadow: `0 0 10px ${colors[status]}`,
      position: 'absolute',
      // The actual movement will be handled by the parent scene GSAP timelines
      // This is just the visual representation of the packet
    }}>
      <div style={{
        width: '100%', height: '100%',
        borderRadius: '50%',
        backgroundColor: '#fff',
        opacity: 0.8,
        transform: 'scale(0.5)'
      }} />
    </div>
  );
};

export const SecurityNode = ({ label, icon: Icon, color = '#2563EB', status = 'idle', x = 0, y = 0 }) => {
  return (
    <div className="glass-panel" style={{
      position: 'absolute',
      left: x, top: y,
      transform: 'translate(-50%, -50%)',
      padding: '12px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      border: `1px solid ${status === 'active' ? color : 'rgba(23, 37, 84, 0.1)'}`,
      boxShadow: status === 'active' ? `0 0 20px ${color}33` : '0 4px 6px rgba(0,0,0,0.05)',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        width: 32, height: 32,
        borderRadius: '8px',
        backgroundColor: `${color}15`,
        color: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Icon size={18} />
      </div>
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 600,
        fontSize: '0.9rem',
        color: '#172554'
      }}>
        {label}
      </div>
    </div>
  );
};
