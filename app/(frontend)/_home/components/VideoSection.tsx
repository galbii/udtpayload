'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './VideoSection.module.scss';

interface CountyStats {
  name: string;
  population: number;
  totalCrimes: number;
  dailyAverage: number;
}

const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [overviewSlide, setOverviewSlide] = useState(0);
  const [countySlide, setCountySlide] = useState(0);
  const [firstFrameCapture, setFirstFrameCapture] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const overviewRef = useRef<HTMLDivElement>(null);
  const countyRef = useRef<HTMLDivElement>(null);

  const countyStats: CountyStats[] = [
    {
      name: 'Orange County',
      population: 3161829,
      totalCrimes: 12453,
      dailyAverage: 34
    },
    {
      name: 'Riverside County',
      population: 2400000,
      totalCrimes: 9876,
      dailyAverage: 27
    },
    {
      name: 'Los Angeles County',
      population: 10000000,
      totalCrimes: 45678,
      dailyAverage: 125
    }
  ];

  const totalPopulation = countyStats.reduce((sum, county) => sum + county.population, 0);
  const totalCrimes = countyStats.reduce((sum, county) => sum + county.totalCrimes, 0);
  const averageDailyCrimes = Math.round(totalCrimes / 365);

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video || videoError) return;
    
    if (video.paused) {
      video.play().catch(err => {
        console.error("Error playing video:", err);
        setVideoError(true);
      });
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    
    const updateProgress = () => {
      if (videoElement) {
        const percentage = (videoElement.currentTime / videoElement.duration) * 100;
        setProgress(percentage);
      }
    };
    
    if (videoElement) {
      videoElement.addEventListener('timeupdate', updateProgress);
      videoElement.addEventListener('ended', () => setIsPlaying(false));
      videoElement.addEventListener('error', () => setVideoError(true));
      
      return () => {
        videoElement.removeEventListener('timeupdate', updateProgress);
        videoElement.removeEventListener('ended', () => setIsPlaying(false));
        videoElement.removeEventListener('error', () => setVideoError(true));
      };
    }
  }, []);

  const nextOverviewSlide = () => {
    setOverviewSlide((prev) => (prev + 1) % 3);
  };

  const prevOverviewSlide = () => {
    setOverviewSlide((prev) => (prev - 1 + 3) % 3);
  };

  const nextCountySlide = () => {
    setCountySlide((prev) => (prev + 1) % 3);
  };

  const prevCountySlide = () => {
    setCountySlide((prev) => (prev - 1 + 3) % 3);
  };

  const handleOverviewTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startX = touch.clientX;
    
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const diff = startX - touch.clientX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextOverviewSlide();
        } else {
          prevOverviewSlide();
        }
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      }
    };
    
    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  const handleCountyTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startX = touch.clientX;
    
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const diff = startX - touch.clientX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextCountySlide();
        } else {
          prevCountySlide();
        }
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      }
    };
    
    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  // Auto-advance carousels
  useEffect(() => {
    const overviewTimer = setInterval(nextOverviewSlide, 5000);
    const countyTimer = setInterval(nextCountySlide, 5000);
    
    return () => {
      clearInterval(overviewTimer);
      clearInterval(countyTimer);
    };
  }, []);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Capture first frame when video metadata loads
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas) return;
    
    const captureFirstFrame = () => {
      if (isMobile && video.readyState >= 2) {
        const context = canvas.getContext('2d');
        if (!context) return;
        
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw the first frame
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert to data URL
        const dataURL = canvas.toDataURL('image/jpeg');
        setFirstFrameCapture(dataURL);
      }
    };
    
    video.addEventListener('loadeddata', captureFirstFrame);
    
    return () => {
      video.removeEventListener('loadeddata', captureFirstFrame);
    };
  }, [isMobile]);

  // Set up data to display
  const overviewData = [
    {
      title: 'Total Population',
      value: formatNumber(totalPopulation),
      description: 'Residents in the covered counties'
    },
    {
      title: 'Total Crimes',
      value: formatNumber(totalCrimes),
      description: 'Reported annually in the region'
    },
    {
      title: 'Daily Average',
      value: formatNumber(averageDailyCrimes),
      description: 'Crimes happening every day'
    }
  ];

  return (
    <section className={styles.videoSection} id="video-section">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2>Why Train With Us</h2>
          <p>The reality of crime statistics in Southern California and how our training helps you stay prepared</p>
        </div>
        
        <div className={styles.videoContainer}>
          <div className={styles.videoWrapper}>
            {!videoError ? (
              <>
                <video 
                  ref={videoRef}
                  className={styles.trainingVideo}
                  poster="/images/hero.jpg"
                  preload="auto"
                  onError={() => setVideoError(true)}
                >
                  <source src="/videos/ty.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Hidden canvas for first frame capture */}
                <canvas ref={canvasRef} style={{ display: 'none' }} />
                
                {/* Mobile poster fallback */}
                {isMobile && firstFrameCapture && !isPlaying && (
                  <div 
                    className={styles.mobilePoster} 
                    style={{ backgroundImage: `url(${firstFrameCapture})` }}
                  />
                )}
                
                {/* Overlay with play button */}
                {!isPlaying && (
                  <div className={styles.videoOverlay} onClick={toggleVideo}>
                    <div className={`${styles.playButton} ${isPlaying ? styles.playing : ''}`}>
                      <span>▶</span>
                    </div>
                  </div>
                )}
                
                {/* Progress bar */}
                <div className={styles.progressBar}>
                  <div className={styles.progress} style={{ width: `${progress}%` }}></div>
                </div>
              </>
            ) : (
              <div className={styles.videoFallback}>
                <div className={styles.fallbackContent}>
                  <p>Training video is currently unavailable.</p>
                  <p>Please check back later to learn more about our training programs.</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className={styles.statsContainer}>
          <div className={styles.statsRow}>
            <div 
              ref={overviewRef}
              className={styles.overviewStats}
              onTouchStart={handleOverviewTouchStart}
            >
              <div className={styles.carouselControls}>
                <button onClick={prevOverviewSlide} aria-label="Previous slide">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <div className={styles.slideIndicators}>
                  {[0, 1, 2].map((index) => (
                    <span 
                      key={index}
                      className={index === overviewSlide ? styles.active : ''}
                    />
                  ))}
                </div>
                <button onClick={nextOverviewSlide} aria-label="Next slide">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
              
              <div className={styles.carouselWrapper}>
                <div 
                  className={styles.carouselTrack}
                  style={{ transform: `translateX(-${overviewSlide * 100}%)` }}
                >
                  {overviewData.map((item, index) => (
                    <div key={index} className={styles.statCard}>
                      <h3>{item.title}</h3>
                      <div className={styles.statValue}>{item.value}</div>
                      <p>{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div 
              ref={countyRef}
              className={styles.countyStats}
              onTouchStart={handleCountyTouchStart}
            >
              <div className={styles.carouselControls}>
                <button onClick={prevCountySlide} aria-label="Previous slide">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <div className={styles.slideIndicators}>
                  {[0, 1, 2].map((index) => (
                    <span 
                      key={index}
                      className={index === countySlide ? styles.active : ''}
                    />
                  ))}
                </div>
                <button onClick={nextCountySlide} aria-label="Next slide">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
              
              <div className={styles.carouselWrapper}>
                <div 
                  className={styles.carouselTrack}
                  style={{ transform: `translateX(-${countySlide * 100}%)` }}
                >
                  {countyStats.map((county, index) => (
                    <div key={index} className={styles.statCard}>
                      <h3>{county.name}</h3>
                      <div className={styles.countyDetails}>
                        <div className={styles.countyDetail}>
                          <span>Population:</span>
                          <strong>{formatNumber(county.population)}</strong>
                        </div>
                        <div className={styles.countyDetail}>
                          <span>Annual Crimes:</span>
                          <strong>{formatNumber(county.totalCrimes)}</strong>
                        </div>
                        <div className={styles.countyDetail}>
                          <span>Daily Average:</span>
                          <strong>{formatNumber(county.dailyAverage)}</strong>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection; 