import React from 'react';
import styled from 'styled-components';
import './FooterStyles';

const ParagraphStyles = styled.p`
  font-size: 1.6rem;
  line-height: 1.4em;
  color:'#3B447A';
  @media only screen and (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

function ParagraphText({ children, ...rest }) {
  return <ParagraphStyles {...rest}>{children}</ParagraphStyles>;
}

export default ParagraphText;