import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../../actions/userActions';
import { mediaToAWS } from '../../actions/awsAction';
// import avatar from '../../assets/user-avatar.png';
// import { withRouter } from 'react-router-dom';
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
    <div className='box-border w-full h-fit xl:w-1/4 xl:h-full flex flex-wrap shadow-lg m-3 xl:m-2 xl:mt-0 p-0.5 border border-black border-opacity-50 rounded'>
      <div className='w-full h-full flex flex-wrap'>
        <div className='box-content flex justify-center overflow-auto flex-col w-max-full p-0.5'>
          <img
            src={profilePhoto}
            alt='avatar'
            style={{
              width: '100%',
              height: '100%',
              height: 'auto',
              borderRadius: '5px',
              marginBottom: '2px',
            }}

          />
        </div>
        <div className='w-full flex justify-center p-2 sm:items-center'>
          <button
            type='submit'
            onClick={() => setOpen(true)}
            className='w-2/3 xl:w-1/4 transition-all duration-300 flex flex-row align-middle items-center justify-center cursor-pointer bg-transparent hover:bg-gray-900 font-semibold hover:text-white border border-black hover:border-transparent rounded'
          >

            <h3
              variant='h3'
              className='font-roboto tracking-tight uppercase leading-6 p-1 text-sm'
            >
              change photo
            </h3>
          </button>
        </div>
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
        <div id="userInfo" className="w-full flex flex-wrap p-1">
          <div className="flex w-full">
            <h1
              variant='h1'
              className='w-1/4 font-rubik  lowercase tracking-tight font-medium leading-2 w-1/2'
            >
              username:
            </h1>

            <h3
              variant='h3'
              className='w-3/4 pl-1 font-roboto  tracking-tight leading-2 w-1/2'
            >
              {username}
            </h3>
          </div>
          <div className="flex w-full">
            <h1
              variant='h1'
              className='w-1/4 font-rubik  lowercase tracking-tight font-medium leading-2 w-1/2'
            >
              email:
            </h1>

            <h3
              variant='h3'
              className='w-3/4 pl-1 font-roboto  tracking-tight leading-2 w-1/2'
            >
              {email}
            </h3>
          </div>

        </div>
        {/* <input
              type='button'
              onClick={imgUploadHandler}
              disabled={btnDisabled}
              style={{ width: '100%', marginBottom: '9%' }}
              value='Save Photo'
            /> */}
      </div>

    </div >
  );
};

export default ProfileCard;
