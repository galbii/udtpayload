'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import './Calendar.scss';

// Placeholder icons - can be replaced with an icon library of your choice
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const TargetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const CalendarContainer = styled.div`
  background-color: #1e1f21;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
`;

const Header = styled.div`
  background: linear-gradient(to right, #b71c1c, #880e0e);
  padding: 16px;
  color: white;
  text-align: center;
`;

const TrainingInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  div {
    display: flex;
    align-items: center;
    margin-right: 16px;
    font-size: 14px;
    
    svg {
      margin-right: 6px;
      color: #f44336;
    }
  }
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #2c2d30;
  
  .month-title {
    font-size: 15px;
    font-weight: 500;
    color: #fff;
  }
`;

const NavigationButton = styled.button<{ disabled?: boolean }>`
  background: none;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.disabled ? '#666' : '#f44336'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.disabled ? 'transparent' : 'rgba(244, 67, 54, 0.1)'};
  }
  
  &:focus {
    outline: none;
  }
`;

const WeekdaysRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 8px 0;
  
  div {
    text-align: center;
    font-size: 12px;
    font-weight: 500;
    color: #999;
  }
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  padding: 0 12px 12px;
`;

const DayCell = styled.div<{ isToday?: boolean; isSelected?: boolean; isPast?: boolean; isEmpty?: boolean }>`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  border-radius: 50%;
  margin: 0 auto;
  color: ${props => {
    if (props.isEmpty) return 'transparent';
    if (props.isPast) return '#666';
    if (props.isSelected) return '#fff';
    return '#e0e0e0';
  }};
  background-color: ${props => {
    if (props.isSelected) return '#b71c1c';
    if (props.isToday) return 'rgba(244, 67, 54, 0.2)';
    return 'transparent';
  }};
  border: ${props => props.isToday && !props.isSelected ? '1px solid #f44336' : 'none'};
  cursor: ${props => (props.isEmpty || props.isPast) ? 'default' : 'pointer'};
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => {
      if (props.isEmpty || props.isPast) return 'transparent';
      if (props.isSelected) return '#b71c1c';
      return 'rgba(244, 67, 54, 0.1)';
    }};
  }
`;

const TimeSlotsContainer = styled.div`
  padding: 16px;
  
  h3 {
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 16px;
    color: #e0e0e0;
    
    svg {
      margin-right: 8px;
      color: #f44336;
    }
  }
`;

const TimeSlotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

const TimeSlot = styled.div<{ isSelected?: boolean }>`
  background-color: ${props => props.isSelected ? '#b71c1c' : '#2c2d30'};
  border: 1px solid ${props => props.isSelected ? '#f44336' : '#444'};
  border-radius: 6px;
  padding: 10px 0;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  
  .time {
    font-size: 14px;
    font-weight: 500;
    color: ${props => props.isSelected ? '#fff' : '#e0e0e0'};
  }
  
  .label {
    font-size: 12px;
    color: ${props => props.isSelected ? 'rgba(255, 255, 255, 0.7)' : '#999'};
    margin-top: 4px;
  }
  
  &:hover {
    background-color: ${props => props.isSelected ? '#b71c1c' : '#3c3c3c'};
    border-color: ${props => props.isSelected ? '#f44336' : '#555'};
  }
`;

const NotesSection = styled.div`
  padding: 12px 16px;
  border-top: 1px solid #444;
  font-size: 12px;
  color: #999;
  font-style: italic;
`;

const ErrorMessage = styled.div`
  background-color: #f44336;
  color: white;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
`;

interface UDTCalendarProps {
  onDateSelected?: (date: Date | null) => void;
  onTimeSlotSelected?: (slot: { id: string; time: string; label: string }) => void;
}

