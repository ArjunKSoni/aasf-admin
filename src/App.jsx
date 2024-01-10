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
function App() {
  return (
    <Provider store={Store} >
      <Router>
        <Routes>
          <Route exact path='/home/:uid' element={<Home />} />
          <Route exact path='/' element={<SignIn />} />
        </Routes>
      </Router>
    </Provider>
  );
}
export default App;