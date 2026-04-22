import { useEffect, useRef } from 'react'

/**
 * Hook to auto-logout user after inactivity (no mouse, key, or touch events) for a given timeout (ms).
 * Calls onTimeout when triggered.
 */
export function useAutoLogout(onTimeout: () => void, timeoutMs: number = 60 * 60 * 1000) {
  const timer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const resetTimer = () => {
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        console.log('[useAutoLogout] Inactivity timeout reached.');
        onTimeout();
      }, timeoutMs);
      console.log('[useAutoLogout] Timer reset. Next timeout in', timeoutMs / 1000, 'seconds');
    };
    // Events that indicate activity
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart'];
    events.forEach(e => window.addEventListener(e, resetTimer));
    resetTimer();
    return () => {
      if (timer.current) clearTimeout(timer.current);
      events.forEach(e => window.removeEventListener(e, resetTimer));
    };
  }, [onTimeout, timeoutMs]);
}
