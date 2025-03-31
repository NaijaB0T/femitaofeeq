
import { Helmet } from 'react-helmet';
import AdminLogin from '../../components/AdminLogin';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Admin = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  
  return (
    <>
      <Helmet>
        <title>Admin Login | Femi Taofeeq</title>
      </Helmet>
      <AdminLogin />
    </>
  );
};

export default Admin;
