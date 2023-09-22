import { useState } from 'react';
import styles from './questionaire.module.css';
import { equalArrays } from '@/utils/utils';

export default function QuestionnaireSolution() {

  const questions = [
    {
      id: 0,
      type: 'SINGLE',
      question: 'how many feet in a meter?',
      options: [ '2.4', '3.2', '1.9', '4'],
      correct: ['3.2'],
      answer: [],
      status: false
    },
    {
      id: 1,
      type: 'SINGLE',
      question: 'how fast can a cheetah run (in mph)?',
      options: [ '75', '85', '50', '63'],
      correct: ['75'],
      answer: [],
      status: false
    },
    {
      id: 2,
      type: 'MULTI',
      question: 'which of these was once a british colony?',
      options: [ 'Canada', 'New Zealand', 'Australia', 'Iceland'],
      correct: ['Canada', 'New Zealand', 'Australia'],
      answer: [],
      status: false
    }
  ];

  const [content, setContent] = useState(questions);
  const [showAnswer, setShowAnswer] = useState(false);

  const validateQuestionnaire = ()=> {
    setContent( previous => {
      return previous.map(quest=> {
        quest.status = equalArrays(quest.answer, quest.correct)
        return quest;
      })
  })

    setShowAnswer(true);
  }

  const handleOptionSelected = (quest, opt, isChecked) => {
    setContent((previous) => {
      return previous.map((currentQuestion) => {
        if (quest.id === currentQuestion.id) {
          const updatedQuestion = { ...currentQuestion }; // Create a copy of the current question object to keep the function pure
  
          if (currentQuestion.type === 'SINGLE') {
            updatedQuestion.answer = isChecked ? [opt] : [];
          } else {
            // usually, i would only need to remove the option if !isChecked, but
            // in react strict mode, this function is called twice! so if i just keep it in the else
            // then it gets added twice.
            // to fix this, i just always remove it just in case, and add it if needs to
            updatedQuestion.answer = updatedQuestion.answer.filter((answ) => answ !== opt);
            if (isChecked) {
              updatedQuestion.answer.push(opt);
            }
          }
          return updatedQuestion; // Return the updated question object
        }
        return currentQuestion;
      });
    });
  };

  return (
  <>
  <div className={styles.container}>
    {content.map((quest, idx)=> (
      <div key={idx} className={styles.questionRow}>
        <span className={styles.question}>
          {quest.question}
        </span>
        <div className={styles.answers}>
          {quest.options.map((opt, optidx)=>(
            <span key={optidx}>
              <input type={quest.type === 'SINGLE'? 'radio': 'checkbox'} name={quest.id} id={optidx} onChange={(e) => handleOptionSelected(quest, opt, e.target.checked)}/>
              {opt}
            </span>
          ))}
          {
            showAnswer && 
            <div className={styles.answerResult}>Your answer is {quest.status? 'correct!': 'incorrect'}</div>
          }
        </div>
      </div>
    ))}
    <button className={styles.validate} onClick={() => validateQuestionnaire()}>
        Validate
    </button>
    
  </div>
  </>);
}