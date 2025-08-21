// Simple analytics utility for tracking user events
export const trackEvent = (action: string, category?: string, label?: string) => {
  // In a real implementation, this would send events to analytics service
  // For now, just log to console
  console.log('Analytics Event:', { action, category, label });
  
  // Could integrate with Google Analytics, Mixpanel, etc.
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
    });
  }
};

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}