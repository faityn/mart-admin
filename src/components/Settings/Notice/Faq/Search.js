import React from "react";
import {
  Button,
  Grid,
  TextField,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

const categories = [
  "Membership",
  "Order/Shipping",
  "Cancel/Return/Refund",
  "Others",
  "Item",
];

/**
 * @summary Qna search
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Notice
 */
class QnaSearch extends React.Component {
  /**
   * @constructor
   */
  constructor() {
    super();

    // Default state
    this.state = {
      categories: [],
      search: {
        category: "membership",
      },
    };
  }

  /**
   * @override
   */
  async componentDidMount() {
    // Set categories
    this.setState({
      categories: this.props.categories,
    });
  }

  /**
   * @override
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.categories !== this.props.categories) {
      this.setState({
        categories: this.props.categories,
      });
    }
  }

  /**
   * @summary Set category
   */
  setCategory(category) {
    let search = this.state.search;

    search["category"] = category;

    this.setState({ search });

    this.props.search(this.state.search);
  }

  /**
   * @override
   */
  render() {
    console.log(this.state.categories)
    return (
      <React.Fragment>
        <Grid container>
          {/* Button section */}
          <Grid item xs={12} className="text-right">
            <Button
              variant="contained"
              color={
                this.state.search.category === "membership"
                  ? "primary"
                  : "default"
              }
              size="small"
              style={{ marginRight: "10px" }}
              onClick={() => this.setCategory("membership")}
            >
            {this.state.categories[0]
              ? this.state.categories[0].text
              : null}              
            </Button>
            <Button
              variant="contained"
              color={
                this.state.search.category === "ordershipitem"
                  ? "primary"
                  : "default"
              }
              size="small"
              style={{ marginRight: "10px" }}
              onClick={() => this.setCategory("ordershipitem")}
            >
              {this.state.categories[1]
                ? this.state.categories[1].text
                : null }
            </Button>
            <Button
              variant="contained"
              color={
                this.state.search.category === "cancelreturnrefund"
                  ? "primary"
                  : "default"
              }
              size="small"
              style={{ marginRight: "10px" }}
              onClick={() => this.setCategory("cancelreturnrefund")}
            >
            {this.state.categories[2]
              ? this.state.categories[2].text
              : null }
            </Button>
            <Button
              variant="contained"
              color={
                this.state.search.category === "others" ? "primary" : "default"
              }
              size="small"
              onClick={() => this.setCategory("others")}
            >
            {this.state.categories[3]
              ? this.state.categories[3].text
              : null}              
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default QnaSearch;
