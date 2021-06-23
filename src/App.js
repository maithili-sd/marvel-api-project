import logo from './img/marvel.png';
import './App.css';
import Home from './components/Home';
import Character from './components/Character';
import CharacterList from './components/CharacterList';
import Comic from './components/Comic';
import ComicList from './components/ComicList';
import Series from './components/Series';
import SeriesList from './components/SeriesList';
import SearchResults from './components/SearchResults';
import PageError from './components/PageError';
import ItemError from './components/ItemError';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to the React.js Marvel API Example</h1>
          <Link className='itemlink' to='/'>
            Home
					</Link>
          <Link className='itemlink' to='/characters/page/0'>
            Characters
          </Link>
          <Link className='itemlink' to='/comics/page/0'>
            Comics
					</Link>
          <Link className='itemlink' to='/series/page/0'>
            Series
					</Link>
        </header>
        <br />
        <br />
        <div className='App-body'>
          <Route exact path='/' component={Home} />
          <Route exact path='/characters/page/:page' component={CharacterList} />
          <Route exact path='/characters/:id' component={Character} />
          <Route exact path='/comics/page/:page' component={ComicList} />
          <Route exact path='/comics/:id' component={Comic} />
          <Route exact path='/series/page/:page' component={SeriesList} />
          <Route exact path='/series/:id' component={Series} />
          <Route exact path='/search/:endpoint/:searchterm' render={(props) => <SearchResults {...props} />} />
          <Route exact path='/pageerror/:endpoint/:page' render={(props) => <PageError {...props} />} />
          <Route exact path='/error/:endpoint/:id' render={(props) => <ItemError {...props} />} />
        </div>
      </div>
    </Router>
  );
}

export default App;
