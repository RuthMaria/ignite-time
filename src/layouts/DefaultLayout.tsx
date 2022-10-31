import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

export const DefaultLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <Outlet /> {/* especifica onde o conteúdo será inserido*/}
    </div>
  );
};
