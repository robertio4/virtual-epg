import { ReactNode, forwardRef } from "react";

import styles from "./Guide.module.css";

type GuideProps = {
  children: ReactNode[];
};

const Guide = forwardRef<HTMLDivElement, GuideProps>(({ children }, ref) => {
  return (
    <div ref={ref} className={styles.container}>
      {children}
    </div>
  );
});

export default Guide;
