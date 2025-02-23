import { useSelector } from "react-redux";

function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  return <div>Welcome, X</div>;
}

export default Dashboard;
