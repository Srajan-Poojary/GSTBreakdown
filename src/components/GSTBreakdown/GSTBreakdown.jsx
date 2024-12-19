import { useEffect, useState } from "react";
import styles from "./GSTBreakdown.module.scss";
import BottomSheet from "../BottomSheet/BottomSheet";
import GSTDetails from "../GSTDetails/GSTDetails";
import DepositBreakdown from "../DepositBreakdown/DepositBreakdown";
import Modal from "../Modal/Modal";
import { useGSTBreakdownToggle } from "../../context/GSTBreakdownToggler";
import useMobile from "../../customhook/useMobile";

const GSTBreakdown = () => {
  const { isComponentOpen, setIsComponentOpen } = useGSTBreakdownToggle();
  const isMobile = useMobile();

  if (!isComponentOpen) return <></>;

  return (
    <div className={styles.GSTBreakdown}>
      {isMobile ? (
        <BottomSheet
          title="GST? No Worries!"
          open={isComponentOpen}
          onClose={() => setIsComponentOpen(false)}
        >
          <div className={styles.GSTDetailsContainer}>
            <GSTDetails />
          </div>
          <DepositBreakdown />
        </BottomSheet>
      ) : (
        <Modal
          title="GST? No Worries!"
          onClose={() => setIsComponentOpen(false)}
        >
          <div className={styles.GSTDetailsContainer}>
            <GSTDetails />
          </div>

          <DepositBreakdown />
        </Modal>
      )}
    </div>
  );
};

export default GSTBreakdown;
