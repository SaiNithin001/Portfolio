import { useRef, useEffect, useState } from 'react'

function ScrollableContainer({ children, className = '' }) {
  const scrollRef = useRef(null)
  const [hasOverflow, setHasOverflow] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const autoScrollIntervalRef = useRef(null)
  const highlightIntervalRef = useRef(null)
  const currentIndexRef = useRef(0)
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef(null)

  // Check if content overflows
  const checkOverflow = () => {
    const container = scrollRef.current
    if (!container) return false
    
    const hasOverflowContent = container.scrollWidth > container.clientWidth
    setHasOverflow(hasOverflowContent)
    return hasOverflowContent
  }

  // Highlight the centered item
  const updateHighlight = () => {
    // Don't update highlight during active scroll
    if (isScrollingRef.current) return

    if (!hasOverflow) {
      // Remove all highlights if no overflow
      const container = scrollRef.current
      if (!container) return
      const items = container.children[0]?.children
      if (items) {
        Array.from(items).forEach(item => item.classList.remove('highlighted'))
      }
      return
    }

    const container = scrollRef.current
    if (!container) return

    const items = container.children[0]?.children
    if (!items || items.length === 0) return

    const scrollLeft = container.scrollLeft
    const containerWidth = container.clientWidth
    
    // Check for first item (at start)
    if (scrollLeft <= 10) {
      // First item is visible
      Array.from(items).forEach((item, idx) => {
        item.classList.remove('highlighted')
        if (idx === 0) {
          item.classList.add('highlighted')
          currentIndexRef.current = 0
        }
      })
      return
    }
    
    // Check for last item (at end)
    const maxScroll = container.scrollWidth - containerWidth
    if (scrollLeft >= maxScroll - 10) {
      // Last item is visible
      Array.from(items).forEach((item, idx) => {
        item.classList.remove('highlighted')
        if (idx === items.length - 1) {
          item.classList.add('highlighted')
          currentIndexRef.current = items.length - 1
        }
      })
      return
    }

    // For middle items, find closest to center
    const containerRect = container.getBoundingClientRect()
    const containerCenter = containerRect.left + containerRect.width / 2

    let closestIndex = 0
    let closestDistance = Infinity

    // Find the item closest to center
    Array.from(items).forEach((item, index) => {
      const itemRect = item.getBoundingClientRect()
      const itemCenter = itemRect.left + itemRect.width / 2
      const distance = Math.abs(itemCenter - containerCenter)

      // Remove previous highlight
      item.classList.remove('highlighted')

      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })

    // Add highlight to closest item
    if (items[closestIndex]) {
      items[closestIndex].classList.add('highlighted')
      currentIndexRef.current = closestIndex
    }
  }

  // Scroll to center a specific item
  const scrollToItem = (index) => {
    // Prevent if already scrolling (unless it's a forced update)
    if (isScrollingRef.current) return

    const container = scrollRef.current
    if (!container) return

    const items = container.children[0]?.children // Get items from the grid/list
    if (!items || items.length === 0) return

    // Validate index
    if (index < 0 || index >= items.length) return

    const targetItem = items[index]
    if (!targetItem) return

    // Mark that we're scrolling to prevent highlight updates
    isScrollingRef.current = true

    // Clear any existing scroll timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    // Calculate scroll position to center the item
    const containerWidth = container.clientWidth
    const itemOffset = targetItem.offsetLeft
    const itemWidth = targetItem.offsetWidth
    
    // Calculate max scroll
    const maxScroll = Math.max(0, container.scrollWidth - containerWidth)
    
    // Handle edge cases for first and last items
    let scrollLeft
    const previousIndex = currentIndexRef.current
    const isLoopingFromLast = previousIndex === items.length - 1 && index === 0
    
    if (index === 0) {
      // First item - scroll to start (0)
      scrollLeft = 0
      container.scrollTo({
        left: scrollLeft,
        behavior: isLoopingFromLast ? 'auto' : 'smooth'
      })
    } else if (index === items.length - 1) {
      // Last item - scroll to end (maxScroll) so it's fully visible
      scrollLeft = maxScroll
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      })
    } else {
      // Middle items - center them
      scrollLeft = itemOffset - (containerWidth / 2) + (itemWidth / 2)
      scrollLeft = Math.max(0, Math.min(scrollLeft, maxScroll))
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      })
    }

    // Update current index immediately
    currentIndexRef.current = index

    // Force highlight the target item immediately
    Array.from(items).forEach((item, idx) => {
      item.classList.remove('highlighted')
      if (idx === index) {
        item.classList.add('highlighted')
      }
    })

    // Mark scrolling as complete after scroll animation finishes
    const delay = isLoopingFromLast ? 150 : 650
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false
      // Verify highlight is correct after scroll completes
      updateHighlight()
      // Ensure the target item is still highlighted
      Array.from(items).forEach((item, idx) => {
        if (idx === index) {
          item.classList.add('highlighted')
        }
      })
    }, delay)
  }

  // Auto-scroll to next item
  const scrollToNext = () => {
    // Prevent if already scrolling
    if (isScrollingRef.current) return

    const container = scrollRef.current
    if (!container) return

    const items = container.children[0]?.children
    if (!items || items.length === 0) return

    // Need at least 2 items to scroll
    if (items.length < 2) return

    // Move to next item, loop back to 0 if at end
    const currentIndex = currentIndexRef.current
    const nextIndex = (currentIndex + 1) % items.length
    
    // If looping from last to first, instant jump to avoid glitch
    if (currentIndex === items.length - 1 && nextIndex === 0) {
      // Mark as scrolling
      isScrollingRef.current = true
      
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      // Immediately jump to first item without smooth scroll
      currentIndexRef.current = 0
      container.scrollTo({
        left: 0,
        behavior: 'auto' // Instant jump
      })
      
      // Update highlight immediately
      Array.from(items).forEach((item, idx) => {
        item.classList.remove('highlighted')
        if (idx === 0) {
          item.classList.add('highlighted')
        }
      })
      
      // Reset scrolling flag after a short delay
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false
      }, 150)
    } else {
      currentIndexRef.current = nextIndex
      scrollToItem(nextIndex)
    }
  }

  // Manual scroll functions
  const scroll = (direction) => {
    // Prevent multiple scrolls at once
    if (isScrollingRef.current) return

    const container = scrollRef.current
    if (!container) return

    const items = container.children[0]?.children
    if (!items || items.length === 0) return

    // Stop auto-scroll temporarily
    stopAutoScroll()

    if (direction === 'left') {
      currentIndexRef.current = currentIndexRef.current === 0 ? items.length - 1 : currentIndexRef.current - 1
    } else {
      currentIndexRef.current = (currentIndexRef.current + 1) % items.length
    }
    
    scrollToItem(currentIndexRef.current)
    
    // Resume auto-scroll after scroll completes
    const delay = 700
    setTimeout(() => {
      if (!isPaused && hasOverflow) {
        startAutoScroll()
      }
    }, delay)
  }

  // Start highlighting updates
  const startHighlighting = () => {
    if (!hasOverflow) return

    if (highlightIntervalRef.current) {
      clearInterval(highlightIntervalRef.current)
    }

    // Update highlight periodically, but only when not scrolling
    highlightIntervalRef.current = setInterval(() => {
      if (!isScrollingRef.current) {
        updateHighlight()
      }
    }, 200) // Increased interval to reduce conflicts
  }

  // Start auto-scroll
  const startAutoScroll = () => {
    if (!hasOverflow) {
      stopAutoScroll()
      return
    }

    if (isPaused) return

    // Clear existing interval
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current)
    }

    autoScrollIntervalRef.current = setInterval(() => {
      if (!isPaused && hasOverflow) {
        scrollToNext()
      }
    }, 3000) // 3 seconds per item
  }

  // Stop auto-scroll
  const stopAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current)
      autoScrollIntervalRef.current = null
    }
  }

  // Stop highlighting
  const stopHighlighting = () => {
    if (highlightIntervalRef.current) {
      clearInterval(highlightIntervalRef.current)
      highlightIntervalRef.current = null
    }
  }

  useEffect(() => {
    // Check overflow on mount and resize
    checkOverflow()

    const handleResize = () => {
      const overflow = checkOverflow()
      if (!overflow) {
        stopAutoScroll()
        currentIndexRef.current = 0
      }
    }

    const handleScroll = () => {
      // Only update highlight on manual scroll (not programmatic)
      // Don't update if we're in the middle of a programmatic scroll
      if (!isScrollingRef.current) {
        updateHighlight()
      }
    }

    window.addEventListener('resize', handleResize)
    const container = scrollRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }
    
    return () => {
      window.removeEventListener('resize', handleResize)
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
      stopAutoScroll()
      stopHighlighting()
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (hasOverflow) {
      startHighlighting()
      if (!isPaused) {
        // Small delay to ensure everything is set up
        setTimeout(() => {
          startAutoScroll()
        }, 200)
      }
    } else {
      stopAutoScroll()
      stopHighlighting()
      // Remove highlights when no overflow
      const container = scrollRef.current
      if (container) {
        const items = container.children[0]?.children
        if (items) {
          Array.from(items).forEach(item => item.classList.remove('highlighted'))
        }
      }
    }

    return () => {
      stopAutoScroll()
      stopHighlighting()
    }
  }, [hasOverflow, isPaused])

  // Handle pause state changes
  useEffect(() => {
    if (hasOverflow && !isPaused) {
      startAutoScroll()
    } else {
      stopAutoScroll()
    }
  }, [isPaused])

  // Initialize scroll position on mount
  useEffect(() => {
    if (hasOverflow) {
      setTimeout(() => {
        scrollToItem(0)
        updateHighlight()
        // Start auto-scroll after initial setup
        setTimeout(() => {
          startAutoScroll()
        }, 1000)
      }, 100)
    } else {
      // If no overflow, remove all highlights
      setTimeout(() => {
        const container = scrollRef.current
        if (container) {
          const items = container.children[0]?.children
          if (items) {
            Array.from(items).forEach(item => item.classList.remove('highlighted'))
          }
        }
      }, 100)
    }
  }, [hasOverflow])

  const handleMouseEnter = () => {
    setIsPaused(true)
    // Don't stop scroll if already scrolling
    if (!isScrollingRef.current) {
      stopAutoScroll()
    }
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
    // Resume auto-scroll only if not currently scrolling
    if (!isScrollingRef.current && hasOverflow) {
      startAutoScroll()
    }
  }

  return (
    <div 
      className={`scrollable-container-wrapper ${className} ${hasOverflow ? 'has-overflow' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {hasOverflow && (
        <>
          <button 
            className="scroll-arrow scroll-arrow-left"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            className="scroll-arrow scroll-arrow-right"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </>
      )}
      <div 
        className={`scrollable-container ${!hasOverflow ? 'center-content' : ''}`}
        ref={scrollRef}
      >
        {children}
      </div>
    </div>
  )
}

export default ScrollableContainer

