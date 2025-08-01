import { Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateQuiz from './pages/CreateQuiz';
import QuizList from './pages/QuizList';
import TakeQuiz from './pages/TakeQuiz';
import QuizResult from './pages/QuizResult';
import Login from './pages/Login';
import Signup from './pages/Signup';

export default function App(){
  return <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/create" element={<CreateQuiz/>}/>
      <Route path="/quizzes" element={<QuizList/>}/>
      <Route path="/take/:id" element={<TakeQuiz/>}/>
      <Route path="/result" element={<QuizResult/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
    </Routes>
  </>;
}
