import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { productService } from '../../../services/Product/ProductService';
import Spinner from '../../ui/Spinner/Spinner';

export default class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeUnitValue = this.onChangeUnitValue.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      quantity: '',
      unitValue: '',
      loading: false,
      showSuccessAlert: false,
      showErrorAlert: false,
      editing: false,
      errorMessage: ''
    }

  }
  async componentDidMount() {
    if (this.props.match.params.id) {
      this.setState({ editing: true });
      await productService.getById(this.props.match.params.id).then(response => {
        if (response && response.status === 200) {
          this.setState({
            id: response.data.productId,
            name: response.data.name,
            quantity: response.data.quantity,
            unitValue: response.data.unitValue
          });
        } else {
          this.showErrorAlert(response.data);
        }
        this.setState({ loading: false });
      }).catch(error => {
        this.setState({ loading: false });
      });
    }
  }

  setInitialState() {
    this.setState({
      name: '',
      quantity: '',
      unitValue: '',
      loading: false,
      showSuccessAlert: false,
      showErrorAlert: false,
      editing: false,
      errorMessage: ''
    });
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeQuantity(e) {
    this.setState({
      quantity: e.target.value
    })
  }
  onChangeUnitValue(e) {
    this.setState({
      unitValue: e.target.value
    })
  }

  showSuccessAlert() {
    this.setState({ showSuccessAlert: true }, () => {
      window.setTimeout(() => {
        this.setState({ showSuccessAlert: false });
        this.props.history.push("/listProduct");
      }, 2000)
    });
  }

  showErrorAlert(...message) {
    this.setState({ showErrorAlert: true, errorMessage: message }, () => {
      window.setTimeout(() => {
        this.setState({ showErrorAlert: false });
        this.props.history.push("/editProduct");
        this.setInitialState();
      }, 2000)
    });
  }

  async onSubmit(e) {
    this.setState({ loading: true });
    e.preventDefault();
    if (this.state.editing) {
      const product = {
        productId: this.props.match.params.id,
        name: this.state.name,
        quantity: this.state.quantity,
        unitValue: this.state.unitValue
      };
      await productService.update(product).then(response => {
        if (response && response.status === 200) {
          this.showSuccessAlert();
        } else {
          this.showErrorAlert();
        }
        this.setState({ loading: false });
      }).catch(error => {
        this.setState({ loading: false });
      });
    } else {
      const product = {
        name: this.state.name,
        quantity: this.state.quantity,
        unitValue: this.state.unitValue
      };
      await productService.create(product).then(response => {
        if (response && response.status === 201) {
          this.showSuccessAlert();
        } else {
          this.showErrorAlert(response.data);
        }
        this.setState({ loading: false });
      }).catch(error => {
        this.setState({ loading: false });
      });
    }
  }
  render() {
    let textButton = "Create";
    let textTitle = "Add New Product";
    if (this.state.editing) {
      textButton = "Edit";
      textTitle = "Edit Product";
    }
    let spinner = '';
    if (this.state.loading) {
      spinner = <Spinner />;
    } else {
      spinner =
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="formGroupName">
            <Form.Label>Name</Form.Label>
            <Form.Control required value={this.state.name} type="text" placeholder="Enter name" onChange={this.onChangeName} />
          </Form.Group>
          <Form.Group controlId="formGroupQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control required value={this.state.quantity} type="number" placeholder="Enter quantity" onChange={this.onChangeQuantity} />
          </Form.Group>
          <Form.Group controlId="formGroupUnitValue">
            <Form.Label>Unit Value</Form.Label>
            <Form.Control required value={this.state.unitValue} type="number" placeholder="Enter unit value" onChange={this.onChangeUnitValue} />
          </Form.Group>
          <Button variant="primary" type="submit">
            {textButton}
          </Button>
        </Form>;

    }
    return (
      <div style={{ marginTop: 10 }}>
        <h3 align="center">{textTitle}</h3>
        {spinner}
        <Alert variant="success" show={this.state.showSuccessAlert} >
          Success! Action completed.
        </Alert>
        <Alert variant="danger" show={this.state.showErrorAlert} >
          Error! Try again please. {this.state.errorMessage}
        </Alert>
      </div>
    )
  }
}
