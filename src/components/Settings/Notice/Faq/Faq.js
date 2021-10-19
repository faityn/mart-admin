import React from "react";

import { withSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import validate from "validate.js";
import moment from "moment";
import {
  GET_FAQS,
  GET_FAQ_CATEGORIES,
  UPDATE_FAQ_CATEGORIES,
} from "../Queries";

import BaseList from "../../../../core/common/List";
import FaqTable from "./Table";
import FaqSearch from "./Search";
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  TextField,
} from "@material-ui/core";

class Faq extends BaseList {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // Merge search states
    this.state = Object.assign(this.state, {
      search: {
        category: "membership",
      },
      pagination: {
        rowsPerPage: 10,
        pageNumber: 1,
      },
      orderBy: "createdDate",
      type: "DESC",
      categories: [],
      categoryModal: false,
      isProcessing: false,
      errors: null,
    });

    // Override
    this.query = GET_FAQS;
    this.table = FaqTable;

    // Event
    this.search = this.search.bind(this);
    this.onReset = this.onReset.bind(this);
    this.hasError = this.hasError.bind(this);
  }

  /**
   * @summary Check errors
   * @param {String} field
   */
  hasError(field) {
    return this.state.errors && this.state.errors[field] ? true : false;
  }

  /**
   * @summary Load categories
   */
  async loadCategories() {
    await this.props.apolloClient.httpClient
      .query({
        query: GET_FAQ_CATEGORIES,
      })
      .then((result) => {
        this.setState({
          categories: result.data.getFaqCategories,
        });
      })
      .catch((error) => {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while fetching data.",
          { variant: "error" }
        );
      });
  }

  /**
   * @override
   */
  async componentDidMount() {
    // Get categories
    this.loadCategories();
  }

  /**
   * @summary Search
   * @param {String} childrenName
   * @param {String} childrenState
   */
  search(childrenState) {
    this.setState({
      search: {
        category: childrenState.category,
      },
    });
  }

  /**
   * @summary onReset
   * @param {MouseEvent} event
   */
  onReset(event) {
    this.setState({
      search: {
        category: "membership",
      },
    });
  }

  /**
   * @summary Open category modal
   * @param {event}
   */
  onOpenModal() {
    this.setState({ categoryModal: true });
  }

  /**
   * @summary Close category modal
   * @param {event}
   */
  onCloseModal() {
    this.setState({ categoryModal: false });
  }

  /**
   * @summary Validate formData
   * @param {Object} formData
   */
  onValidateForm(formData) {
    const schema = {
      category1: {
        presence: {
          allowEmpty: false,
          message: "^Category field is required.",
        },
      },
      category2: {
        presence: {
          allowEmpty: false,
          message: "^Category field is required.",
        },
      },
      category3: {
        presence: {
          allowEmpty: false,
          message: "^Category field is required.",
        },
      },
      category4: {
        presence: {
          allowEmpty: false,
          message: "^Category field is required.",
        },
      },
    };

    // Validate
    const errors = validate(formData, schema);

    this.setState({
      errors: errors,
    });

    return errors;
  }

  /**
   * @summary Handle submit form
   * @param {MouseEvent} event
   */
  async onSubmitCategoryForm(event) {
    event.preventDefault();

    // Form data
    const formData = new FormData(event.target);

    // Form data to object
    let categoriesValidate = {
      category1: formData.get("category1"),
      category2: formData.get("category2"),
      category3: formData.get("category3"),
      category4: formData.get("category4"),
    };

    let categories = [
      {
        value: "membership",
        text: formData.get("category1"),
      },
      {
        value: "ordershipitem",
        text: formData.get("category2"),
      },
      {
        value: "cancelreturnrefund",
        text: formData.get("category3"),
      },
      {
        value: "others",
        text: formData.get("category4"),
      },
    ];

    // Validate
    if (this.onValidateForm(categoriesValidate)) return;

    this.setState({ isProcessing: true });

    // Mutate
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: UPDATE_FAQ_CATEGORIES,
        variables: {
          faqCategories: categories,
        },
      })
      .then((result) => {
        if (result.data.updateFaqCategories.statusCode === 200) {
          this.setState({
            categories: categories,
            categoryModal: false,
          });
          this.props.enqueueSnackbar("Categories successfully updated.", {
            variant: "success",
          });
        } else {
          this.props.enqueueSnackbar(
            "Sorry, there is an error occurred while saving data.",
            { variant: "error" }
          );
        }
      })
      .catch((error) => {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while saving data.",
          { variant: "error" }
        );
      });

    this.setState({
      isProcessing: false,
    });
  }

  /**
   * @override
   */
  render() {
    console.log(this.state.search.category)
    return (
      <React.Fragment>
        {/* Search */}
        <FaqSearch
          search={this.search}
          onReset={this.onReset}
          categories={this.state.categories}
        />

        {/* List */}
        <div className="mt-20">{this.executeQuery()}</div>

        {/* Buttons */}
        <Grid container>
          {/* Button section */}
          <Grid item xs={12} className="text-right mt-20">
            <Link to={"/settings-faq/form/new"}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginRight: "10px" }}
              >
                Write FAQ
              </Button>
            </Link>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={this.onOpenModal.bind(this)}
            >
              Edit Category
            </Button>
          </Grid>
        </Grid>

        {/* Dialog */}
        <Dialog
          open={this.state.categoryModal}
          aria-labelledby="responsive-dialog-title"
          maxWidth="sm"
        >
          {/* Title */}
          <DialogTitle id="responsive-dialog-title">
            <h2>Edit category</h2>
          </DialogTitle>
          <Divider />

          {/* Content */}
          <DialogContent>
            <form
              id="category-form"
              onSubmit={this.onSubmitCategoryForm.bind(this)}
            >
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    name="category1"
                    multiline
                    rows={1}
                    defaultValue={
                      this.state.categories[0]
                        ? this.state.categories[0].text
                        : ""
                    }
                    variant="outlined"
                    error={this.hasError("category1")}
                    helperText={
                      this.hasError("category1")
                        ? this.state.errors["category1"][0]
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    name="category2"
                    multiline
                    rows={1}
                    defaultValue={
                      this.state.categories[1]
                        ? this.state.categories[1].text
                        : ""
                    }
                    style={{ marginTop: "10px" }}
                    variant="outlined"
                    error={this.hasError("category2")}
                    helperText={
                      this.hasError("category2")
                        ? this.state.errors["category2"][0]
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    name="category3"
                    multiline
                    rows={1}
                    defaultValue={
                      this.state.categories[2]
                        ? this.state.categories[2].text
                        : ""
                    }
                    style={{ marginTop: "10px" }}
                    variant="outlined"
                    error={this.hasError("category3")}
                    helperText={
                      this.hasError("category3")
                        ? this.state.errors["category3"][0]
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    name="category4"
                    multiline
                    rows={1}
                    defaultValue={
                      this.state.categories[3]
                        ? this.state.categories[3].text
                        : ""
                    }
                    style={{ marginTop: "10px" }}
                    variant="outlined"
                    error={this.hasError("category4")}
                    helperText={
                      this.hasError("category4")
                        ? this.state.errors["category4"][0]
                        : null
                    }
                  />
                </Grid>
              </Grid>
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
              form="category-form"
              type="submit"
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

// Redux state to props
const mapStateToProps = (state) => {
  return {
    apolloClient: state.apolloClient,
  };
};

export default withSnackbar(connect(mapStateToProps, null)(Faq));
