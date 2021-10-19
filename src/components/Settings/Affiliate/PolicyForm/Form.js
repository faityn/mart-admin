import React from "react";
import { withSnackbar } from "notistack";
import validate from "validate.js";
import { connect } from "react-redux";
import PageTitle from "../../../../core/common/Partials/PageTitle";
import PhotoAlbumIcon from "@material-ui/icons/PhotoAlbum";
import {
    Grid,
    Button,
    TextField,
    FormControl,
    Divider,
    CircularProgress,
    InputLabel,
    Select,
    MenuItem,
} from "@material-ui/core";
import {
    SAVE_AFFILIATE_POLICY,
    GET_CATEGORIES,
} from "../../../Queries/Queries";
import List from "./List";

// Icon
import SaveIcon from "@material-ui/icons/Save";
import ListNew from "./ListNew";

class Form extends React.Component {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        // Default state
        this.state = {
            id: this.props.match.params.id ? this.props.match.params.id : "",
            isProcessing: false,
            shouldUpdateList: false,
            errors: null,
            categories: {
                first: [],
                second: [],
                third: [],
            },
            selectedCategories: {
                firstId: "",
                secondId: "",
                thirdId: "",
            },
        };

        // Events
        this.hasError = this.hasError.bind(this);
        this.onUpdatedList = this.onUpdatedList.bind(this);

