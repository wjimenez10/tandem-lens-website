import { useCallback } from 'react';

// Google Analytics 4 Event Tracking
export const useAnalytics = () => {
  const trackEvent = useCallback(
    (
      eventName: string,
      eventParams?: Record<string, string | number | boolean>
    ) => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, eventParams);
      }
      // Also log to console for debugging
      console.log('[GA4]', eventName, eventParams);
    },
    []
  );

  const trackCTAClick = useCallback(
    (ctaName: string, location: string, persona?: string) => {
      trackEvent('cta_click', {
        cta_name: ctaName,
        location,
        persona: persona || 'general',
      });
    },
    [trackEvent]
  );

  const trackFormSubmit = useCallback(
    (formName: string, status: 'success' | 'error') => {
      trackEvent('form_submit', {
        form_name: formName,
        status,
      });
    },
    [trackEvent]
  );

  const trackLeadMagnetDownload = useCallback(
    (resourceName: string, email: string) => {
      trackEvent('lead_magnet_download', {
        resource_name: resourceName,
        email_domain: email.split('@')[1],
      });
    },
    [trackEvent]
  );

  const trackSectionView = useCallback(
    (sectionName: string) => {
      trackEvent('section_view', {
        section_name: sectionName,
      });
    },
    [trackEvent]
  );

  const trackDemoRequest = useCallback(
    (product: string, source: string) => {
      trackEvent('demo_request', {
        product,
        source,
      });
    },
    [trackEvent]
  );

  return {
    trackEvent,
    trackCTAClick,
    trackFormSubmit,
    trackLeadMagnetDownload,
    trackSectionView,
    trackDemoRequest,
  };
};

export default useAnalytics;
