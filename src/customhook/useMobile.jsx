import { useState, useEffect } from "react";

/**
 * Custom hook to determine if the current screen width is within a mobile breakpoint.
 * @param {number} [breakpoint=426] - The maximum width for mobile view.
 * @returns {boolean} - Returns `true` if the screen width is less than the breakpoint, otherwise `false`.
 */
const useMobile = (breakpoint = 450) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

export default useMobile;
