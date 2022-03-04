import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../../actions/userActions';
import { mediaToAWS } from '../../actions/awsAction';
import { IconContext } from 'react-icons';
import { MdShoppingCart } from 'react-icons/md';

// import avatar from '../../assets/user-avatar.png';
import { withRouter } from 'react-router-dom';
import { DropzoneDialog } from 'material-ui-dropzone';

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

  const imgUploadHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (profilePhotoFile) {
      formData.append('media', profilePhotoFile);
      const { data } = await mediaToAWS(formData);
      setProfilePhoto(data.mediaUrl);

      dispatch(
        updateUserProfile({
          id: user._id,
          username,
          email,
          password,
          profilePhoto: data.mediaUrl,
        })
      );
    }
  };

  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    console.log(open)
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user) {
        dispatch(getUserDetails('profile'));
      }

      if (successDetails) {
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
    <div className='box-border w-full h-full xl:w-4/5 xl:h-1/2 flex flex-wrap shadow-lg mb-3 mr-3 ml-3 xl:m-2 xl:mt-0 p-0.5 border border-black border-opacity-50 rounded'>
      <div className='w-full h-full flex flex-wrap'>
        <div className='flex'>
          <div className='h-full flex overflow-auto flex-col justify-between w-max-full p-4'>
            <img
              src={profilePhoto}
              alt='avatar'
              style={{
                width: '100%',
                borderRadius: '5px',
                marginBottom: '2px',
              }}
            />

            <input
              type='button'
              onClick={() => setOpen(true)}
              style={{ width: '100%', marginBottom: '9%' }}
              value='Change Photo'
            />

            <DropzoneDialog
              acceptedFiles={['image/*']}
              cancelButtonText={'cancel'}
              submitButtonText={'submit'}
              maxFileSize={5000000}
              open={open}
              onClose={() => setOpen(false)}
              onSave={(files) => {
                const file = files[0];
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                  setBtnDisabled(false);
                  setProfilePhotoFile(file);
                  setProfilePhoto(reader.result);
                };

                setOpen(false);
              }}
              showPreviews={true}
              showFileNamesInPreview={true}
            />
            {open || profilePhotoFile !== '' ? <input
              type='button'
              onClick={imgUploadHandler}
              disabled={btnDisabled}
              style={{ width: '100%', marginBottom: '9%' }}
              value='Save Photo'
            /> : null}
            {/* <input
              type='button'
              onClick={imgUploadHandler}
              disabled={btnDisabled}
              style={{ width: '100%', marginBottom: '9%' }}
              value='Save Photo'
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
