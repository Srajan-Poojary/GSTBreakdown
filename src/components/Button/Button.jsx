import styles from "./Button.module.scss";
import PropTypes from "prop-types";
import "../../styles/global.scss";

/**
 * Button Component
 * - Handles different variants, sizes, loading, and disabled states dynamically.
 */
const Button = ({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  onClick,
  className,
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    loading && styles.loading,
    className,
  ]
    .filter(Boolean) // Remove falsy values
    .join(" "); // Join classes into a single string

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
    >
      {loading ? <span className={styles.loader}></span> : children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
