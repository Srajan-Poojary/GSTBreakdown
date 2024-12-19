import styles from "./DepositBreakdown.module.scss";
import thumbs_up from "../../assets/images/thumbs_up.svg";
import dashed_arrow_right from "../../assets/images/dashed-arrow-right.svg";
import double_arrow_icon from "../../assets/images/double_arrow_icon.svg";
import { useEffect, useRef } from "react";
import ConfettiGenerator from "confetti-js";
import { GST_BREAKDOWN } from "../../constants/depositBreakdown";

const DepositBreakdown = () => {
  const canvasConfettiRef = useRef(null);

  // Initialize the confetti generator with specified settings
  useEffect(() => {
    const confettiSettings = {
      target: canvasConfettiRef.current,
      max: 80,
      size: 0.6,
      clock: 20,
      rotate: true,
      respawn: false,
      start_from_edge: true,
    };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    // Cleanup the confetti generator on component unmount
    return () => confetti.clear();
  }, []);

  return (
    <div className={styles.depositBreakdown}>
      {/* Heading Section */}
      <div className={styles.depositBreakdown__heading}>
        <p>GST benefits earned so far </p>
        <h5 className={styles.depositBreakdown__amount}>₹1,10,000</h5>
      </div>

      {/* Workflow Section */}
      <div className={styles.depositBreakdown__workflow}>
        <h3 className={styles.depositBreakdown__title}>
          How GST on deposit works?
        </h3>
        <div className={styles.depositBreakdown__summary}>
          <p>You Pay</p>
          <h3>
            {GST_BREAKDOWN.currencySymbol}
            {GST_BREAKDOWN.totalAmount}
          </h3>
          <p>Inclusive of Govt. GST</p>
        </div>

        {/* Breakdown */}
        <div className={styles.depositBreakdown__breakdown}>
          <div className={styles.depositBreakdown__wallet}>
            <p className={styles.depositBreakdown__amount}>
              {GST_BREAKDOWN.currencySymbol}
              {GST_BREAKDOWN.walletAmount}
            </p>
            <p>Goes to your wallet</p>
          </div>
          <img
            src={double_arrow_icon}
            className={styles.double_arrow_icon}
            alt="double_arrow_icon"
            aria-disabled="true"
          />
          <div className={styles.depositBreakdown__wallet}>
            <p
              className={`${styles.depositBreakdown__amount} ${styles.depositBreakdown__tax}`}
            >
              {GST_BREAKDOWN.currencySymbol}
              {GST_BREAKDOWN.gstAmount}
            </p>
            <p>Govt. GST on your deposit</p>
          </div>
        </div>

        {/* Final Summary */}
        <div className={styles.depositBreakdown__final}>
          <div
            className={styles.depositBreakdown__rummyCircle}
            aria-label="RummyCircle GST payment summary"
          >
            <canvas
              className={styles.confetti__canvas}
              ref={canvasConfettiRef}
            ></canvas>
            <p className={styles.depositBreakdown__amount}>
              {GST_BREAKDOWN.currencySymbol}
              {GST_BREAKDOWN.gstAmount}
            </p>
            <div className={styles.imageAndDisclaimerContainer}>
              <img
                src={thumbs_up}
                alt="Thumbs Up"
                role="presentation"
                aria-hidden="true"
              />
              <span className={styles.depositBreakdown__disclaimer}>
                GST paid by <strong>{GST_BREAKDOWN.gstPaidBy}</strong>
              </span>
            </div>
            <p className={styles.depositBreakdown__disclaimer}>
              on your behalf
            </p>
          </div>
          <img
            src={dashed_arrow_right}
            className={styles.dashed_arrow_right}
            alt="dashed_arrow_right"
            aria-disabled="true"
          />
          <div className={styles.depositBreakdown__user}>
            <p>You Get</p>
            <h2 className={styles.depositBreakdown__amount}>
              {GST_BREAKDOWN.currencySymbol}
              {GST_BREAKDOWN.totalAmount}
            </h2>
            <p>in your wallet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositBreakdown;
