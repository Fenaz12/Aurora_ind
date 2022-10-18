import React from 'react';
import styled from 'styled-components';
import { InnerLayout } from './Layout';
import ChartStats from './ChartStats';
import chart from '../../images/chart.png';
import './Charts.css';
//import AnimatedButton from './AnimatedButton';
import { Bounce, Roll, Slide } from 'react-reveal';
import RubberBand from 'react-reveal/RubberBand';


/*<Bounce right>
                            <AnimatedButton name={'Learn More'} />
                        </Bounce>*/
function ChartSection() {
    return (
        <ChartStyled >
            <InnerLayout>
                <div className="chart-con">
                    <div className="chart-left">
                        <Slide left>
                        <div className="stats">
                            <div className="stats-money">
                                <ChartStats name={'Total Global Cases'} amount={'280M'} />
                                <ChartStats name={'Total Ceylon cases'} amount={'802,321'} />
                            </div>
                            <img src={chart} alt="" />
                        </div>
                        </Slide>
                    </div>
                    <div className="chart-right">
                        <Bounce right>
                        <h2 className="secondary-heading">
                        Your mental health matters us
                        </h2>
                        </Bounce>
                        <Bounce right>
                        <p>
                        That is why we decided To Do Something Amazing. We have implemented a very know methodology to detect your depression and reduse it. 
                        And also we hope to give you the best experience you ever had on internet.
                        </p>
                        </Bounce>
                        
                    </div>
                </div>
            </InnerLayout>
        </ChartStyled >
    )
}

const ChartStyled = styled.section`
    .chart-con{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        @media screen and (max-width: 1347px){
            grid-template-columns: repeat(1, 1fr);
        }
        .chart-left{
            width: 80%;
            @media screen and (max-width: 1347px){
                width: 100%;
            }
            .stats{
                img{
                    box-shadow: 0px 25px 50px rgba(22, 25, 79, 0.05);
                    border-radius: 62px;
                    width: 100%;
                }
                .stats-money{
                    display: flex;
                    padding-bottom: 1.3rem;
                    justify-content: space-between;
                }
            }
        }
        .chart-right{
            padding-left: 2rem;
            p{
                padding: 1.3rem 0;
            }
        }
    }
`;

export default ChartSection;