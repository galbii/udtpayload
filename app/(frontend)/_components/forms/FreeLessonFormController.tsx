'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ModernModalUI from './ModernModalUI';
import { UDTCalendar } from './Calendar';
import { submitFreeClassForm, sendToZapier } from './services/api';
import useAnalytics from './utils/useAnalytics';
import { getCityFromZip } from './utils/zipUtils';

interface FreeLessonFormControllerProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialData?: Partial<FormData>;
  formSource?: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  appointmentDate: Date | null;
  appointmentTime: string;
  experience: string;
  zipCode?: string;
  zip?: string;
  city?: string;
  [key: string]: any;
}

// Styled components for enhanced UI
const FormWrapper = styled.div`
  max-width: 100%;
  background-color: #1e1f21;
  color: #e0e0e0;
  padding: 0 0 10px 0;
  position: relative;
  z-index: 10001; /* Higher than the modal container */
  
  @media (max-width: 480px) {
    padding: 0 0 8px 0;
  }
`;

const FormField = styled.div`
  margin-bottom: 20px;
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #e0e0e0;
    text-transform: uppercase;
    font-size: 0.9rem;
    letter-spacing: 0.5px;
  }
  
  input, select, textarea {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #444;
    border-radius: 6px;
    font-size: 1rem;
    background-color: #2c2d30;
    color: #e0e0e0;
    transition: all 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: #b71c1c;
      box-shadow: 0 0 0 1px rgba(183, 28, 28, 0.2);
    }
    
    &::placeholder {
      color: #999;
    }
  }
  
  .error-message {
    color: #f44336;
    font-size: 0.875rem;
    margin-top: 4px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 16px;
    
    label {
      font-size: 0.8rem;
      margin-bottom: 6px;
    }
    
    input, select, textarea {
      padding: 10px 14px;
      font-size: 0.95rem;
    }
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  
  @media (max-width: 480px) {
    gap: 12px;
  }
`;

const StepHeading = styled.h3`
  color: #f44336;
  margin-top: 0;
  margin-bottom: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
  position: relative;
  padding-bottom: 10px;
  font-size: 1.5rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  
  &:after {
    display: none;
  }
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-bottom: 12px;
    padding-bottom: 8px;
  }
`;

const StepDescription = styled.p`
  margin-bottom: 24px;
  color: #999;
  font-size: 0.95rem;
  line-height: 1.5;
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin-bottom: 20px;
    line-height: 1.4;
  }
`;

const FreeClassInfo = styled.div`
  background-color: rgba(183, 28, 28, 0.1);
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 20px;
  border-left: 4px solid #b71c1c;
  
  h4 {
    margin-top: 0;
    color: #f44336;
    font-size: 1.1rem;
  }
  
  ul {
    margin-bottom: 0;
    padding-left: 20px;
    color: #e0e0e0;
    
    li {
      margin-bottom: 4px;
    }
  }
`;

const ConfirmationDetails = styled.div`
  background-color: #2c2d30;
  padding: 16px;
  border-radius: 6px;
  margin-top: 16px;
  
  .detail-row {
    display: flex;
    margin-bottom: 12px;
    
    .label {
      width: 120px;
      font-weight: 500;
      flex-shrink: 0;
      color: #999;
    }
    
    .value {
      color: #e0e0e0;
    }
  }
`;

// Buttons with tactical styling
const ActionButton = styled.button<{ isPrimary?: boolean }>`
  min-width: 120px;
  padding: 12px 24px;
  background: ${props => props.isPrimary 
    ? 'linear-gradient(to right, #b71c1c, #880e0e)' 
    : 'transparent'};
  border: ${props => props.isPrimary 
    ? 'none' 
    : '1px solid #444'};
  color: ${props => props.isPrimary ? '#fff' : '#999'};
  border-radius: 6px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.isPrimary 
      ? 'linear-gradient(to right, #c62828, #9a0f0f)' 
      : 'rgba(255, 255, 255, 0.05)'};
    color: ${props => props.isPrimary ? '#fff' : '#e0e0e0'};
  }
  
  &:disabled {
    background: ${props => props.isPrimary ? '#333' : 'transparent'};
    color: #666;
    cursor: not-allowed;
  }
  
  @media (max-width: 480px) {
    min-width: 100px;
    padding: 10px 20px;
    font-size: 0.9rem;
  }
`;

// Progress bar - make it more sleek
const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: rgba(68, 68, 68, 0.3);
  margin-bottom: 24px;
  border-radius: 2px;
  overflow: hidden;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 480px) {
    height: 3px;
    margin-bottom: 20px;
  }
