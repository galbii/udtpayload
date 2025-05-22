/**
 * API services for form submission
 */

/**
 * Submit the free class form to the external API
 * @param formData Form data to submit
 * @returns Response from the API
 */
export const submitFreeClassForm = async (formData: any) => {
  try {
    // Generate unique identifiers for tracking
    const sessionId = Math.random().toString(36).substring(2, 15) + 
                     Math.random().toString(36).substring(2, 15);
    
    const generateUUID = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

    // Format date with timezone
    let selectedSlot = '';
    if (formData.appointmentDate && formData.appointmentTime) {
      // Create a new date object from the selected date
      const date = new Date(formData.appointmentDate);
      
      // Parse the time string (format: "HH:MM AM/PM")
      const timeMatch = formData.appointmentTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (!timeMatch) {
        throw new Error('Invalid time format');
      }
      
      let [_, hours, minutes, period] = timeMatch;
      let hour = parseInt(hours);
      const minute = parseInt(minutes);
      
      // Convert to 24-hour format
      if (period.toUpperCase() === 'PM' && hour < 12) {
        hour += 12;
      } else if (period.toUpperCase() === 'AM' && hour === 12) {
        hour = 0;
      }
      
      // Set the hours and minutes on the date object
      date.setHours(hour, minute, 0, 0);
      
      // Check if the appointment is within 12 hours
      const now = new Date();
      const diffInMs = date.getTime() - now.getTime();
      const diffInHours = diffInMs / (1000 * 60 * 60);
      
      if (diffInHours < 12) {
        throw new Error('Appointments must be scheduled at least 12 hours in advance.');
      }
      
      // Format the date string with timezone
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const formattedHours = hour.toString().padStart(2, '0');
      const formattedMinutes = minute.toString().padStart(2, '0');
      
      // Use Pacific Time (PT) timezone offset
      selectedSlot = `${year}-${month}-${day}T${formattedHours}:${formattedMinutes}:00-07:00`;
    }

    // Create the API payload
    const apiFormData = {
      cLNizIhBIdwpbrfvmqH8: [],
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: `+1${formData.phone.replace(/\D/g, '')}`,
      email: formData.email,
      // Ensure zip is set from any available source
      zip: formData.zip || formData.zipCode || '',
      city: formData.city || '',
      experience: formData.experience || 'beginner',
      formId: "bHbGRJjmTWG67GNRFqQY",
      location_id: "wCjIiRV3L99XP2J5wYdA",
      calendar_id: "EwO4iAyVRl5dqwH9pi1O",
      selected_slot: selectedSlot,
      selected_timezone: "America/Los_Angeles",
      sessionId,
      tag: "landing",
      eventData: {
        source: formData.source || "direct",
        referrer: typeof document !== 'undefined' ? document.referrer : "https://uniteddefensetactical.com/",
        url_params: {},
        page: {
          url: typeof window !== 'undefined' ? window.location.href : "https://uniteddefensetactical.com/",
          title: "UDT Free Demo Training"
        },
        timestamp: Date.now(),
        campaign: "",
        contactSessionIds: {
          ids: [sessionId]
        },
        type: "page-visit",
        parentId: "0QbcKCTjT25VUqQhEKpj",
        pageVisitType: "funnel",
        domain: "uniteddefensetactical.com",
        version: "v3",
        fingerprint: null,
        fbEventId: generateUUID(),
        medium: "calendar",
        mediumId: "EwO4iAyVRl5dqwH9pi1O"
      },
      sessionFingerprint: generateUUID(),
      funneEventData: {
        event_type: "optin",
        domain_name: "uniteddefensetactical.com",
        page_url: "/calendar-free-pass",
        funnel_id: "U24FpiHkrMhcsvps5TR1",
        page_id: "0QbcKCTjT25VUqQhEKpj",
        funnel_step_id: "e451b167-1a02-436c-8df1-66dd8d5c1fe4"
      },
      dateFieldDetails: [],
      Timezone: "America/Los_Angeles (GMT-07:00)",
      paymentContactId: {},
      timeSpent: Math.floor(Math.random() * 100) + 50
    };

    // Convert to FormData object
    const formDataObj = new FormData();
    formDataObj.append('formData', JSON.stringify(apiFormData));
    formDataObj.append('locationId', 'wCjIiRV3L99XP2J5wYdA');
    formDataObj.append('formId', 'bHbGRJjmTWG67GNRFqQY');
    formDataObj.append('captchaV3', 'CAPTCHA_TOKEN_PLACEHOLDER_' + sessionId);

    // Debug logging for troubleshooting
    console.log('🔄 Submitting appointment data:', {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      zipCode: formData.zipCode,
      zip: formData.zip,
      city: formData.city,
      experience: formData.experience,
      selectedSlot,
      selectedTimezone: "America/Los_Angeles",
      allKeys: Object.keys(formData),
      rawZipData: `zipCode=${JSON.stringify(formData.zipCode)}, zip=${JSON.stringify(formData.zip)}`
    });
    
    // Log the actual API payload being sent
    console.log('📦 API Payload:', {
      first_name: apiFormData.first_name,
      last_name: apiFormData.last_name,
      email: apiFormData.email,
      zip: apiFormData.zip,
      city: apiFormData.city,
      selected_slot: apiFormData.selected_slot,
      full_payload: JSON.stringify(apiFormData).substring(0, 200) + '...' // Show first 200 chars of payload
    });

    // Submit the form to the external API
    const response = await fetch('https://backend.leadconnectorhq.com/appengine/appointment', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Origin': 'https://uniteddefensetactical.com',
        'Referer': typeof document !== 'undefined' ? document.referrer : 'https://uniteddefensetactical.com/',
        'fullurl': typeof window !== 'undefined' ? window.location.href : 'https://uniteddefensetactical.com/',
        'timezone': 'America/Los_Angeles'
      },
      body: formDataObj
    });

    // Parse the response
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to book appointment');
    }

    return data;
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
};

/**
 * Send data to Zapier webhook for additional integrations
 * @param data Form data to send to Zapier
 * @returns Boolean indicating success
 */
export const sendToZapier = async (data: any) => {
  try {
    // Log the incoming data to debug ZIP code issues
    console.log('⚙️ Raw data received by sendToZapier:', {
      zip: data.zip,
      zipCode: data.zipCode,
      firstName: data.firstName,
      lastName: data.lastName,
      allKeys: Object.keys(data)
    });
    
    // Create a proper payload with all the form data
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      // Make sure zip has a value, checking all possible sources
      zip: data.zip || data.zipCode || '',
      city: data.city || '',
      email: data.email,
      phone: data.phone,
      experience: data.experience,
      source: data.source || 'website',
      timestamp: new Date().toISOString(),
      tag: "landing"
    };
    
    // Extra validation to ensure zip isn't missing
    if (!payload.zip && (data.zip || data.zipCode)) {
      console.log('⚠️ ZIP was missing, forcing it from available data');
      payload.zip = data.zip || data.zipCode;
    }
    
    // Debug logging for Zapier payload
    console.log('📤 Final Zapier payload:', {
      ...payload,
      zipDebug: `ZIP value: "${payload.zip}", Original zip: "${data.zip}", Original zipCode: "${data.zipCode}"`
    });
    
    // Use a CORS-friendly approach
    await fetch('https://services.leadconnectorhq.com/hooks/wCjIiRV3L99XP2J5wYdA/webhook-trigger/8dd278df-557a-44ce-bdf0-89bd8968e708', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    return true;
  } catch (error) {
    console.error('Error sending data to Zapier:', error);
    return false;
  }
}; 