import axios from 'axios';

export class CustomerService {
  getCustomersSmall() {
    const t = axios.get('/json/customers-small.json').then(res => res.data.data);
    console.log('t', t);
    return t;
  }

  getCustomersMedium() {
    return axios.get('/json/customers-medium.json').then(res => res.data.data);
  }

  getCustomersLarge() {
    return axios.get('/json/customers-large.json').then(res => res.data.data);
  }

  getCustomersXLarge() {
    return axios.get('/json/customers-xlarge.json').then(res => res.data.data);
  }
}
