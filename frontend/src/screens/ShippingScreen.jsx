import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../store/slices/cartSlice';

import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import useInput from '../hooks/useInput';
import Input from '../components/Input';
import { useEffect } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import Meta from '../components/Meta';

export default function ShippingScreen() {
  const { cartItems, shippingAddress } = useSelector((state) => state.cart);

  const {
    val: addresslVal,
    inputValIsInvalid: addressValIsInvalid,
    changeFunc: handleAddressChange,
    blurFunc: handleAddressBlur,
    err: addressError,
  } = useInput(shippingAddress.address, (val) => val.trim().length > 5);

  const {
    val: citylVal,
    inputValIsInvalid: cityValIsInvalid,
    changeFunc: handleCityChange,
    blurFunc: handleCityBlur,
    err: cityError,
  } = useInput(shippingAddress.city, (val) => val.trim().length > 4);

  const {
    val: postalCodelVal,
    inputValIsInvalid: postalCodeValIsInvalid,
    changeFunc: handlePostalCodeChange,
    blurFunc: handlePostalCodeBlur,
    err: postalCodeError,
  } = useInput(shippingAddress.postalCode, (val) => val.trim().length === 5);

  const {
    val: countryVal,
    inputValIsInvalid: countryValIsInvalid,
    changeFunc: handleCountryChange,
    blurFunc: handleCountryBlur,
    err: countryError,
  } = useInput(shippingAddress.country, (val) => val.trim().length > 3);

  let formIsInvalid = true;
  if (
    !addressValIsInvalid &&
    !cityValIsInvalid &&
    !postalCodeValIsInvalid &&
    !countryValIsInvalid
  ) {
    formIsInvalid = false;
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const itemsLength = cartItems.length;
  useEffect(() => {
    if (itemsLength === 0) {
      navigate('/cart');
    }
  }, [navigate, itemsLength]);

  function submitHandler(e) {
    e.preventDefault();

    const shippingData = {
      address: addresslVal,
      city: citylVal,
      postalCode: postalCodelVal,
      country: countryVal,
    };

    dispatch(saveShippingAddress(shippingData));
    navigate('/payment');
  }

  return (
    <FormContainer>
      <Meta title='Shipping Page' />
      <CheckoutSteps step1 step2 />

      <h1>Shipping</h1>

      <Form onSubmit={submitHandler}>
        <Input
          controlId='address'
          label='Address'
          type='text'
          name='address'
          placeholder='Enter your address'
          err={addressError}
          errText='Address must be above 5 characters!'
          value={addresslVal}
          onChange={handleAddressChange}
          onBlur={handleAddressBlur}
        />

        <Input
          controlId='city'
          label='City'
          type='text'
          name='city'
          placeholder='Enter your city'
          err={cityError}
          errText='City must be above 4 characters!'
          value={citylVal}
          onChange={handleCityChange}
          onBlur={handleCityBlur}
        />

        <Input
          controlId='postal-code'
          label='Postal Code'
          type='text'
          name='postal-code'
          placeholder='Enter your postal code'
          err={postalCodeError}
          errText='Postal Code must be 5 numbers!'
          value={postalCodelVal}
          onChange={handlePostalCodeChange}
          onBlur={handlePostalCodeBlur}
        />

        <Input
          controlId='country'
          label='Country'
          type='text'
          name='country'
          placeholder='Enter your country'
          err={countryError}
          errText='Country must be above 3 characters!'
          value={countryVal}
          onChange={handleCountryChange}
          onBlur={handleCountryBlur}
        />

        <Button type='submit' className='mt-1' disabled={formIsInvalid}>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}
