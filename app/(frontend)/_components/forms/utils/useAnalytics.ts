'use client';

/**
 * Custom hook for analytics tracking in the application
 * This implementation supports Google Analytics 4 tracking
 */
const useAnalytics = () => {
  /**
   * Track form submission events
   * @param formName - Name of the form being submitted
   * @param formData - Data associated with the form
   */
  const trackForm = (formName: string, formData: Record<string, any>) => {
    try {
      // Check if GA4 is available
      if (typeof window !== 'undefined' && 'gtag' in window) {
        const gtag = (window as any).gtag;
        
        // Track form submission event
        gtag('event', 'form_submission', {
          form_name: formName,
          form_id: formData.id || `form_${Date.now()}`,
          form_source: formData.source || 'website',
          ...formData
        });
        
        // Also track as conversion if it's a free lesson form
        if (formName === 'free_lesson') {
          gtag('event', 'conversion', {
            send_to: 'AW-XXXXXXXXXX/XXXXXXXXX',
            form_type: 'free_lesson',
            value: 1,
            currency: 'USD'
          });
        }
        
        console.log(`📊 Analytics: Tracked form submission for ${formName}`);
      }
    } catch (error) {
      // Silently fail to not disrupt the user experience
      console.error('Analytics tracking error:', error);
    }
  };
  
  /**
   * Track page view events
   * @param pagePath - Path of the page being viewed
   * @param pageTitle - Title of the page
   */
  const trackPageView = (pagePath: string, pageTitle: string) => {
    try {
      if (typeof window !== 'undefined' && 'gtag' in window) {
        const gtag = (window as any).gtag;
        
        gtag('event', 'page_view', {
          page_path: pagePath,
          page_title: pageTitle,
          page_location: window.location.href
        });
        
        console.log(`📊 Analytics: Tracked page view for ${pagePath}`);
      }
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  };
  
  /**
   * Track custom events
   * @param eventName - Name of the event
   * @param eventParams - Additional parameters for the event
   */
  const trackEvent = (eventName: string, eventParams: Record<string, any> = {}) => {
    try {
      if (typeof window !== 'undefined' && 'gtag' in window) {
        const gtag = (window as any).gtag;
        
        gtag('event', eventName, eventParams);
        
        console.log(`📊 Analytics: Tracked custom event ${eventName}`);
      }
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  };
  
  return {
    trackForm,
    trackPageView,
    trackEvent
  };
};

export default useAnalytics; 