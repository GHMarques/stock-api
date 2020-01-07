import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { productService } from '../../../services/Product/ProductService';
import ListRow from '../../ui/ListRow/ListRow';


class ListProduct extends Component {
  state = {
    products: [],
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    this.getProducts().then(response => this.setState({ products: response.data }));
  }
  async getProducts() {
    return await productService.getAll();

  }

  listRow() {
    return this.state.products.map(function (object, i) {
      return <ListRow obj={object} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <h3 align="center">Product List</h3>
        <Table responsive hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Unit Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.listRow()}
          </tbody>
        </Table>
      </div>
    );
  }

}
export default ListProduct;