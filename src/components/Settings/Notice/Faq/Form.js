import React from "react";
import { GET_FAQ_CATEGORIES, GET_FAQ, SAVE_FAQ } from "../Queries";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import validate from "validate.js";
import PageTitle from "../../../../core/common/Partials/PageTitle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import CKEditor from "ckeditor4-react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@material-ui/core";

/**
 * @summary Faq form
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Faq
 */
class FaqForm extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // Merge search states
    this.state = {
      id: this.props.match.params.id,
      categories: [],
      faq: {
        createdDate: new Date(),
        title: "",
        description: "",
        category: "membership",
      },
      mode: null,
      isProcessing: false,
      errors: null,
    };

    // Bind event
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
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
   * @summary Load faq
   */
  async loadFaq() {
    await this.props.apolloClient.httpClient
      .query({
        query: GET_FAQ,
        variables: {
          id: this.state.id,
        },
      })
      .then((result) => {
        this.setState({
          faq: result.data.faq,
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

    let id, mode;
    if (this.state.id === "new") {
      id = "";
      mode = "Create";
    } else {
      id = this.state.id;
      mode = "Edit";

      // Get faq
      this.loadFaq();
    }

    // Create or Edit
    this.setState({
      id: id,
      mode: mode,
    });
  }

  /**
   * @summary Change description
   * @param {MouseEvent} editor
   */
  onChangeDescription(event, editor) {
    this.setState({
      faq: Object.assign(this.state.faq, {
        description: editor.getData(),
      }),
    });
  }

  /**
   * @summary Validate formData
   * @param {Object} formData
   */
  onValidateForm(formData) {
    const schema = {
      title: {
        presence: {
          allowEmpty: false,
          message: "^Title field is required.",
        },
      },
      category: {
        presence: {
          allowEmpty: false,
          message: "^Category field is required.",
        },
      },
      description: {
        presence: {
          allowEmpty: false,
          message: "^Description field is required.",
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
  async onHandleSubmit(event) {
    event.preventDefault();

    // Form data
    const formData = new FormData(event.target);

    // Form data to object
    let faqData = {
      id: this.state.id,
      title: formData.get("title"),
      category: formData.get("category"),
      description: this.state.faq.description,
    };

    // Validate
    if (this.onValidateForm(faqData)) return;

    this.setState({
      isProcessing: true,
    });

    // Mutate
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: SAVE_FAQ,
        variables: {
          faq: faqData,
        },
      })
      .then(async (result) => {
        if (result.data.saveFaq.statusCode === 200) {
          const message = "Successfully saved.";
          this.props.enqueueSnackbar(message, { variant: "success" });

          this.setState({
            faq: faqData,
            alert: {
              message: "Successfully saved.",
              variant: "success",
            },
          });
        }
      });

    this.setState({
      isProcessing: false,
    });
  }

  /**
   * @override
   */
  render() {

    return (
      <React.Fragment>
        {/* Title section */}
        <Grid container>
          <Grid item xs={6}>
            {/* Title */}
            <PageTitle
              menuName="FAQ"
              title={this.state.mode + " faq"}
              links={[{ name: "Notice management", href: "/settings-notice" }]}
              icon={<NotificationsIcon />}
            />
          </Grid>
        </Grid>

        {/* Form */}
        <Card className="mt-20">
          <CardContent>
            <form id="faq-form" noValidate onSubmit={this.onHandleSubmit}>
              <Table>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      size="small"
                      name="title"
                      multiline
                      rows={1}
                      id="faq-title"
                      defaultValue={this.state.faq.title}
                      variant="outlined"
                      error={this.hasError("title")}
                      helperText={
                        this.hasError("title")
                          ? this.state.errors["title"][0]
                          : null
                      }
                    />
                  </TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>
                    <FormControl size="small" variant="outlined">
                      <Select
                        id="category-select"
                        name="category"
                        defaultValue={this.state.faq.category}
                        error={this.hasError("category")}
                        helperText={
                          this.hasError("category")
                            ? this.state.errors["category"][0]
                            : null
                        }
                      >
                        {(this.state.categories || []).map(
                          (category, index) => (
                            <MenuItem key={index} value={category.value}>
                              {category.text}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4}>
                    <CKEditor
                      type="classic"
                      name="description"
                      data={this.state.faq.description}
                      onChange={({ event, editor }) =>
                        this.onChangeDescription(event, editor)
                      }
                    />
                    <textarea
                      name="description"
                      value={this.state.faq.description}
                      style={{ display: "none" }}
                    />
                    <FormHelperText error>
                      {this.hasError("description")
                        ? this.state.errors["description"][0]
                        : null}
                    </FormHelperText>
                  </TableCell>
                </TableRow>
              </Table>
            </form>
          </CardContent>
        </Card>

        <Card className="mt-20">
          <CardContent>
            <Button
              size="small"
              variant="contained"
              color="primary"
              form="faq-form"
              type="submit"
            >
              {this.state.mode}
            </Button>
          </CardContent>
        </Card>
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

export default withSnackbar(connect(mapStateToProps, null)(FaqForm));
