import React from 'react';
import { HeaderContainer } from './styles';
import { Scroll, Timer } from 'phosphor-react';

import logoIgnite from '../../assets/logo-ignite.svg';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <span>
        <img src={logoIgnite} alt="" />
      </span>

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
