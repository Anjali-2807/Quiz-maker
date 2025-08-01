import { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function CreateQuiz(){
  const [title, setTitle] = useState('');
  const [qs, setQs] = useState([]);
  const [current, setCurrent] = useState({ text:'', choices:['',''], correctIndex:0 });
  const nav = useNavigate();

  const addQuestion = ()=>{
    setQs(q=>[...q,current]);
    setCurrent({ text:'', choices:['',''], correctIndex:0 });
  };

  const submit = async ()=>{
    const { data:quiz } = await API.post('/quizzes',{ title });
    await API.post(`/quizzes/${quiz._id}/questions`,{ questions: qs });
    nav('/quizzes');
  };

  return <>
    <h1>Create Quiz</h1>
    <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Quiz Title"/>
    <hr/>
    <h2>Question #{qs.length+1}</h2>
    <textarea value={current.text} onChange={e=>setCurrent(c=>({...c,text:e.target.value}))}/>
    {current.choices.map((c,i)=>(
      <div key={i}>
        <input
          placeholder={`Choice ${i+1}`}
          value={c}
          onChange={e=>{
            const arr=[...current.choices];
            arr[i]=e.target.value;
            setCurrent(cu=>({...cu,choices:arr}));
          }}
        />
        <label>
          <input 
            type="radio"
            checked={current.correctIndex===i}
            onChange={()=>setCurrent(cu=>({...cu,correctIndex:i}))}
          /> Correct
        </label>
      </div>
    ))}
    <button onClick={()=>setCurrent(c=>({...c,choices:[...c.choices,'']}))}>+ Choice</button>
    <button onClick={addQuestion}>Add Q</button>
    <hr/>
    <button onClick={submit} disabled={!title||!qs.length}>Publish Quiz</button>
  </>;
}
