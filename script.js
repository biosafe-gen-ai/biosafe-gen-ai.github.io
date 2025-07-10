document.addEventListener("DOMContentLoaded", function() {
    const btn = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    const links = document.querySelectorAll('#nav-menu .nav-link');
    let isOpen = false;

    function openMenu() {
      if (isOpen) return;
      isOpen = true;
      
      // Show the menu
      menu.classList.remove('hidden');
      menu.style.display = 'block';
      
      // Force reflow to ensure display:block is applied
      menu.offsetHeight;
      
      // Add CSS transition for menu container
      menu.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
      menu.style.transform = 'translateY(0)';
      menu.style.opacity = '1';
      
      // Stagger animation for links
      links.forEach((link, index) => {
        // Reset link styles
        link.style.transform = 'translateX(-20px)';
        link.style.opacity = '0';
        link.style.transition = 'transform 0.4s ease-out, opacity 0.4s ease-out';
        
        // Animate each link with increasing delay
        setTimeout(() => {
          link.style.transform = 'translateX(0)';
          link.style.opacity = '1';
        }, index * 80); // 80ms delay between each link
      });
    }

    function closeMenu() {
      if (!isOpen) return;
      isOpen = false;
      
      // Stagger animation for links (reverse order for closing)
      const reversedLinks = Array.from(links).reverse();
      reversedLinks.forEach((link, index) => {
        link.style.transition = 'transform 0.3s ease-in, opacity 0.3s ease-in';
        
        setTimeout(() => {
          link.style.transform = 'translateX(-20px)';
          link.style.opacity = '0';
        }, index * 60); // 60ms delay between each link (faster close)
      });
      
      // Animate menu container out after links start animating
      setTimeout(() => {
        menu.style.transition = 'transform 0.25s ease-in, opacity 0.25s ease-in';
        menu.style.transform = 'translateY(-20px)';
        menu.style.opacity = '0';
      }, 120); // Small delay before container animates out
      
      // Hide after all animations complete
      setTimeout(() => {
        menu.classList.add('hidden');
        menu.style.display = 'none';
        menu.style.transition = '';
        
        // Reset all link styles
        links.forEach(link => {
          link.style.transition = '';
          link.style.transform = '';
          link.style.opacity = '';
        });
      }, 500); // Total animation time
    }

    // Initialize menu and link states
    menu.style.transform = 'translateY(-20px)';
    menu.style.opacity = '0';
    
    links.forEach(link => {
      link.style.transform = 'translateX(-20px)';
      link.style.opacity = '0';
    });

    btn.addEventListener('click', () => {
      if (!isOpen) {
        openMenu();
      } else {
        closeMenu();
      }
    });

    // Close menu when a nav-link is clicked (on mobile)
    links.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 768 && isOpen) {
          closeMenu();
        }
      });
    });

    // Hide nav if window resized up to md+ while open
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        menu.classList.add('hidden');
        menu.style.display = 'none';
        menu.style.transition = '';
        menu.style.transform = 'translateY(-20px)';
        menu.style.opacity = '0';
        
        // Reset all link styles
        links.forEach(link => {
          link.style.transition = '';
          link.style.transform = '';
          link.style.opacity = '';
        });
        
        isOpen = false;
      }
    });

    // NAVIGATION SCROLL HIGHLIGHTING
    function updateActiveNavLink() {
      const sections = document.querySelectorAll('section[id], header');
      const navLinksDesktop = document.querySelectorAll('.nav-link[data-section]');
      const navLinksMobile = document.querySelectorAll('.mobile-nav-link[data-section]');
      
      let currentSection = '';
      const scrollPosition = window.scrollY + 100; // Offset for better detection

      // Find which section is currently in view
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSection = section.id;
        }
      });

      // Update desktop navigation
      navLinksDesktop.forEach(link => {
        const section = link.getAttribute('data-section');
        if (section === currentSection) {
          link.classList.add('nav-link-active');
        } else {
          link.classList.remove('nav-link-active');
        }
      });

      // Update mobile navigation
      navLinksMobile.forEach(link => {
        const section = link.getAttribute('data-section');
        if (section === currentSection) {
          link.classList.add('mobile-nav-link-active');
        } else {
          link.classList.remove('mobile-nav-link-active');
        }
      });
    }

    // Throttled scroll event for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(updateActiveNavLink, 10);
    });

    // Initial call to set active state
    updateActiveNavLink();

    // SUBTLE SCROLL-BASED ANIMATIONS USING MOTION ONE
    if (typeof Motion !== 'undefined') {
      
      // Animate section headings on scroll - more subtle
      const headings = document.querySelectorAll('h2');
      headings.forEach(heading => {
        Motion.scroll(
          Motion.animate(heading, 
            { 
              opacity: [0.7, 1],
              transform: ['translateY(20px)', 'translateY(0px)']
            },
            { 
              duration: 0.6,
              easing: 'ease-out'
            }
          ),
          {
            target: heading,
            offset: ['start 0.9', 'start 0.6']
          }
        );
      });

      // Animate paragraphs and content blocks - much more subtle
      const contentBlocks = document.querySelectorAll('p, ul');
      contentBlocks.forEach((block, index) => {
        Motion.scroll(
          Motion.animate(block,
            {
              opacity: [0.8, 1],
              transform: ['translateY(15px)', 'translateY(0px)']
            },
            {
              duration: 0.4,
              easing: 'ease-out',
              delay: Math.min(index * 0.05, 0.3) // Cap the delay
            }
          ),
          {
            target: block,
            offset: ['start 0.95', 'start 0.7']
          }
        );
      });

      // Animate speaker/organizer cards - reduced effect
      const speakerCards = document.querySelectorAll('#SpeakerAndPanelist .flex.flex-col.items-center');
      speakerCards.forEach((card, index) => {
        Motion.scroll(
          Motion.animate(card,
            {
              opacity: [0.6, 1],
              transform: ['translateY(20px) scale(0.95)', 'translateY(0px) scale(1)']
            },
            {
              duration: 0.4,
              easing: 'ease-out',
              delay: index * 0.05 // Reduced stagger
            }
          ),
          {
            target: card,
            offset: ['start 0.9', 'start 0.5']
          }
        );
      });

      // Animate organizer cards - reduced effect
      const organizerCards = document.querySelectorAll('#organization .flex.flex-col.items-center');
      organizerCards.forEach((card, index) => {
        Motion.scroll(
          Motion.animate(card,
            {
              opacity: [0.6, 1],
              transform: ['translateY(20px) scale(0.95)', 'translateY(0px) scale(1)']
            },
            {
              duration: 0.4,
              easing: 'ease-out',
              delay: index * 0.04 // Reduced stagger
            }
          ),
          {
            target: card,
            offset: ['start 0.9', 'start 0.5']
          }
        );
      });

      // Animate the schedule table - much more subtle
      const scheduleTable = document.querySelector('#program .bg-white\\/60');
      if (scheduleTable) {
        Motion.scroll(
          Motion.animate(scheduleTable,
            {
              opacity: [0.8, 1],
              transform: ['translateY(10px)', 'translateY(0px)']
            },
            {
              duration: 0.5,
              easing: 'ease-out'
            }
          ),
          {
            target: scheduleTable,
            offset: ['start 0.95', 'start 0.7']
          }
        );
      }

      // Animate the Call for Papers section - very subtle
      const callSection = document.querySelector('#call');
      if (callSection) {
        Motion.scroll(
          Motion.animate(callSection,
            {
              opacity: [0.9, 1],
              transform: ['scale(0.98)', 'scale(1)']
            },
            {
              duration: 0.5,
              easing: 'ease-out'
            }
          ),
          {
            target: callSection,
            offset: ['start 0.95', 'start 0.7']
          }
        );
      }

      // Animate header content - immediate and subtle
      const headerContent = document.querySelector('header .mx-auto');
      if (headerContent) {
        Motion.animate(headerContent,
          {
            opacity: [0.8, 1],
            transform: ['translateY(15px)', 'translateY(0px)']
          },
          {
            duration: 0.8,
            easing: 'ease-out',
            delay: 0.2
          }
        );
      }

    }
});


  
