import React, { useRef, useState, useEffect, useCallback } from 'react'; 

const scrollerStyles = {

    container: {
        position: 'relative' as 'relative',
        maxWidth: '100%',
        padding: 10,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        borderRadius: 8,
        backgroundColor: '#ffffff',
    },
    tableWrapper: {
        overflowX: 'hidden', 
        scrollBehavior: 'smooth'
    },
    button: {
        padding: '8px 12px',
        backgroundColor: '#3f51b5',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '4px',
        margin: '0 5px',
        fontSize: '16px',
        fontWeight: 'bold',
        transition: 'opacity 0.3s',
    },
    buttonDisabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
        backgroundColor: '#9fa8da',
    },
    controls: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '15px',
        padding: '0 5px',
    },
    statusBar: {
        fontSize: '14px',
        color: '#555',
        display: 'flex',
        alignItems: 'center',
        fontWeight: '600',
    },
    progressBarContainer: {
        height: '15px',
        width: '100px',
        backgroundColor: '#e0e0e0',
        borderRadius: '3px',
        marginLeft: '10px',
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#4caf50',
        transition: 'width 0.3s ease-out',
    },
};
// ... (rest of scrollerStyles) ...

const CustomTableScroller: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const tableWrapperRef = useRef<HTMLDivElement>(null);
    const [scrollPosition, setScrollPosition] = useState(0); 
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    
    // Increased scroll step slightly to ensure visible movement
    const scrollStep = 300; 

    // The updateScrollState and useEffect functions should be fine, as they control the status bar and button state.

    // 4. **AMENDED Scrolling Handlers**
    const handleScroll = (direction: 'left' | 'right') => {
        const wrapper = tableWrapperRef.current;
        if (wrapper) {
            
            const step = direction === 'left' ? -scrollStep : scrollStep;
            const newScrollLeft = wrapper.scrollLeft + step;

            // Use window.requestAnimationFrame to ensure the scroll action is processed smoothly 
            // and the component is ready. This often fixes issues where direct scroll calls fail.
            window.requestAnimationFrame(() => {
                wrapper.scrollTo({
                    left: newScrollLeft,
                    behavior: 'smooth',
                });
            });
        }
    };

    // ... (rest of the component logic) ...

    const updateScrollState = useCallback(() => {
        const wrapper = tableWrapperRef.current;
        if (wrapper) {
          const { scrollLeft, scrollWidth, clientWidth } = wrapper;
    
          const maxScroll = scrollWidth - clientWidth;
    
          if (maxScroll <= 0) {
            setCanScrollLeft(false);
            setCanScrollRight(false);
            setScrollPosition(0);
            return;
          }
          
          const newPosition = scrollLeft / maxScroll;
          setScrollPosition(newPosition);
    
          const epsilon = 1;
          setCanScrollLeft(scrollLeft > epsilon);
          setCanScrollRight(scrollLeft < maxScroll - epsilon);
        }
      }, []);
    
     useEffect(() => {
    const wrapper = tableWrapperRef.current;
    if (wrapper) {
        
        const initialCheck = () => updateScrollState();
        
      
        wrapper.addEventListener('scroll', updateScrollState);
       
        window.addEventListener('resize', initialCheck);

      
        const timer = setTimeout(initialCheck, 100); 

        let intervalId: NodeJS.Timeout | undefined;
        if (!canScrollRight) { // Only poll if scrolling isn't yet enabled
             intervalId = setInterval(() => {
                initialCheck();
               
                if (tableWrapperRef.current && tableWrapperRef.current.scrollWidth > tableWrapperRef.current.clientWidth) {
                    clearInterval(intervalId);
                }
            }, 500); 
        }

        return () => {
            wrapper.removeEventListener('scroll', updateScrollState);
            window.removeEventListener('resize', initialCheck);
            clearTimeout(timer);
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }

}, [updateScrollState, canScrollRight]);
    
      const percentage = Math.round(scrollPosition * 100);

    return (
        <div style={scrollerStyles.container}>
            
            {/* Scrollable Wrapper */}
            <div ref={tableWrapperRef} style={scrollerStyles.tableWrapper as React.CSSProperties}>
                {children} 
            </div>

            {/* Controls and Status Bar */}
            <div style={scrollerStyles.controls}>
                <div>
                    {/* Left Scroll Button */}
                    <button
                        onClick={() => handleScroll('left')}
                        disabled={!canScrollLeft}
                        style={{ ...scrollerStyles.button, ...(!canScrollLeft && scrollerStyles.buttonDisabled) }}
                    >
                        &larr; Scroll Left
                    </button>
                    
                    {/* Right Scroll Button */}
                    <button
                        onClick={() => handleScroll('right')}
                        disabled={!canScrollRight}
                        style={{ ...scrollerStyles.button, ...(!canScrollRight && scrollerStyles.buttonDisabled) }}
                    >
                        Scroll Right &rarr;
                    </button>
                </div>

                {/* Status Bar */}
              
            </div>
        </div>
    );
};

export default CustomTableScroller;