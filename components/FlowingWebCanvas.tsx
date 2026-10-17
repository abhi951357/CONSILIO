'use client';

import React, { useEffect, useRef } from 'react';

interface FlowingWebCanvasProps {
  className?: string;
  lineCount?: number;
}

export function FlowingWebCanvas({ className = '', lineCount = 32 }: FlowingWebCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);
    let step = 0;

    let mouseX = width * 0.5;
    let mouseY = height * 0.5;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      // Smoothly interpolate mouse
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      step += 0.008;

      const lines = lineCount;
      const baseWaveY = height * 0.58;
      const waveAmplitude = Math.min(height * 0.18, 90);

      // Draw flowing mesh strands
      for (let i = 0; i < lines; i++) {
        const progress = i / lines;
        const lineOffset = i * 4.5;
        const phaseOffset = i * 0.045;

        // Gradient color for each line (from glowing mint teal to deep cyan/blue)
        const alpha = Math.sin(progress * Math.PI) * 0.42 + 0.06;
        const strokeColor = i % 2 === 0
          ? `rgba(20, 243, 193, ${alpha})`
          : `rgba(14, 210, 180, ${alpha * 0.85})`;

        ctx.beginPath();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = i % 5 === 0 ? 1.5 : 1.0;

        const points = 7;
        const segmentWidth = width / (points - 1);

        for (let p = 0; p < points; p++) {
          const x = p * segmentWidth;
          
          // Harmonic undulating wave formula
          const wave1 = Math.sin(step * 1.5 + p * 0.75 + phaseOffset) * waveAmplitude;
          const wave2 = Math.cos(step * 1.1 + p * 0.5 + phaseOffset * 1.5) * (waveAmplitude * 0.55);
          
          // Subtle mouse interaction warp
          const distToMouse = Math.hypot(x - mouseX, (baseWaveY + lineOffset) - mouseY);
          const mouseFactor = Math.max(0, 1 - distToMouse / 380) * 35;
          const mouseDisplacement = Math.sin(step * 2 + distToMouse * 0.02) * mouseFactor;

          const y = baseWaveY + lineOffset + wave1 + wave2 + mouseDisplacement;

          if (p === 0) {
            ctx.moveTo(x, y);
          } else {
            const prevX = (p - 1) * segmentWidth;
            const prevY =
              baseWaveY +
              lineOffset +
              Math.sin(step * 1.5 + (p - 1) * 0.75 + phaseOffset) * waveAmplitude +
              Math.cos(step * 1.1 + (p - 1) * 0.5 + phaseOffset * 1.5) * (waveAmplitude * 0.55);

            // Bezier control points for smooth curving ribbon
            const cpX1 = prevX + segmentWidth * 0.5;
            const cpY1 = prevY;
            const cpX2 = prevX + segmentWidth * 0.5;
            const cpY2 = y;
            ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, x, y);
          }
        }

        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [lineCount]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
