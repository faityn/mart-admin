import React from "react";
import SwipeableViews from "react-swipeable-views";
import Basic from "./Basic";
import Detail from "./Detail";
import Option from "./Option";
import Condition from "./Condition";
import Search from "./Search";
import SampleForm from './sample.xlsx';
import Confirmation from "./Confirmation";
import PageTitle from "../../../core/common/Partials/PageTitle";
import { SAVE_PRODUCT, PRODUCT } from "../../Queries/Product";
import { GET_SELLER_POLICY } from "../../Settings/Seller/Queries";
import {
    Divider,
    Grid,
    Button,
    LinearProgress,
    Tabs,
    Tab,
    CircularProgress,
    InputLabel,
    FormControl,
    FormControlLabel,
    Select,
    MenuItem,
    Radio,
    RadioGroup,
    Input,
} from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import { withSnackbar } from "notistack";
import validate from "validate.js";
import { connect } from "react-redux";
import StorefrontIcon from "@material-ui/icons/Storefront";
import SaveIcon from "@material-ui/icons/Save";
import TableIcon from "@material-ui/icons/ViewModule";
import CodeIcon from "@material-ui/icons/List";
import UploadIcon from "@material-ui/icons/CloudUpload";
import SearchIcon from "@material-ui/icons/Search";
import ResetIcon from "@material-ui/icons/Refresh";

/**
 * @summary Product form
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Product
 */
class Form extends React.Component {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        // state
        this.state = {
            tabIndex: 0,
            id: this.props.match.params.id,
            product: null,
            isProcessing: false,
            errors: null,
            sellerPolicyMessage: "",
            description: null,
            isSingleProduct: true,
            isMultipleProduct: false,
        };

        // Events
        this.onChangeTab = this.onChangeTab.bind(this);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
        this.onProcessStart = this.onProcessStart.bind(this);
        this.onProcessEnd = this.onProcessEnd.bind(this);
        this.hasError = this.hasError.bind(this);
        this.onChangeQuillDescription = this.onChangeQuillDescription.bind(this);
        this.onChangeToSingleProduct = this.onChangeToSingleProduct.bind(this);    
        this.onChangeToMultipleProduct = this.onChangeToMultipleProduct.bind(this);   

