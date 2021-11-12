import React, { useRef } from 'react';

import { Route, Switch, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux'
import Runs from './components/Runs';
import Orders from './components/Orders';
import Users from './components/Users';
import Drawer from './components/Drawer';
import Modal from './components/Modal';
import RunScreen from './components/RunScreen';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

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
    <div
      id='mainScreen'
      className='container mx-auto border-black border-4 h-screen bg-gray-200 bg-opacity-25 flex flex-col justify-between'
    >
      <NavBar />
      <div className='h-5/6'>
        <Switch>
          <Route path='/runs' component={Runs} />
          <Route path='/orders' component={Orders} />
          <Route path='/users' exact component={Users} />
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
