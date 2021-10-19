import React from 'react';
import { 
  Button,
  Grid,
  TextField,
  IconButton
} from '@material-ui/core';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

class AffiliateSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      affiliateName: '',
      dateStart: '',
      dateEnd: '',
    }
  }
  
  render() {    
    return <>
      <Grid container spacing={3} alignItems="center">
        <Grid item md={12} xs={12} className="text-right">   
          <IconButton color="primary" aria-label="Reset" onClick={e => {
            this.setState({
              affiliateName: '',
              dateStart: '',
              dateEnd: '',
            }, () => this.props.onReset(e));
          }}>
            <RotateLeftIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Grid container spacing={3} alignItems="center">
        <Grid item md={2} xs={12} className="align-items-center">
          <h5>Name of affiliate</h5>
        </Grid>

        <Grid item md={6} sm={8} xs={12}>
          <TextField fullWidth
            label="Please enter name."
            size="small"
            variant="outlined"
            name="name"
            value={this.state.affiliateName}
            onChange={e => this.setState({ affiliateName: e.target.value })}
            m={20}
          />
        </Grid>

      </Grid>

      <Grid container spacing={3} alignItems="center">
        <Grid item md={2} xs={12} className="align-items-center">
          <h5>Year/month/day</h5>
        </Grid>

        <TextField
          type="date"
          size="small"
          variant="outlined"
          name="startDate"
          value={this.state.dateStart}
          onChange={e => this.setState({ dateStart: e.target.value })}
          style={{ width: "187px", marginLeft: "28px" }}
        />
        <TextField
          type="date"
          size="small"
          variant="outlined"
          name="endDate"
          value={this.state.dateEnd}
          onChange={e => this.setState({ dateEnd: e.target.value })}
          style={{ paddingLeft: "45px", width: "187px" }}
        />

      </Grid>

      <Grid container spacing={3} alignItems="center">

        <Grid item md={1} xs={12}>
          <Button
            fullWidth
            size="small"
            variant="contained"
            color="primary"
            onClick={() => this.props.searchWord("firstChildsState", this.state)}
          >
            Search
          </Button>
        </Grid>
      </Grid>

    </>;
  }
};

export default AffiliateSearch;
