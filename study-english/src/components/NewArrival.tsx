import React from "react";
import styled from "styled-components";
// import ipad_pro_image from "~img/store-card-ipad-pro.jpeg";
import styles from "./product.module.css";

const StyledProductContainer = styled.div<{
  $scale?: number;
  $transition?: string;
}>`
  max-width: 28rem;
  position: relative;
  transition: transform ${(props) => props.$transition || "0.1s"} ease-in-out;
  &:hover {
    transform: scale(${(props) => props.$scale || 1.05});
    cursor: pointer;
  }
`;

const StyleProductTextContainer = styled.div<{ $textColor?: string }>`
  position: absolute;
  top: 1.5rem;
  padding-left: 1.5rem;
  color: ${(props) => props.$textColor || "#fff"};
  padding-top: 2rem;
`;

export interface NewArrivalProps {
  image: string;
  title: string;
  detail: string;
  transition?: string;
  scale?: number;
  onProductClick?: (title: string) => void;
  textColor?: string;
}

const NewArrival = ({
  image,
  title,
  detail,
  transition,
  scale = 1.05,
  onProductClick,
  textColor,
}: NewArrivalProps) => {
  const imgStyle: React.CSSProperties = {
    width: "100%",
    height: "auto",
    borderRadius: "0.5rem",
  };

  return (
    <StyledProductContainer
      className="product"
      $scale={scale}
      $transition={transition}
      onClick={() => onProductClick && onProductClick(title)}
    >
      <img style={imgStyle} src={image} alt={title} />
      <StyleProductTextContainer
        className={styles.productTextContainer}
        $textColor={textColor}
      >
        <h2 className={styles.productTitle}>{title}</h2>
        <p className={styles.productDetail}>{detail}</p>
      </StyleProductTextContainer>
    </StyledProductContainer>
  );
};

export default NewArrival;
