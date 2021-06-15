import './App.css';
import Student_Add from './AddStudent';
import TestList from './ListStudent';
import EditStudent from './EditStudent';
import Detail from './Detail';
// @ts-ignore
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Switch>
      <Route path="/" component={TestList} exact></Route> 
        <Route path="/add" component={Student_Add} exact></Route> 
        <Route path="/edit/:id" component={EditStudent} exact></Route> 
        <Route path="/detail/:id" component={Detail} exact></Route> 
      </Switch>
    </Router>
  );
}
export default App;
