import React from "react";
import { NavLink } from "react-router-dom";

import Logo from "../../assets/logo.svg";

import { Container } from "./styles";

interface HeaderProps {
  size?: "small" | "large";
}

const Header: React.FC<HeaderProps> = ({ size = "large" }: HeaderProps) => (
  <Container size={size}>
    <header>
      <img src={Logo} alt="GoFinances" />
      <nav>
        <NavLink to="/" exact activeClassName="selected">
          Listagem
        </NavLink>
        <NavLink to="/import" activeClassName="selected">
          Importar
        </NavLink>
      </nav>
    </header>
  </Container>
);

export default Header;