        this._isMounted = false;
    }

    /**
     * @override
     */
    componentDidMount() {
        this._isMounted = true;

        this.setState({ isProcessing: true }, () => {
            this.props.apolloClient.httpClient
                .query({
                    query: GET_CATEGORIES,
                })
                .then((result) => {
                    this.setState({
                        categories: result.data.categories,
                        isProcessing: false,
                    });
                })
                .catch((error) => {
                    this.props.enqueueSnackbar(
                        "Sorry, there is an error occurred while fetching data.",
                        { variant: "error" }
                    );
                    this.setState({
                        isProcessing: false,
                    });
                });
        });
    }

    /**
     * @summary Check errors
     * @param {String} field
     */
    hasError(field) {
        return this.state.errors && this.state.errors[field] ? true : false;
    }

    /**
     * @summary Validate exhibition
     * @param {Object} exhibition
     */
    onValidateSubmit(exhibition) {
        const schema = {
            category1: {
                presence: {
                    allowEmpty: false,
                    message: "^First category field is required.",
                },
            },
            // category2: {
            //   presence: {
            //     allowEmpty: true,
            //     message: "^Second category date field is required.",
            //   },
            // },
            // category3: {
            //   presence: {
            //     allowEmpty: true,
            //     message: "^Third category field is required.",
            //   },
            // },
            percentage: {
                presence: {
                    allowEmpty: false,
                    message: "^Percentage field is required.",
                },
            },
        };

        // Validate
        const errors = validate(exhibition, schema);

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
        let affiliatePolicy = {
            category1: formData.get("category1"),
            category2: formData.get("category2"),
            category3: formData.get("category3"),
            percentage: formData.get("percentage"),
        };

        // Validate
        if (this.onValidateSubmit(affiliatePolicy)) return;

        this.setState({ isProcessing: true });

        // Toast process started
        this.props.enqueueSnackbar("The saving process is being started ...", {
            variant: "info",
        });

        // Mutate
        await this.props.apolloClient.httpClient
            .mutate({
                mutation: SAVE_AFFILIATE_POLICY,
                variables: {
                    affiliatePolicy: affiliatePolicy,
                },
            })
            .then((result) => {
                if (result.data.saveAffiliatePolicy.statusCode === 200) {
                    this.props.enqueueSnackbar(
                        "Affiliate policy has been successfully updated.",
                        { variant: "success" }
                    );
                    this.setState({
                        shouldUpdateList: true,
                        isProcessing: false,
                    });
                } else {
                    this.props.enqueueSnackbar(
                        "Sorry, there is an error occurred while saving data.",
                        { variant: "error" }
                    );
                    this.setState({ isProcessing: false });
                }
            })
            .catch((error) => {
                this.props.enqueueSnackbar(
                    "Sorry, there is an error occurred while saving data.",
                    { variant: "error" }
                );
                this.setState({ isProcessing: false });
            });
    }

    onUpdatedList() {
        this.setState({
            shouldUpdateList: false,
        });
    }

    /**
     * @summary On change category
     * @param {MouseEvent} event
     */
    onChangeCategory(event, level) {
        event.preventDefault();
        const val = event.target.value;

        if (level === 1) {
            this.setState({
                selectedCategories: {
                    firstId: val,
                    secondId: "",
                    thirdId: "",
                },
            });
        } else if (level === 2) {
            this.setState({
                selectedCategories: {
                    firstId: this.state.selectedCategories.firstId,
                    secondId: val,
                    thirdId: "",
                },
            });
        } else if (level === 3) {
            this.setState({
                selectedCategories: {
                    firstId: this.state.selectedCategories.firstId,
                    secondId: this.state.selectedCategories.secondId,
                    thirdId: val,
                },
            });
        }
    }

    /**
     * @override
     */
    render() {
        let data = this.state.exhibition
            ? this.state.exhibition
            : { products: [] };

        return (
            <React.Fragment>
                {/* <Grid container> */}
                {/* Title section */}
                {/* <Grid item>
            <PageTitle
              menuName="Affiliate policy management"
              title="Affiliate policy management"
              icon={<PhotoAlbumIcon />}
            />
          </Grid> */}
                {/* </Grid> */}

                {/* <div className="card mt-20">
          <form
            id="my-form-affiliate"
            onSubmit={this.onHandleSubmit.bind(this)}
          > */}
                {/* Container */}
                {/* <Grid container spacing={3} className="align-items-center">
              <Grid item md={2} xs={12}>
                <h5>Category</h5>
              </Grid> */}

                {/* First category */}
                {/* <Grid item md={3} xs={12}>
                <FormControl 
                  size="small" 
                  fullWidth 
                  variant="outlined"
                >
                  <InputLabel id="select-cat1-label">First category</InputLabel>
                  <Select
                    labelId="select-cat1-label"
                    id="select-cat1_outlined"
                    label="First category"
                    name="category1"
                    value={this.state.selectedCategories.firstId}
                    error={this.hasError('category1')}
                    onChange={(e) => this.onChangeCategory(e, 1)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {
                      (this.state.categories.first || []).map((category, index) => 
                        <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                      ) 
                    }
                  </Select>
                </FormControl>
              </Grid> */}

                {/* Second category */}
                {/* <Grid item md={3} xs={12}>
                <FormControl fullWidth
                  size="small" 
                  variant="outlined"
                >
                  <InputLabel id="select-cat2-label">Second category</InputLabel>
                  <Select
                    labelId="select-cat2-label"
                    id="select-cat2_outlined"
                    label="Second category"
                    name="category2"
                    value={this.state.selectedCategories.secondId}
                    error={this.hasError('category2')}
                    onChange={(e) => this.onChangeCategory(e, 2)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {
                      (this.state.categories.second.filter(f => f.parentId === this.state.selectedCategories.firstId) || []).map((category, index) => 
                        <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                      ) 
                    }
                  </Select>
                </FormControl>
              </Grid> */}

                {/* Third category */}
                {/* <Grid item md={3} xs={12}>
                <FormControl fullWidth
                  size="small"  
                  variant="outlined"
                >
                  <InputLabel id="select-cat3-label">Third category</InputLabel>
                  <input name="category3" type="hidden" value={this.state.selectedCategories.thirdId} />
                  <Select
                    labelId="select-cat3-label"
                    id="select-cat3_outlined"
                    label="Third category"
                    value={this.state.selectedCategories.thirdId}
                    error={this.hasError('category3')}
                    onChange={(e) => this.onChangeCategory(e, 3)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {
                      (this.state.categories.third.filter(f => f.parentId === this.state.selectedCategories.secondId) || []).map((category, index) => 
                        <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                      )
                    }
                  </Select>
                </FormControl>
              </Grid>
            </Grid> */}

                {/* Container */}
                {/* <Grid container spacing={3} className="align-items-center">
              <Grid item md={2} xs={12}>
                <h5>Percentage</h5>
              </Grid> */}

                {/* Start date */}
                {/* <Grid item md={4} xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  type="text"
                  name="percentage"
                  label="Percentage"
                  error={this.hasError('percentage')}
                  helperText={
                    this.hasError('percentage') ? this.state.errors['percentage'][0] : null
                  }
                />
              </Grid>
            </Grid>
          </form>

          <Divider className="mt-20" />

          <Grid container className="mt-20">
            <Grid item>
              <Button
                form="my-form-affiliate"
                variant="contained"
                size="small"
                color="primary"
                type="submit"
                disabled={this.state.isProcessing}
                startIcon={
                  this.state.isProcessing ? (
                    <CircularProgress color="primary" size="1rem" />
                  ) : (
                    <SaveIcon fontSize="small" className="mr-10" />
                  )
                }
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </div> */}

                {/* <List
                    shouldUpdateList={this.state.shouldUpdateList}
                    onUpdatedList={this.onUpdatedList}
                /> */}
                <ListNew />
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

export default withSnackbar(connect(mapStateToProps, null)(Form));
