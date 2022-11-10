import React from 'react';
import { NavLink } from 'react-router-dom';
import { Scroll, Timer } from 'phosphor-react';

import logoIgnite from '../../assets/logo-ignite.svg';

import { HeaderContainer } from './styles';

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <NavLink to="/">
        <img
          src={logoIgnite}
          alt="Setas verdes inclinadas para o canto superior esquerdo"
          title="Ignite Logo"
        />
      </NavLink>

      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
};
