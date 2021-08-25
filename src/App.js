import React from "react";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
// import Temperature from "./pages/Temperature";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import SearchAppBar from "./components/SearchAppBar";
// import Footer from "./components/Footer";

export default function App() {
  return (
    <Provider store={store}>
      <Container>
        <SearchAppBar />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/search" component={SearchResults} />
          </Switch>
        </Router>
        {/* <Footer /> */}
      </Container>
    </Provider>
  );
}
