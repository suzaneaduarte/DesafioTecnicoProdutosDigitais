import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background-color: var(--background);
  width: 100%;
`;

const Header = styled.header`
  background-color: white;
  border-bottom: 1px solid var(--border);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
`;

const Nav = styled.nav`
  max-width: var(--container-width);
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  img {
    height: 96px;
    width: auto;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  a {
    color: var(--text);
    text-decoration: none;
    padding: 1rem 2rem;
    border-radius: 8px;
    transition: all 0.2s;
    font-size: 1.2rem;
    font-weight: 500;

    &:hover {
      background-color: var(--background);
      color: var(--primary);
    }

    &.active {
      color: var(--primary);
      background-color: var(--background);
    }
  }
`;

const Main = styled.main`
  width: 100%;
  padding: 3rem 0;
  display: flex;
  justify-content: center;

  > * {
    width: 100%;
    max-width: var(--container-width);
    padding: 0 2rem;
  }
`;

export function Layout() {
  return (
    <Container>
      <Header>
        <Nav>
          <Logo>
            <Link to="/">
              <img src="/logo.png" alt="Super Suzy + Elfa" />
            </Link>
          </Logo>
          <NavLinks>
            <Link to="/">Produtos</Link>
            <Link to="/produtos/novo">Novo Produto</Link>
          </NavLinks>
        </Nav>
      </Header>
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
} 