import React from "react";
import styles from "./withSoldOut.module.css";

function withSoldOut<T extends object>(
  WrappedComponent: React.ComponentType<T>,
) {
  return ({ soldOut, ...props }: T & { soldOut?: boolean }) => {
    const restProps = props as T;

    if (soldOut) {
      return (
        <div className={styles.grayOverlay}>
          <WrappedComponent {...restProps} soldOut={soldOut} />
        </div>
      );
    }

    return <WrappedComponent {...restProps} soldOut={soldOut} />;
  };
}

export default withSoldOut;
