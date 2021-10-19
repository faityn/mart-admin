import React from 'react';
import {
  LinearProgress,
  Grid,
  FormControl
}
from '@material-ui/core';
import CKEditor from 'ckeditor4-react';

class Form extends React.Component {

  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    
    let data = this.props.data ? this.props.data : {};

    // Default state
    this.state = {
      text: data ? data.text : ""
    }

  }

  /**
   * @summary Change Text
   * @param {MouseEvent} editor 
   */
  onChangeText(event, editor) {
    this.setState({
      text: editor.getData()
    });
  };

  /**
   * @override
   */
  render() {

    
    console.log(this.props.data);
    if(!this.props.data)
      return <LinearProgress />

    let data = this.props.data;


    return <React.Fragment>
      {/* Use coupon */}
      <Grid container spacing={3} className="align-items-center">
        <Grid item md={12} xs={12}>
          <FormControl fullWidth>
            <CKEditor
              type="classic"
              name="text"
              data={data.text}
              onChange={ ( { event, editor } ) => this.onChangeText(event, editor) }
            />
            <textarea name="text" value={this.state.text} style={{display: "none"}} />
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  }
}

export default Form;