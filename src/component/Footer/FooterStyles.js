import styled from 'styled-components';

export const FooterStyles = styled.footer`
.container{
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
}

background-color: #101826;
padding: 10rem 0;
.footer__wrapper {
  text-align: center;
}
.footer__logo {
  max-width: 120px;
  margin: 0 auto;
  margin-bottom: 1rem;
}
.footer__desc {
  color: #FFFFFF;
  max-width: 350px;
  margin: 0 auto;
  margin-bottom: 2rem;
}
.footer__links {
  margin-bottom: 2rem;
  li {
    display: inline-block;
    margin: 0 1rem;
  }
  a {
    font-size: 1.6rem;
    line-height: 1.5em;
    color: #F3F1FE;
  }
  li:hover {
    a {
      color: #6C62E2;
      text-decoration: underline;
    }
  }
}
.footer__copyright {
  font-size: 1.2rem;
  color: #3B447A;
}
@media only screen and (max-width: 768px) {
  .footer__links {
    a {
      font-size: 1.4rem;
    }
  }
}
`;

export default {
  light: 'light',
  dark: 'dark',
};