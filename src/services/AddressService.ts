import AddressRepository from '../repository/AddressRepository';
import AddressMapper from '../repository/mappers/AddressMapper';

class AddressService {
  async getAddress(cep: string) {
    return AddressMapper.mapperDtoToModel(
      await AddressRepository.getAddress(cep)
        .then((resposta) => resposta)
        .catch((erro) => erro),
    );
  }
}

export default new AddressService();
