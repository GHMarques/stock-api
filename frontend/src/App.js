import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Main } from './components/navigations/Main/Main';
import EditProduct from './components/pages/EditProduct/EditProduct';
import ListProduct from './components/pages/ListProduct/ListProduct';
import { NotFound } from './components/pages/NotFound/NotFound';
import { NavigationBar } from './components/navigations/NavigationBar/NavigationBar';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <NavigationBar />
          <Main>
            <Switch>
              <Route exact path="/" component={ListProduct} />
              <Route exact path="/listProduct" component={ListProduct} />
              <Route exact path="/editProduct" component={EditProduct} />
              <Route exact path="/editProduct/:id" component={EditProduct} />
              <Route exact component={NotFound} />
            </Switch>
          </Main>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
