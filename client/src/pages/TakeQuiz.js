import { useEffect,useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import API from '../api';

export default function TakeQuiz(){
  const { id } = useParams(), nav = useNavigate();
  const [quiz,setQuiz]=useState(null);
  const [idx,setIdx]=useState(0);
  const [answers,setAnswers] = useState([]);
  useEffect(()=>{
    API.get(`/quizzes/${id}`).then(r=>setQuiz(r.data));
  },[id]);

  if(!quiz) return <p>Loading…</p>;
  const q = quiz.questions[idx];

  const select = (i)=>{
    setAnswers(a=>[...a, { question:q._id, selectedIndex:i } ]);
    if(idx+1<quiz.questions.length) setIdx(idx+1);
    else nav('/result',{ state:{ quizId:id, answers } });
  };

  return <>
    <h1>{quiz.quiz.title}</h1>
    <h2>Q{idx+1}: {q.text}</h2>
    {q.choices.map((c,i)=>
      <button key={i} onClick={()=>select(i)}>{c}</button>
    )}
  </>;
}
