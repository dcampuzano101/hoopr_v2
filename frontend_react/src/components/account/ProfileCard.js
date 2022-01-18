import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../../actions/userActions';
// import { mediaToAWS } from '../../actions/awsAction';

// import avatar from '../../assets/user-avatar.png';
import { withRouter } from 'react-router-dom';
// import { DropzoneDialog } from 'material-ui-dropzone';

// import { Button, TextField } from '@material-ui/core';

const ProfileCard = ({ location, history, match }) => {
  const userDetails = useSelector((state) => state.userDetails);
  const { error, user, success: successDetails } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePhotoFile, setProfilePhotoFile] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('' || null);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [updateProfileBtnDisabled, setUpdateProfileBtnDisabled] =
    useState(true);
  const [alert, setAlert] = useState(null);
  const [detailsError, setDetailsError] = useState(null);
  const [profileSuccess, setProfileSuccess] = useState(null);
  const dispatch = useDispatch();

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, username, email, password }));
    }
  };

  // const imgUploadHandler = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   if (profilePhotoFile) {
  //     formData.append('media', profilePhotoFile);
  //     const { data } = await mediaToAWS(formData);
  //     setProfilePhoto(data.mediaUrl);

  //     dispatch(
  //       updateUserProfile({
  //         id: user._id,
  //         username,
  //         email,
  //         password,
  //         profilePhoto: data.mediaUrl,
  //       })
  //     );
  //   }
  // };

  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user) {
        dispatch(getUserDetails('profile'));
      }

      if (successDetails) {
        debugger;
        setUsername(user.username);
        setEmail(user.email);
        setProfilePhoto(user.profilePhoto || null);
      }

      if (error) {
        setDetailsError(error);
      }

      if (success) {
        setProfileSuccess('Successfully updated profile!');
      }
    }
  }, [
    dispatch,
    history,
    location,
    userInfo,
    user,
    success,
    error,
    successDetails,
  ]);

  return (
    <div className='w-1/3'>
      <div>
        <img
          src={profilePhoto}
          alt='avatar'
          style={{
            width: '100%',
            borderRadius: '5px',
            marginBottom: '2px',
          }}
        />
      </div>
    </div>
  );
};

export default ProfileCard;
