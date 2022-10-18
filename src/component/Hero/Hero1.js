import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, MainHeading } from '../../globalStyles1';
import { HeroSection, HeroText, ButtonWrapper } from './HeroStyles1'

const Hero = () => {
  return <HeroSection id='hero'>
      <Container>
          <MainHeading>Say GoodBye To Depression From Aurora</MainHeading>
          

          <ButtonWrapper>
              <Link to='/'>
                  <Button big>Scroll Down</Button>
              </Link>
          </ButtonWrapper>
      </Container>
  </HeroSection>;
};

export default Hero;

<TextWrapper
						color="white"
						size="clamp(1rem,3vw,1.3rem)"
						margin="0 0 2rem"
						lineHeight="1.1rem"
						maxWidth="480px"
						align="center"
					>
						
					</TextWrapper>
