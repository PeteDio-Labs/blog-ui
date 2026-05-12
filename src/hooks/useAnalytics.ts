import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

const SESSION_KEY = 'blog_session_id';

function getSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    // crypto.randomUUID is only available in secure contexts (HTTPS/localhost)
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      id = crypto.randomUUID();
    } else {
      // Fallback for non-secure dev/local environments
      id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function useAnalytics() {
  const location = useLocation();
  const lastPath = useRef<string>('');
  const lastTime = useRef<number>(0);

  useEffect(() => {
    const now = Date.now();
    const path = location.pathname;

    // Debounce: skip if same path within 1 second
    if (path === lastPath.current && now - lastTime.current < 1000) {
      return;
    }

    lastPath.current = path;
    lastTime.current = now;

    const payload = {
      path,
      referrer: document.referrer || undefined,
      session_id: getSessionId(),
    };

    // Fire-and-forget — don't block UI on analytics
    fetch('/api/v1/analytics/pageview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {
      // Silently swallow analytics failures
    });
  }, [location.pathname]);
}
