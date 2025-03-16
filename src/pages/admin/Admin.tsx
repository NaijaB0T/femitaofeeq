
import { Helmet } from 'react-helmet';
import AdminLogin from '../../components/AdminLogin';

const Admin = () => {
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
