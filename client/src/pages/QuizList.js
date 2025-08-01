import { useEffect,useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

export default function QuizList(){
  const [list,setList]=useState([]);
  useEffect(()=> API.get('/quizzes').then(r=>setList(r.data)),[]);
  return <>
    <h1>Available Quizzes</h1>
    <ul>
      {list.map(q=><li key={q._id}>
        <Link to={`/take/${q._id}`}>{q.title}</Link>
      </li>)}
    </ul>
  </>;
}
