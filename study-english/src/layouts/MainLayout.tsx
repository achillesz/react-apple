import { Outlet } from "react-router-dom";

const MainLayout: React.FC<{
  header: React.ReactNode;
  footer?: React.ReactNode;
}> = ({ header, footer }) => {
  return (
    <div className="bg-apple-light dark:bg-apple-dark">
      {header ?? <h1>Main Layout</h1>}
      <Outlet />
      {footer ?? <footer>Footer</footer>}
    </div>
  );
};

export default MainLayout;
