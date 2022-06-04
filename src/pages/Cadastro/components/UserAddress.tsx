import React, { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputMask from 'react-input-mask';
import * as yup from 'yup';
import { Box, Checkbox, FormControlLabel, Grid, MenuItem, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { IUserAddress, updateAddress } from '../../../store/slices/userSlice';
import { GENDERS } from '../../../shared/constants/Gender';
import { addActiveStepUser } from '../../../store/slices/activeStepsSlice';
import ButtonFormUser from './ButtonFormUser';

const UserAddress: React.FC = () => {
  const dispatch = useDispatch();

  const schema = yup
    .object({
      name: yup.string().required('Name is required').min(5, 'Name must contain at least 5 characters'),
      gender: yup.string().required('Gender is required'),
      birthDate: yup.date().typeError('Invalid date format. (dd/mm/yyyy)').required('BirthDate is required'),
    })
    .required();

  const { handleSubmit, control } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const createUser = (data: IUserAddress) => {
    dispatch(updateAddress(data));
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
          <Grid item xs={6} height={80}>
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Box mb={4} height={80}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    variant="outlined"
                    value={value || ''}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                </Box>
              )}
            />
          </Grid>
          <Grid item xs={6} height={80}>
            <Controller
              name="cpf"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Box mb={4} height={80}>
                  <InputMask mask="999.999.999-99" value={value} onChange={onChange}>
                    <TextField id="cpf" label="CPF" variant="outlined" required fullWidth />
                  </InputMask>
                </Box>
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4} rowSpacing={1}>
          <Grid item xs={5} height={80}>
            <Controller
              name="gender"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Box height={100}>
                  <TextField
                    id="gender"
                    select
                    fullWidth
                    label="Gender"
                    value={value || ''}
                    defaultValue=""
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  >
                    {GENDERS.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              )}
            />
          </Grid>
          <Grid item xs={4} height={80}>
            <Controller
              name="birthDate"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Birth Date"
                    openTo="year"
                    views={['year', 'month', 'day']}
                    inputFormat="dd/MM/yyyy"
                    value={value || null}
                    onChange={onChange}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth error={!!error} helperText={error ? error.message : null} />
                    )}
                  />
                </LocalizationProvider>
              )}
            />
          </Grid>
          <Grid item xs={3} height={80}>
            <Controller
              name="priority"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormControlLabel
                  control={<Checkbox checked={value || false} onChange={onChange} name="priority" />}
                  label="Priority"
                />
              )}
            />
          </Grid>
        </Grid>

        <ButtonFormUser />
      </Box>
    </>
  );
};

export default UserAddress;
