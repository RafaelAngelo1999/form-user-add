import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputMask from 'react-input-mask';
import * as yup from 'yup';
import { Box, Grid, TextField } from '@mui/material';
import { IUserAddress, updateAddress, updateAddressSearch } from '../../../store/slices/userSlice';
import { addActiveStepUser } from '../../../store/slices/activeStepsSlice';
import ButtonFormUser from './ButtonFormUser';
import { removeDot } from '../../../shared/utils/string';
import AddressService from '../../../services/AddressService';
import { State } from '../../../store';

const UserAddress: React.FC = () => {
  const dispatch = useDispatch();
  const userAddress = useSelector((state: State) => state.user.address);

  const cpfFilled = useSelector((state: State) => state.user.address).zipCode?.length === 8;

  const schema = yup
    .object({
      zipCode: yup.string().required('CEP is required').min(8, 'CEP Invalid'),
      city: yup.string().required('City is required'),
      neighborhood: yup.string().required('Neighborhood is required'),
      street: yup.string().required('Street is required'),
      number: yup
        .number()
        .required('Number is required')
        .positive('Number must be a positive number')
        .integer('Number must be an integer'),
    })
    .required();

  const { handleSubmit, control, reset } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const resetAddress = () => {
      if (userAddress) {
        reset(userAddress);
      }
    };
    resetAddress();
  }, [userAddress]);

  const createUser = (data: IUserAddress) => {
    dispatch(updateAddress(data));
  };

  const handlerBlurAddressSearch = async (cep: string) => {
    const cepNoMask = removeDot(cep);
    if (cepNoMask.length === 8) {
      const result = await AddressService.getAddress(cepNoMask);
      dispatch(updateAddressSearch(result));
      // console.log(result);
    }
  };

  // #region elements page
  const inputZipCode = (
    <Controller
      name="zipCode"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Box mb={4} height={80}>
          <InputMask
            mask="99999-999"
            value={value || ''}
            onChange={onChange}
            onBlur={() => handlerBlurAddressSearch(value)}
          >
            <TextField
              id="zipCode"
              margin="normal"
              fullWidth
              label="ZipCode"
              variant="outlined"
              required
              error={!!error}
              helperText={error ? error.message : null}
            />
          </InputMask>
        </Box>
      )}
    />
  );

  const inputCity = (
    <Controller
      name="city"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Box mb={4} height={80}>
          <TextField
            id="city"
            margin="normal"
            fullWidth
            disabled={!cpfFilled}
            label="City"
            value={value || ''}
            required
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        </Box>
      )}
    />
  );

  const inputNeighborhood = (
    <Controller
      name="neighborhood"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Box mb={4} height={80}>
          <TextField
            id="neighborhood"
            margin="normal"
            fullWidth
            disabled={!cpfFilled}
            label="Neighborhood"
            required
            value={value || ''}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        </Box>
      )}
    />
  );

  const inputStreet = (
    <Controller
      name="street"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Box mb={4} height={80}>
          <TextField
            id="street"
            fullWidth
            disabled={!cpfFilled}
            label="Street"
            value={value || ''}
            required
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        </Box>
      )}
    />
  );

  const inputNumber = (
    <Controller
      name="number"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Box mb={4} height={80}>
          <TextField
            id="number"
            fullWidth
            disabled={!cpfFilled}
            label="Number"
            required
            type="number"
            value={value || ''}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        </Box>
      )}
    />
  );

  const inputComplement = (
    <Controller
      name="complement"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Box mb={4} height={80}>
          <TextField
            id="complement"
            fullWidth
            label="Complement"
            disabled={!cpfFilled}
            value={value || ''}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        </Box>
      )}
    />
  );
  // #endregion elements page

  const elementsPage = {
    inputs: {
      zipCode: inputZipCode,
      city: inputCity,
      neighborhood: inputNeighborhood,
      street: inputStreet,
      number: inputNumber,
      complement: inputComplement,
    },
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit((data) => {
          createUser(data as IUserAddress);
          dispatch(addActiveStepUser());
        })}
        noValidate
        sx={{ mt: 1 }}
      >
        <Grid container spacing={4} rowSpacing={1}>
          <Grid item xs={4} height={80}>
            {elementsPage.inputs.zipCode}
          </Grid>
          <Grid item xs={3} height={80}>
            {elementsPage.inputs.city}
          </Grid>
          <Grid item xs={5} height={80}>
            {elementsPage.inputs.neighborhood}
          </Grid>
        </Grid>

        <Grid container spacing={4} rowSpacing={1} mt={3}>
          <Grid item xs={5} height={80}>
            {elementsPage.inputs.street}
          </Grid>
          <Grid item xs={2} height={80}>
            {elementsPage.inputs.number}
          </Grid>
          <Grid item xs={5} height={80}>
            {elementsPage.inputs.complement}
          </Grid>
        </Grid>

        <ButtonFormUser />
      </Box>
    </>
  );
};

export default UserAddress;