`;

const ProgressFill = styled.div<{ percent: number }>`
  height: 100%;
  width: ${props => props.percent}%;
  background: linear-gradient(to right, #b71c1c, #f44336);
  transition: width 0.3s ease;
  box-shadow: 0 0 8px rgba(244, 67, 54, 0.4);
`;

const ErrorMessage = styled.div`
  background-color: rgba(244, 67, 54, 0.1);
  color: #f44336;
  padding: 12px 16px;
  border-radius: 6px;
  margin: 16px 0;
  font-size: 14px;
  display: flex;
  align-items: center;
  border: 1px solid rgba(244, 67, 54, 0.3);

  &::before {
    content: "⚠️";
    margin-right: 8px;
    font-size: 16px;
  }
`;

const SuccessContainer = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #1e1f21;
  color: #e0e0e0;
  
  .success-icon {
    width: 80px;
    height: 80px;
    background-color: #28a745;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    margin: 0 auto 20px;
    box-shadow: 0 4px 8px rgba(40, 167, 69, 0.2);
  }
  
  h3 {
    color: #28a745;
    margin-bottom: 12px;
    font-size: 1.5rem;
  }
  
  p {
    color: #555;
    margin-bottom: 24px;
    font-size: 1rem;
    line-height: 1.5;
  }
  
  .follow-up {
    background-color: #f8f9fa;
    padding: 12px 16px;
    border-radius: 4px;
    text-align: left;
    margin-bottom: 16px;
    border-left: 3px solid #28a745;
    
    h4 {
      margin-top: 0;
      margin-bottom: 8px;
      color: #333;
      font-size: 1.1rem;
    }
    
    p {
      margin: 0;
      color: #555;
    }
  }
`;

export const FreeLessonFormController: React.FC<FreeLessonFormControllerProps> = ({
  isOpen: propIsOpen = false,
  onClose,
  initialData = {},
  formSource = 'website'
}) => {
  // Use our custom analytics hook
  const { trackForm } = useAnalytics();
  
  const [isOpen, setIsOpen] = useState(propIsOpen);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: initialData.firstName || '',
    lastName: initialData.lastName || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    appointmentDate: initialData.appointmentDate || null,
    appointmentTime: initialData.appointmentTime || '',
    experience: initialData.experience || 'beginner',
    zipCode: initialData.zipCode || '',
    zip: initialData.zip || initialData.zipCode || '',
    city: initialData.city || '',
    source: formSource,
    ...initialData
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [zapierStatus, setZapierStatus] = useState<{sent: boolean, error: string | null}>({sent: false, error: null});

  // Handle modal opening from props
  useEffect(() => {
    // Only update state if it's different from current state
    if (isOpen !== propIsOpen) {
      setIsOpen(propIsOpen);
    }
  }, [propIsOpen, isOpen]);

  // Add calendar styles when the form opens
  useEffect(() => {
    // Only add/remove class if the state has changed
    if (isOpen) {
      if (!document.body.classList.contains('modal-open')) {
        document.body.classList.add('modal-open');
      }
    } else {
      if (document.body.classList.contains('modal-open')) {
        document.body.classList.remove('modal-open');
      }
    }
    
    return () => {
      // Clean up class on unmount
      if (document.body.classList.contains('modal-open')) {
        document.body.classList.remove('modal-open');
      }
    };
  }, [isOpen]);

  const handleClose = () => {
    if (onClose) onClose();
    setIsOpen(false);
    document.body.classList.remove('modal-open');
    
    // Reset form after closing animation
    setTimeout(() => {
      if (!submissionSuccess) {
        setCurrentStep(0);
        setSubmissionError(null);
      }
    }, 300);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle zipCode updates specially to ensure both zipCode and zip fields are set
    if (name === 'zipCode') {
      console.log(`✏️ Zip code updated to: "${value}"`);
      setFormData(prev => ({
        ...prev,
        zipCode: value,
        zip: value // Explicitly set both fields 
      }));
      
      // ZIP code to city autofill functionality
      if (value.length === 5) {
        console.log(`🔍 Looking up city for ZIP: ${value}`);
        try {
          const city = getCityFromZip(value);
          console.log(`🏙️ City lookup result: ${city} for ZIP: ${value}`);
          
          if (city && city !== "Unknown") {
            console.log(`✅ Autofilling city: ${city} for ZIP: ${value}`);
            setFormData(prev => ({
              ...prev,
              zipCode: value,
              zip: value, // Ensure zip is also set here
              city
            }));
          } else {
            console.log(`❌ No city found for ZIP: ${value}`);
          }
        } catch (error) {
          console.error('Error finding city from ZIP:', error);
        }
      }
    } else {
      // Normal input handling for other fields
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleDateSelected = (date: Date | null) => {
    setFormData(prev => ({
      ...prev,
      appointmentDate: date
    }));
    
    // Clear error
    if (errors.appointmentDate) {
      setErrors(prev => ({
        ...prev,
        appointmentDate: ''
      }));
    }
  };

  const handleTimeSlotSelected = (timeSlot: any) => {
    setFormData(prev => ({
      ...prev,
      appointmentTime: timeSlot.time,
      timeSlotId: timeSlot.id
    }));
    
    // Clear error
    if (errors.appointmentTime) {
      setErrors(prev => ({
        ...prev,
        appointmentTime: ''
      }));
    }
  };

  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Different validation rules based on the current step
    if (currentStep === 0) {
      // Personal Information
      if (!formData.firstName?.trim()) {
        newErrors.firstName = 'First name is required';
      }
      
      if (!formData.lastName?.trim()) {
        newErrors.lastName = 'Last name is required';
      }
      
      if (!formData.email?.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      
      if (!formData.phone?.trim()) {
        newErrors.phone = 'Phone number is required';
      }
      
      // Optional validation for zip code - only validate if provided
      if (formData.zipCode?.trim() && !/^\d{5}(-\d{4})?$/.test(formData.zipCode.trim())) {
        newErrors.zipCode = 'Please enter a valid zip code';
      }
    } else if (currentStep === 1) {
      // Appointment
      if (!formData.appointmentDate) {
        newErrors.appointmentDate = 'Please select a date';
      }
      
      if (!formData.appointmentTime) {
        newErrors.appointmentTime = 'Please select a time slot';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    const isValid = validateCurrentStep();
    
    if (isValid) {
      if (currentStep === 0) {
        // Log zipCode value before sending to Zapier
        console.log(`📋 ZipCode before sending to Zapier: "${formData.zipCode}"`);
        
        // Send data to Zapier webhook when user clicks "Choose Date & Time"
        const zapierData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          zip: formData.zipCode, // Make sure zipCode is passed as zip
          city: formData.city || '',
          email: formData.email,
          phone: formData.phone,
          experience: formData.experience,
          source: formData.source || 'website'
        };
        
        // Extra check to ensure zip is set
        if (!zapierData.zip && formData.zipCode) {
          zapierData.zip = formData.zipCode;
        }
        
        console.log('📤 Sending to Zapier with data:', {
          ...zapierData,
          formSource: formSource,
          zipDebug: `Original zipCode: "${formData.zipCode}", Sending as zip: "${zapierData.zip}"`
        });
        
        // Send to Zapier but don't block form progression
        sendToZapier(zapierData)
          .then(success => {
            setZapierStatus({sent: success, error: null});
          })
          .catch(error => {
            setZapierStatus({
              sent: false, 
              error: error instanceof Error ? error.message : 'Unknown error'
            });
          });
      }

      if (currentStep < 2) {
        setCurrentStep(prev => prev + 1);
      } else {
        await handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmissionError(null);
    
    try {
      // Log zip code values before submission
      console.log(`📋 ZIP values before submission: zipCode="${formData.zipCode}", zip="${formData.zip}"`);
      
      // Ensure zip is set from zipCode if needed
      if (!formData.zip && formData.zipCode) {
        setFormData(prevData => ({
          ...prevData,
          zip: formData.zipCode
        }));
      }
      
      // Format date with timezone for API
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
        
        console.log('📅 Formatted date:', selectedSlot);

        // Update the formData with the formatted date slot
        setFormData(prevData => ({
          ...prevData,
          selectedSlot
        }));
      } else {
        throw new Error('Date and time are required');
      }

      // Log what we're sending to the API
      console.log('📝 Form data being submitted:', {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        zipCode: formData.zipCode,
        zip: formData.zip,
        city: formData.city,
        appointment: selectedSlot
      });

      // Submit the form to the API with the updated formData (including formatted date)
      const response = await submitFreeClassForm({
        ...formData,
        // Ensure zip is sent correctly by explicitly setting it here
        zip: formData.zipCode || formData.zip,
        selectedSlot,
        selected_timezone: "America/Los_Angeles"
      });
      
      // Track conversion in Google Analytics 4 using our custom hook
      trackForm('free_lesson', {
        id: response.id || `form_${Date.now()}`,
        source: formData.source || 'website',
        experience: formData.experience,
        appointmentDate: formData.appointmentDate
      });
      
      // Success state
      setSubmissionSuccess(true);
      setCurrentStep(3); // Move to success step
      
    } catch (error) {
      console.error('❌ Error submitting form:', error);
      setSubmissionError(error instanceof Error ? error.message : 'Failed to book appointment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderContactInfoStep = () => (
    <FormWrapper className="calendar-styled-form">
      <StepHeading>Registration Form</StepHeading>
      <StepDescription>Please provide your contact details for your 90-minute free session.</StepDescription>
      
      <FormGrid>
        <FormField>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Your first name"
          />
          {errors.firstName && <div className="error-message">{errors.firstName}</div>}
        </FormField>
        
        <FormField>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Your last name"
          />
          {errors.lastName && <div className="error-message">{errors.lastName}</div>}
        </FormField>
      </FormGrid>
      
      <FormGrid>
        <FormField>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your email address"
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </FormField>
        
        <FormField>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Your phone number"
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </FormField>
      </FormGrid>
      
      <FormGrid>
        <FormField>
          <label htmlFor="zipCode">Zip Code</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode || ''}
            onChange={handleInputChange}
            placeholder="Enter your ZIP code"
            maxLength={5}
            pattern="\d{5}"
            title="Five digit ZIP code"
          />
          {errors.zipCode && <div className="error-message">{errors.zipCode}</div>}
        </FormField>
        
        <FormField>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city || ''}
            onChange={handleInputChange}
            placeholder="Auto-filled from ZIP"
            readOnly={!!formData.city}
          />
        </FormField>
      </FormGrid>
      
      <FormField>
        <label htmlFor="experience">Prior Experience</label>
        <select
          id="experience"
          name="experience"
          value={formData.experience}
          onChange={handleInputChange}
        >
          <option value="beginner">Beginner (0-1 year)</option>
          <option value="intermediate">Intermediate (1-3 years)</option>
          <option value="advanced">Advanced (3+ years)</option>
          <option value="none">No prior experience</option>
        </select>
      </FormField>
      
      <FreeClassInfo>
        <h4>What to Expect in Your Free Training Session</h4>
        <ul>
          <li>90-minute personalized training with an expert instructor</li>
          <li>Introduction to proper stance, grip, and safety procedures</li>
          <li>Basic tactical defense techniques tailored to your experience level</li>
          <li>Q&A session to address your specific training goals</li>
        </ul>
      </FreeClassInfo>
    </FormWrapper>
  );

  const renderAppointmentStep = () => (
    <>
      <StepHeading>Claim Your Class</StepHeading>
      <StepDescription>
        Select a date and time for your complimentary 90-minute tactical defense class.
      </StepDescription>
      
      <div className="udt-calendar">
        <UDTCalendar
          onDateSelected={handleDateSelected}
          onTimeSlotSelected={handleTimeSlotSelected}
        />
      </div>
      
      {errors.appointmentDate && <div className="error-message">{errors.appointmentDate}</div>}
      {errors.appointmentTime && <div className="error-message">{errors.appointmentTime}</div>}
    </>
  );

  const renderConfirmationStep = () => {
    // Calculate appointment end time (90 minutes after start)
    const calculateEndTime = (startTime: string) => {
      const timeMatch = startTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (!timeMatch) return '';
      
      let [_, hours, minutes, period] = timeMatch;
      let hour = parseInt(hours);
      const minute = parseInt(minutes);
      
      // Convert to 24-hour format for calculation
      if (period.toUpperCase() === 'PM' && hour < 12) {
        hour += 12;
      } else if (period.toUpperCase() === 'AM' && hour === 12) {
        hour = 0;
      }
      
      // Add 90 minutes
      let totalMinutes = hour * 60 + minute + 90;
      let newHour = Math.floor(totalMinutes / 60) % 24;
      let newMinute = totalMinutes % 60;
      
      // Convert back to 12-hour format
      let newPeriod = newHour >= 12 ? 'PM' : 'AM';
      newHour = newHour % 12;
      if (newHour === 0) newHour = 12;
      
      return `${newHour}:${newMinute.toString().padStart(2, '0')} ${newPeriod}`;
    };
    
    // Format date and time for display
    const getTimeDisplay = () => {
      if (!formData.appointmentDate || !formData.appointmentTime) {
        return 'No appointment selected';
      }
      
      // Format the date: "Tuesday, June 15, 2023"
      const formatTimeDisplay = (timeStr: string) => {
        // Add end time to display
        const endTime = calculateEndTime(timeStr);
        return `${timeStr} - ${endTime}`;
      };
      
      const date = new Date(formData.appointmentDate);
      const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      
      return (
        <>
          <div className="date">{formattedDate}</div>
          <div className="time">{formatTimeDisplay(formData.appointmentTime)}</div>
        </>
      );
    };
    
    return (
      <FormWrapper>
        <StepHeading>Confirm Your Free Training Session</StepHeading>
        <StepDescription>Please review your information before confirming your appointment.</StepDescription>
        
        <ConfirmationDetails>
          <div className="detail-row">
            <div className="label">Name:</div>
            <div className="value">{formData.firstName} {formData.lastName}</div>
          </div>
          
          <div className="detail-row">
            <div className="label">Contact:</div>
            <div className="value">{formData.email}<br />{formData.phone}</div>
          </div>
          
          {formData.zipCode && (
            <div className="detail-row">
              <div className="label">Location:</div>
              <div className="value">{formData.city ? `${formData.city}, ` : ''}{formData.zipCode}</div>
            </div>
          )}
          
          <div className="detail-row">
            <div className="label">Experience:</div>
            <div className="value">
              {formData.experience === 'beginner' && 'Beginner (0-1 year)'}
              {formData.experience === 'intermediate' && 'Intermediate (1-3 years)'}
              {formData.experience === 'advanced' && 'Advanced (3+ years)'}
              {formData.experience === 'none' && 'No prior experience'}
            </div>
          </div>
          
          <div className="detail-row">
            <div className="label">Session:</div>
            <div className="value">{getTimeDisplay()}</div>
          </div>
        </ConfirmationDetails>
        
        <FreeClassInfo>
          <h4>What to Expect</h4>
          <ul>
            <li>90-minute personalized training with an expert instructor</li>
            <li>Introduction to proper stance, grip, and safety procedures</li>
            <li>Basic tactical defense techniques tailored to your experience level</li>
            <li>Q&A session to address your specific training goals</li>
          </ul>
        </FreeClassInfo>
      </FormWrapper>
    );
  };

  const renderSuccessMessage = () => (
    <SuccessContainer className="calendar-styled-success">
      <div className="success-icon">✓</div>
      <h3>Appointment Confirmed!</h3>
      <p>
        Your 90-minute tactical defense class has been scheduled. We've sent a confirmation
        email to {formData.email} with all the details.
      </p>
      <p className="next-steps">
        Please arrive 10 minutes before your scheduled time. Our instructor is looking 
        forward to meeting you!
      </p>
      <ActionButton isPrimary onClick={handleClose} style={{ marginTop: '20px' }}>
        Close
      </ActionButton>
    </SuccessContainer>
  );

  const getStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderContactInfoStep();
      case 1:
        return renderAppointmentStep();
      case 2:
        return renderConfirmationStep();
      case 3:
        return renderSuccessMessage();
      default:
        return null;
    }
  };

  const getButtonText = () => {
    if (currentStep === 0) return 'Next';
    if (currentStep === 1) return 'Review Details';
    if (currentStep === 2) return submitting ? 'Submitting...' : 'Schedule My Session';
    return '';
  };

  const getProgress = () => {
    // Calculate progress percentage based on the current step
    return (currentStep / 3) * 100;
  };

  const renderFooterContent = () => {
    // Don't show buttons on success step
    if (currentStep === 3) return null;
    
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {currentStep > 0 ? (
          <ActionButton onClick={handlePrevious}>
            Back
          </ActionButton>
        ) : (
          <div></div> // Empty div for spacing
        )}
        
        <ActionButton 
          isPrimary 
          onClick={handleNext}
          disabled={submitting}
        >
          {getButtonText()}
        </ActionButton>
      </div>
    );
  };

  return (
    <ModernModalUI
      isOpen={isOpen}
      onClose={handleClose}
      title={
        currentStep === 3
          ? "Confirmation"
          : "United Defense Tactical"
      }
      darkMode={true}
      showHook={currentStep === 1}
      hookMessage="Limited spots available for this week!"
      footerContent={renderFooterContent()}
    >
      <div className="udt-calendar">
        {currentStep < 4 && (
          <>
            <ProgressBar>
              <ProgressFill percent={getProgress()} />
            </ProgressBar>
          </>
        )}
        
        {getStepContent()}
      </div>
    </ModernModalUI>
  );
};

export default FreeLessonFormController; 