import React from 'react';
import PageTitle from "../../../../core/common/Partials/PageTitle";
import {
  Grid,
  Button,
  CircularProgress,
  ListItemSecondaryAction,
  TextField,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Card,
  CardHeader
} from "@material-ui/core";
import { withSnackbar } from "notistack";
import validate from "validate.js";
import { connect } from "react-redux";

// CKeditor
import CKEditor from 'ckeditor4-react';

// Icon
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import SaveIcon from "@material-ui/icons/Save";
import DeleteForeverIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';

// Queries
import { GET_SELLER_POLICY, SAVE_SELLER_POLICY, GET_CATEGORIES, UPLOAD_IMAGE_EXHIBITION } from '../../../Queries/Queries';

// Find
import FindProduct from './FindProduct';
import FindSeller from './FindSeller';

class Seller extends React.Component {

  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // state
    this.state = {
      id: this.props.match.params.id,
      seller: {
        sellerId: "",
        category1: "",
        category2: "",
        category3: "",
        contract: "",
        productFileGuideline: "",
        premiumService: [],
      },
      isProcessing: false,
      errors: null,
      categories: {
        first: [],
        second: [],
        third: []
      },
      isOpenModal: false,
      isOpenSellerModal: false,
      imageUrl: null,
    };

    // Events
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.hasError = this.hasError.bind(this);

