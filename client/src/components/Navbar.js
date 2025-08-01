import { Link,useNavigate } from 'react-router-dom';
export default function Navbar(){
  const nav = useNavigate();
  const logout=()=>{ localStorage.clear(); nav('/'); };
  const u = JSON.parse(localStorage.getItem('user')||'null');
  return <nav>
    <Link to="/">Home</Link> | <Link to="/quizzes">Browse</Link> |
    {u
      ? <> <Link to="/create">Create Quiz</Link> | <button onClick={logout}>Logout</button></>
      : <> <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link></>
    }
  </nav>;
}
