import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PropTypes from "prop-types";

export const Protected = ({ children }) => {
  const { isAuth, loading } = useAuth();
  if (!loading && !isAuth) {
    return <Navigate to="/login" />;
  }
  if (!loading) return children;
};

Protected.propTypes = {
  children: PropTypes.node.isRequired,
};
