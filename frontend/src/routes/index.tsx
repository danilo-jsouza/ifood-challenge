import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SearchForm from '../components/SearchForm';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SearchForm} />
  </Switch>
);

export default Routes;
