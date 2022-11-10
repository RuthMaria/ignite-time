import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header';

import { LayoutContainer } from './styles';

/* Dependendo da rota que estiver sendo acessada, o componente Outlet irá renderizar o componente da rota ativa no momento */

export const DefaultLayout: React.FC = () => {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  );
};
