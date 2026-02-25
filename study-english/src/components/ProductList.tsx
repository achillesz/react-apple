import React from "react";
import ReactDOM from "react-dom/client";
import NewArrival from "@/components/NewArrival";
// import type { ProductProps } from "@/components/NewArrival";

// type ProductListProps = {
//   data: ProductProps[];
// };

// const handleProductClick = (title: string) => {
//   alert(`Product clicked: ${title}`);
// };

const ReleaseNode = () => {
  return <div>新产品发布日期：2027-01-01</div>;
};

const ProductNotFoundNode = () => {
  return <div>No products available.</div>;
};

const ListTitle = ({ title }: { title: string }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          fontSize: 32,
          fontWeight: 800,
          backgroundImage: "url('src/assets/lines.png')",
          backgroundPosition: "center",
        }}
        className="dark:text-white"
      >
        {title || "新品上市"}
      </h1>
    </div>
  );
};

type ProductListProps = {
  title: string;
  datalength: number;
  children: React.ReactNode;
};

const ProductList = ({ title, datalength, children }: ProductListProps) => {
  const isReleased = new Date() >= new Date("2026-01-01");

  if (!isReleased) {
    return <ReleaseNode />;
  }

  if (datalength === 0) {
    return <ProductNotFoundNode />;
  }

  return (
    <div
      style={{
        marginTop: "4rem",
        display: "grid",
        justifyItems: "center",
        rowGap: "3rem",
      }}
    >
      <ListTitle title={title} />
      {children}
    </div>
  );
};

export default ProductList;
