import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Alert from 'react-bootstrap/Alert';
import { productService } from '../../../services/Product/ProductService';

export default class ListRow extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.state = {
      showSuccessAlert: false,
      showErrorAlert: false,
      errorMessage: ''
    }
  }

  showSuccessAlert() {
    this.setState({ showSuccessAlert: true }, () => {
      window.setTimeout(() => {
        this.setState({ showSuccessAlert: false });
        window.location.reload();
      }, 2000)
    });
  }

  showErrorAlert(...message) {
    this.setState({ showErrorAlert: true, errorMessage: message }, () => {
      window.setTimeout(() => {
        this.setState({ showErrorAlert: false });
      }, 2000)
    });
  }

  async delete(e) {
    if (this.props.obj.productId) {
      await productService.delete(this.props.obj.productId).then(response => {
        if (response && response.status === 200) {
          this.showSuccessAlert();
        } else {
          this.showErrorAlert(response.data);
        }
      }).catch(error => {
        this.showErrorAlert(error);
      });
    }
  }

  render() {
    return (
      <tr>
        <td>
          {this.props.obj.name}
        </td>
        <td>
          {this.props.obj.quantity}
        </td>
        <td>
          $ {this.props.obj.unitValue}
        </td>
        <td>
          <Button title="Edit Product" href={"/editProduct/" + this.props.obj.productId} variant="info" style={{ marginRight: 5 + 'px' }}>
            <FaEdit />
          </Button>
          <Button title="Delete Product" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.delete(e) }} variant="danger">
            <FaTrash />
          </Button>
        </td>
        <td>
          <Alert variant="success" show={this.state.showSuccessAlert} >
            Success! Product deleted.
          </Alert>
          <Alert variant="danger" show={this.state.showErrorAlert} >
            Error! Try again please. {this.state.errorMessage}
          </Alert>
        </td>
      </tr >
    );
  }
}