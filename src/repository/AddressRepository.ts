import axiosInstance from '../shared/utils/AxiosInstance';

const URL_SEARCH_CEP = 'https://brasilapi.com.br/api/cep/v1/';

class AddressRepository {
  getAddress = async (cep: string) => {
    return (await axiosInstance.get(`${URL_SEARCH_CEP}${cep}`)).data;
  };
}

export default new AddressRepository();
