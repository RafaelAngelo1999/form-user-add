import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  },
});

export const { update, updateInformation, updateAddress, updateContact } = userSlice.actions;

export default userSlice.reducer;
