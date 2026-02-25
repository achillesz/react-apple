function WithBanner<T extends object>(
  WrappedComponent: React.ComponentType<T>,
  bannerText: string,
) {
  return ({ soldOut, ...props }: T & { soldOut?: boolean }) => {
    const restProps = props as T;

    if (!soldOut) {
      return <WrappedComponent {...restProps} />;
    }

    return (
      <div
        style={{
          position: "relative",
          display: "inline-block",
        }}
      >
        <WrappedComponent {...restProps} />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(-15deg)",
            color: "red",
            padding: "0.5rem 1rem",
            borderRadius: "0.25rem",
            fontSize: "2.5rem",
            fontWeight: 900,
            fontStyle: "italic",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            zIndex: 10,
          }}
        >
          {bannerText}
        </div>
      </div>
    );
  };
}

export default WithBanner;
