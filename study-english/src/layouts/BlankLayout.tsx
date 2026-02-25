import { Outlet } from "react-router-dom";

const BlankLayout = () => {
  return (
    <div className="bg-apple-light dark:bg-apple-dark">
      <Outlet />
    </div>
  );
};

export default BlankLayout;
