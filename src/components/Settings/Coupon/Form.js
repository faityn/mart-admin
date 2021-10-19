import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";
import {
    Grid,
    RadioGroup,
    Radio,
    FormControlLabel,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormGroup,
    Checkbox,
    Button,
    LinearProgress,
    CircularProgress,
    Divider,
    FormLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormHelperText,
} from "@material-ui/core";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import Fade from "@material-ui/core/Fade";
import { withSnackbar } from "notistack";
import validate from "validate.js";
import SaveIcon from "@material-ui/icons/Save";
import { Link } from "react-router-dom";
import { GET_CATEGORIES, SAVE_COUPON, GET_COUPON } from "../../Queries/Queries";
import { connect } from "react-redux";
import Product from "./Product";
import Member from "./Member";

/**
 * @summary Coupon
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Settings
 */
class Coupon extends React.Component {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        // state
        this.state = {
            id: this.props.match.params.id,
            isProcessing: false,
            errors: null,
            categoryId: null,
            categories: {
                first: [],
                second: [],
                third: [],
            },
            selectedCategories: {
                firstId: "",
                secondId: "",
            },
            selectedProduct: [],
            selectedProductModal: false,
            selectedPurchaseProduct: [],
            selectedPurchaseProductModal: false,
            selectedMember: [],
            selectedMemberModal: false,
            coupon: null,
        };
        // Events
        // this.hasError = this.hasError.bind(this);
        this.onProductModal = this.onProductModal.bind(this);
        this.onPurchaseProductModal = this.onPurchaseProductModal.bind(this);
        this.onMemberModal = this.onMemberModal.bind(this);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);

        this._isMounted = false;
    }

    /**
     * @override
     */
    async componentDidMount() {
        if (this.state.id) {
            await this.props.apolloClient.httpClient
                .query({
                    query: GET_COUPON,
                    variables: { id: this.state.id },
                })
                .then((result) => {
                    this.setState({
                        coupon: result.data.coupon,
                    });
                })
                .catch((error) => {
                    this.props.enqueueSnackbar(
                        "Sorry, there is an error occurred while fetching data.",
                        { variant: "error" }
                    );
                });
        }
        this._isMounted = true;
        console.log(this.state.coupon);
        await this.props.apolloClient.httpClient
            .query({
                query: GET_CATEGORIES,
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

    componentDidUpdate() {
        console.log(this.state.selectedProduct);
    }

    /**
     * Product Modal toggle
     * @param {Event} event
     */
    onProductModal() {
        this.setState({
            selectedProductModal: !this.state.selectedProductModal,
        });
    }

    /**
     * Purchase Product Modal toggle
     * @param {Event} event
     */
    onPurchaseProductModal() {
        this.setState({
            selectedPurchaseProductModal:
                !this.state.selectedPurchaseProductModal,
        });
    }

    /**
     * Member Modal toggle
     * @param {Event} event
     */
    onMemberModal() {
        this.setState({
            selectedMemberModal: !this.state.selectedMemberModal,
        });
    }

    /**
     * @summary Handle submit product form
     * @param {MouseEvent} event
     */
    onProductSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        let productIds = formData.getAll("productId");
        let selectedProduct = this.state.selectedProduct;
        (productIds || []).map((id) => {
            if (!selectedProduct.find((f) => f.id === id))
                this.setState({
                    selectedProduct: [
                        {
                            id: id,
                            name: formData.get(id),
                        },
                    ],
                    selectedProductModal: false,
                });
        });
    }

    /**
     * @summary Handle submit purchase product form
     * @param {MouseEvent} event
     */
    onPurchaseProductSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        let productIds = formData.getAll("selectedProduct");
        let selectedPurchaseProduct = this.state.selectedPurchaseProduct;

        (productIds || []).map((id) => {
            if (!selectedPurchaseProduct.find((f) => f.id === id))
                this.setState({
                    selectedPurchaseProduct: [
                        {
                            id: id,
                            name: formData.get(id),
                        },
                    ],
                    selectedPurchaseProductModal: false,
                });
        });
    }

    /**
     * @summary Handle submit member form
     * @param {MouseEvent} event
     */
    onMemberSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        let memberIds = formData.getAll("selectedMember");
        let selectedMember = this.state.selectedMember;

        (memberIds || []).map((id) => {
            if (!selectedMember.find((f) => f.id === id))
                this.setState({
                    selectedMember: [
                        {
                            id: id,
                            name: formData.get(id),
                        },
                    ],
                    selectedMemberModal: false,
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
     * @summary Validate coupon
     * @param {Object} coupon
     */
    onValidateSubmit(coupon) {
        const schema = {
            name: {
                presence: {
                    allowEmpty: false,
                    message: "^Name field is required.",
                },
            },
            description: {
                presence: {
                    allowEmpty: false,
                    message: "^Description field is required.",
                },
            },
            // categoryId: {
            //   presence: {
            //     allowEmpty: true,
            //     message: "^Category field is required.",
            //   },
            // },
            startDate: {
                presence: {
                    allowEmpty: false,
                    message: "^Start date field is required.",
                },
            },
            endDate: {
                presence: {
                    allowEmpty: false,
                    message: "^End date field is required.",
                },
            },
            discountType: {
                presence: {
                    allowEmpty: false,
                    message: "^Coupon type field is required.",
                },
            },
            moreThanType: {
                presence: {
                    allowEmpty: false,
                    message: "^Options field is required.",
                },
            },
            limitation: {
                numericality: {
                    greaterThan: 0,
                    message:
                        "^Should be greater than zero or less than one hundred thousand.",
                },
            },
        };

        // Custom validation
        if (coupon.moreThanType === "Price") {
            schema["dollar"] = {
                presence: {
                    allowEmpty: false,
                    message: "^Price field is required.",
                },
            };
        } else {
            schema["gram"] = {
                presence: {
                    allowEmpty: false,
                    message: "^Gram field is required.",
                },
            };
        }

        if (coupon.discountType === "Percent") {
            schema["percent"] = {
                presence: {
                    allowEmpty: false,
                    message: "^Percent field is required.",
                },
            };
        }
        if (coupon.discountType === "Price") {
            schema["price"] = {
                presence: {
                    allowEmpty: false,
                    message: "^Price field is required.",
                },
            };
        }

        if (coupon.use === "true") {
            schema["code"] = {
                presence: {
                    allowEmpty: false,
                    message: "^Code field is required.",
                },
            };
        }

        // Validate
        const errors = validate(coupon, schema);

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

        // if (this.state.isProcessing)
        //   return;

        // Form data
        const formData = new FormData(event.target);

        let product = this.state.selectedProduct[0]
            ? this.state.selectedProduct[0].id
            : null;
        let purchaseProduct = this.state.selectedPurchaseProduct[0]
            ? this.state.selectedPurchaseProduct[0].id
            : null;
        let memberId = this.state.selectedMember[0]
            ? this.state.selectedMember[0].id
            : null;
        let discount =
            formData.get("discountType") === "Price"
                ? formData.get("price")
                : formData.get("percent");
        let moreThan =
            formData.get("moreThanType") === "Price"
                ? formData.get("dollar")
                : formData.get("gram");

        // Form data to object
        let couponValidate = {
            name: formData.get("name"),
            description: formData.get("description"),
            // categoryId: this.state.categoryId,
            categoryId:
                this.state.coupon === null
                    ? this.state.categoryId
                    : this.state.coupon.categoryId,
            startDate: formData.get("startDate"),
            endDate: formData.get("endDate"),
            discountType: formData.get("discountType"),
            price: formData.get("price"),
            percent: formData.get("percent"),
            moreThanType: formData.get("moreThanType"),
            dollar: formData.get("dollar"),
            gram: formData.get("gram"),
            use: formData.get("use"),
            code: formData.get("code"),
            limitation:
                formData.get("limitation") === ""
                    ? null
                    : formData.get("limitation"),
        };

        // Form data to object
        let coupon = {
            // id: "",
            id: this.state.coupon === null ? null : this.state.coupon.id,
            status: formData.get("status"),
            name: formData.get("name"),
            description: formData.get("description"),
            // categoryId: this.state.categoryId,
            categoryId:
                this.state.coupon === null
                    ? this.state.categoryId
                    : this.state.coupon.categoryId,
            productId:
                this.state.coupon === null
                    ? product
                    : this.state.coupon.productId,
            startDate: formData.get("startDate"),
            endDate: formData.get("endDate"),
            discountType: formData.get("discountType"),
            discount: discount ? discount : null,
            moreThanType: formData.get("moreThanType"),
            moreThan: moreThan,
            userType:
                formData.getAll("userType").length === 0
                    ? null
                    : formData.getAll("userType"),
            age:
                formData.getAll("age").length === 0
                    ? null
                    : formData.getAll("age"),
            gender:
                formData.getAll("gender").length === 0
                    ? null
                    : formData.getAll("gender"),
            purchaseProductId:
                this.state.coupon === null
                    ? purchaseProduct
                    : this.state.coupon.purchaseProductId,
            userId: memberId,
            use: formData.get("use"),
            code: formData.get("code") === "" ? null : formData.get("code"),
            enableProduct: formData.get("enableProduct") === "true",
            enablePurchaseProduct:
                formData.get("enablePurchaseProduct") === "true",
            enableUser: formData.get("enableUser") === "true",
            limitation:
                formData.get("limitation") === ""
                    ? null
                    : formData.get("limitation"),
        };

        // Validate
        if (this.onValidateSubmit(couponValidate)) return;

        this.setState({
            isProcessing: true,
        });

        this.props.enqueueSnackbar("The saving process is being started ...", {
            variant: "info",
        });

        let id = this.state.id;

        // Mutate
        await this.props.apolloClient.httpClient
            .mutate({
                mutation: SAVE_COUPON,
                variables: {
                    coupon: coupon,
                },
            })
            .then((result) => {
                if (result.data.saveCoupon.statusCode === 200) {
                    const message = id
                        ? "Coupon has been successfully updated."
                        : "Coupon has been successfully created.";
                    this.props.enqueueSnackbar(message, { variant: "success" });
                    this.props.history.push("/settings/operation/coupon");
                } else {
                    console.log("result error:", error);
                    this.props.enqueueSnackbar(
                        "Sorry, there is an error occurred while saving data.",
                        { variant: "error" }
                    );
                }
            })
            .catch((error) => {
                console.log("result error:", error);
                this.props.enqueueSnackbar(
                    "Sorry, there is an error occurred while saving data.",
                    { variant: "error" }
                );
            });

        this._isMounted &&
            this.setState({
                isProcessing: false,
                id: id,
            });
    }

    /**
     * @summary On change category
     * @param {MouseEvent} event
     */
    onChangeCategory(event, level) {
        event.preventDefault();
        console.log(event);
        if (level === 1) {
            this.setState({
                categoryId: event.target.value,
                selectedCategories: {
                    firstId: this.state.selectedCategories.firstId,
                    secondId: event.target.value,
                },
            });
        } else {
            this.setState({
                categoryId: event.target.value,
                selectedCategories: {
                    firstId: event.target.value,
                    secondId: this.state.selectedCategories.firstId,
                },
            });
        }
    }

    /**
     * @override
     */
    render() {
        let isShowForm = !this.state.id || this.state.coupon;
        console.log(this.state.coupon)

        let age = [];
        let gender = [];
        let role = [];

        if (isShowForm) {
            if (this.state.coupon !== null && this.state.coupon.age !== null) {
                let coupon = this.state.coupon.age;
                age = coupon.split(",");
            }

            if (
                this.state.coupon !== null &&
                this.state.coupon.gender !== null
            ) {
                let genderx = this.state.coupon.gender;
                gender = genderx.split(",");
            }

            if (
                this.state.coupon !== null &&
                this.state.coupon.userType !== null
            ) {
                let userType = this.state.coupon.userType;

                role = userType.split(",");
            }
        }

        return (
            <React.Fragment>
                {/* Title section */}
                <Grid container>
                    <Grid item xs={6}>
                        {/* Title */}
                        <PageTitle
                            menuName="Coupon"
                            title="Coupon create"
                            icon={<ConfirmationNumberIcon />}
                        />
                    </Grid>
                </Grid>

                {/* Loading */}
                <Fade
                    in={this.state.id && !this.state.coupon}
                    style={{
                        transitionDelay: "0ms",
                    }}
                    unmountOnExit
                >
                    <LinearProgress />
                </Fade>

                {/* Form section */}
                <Fade
                    in={isShowForm}
                    style={{
                        transitionDelay: this.state.product ? "400ms" : "0ms",
                    }}
                    unmountOnExit
                >
                    <div className="card mt-20">
                        <form onSubmit={this.onHandleSubmit}>
                            {/* Use coupon */}
                            <Grid
                                container
                                spacing={3}
                                className="align-items-center"
                            >
                                <Grid item md={2} xs={12}>
                                    <h5>
                                        Status{" "}
                                        <span className="text-red">*</span>
                                    </h5>
                                </Grid>
                                <Grid item md={5} xs={12}>
                                    <RadioGroup
                                        row
                                        aria-label="status"
                                        name="status"
                                        defaultValue={
                                            this.state.coupon !== null
                                                ? this.state.coupon.status.toString()
                                                : "true"
                                        }
                                    >
                                        <FormControlLabel
                                            value="true"
                                            control={<Radio />}
                                            label="Use"
                                        />
                                        <FormControlLabel
                                            value="false"
                                            control={<Radio />}
                                            label="Not use"
                                        />
                                    </RadioGroup>
                                </Grid>
                            </Grid>

                            <Divider />
                            <br />

                            {/* Coupon name */}
                            <Grid
                                container
                                spacing={3}
                                className="align-items-center"
                            >
                                <Grid item md={2} xs={12}>
                                    <h5>
                                        Coupon name{" "}
                                        <span className="text-red">*</span>
                                    </h5>
                                </Grid>
                                <Grid item md={5} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Please enter the coupon name"
                                        size="small"
                                        variant="outlined"
                                        name="name"
                                        defaultValue={
                                            this.state.coupon !== null
                                                ? this.state.coupon.name
                                                : null
                                        }
                                        error={this.hasError("name")}
                                        helperText={
                                            this.hasError("name")
                                                ? this.state.errors["name"][0]
                                                : null
                                        }
                                    />
                                </Grid>
                            </Grid>

                            {/* Description */}
                            <Grid
                                container
                                spacing={3}
                                className="align-items-center"
                            >
                                <Grid item md={2} xs={12}>
                                    <h5>
                                        Description{" "}
                                        <span className="text-red">*</span>
                                    </h5>
                                </Grid>
                                <Grid item md={5} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Enter coupon description"
                                        size="small"
                                        variant="outlined"
                                        name="description"
                                        defaultValue={
                                            this.state.coupon !== null
                                                ? this.state.coupon.description
                                                : null
                                        }
                                        error={this.hasError("description")}
                                        helperText={
                                            this.hasError("description")
                                                ? this.state.errors[
                                                      "description"
                                                  ][0]
                                                : null
                                        }
                                    />
                                </Grid>
                            </Grid>

                            {/* Category */}
                            <Grid
                                container
                                spacing={3}
                                className="align-items-center"
                            >
                                <Grid item md={2} xs={12}>
                                    <h5>
                                        Category
                                        {/* <span className="text-red">*</span> */}
                                    </h5>
                                </Grid>

                                {/* First category */}
                                <Grid item md={3} xs={12}>
                                    <FormControl
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        error={this.hasError("categoryId")}
                                    >
                                        <InputLabel id="demo-simple-select-outlined-label">
                                            First category
                                        </InputLabel>
                                        <Select
                                            label="First category"
                                            onChange={this.onChangeCategory.bind(
                                                this
                                            )}
                                            value={
                                                this.state.selectedCategories
                                                    .firstId
                                            }
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {(
                                                this.state.categories.first ||
                                                []
                                            ).map((category, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </MenuItem>
                                            ))}
                                        </Select>

                                        {this.hasError("categoryId") ? (
                                            <FormHelperText>
                                                {
                                                    this.state.errors[
                                                        "categoryId"
                                                    ][0]
                                                }
                                            </FormHelperText>
                                        ) : null}
                                    </FormControl>
                                </Grid>

                                {/* Second category */}
                                <Grid item md={3} xs={12}>
                                    <FormControl
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                    >
                                        <InputLabel id="demo-simple-select-outlined-label">
                                            Second category
                                        </InputLabel>
                                        <Select
                                            label="Second category"
                                            onChange={(e) =>
                                                this.onChangeCategory(e, 1)
                                            }
                                            value={
                                                this.state.selectedCategories
                                                    .secondId
                                            }
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {(
                                                this.state.categories.second.filter(
                                                    (f) =>
                                                        f.parentId ===
                                                        this.state
                                                            .selectedCategories
                                                            .firstId
                                                ) || []
                                            ).map((category, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Third category */}
                                <Grid item md={3} xs={12}>
                                    <FormControl
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                    >
                                        <InputLabel id="demo-simple-select-outlined-label">
                                            Third category
                                        </InputLabel>
                                        <Select
                                            label="Third category"
                                            name="thirdCategory"
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {(
                                                this.state.categories.third.filter(
                                                    (f) =>
                                                        f.parentId ===
                                                        this.state
                                                            .selectedCategories
                                                            .secondId
                                                ) || []
                                            ).map((category, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            {/* Product */}
                            <Grid
                                container
                                spacing={3}
                                className="align-items-center"
                            >
                                <Grid item md={2} xs={12}>
                                    <h5>Product</h5>
                                </Grid>
                                <Grid item xs={0}>
                                    <Checkbox
                                        color="primary"
                                        name="enableProduct"
                                        value={
                                            this.state.coupon !== null
                                                ? this.state.coupon.enableProduct.toString()
                                                : "true"
                                        }
                                        defaultChecked={true}
                                    />
                                </Grid>
                                <Grid item md={4} xs={10}>
                                    <Button
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        color="default"
                                        name="productId"
                                        onClick={this.onProductModal}
                                    >
                                        {/* TODO:db productName 컬럼이 없음 */}
                                        {this.state.selectedProduct[0]
                                            ? this.state.selectedProduct[0].name
                                            : "Select product"}
                                    </Button>
                                </Grid>
                            </Grid>

                            {/* Period */}
                            <Grid
                                container
                                spacing={3}
                                className="align-items-center"
                            >
                                <Grid item md={2} xs={12}>
                                    <h5>
                                        Period{" "}
                                        <span className="text-red">*</span>
                                    </h5>
                                </Grid>
                                <Grid item md={4} xs={5}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        type="date"
                                        name="startDate"
                                        defaultValue={
                                            this.state.coupon !== null
                                                ? this.state.coupon.startDate.substring(
                                                      0,
                                                      10
                                                  )
                                                : null
                                        }
                                        error={this.hasError("startDate")}
                                        helperText={
                                            this.hasError("startDate")
                                                ? this.state.errors[
                                                      "startDate"
                                                  ][0]
                                                : null
                                        }
                                    />
                                </Grid>

                                <Grid
                                    item
                                    md={1}
                                    xs={2}
                                    className="text-center"
                                >
                                    <h5>~</h5>
                                </Grid>

                                <Grid item md={4} xs={5}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        type="date"
                                        name="endDate"
                                        defaultValue={
                                            this.state.coupon !== null
                                                ? this.state.coupon.endDate.substring(
                                                      0,
                                                      10
                                                  )
                                                : null
                                        }
                                        error={this.hasError("endDate")}
                                        helperText={
                                            this.hasError("endDate")
                                                ? this.state.errors[
                                                      "endDate"
                                                  ][0]
                                                : null
                                        }
                                    />
                                </Grid>
                            </Grid>

                            <Divider className="mt-20" />

                            {/* Coupon type */}
                            <Grid
                                container
                                spacing={3}
                                className="align-items-center mt-20"
                            >
                                <Grid item md={2} xs={12}>
                                    <h5>
                                        Coupon type{" "}
                                        <span className="text-red">*</span>
                                    </h5>
                                </Grid>
                                <Grid item md={10} xs={12}>
                                    {/* <FormControl
                    fullWidth
                    component="fieldset"
                    error={this.hasError("discountType")}
                  > */}
                                    <RadioGroup
                                        aria-label="discountType"
                                        name="discountType"
                                        // defaultValue="Free"
                                        defaultValue={
                                            this.state.coupon !== null
                                                ? this.state.coupon.discountType
                                                : "Free"
                                        }
                                    >
                                        <Grid
                                            container
                                            className="align-items-center"
                                        >
                                            <Grid xs={0}>
                                                <Radio value="Percent" />
                                            </Grid>
                                            <Grid xs={2}>
                                                <TextField
                                                    size="small"
                                                    variant="outlined"
                                                    name="percent"
                                                    defaultValue={
                                                        this.state.coupon !==
                                                            null &&
                                                        this.state.coupon
                                                            .discountType ===
                                                            "Percent"
                                                            ? this.state.coupon
                                                                  .discount
                                                            : null
                                                    }
                                                    type="number"
                                                    error={this.hasError(
                                                        "percent"
                                                    )}
                                                />
                                                {this.hasError("percent") ? (
                                                    <FormHelperText>
                                                        {
                                                            this.state.errors[
                                                                "percent"
                                                            ][0]
                                                        }
                                                    </FormHelperText>
                                                ) : null}
                                            </Grid>
                                            <Grid xs={3}>
                                                <FormLabel
                                                    style={{
                                                        paddingLeft: "10px",
                                                    }}
                                                >
                                                    % discount
                                                </FormLabel>
                                            </Grid>
                                        </Grid>

                                        <Grid
                                            container
                                            className="align-items-center"
                                        >
                                            <Grid xs={0}>
                                                <Radio value="Price" />
                                            </Grid>
                                            <Grid xs={2}>
                                                <TextField
                                                    size="small"
                                                    variant="outlined"
                                                    name="price"
                                                    defaultValue={
                                                        this.state.coupon !==
                                                            null &&
                                                        this.state.coupon
                                                            .discountType ===
                                                            "Price"
                                                            ? this.state.coupon
                                                                  .discount
                                                            : null
                                                    }
                                                    type="number"
                                                    error={this.hasError(
                                                        "price"
                                                    )}
                                                />
                                                {this.hasError("price") ? (
                                                    <FormHelperText>
                                                        {
                                                            this.state.errors[
                                                                "price"
                                                            ][0]
                                                        }
                                                    </FormHelperText>
                                                ) : null}
                                            </Grid>
                                            <Grid xs={3}>
                                                <FormLabel
                                                    style={{
                                                        paddingLeft: "10px",
                                                    }}
                                                >
                                                    $ discount
                                                </FormLabel>
                                            </Grid>
                                        </Grid>

                                        <Grid
                                            container
                                            className="align-items-center"
                                        >
                                            <Grid xs={0}>
                                                <Radio value="Free" />
                                            </Grid>
                                            <Grid xs={3}>
                                                <FormLabel
                                                    style={{
                                                        paddingLeft: "10px",
                                                    }}
                                                >
                                                    Free shipping
                                                </FormLabel>
                                            </Grid>
                                        </Grid>
                                    </RadioGroup>
                                    {this.hasError("discountType") ? (
                                        <FormHelperText>
                                            {
                                                this.state.errors[
                                                    "discountType"
                                                ][0]
                                            }
                                        </FormHelperText>
                                    ) : null}
                                    {/* </FormControl> */}
                                </Grid>
                            </Grid>

                            <Divider className="mt-20" />

                            {/* More than */}
                            <Grid
                                container
                                spacing={3}
                                className="align-items-center mt-20"
                            >
                                <Grid item md={2} xs={12}>
                                    <h5>
                                        Options{" "}
                                        <span className="text-red">*</span>
                                    </h5>
                                </Grid>
                                <Grid item md={10} xs={12}>
                                    <RadioGroup
                                        row
                                        aria-label="moreThanType"
                                        name="moreThanType"
                                        // defaultValue="Price"
                                        defaultValue={
                                            this.state.coupon !== null
                                                ? this.state.coupon.moreThanType
                                                : null
                                        }
                                    >
                                        <Grid
                                            container
                                            className="align-items-center"
                                        >
                                            <Grid>
                                                <Radio value="Price" />
                                            </Grid>
                                            <Grid>
                                                <FormLabel
                                                    style={{
                                                        paddingRight: "10px",
                                                    }}
                                                >
                                                    More than $
                                                </FormLabel>
                                            </Grid>
                                            <Grid xs={2}>
                                                <TextField
                                                    size="small"
                                                    variant="outlined"
                                                    name="dollar"
                                                    defaultValue={
                                                        this.state.coupon !==
                                                            null &&
                                                        this.state.coupon
                                                            .moreThanType ===
                                                            "Price"
                                                            ? this.state.coupon
                                                                  .moreThan
                                                            : null
                                                    }
                                                    type="number"
                                                    error={this.hasError(
                                                        "dollar"
                                                    )}
                                                />
                                                {this.hasError("dollar") ? (
                                                    <FormHelperText>
                                                        {
                                                            this.state.errors[
                                                                "dollar"
                                                            ][0]
                                                        }
                                                    </FormHelperText>
                                                ) : null}
                                            </Grid>
                                            <Grid xs={2}>
                                                <FormLabel
                                                    style={{
                                                        paddingLeft: "10px",
                                                    }}
                                                >
                                                    purchase
                                                </FormLabel>
                                            </Grid>

                                            <Grid>
                                                <Radio value="Weight" />
                                            </Grid>
                                            <Grid>
                                                <FormLabel
                                                    style={{
                                                        paddingRight: "10px",
                                                    }}
                                                >
                                                    More than
                                                </FormLabel>
                                            </Grid>
                                            <Grid xs={2}>
                                                <TextField
                                                    size="small"
                                                    variant="outlined"
                                                    name="gram"
                                                    defaultValue={
                                                        this.state.coupon !==
                                                            null &&
                                                        this.state.coupon
                                                            .moreThanType ===
                                                            "Weight"
                                                            ? this.state.coupon
                                                                  .moreThan
                                                            : null
                                                    }
                                                    type="number"
                                                    error={this.hasError(
                                                        "gram"
                                                    )}
                                                />
                                                {this.hasError("gram") ? (
                                                    <FormHelperText>
                                                        {
                                                            this.state.errors[
                                                                "gram"
                                                            ][0]
                                                        }
                                                    </FormHelperText>
                                                ) : null}
                                            </Grid>
                                            <Grid>
                                                <FormLabel
                                                    style={{
                                                        paddingLeft: "10px",
                                                    }}
                                                >
                                                    g purchase
                                                </FormLabel>
                                            </Grid>
                                        </Grid>
                                    </RadioGroup>
                                </Grid>
                            </Grid>

                            <Divider className="mt-20" />

                            {/* Target */}
                            <Grid
                                container
                                spacing={3}
                                className="align-items-center mt-20"
                            >
                                <Grid item md={2} xs={12}>
                                    <h5>Coupon recipient</h5>
                                </Grid>
                                <Grid item md={10} xs={12}>
                                    <Grid container>
                                        <Grid item md={6} xs={12}>
                                            <Grid container>
                                                <Grid>
                                                    <FormControlLabel
                                                        control={
                                                            this.state
                                                                .coupon !==
                                                                null &&
                                                            role.find(
                                                                (element) =>
                                                                    element ===
                                                                    "A"
                                                            ) === "A" ? (
                                                                <Checkbox
                                                                    name="userType"
                                                                    value="A"
                                                                    checked
                                                                />
                                                            ) : (
                                                                <Checkbox
                                                                    name="userType"
                                                                    value="A"
                                                                />
                                                            )
                                                        }
                                                        label="A"
                                                    />
                                                </Grid>
                                                <Grid>
                                                    <FormControlLabel
                                                        control={
                                                            this.state
                                                                .coupon !==
                                                                null &&
                                                            role.find(
                                                                (element) =>
                                                                    element ===
                                                                    "B"
                                                            ) === "B" ? (
                                                                <Checkbox
                                                                    name="userType"
                                                                    value="B"
                                                                    checked
                                                                />
                                                            ) : (
                                                                <Checkbox
                                                                    name="userType"
                                                                    value="B"
                                                                />
                                                            )
                                                        }
                                                        label="B"
                                                    />
                                                </Grid>
                                                <Grid>
                                                    <FormControlLabel
                                                        control={
                                                            this.state
                                                                .coupon !==
                                                                null &&
                                                            role.find(
                                                                (element) =>
                                                                    element ===
                                                                    "C"
                                                            ) === "C" ? (
                                                                <Checkbox
                                                                    name="userType"
                                                                    value="C"
                                                                    checked
                                                                />
                                                            ) : (
                                                                <Checkbox
                                                                    name="userType"
                                                                    value="C"
                                                                />
                                                            )
                                                        }
                                                        label="C"
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid container>
                                                <Grid>
                                                    <FormControlLabel
                                                        control={
                                                            this.state
                                                                .coupon !==
                                                                null &&
                                                            gender.find(
                                                                (element) =>
                                                                    element ===
                                                                    "M"
                                                            ) === "M" ? (
                                                                <Checkbox
                                                                    name="gender"
                                                                    value="M"
                                                                    checked
                                                                />
                                                            ) : (
                                                                <Checkbox
                                                                    name="gender"
                                                                    value="M"
                                                                />
                                                            )
                                                        }
                                                        label="Male"
                                                    />
                                                </Grid>
                                                <Grid>
                                                    <FormControlLabel
                                                        control={
                                                            this.state
                                                                .coupon !==
                                                                null &&
                                                            gender.find(
                                                                (element) =>
                                                                    element ===
                                                                    "F"
                                                            ) === "F" ? (
                                                                <Checkbox
                                                                    name="gender"
                                                                    value="F"
                                                                    checked
                                                                />
                                                            ) : (
                                                                <Checkbox
                                                                    name="gender"
                                                                    value="F"
                                                                />
                                                            )
                                                        }
                                                        label="Female"
                                                    />
                                                </Grid>
                                                <Grid>
                                                    <FormControlLabel
                                                        control={
                                                            this.state
                                                                .coupon !==
                                                                null &&
                                                            gender.find(
                                                                (element) =>
                                                                    element ===
                                                                    "X"
                                                            ) === "X" ? (
                                                                <Checkbox
                                                                    name="gender"
                                                                    value="X"
                                                                    checked
                                                                />
                                                            ) : (
                                                                <Checkbox
                                                                    name="gender"
                                                                    value="X"
                                                                />
                                                            )
                                                        }
                                                        label="Other"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <Grid container>
                                                <Grid>
                                                    <FormControlLabel
                                                        control={
                                                            this.state
                                                                .coupon !==
                                                                null &&
                                                            age.find(
                                                                (element) =>
                                                                    element ===
                                                                    "10"
                                                            ) === "10" ? (
                                                                <Checkbox
                                                                    name="age"
                                                                    value="10"
                                                                    checked
                                                                />
                                                            ) : (
                                                                <Checkbox
                                                                    name="age"
                                                                    value="10"
                                                                />
                                                            )
                                                        }
                                                        label="10 yrs"
                                                    />
                                                </Grid>
                                                <Grid>
                                                    <FormControlLabel
                                                        control={
                                                            this.state
                                                                .coupon !==
                                                                null &&
                                                            age.find(
                                                                (element) =>
                                                                    element ===
                                                                    "20"
                                                            ) === "20" ? (
                                                                <Checkbox
                                                                    name="age"
                                                                    value="20"
                                                                    checked
                                                                />
                                                            ) : (
                                                                <Checkbox
                                                                    name="age"
                                                                    value="20"
                                                                />
                                                            )
                                                        }
                                                        label="20 yrs"
                                                    />
                                                </Grid>
                                                <Grid>
                                                    <FormControlLabel
                                                        control={
                                                            this.state
                                                                .coupon !==
                                                                null &&
                                                            age.find(
                                                                (element) =>
                                                                    element ===
                                                                    "30"
                                                            ) === "30" ? (
                                                                <Checkbox
                                                                    name="age"
                                                                    value="30"
                                                                    checked
                                                                />
                                                            ) : (
                                                                <Checkbox
                                                                    name="age"
                                                                    value="30"
                                                                />
                                                            )
                                                        }
                                                        label="30 yrs"
                                                    />
                                                </Grid>
                                                <Grid>
                                                    <FormControlLabel
                                                        control={
                                                            this.state
                                                                .coupon !==
                                                                null &&
                                                            age.find(
                                                                (element) =>
                                                                    element ===
                                                                    "10"
                                                            ) === "40" ? (
                                                                <Checkbox
                                                                    name="age"
                                                                    value="40"
                                                                    checked
                                                                />
                                                            ) : (
                                                                <Checkbox
                                                                    name="age"
                                                                    value="40"
                                                                />
                                                            )
                                                        }
                                                        label="40 yrs"
                                                    />
                                                </Grid>
                                                <Grid>
                                                    <FormControlLabel
                                                        control={
                                                            this.state
                                                                .coupon !==
                                                                null &&
                                                            age.find(
                                                                (element) =>
                                                                    element ===
                                                                    "50"
                                                            ) === "50" ? (
                                                                <Checkbox
                                                                    name="age"
                                                                    value="50"
                                                                    checked
                                                                />
                                                            ) : (
                                                                <Checkbox
                                                                    name="age"
                                                                    value="50"
                                                                />
                                                            )
                                                        }
                                                        label="50 yrs"
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid
                                                container
                                                className="align-items-center"
                                            >
                                                <Grid>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                color="primary"
                                                                name="enablePurchaseProduct"
                                                                value={
                                                                    this.state
                                                                        .coupon !==
                                                                    null
                                                                        ? this
                                                                              .state
                                                                              .coupon
                                                                              .enablePurchaseProduct
                                                                        : true
                                                                }
                                                                defaultChecked={
                                                                    true
                                                                }
                                                            />
                                                        }
                                                    />
                                                </Grid>
                                                <Grid>
                                                    <Button
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined"
                                                        color="default"
                                                        name="purchaseProductId"
                                                        onClick={
                                                            this
                                                                .onPurchaseProductModal
                                                        }
                                                    >
                                                        {this.state
                                                            .selectedPurchaseProduct[0]
                                                            ? this.state
                                                                  .selectedPurchaseProduct[0]
                                                                  .name
                                                            : "Select product"}
                                                    </Button>
                                                </Grid>
                                                <Grid>
                                                    <FormLabel
                                                        style={{
                                                            paddingLeft: "10px",
                                                        }}
                                                    >
                                                        Members who have
                                                        purchased
                                                    </FormLabel>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        container
                                        className="align-items-center"
                                    >
                                        <Grid>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        color="primary"
                                                        name="enableUser"
                                                        value={true}
                                                        defaultChecked={true}
                                                    />
                                                }
                                            />
                                        </Grid>
                                        <Grid>
                                            <Button
                                                fullWidth
                                                size="small"
                                                variant="outlined"
                                                color="default"
                                                name="userId"
                                                onClick={this.onMemberModal}
                                            >
                                                {this.state.selectedMember[0]
                                                    ? this.state
                                                          .selectedMember[0]
                                                          .name
                                                    : "Select member"}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Divider className="mt-20" />

                            <Grid
                                container
                                spacing={3}
                                className="align-items-center mt-20"
                            >
                                <Grid item md={2} xs={12}>
                                    <h5>
                                        Code
                                        {/* <span className="text-red">*</span> */}
                                    </h5>
                                </Grid>
                                <Grid item md={5} xs={12}>
                                    <Grid
                                        container
                                        className="align-items-center"
                                    >
                                        <Grid>
                                            <RadioGroup
                                                row
                                                aria-label="status"
                                                name="use"
                                                defaultValue={
                                                    this.state.coupon !== null
                                                        ? this.state.coupon.isUse.toString()
                                                        : "true"
                                                }
                                            >
                                                <FormControlLabel
                                                    value="true"
                                                    control={<Radio />}
                                                    label="Use"
                                                />
                                                <FormControlLabel
                                                    value="false"
                                                    control={<Radio />}
                                                    label="Not use"
                                                />
                                            </RadioGroup>
                                        </Grid>
                                        <Grid>
                                            <TextField
                                                size="small"
                                                variant="outlined"
                                                name="code"
                                                defaultValue={
                                                    this.state.coupon !== null
                                                        ? this.state.coupon.code
                                                        : null
                                                }
                                                type="text"
                                                error={this.hasError("code")}
                                            />
                                            {this.hasError("code") ? (
                                                <FormHelperText>
                                                    {
                                                        this.state.errors[
                                                            "code"
                                                        ][0]
                                                    }
                                                </FormHelperText>
                                            ) : null}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Limitation*/}
                            <Grid
                                container
                                spacing={3}
                                className="align-items-center"
                            >
                                <Grid item md={2} xs={12}>
                                    <h5>Limitation</h5>
                                </Grid>
                                <Grid item md={5} xs={12}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        label="Limitation"
                                        placeholder="Please enter the limitation(Nubmer)"
                                        size="small"
                                        variant="outlined"
                                        name="limitation"
                                        defaultValue={
                                            this.state.coupon !== null
                                                ? this.state.coupon.limitation
                                                : null
                                        }
                                        error={this.hasError("limitation")}
                                        helperText={
                                            this.hasError("limitation")
                                                ? this.state.errors[
                                                      "limitation"
                                                  ][0]
                                                : null
                                        }
                                    />
                                </Grid>
                            </Grid>

                            {/* Button section */}
                            <Divider className="mt-20" />

                            <Grid container wrap="wrap" className="mt-20">
                                <Grid item md={4}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="primary"
                                        type="submit"
                                        disabled={this.state.isProcessing}
                                        startIcon={
                                            this.state.isProcessing ? (
                                                <CircularProgress
                                                    color="white"
                                                    size="1rem"
                                                />
                                            ) : (
                                                <SaveIcon
                                                    fontSize="small"
                                                    className="mr-10"
                                                />
                                            )
                                        }
                                    >
                                        {this.state.id ? "UPDATE" : "CREATE"}
                                    </Button>

                                    <Link to="/settings/operation/coupon">
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="default"
                                            className="ml-20 bordered"
                                        >
                                            Cancel
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Fade>

                {/* Product */}
                <Dialog
                    open={this.state.selectedProductModal}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth="lg"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Select product"}
                    </DialogTitle>
                    <DialogContent>
                        <form
                            id="form-product"
                            onSubmit={this.onProductSubmit.bind(this)}
                        >
                            <Product />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            autoFocus
                            onClick={this.onProductModal}
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button
                            form="form-product"
                            type="submit"
                            color="primary"
                            autoFocus
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Purchase Product */}
                <Dialog
                    open={this.state.selectedPurchaseProductModal}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth="lg"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Select product"}
                    </DialogTitle>
                    <DialogContent>
                        <form
                            id="form-purchase-product"
                            onSubmit={this.onPurchaseProductSubmit.bind(this)}
                        >
                            <Product />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            autoFocus
                            onClick={this.onPurchaseProductModal}
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button
                            form="form-purchase-product"
                            type="submit"
                            color="primary"
                            autoFocus
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Member */}
                <Dialog
                    open={this.state.selectedMemberModal}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth="lg"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Select member"}
                    </DialogTitle>
                    <DialogContent>
                        <form
                            id="form-member"
                            onSubmit={this.onMemberSubmit.bind(this)}
                        >
                            <Member />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            autoFocus
                            onClick={this.onMemberModal}
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button
                            form="form-member"
                            type="submit"
                            color="primary"
                            autoFocus
                        >
                            Confirm
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

export default withSnackbar(connect(mapStateToProps, null)(Coupon));
