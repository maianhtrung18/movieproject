import logo from './logo.svg';
import './App.css';
import './css/style.css'
import { BrowserRouter, Route, Router, Switch, useParams } from 'react-router-dom';
import FormTemplate from './templates/FormTemplate';
import Registers from './pages/Registers';
import Login from './pages/Login';
import Header from './components/Header';
import Carousel from './pages/Home/Carousel';
import MovieList from './pages/Home/MovieList';
import ThongTinRap from './pages/Home/ThongTinRap';
import { createBrowserHistory } from "history";
import Footer from './components/Footer';
import ChiTietPhim from './pages/MovieDetail/ChiTietPhim';
export const history = createBrowserHistory();



function App() {
  return (
    <Router history={history}>
      <Switch>
        <FormTemplate path='/registers' component={Registers} />
        <FormTemplate path='/login' component={Login} />
        <Route exact path='/home'>
          <Header />
          <Carousel/>
          <MovieList />
          <ThongTinRap />
          <Footer/>
        </Route>
          <Route exact path='/chitietphim/:maphim'>
            <Header/>
            <ChiTietPhim/>
          </Route>
        

      </Switch>
    </Router>
  );
}

export default App;
