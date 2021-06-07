import './App.css';
import StudentList from './ListStudent';
import Student_Add from './AddStudent';
import TestList from './TestListStudent';
// @ts-ignore
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Switch>
      <Route path="/" component={TestList} exact></Route> 
        <Route path="/list" component={StudentList} exact></Route>
        <Route path="/add" component={Student_Add} exact></Route> 

      </Switch>
    </Router>
  );
}

export default App;
