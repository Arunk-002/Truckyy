import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CustomLoader from '../components/CustomLoader'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <CustomLoader/>;
  return user ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
