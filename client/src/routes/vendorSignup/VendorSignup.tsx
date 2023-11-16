import { PiWarningLight } from 'react-icons/pi';
import Input from '../../components/utils/Input';
import useVendorSignup from './hooks/useVendorSignup';
import Spinner from '../../components/utils/Spinner';
import IndeterminateProgressBar from '../../components/utils/IndeterminateProgressBar';
import { Link } from 'react-router-dom';

// TODO: add show password icon to password input

const VendorSignup = () => {
  const {
    validationState: {
      haveErrors,
      isFullnameInputError,
      fullnameInputErrorMsg,
      isEmailInputError,
      emailInputErrorMsg,
      isPasswordInputError,
      passwordInputErrorMsg,
      isFormSubmitBtnDisabled,
      allFormControlsDisabled,
      isRegisterationStatusLoading,
      isVendorConflictError,
    },
    formState: { fullname, email, password, enterTestValues },
    isDefaultValuesBtnVisible,
    handleFormValues,
    handleFormSubmit,
    handleOnBlurEventOnFormInputFields,
  } = useVendorSignup();

  return (
    <div className='min-h-screen flex-center bg-gray-100 py-12'>
      <div className='min-w-[450px] max-w-[500px] bg-white shadow-md rounded-xl overflow-hidden'>
        <IndeterminateProgressBar isVisible={isRegisterationStatusLoading} />
        <div className='px-8 py-12'>
          <form onSubmit={handleFormSubmit}>
            <h2 className='text-lg font-semibold'>Vendor Registeration</h2>
            <ul>
              <FormErrorMsg isVisible={haveErrors}>
                <p>
                  Please review your entries. Some information is missing or incorrect.
                </p>
              </FormErrorMsg>
              <FormErrorMsg isVisible={isVendorConflictError}>
                <p>Vendor with email {email} already exists.</p>
              </FormErrorMsg>
            </ul>
            {/* ----------- form controls */}
            <div className='flex flex-col gap-y-8 py-10'>
              <Input
                disabled={allFormControlsDisabled}
                onChange={handleFormValues}
                value={fullname}
                type='text'
                htmlFor='fullname'
                spellCheck={false}
                name='fullname'
                labelText='Full Name'
                isInputError={isFullnameInputError}
                errorMsg={fullnameInputErrorMsg}
                placeholder='Enter full name ✏️'
                onBlur={handleOnBlurEventOnFormInputFields}
              />
              <Input
                disabled={allFormControlsDisabled}
                onChange={handleFormValues}
                value={email}
                type='email'
                labelSufixText=' (unique to each vendor)'
                labelText='Email'
                name='email'
                htmlFor='email'
                isInputError={isEmailInputError || isVendorConflictError}
                errorMsg={emailInputErrorMsg}
                placeholder='example@gmail.com 📧'
                onBlur={handleOnBlurEventOnFormInputFields}
              />
              <div>
                <Input
                  type='password'
                  disabled={allFormControlsDisabled}
                  onChange={handleFormValues}
                  value={password}
                  labelText='Password'
                  htmlFor='password'
                  name='password'
                  isInputError={isPasswordInputError}
                  errorMsg={passwordInputErrorMsg}
                  placeholder='your secret password 🫣'
                  onBlur={handleOnBlurEventOnFormInputFields}
                />
                <ul className='flex flex-wrap text-gray-400 text-xs pt-4'>
                  <div className='flex-auto [&>li]:pb-2'>
                    <li>8 character minimum</li>
                    <li>1 uppercase character</li>
                    <li>1 special character</li>
                  </div>
                  <div className='flex-auto [&>li]:pb-2'>
                    <li>1 lowercase letter</li>
                    <li>1 number</li>
                    <li>no spaces</li>
                  </div>
                </ul>
              </div>
            </div>
            {/* ----------------- form actions */}
            <div>
              <button
                disabled={isFormSubmitBtnDisabled}
                type='submit'
                className='flex items-center justify-center gap-x-3 disabled:opacity-60 disabled:cursor-not-allowed w-full font-semibold text-white bg-blue-500 hover:bg-blue-600 uppercase px-4 py-3  rounded-lg'
              >
                Register {isRegisterationStatusLoading && <Spinner />}
              </button>
              {/* ------------ for testing purposes only  */}
              {isDefaultValuesBtnVisible && (
                <button
                  type='button'
                  className='btn  border-2 mt-5'
                  onClick={enterTestValues}
                >
                  Default Values
                </button>
              )}
            </div>
          </form>
          <p className='text-center text-sm mt-4'>
            Already have an account?<span> </span>
            <Link to='/vendor/signin'>Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorSignup;

// -------- FormErrorMsg

type FormErrorMsgProps = {
  children: JSX.Element;
  isVisible: boolean;
};

const FormErrorMsg = ({ isVisible, children }: FormErrorMsgProps) => {
  if (!isVisible) return <></>;
  return (
    <div className='flex items-center gap-x-2 mt-6 text-red-500 bg-red-200 text-xs px-4 py-2 rounded-lg'>
      <p className='text-lg'>
        <PiWarningLight />
      </p>
      {children}
    </div>
  );
};
