import React from "react";
import CKEditor from "ckeditor4-react";
import { FormControl, Grid } from "@material-ui/core";

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
  constructor(props) {
    super(props);

    // Merge search states
    this.state = {
      description: "",
    };

    // Bind
    this.onChangeDescription = this.onChangeDescription.bind(this);
  }

  /**
   * @summary onChange
   * @param {String} editor
   */
  onChangeDescription(event, editor) {
    this.setState({
      description: editor.getData(),
    });
  }

  /**
   * @override
   */
  render() {
    return (
      <React.Fragment>
        <Grid container>
          <Grid item md={12} xs={12} className="customPopup">
            <FormControl fullWidth>
              <CKEditor
                type="classic"
                name="description"
                data={this.state.description}
                onChange={({ event, editor }) =>
                  this.onChangeDescription(event, editor)
                }
              />
              <textarea
                name="description"
                value={this.state.description}
                style={{ display: "none" }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Return;
