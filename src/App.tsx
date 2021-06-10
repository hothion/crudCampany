import './App.css';
import Student_Add from './AddStudent';
import TestList from './TestListStudent';
import EditStudent from './EditStudent';
import Student_Detail from './DetailStudent';
// @ts-ignore
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Switch>
      <Route path="/" component={TestList} exact></Route> 
        <Route path="/add" component={Student_Add} exact></Route> 
        <Route path="/edit/:id" component={EditStudent} exact></Route> 
        <Route path="/detailstudent/:id" component={Student_Detail} exact></Route> 
v
      </Switch>
    </Router>
  );
}
export default App;
