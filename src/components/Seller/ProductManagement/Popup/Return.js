import React from 'react';
import CKEditor from 'ckeditor4-react';
import { FormControl, Grid } from '@material-ui/core';

/**
 * @summary Return popup
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Product/Popup
 */
class Return extends React.Component {

  /**
   * @constructor
   */
  constructor(props){
    super(props);

    // Merge search states
    this.state = { 
      text: ""
    }

    // Bind
    this.onChange = this.onChange.bind(this);
  }

  /**
   * @summary onChange
   * @param {String} editor 
   */
  onChange(event, editor) {
    this.setState({
      text: editor.getData()
    });
  }

  /**
   * @override
   */
  render() {
    return <React.Fragment>
      
      <Grid container>
        <Grid item md={12} xs={12} className="customPopup">
          {this.state.text}
          <FormControl fullWidth>
            <CKEditor
              name="content" 
              id="editor"
              editor={ ClassicEditor }
              onChange={ ( { event, editor } ) => this.onChange(event, editor) }
            />
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  }
}

export default Return;