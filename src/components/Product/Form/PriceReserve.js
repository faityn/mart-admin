import React from 'react';
import { 
  Grid, 
  CardContent,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  TextField
} from '@material-ui/core';

/**
 * @summary PriceReserve
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Product/Form
 */
class PriceReserve extends React.Component {

  /**
   * @override
   */
  render() {
    if (!this.props.isShowForm)
      return '';

    let data = this.props.product && this.props.product.info ? this.props.product.info : {};

    return (
      <CardContent className="productPrice">
        {/* Container */}
        <Grid container spacing={3} className="align-items-center">
          {/* Title */}
          <Grid item md={2} xs={12}>
            <h5>Price *</h5>
          </Grid>

          {/* Price */}
          <Grid item md={3} xs={12}>
            <TextField fullWidth
              id="name-basic" 
              label="Price"
              size="small"
              variant="outlined"
              InputLabelProps={{
                className: "white-label" 
              }}
              name="price"
              defaultValue={data.price}
              error={this.props.hasError('info.price')}
              helperText={
                this.props.hasError('info.price') ? this.props.errors['info.price'][0] : 'Format: 1234.56'
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    $
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        {/* Container */}
        <Grid container spacing={3} className="align-items-center">
          <Grid item md={2} xs={12}>
            <h5>Inventory *</h5>
          </Grid>

          {/* Inventory */}
          <Grid item md={3} xs={12}>
            <TextField fullWidth
              id="name-basic" 
              label="Inventory"
              size="small"
              variant="outlined"
              InputLabelProps={{
                className: "white-label" 
              }}
              name="inventory"
              defaultValue={data.inventory}
              error={this.props.hasError('info.inventory')}
              helperText={
                this.props.hasError('info.inventory') ? this.props.errors['info.inventory'][0] : null
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    #
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        {/* Container */}
        <Grid container spacing={3} className="align-items-center">
          {/* Title */}
          <Grid item md={2} xs={12}>
            <h5>Weight *</h5>
          </Grid>

          {/* Weight */}
          <Grid item md={3} xs={12}>
            <TextField fullWidth
              id="name-basic" 
              label="Weight"
              size="small"
              variant="outlined"
              InputLabelProps={{
                className: "white-label" 
              }}
              name="weight"
              defaultValue={data.weight}
              error={this.props.hasError('info.weight')}
              helperText={
                this.props.hasError('info.weight') ? this.props.errors['info.weight'][0] : null
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    G
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    );
  }
};

export default PriceReserve; 
