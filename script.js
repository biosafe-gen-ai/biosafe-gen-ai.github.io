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
});


  