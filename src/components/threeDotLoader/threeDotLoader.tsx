import React from "react";
import styles from "./threeDotLoader.module.scss";

interface ThreeDotLoaderProps {
  size?: number; // diameter of each dot in px
  color?: string; // dot color
  speed?: number; // animation speed multiplier (1 = normal)
}

const ThreeDotLoader: React.FC<ThreeDotLoaderProps> = ({
  size = 8,
  color = "#333",
  speed = 1.4,
}) => {
  return (
    <div
      className={styles.loader}
      style={{
        ["--dot-size" as any]: `${size}px`,
        ["--dot-color" as any]: color,
        ["--dot-speed" as any]: `${speed}s`,
      }}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default ThreeDotLoader;
