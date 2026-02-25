import { useNavigate, useLocation } from "react-router-dom";
const Computers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div>
      <h1>Computers</h1>
      <button onClick={() => navigate(-1)}>返回上一页面</button>
      <button
        onClick={() =>
          navigate("/signin", {
            state: { from: location.pathname },
            replace: true,
          })
        }
      >
        登录
      </button>
      <p>This is the Computers page.</p>
    </div>
  );
};
export default Computers;
