import Button from "./components/Button/Button";
import styles from "./App.module.scss";
import { useGSTBreakdownToggle } from "./context/GSTBreakdownToggler";
import GSTBreakdown from "./components/GSTBreakdown/GSTBreakdown";

function App() {
  const { setIsComponentOpen } = useGSTBreakdownToggle();

  return (
    <div className={styles.appWrapper}>
      <div className={styles.buttonWrapper}>
        <Button
          size="large"
          onClick={() => setIsComponentOpen((prev) => !prev)}
        >
          Show GST Breakdown
        </Button>

        <GSTBreakdown />
      </div>
    </div>
  );
}

export default App;
