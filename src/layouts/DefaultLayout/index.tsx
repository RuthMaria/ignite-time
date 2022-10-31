import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header';

import { LayoutContainer } from './styles';

export const DefaultLayout: React.FC = () => {
  return (
    <LayoutContainer>
      <Header />
      <Outlet /> {/* especifica onde o conteúdo será inserido*/}
    </LayoutContainer>
  );
};
