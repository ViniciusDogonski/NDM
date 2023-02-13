
import { AuthProvider } from './context/authContext';
import { AppRouter } from './router';
import './styles.css';

export const App = () => {



  return (
    <AuthProvider>
    <AppRouter />
    </AuthProvider>
  );

}

