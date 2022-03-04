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
    <div className='max-w-max m-2'>
      <div className='flex flex-wrap w-full border-4 border-black h-full'>
        <div className='flex'>
          <div className='h-full flex overflow-auto flex-col justify-between w-64 w-max-64 p-4'>
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

            <input
              type='button'
              onClick={imgUploadHandler}
              disabled={btnDisabled}
              style={{ width: '100%', marginBottom: '9%' }}
              value='Save Photo'
            />
            <button
              type='submit'
              className='transition-all duration-300 lg:w-1/2 sm:w-4/6 sm:h-12 sm:items-center flex flex-row align-middle justify-center cursor-pointer bg-transparent hover:bg-gray-900 font-semibold hover:text-white lg:py-2 lg:px-4 border border-black hover:border-transparent rounded'
            >
              <IconContext.Provider value={{ style: { fontSize: '1.7rem' } }}>
                <MdShoppingCart />
              </IconContext.Provider>

              <h3
                variant='h3'
                className='font-roboto tracking-tight leading-6 p-1 sm:text-sm'
              >
                ADD TO CART
              </h3>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
