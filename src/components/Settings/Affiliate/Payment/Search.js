import React from 'react';
import { 
  Button, 
  FormControlLabel, 
  Grid, 
  TextField, 
  Checkbox,
  IconButton
} from '@material-ui/core';
import { connect } from 'react-redux';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

class PaymentSearch extends React.Component {

  /**
   * @constructor
   */
  constructor(){
    super();

    // Default state
    this.state = {
      affiliateName: '',
      pendingChecked: false,
    }

  }
  
  /**
   * @override
   */
  render() {    
    return <React.Fragment>

      {/* Container */}
      <Grid container spacing={3} alignItems="center">
        <Grid item md={12} xs={12} className="text-right">   
          <IconButton color="primary" aria-label="Reset" onClick={(e) => {
            this.setState({
              affiliateName: '',
              pendingChecked: false,
            }, () => this.props.onReset(e));
          }}>
            <RotateLeftIcon />
          </IconButton>
        </Grid>
      </Grid>

      {/* Container */}
      <Grid container spacing={3} alignItems="center">
        {/* Title */}
        <Grid item md={2} xs={12} className="align-items-center">
          <h5>Name of affiliate</h5>
        </Grid>
        {/* End Title */}

        {/* TextField */}
        <Grid item md={6} sm={8} xs={12}>
          <TextField fullWidth
            label="Please enter search by name."
            size="small"
            variant="outlined"
            name="name"
            value={this.state.affiliateName}
            onChange={e => this.setState({ affiliateName: e.target.value })}
            m={20}
          />
        </Grid>
        {/* End TextField */}

      </Grid>
      {/* End Container */}

      <Grid container spacing={3} alignItems="center">
        {/* Title */}
        <Grid item md={2} xs={12} className="align-items-center">
          <h5>List pending requests</h5>
        </Grid>
        {/* End Title */}

        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={this.state.pendingChecked}
              onChange={e => {
                this.setState({ pendingChecked: e.target.checked })
              }}
            />
          }
        />

      </Grid>

      <Grid container spacing={3} alignItems="center">

        {/* Button */}
        <Grid item md={1} xs={12}>
          <Button fullWidth size="small" variant="contained" color="primary" onClick={() => this.props.searchWord("firstChildsState", this.state)}>
            Search
          </Button>
        </Grid>
      </Grid>

      {/* End Container */}
    </React.Fragment>;
  }
};

// Redux state to props
const mapStateToProps = state => {
  return {
    apolloClient: state.apolloClient
  }
}

export default connect(mapStateToProps, null)(PaymentSearch);
