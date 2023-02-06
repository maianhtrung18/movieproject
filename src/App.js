import logo from './logo.svg';
import './App.css';
import './css/style.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FormTemplate from './templates/FormTemplate';
import Registers from './pages/Registers';
import Login from './pages/Login';
import Header from './components/Header';
import Carousel from './components/Carousel';
import MovieList from './components/MovieList';
import ThongTinRap from './components/ThongTinRap';




function App() {
  return (
    <BrowserRouter>
      <Switch>
       <FormTemplate path='/registers' component={Registers}/>
       <FormTemplate path='/login' component={Login}/>
       <Route exact path='/'>

        <Header/>
        <Carousel/>
        <MovieList/>
        <ThongTinRap/>
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
