import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './redux/Store';
import SignIn from './comp/Signin';
import Home from './comp/Home';
import Quiz from './comp/Quiz';
import Cookies from 'js-cookie';
function App() {
  const Uid=Cookies.get('uid');
  return (
    <Provider store={Store} >
      <Router>
        <Routes>
          {Uid && <Route exact path='/home/:uid' element={<Home />} />}
          <Route exact path='/' element={<SignIn />} />
          {Uid && <Route exact path='/quiz/:uid' element={<Quiz />} />}
        </Routes>
      </Router>
    </Provider>
  );
}
export default App;