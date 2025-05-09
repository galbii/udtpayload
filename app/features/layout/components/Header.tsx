'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  
  // Threshold for hiding header (pixels from top)
  const scrollThreshold = 50; 

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isMobile = window.innerWidth <= 768; 

      setIsScrolled(currentScrollPos > scrollThreshold);

      if (!isMobile) {
        // Show header if scrolling up or near the top, hide if scrolling down past threshold
        if (currentScrollPos < scrollThreshold) {
          setIsVisible(true);
        } else if (prevScrollPos > currentScrollPos) {
          setIsVisible(true); // Scrolling Up
        } else {
          setIsVisible(false); // Scrolling Down
        }
      } else {
        // Always visible on mobile
        setIsVisible(true); 
      }
      
      // Store scroll position for next event, but only if difference is significant
      // to avoid rapid state changes on minor scrolls
      if (Math.abs(currentScrollPos - prevScrollPos) > 5 || currentScrollPos < scrollThreshold) {
        setPrevScrollPos(currentScrollPos);
      }
    };
    
    // Add scroll and resize listeners
    window.addEventListener('scroll', handleScroll, { passive: true }); // Use passive listener
    window.addEventListener('resize', handleScroll); 
    
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [prevScrollPos]); 

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent header click event
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent header click event
    closeMenu();
    
    let targetId = sectionId;
    
    // Special case handling for pricing section which is actually training-packages
    if (sectionId === 'pricing') {
      targetId = 'training-packages';
    }
    
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHeaderClick = (e: React.MouseEvent) => {
    // Only scroll to top if we're not clicking on a navigation link or menu button
    if (!(e.target as HTMLElement).closest('a') && 
        !(e.target as HTMLElement).closest('.mobile-menu-toggle') && 
        !(e.target as HTMLElement).closest('.hamburger')) {
      scrollToTop(e);
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full bg-gradient-to-b from-black/85 to-black/75 text-white py-8 z-50 transition-all duration-medium ease-default backdrop-blur-header cursor-pointer
          ${isScrolled ? 'bg-black/95 shadow-lg py-6' : ''}
          ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
        onClick={handleHeaderClick}
      >
        <div className="flex justify-start items-center w-full max-w-container mx-auto px-8 md:px-4">
          <a 
            href="#" 
            className="relative inline-block py-2 leading-none transition-transform duration-medium hover:scale-105 mr-8"
            onClick={scrollToTop}
          >
            <div className="flex items-center font-secondary text-xl font-bold text-white uppercase tracking-wide md:text-lg sm:text-base">
              <Image 
                src="/favicon.ico" 
                alt="UDT Favicon" 
                width={24} 
                height={24} 
                className="h-6 w-6 mr-1.5 sm:h-5 sm:w-5"
              />
              <span>United Defense Tactical</span>
            </div>
          </a>
          
          <button 
            className="hidden md:block ml-auto bg-transparent border-none p-2 cursor-pointer"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={`flex flex-col justify-between w-6 h-[18px] relative transition-all duration-medium
              ${isMenuOpen ? 'open' : ''}`}>
              <span className={`block h-0.5 w-full bg-white rounded-sm transition-all duration-medium
                ${isMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
              <span className={`block h-0.5 w-full bg-white rounded-sm transition-all duration-medium
                ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-full bg-white rounded-sm transition-all duration-medium
                ${isMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
            </span>
          </button>

          <nav className={`flex items-center ml-auto md:${isMenuOpen ? 'flex' : 'hidden'}`}>
            <ul className="flex list-none m-0 p-0 md:hidden">
              <li className="ml-8 md:my-2 md:mx-0">
                <a 
                  href="#programs" 
                  onClick={(e) => scrollToSection('programs', e)}
                  className="text-white no-underline font-medium text-base uppercase tracking-wide relative py-2 transition-all duration-medium hover:text-primary hover:-translate-y-0.5 
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-transparent after:transition-width after:duration-medium hover:after:w-full"
                >
                  Programs
                </a>
              </li>
              <li className="ml-8 md:my-2 md:mx-0">
                <a 
                  href="#instructors" 
                  onClick={(e) => scrollToSection('instructors', e)}
                  className="text-white no-underline font-medium text-base uppercase tracking-wide relative py-2 transition-all duration-medium hover:text-primary hover:-translate-y-0.5 
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-transparent after:transition-width after:duration-medium hover:after:w-full"
                >
                  Instructors
                </a>
              </li>
              <li className="ml-8 md:my-2 md:mx-0">
                <a 
                  href="#location" 
                  onClick={(e) => scrollToSection('location', e)}
                  className="text-white no-underline font-medium text-base uppercase tracking-wide relative py-2 transition-all duration-medium hover:text-primary hover:-translate-y-0.5 
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-transparent after:transition-width after:duration-medium hover:after:w-full"
                >
                  Location
                </a>
              </li>
              <li className="ml-8 md:my-2 md:mx-0">
                <a 
                  href="#training-packages" 
                  onClick={(e) => scrollToSection('training-packages', e)}
                  className="text-white no-underline font-medium text-base uppercase tracking-wide relative py-2 transition-all duration-medium hover:text-primary hover:-translate-y-0.5 
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-transparent after:transition-width after:duration-medium hover:after:w-full"
                >
                  Packages
                </a>
              </li>
              <li className="ml-8 md:my-2 md:mx-0">
                <a 
                  href="#location" 
                  onClick={(e) => scrollToSection('location', e)}
                  className="text-white no-underline font-medium text-base uppercase tracking-wide relative py-2 transition-all duration-medium hover:text-primary hover:-translate-y-0.5 
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-transparent after:transition-width after:duration-medium hover:after:w-full"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed top-0 left-0 right-0 bottom-0 bg-black/80 z-[999] visible opacity-100 transition-opacity duration-medium"
          onClick={closeMenu}
        >
          <div 
            className="absolute top-20 left-0 w-full bg-[#111] p-8 shadow-xl -translate-y-0 transition-all duration-medium"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="flex flex-col gap-6">
              <li>
                <a 
                  href="#programs" 
                  onClick={(e) => scrollToSection('programs', e)}
                  className="text-white no-underline font-medium text-base uppercase tracking-wide relative py-2 transition-all duration-medium hover:text-primary hover:-translate-y-0.5"
                >
                  Programs
                </a>
              </li>
              <li>
                <a 
                  href="#instructors" 
                  onClick={(e) => scrollToSection('instructors', e)}
                  className="text-white no-underline font-medium text-base uppercase tracking-wide relative py-2 transition-all duration-medium hover:text-primary hover:-translate-y-0.5"
                >
                  Instructors
                </a>
              </li>
              <li>
                <a 
                  href="#location" 
                  onClick={(e) => scrollToSection('location', e)}
                  className="text-white no-underline font-medium text-base uppercase tracking-wide relative py-2 transition-all duration-medium hover:text-primary hover:-translate-y-0.5"
                >
                  Location
                </a>
              </li>
              <li>
                <a 
                  href="#training-packages" 
                  onClick={(e) => scrollToSection('training-packages', e)}
                  className="text-white no-underline font-medium text-base uppercase tracking-wide relative py-2 transition-all duration-medium hover:text-primary hover:-translate-y-0.5"
                >
                  Packages
                </a>
              </li>
              <li>
                <a 
                  href="#location" 
                  onClick={(e) => scrollToSection('location', e)}
                  className="text-white no-underline font-medium text-base uppercase tracking-wide relative py-2 transition-all duration-medium hover:text-primary hover:-translate-y-0.5"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}; 