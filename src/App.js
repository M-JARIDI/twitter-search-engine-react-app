import React from "react";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import SearchAppBar from "./components/SearchAppBar";
import TweetDetails from "./pages/TweetDetails";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Provider store={store}>
      <Container>
        <Router>
          <SearchAppBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/search" component={SearchResults} />
            <Route exact path="/tweet_details" component={TweetDetails} />
          </Switch>
        </Router>
        <Footer />
      </Container>
    </Provider>
  );
}
