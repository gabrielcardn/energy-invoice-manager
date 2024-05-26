"use client";
import styles from "./Panel.module.css";

const Panel = ({ components }) => {
  return (
    <div className={styles.container}>
      {components?.map((component) => (
        <div className={styles.component}>{component}</div>
      ))}
    </div>
  );
};

export default Panel;