        this._isMounted = false;
    }

    /**
     * @override
     */
    async componentDidMount() {
        this._isMounted = true;

        if (this.state.id) {
            await this.props.apolloClient.httpClient
                .query({
                    query: PRODUCT,
                    variables: {
                        id: this.state.id,
                        affiliateLink: "",
                    },
                })
                .then((result) => {
                    this.setState({
                        product: result.data.product,
                        description: result.data.product.info.description,
                    });
                })
                .catch((error) => {
                    this.props.enqueueSnackbar(
                        "Sorry, there is an error occurred while fetching data.",
                        { variant: "error" }
                    );
                });
        }

        const user = JSON.parse(
            localStorage.getItem(process.env.REACT_LOGGED_USER)
        );

        if (user.roleName === "ROLE_SELLER") {
            // Seller policy
            await this.props.apolloClient.httpClient
                .query({
                    query: GET_SELLER_POLICY,
                })
                .then((result) => {
                    this.setState({
                        sellerPolicyMessage: result.data.getSellerPolicy,
                    });
                })
                .catch((error) => {});
        }
    }

    /**
     * @override
     */
    componentWillUnmount() {
        this._isMounted = false;
    }

    /**
     * @summary Change tab
     * @param {MouseEvent} event
     * @param {int} newValue
     */
    onChangeTab(event, index) {
        event.stopPropagation();

        this.setState({
            tabIndex: index,
        });
    }

    /**
     * @summary Tab attributes
     * @param {int} index
     */
    tabProps(index) {
        return {
            id: `full-width-tab-${index}`,
            "aria-controls": `full-width-tabpanel-${index}`,
        };
    }

    /**
     * @summary Process start
     */
    onProcessStart() {
        this.setState({
            isProcessing: true,
        });
    }

    /**
     * @summary Process end
     */
    onProcessEnd() {
        this.setState({
            isProcessing: false,
        });
    }

    onChangeToSingleProduct() {
        this.setState({isSingleProduct: true});
        this.setState({isMultipleProduct: false});
    }

    onChangeToMultipleProduct() {
        this.setState({isMultipleProduct: true});
        this.setState({isSingleProduct: false});
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
            "info.firstCategory": {
                presence: {
                    allowEmpty: false,
                    message: "^??????????????? ??????????????????.",
                },
            },
            "info.sku": {
                presence: {
                    allowEmpty: false,
                    message: "^SKU??? ??????????????????.",
                },
                length: {
                    maximum: 64,
                    message: "^64?????? ?????? ???????????? ??????????????????.",
                },
                format: {
                    pattern: '^["A-Za-z0-9~!@#$%^&*()_+-]*$',
                    message: "^????????? ???????????????.",
                },
            },
            "info.name": {
                presence: {
                    allowEmpty: false,
                    message: "^???????????? ??????????????????.",
                },
                length: {
                    maximum: 255,
                    message: "^Maximum length should be 255.",
                },
            },
            // "info.nameEng": {
            //   length: {
            //     maximum: 255,
            //     message: "^Maximum length should be 255.",
            //   },
            // },
            "info.price": {
                presence: {
                    allowEmpty: false,
                    message: "^????????? ??????????????????.",
                },
                numericality: {
                    greaterThan: 0,
                    lessThanOrEqualTo: 1000000000,
                    message:
                        "^Should be greater than zero or less than one billion.",
                },
            },
            "info.inventory": {
                presence: {
                    allowEmpty: false,
                    message: "^????????? ??????????????????.",
                },
                // numericality: {
                //   greaterThan: 0,
                //   lessThanOrEqualTo: 1000000,
                //   message: "^Should be greater than zero or less than one million.",
                // },
            },
            "info.width": {
                presence: {
                    allowEmpty: false,
                    message: "^????????? ??????????????????.",
                },
                numericality: {
                    greaterThanOrEqualTo: 0,
                    lessThanOrEqualTo: 10000,
                    message:
                        "^Should be greater than or equal to zero or less than ten thousand.",
                },
            },
            "info.length": {
                presence: {
                    allowEmpty: false,
                    message: "^????????? ??????????????????.",
                },
                numericality: {
                    greaterThanOrEqualTo: 0,
                    lessThanOrEqualTo: 10000,
                    message:
                        "^Should be greater than or equal to zero or less than ten thousand.",
                },
            },
            "info.height": {
                presence: {
                    allowEmpty: false,
                    message: "^????????? ??????????????????.",
                },
                numericality: {
                    greaterThanOrEqualTo: 0,
                    lessThanOrEqualTo: 10000,
                    message:
                        "^Should be greater than or equal to zero or less than ten thousand.",
                },
            },
            "info.weight": {
                presence: {
                    allowEmpty: false,
                    message: "^???????????? ??????????????????.",
                },
                numericality: {
                    greaterThan: 0,
                    lessThanOrEqualTo: 100000,
                    message:
                        "^Should be greater than zero or less than one hundred thousand.",
                },
            },
            "info.ean": {
                presence: {
                    allowEmpty: false,
                    message: "^EAN??? ??????????????????.",
                },
                length: {
                    maximum: 13,
                    message: "^13 ?????? ???????????? ??????????????????.",
                },
                format: {
                    pattern: "^[0-9]*$",
                    message: "^????????? ?????????????????????.",
                },
            },
            "info.brand": {
                presence: {
                    allowEmpty: false,
                    message: "^??????????????? ??????????????????.",
                },
                length: {
                    maximum: 32,
                    message: "^32 ?????? ???????????? ??????????????????.",
                },
            },
        };

        const schemaSeller = {
            "info.firstCategory": {
                presence: {
                    allowEmpty: false,
                    message: "^??????????????? ??????????????????.",
                },
            },
            "info.sku": {
                presence: {
                    allowEmpty: false,
                    message: "^SKU??? ??????????????????.",
                },
                length: {
                    maximum: 64,
                    message: "^64 ???????????? ????????? ??????????????????",
                },
                format: {
                    pattern: '^["A-Za-z0-9~!@#$%^&*()_+-]*$',
                    message: "^????????? ???????????? ????????????",
                },
            },
            "info.name": {
                presence: {
                    allowEmpty: false,
                    message: "^???????????? ??????????????????.",
                },
                length: {
                    maximum: 255,
                    message: "^Maximum length should be 255.",
                },
            },
            // "info.nameEng": {
            //   length: {
            //     maximum: 255,
            //     message: "^Maximum length should be 255.",
            //   },
            // },
            "info.width": {
                presence: {
                    allowEmpty: false,
                    message: "^????????? ??????????????????.",
                },
                numericality: {
                    greaterThanOrEqualTo: 0,
                    lessThanOrEqualTo: 10000,
                    message:
                        "^Should be greater than or equal to zero or less than ten thousand.",
                },
            },
            "info.length": {
                presence: {
                    allowEmpty: false,
                    message: "^????????? ??????????????????.",
                },
                numericality: {
                    greaterThanOrEqualTo: 0,
                    lessThanOrEqualTo: 10000,
                    message:
                        "^Should be greater than or equal to zero or less than ten thousand.",
                },
            },
            "info.height": {
                presence: {
                    allowEmpty: false,
                    message: "^????????? ??????????????????.",
                },
                numericality: {
                    greaterThanOrEqualTo: 0,
                    lessThanOrEqualTo: 10000,
                    message:
                        "^Should be greater than or equal to zero or less than ten thousand.",
                },
            },
            "info.weight": {
                presence: {
                    allowEmpty: false,
                    message: "^??? ????????? ??????????????????.",
                },
                numericality: {
                    greaterThan: 0,
                    lessThanOrEqualTo: 100000,
                    message:
                        "^Should be greater than zero or less than one hundred thousand.",
                },
            },
            "info.ean": {
                presence: {
                    allowEmpty: false,
                    message: "^EAN??? ??????????????????.",
                },
                length: {
                    maximum: 13,
                    message: "^13?????? ???????????? ??????????????????.",
                },
                format: {
                    pattern: "^[0-9]*$",
                    message: "^????????? ?????????????????????.",
                },
            },
            "info.brand": {
                presence: {
                    allowEmpty: false,
                    message: "^????????? ?????? ??????????????????.",
                },
                length: {
                    maximum: 32,
                    message: "^Maximum length should be 32.",
                },
            },
        };

        // ROLE SELLER
        const user = JSON.parse(
            localStorage.getItem(process.env.REACT_LOGGED_USER)
        );

        // Validate
        const errors =
            user.roleName === "ROLE_SELLER"
                ? validate(product, schemaSeller)
                : validate(product, schema);

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
        let imageData =
            formData.get("fileOrLink") === "file"
                ? formData.getAll("images")
                : formData.getAll("links");
        let images = [];
        (imageData || []).map((image) => {
            if (!image) return true;

            images.push({
                imageUrl: image,
            });

            return true;
        });

        // Attachments
        let attachments = [];
        (formData.getAll("attachments") || []).map((attachment) => {
            if (!attachment) return true;

            attachments.push({
                fileUrl: attachment,
            });

            return true;
        });

        // External links
        let externalLinks = [];
        let externalUrl = formData.getAll("externalUrl");
        (formData.getAll("externalNames") || []).map((name, index) => {
            if (!name) return true;

            externalLinks.push({
                name: name,
                url: externalUrl[index],
            });

            return true;
        });

        let shortDescription = formData.getAll("shortDescription");
        shortDescription = shortDescription
            ? "<li>" + shortDescription.join("</li><li>") + "</li>"
            : "";
        shortDescription = shortDescription.replace(/<li><\/li>/g, "");

        // ROLE SELLER
        const user = JSON.parse(
            localStorage.getItem(process.env.REACT_LOGGED_USER)
        );
        let price =
            user.roleName === "ROLE_SELLER" &&
            this.props.match.url === "/product/create"
                ? 0.0
                : parseFloat(formData.get("price"));
        let inventory =
            user.roleName === "ROLE_SELLER" &&
            this.props.match.url === "/product/create"
                ? 0
                : parseInt(formData.get("inventory"));
        // if (user.roleName === "ROLE_SELLER") {
        //     price = 0.0;
        //     inventory = 0;
        // }
        // if (this.props.url === "/product/create") {
        //     price = 0.0;
        //     inventory = 0;
        // }

        // Premium service
        let productPremiumServices = [];
        if (user.roleName === "ROLE_SELLER") {
            formData.getAll("premiumService").map((item) => {
                let service = {};
                service["field1"] = item;
                productPremiumServices.push(service);
            });
        }

        // Form data to object
        let product = {
            info: {
                id: formData.get("id"),
                firstCategory: formData.get("firstCategory"),
                secondCategory: formData.get("secondCategory"),
                thirdCategory: formData.get("thirdCategory"),
                name: formData.get("name"),
                isHideName: formData.get("isHideName") === "true",
                nameEng: null,
                // nameEng: null,
                // isHideNameEng: formData.get("isHideNameEng") === "true",
                isHideNameEng: false,
                sku: formData.get("sku"),
                isDisplay:
                    user.roleName === "ROLE_SELLER" &&
                    this.props.match.url !== "/product/create" && this.state.product.info.status !== "DECLINED"
                        ? true
                        : formData.get("isDisplay") === "true",
                price:
                    user.roleName === "ROLE_SELLER" &&
                    this.props.match.url !== "/product/create"
                        ? this.state.product.info.price
                        : price,
                inventory:
                    user.roleName === "ROLE_SELLER" &&
                    this.props.match.url !== "/product/create"
                        ? this.state.product.info.inventory
                        : inventory,
                width: parseFloat(formData.get("width")),
                length: parseFloat(formData.get("length")),
                height: parseFloat(formData.get("height")),
                weight: parseFloat(formData.get("weight")),
                shortDescription: shortDescription,
                // description: formData.get("description"),
                description: this.state.description,
                registerDate: formData.get("registerDate")
                    ? formData.get("registerDate")
                    : null,
                isAutomaticDate:
                    formData.get("isAutomaticDate") === "automatic",
                manufacturer: formData.get("manufacturer"),
                releaseDate: formData.get("releaseDate")
                    ? formData.get("releaseDate")
                    : null,
                brand: formData.get("brand"),
                ean: formData.get("ean"),
            },
            images: images,
            attachments: attachments,
            externalLinks: externalLinks,
            premiumServices: productPremiumServices,
        };

        // Validate
        if (this.onValidateSubmit(product)) return;

        this.onProcessStart();

        this.props.enqueueSnackbar("The saving process is being started ...", {
            variant: "info",
        });

        let id = this.state.id;

        // Mutate
        await this.props.apolloClient.httpClient
            .mutate({
                mutation: SAVE_PRODUCT,
                variables: {
                    product: product,
                },
            })
            .then((result) => {
                if (result.data.saveProduct.statusCode === 200) {
                    const message = id
                        ? "Product has been successfully updated."
                        : "Product has been successfully created.";
                    this.props.enqueueSnackbar(message, { variant: "success" });
                    this.props.history.goBack();

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
                id: id,
            });
    }

    onChangeQuillDescription(value) {
        this.setState({
            description: value,
        });
    }
      
    render() {
        let isShowForm = !this.state.id || this.state.product;

        // ROLE SELLER
        const user = JSON.parse(
            localStorage.getItem(process.env.REACT_LOGGED_USER)
        );

        return (
            <React.Fragment>
                {/* Title section */}
                <Grid container>
                    <Grid item xs={6}>
                        {/* Title */}
                        <PageTitle
                            menuName="??????"
                            links={[
                                { name: "??????", href: "/products" },
                            ]}
                            title="????????????"
                            icon={<StorefrontIcon />}
                        />
                    </Grid>
                </Grid>

                {/* Loading */}
                <Fade
                    in={this.state.id && !this.state.product}
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
                            <input
                                type="hidden"
                                name="id"
                                value={this.state.id}
                            />
                            <Grid container md={12} xs={12}>
                                <Grid item md={2} xs={12} style={{paddingTop: "10px"}}>
                                    <InputLabel>?????? ???????????? ????????????</InputLabel>
                                </Grid>
                                <Grid item md={1} xs={12}>
                                    <RadioGroup aria-label="file" name="file">
                                        <FormControlLabel
                                            value="true"
                                            control={<Radio />}
                                            label="??????"
                                            checked={this.state.isSingleProduct === true}
                                            onChange={this.onChangeToSingleProduct.bind(this)}
                                        />
                                    </RadioGroup>
                                </Grid>
                                <Grid item md={1} xs={12}>
                                    <RadioGroup aria-label="file" name="file">
                                        <FormControlLabel
                                            value="false"
                                            control={<Radio />}
                                            label="??????"
                                            checked={this.state.isMultipleProduct === true}
                                            onChange={this.onChangeToMultipleProduct.bind(this)}
                                        />
                                    </RadioGroup>
                                </Grid>
                            </Grid>
                            {this.state.isSingleProduct === true ? (
                                <React.Fragment>
                                <Grid container md={12} xs={12} className="mt-20">
                                    <Grid item md={2} xs={12}>
                                        <InputLabel>????????????</InputLabel>
                                    </Grid>
                                    <Grid item md={3} xs={12}>
                                        <FormControl
                                            size="small"
                                            fullWidth
                                            variant="outlined"
                                        >   
                                            <InputLabel>?????? ????????? ????????? ???????????????</InputLabel>
                                            <Select>
                                                <MenuItem value="1">1???</MenuItem>
                                                <MenuItem value="2">2???</MenuItem>
                                                <MenuItem value="3">3???</MenuItem>
                                                <MenuItem value="4">4???</MenuItem>
                                                <MenuItem value="5">5???</MenuItem>
                                                <MenuItem value="6">6???</MenuItem>
                                                <MenuItem value="7">7???</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                
                                <Tabs
                                    textColor="primary"
                                    value={this.state.tabIndex}
                                    onChange={this.onChangeTab}
                                    variant="scrollable"
                                    indicatorColor="primary"
                                    scrollButtons="auto"
                                    className="mt-20"
                                >
                                    <Tab label="??????????????????" {...this.tabProps(0)} />
                                    <Tab label="?????? ??????" {...this.tabProps(1)} />
                                    <Tab label="?????? ????????????" {...this.tabProps(2)} />
                                    <Tab label="??????/?????? ??????" {...this.tabProps(3)} />
                                    <Tab label="????????????" {...this.tabProps(4)} />
                                    <Tab label="??????/?????? ??????" {...this.tabProps(5)} />
                                </Tabs>
                                <Divider />

                                {/* SwipeableViews */}
                                <SwipeableViews index={this.state.tabIndex}>
                                    {/* Basic content */}
                                    <div index={0} className="mt-20">
                                        <Basic
                                            isShowForm={isShowForm}
                                            product={this.state.product}
                                            hasError={this.hasError}
                                            errors={this.state.errors}
                                            checkPremiumService={
                                                this.checkPremiumService
                                            }
                                            premiumServiceRef={
                                                this.premiumServiceRef
                                            }
                                            sellerPolicyMessage={
                                                this.state.sellerPolicyMessage
                                            }
                                            enqueueSnackbar={
                                                this.props.enqueueSnackbar
                                            }
                                            onChangeQuillDescription={
                                                this.onChangeQuillDescription
                                            }
                                            description={this.state.description}
                                        />
                                    </div>

                                    {/* Option content */}
                                    <div index={1} className="mt-20">
                                        <Option
                                            isShowForm={isShowForm}
                                            url={this.props.match.url}
                                            product={this.state.product}
                                            hasError={this.hasError}
                                            errors={this.state.errors}
                                            enqueueSnackbar={
                                                this.props.enqueueSnackbar
                                            }
                                        />
                                    </div>

                                    {/* Detail content */}
                                    <div index={2} className="mt-20">
                                        <Detail
                                            isShowForm={isShowForm}
                                            url={this.props.match.url}
                                            product={this.state.product}
                                            hasError={this.hasError}
                                            errors={this.state.errors}
                                            enqueueSnackbar={
                                                this.props.enqueueSnackbar
                                            }
                                        />
                                    </div>

                                    {/* Condition content */}
                                    <div index={3} className="mt-20">
                                        <Condition
                                            isShowForm={isShowForm}
                                            url={this.props.match.url}
                                            product={this.state.product}
                                            hasError={this.hasError}
                                            errors={this.state.errors}
                                            enqueueSnackbar={
                                                this.props.enqueueSnackbar
                                            }
                                        />
                                    </div>

                                    {/* Search config content */}
                                    <div index={4} className="mt-20">
                                        <Search
                                            isShowForm={isShowForm}
                                            product={this.state.product}
                                            onProcessStart={this.onProcessStart}
                                            onProcessEnd={this.onProcessEnd}
                                            enqueueSnackbar={
                                                this.props.enqueueSnackbar
                                            }
                                        />
                                    </div>

                                    {/* Confirmation content */}
                                    <div
                                        value={this.state.tabIndex}
                                        index={5}
                                        className="mt-20"
                                    >
                                        <Confirmation
                                            isShowForm={isShowForm}
                                            product={this.state.product}
                                            onProcessStart={this.onProcessStart}
                                            onProcessEnd={this.onProcessEnd}
                                            enqueueSnackbar={
                                                this.props.enqueueSnackbar
                                            }
                                            sellerPolicyMessage={
                                                this.state.sellerPolicyMessage
                                            }
                                        />
                                    </div>
                                </SwipeableViews>
                            </React.Fragment>) : (
                            <React.Fragment>
                                <Grid container md={12} xs={12} className="align-items-center mt-20">
                                    <Grid item md={2} xs={12}>
                                        <InputLabel>?????? ????????????</InputLabel>
                                    </Grid>
                                    <Grid item md={2} xs={12}>
                                        <a href={SampleForm} download="????????????.xlsx" target='_blank'>
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"
                                                style={{border: "1px solid #0eb906", color: "#0eb906"}}
                                                startIcon={<TableIcon/>}
                                            >???????????? ????????????</Button>
                                        </a>
                                    </Grid>
                                    <Grid item md={2} xs={12} style={{marginLeft: "1rem"}}>
                                        <Button
                                            fullWidth   
                                            size="medium"
                                            variant="contained"
                                            style={{border: "1px solid #0b81d8", color: "#0b81d8"}}
                                            startIcon={<CodeIcon/>}
                                        >???????????? ?????? ????????????</Button>
                                    </Grid>
                                </Grid>
                                <Grid container md={12} xs={12} className="mt-20 align-items-center">
                                    <Grid item md={2} xs={12}>
                                        <InputLabel>?????? ?????????</InputLabel>
                                    </Grid>
                                    <Grid item md={1} xs={12}>
                                        <label>
                                            <Input accept=".xlsx, .xls" type="file" style={{display: "none"}} />
                                            <Button 
                                                fullWidth
                                                component="span"
                                                size="medium"
                                                variant="contained"
                                                style={{border: "1px solid #0eb906", color: "#0eb906"}}
                                                startIcon={<SearchIcon/>}
                                            >?????? ??????</Button>
                                        </label>
                                    </Grid>
                                    <Grid item md={2} xs={12} style={{marginLeft: "1rem"}}>
                                        <Button
                                            fullWidth
                                            size="medium"
                                            variant="contained"
                                            style={{border: "1px solid #0b81d8", color: "#0b81d8"}}
                                            startIcon={<ResetIcon/>}
                                        >????????? ?????? ?????????</Button>
                                    </Grid>
                                    <Grid item md={2} xs={12} style={{marginLeft: "1rem"}}>
                                        <Button
                                            fullWidth
                                            size="medium"
                                            variant="contained"
                                            color="primary"
                                            startIcon={<UploadIcon/>}
                                        >????????? ??????</Button>
                                    </Grid>
                                </Grid> 
                            </React.Fragment>
                            )} 
                                             
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
                                    >??????</Button>
                                    {/*}
                                    {user.roleName === "ROLE_SELLER" ? null : (
                                        <Link to="/products">
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                color="default"
                                                className="ml-20"
                                            >
                                                LIST
                                            </Button>
                                        </Link>
                                    )} */}
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Fade>
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
