import { AddressDto } from '../interfaces/AddressDto';
import { AddressModel } from '../models/AddressModel';

class AddressMapper {
  mapperDtoToModel(addressDto: AddressDto): AddressModel {
    const addressModel: AddressModel = {
      zipCode: addressDto?.cep,
      street: addressDto?.street,
      number: 0,
      neighborhood: addressDto?.neighborhood,
      city: addressDto?.city,
      complement: '',
    };

    return addressModel;
  }
}

export default new AddressMapper();
