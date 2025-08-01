import { useLocation } from 'react-router-dom';
import { useEffect,useState } from 'react';
import API from '../api';

export default function QuizResult(){
  const { state } = useLocation();
  const [res,setRes] = useState(null);
  useEffect(()=>{
    const { quizId, answers } = state;
    API.post(`/attempts/${quizId}`, { answers }).then(r=>setRes(r.data));
  },[state]);

  if(!res) return <p>Computing…</p>;
  return <>
    <h1>Result: {res.score}/{res.total}</h1>
    <ul>
      {res.detailed.map((d,i)=><li key={i}>
        Q: {d.question} – You picked {d.selectedIndex} – {d.isCorrect?'✅':'❌'}
      </li>)}
    </ul>
  </>;
}
