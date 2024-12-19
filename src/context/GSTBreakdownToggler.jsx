import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

/**
 * GSTBreakdownToggleContext
 * - Context for managing the visibility state of the GST Breakdown component.
 * - Provides `isComponentOpen` and `setIsComponentOpen` for global state management.
 */
const GSTBreakdownToggleContext = createContext(null);

export const useGSTBreakdownToggle = () => {
  const context = useContext(GSTBreakdownToggleContext);

  if (!context) {
    throw new Error(
      "useGSTBreakdownToggle must be used within a GSTBreakdownToggleProvider"
    );
  }
  return context;
};

export const GSTBreakdownToggleProvider = ({ children }) => {
  const [isComponentOpen, setIsComponentOpen] = useState(false);
  return (
    <GSTBreakdownToggleContext.Provider
      value={{ isComponentOpen, setIsComponentOpen }}
    >
      {children}
    </GSTBreakdownToggleContext.Provider>
  );
};

GSTBreakdownToggleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
