import React from 'react';
import { withRouter } from 'react-router-dom';

const Drawer = ({ history }) => {
  // const classes = useStyles()
  // const theme = useTheme()
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <div>
      <div>
        <h1>hoopr.io</h1>
      </div>
      <div>
        <nav>
          <div>
            <h1 variant='body2'>Users</h1>
          </div>
          <div>
            <h1 variant='body2'>Orders</h1>
          </div>
          <div>
            <h1 variant='body2'>Messages</h1>
          </div>
          <div>
            <h1 variant='body2'>Settings</h1>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default withRouter(Drawer);
