import {useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import alanBtn from '@alan-ai/alan-sdk-web';


const interfaceKey="dd236a01671189bc5dee01fcdd108b082e956eca572e1d8b807a3e2338fdd0dc/stage";
export default function NavigatorButton() {
    const navigate = useNavigate();
    useEffect(()=> {
        alanBtn({
            key:interfaceKey,
            onCommand: (commandData) => {
                if(commandData.command === 'goVirtualWalk') {
                    navigate("/virtualwalk", { replace: true });
                }else if(commandData.command  === 'goMusicPlatform'){
                    navigate("/music", { replace: true });
                }else if(commandData.command  === 'goTherapyChat'){
                    navigate("/chat", { replace: true });
                }else if(commandData.command  === 'goTextAnalyzer'){
                    navigate("/status", { replace: true });
                }else if(commandData.command  === 'goSpeechAnalyzer'){
                    navigate("/voice", { replace: true });
                }else if(commandData.command  === 'goGoogleMap'){
                    navigate("/nearby", { replace: true });
                }else if(commandData.command  === 'goHome'){
                    navigate("/home", { replace: true });
                }else if(commandData.command  === 'goMobileApp'){
                    navigate("/mobile", { replace: true });
                }else if(commandData.command  === 'goAboutUs'){
                    navigate("/aboutus", { replace: true });
                }else if(commandData.command  === 'goOverview'){
                    navigate("/overview", { replace: true });
                }else if(commandData.command  === 'goPackages'){
                    navigate("/packages", { replace: true });
                }else if(commandData.command  === 'goLogin'){
                    navigate("/login", { replace: true });
                }else if(commandData.command  === 'goSignup'){
                    navigate("/signup", { replace: true });
                }else if(commandData.command  === 'goLogout'){
                    navigate("/logout", { replace: true });
                }else if(commandData.command  === 'goBack') {
                    navigate(-1);
                }else if(commandData.command === 'goDepressionQuiz'){
                    navigate("/questions", { replace: true });
                }else if(commandData.command  === 'goTwitterAnalyzer'){
                    navigate("/twitter", { replace: true });
                }
            }
        }).activate()
    },[]);
    
    return null
}