import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddressModel } from '../../repository/models/AddressModel';

interface IUser {
  information: IUserInformation;
  address: IUserAddress;
  contact: IUserContact;
}

export interface IUserInformation {
  name: string;
  cpf: string;
  birthDate: Date | null;
  gender: string;
  priority: false;
}

export interface IUserAddress {
  zipCode: string;
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  complement?: string;
}

export interface IUserContact {
  email: string;
  cell: string;
  tell: string;
}

const initialState: IUser = {
  information: { name: '', cpf: '', birthDate: null, gender: '', priority: false },
  address: {
    zipCode: '',
    street: '',
    number: 0,
    neighborhood: '',
    city: '',
    complement: '',
  },
  contact: {
    email: '',
    cell: '',
    tell: '',
  },
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<IUser>) => {
      state = action.payload;
    },
    updateInformation: (state, action: PayloadAction<IUserInformation>) => {
      state.information = action.payload;
    },
    updateAddress: (state, action: PayloadAction<IUserAddress>) => {
      state.address = action.payload;
    },
    updateContact: (state, action: PayloadAction<IUserContact>) => {
      state.contact = action.payload;
    },
    updateAddressSearch: (state, action: PayloadAction<AddressModel>) => {
      state.address.city = action.payload.city;
      state.address.neighborhood = action.payload.neighborhood;
      state.address.street = action.payload.street;
      state.address.zipCode = action.payload.zipCode;
    },
  },
});

export const { update, updateInformation, updateAddress, updateContact, updateAddressSearch } = userSlice.actions;

export default userSlice.reducer;
