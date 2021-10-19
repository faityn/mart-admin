import React from "react";
import Tree from "./Tree";
import Form from "../Form/Form";
import PageTitle from "../../../core/common/Partials/PageTitle";
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import { Grid, Button, CircularProgress, Divider } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { GET_CATEGORIES, SAVE_CATEGORY, CATEGORY } from "../Queries";
import { DropzoneDialog } from "material-ui-dropzone";
import validate from "validate.js";

/**
 * @summary Category Management
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Category
 */
class Index extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      category: null,
      categories: null,
      isProcessing: false,
      parentId: 0,
      dropzone: false,
      errors: null,
      images: [],
      expandAll: [],
    };

    // Events
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.onCategoryId = this.onCategoryId.bind(this);
    this.handleDropzoneOpen = this.handleDropzoneOpen.bind(this);
    this.handleDropzoneClose = this.handleDropzoneClose.bind(this);
    this.hasError = this.hasError.bind(this);

    this._isMounted = false;
  }

  /**
   * @summary Search
   * @param {String} childrenName
   */
  search(e) {}

  /**
   * @override
   */
  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * @override
   */
  async componentDidMount() {
    this._isMounted = true;

    await this.props.apolloClient.httpClient
      .query({
        query: GET_CATEGORIES,
        variables: {
          isAdmin: true
        }
      })
      .then((result) => {
        this.setState({
          categories: result.data.categories,
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
  async componentDidUpdate(prevProps, prevState) {
    this._isMounted = true;

    if (prevState.id !== this.state.id) {
      // if(this.props.id) {
      await this.props.apolloClient.httpClient
        .query({
          query: CATEGORY,
          variables: { id: this.state.id },
        })
        .then((result) => {
          this.setState({
            category: result.data.category,
          });
        })
        .catch((error) => {
          this.props.enqueueSnackbar(
            "Sorry, there is an error occurred while fetching data.",
            { variant: "error" }
          );
        });
    }
  }

  /**
   * @summary Check errors
   * @param {String} field
   */
  hasError(field) {
    return this.state.errors && this.state.errors[field] ? true : false;
  }

  /**
   * @summary Validate product
   * @param {Object} product
   */
  onValidateSubmit(product) {
    const schema = {
      name: {
        presence: {
          allowEmpty: false,
          message: "^Name field is required.",
        },
        length: {
          maximum: 32,
          message: "^Maximum length should be 32.",
        },
      },
    };

    // Validate
    const errors = validate(product, schema);

    this.setState({
      errors: errors,
    });

    return errors;
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

    // Images
    let imageData = formData.getAll("images");
    let images = [];
    let url = formData.getAll("url");

    (imageData || []).map((image, index) => {

      images.push({
        imageUrl: image,
        url: url[index],
      });

      return true;
    });

    // Form data to object
    let category = {
      id: formData.get("id"),
      name: formData.get("name"),
      icon: formData.get("icon"),
      parentId: formData.get("parentId") ? formData.get("parentId") : "0",
      active: formData.get("active") === "false" ? "false" : "true",
      images: images,
    };

    // Validate
    if (this.onValidateSubmit(category)) return;

    this.setState({ isProcessing: true });

    this.props.enqueueSnackbar("The saving process is being started ...", {
      variant: "info",
    });

    let id = formData.get("id");

    // Mutate
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: SAVE_CATEGORY,
        variables: {
          category: category,
        },
      })
      .then((result) => {
        if (result.data.saveCategory.statusCode === 200) {
          const message = id
            ? "Category has been successfully updated."
            : "Category has been successfully created.";
          this.props.enqueueSnackbar(message, { variant: "success" });

          if (!id) {
            id = result.data.id;
          }
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

    this._isMounted &&
      this.setState({
        isProcessing: false,
      });
  }

  /**
   * @summary Set category id
   */
  onCategoryId(e, id) {
    this.setState({
      id: id,
    });
  }

  /**
   * @summary Close box
   * @param {event}
   */
  handleDropzoneOpen(event, index) {
    this.setState({
      dropzone: true,
    });
  }

  /**
   * @summary Close box
   * @param {event}
   */
  handleDropzoneClose() {
    this.setState({ dropzone: false });
  }

  /**
   * @summary Expand All
   * @param {event}
   */
  onExpandAll() {
    let categories = this.state.categories ? this.state.categories : null;
    let expandAll = this.state.expandAll;

    (categories.first || []).map((first) => {
      expandAll.push(first.id);
    });

    (categories.second || []).map((second) => {
      expandAll.push(second.id);
    });

    this.setState({
      expandAll: expandAll,
    });
  }

  /**
   * @summary Cagegory add
   */
  onCategoryAdd(e, id) {
    if (id !== 0) {
      this.setState({
        category: {
          id: null,
          parentId: id,
          name: null,
          active: false,
          image: "",
        },
      });
    } else if (id === 0) {
      this.setState({
        category: {
          id: "",
          parentId: 0,
          name: null,
          active: false,
          image: "",
        },
      });
    }
  }

  /**
   * @override
   */
  render() {
    return (
      <React.Fragment>
        <Grid container>
          {/* Title section */}
          <Grid item xs={6}>
            <PageTitle
              menuName="Category"
              title="Category management"
              icon={<MenuIcon />}
            />
          </Grid>
          {/* Title section */}
          <Grid item xs={6} className="text-right"></Grid>
        </Grid>

        <div className="card mt-20">
          <Grid container>
            {/* Tree section */}
            <Grid item md={2} xs={12}>
              <Grid container>
                <Grid item md={12} xs={12}>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={this.onExpandAll.bind(this)}
                  >
                    Expand all
                  </Button>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item md={12} xs={12}>
                  <Tree
                    id={this.state.id}
                    onCategoryId={this.onCategoryId}
                    categories={this.state.categories}
                    expandAll={this.state.expandAll}
                    onCategoryAdd={this.onCategoryAdd.bind(this)}
                  />
                </Grid>
              </Grid>

              <Grid container>
                <Grid item md={12} xs={12}>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    className="mt-20"
                  >
                    Category order
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            {/* Management section */}
            <Grid item md={10} xs={12}>
              <form id="my-form-managemnt" onSubmit={this.onHandleSubmit}>
                <Form
                  id={this.state.id}
                  categories={this.state.categories}
                  category={this.state.category}
                  parentId={this.state.parentId}
                  hasError={this.hasError}
                  errors={this.state.errors}
                  handleDropzoneOpen={this.handleDropzoneOpen}
                />
              </form>
            </Grid>
          </Grid>

          <Divider className="mt-20" />

          <Grid container className="align-items-center mt-20">
            <Grid item className="text-right">
              <Button
                form="my-form-managemnt"
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
        </div>

        <DropzoneDialog
          maxFileSize={30000000}
          acceptedFiles={["image/*"]}
          filesLimit={1}
          open={this.state.dropzone}
          onClose={this.handleDropzoneClose}
        />
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

export default withSnackbar(connect(mapStateToProps, null)(Index));
