import React from 'react';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputMask from 'react-input-mask';
import * as yup from 'yup';
import { Box, Grid, TextField } from '@mui/material';
import { IUserContact, updateContact } from '../../../store/slices/userSlice';
import { addActiveStepUser } from '../../../store/slices/activeStepsSlice';
import ButtonFormUser from './ButtonFormUser';
import { isValidCellOrTell, getOnlyNumberString } from '../../../shared/utils/string';

const UserContact: React.FC = () => {
  const dispatch = useDispatch();

  const schema = yup
    .object({
      email: yup.string().required('Email is required').email('Invalid email format'),
      cell: yup
        .string()
        .required('Cell is required')
        .test('isCellValid', 'Cell invalid', function isCellValid(value) {
          return isValidCellOrTell(getOnlyNumberString(value));
        }),
      tell: yup.string().test('isTellValid', 'Tell invalid', function isTellValid(value) {
        return isValidCellOrTell(getOnlyNumberString(value));
      }),
    })
    .required();

  const { handleSubmit, control } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const updateUserContact = (data: IUserContact) => {
    dispatch(updateContact(data));
  };

  // #region elements page
  const inputEmail = (
    <Controller
      name="email"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Box mb={4} height={80}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            autoFocus
            variant="outlined"
            value={value || ''}
            autoComplete="off"
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        </Box>
      )}
    />
  );

  const inputCell = (
    <Controller
      name="cell"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Box mb={4} height={80}>
          <InputMask mask="(99) 99999-9999" value={value || ''} onChange={onChange}>
            <TextField
              margin="normal"
              fullWidth
              id="cell"
              autoComplete="off"
              label="Cell"
              variant="outlined"
              error={!!error}
              helperText={error ? error.message : null}
            />
          </InputMask>
        </Box>
      )}
    />
  );

  const inputTell = (
    <Controller
      name="tell"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Box mb={4} height={80}>
          <InputMask mask="(99) 9999-9999" value={value || ''} onChange={onChange}>
            <TextField
              margin="normal"
              fullWidth
              id="tell"
              label="Tell"
              variant="outlined"
              autoComplete="off"
              error={!!error}
              helperText={error ? error.message : null}
            />
          </InputMask>
        </Box>
      )}
    />
  );

  // #endregion elements page

  const elementsPage = {
    inputs: {
      email: inputEmail,
      cell: inputCell,
      tell: inputTell,
    },
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit((data) => {
          updateUserContact(data as IUserContact);
          dispatch(addActiveStepUser());
        })}
        noValidate
        sx={{ mt: 1 }}
      >
        <Grid container spacing={4} rowSpacing={1}>
          <Grid item xs={12} height={80}>
            {elementsPage.inputs.email}
          </Grid>
        </Grid>

        <Grid container spacing={4} rowSpacing={1} mt={3}>
          <Grid item xs={6} height={80}>
            {elementsPage.inputs.cell}
          </Grid>
          <Grid item xs={6} height={80}>
            {elementsPage.inputs.tell}
          </Grid>
        </Grid>

        <ButtonFormUser />
      </Box>
    </>
  );
};

export default UserContact;
