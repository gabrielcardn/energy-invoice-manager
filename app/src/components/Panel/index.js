"use client";
import styles from "./Panel.module.css";

const Panel = ({ components }) => {
  return (
    <div className={styles.container}>
      {components?.map((component, index) => (
        <div key={"panel:" + index} className={styles.component}>
          {component}
        </div>
      ))}
    </div>
  );
};

export default Panel;
