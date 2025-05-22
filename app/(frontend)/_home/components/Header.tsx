'use client';

import { useState, useEffect } from 'react';
import styles from './Header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const pathname = usePathname();
  
  // Check if we're on a branch location page
  const isBranchPage = pathname.startsWith('/location/') && pathname !== '/location';
  
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
    // If we're not on the home page, don't scroll - use regular navigation
    if (pathname !== '/') {
      return;
    }
    
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
    // Only scroll to top if we're on the main page
    if (pathname === '/') {
      e.preventDefault();
      closeMenu();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleHeaderClick = (e: React.MouseEvent) => {
    // Only scroll to top if we're not clicking on a navigation link or menu button
    // and we're on the home page
    if (
      pathname === '/' &&
      !(e.target as HTMLElement).closest('a') && 
      !(e.target as HTMLElement).closest('.mobile-menu-toggle') && 
      !(e.target as HTMLElement).closest('.hamburger')
    ) {
      scrollToTop(e);
    }
  };

  return (
    <>
      <header 
        className={`${styles.siteHeader} ${isScrolled ? styles.scrolled : ''} ${isVisible ? styles.visible : styles.hidden}`}
        onClick={handleHeaderClick}
      >
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <div className={styles.mobileLogo}>
              <Image src="/favicon.ico" alt="UDT Favicon" width={24} height={24} className={styles.mobileFavicon} />
              <span>United Defense Tactical</span>
            </div>
          </Link>
          
          <button 
            className={styles.mobileMenuToggle}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          <nav className={`${styles.mainNav} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
            <ul className={styles.navLinks}>
              <li>
                <a href={pathname === '/' ? '#programs' : '/#programs'} onClick={(e) => scrollToSection('programs', e)}>
                  Programs
                </a>
              </li>
              <li>
                <a href={pathname === '/' ? '#instructors' : '/#instructors'} onClick={(e) => scrollToSection('instructors', e)}>
                  Instructors
                </a>
              </li>
              <li>
                {isBranchPage ? (
                  <a href="#location" onClick={(e) => scrollToSection('location', e)}>
                    Location
                  </a>
                ) : (
                  <Link href="/location">
                    Location
                  </Link>
                )}
              </li>
              <li>
                <a href={pathname === '/' ? '#training-packages' : '/#training-packages'} onClick={(e) => scrollToSection('training-packages', e)}>
                  Packages
                </a>
              </li>
              <li>
                <a href={pathname === '/' ? '#location' : '/#location'} onClick={(e) => scrollToSection('location', e)}>
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className={`${styles.navOverlay} ${styles.active}`} onClick={closeMenu}>
          <div className={styles.mobileMenu} onClick={(e) => e.stopPropagation()}>
            <ul className={`${styles.navLinks} ${styles.active}`}>
              <li>
                <a href={pathname === '/' ? '#programs' : '/#programs'} onClick={(e) => scrollToSection('programs', e)}>
                  Programs
                </a>
              </li>
              <li>
                <a href={pathname === '/' ? '#instructors' : '/#instructors'} onClick={(e) => scrollToSection('instructors', e)}>
                  Instructors
                </a>
              </li>
              <li>
                {isBranchPage ? (
                  <a href="#location" onClick={(e) => scrollToSection('location', e)}>
                    Location
                  </a>
                ) : (
                  <Link href="/location" onClick={closeMenu}>
                    Location
                  </Link>
                )}
              </li>
              <li>
                <a href={pathname === '/' ? '#training-packages' : '/#training-packages'} onClick={(e) => scrollToSection('training-packages', e)}>
                  Packages
                </a>
              </li>
              <li>
                <a href={pathname === '/' ? '#location' : '/#location'} onClick={(e) => scrollToSection('location', e)}>
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

export default Header; 