const UDTCalendar: React.FC<UDTCalendarProps> = ({ 
  onDateSelected, 
  onTimeSlotSelected 
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Time slots configuration
  const weekdayTimeSlots = [
    { id: '1', time: '9:00 AM', label: 'Morning' },
    { id: '2', time: '10:30 AM', label: 'Morning' },
    { id: '3', time: '12:00 PM', label: 'Midday' },
    { id: '4', time: '1:30 PM', label: 'Afternoon' },
    { id: '5', time: '3:00 PM', label: 'Afternoon' },
    { id: '6', time: '4:30 PM', label: 'Evening' },
    { id: '7', time: '6:00 PM', label: 'Evening' }
  ];
  
  const weekendTimeSlots = [
    { id: '1', time: '9:30 AM', label: 'Morning' },
    { id: '2', time: '11:00 AM', label: 'Morning' },
    { id: '3', time: '12:30 PM', label: 'Midday' },
    { id: '4', time: '2:00 PM', label: 'Afternoon' },
    { id: '5', time: '3:30 PM', label: 'Afternoon' },
    { id: '6', time: '5:00 PM', label: 'Evening' }
  ];
  
  const getDaysArray = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Get the day of the week of the first day (0-6)
    const firstDayOfWeek = firstDay.getDay();
    
    // Empty cells before the first day of the month
    const daysArray = Array(firstDayOfWeek).fill(null);
    
    // Fill in the days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      daysArray.push(new Date(year, month, day));
    }
    
    return daysArray;
  };
  
  const changeMonth = (increment: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + increment);
    
    // If moving to a new month, reset selection
    if (selectedDate && 
        (selectedDate.getMonth() !== newMonth.getMonth() || 
         selectedDate.getFullYear() !== newMonth.getFullYear())) {
      setSelectedDate(null);
      setSelectedSlot(null);
      
      // If onDateSelected is provided, call with null
      if (onDateSelected) {
        onDateSelected(null);
      }
      
      // If onTimeSlotSelected is provided, reset
      if (onTimeSlotSelected) {
        onTimeSlotSelected({ id: '', time: '', label: '' });
      }
    }
    
    setCurrentMonth(newMonth);
  };
  
  const isPrevDisabled = () => {
    const today = new Date();
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    
    return prevMonth.getMonth() < today.getMonth() && 
           prevMonth.getFullYear() <= today.getFullYear();
  };
  
  const isNextDisabled = () => {
    const today = new Date();
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    // Limit selection to at most 30 days in advance
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    
    return nextMonth.getMonth() > thirtyDaysFromNow.getMonth() && 
           nextMonth.getFullYear() >= thirtyDaysFromNow.getFullYear();
  };
  
  // Check if a date/time is within 12 hours of now
  const isWithinTwelveHours = (date: Date | null, time?: string): boolean => {
    if (!date) return false;
    
    const now = new Date();
    const selectedDateTime = new Date(date);
    
    if (time) {
      // Parse the time string (format: "HH:MM AM/PM")
      const timeMatch = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (timeMatch) {
        let [_, hours, minutes, period] = timeMatch;
        let hour = parseInt(hours);
        const minute = parseInt(minutes);
        
        // Convert to 24-hour format
        if (period.toUpperCase() === 'PM' && hour < 12) {
          hour += 12;
        } else if (period.toUpperCase() === 'AM' && hour === 12) {
          hour = 0;
        }
        
        selectedDateTime.setHours(hour, minute, 0, 0);
      }
    } else {
      // If no time is provided, assume the earliest time slot for that day
      // For weekdays: 9:00 AM, for weekends: 10:00 AM
      const isWeekend = selectedDateTime.getDay() === 0 || selectedDateTime.getDay() === 6;
      selectedDateTime.setHours(isWeekend ? 10 : 9, 0, 0, 0);
    }
    
    // Calculate the difference in milliseconds
    const diffInMs = selectedDateTime.getTime() - now.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    
    // Return true if appointment is less than 12 hours from now
    return diffInHours < 12;
  };
  
  const handleDateClick = (day: Date | null) => {
    if (!day || isPastDate(day) || isBeyondThirtyDays(day)) return;
    
    // Check if the selection is within 12 hours
    if (isWithinTwelveHours(day)) {
      setErrorMessage('Appointments must be scheduled at least 12 hours in advance.');
      return;
    }
    
    setErrorMessage(null);
    setSelectedDate(day);
    setSelectedSlot(null);
    
    // If onDateSelected is provided, call with the selected date
    if (onDateSelected) {
      onDateSelected(day);
    }
    
    // If onTimeSlotSelected is provided, reset
    if (onTimeSlotSelected) {
      onTimeSlotSelected({ id: '', time: '', label: '' });
    }
  };
  
  const handleTimeSlotClick = (index: number) => {
    const slots = getTimeSlots();
    
    if (index < 0 || index >= slots.length || !selectedDate) return;
    
    // Check if the selection is within 12 hours
    if (isWithinTwelveHours(selectedDate, slots[index].time)) {
      setErrorMessage('Appointments must be scheduled at least 12 hours in advance.');
      return;
    }
    
    setErrorMessage(null);
    setSelectedSlot(index);
    
    // If onTimeSlotSelected is provided, call with the selected slot
    if (onTimeSlotSelected) {
      onTimeSlotSelected(slots[index]);
    }
  };
  
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };
  
  const isPastDate = (date: Date | null) => {
    if (!date) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    
    return date < today;
  };
  
  const isToday = (date: Date | null) => {
    if (!date) return false;
    
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  
  const isBeyondThirtyDays = (date: Date | null) => {
    if (!date) return false;
    
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    thirtyDaysFromNow.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    
    return date > thirtyDaysFromNow;
  };
  
  const getTimeSlots = () => {
    if (!selectedDate) return [];
    
    // Check if the selected date is a weekend (Saturday or Sunday)
    const isWeekend = selectedDate.getDay() === 0 || selectedDate.getDay() === 6;
    
    return isWeekend ? weekendTimeSlots : weekdayTimeSlots;
  };
  
  return (
    <CalendarContainer>
      <Header>
        <h3>Schedule Your Free Class</h3>
        <TrainingInfo>
          <div>
            <CalendarIcon />
            <span>90-minute session</span>
          </div>
          <div>
            <ClockIcon />
            <span>Various time slots</span>
          </div>
          <div>
            <TargetIcon />
            <span>Personalized training</span>
          </div>
        </TrainingInfo>
      </Header>
      
      {errorMessage && (
        <ErrorMessage>
          {errorMessage}
        </ErrorMessage>
      )}
      
      <div>
        <CalendarHeader>
          <NavigationButton 
            onClick={() => changeMonth(-1)}
            disabled={isPrevDisabled()}
          >
            <ChevronLeftIcon />
          </NavigationButton>
          
          <div className="month-title">
            {formatDate(currentMonth)}
          </div>
          
          <NavigationButton
            onClick={() => changeMonth(1)}
            disabled={isNextDisabled()}
          >
            <ChevronRightIcon />
          </NavigationButton>
        </CalendarHeader>
        
        <WeekdaysRow>
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </WeekdaysRow>
        
        <DaysGrid>
          {getDaysArray().map((day, index) => {
            // Skip rendering for null days
            if (day === null) {
              return (
                <DayCell
                  key={index}
                  isEmpty={true}
                  isPast={false}
                  isToday={false}
                  isSelected={false}
                >
                  {''}
                </DayCell>
              );
            }
            
            // For valid date objects
            return (
              <DayCell
                key={index}
                isToday={isToday(day)}
                isSelected={
                  selectedDate && day
                    ? day.getDate() === selectedDate.getDate() &&
                      day.getMonth() === selectedDate.getMonth() &&
                      day.getFullYear() === selectedDate.getFullYear()
                    : false
                }
                isPast={isPastDate(day)}
                isEmpty={false}
                onClick={() => handleDateClick(day)}
              >
                {day.getDate()}
              </DayCell>
            );
          })}
        </DaysGrid>
      </div>
      
      {selectedDate && (
        <TimeSlotsContainer>
          <h3>
            <ClockIcon />
            Select a time slot
          </h3>
          
          <TimeSlotGrid>
            {getTimeSlots().map((slot, index) => (
              <TimeSlot
                key={index}
                isSelected={selectedSlot === index}
                onClick={() => handleTimeSlotClick(index)}
              >
                <div className="time">{slot.time}</div>
                <div className="label">{slot.label}</div>
              </TimeSlot>
            ))}
          </TimeSlotGrid>
        </TimeSlotsContainer>
      )}
      
      <NotesSection>
        <div>* Same day cancellations/no shows will NOT be tolerated</div>
        <div>* Please arrive 10 minutes early for check-in</div>
      </NotesSection>
    </CalendarContainer>
  );
};

export default UDTCalendar; 