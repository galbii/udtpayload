'use client';

import React, { useState, useEffect } from 'react';
import styles from './AssessmentForm.module.scss';

interface FormData {
  experience: string;
  goal: string;
  interests: string[];
  frequency: string;
  name: string;
  email: string;
  phone: string;
}

interface Recommendation {
  programName: string;
  description: string;
  features: string[];
  price: string;
}

const AssessmentForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    experience: '',
    goal: '',
    interests: [],
    frequency: '',
    name: 'Anonymous User',
    email: '',
    phone: ''
  });
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const totalSteps = 4;

  const updateProgressBar = () => {
    const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
    const progressIndicator = document.querySelector(`.${styles.progressIndicator}`) as HTMLElement;
    if (progressIndicator) {
      progressIndicator.style.width = `${progress}%`;
    }

    // Update step indicators
    document.querySelectorAll(`.${styles.step}`).forEach(step => {
      const stepNumber = parseInt(step.getAttribute('data-step') || '0');
      step.classList.remove(styles.active, styles.completed);

      if (stepNumber === currentStep) {
        step.classList.add(styles.active);
      } else if (stepNumber < currentStep) {
        step.classList.add(styles.completed);
      }
    });
  };

  // Update progress bar when step changes
  useEffect(() => {
    updateProgressBar();
  }, [currentStep]);

  const handleOptionClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    const label = e.currentTarget;
    const input = label.querySelector('input');
    
    if (!input) return;

    if (input.type === 'radio') {
      // Unselect other options in the same group
      const name = input.name;
      document.querySelectorAll(`input[name="${name}"]`).forEach(radio => {
        (radio as HTMLInputElement).checked = false;
        radio.closest(`.${styles.answerOption}`)?.classList.remove(styles.selected);
      });
      
      // Select this option
      input.checked = true;
      label.classList.add(styles.selected);
      
      // Update form data
      setFormData({
        ...formData,
        [name]: input.value
      });
    } else if (input.type === 'checkbox') {
      // Toggle checkbox
      input.checked = !input.checked;
      label.classList.toggle(styles.selected, input.checked);
      
      // Update form data (interests array)
      if (input.checked) {
        setFormData({
          ...formData,
          interests: [...formData.interests, input.value]
        });
      } else {
        setFormData({
          ...formData,
          interests: formData.interests.filter(item => item !== input.value)
        });
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return !!formData.experience;
      case 2:
        return !!formData.goal;
      case 3:
        return formData.interests.length > 0;
      case 4:
        return !!formData.frequency;
      default:
        return true;
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToNextStep = () => {
    if (!validateCurrentStep()) {
      alert('Please complete this step before continuing.');
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === totalSteps) {
      // Submit directly after the last question
      submitAssessment();
    }
  };

  const generateRecommendation = (data: FormData): Recommendation => {
    // This is a simplified version of the recommendation logic
    let programName = 'Tactical Defense Program';
    let description = 'A comprehensive training program tailored to your needs.';
    let features = ['Personalized training schedule', 'Expert instructor guidance'];
    let price = '$249/month';

    // Adjust recommendation based on experience
    if (data.experience === 'none' || data.experience === 'limited') {
      programName = 'Fundamentals Training Program';
      features.push('Safety and handling basics');
      features.push('Confidence-building exercises');
    } else if (data.experience === 'experienced') {
      programName = 'Advanced Tactical Program';
      features.push('Complex scenario training');
      features.push('Force-on-force exercises');
      price = '$399/month';
    }

    // Adjust based on goal
    if (data.goal === 'home-defense') {
      programName += ' - Home Defense Focus';
      features.push('Home defense scenarios');
    } else if (data.goal === 'ccw') {
      programName += ' - CCW Preparation';
      features.push('Concealed carry tactics');
    }

    return {
      programName,
      description,
      features,
      price
    };
  };

  const submitAssessment = async () => {
    if (!validateCurrentStep()) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate recommendation
      const rec = generateRecommendation(formData);
      setRecommendation(rec);

      // Set showResults to true to display the results
      setShowResults(true);
      
      // Submit to backend with anonymized data if no contact info provided
      // This would typically call an API endpoint
      console.log('Submitting assessment form with data:', {
        ...formData,
        recommendedProgram: rec.programName
      });
      
    } catch (error) {
      console.error('Error submitting assessment:', error);
      alert('There was an error processing your assessment. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scheduleClass = () => {
    // Scroll to free class section
    const freeClassSection = document.getElementById('free-class');
    if (freeClassSection) {
      freeClassSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // You could also open the modal here if needed
    const openModalButton = document.getElementById('open-free-class-modal');
    if (openModalButton) {
      openModalButton.click();
    }
  };

  return (
    <section id="training-assessment" className={styles.trainingAssessment}>
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <div className={styles.badge}>TACTICAL READINESS ASSESSMENT</div>
          <h2>ARE YOU PREPARED?</h2>
          <p>Discover your tactical readiness level and get a personalized training recommendation</p>
        </header>

        <div className={styles.assessmentContainer}>
          {/* Assessment progress bar */}
          <div className={styles.assessmentProgress}>
            <div className={styles.progressBar}>
              <div className={styles.progressIndicator} style={{ width: '0%' }}></div>
            </div>
            <div className={styles.progressSteps}>
              <span className={`${styles.step} ${styles.active}`} data-step="1">1</span>
              <span className={styles.step} data-step="2">2</span>
              <span className={styles.step} data-step="3">3</span>
              <span className={styles.step} data-step="4">4</span>
            </div>
          </div>

          {/* Assessment questions */}
          <div className={styles.assessmentQuestions}>
            {/* Step 1: Experience level */}
            <div className={`${styles.questionStep} ${currentStep === 1 ? styles.active : ''}`} data-step="1">
              <h3>What's your current experience level with firearms?</h3>
              <div className={styles.answerOptions}>
                <label className={`${styles.answerOption} ${formData.experience === 'none' ? styles.selected : ''}`} onClick={handleOptionClick}>
                  <input type="radio" name="experience" value="none" />
                  <div className={styles.optionContent}>
                    <span className={styles.optionTitle}>Complete Beginner</span>
                    <span className={styles.optionDesc}>I've never handled a firearm before</span>
                  </div>
                </label>
                <label className={`${styles.answerOption} ${formData.experience === 'limited' ? styles.selected : ''}`} onClick={handleOptionClick}>
                  <input type="radio" name="experience" value="limited" />
                  <div className={styles.optionContent}>
                    <span className={styles.optionTitle}>Limited Experience</span>
                    <span className={styles.optionDesc}>I've fired guns before but have little formal training</span>
                  </div>
                </label>
                <label className={`${styles.answerOption} ${formData.experience === 'moderate' ? styles.selected : ''}`} onClick={handleOptionClick}>
                  <input type="radio" name="experience" value="moderate" />
                  <div className={styles.optionContent}>
                    <span className={styles.optionTitle}>Moderate Experience</span>
                    <span className={styles.optionDesc}>I've had some training and am comfortable with firearms</span>
                  </div>
                </label>
                <label className={`${styles.answerOption} ${formData.experience === 'experienced' ? styles.selected : ''}`} onClick={handleOptionClick}>
                  <input type="radio" name="experience" value="experienced" />
                  <div className={styles.optionContent}>
                    <span className={styles.optionTitle}>Experienced</span>
                    <span className={styles.optionDesc}>I have extensive training and am seeking to advance my skills</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Step 2: Primary goal */}
            <div className={`${styles.questionStep} ${currentStep === 2 ? styles.active : ''}`} data-step="2">
              <h3>What's your primary goal for seeking training?</h3>
              <div className={styles.answerOptions}>
                <label className={`${styles.answerOption} ${formData.goal === 'self-defense' ? styles.selected : ''}`} onClick={handleOptionClick}>
                  <input type="radio" name="goal" value="self-defense" />
                  <div className={styles.optionContent}>
                    <span className={styles.optionTitle}>Personal Self-Defense</span>
                    <span className={styles.optionDesc}>Learn how to protect myself in dangerous situations</span>
                  </div>
                </label>
                <label className={`${styles.answerOption} ${formData.goal === 'home-defense' ? styles.selected : ''}`} onClick={handleOptionClick}>
                  <input type="radio" name="goal" value="home-defense" />
                  <div className={styles.optionContent}>
                    <span className={styles.optionTitle}>Home Defense</span>
                    <span className={styles.optionDesc}>Protect my home and family from potential threats</span>
                  </div>
                </label>
                <label className={`${styles.answerOption} ${formData.goal === 'skill-development' ? styles.selected : ''}`} onClick={handleOptionClick}>
                  <input type="radio" name="goal" value="skill-development" />
                  <div className={styles.optionContent}>
                    <span className={styles.optionTitle}>Skill Development</span>
                    <span className={styles.optionDesc}>Improve my shooting and tactical abilities</span>
                  </div>
                </label>
                <label className={`${styles.answerOption} ${formData.goal === 'ccw' ? styles.selected : ''}`} onClick={handleOptionClick}>
                  <input type="radio" name="goal" value="ccw" />
                  <div className={styles.optionContent}>
                    <span className={styles.optionTitle}>Concealed Carry Preparation</span>
                    <span className={styles.optionDesc}>Train for responsible everyday carry</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Step 3: Training Preferences */}
            <div className={`${styles.questionStep} ${currentStep === 3 ? styles.active : ''}`} data-step="3">
              <h3>What type of training environment do you prefer?</h3>
              <div className={styles.answerOptions}>
                <label className={`${styles.answerOption} ${formData.interests.includes('group') ? styles.selected : ''}`} onClick={handleOptionClick}>
                  <input type="checkbox" name="interests" value="group" />
                  <div className={styles.optionContent}>
                    <span className={styles.optionTitle}>Group Training</span>
                    <span className={styles.optionDesc}>Learn alongside others in a collaborative environment</span>
                  </div>
                </label>
                <label className={`${styles.answerOption} ${formData.interests.includes('private') ? styles.selected : ''}`} onClick={handleOptionClick}>
                  <input type="checkbox" name="interests" value="private" />
                  <div className={styles.optionContent}>
                    <span className={styles.optionTitle}>Private Sessions</span>
                    <span className={styles.optionDesc}>Small group classes for personalized attention</span>
                  </div>
                </label>
                <label className={`${styles.answerOption} ${formData.interests.includes('scenario') ? styles.selected : ''}`} onClick={handleOptionClick}>
                  <input type="checkbox" name="interests" value="scenario" />
                  <div className={styles.optionContent}>
                    <span className={styles.optionTitle}>Scenario-Based</span>
                    <span className={styles.optionDesc}>Real-world situation simulations</span>
                  </div>
                </label>
                <label className={`${styles.answerOption} ${formData.interests.includes('drills') ? styles.selected : ''}`} onClick={handleOptionClick}>
                  <input type="checkbox" name="interests" value="drills" />
                  <div className={styles.optionContent}>
                    <span className={styles.optionTitle}>Technical Drills</span>
                    <span className={styles.optionDesc}>Focus on specific skills and techniques</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Step 4: Training frequency */}
            <div className={`${styles.questionStep} ${currentStep === 4 ? styles.active : ''}`} data-step="4">
              <h3>How often would you ideally like to train?</h3>
              <div className={styles.answerOptions}>
                <label className={`${styles.answerOption} ${formData.frequency === 'once-week' ? styles.selected : ''}`} onClick={handleOptionClick}>
                  <input type="radio" name="frequency" value="once-week" />
                  <div className={styles.optionContent}>
                    <span className={styles.optionTitle}>Once per week</span>
                    <span className={styles.optionDesc}>Regular but limited commitment</span>
                  </div>
                </label>
                <label className={`${styles.answerOption} ${formData.frequency === 'twice-week' ? styles.selected : ''}`} onClick={handleOptionClick}>
                  <input type="radio" name="frequency" value="twice-week" />
                  <div className={styles.optionContent}>
                    <span className={styles.optionTitle}>Twice per week</span>
                    <span className={styles.optionDesc}>Serious commitment to improvement</span>
                  </div>
                </label>
                <label className={`${styles.answerOption} ${formData.frequency === 'three-plus' ? styles.selected : ''}`} onClick={handleOptionClick}>
                  <input type="radio" name="frequency" value="three-plus" />
                  <div className={styles.optionContent}>
                    <span className={styles.optionTitle}>Three+ times per week</span>
                    <span className={styles.optionDesc}>Intensive training for rapid skill development</span>
                  </div>
                </label>
                <label className={`${styles.answerOption} ${formData.frequency === 'flexible' ? styles.selected : ''}`} onClick={handleOptionClick}>
                  <input type="radio" name="frequency" value="flexible" />
                  <div className={styles.optionContent}>
                    <span className={styles.optionTitle}>Flexible/Variable</span>
                    <span className={styles.optionDesc}>Schedule varies based on availability</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Results step (shown after submission) */}
            <div className={`${styles.questionStep} ${styles.resultsStep} ${showResults ? styles.active : ''}`} data-step="results">
              {recommendation && (
                <div className={styles.assessmentResults}>
                  <div className={styles.resultsHeader}>
                    <h3>Your Personalized Training Recommendation</h3>
                    <p>Based on your responses, we recommend:</p>
                  </div>
                  <div className={styles.recommendedProgram}>
                    <h4>{recommendation.programName}</h4>
                    <p>{recommendation.description}</p>
                    <ul className={styles.programFeatures}>
                      {recommendation.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.resultsCta}>
                    <p>Ready to experience training that's tailored to your needs?</p>
                    <button 
                      className={`${styles.btn} ${styles.btnPrimary} ${styles.scheduleBtn}`}
                      onClick={scheduleClass}
                    >
                      BOOK NOW
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className={styles.assessmentNav}>
            <button 
              className={`${styles.btn} ${styles.btnSecondary}`}
              id="prev-question" 
              onClick={goToPreviousStep} 
              disabled={currentStep === 1 || showResults}
            >
              PREVIOUS
            </button>
            {!showResults && (
              <button 
                className={`${styles.btn} ${styles.btnPrimary}`}
                id="next-question" 
                onClick={goToNextStep}
              >
                {currentStep === totalSteps ? 'GET RECOMMENDATION' : 'NEXT'}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssessmentForm; 