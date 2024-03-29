import React, { useRef } from "react";

import { Route, Switch, useLocation } from "react-router-dom";
// import { useSelector } from 'react-redux'
import Runs from "./components/runs/Runs";
import Orders from "./components/Orders";
import Users from "./components/Users";
import Drawer from "./components/Drawer";
import Modal from "./components/Modal";
import RunScreen from "./components/runs/RunScreen";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Account from "./components/account/Account";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

// import { ModalState } from './reducers/modalReducer'

const App = () => {
  const location = useLocation();
  let prevLocation = useRef(location);

  React.useEffect(() => {
    console.log(location);
    if (!(location.state && location.state.modal)) {
      prevLocation.current = location;
    }
  }, [location]);

  const isModal = location.state && location.state.modal;
  return (
    <div className='h-screen flex flex-col justify-between'>
      <NavBar />
      <div className='h-124 xl:h-160 xl:my-3'>
        <Switch>
          <Route path='/runs' component={Runs} />
          <Route path='/orders' component={Orders} />
          <Route path='/profile' exact component={Account} />
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
          {/*Temporarily Have Login Component here  */}
        </Switch>
        {isModal ? (
          <Route exact path='/admin/runs/:id'>
            <Modal isModal={isModal} Component={RunScreen} />
          </Route>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default App;
