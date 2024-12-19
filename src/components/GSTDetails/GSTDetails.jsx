import styles from "./GSTDetails.module.scss";
import thumbs_up from "../../assets/images/thumbs_up.svg";
import info_icon from "../../assets/images/info_icon.svg";
import { GST_BREAKDOWN } from "../../constants/depositBreakdown";

const GSTDetails = () => {
  return (
    <div className={styles.gstDetails}>
      <section className={styles.gstDetails__info}>
        <img
          src={info_icon}
          alt="Info Icon"
          aria-hidden="true"
          className={styles.gstDetails__icon}
        />
        <p className={styles.gstDetails__text}>
          Starting 1st October 2023, 28% GST is being charged by Government on
          your deposits.
        </p>
      </section>
      <section className={styles.gstDetails__highlight}>
        <img
          src={thumbs_up}
          alt="Thumbs Up"
          aria-hidden="true"
          className={styles.gstDetails__icon}
        />
        <h5 className={styles.gstDetails__heading}>
          100% Govt. GST paid by {GST_BREAKDOWN.gstPaidBy}
        </h5>
      </section>
    </div>
  );
};

export default GSTDetails;
