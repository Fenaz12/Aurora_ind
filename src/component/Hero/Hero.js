import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { Button, Column, MainHeading, Row, TextWrapper } from '../../globalStyles';
import { HeroSection, ButtonContainer } from './HeroStyles';
import Interactive from '../Interactive/Interactive';


const Hero = () => {
	const [AboutOpen, setAboutOpen] = useState(false);
	return (
		<HeroSection id="hero">
			<Row justify="center" align="center" height="100%" padding="2rem">
				<Column align="center" mb="10%">
					<MainHeading>Say Goodbye To Depression From <br></br><span style={{color: '#FF00B7'}}>Aurora</span></MainHeading>
					<ButtonContainer>
						<Link to={'/questions'} >
							<Button big fontBig>Take a free Diagnosis</Button> 
						</Link>
						<Link to={'/Interactive'} >
							<Button big fontBig onClick={() => {setAboutOpen(true);}}>
								Discover More
							</Button>
						</Link>
						
					</ButtonContainer>
				</Column>
			</Row>
		</HeroSection>
		
	);
};

export default Hero;