    this._isMounted = false;
  }

  /**
   * @override
   */
  async componentDidMount() {
    this._isMounted = true;

    if (this.state.id) {
      await this.props.apolloClient.httpClient.query({
        query: GET_SELLER_POLICY,
        variables: { sellerId: this.state.id }
      }).then((result) => {
        this.setState({
          seller: result.data.getSellerPolicyBySellerId
        });
      }).catch((error) => {
        this.props.enqueueSnackbar('Sorry, there is an error occurred while fetching data.', {variant: 'error'});
      });
    }

    await this.props.apolloClient.httpClient.query({
      query: GET_CATEGORIES,
    }).then((result) => {
      this.setState({
        categories: result.data.categories
      });
    }).catch((error) => {
      this.props.enqueueSnackbar('Sorry, there is an error occurred while fetching data.', {variant: 'error'});
    });
  }


  /**
   * @summary Check errors
   * @param {String} field 
   */
  hasError(field) {
    return this.state.errors && this.state.errors[field] ? true : false;
  }

  /**
   * @summary Validate operator
   * @param {Object} operator 
   */
  onValidateSubmit(operator) {
    const schema = {
      "operatorId": {
        presence: {
          allowEmpty: false,
          message: '^Operator id field is required.'
        },
        length: {
          minimum: 8,
          maximum: 20,
          message: '^ID input (enter within 8-20 characters including English and numbers)'
        },
      },
      "password": {
        presence: {
          allowEmpty: false,
          message: '^Password field is required.'
        },
        length: {
          minimum: 8,
          maximum: 20,
          message: '^Password length should be 8-20 characters.'
        },
        format: {
          pattern: "^[ A-Za-z0-9_]*$",
          message: '^Should be alphanumeric only.'
        }
      },
      "repeatPassword": {
        presence: {
          allowEmpty: false,
          message: '^Password field is required.'
        },
        length: {
          minimum: 8,
          maximum: 20,
          message: '^Password length should be 8-20 characters.'
        },
        format: {
          pattern: "^[ A-Za-z0-9_]*$",
          message: '^Should be alphanumeric only.'
        }
      },
      "firstName": {
        presence: {
          allowEmpty: false,
          message: '^Firstname field is required.'
        },
        length: {
          maximum: 64,
          message: '^Maximum length should be 64.'
        }
      },
      "firstName": {
        presence: {
          allowEmpty: false,
          message: '^First name field is required.'
        },
        length: {
          maximum: 64,
          message: '^Maximum length should be 64.'
        }
      },
      "realName": {
        presence: {
          allowEmpty: false,
          message: '^Real name field is required.'
        },
        length: {
          maximum: 64,
          message: '^Maximum length should be 64.'
        }
      },
      "email": {
        presence: {
          allowEmpty: false,
          message: '^Email field is required.'
        }
      },
      "contact": {
        presence: {
          allowEmpty: false,
          message: '^Contact field is required.'
        }
      },
      "remark": {
        presence: {
          allowEmpty: false,
          message: '^Remark field is required.'
        }
      }
    }

    // Validate
    const errors = validate(operator, schema);

    this.setState({
      errors: errors
    });

    return errors;
  }

  /**
   * @summary Open box
   * @param {event}
   */
  onOpenModal(e) {
    this.setState({
      isOpenModal: true,
    });
  }

  /**
   * @summary Close box
   * @param {event}
   */
  onCloseModal() {
    this.setState({ isOpenModal: false });
  }

  /**
   * @summary Open box
   * @param {event}
   */
  onOpenSellerModal(e) {
    this.setState({
      isOpenSellerModal: true,
    });
  }

  /**
   * @summary Close box
   * @param {event}
   */
  onCloseSellerModal() {
    this.setState({ isOpenSellerModal: false });
  }

  /**
   * @summary Product list form submit
   */
  onSubmitProductForm(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    let productIds = formData.getAll("productId");
    let seller = this.state.seller;

    (productIds || []).map((id) => {
      if (!seller.premiumService.find((f) => f.id === id))
      seller.premiumService.push({
        field1: id,
        field2: formData.get(id),
      });
    });

    this.setState({
      seller: seller,
      isOpenModal: false,
    });
  }

  /**
   * @summary Seller list form submit
   */
  onSubmitSellerForm(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    let sellerId = formData.get("sellerId");

    this.setState({
      seller: Object.assign(this.state.seller, {sellerId: sellerId}),
      isOpenSellerModal: false,
    });
  }

  /**
   * @summary Upload images icon
   * @param {!Array<Object>} images
   */
  async onContractUpload(event) {
    this.props.enqueueSnackbar('The uploading process is being started ...', {variant: 'info'});

    let image = event.target.files[0];

    this.props.apolloClient.uploadClient.mutate({ 
      mutation: UPLOAD_IMAGE_EXHIBITION, 
      variables: { image }
    }).then((result) => {
      if(result.data.uploadImageExhibition.statusCode === 200) {
        this.setState({
          seller: Object.assign(this.state.seller, {contract: result.data.uploadImageExhibition.data})
        });
        this.props.enqueueSnackbar('The uploading process has been completed successfully.', {variant: 'success'});
      }
    }).catch((error) => {
      this.props.enqueueSnackbar('Sorry, there is an error occurred while uploading image.', {variant: 'error'});
    });
  }

  /**
   * @summary Handle submit form
   * @param {MouseEvent} event
   */
  async onHandleSubmit(event) {
    event.preventDefault();

    if (this.state.isProcessing) return;

    // Form data
    const formData = new FormData(event.target);

    let premiumServices = this.state.seller.premiumService
      ? this.state.seller.premiumService
      : [];

    // Form data to object
    let sellerPolicy = {
      sellerId: "111",
      category1: formData.get("firstCategory"),
      category2: formData.get("secondCategory"),
      category3: formData.get("thirdCategory"),
      percentage: formData.get("percentage"),
      contract: formData.get("contract"),
      productFileGuideline: formData.get("productFileGuideline"),
      premiumService: premiumServices.reduce((accumulator, premium) => {
        accumulator.push({
          field1: premium.field1,
          field2: premium.field2,
        });
        return accumulator;
      }, []),
    };

    // // Validate
    // if (this.onValidateSubmit(operator)) return;

    this.setState({
      isProcessing: true
    });

    let id = this.state.id;

    // Mutate
    await this.props.apolloClient.httpClient.mutate({
      mutation: SAVE_SELLER_POLICY, 
      variables: { 
        sellerPolicy: sellerPolicy
      }
    }).then((result) => {
      if (result.data.saveSellerPolicy.statusCode === 200) {
        const message = id ? 
          "Seller has been successfully updated." : 
          "Seller has been successfully created."
        ;

        this.props.enqueueSnackbar(message, {variant: 'success'});
      }
    }).catch((error) => {
      this.props.enqueueSnackbar('Sorry, there is an error occurred while saving data.', {variant: 'error'});
    });

    this._isMounted && this.setState({
      isProcessing: false,
    });
  }

  /**
   * @summary On change category
   * @param {MouseEvent} event 
   */
  onChangeCategory(event, level) {
    event.preventDefault();
    const val = event.target.value;

    if (level === 1) {
      this.setState({
        seller: Object.assign(this.state.seller, {category1: val})
      });
    } 
    else if (level === 2) {
      this.setState({
        seller: Object.assign(this.state.seller, {category2: val})
      });
    }
    else if (level === 3) {
      this.setState({
        seller: Object.assign(this.state.seller, {category3: val})
      });
    }
  }

  /**
   * @summary Change description
   * @param {MouseEvent} editor 
   */
  onChangeDescription(event, editor) {
    this.setState({
      seller: Object.assign(this.state.seller, {productFileGuideline: editor.getData()})
    });
  };

  /**
   * @summary Remove seller
   * @param {MouseEvent} editor 
   */
  onRemoveSeller(event, editor) {
    this.setState({
      seller: Object.assign(this.state.seller, {sellerId: ""})
    });
  };

  /**
   * @summary Remove seller contract
   * @param {MouseEvent} editor 
   */
  onClickDeleteContract(event, editor) {
    this.setState({
      seller: Object.assign(this.state.seller, {contract: ""})
    });
  };

  /**
   * @override
   */
  render() {

    let isShowForm = !this.state.id || this.state.seller;

    if(!isShowForm)
      return '';

    let data = this.state.seller ? this.state.seller : {};

    return <React.Fragment>
    {/* Title section */}
    <Grid container>
      <Grid item xs={6}>
        {/* Title */}
        <PageTitle
          menuName="Seller form"
          title="Seller form"
          icon={<LocalAtmIcon />}
        />
      </Grid>
      <Grid item xs={6} className="text-right">
        <Button
          form="my-form"
          variant="contained"
          size="small"
          color="primary"
          type="submit"
          disabled={this.state.isProcessing}
          startIcon={
            this.state.isProcessing ? (
              <CircularProgress color="white" size="1rem" />
            ) : (
              <SaveIcon fontSize="small" className="mr-10" />
            )
          }
        >
          SAVE
        </Button>
      </Grid>
    </Grid>

    <div className="card mt-20">
      <form id="my-form" onSubmit={this.onHandleSubmit}>
        {/* Settlement policy management */}
        <Grid container 
          spacing={3} 
          className="align-items-center"
        >
          <Grid item md={2} xs={12}>
            <h5>Settlement policy management</h5>
          </Grid>

          <Grid item md={10} xs={12}>
            <Grid container 
              spacing={4} 
              className="align-items-center"
              >
              {/* First category */}
              <Grid item md={3} xs={12}>
                <FormControl 
                  size="small" 
                  fullWidth 
                  variant="outlined"
                >
                  <InputLabel id="demo-simple-select-outlined-label">First category</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="First category"
                    name="firstCategory"
                    onChange={(e) => this.onChangeCategory(e, 1)}
                    value={data.category1}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {
                      (this.state.categories.first || []).map((category, index) => 
                        <MenuItem key={index} value={category.id}>{category.name}</MenuItem>
                      ) 
                    }
                  </Select>
                </FormControl>
              </Grid>

              {/* Second category */}
              <Grid item md={3} xs={12}>
                <FormControl fullWidth
                  size="small" 
                  variant="outlined"
                >
                  <InputLabel id="demo-simple-select-outlined-label">Second category</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Second category"
                    name="secondCategory"
                    inputProps={{
                      className: "white-label"
                    }}
                    onChange={(e) => this.onChangeCategory(e, 2)}
                    value={data.category2}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {
                      (this.state.categories.second.filter(f => f.parentId === data.category1) || []).map((category, index) => 
                        <MenuItem key={index} value={category.id}>{category.name}</MenuItem>
                      ) 
                    }
                  </Select>
                </FormControl>
              </Grid>
              
              {/* Third category */}
              <Grid item md={3} xs={12}>
                <FormControl fullWidth
                  size="small"  
                  variant="outlined"
                >
                  <InputLabel id="demo-simple-select-outlined-label">Third category</InputLabel>
                  <input name="thirdCategory" type="hidden" value={data.category3} />
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Third category"
                    error={this.hasError('info.thirdCategory')}
                    helperText={
                      this.hasError('info.thirdCategory') ? this.state.errors['info.thirdCategory'][0] : null
                    }
                    onChange={(e) => this.onChangeCategory(e, 3)}
                    value={data.category3}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {
                      (this.state.categories.third.filter(f => f.parentId === data.category2) || []).map((category, index) => 
                        <MenuItem key={index} value={category.id}>{category.name}</MenuItem>
                      )
                    }
                  </Select>
                </FormControl>
              </Grid>

              {/* Input */}
              <Grid item md={10} xs={12}>
                <TextField fullWidth
                  id="percentage-basic" 
                  label="Please enter sales % settle"
                  size="small"
                  variant="outlined"
                  name="percentage"
                  type="text"
                  defaultValue={data.percentage}
                  error={this.hasError('percentage')}
                  helperText={
                    this.hasError('percentage') ? this.state.errors['percentage'][0] : null
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Password */}
        <Grid container 
          spacing={3} 
          className="align-items-center"
        >
          <Grid item md={2} xs={12}>
            <h5>Select Seller</h5>
          </Grid>

          {/* Input */}
          <Grid item md={10} xs={12}>
            <List>
              <ListItem>
                <ListItemText onClick={this.onOpenSellerModal.bind(this)} primary={data.sellerId ? data.sellerId : "SELECT SELLER"} />
                <FormHelperText error={this.hasError("sellerId")}>
                  {this.hasError("sellerId")
                    ? this.state.errors["sellerId"][0]
                    : null}
                </FormHelperText>
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="comments">
                    <DeleteIcon
                      onClick={this.onRemoveSeller.bind(this)}
                    />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
        </Grid>

        {/* Password */}
        <Grid container 
          spacing={3} 
          className="align-items-center"
        >
          <Grid item md={2} xs={12}>
            <h5>Contract</h5>
          </Grid>

          {/* Input */}
          <Grid item md={10} xs={12}>
            <input type="hidden" name="contract" value={data.contract}></input>
            {data.contract ?
              <Card>
                <CardHeader
                  action={
                    <IconButton color="primary" onClick={(e) => this.onClickDeleteContract(e)}>
                      <DeleteForeverIcon />
                    </IconButton>
                  }
                  title={<img src={process.env.REACT_APP_CDN_URL + "exhibition/" + data.contract } width="100%" />}
                />
              </Card>
            :
              <div>
                <input type="file" onChange={this.onContractUpload.bind(this)} accept="image/*" id="icon-button-file" className="displayNone"/>
                <label htmlFor="icon-button-file">
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <FileCopyIcon />
                  </IconButton>
                </label>
              </div>
            }
          </Grid>
        </Grid>

        {/* Repeat password */}
        <Grid container 
          spacing={3} 
          className="align-items-center mt-20"
        >
          <Grid item md={2} xs={12}>
            <h5>Seller product registration guideline</h5>
          </Grid>

          {/* Input */}
          <Grid item md={10} xs={12}>
            <FormControl fullWidth>
              <CKEditor
                type="classic"
                name="productFileGuideline"
                data={data.productFileGuideline}
                onChange={ ( { event, editor } ) => this.onChangeDescription(event, editor) }
              />
              <textarea name="productFileGuideline" value={data.productFileGuideline} style={{display: "none"}} />
            </FormControl>
          </Grid>
        </Grid>

        {/* Premium service */}
        <Grid container 
          spacing={3} 
          className="align-items-center"
        >
          <Grid item md={2} xs={12}>
            <h5>Premium service</h5>
          </Grid>

          {/* Input */}
          <Grid item md={10} xs={12}>
            <List>
              {(data.premiumService || []).map((premium, index) => {
                return (
                  <ListItem>
                    <ListItemText id={index} primary={premium.field2} />
                    <FormHelperText error={this.hasError("productIds")}>
                      {this.hasError("productIds")
                        ? this.state.errors["productIds"][0]
                        : null}
                    </FormHelperText>
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="comments">
                        <DeleteIcon
                          onClick={(e) => this.onRemoveProduct(e, index)}
                        />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        </Grid>

        {/* Add buttoncontainer */}
        <Grid container className="text-right mt-20">
          {/* Add */}
          <Grid item md={12} xs={12}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={this.onOpenModal.bind(this)}
            >
              ADD
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Find seller Popup */}
      <Dialog
        open={this.state.isOpenSellerModal}
        aria-labelledby="responsive-dialog-title"
        maxWidth="lg"
      >
        {/* Title */}
        <DialogTitle id="responsive-dialog-title">
          <h2>Find seller</h2>
        </DialogTitle>
        <Divider />

        {/* Content */}
        <DialogContent>
          <form
            id="seller-form"
            onSubmit={this.onSubmitSellerForm.bind(this)}
          >
            <FindSeller />
          </form>
        </DialogContent>

        <Divider />
        {/* Actions */}
        <DialogActions>
          <Button
            autoFocus
            onClick={this.onCloseSellerModal.bind(this)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            autoFocus
            form="seller-form"
            type="submit"
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Find product Popup */}
      <Dialog
        open={this.state.isOpenModal}
        aria-labelledby="responsive-dialog-title"
        maxWidth="lg"
      >
        {/* Title */}
        <DialogTitle id="responsive-dialog-title">
          <h2>Find product</h2>
        </DialogTitle>
        <Divider />

        {/* Content */}
        <DialogContent>
          <form
            id="product-form"
            onSubmit={this.onSubmitProductForm.bind(this)}
          >
            <FindProduct />
          </form>
        </DialogContent>

        <Divider />
        {/* Actions */}
        <DialogActions>
          <Button
            autoFocus
            onClick={this.onCloseModal.bind(this)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            autoFocus
            form="product-form"
            type="submit"
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  </React.Fragment>
  }
}

// Redux state to props
const mapStateToProps = (state) => {
  return {
    apolloClient: state.apolloClient,
  };
};

export default withSnackbar(connect(mapStateToProps, null)(Seller));
