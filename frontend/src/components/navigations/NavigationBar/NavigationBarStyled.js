import styled from 'styled-components';

export const NavigationBarStyled = styled.div`
  .navbar {
    background-color: #35363A;
  }
  a, .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;
    text-decoration: none !important;
    &:hover {
      color: white;
    }
  }
`;