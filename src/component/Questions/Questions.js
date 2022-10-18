import React, {useState} from 'react';
import './Questions.css';
import { NavLink} from 'react-router-dom';

function Questions() {
    const questions = [
        {
			questionText: 'Little interest or pleasure in doing things?',
			answerOptions: [
				{ answerText: 'Not at all', isCorrect: 0 },
				{ answerText: 'Several days', isCorrect: 1 },
				{ answerText: 'More than half the days', isCorrect: 2 },
				{ answerText: 'Nearly every day', isCorrect: 3 },
			],
		},
        {
			questionText: 'Feeling down, depressed, or hopeless?',
			answerOptions: [
				{ answerText: 'Not at all', isCorrect: 0 },
				{ answerText: 'Several days', isCorrect: 1 },
				{ answerText: 'More than half the days', isCorrect: 2 },
				{ answerText: 'Nearly every day', isCorrect: 3 },
			],
		},
        {
			questionText: 'Trouble falling or staying asleep, or sleeping too much?',
			answerOptions: [
				{ answerText: 'Not at all', isCorrect: 0 },
				{ answerText: 'Several days', isCorrect: 1 },
				{ answerText: 'More than half the days', isCorrect: 2 },
				{ answerText: 'Nearly every day', isCorrect: 3 },
			],
		},
        {
			questionText: 'Feeling tired or having little energy?',
			answerOptions: [
				{ answerText: 'Not at all', isCorrect: 0 },
				{ answerText: 'Several days', isCorrect: 1 },
				{ answerText: 'More than half the days', isCorrect: 2 },
				{ answerText: 'Nearly every day', isCorrect: 3 },
			],
		},
        {
			questionText: 'Poor appetite or overeating?',
			answerOptions: [
				{ answerText: 'Not at all', isCorrect: 0 },
				{ answerText: 'Several days', isCorrect: 1 },
				{ answerText: 'More than half the days', isCorrect: 2 },
				{ answerText: 'Nearly every day', isCorrect: 3 },
			],
		},
        {
			questionText: 'Feeling bad about yourself - or that you are a failure or have let yourself or your family down?',
			answerOptions: [
				{ answerText: 'Not at all', isCorrect: 0 },
				{ answerText: 'Several days', isCorrect: 1 },
				{ answerText: 'More than half the days', isCorrect: 2 },
				{ answerText: 'Nearly every day', isCorrect: 3 },
			],
		},
        {
			questionText: 'Trouble concentrating on things, such as reading the newspaper or watching television?',
			answerOptions: [
				{ answerText: 'Not at all', isCorrect: 0 },
				{ answerText: 'Several days', isCorrect: 1 },
				{ answerText: 'More than half the days', isCorrect: 2 },
				{ answerText: 'Nearly every day', isCorrect: 3 },
			],
		},
        {
			questionText: 'Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?',
			answerOptions: [
				{ answerText: 'Not at all', isCorrect: 0 },
				{ answerText: 'Several days', isCorrect: 1 },
				{ answerText: 'More than half the days', isCorrect: 2 },
				{ answerText: 'Nearly every day', isCorrect: 3 },
			],
		},
        {
			questionText: 'Thoughts that you would be better off dead, or of hurting yourself in some way?',
			answerOptions: [
				{ answerText: 'Not at all', isCorrect: 0 },
				{ answerText: 'Several days', isCorrect: 1 },
				{ answerText: 'More than half the days', isCorrect: 2 },
				{ answerText: 'Nearly every day', isCorrect: 3 },
			],
		},
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

    const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect == 0) {
			setScore(score + 0);
		} else if(isCorrect == 1){
            setScore(score + 1);
        } else if(isCorrect == 2){
            setScore(score + 2);
        } else if(isCorrect == 3){
            setScore(score + 3);
        }

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};

    const displayDepression = (score) =>{
        if (score>= 0 && score <= 4){
          return (
            <div className='show-results-depression1'>
              No Depression Detected 
            </div>
          );
        }else if(score>= 5 && score <= 9){
          return (
            <div className='show-results-depression2'>
              Mild Depression Detected 
            </div>
          );
        }else if(score>= 10 && score <= 14){
          return (
            <div className='show-results-depression3'>
              Moderate Depression Detected 
            </div>
          );
        }else if(score>= 15 && score <= 19){
          return (
            <div className='show-results-depression4'>
              Moderately Severe Depression Detected 
            </div>
          );
        }
        else if(score>= 20 && score <= 27){
          return (
            <div className='show-results-depression5'>
              Severe Depression Detected 
            </div>
          );
        }
    };

  return (
    <div className='q-wrap'>
        <div className='q-container'>
            <h2 className='q-title'>Answer n Detect</h2>
        {showScore ? (
            <div className='score-section'>
                {displayDepression(score)}
                <h3 className='score-det'>You have scored {score} out of {(questions.length)*3}</h3>
                <NavLink exact to="/home"> <button className='q-btn'>Back to Home</button> </NavLink>
                <NavLink exact to="/music"><button className='q-btn'>Listen Music</button> </NavLink>
            </div>
        ) : (
            <>
                <div className='q-section'>
                    <div className='q-count'>
                        <span>Question {currentQuestion + 1}</span>/{questions.length}
                    </div>
                    <div className='q-text'>{questions[currentQuestion].questionText}</div>
                </div>
                <div className='ans-sec'>
                    {questions[currentQuestion].answerOptions.map((answerOption) =>(
                        <button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)} className='q-btn'>{answerOption.answerText}</button>
                    ))}
                </div>
            </>
        )}
        </div>
    </div>
  )
}

export default Questions;