import styles from "./BottomSheet.module.scss";
import close_icon from "../../assets/images/close_icon.svg";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

const BottomSheet = ({ children, open = false, onClose, title }) => {
  const bottomSheetWrapperRef = useRef();
  const gradientRef = useRef();

  // This effect handles the opening and closing animation of the BottomSheet
  useEffect(() => {
    if (open) {
      // Animate the opening of the BottomSheet
      bottomSheetWrapperRef.current.getBoundingClientRect();
      bottomSheetWrapperRef.current.style.height = "90vh";
      bottomSheetWrapperRef.current.style.transition = "height 0.3s ease-out";
      gradientRef.current.style.display = "block";

      // Cleanup transition after animation
      setTimeout(() => {
        bottomSheetWrapperRef.current.style.transition = "";
      }, 300);
    } else {
      // Reset styles for closing the BottomSheet
      bottomSheetWrapperRef.current.style.height = "0vh";
      bottomSheetWrapperRef.current.style.transition = "";
      gradientRef.current.style.display = "none";
    }
  }, [open]);

  const handleGradientClick = () => {
    bottomSheetWrapperRef.current.style.height = "0vh";
    gradientRef.current.style.display = "none";
    onClose();
  };

  // Handle the swipe gesture to resize or close the BottomSheet
  const handleTouchStart = (e) => {
    // Initialization of gesture tracking variables
    let startingTouchPointY = e.targetTouches[0].clientY;
    let maxHeight = window.innerHeight;
    let seventyFivePercentHeight = maxHeight * 0.75;
    let twentyFivePercentHeight = maxHeight * 0.25;
    let prevHeight = window.innerHeight * 0.5;

    // Dynamically update height during gesture
    const handleTouchMove = (e) => {
      gradientRef.current.style.display = "block";
      const newHeight =
        prevHeight + startingTouchPointY - e.targetTouches[0].clientY;

      if (newHeight < maxHeight) {
        bottomSheetWrapperRef.current.style.height = newHeight + "px";
      }

      startingTouchPointY = e.targetTouches[0].clientY;
      prevHeight = parseInt(bottomSheetWrapperRef.current.style.height);
    };

    // Determine final position after gesture ends
    const handleTouchEnd = () => {
      if (prevHeight >= seventyFivePercentHeight) {
        bottomSheetWrapperRef.current.style.height = maxHeight + "px";
      } else if (prevHeight <= twentyFivePercentHeight) {
        bottomSheetWrapperRef.current.style.height = "0vh";
        gradientRef.current.style.display = "none";
        onClose();
      }

      // Cleanup gesture listeners
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };

    // Attach gesture listeners
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
  };
  return (
    <div className={styles.bottomSheet}>
      <div
        className={styles.bottomSheet__gradient}
        ref={gradientRef}
        onClick={handleGradientClick}
      ></div>
      <div
        className={styles.bottomSheet__container}
        ref={bottomSheetWrapperRef}
      >
        <div
          className={styles.bottomSheet__header}
          onTouchStart={handleTouchStart}
        >
          <h2 className={styles.bottomSheet_title}>{title}</h2>
          <button
            className={styles.bottomSheet__header_close}
            onClick={onClose}
            aria-label="Close Modal"
          >
            <img src={close_icon} alt="close icon" />
          </button>
        </div>
        <div
          className={styles.bottomSheet__body}
          onTouchStart={handleTouchStart}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

BottomSheet.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default BottomSheet;
