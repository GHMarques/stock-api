//import axios from 'axios';
import axiosConfig from '../axios-stock';
class ProductService {

  async getAll() {
    return await axiosConfig.get('/Product')
      .then(response => {
        return response;
      })
      .catch(error => {
        return error.response;
      });
  }

  async getById(id) {
    return await axiosConfig.get('/Product/' + id)
      .then(response => {
        return response;
      })
      .catch(error => {
        return error.response;
      });
  }

  async create(product) {
    return await axiosConfig.post('/Product/', product, {
      headers: {
        common: {
          'Content-Type': 'application/json',
        }
      }
    })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error.response;
      });
  }

  async update(updateProduct) {
    return await axiosConfig.put('/Product/', updateProduct, {
      headers: {
        common: {
          'Content-Type': 'application/json',
        }
      }
    })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error.response;
      });
  }

  async delete(id) {
    return await axiosConfig.delete('/Product/' + id, {
      headers: {
        common: {
          'Content-Type': 'application/json',
        }
      }
    })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error.response;
      });
  }
}

export const productService = new ProductService();