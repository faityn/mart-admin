import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
} from "@material-ui/core";
import CKEditor from "ckeditor4-react";
import MenuIcon from '@material-ui/icons/Menu';
import { GET_CATEGORIES, CATEGORY, SAVE_CATEGORY } from "./Queries";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import SaveIcon from "@material-ui/icons/Save";

/**
 * @summary Category
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Settings/Category
 */
class CategorySetting extends React.Component {
  /**
   * @constructor
   */
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      selectedCategories: {
        firstId: "",
        secondId: "",
      },
      categories: {
        first: [],
        second: [],
        third: [],
      },
      category: null,
      isProcessing: false,
      description: "",
      lastCategory: ""
    };

    // Events
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this._isMounted = false;
  }

  /**
   * @summary Change description
   * @param {MouseEvent} editor
   */
  onChangeDescription(event, editor) {
    this.setState({
      description: editor.getData(),
    });
  }

  /**
   * @summary Load categories
   */
   async loadSelectCategories() {
    await this.props.apolloClient.httpClient.query({
      query: GET_CATEGORIES,
    }).then((result) => {
      this.setState({
        categories: result.data.categories,
      });
    }).catch((error) => {
      this.props.enqueueSnackbar('Sorry, there is an error occurred while fetching categories.', {variant: 'error'});
    });
  }

  /**
   * @summary Load category
   */
   async loadCategory() {
    await this.props.apolloClient.httpClient.query({
      query: CATEGORY,
      variables: { id: this.state.lastCategory },
    }).then((result) => {
      this.setState({
        category: result.data.category,
        description: result.data.category.description,
      });
    }).catch((error) => {
      this.props.enqueueSnackbar('Sorry, there is an error occurred while fetching categories.', {variant: 'error'});
    });
  }

  /**
   * @override
   */
  async componentDidMount() {
    this.loadSelectCategories();
  }

  /**
   * @override
   */
   async componentDidUpdate(prevProps, prevState) {
    if (prevState.lastCategory !== this.state.lastCategory) {
      this.loadCategory();
    }
  }

  /**
   * @summary On change category
   * @param {MouseEvent} event
   */
  onChangeCategory(event, level) {
    event.preventDefault();

    this.setState({
      lastCategory: event.target.value
    });

    if(level === 1) {
      this.setState({
        selectedCategories: {
          firstId: this.state.selectedCategories.firstId,
          secondId: event.target.value,
        },
      });
    } else if (level === 2) {
      this.setState({
        selectedCategories: {
          firstId: this.state.selectedCategories.firstId,
          secondId: this.state.selectedCategories.secondId,
          thirdId: event.target.value,
        },
      });
    } else {
      this.setState({
        selectedCategories: {
          firstId: event.target.value,
          secondId: this.state.selectedCategories.firstId,
        },
      });
    }
  }


  /**
   * @summary Handle submit form
   * @param {MouseEvent} event
   */
  async onHandleSubmit(event) {
    event.preventDefault();

    await this.props.apolloClient.httpClient.mutate({
      mutation: SAVE_CATEGORY,
      variables: { 
        "category": {
          "id": this.state.lastCategory,
          "description": this.state.description
        }
      },
    }).then((result) => {
      if (result.data.saveCategoryDescription.statusCode === 200) {
        this.props.enqueueSnackbar(
          "Successfully updated category",
          { variant: "success" }
        );
      }
    }).catch((error) => {
      this.props.enqueueSnackbar('Sorry, there is an error occurred while updating category.', {variant: 'error'});
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
          <Grid item>
            {/* Title */}
            <PageTitle
              menuName="Category common description setting"
              title="Category common description setting"
              icon={<MenuIcon />}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item md={8}>
            <div className="card mt-20">
              <form onSubmit={this.onHandleSubmit.bind(this)}>
                {/* Select a category */}
                <Grid container spacing={2} className="align-items-center">
                  <Grid item md={3} xs={12}>
                    <h5>Select a category</h5>
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <FormControl size="small" fullWidth variant="outlined">
                      <InputLabel id="demo-simple-select-outlined-label">
                        First category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="First category"
                        name="firstCategory"
                        onChange={this.onChangeCategory}
                        value={this.state.selectedCategories.firstId}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {(this.state.categories.first || []).map(
                          (category, index) => (
                            <MenuItem key={index} value={category.id}>
                              {category.name}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <FormControl size="small" fullWidth variant="outlined">
                      <InputLabel id="demo-simple-select-outlined-label">
                        Second category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="Second category"
                        name="secondCategory"
                        onChange={(e) => this.onChangeCategory(e, 1)}
                        value={this.state.selectedCategories.secondId}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {(
                          this.state.categories.second.filter(
                            (f) =>
                              f.parentId === this.state.selectedCategories.firstId
                          ) || []
                        ).map((category, index) => (
                          <MenuItem key={index} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <FormControl size="small" fullWidth variant="outlined">
                      <InputLabel id="demo-simple-select-outlined-label">
                        Third category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="Third category"
                        name="thirdCategory"
                        onChange={(e) => this.onChangeCategory(e, 2)}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {(
                          this.state.categories.third.filter(
                            (f) =>
                              f.parentId ===
                              this.state.selectedCategories.secondId
                          ) || []
                        ).map((category, index) => (
                          <MenuItem key={index} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                {/* Common product details */}
                <Grid container spacing={2} className="align-items-center">
                  <Grid item md={3} xs={12}>
                    <h5>Common product details</h5>
                  </Grid>
                  <Grid item md={9} xs={12}>
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

                <Divider className="mt-20" />

                <Grid container className="mt-20">
                  <Grid item>
                    {/* Save */}
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      type="submit"
                      startIcon={<SaveIcon fontSize="small" className="mr-10" />}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Grid>
        </Grid>
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

export default withSnackbar(connect(mapStateToProps, null)(CategorySetting));
