import React from "react";
import AppNavbar from "./components/AppNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ShoppingList from "./components/ShoppingLIst";
import { Provider } from "react-redux";
import store from "./store";
import ItemModal from "./components/itemModal";
import { Container } from "reactstrap";
import { loadUser } from "./actions/authActions";
class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <ItemModal />
            <ShoppingList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
