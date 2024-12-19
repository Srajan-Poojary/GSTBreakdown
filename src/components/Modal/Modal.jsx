import ReactDom from "react-dom";
import PropTypes from "prop-types";
import close_icon_large from "../../assets/images/close_icon_large.svg";
import styles from "./Modal.module.scss";
import { useEffect, useRef } from "react";

/**
 * Modal Component
 * - Renders content inside a portal to a designated `#modal` DOM node.
 * - Provides overlay click-to-close functionality.
 * - Includes a header with a title and close button.
 */
const Modal = ({ children, onClose, title }) => {
  // Create a reference to the modal container element
  const elRef = useRef(null);
  const modalRoot = useRef(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  if (!modalRoot.current) {
    modalRoot.current = document.getElementById("modal");
  }

  useEffect(() => {
    if (!modalRoot.current) {
      console.error("Modal root element (#modal) is missing in the DOM.");
      return;
    }

    // close modal when user clicks ESC
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    modalRoot.current.appendChild(elRef.current);
    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      modalRoot.current.removeChild(elRef.current);
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  // Prevent event propagation when clicking inside the modal content
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return ReactDom.createPortal(
    <div className={styles.modal__overlay} onClick={() => onClose()}>
      <div className={styles.modal__content} onClick={handleContentClick}>
        {/* Header */}
        <div className={styles.modal__header}>
          <h2 className={styles.modal__title}>{title}</h2>
          <button
            className={styles.modal__header_close}
            onClick={onClose}
            aria-label="Close Modal"
          >
            <img src={close_icon_large} alt="close icon" role="presentation" />
          </button>
        </div>
        {/* Modal Body */}
        <div className={styles.modal__body}>{children}</div>
      </div>
    </div>,
    elRef.current
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Modal;
