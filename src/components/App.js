import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import Spinner from './Spinner';
import './App.css';

const HomePage = lazy(() => import('./HomePage'));
const TagPage = lazy(() => import('./TagPage'));
const NotFoundPage = lazy(() => import('./NotFoundPage'));

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route exact path='/(home)?' component={() => <HomePage />} />
            <Route
              path='/home/:tagId+'
              component={props => <TagPage {...props} />}
            />
            <Route component={() => <NotFoundPage />} />
            <Redirect to='/' />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
