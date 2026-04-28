import { useEffect, useState } from 'react';

/**
 * Custom hook to track page visibility and manage intervals accordingly
 * Automatically pauses intervals when page is hidden and resumes when visible
 */
export function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    // Set initial state
    setIsVisible(!document.hidden);

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isVisible;
}

/**
 * Custom hook for managing intervals that respect page visibility
 * @param callback Function to execute at intervals
 * @param delay Interval delay in milliseconds
 * @param immediate Whether to execute callback immediately on mount
 */
export function useVisibilityAwareInterval(
  callback: () => void,
  delay: number,
  immediate: boolean = true
) {
  const isVisible = usePageVisibility();

  useEffect(() => {
    if (!isVisible) return;

    let interval: NodeJS.Timeout | null = null;

    if (immediate) {
      callback();
    }

    interval = setInterval(callback, delay);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [callback, delay, immediate, isVisible]);
}