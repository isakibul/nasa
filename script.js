// Progressive Enhancement JavaScript
// This file provides additional functionality but the site works without it

document.addEventListener('DOMContentLoaded', function() {
    // Enhanced keyboard navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const ctaButton = document.querySelector('.cta-button');
    
    // Add keyboard navigation enhancement
    navLinks.forEach(link => {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add enhanced focus management
    let focusedElementIndex = -1;
    const focusableElements = [...navLinks, ctaButton];
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // Let the browser handle tab navigation naturally
            return;
        }
        
        if (e.key === 'Escape') {
            // Clear focus when Escape is pressed
            if (document.activeElement) {
                document.activeElement.blur();
            }
        }
    });
    
    // Smooth scroll for navigation links (if they point to sections)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Add intersection observer for animation optimization
    if ('IntersectionObserver' in window) {
        const solarSystem = document.querySelector('.solar-system');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                } else {
                    entry.target.style.animationPlayState = 'paused';
                }
            });
        }, {
            threshold: 0.1
        });
        
        if (solarSystem) {
            observer.observe(solarSystem);
        }
    }
    
    // Add loading state management
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Add a subtle fade-in effect for content
        const heroContent = document.querySelector('.hero-content');
        const solarSystemContainer = document.querySelector('.solar-system-container');
        
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(20px)';
            heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 200);
        }
        
        if (solarSystemContainer) {
            solarSystemContainer.style.opacity = '0';
            solarSystemContainer.style.transform = 'scale(0.95)';
            solarSystemContainer.style.transition = 'opacity 1s ease, transform 1s ease';
            
            setTimeout(() => {
                solarSystemContainer.style.opacity = '1';
                solarSystemContainer.style.transform = 'scale(1)';
            }, 400);
        }
    });
});

// Main navigation function for the CTA button
// CUSTOMIZATION: Replace this function with your actual navigation logic
function proceedToExploration() {
    // Option 1: Navigate to another page
    // window.location.href = '/exploration.html';
    
    // Option 2: Navigate to a different domain
    // window.location.href = 'https://your-app.com/explore';
    
    // Option 3: Show a modal or trigger an action
    // showExplorationModal();
    
    // Option 4: Scroll to a section (if single page)
    // document.querySelector('#exploration-section')?.scrollIntoView({ behavior: 'smooth' });
    
    // Placeholder action for demo
    console.log('Navigation to exploration feature would happen here');
    alert('Ready to explore exoplanets! Replace this with your navigation logic.');
}

// Utility function to handle errors gracefully
function handleError(error, context) {
    console.warn(`Error in ${context}:`, error);
    // You could implement error tracking here
}

// Performance monitoring (optional)
if ('PerformanceObserver' in window) {
    try {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.entryType === 'largest-contentful-paint') {
                    console.log('LCP:', entry.startTime);
                }
            });
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (error) {
        handleError(error, 'Performance Observer');
    }
}