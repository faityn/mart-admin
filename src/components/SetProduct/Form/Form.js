import React from "react";
import {
    Box,
    Card,
    CardContent,
    Grid,
    Divider,
    FormControl,
    TextField,
    OutlinedInput,
    InputLabel,
    Select,
    MenuItem,
    InputAdornment,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    FormControlLabel,
    Checkbox
} from "@material-ui/core";
import PageTitle from "../../../core/common/Partials/PageTitle";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import CategoryIcon from "@material-ui/icons/Category";
import PerfectScrollbar from "react-perfect-scrollbar";
import { GET_SET_PRODUCT, GET_CATEGORIES, SAVE_SET_PRODUCT } from "../Queries";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import validate from "validate.js";
import FindProduct from "./FindProduct";
import { withRouter } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import SelectOne from "./SelectOne";

class SetNewProduct extends React.Component {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        // Merge search states
        this.state = {
            count: null,
            processing: "load",
            mode: "Create",
            code: this.props.match.params.code,
            product: {
                productName: "",
                firstCategory: "",
                secondCategory: "",
                thirdCategory: "",
                firstThemeName: "",
                secondThemeName: "",
                products: [],
            },
            firstThemeVariants: [""],
            secondThemeVariants: [""],
            categories: {
                first: [],
                second: [],
                third: [],
            },
            isOpenModal: false,
						isOpenModalOne: false,
            errors: null,
            useProductImage: false,
        };

        // Events
        this._isMounted = false;
        this.onOpenProductsOpenModal = this.onOpenProductsOpenModal.bind(this);
    }

    /**
     * @summary Check errors
     * @param {String} field
     */
    hasError(field) {
        return this.state.errors && this.state.errors[field] ? true : false;
    }

    /**
     * @override
     */
    async componentDidMount() {
        this._isMounted = true;

        let code, mode;
        if (this.state.code === "new") {
            code = null;
            mode = "Create";
        } else {
            code = this.state.code;
            mode = "Edit";

            // Get product
            this.loadProduct();
        }

        // Create or Edit
        this.setState({
            mode: mode,
            code: code,
        });

        // Load categories
        const { data } = await this.props.apolloClient.httpClient.query({
            query: GET_CATEGORIES,
        });

        if (data) {
            this.setState({
                categories: data.categories,
                processing: "",
            });
        }
    }

    /**
     * @override
     */
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.code != this.props.match.params.code) {
            this.loadProduct();
        }

        if (prevState.code !== this.state.code) {
            if (this.state.code)
                this.props.history.push("/setproduct/form/" + this.state.code);
        }
    }

    /**
     * @override
     */
    componentWillUnmount() {
        this._isMounted = false;
    }

    /**
     * @summary Load product
     */
    async loadProduct() {
        // Get product
        await this.props.apolloClient.httpClient
            .query({
                query: GET_SET_PRODUCT,
                variables: {
                    code: this.state.code,
                },
            })
            .then((result) => {
                // Collect unique variant names
                const uniqueFirstThemeVariants = [];
                const uniqueSecondThemeVariants = [];
                result.data.getProductsOfSet.products.map((product) => {
                    if (
                        uniqueFirstThemeVariants.indexOf(product.firstTheme) ===
                        -1
                    ) {
                        uniqueFirstThemeVariants.push(product.firstTheme);
                    }
                    if (
                        uniqueSecondThemeVariants.indexOf(
                            product.secondTheme
                        ) === -1
                    ) {
                        uniqueSecondThemeVariants.push(product.secondTheme);
                    }
                });

                this.setState({
                    product: result.data.getProductsOfSet,
                    firstThemeVariants: uniqueFirstThemeVariants,
                    secondThemeVariants: uniqueSecondThemeVariants,
                    processing: "",
										useProductImage: result.data.getProductsOfSet.isImageSecondTheme
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
     * @summary Change variant
     * @param {MouseEvent} event
     */
    handleVariant(event, theme) {
        event.preventDefault();
    }

    /**
     * @summary SearchByCategory
     * @param {MouseEvent} event
     */
    handleCategory(event, level) {
        event.preventDefault();

        let product = this.state.product;

        if (level === 1) {
            if (event.target.value) {
                product["secondCategory"] = event.target.value;
            }
        } else if (level === 2) {
            product["thirdCategory"] = event.target.value;
        } else {
            if (event.target.value) {
                product["firstCategory"] = event.target.value;
            } else {
                product["firstCategory"] = null;
                product["secondCategory"] = null;
                product["thirdCategory"] = null;
            }
        }

        this.setState({
            product: product,
        });
    }

    updateFirstThemeName(event) {
        let product = this.state.product;
        product["firstThemeName"] = event.target.value;

        this.setState({
            product: product,
        });
    }

    updateSecondThemeName(event) {
        let product = this.state.product;
        product["secondThemeName"] = event.target.value;

        this.setState({
            product: product,
        });
    }

    saveFirstVariantData(event, index) {
        let variants = this.state.firstThemeVariants;
        let value = event.target.value;
        variants[index] = value;

        this.setState({
            firstThemeVariants: variants,
        });
    }

    saveSecondVariantData(event, index) {
        let variants = this.state.secondThemeVariants;
        let value = event.target.value;
        variants[index] = value;

        this.setState({
            secondThemeVariants: variants,
        });
    }

    /**
     * @summary Open box
     * @param {event}
     */
    onOpenModal(e, index) {
        this.setState({
            count: "single",
            isOpenModal: true,
            openIndex: index,
        });
    }

		/**
     * @summary Open box
     * @param {event}
     */
		 onOpenModalOne(e, index) {
			this.setState({
					isOpenModalOne: true,
					openIndex: index,
			});
		}

    onOpenProductsOpenModal(e) {
        this.setState({
            count: "multlple",
            isOpenModal: true,
        });
    }

    /**
     * @summary Close box
     * @param {event}
     */
    onCloseModal() {
			this.setState({ isOpenModal: false });
    }

		/**
     * @summary Close box
     * @param {event}
     */
		 onCloseModalOne() {
			this.setState({ isOpenModalOne: false });
    }

    /**
     * @summary Product list form submit
     */
    onSubmitProductForm(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        let productId = formData.get("productId");
        let productIds = formData.getAll("productId");
        let product = this.state.product;

				(productIds || []).map((id) => {
					if (!product.products.find((f) => f.productId === id))
							product.products.push({
									productId: id,
									sku: formData.get(id),
							});
				});
				this.setState({
						product: product,
						isOpenModal: false,
				});
    }

		/**
     * @summary Product list form submit
     */
		 onSubmitProductOneForm(event) {

			event.preventDefault();

			const formData = new FormData(event.target);
			let productIds = formData.getAll("productId");
			let product = this.state.product;
			let index = this.state.openIndex;
			
			(productIds || []).map((id) => {
					product.products.splice(index, 1, {
						productId: id,
						sku: formData.get(id),
					});
			});

			this.setState({
				product: product,
				isOpenModalOne: false,
			});

		}

    /**
     * @summary Add product
     * @param {Event} e
     */
    addProduct(e) {
        let product = this.state.product;
        product.products.push({
            productId: null,
            sku: "",
            firstTheme: "",
            secondTheme: "",
        });

        this.setState({
            product: product,
        });
    }

    /**
     * @summary Add variant
     * @param {Event} childrenName
     */
    addFirstVariant(e) {
        this.setState((prevState) => ({
            firstThemeVariants: prevState.firstThemeVariants.concat([""]),
        }));
    }

    /**
     * @summary Add variant
     * @param {Event} childrenName
     */
    addSecondVariant(e) {
        this.setState((prevState) => ({
            secondThemeVariants: prevState.secondThemeVariants.concat([""]),
        }));
    }

    onUseProductImage(e) {
        this.setState({ useProductImage: e.target.checked });
    }

		/**
		 * @summary Remove product
		 * @param {MouseEvent} event
		 */
		 onRemoveProduct(e, index) {
			let product = this.state.product;
			product.products.splice(index, 1);
	
			this.setState({ product: product });
		}

		/**
		 * @summary Delete all products
		 * @param {MouseEvent} event
		 */
		deleteAll(e) {	
			this.setState({ product: [
				{
                    productId: null,
                    sku: "",
                    firstTheme: "",
                    secondTheme: "",
				},
			] 
			});
		}

    /**
     * @summary Validate data
     * @param {Array} productValidation
     */
    onValidateSubmit(productValidation) {
        let schema = {
            productName: {
                presence: {
                    allowEmpty: false,
                    message: "^Product name field is required.",
                },
            },
            firstCategory: {
                presence: {
                    allowEmpty: false,
                    message: "^Category field is required.",
                },
            },
            firstThemeName: {
                presence: {
                    allowEmpty: false,
                    message: "^Theme name field is required.",
                },
            },
            // secondThemeName: {
            //   presence: {
            //     allowEmpty: false,
            //     message: "^Theme name field is required.",
            //   },
            // },
        };

        Object.keys(productValidation.arrayValidations).map((key) => {
            schema[key] = {
                presence: {
                    allowEmpty: false,
                    message: "^This field is required.",
                },
                length: {
                    maximum: 64,
                    message: "Should be maximum length is 64.",
                },
            };
        });

        // Validate
        const errors = validate(productValidation, schema);

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

        let product = {
            code: this.state.code,
            productName: formData.get("productName"),
            firstCategory: this.state.product.firstCategory,
            secondCategory: this.state.product.secondCategory,
            thirdCategory: this.state.product.thirdCategory,
            firstThemeName: this.state.product.firstThemeName,
            secondThemeName: this.state.product.secondThemeName,
						isImageFirstTheme: false,
						isImageSecondTheme: this.state.useProductImage
        };
        let productValidation = {
            productName: formData.get("productName"),
            firstCategory: this.state.product.firstCategory,
            firstThemeName: this.state.product.firstThemeName,
            secondThemeName: this.state.product.secondThemeName,
        };

        let products = [];
        let productIds = formData.getAll("productId");
        let skus = formData.getAll("sku");
        let firstThemes = formData.getAll("firstTheme");
        let secondThemes = formData.getAll("secondTheme");
        let arrayValidations = [];

        for (let i = 0; i < productIds.length; i++) {
            products.push({
                productId: productIds[i],
                sku: skus[i],
                firstTheme: firstThemes[i],
                secondTheme: secondThemes[i],
            });

            arrayValidations["sku" + i] = skus[i];
            arrayValidations["firstTheme" + i] = firstThemes[i];
            // arrayValidations["secondTheme" + i] = secondThemes[i];
            productValidation["sku" + i] = skus[i];
            productValidation["firstTheme" + i] = firstThemes[i];
            // productValidation["secondTheme" + i] = secondThemes[i];
        }

        product["products"] = products;
        productValidation["arrayValidations"] = arrayValidations;

        // Validate
        if (this.onValidateSubmit(productValidation)) return;

        this.setState({ processing: "save" });

        // Toast process started
        this.props.enqueueSnackbar("The saving process is being started ...", {
            variant: "info",
        });

        // Mutate
        let promise = await new Promise((resolve) =>
            this.props.apolloClient.httpClient
                .mutate({
                    mutation: SAVE_SET_PRODUCT,
                    variables: {
                        input: product,
                    },
                })
                .then((result) => {
                    if (result.data.setProductSave.statusCode === 200) {
                        resolve(result.data.setProductSave);
                    } else {
                        resolve(false);
                    }
                })
                .catch((error) => {
                    resolve(false);
                })
        );

        if (promise) {
            if (this._isMounted) {
                this.setState({
                    code: promise.data,
                    processing: this.state.processing === "reload",
                });

                this.props.enqueueSnackbar(
                    "Set product has been successfully saved.",
                    {
                        variant: "success",
                    }
                );
            }
        } else {
            this._isMounted &&
                this.props.enqueueSnackbar(
                    "Sorry, there is an error occurred while saving data.",
                    { variant: "error" }
                );
        }

        this._isMounted && this.setState({ processing: "" });
    }

    render() {
        if (this.state.processing === "load") return null;

        console.log(this.state.product)

        return <React.Fragment>
					<Grid container>
						<Grid item xs={6}>
							<PageTitle
								menuName="Set product"
								title={this.state.mode + " set product"}
								links={[
										{ name: "Set product", href: "/setproduct" },
								]}
								icon={<CategoryIcon />}
							/>
						</Grid>
					</Grid>
					<Card mt={2}>
            <CardContent>
							<form
								id="set-product-form"
								onSubmit={this.onHandleSubmit.bind(this)}
							>
                    <CardContent>
                        <PerfectScrollbar>
                            {/* Product name */}
                            <Grid container spacing={1} alignItems="center">
                                <Grid
                                    item
                                    md={1}
                                    xs={12}
                                    className="align-items-center"
                                >
                                    <h5>Product name</h5>
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        name="productName"
                                        variant="outlined"
																				label="Product name is here"
                                        defaultValue={
                                            this.state.product.productName
                                        }
                                        error={this.hasError("productName")}
                                        helperText={
                                            this.hasError("productName")
                                                ? this.state.errors[
                                                      "productName"
                                                  ][0]
                                                : null
                                        }
                                    />
                                </Grid>
                            </Grid>
                            {/* Category */}
                            <Grid container spacing={1} alignItems="center">
                                <Grid
                                    item
                                    md={1}
                                    xs={12}
                                    className="align-items-center"
                                >
                                    <h5>Category</h5>
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControl
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                    >
                                        <InputLabel id="select1">
                                            First category
                                        </InputLabel>
                                        <Select
                                            label="First category"
                                            name="firstCategory"
                                            onChange={(e) =>
                                                this.handleCategory(e, 0)
                                            }
                                            value={
                                                this.state.product.firstCategory
                                            }
                                            error={this.hasError(
                                                "firstCategory"
                                            )}
                                            helperText={
                                                this.hasError("firstCategory")
                                                    ? this.state.errors[
                                                          "firstCategory"
                                                      ][0]
                                                    : null
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
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControl
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                    >
                                        <InputLabel id="select2">
                                            Second category
                                        </InputLabel>
                                        <Select
                                            label="Second category"
                                            name="secondCategory"
                                            onChange={(e) =>
                                                this.handleCategory(e, 1)
                                            }
                                            value={
                                                this.state.product
                                                    .secondCategory
                                            }
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {(
                                                this.state.categories.second.filter(
                                                    (f) =>
                                                        f.parentId ===
                                                        this.state.product
                                                            .firstCategory
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
                                <Grid item md={3} xs={12}>
                                    <FormControl
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                    >
                                        <InputLabel id="select3">
                                            Third category
                                        </InputLabel>
                                        <Select
                                            label="Third category"
                                            name="thirdCategory"
                                            onChange={(e) =>
                                                this.handleCategory(e, 2)
                                            }
                                            value={
                                                this.state.product.thirdCategory
                                            }
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {(
                                                this.state.categories.third.filter(
                                                    (f) =>
                                                        f.parentId ===
                                                        this.state.product
                                                            .secondCategory
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

                            <Divider />

                            {/* Theme 1 */}
                            <Grid container spacing={1} alignItems="center">
                                <Grid
                                    item
                                    md={1}
                                    xs={12}
                                    className="align-items-center"
                                >
                                    <h5>Theme 1</h5>
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        name="firstThemeName"
																				label="Theme 1 is here"
                                        multiline
                                        rows={1}
                                        defaultValue={
                                            this.state.product.firstThemeName
                                        }
                                        onBlur={(e) =>
                                            this.updateFirstThemeName(e)
                                        }
                                        error={this.hasError("firstThemeName")}
                                        helperText={
                                            this.hasError("firstThemeName")
                                                ? this.state.errors[
                                                      "firstThemeName"
                                                  ][0]
                                                : null
                                        }
                                    />
                                </Grid>
                            </Grid>

														<Grid container spacing={1}>
															<Grid item md={12} xs={12}>
																<Box>
																	<h5 style={{float: 'left'}}>Variations</h5>
																	<IconButton color="secondary" aria-label="add variations" 
																		onClick={(e) =>
																				this.addFirstVariant(e)
																		}
																		style={{float: 'left', marginTop: '10px'}}>
																		<AddIcon />
																	</IconButton>
																</Box>
															</Grid>
														</Grid>
														<Grid container spacing={1}>
															{(
																	this.state.firstThemeVariants || []
															).map(
																	(
																			firstThemeVariant,
																			variantIndex
																	) => (
																			<Grid
																					key={"t1-" + variantIndex}
																					item
																					md={2}
																					xs={12}
																			>
																					<TextField
																							fullWidth
																							multiline
																							rows={1}
																							label={"Variation " + variantIndex + " is here"}
																							size="small"
																							variant="outlined"
																							name="variants1"
																							defaultValue={
																									firstThemeVariant
																							}
																							onBlur={(e) =>
																									this.saveFirstVariantData(
																											e,
																											variantIndex
																									)
																							}
																							error={this.hasError(
																									"variants1" +
																											variantIndex
																							)}
																							helperText={
																									this.hasError(
																											"variants1" +
																													variantIndex
																									)
																											? this.state
																														.errors[
																														"variants1" +
																																variantIndex
																												][0]
																											: null
																							}
																					/>
																			</Grid>
																	)
															)}
														</Grid>

                            {/* Theme 2 */}
                            <Grid container spacing={1} alignItems="center">
                                <Grid
                                    item
                                    md={1}
                                    xs={12}
                                    className="align-items-center"
                                >
                                    <h5>Theme 2</h5>
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        name="secondThemeName"
                                        multiline
                                        rows={1}
                                        defaultValue={
                                            this.state.product.secondThemeName
                                        }
                                        onBlur={(e) =>
                                            this.updateSecondThemeName(e)
                                        }
                                        error={this.hasError("secondThemeName")}
                                        helperText={
                                            this.hasError("secondThemeName")
                                                ? this.state.errors[
                                                      "secondThemeName"
                                                  ][0]
                                                : null
                                        }
                                    />
																		
                                </Grid>
																<Grid item md={3} xs={12}>
																		<FormControlLabel
																				control={
																				<Checkbox
																						checked={this.state.useProductImage}
																						onChange={this.onUseProductImage.bind(this)}
																						color="primary"
																				/>
																				}
																				label="Use product image"
																		/>
																	</Grid>
                            </Grid>
														<Grid container spacing={1}>
															<Grid item md={12} xs={12}>
																<Box>
																	<h5 style={{float: 'left'}}>Variations</h5>
																	<IconButton color="secondary" aria-label="add variations"
																		onClick={(e) =>
																				this.addSecondVariant(e)
																		}
																		style={{float: 'left', marginTop: '10px'}}>
																		<AddIcon />
																	</IconButton>
																</Box>
															</Grid>
														</Grid>

														<Grid container spacing={1}>
															{( this.state.secondThemeVariants || []).map((secondThemeVariant,variantIndex) => (
																<Grid
																		key={"t2-" + variantIndex}
																		item
																		md={2}
																		xs={12}
																>
																		<TextField
																				fullWidth
																				multiline
																				rows={1}
																				size="small"
																				variant="outlined"
																				label={"Variation " + variantIndex + " is here"}
																				name="variants2"
																				defaultValue={
																						secondThemeVariant
																				}
																				onBlur={(e) =>
																						this.saveSecondVariantData(
																								e,
																								variantIndex
																						)
																				}
																				error={this.hasError(
																						"variants2" +
																								variantIndex
																				)}
																				helperText={
																						this.hasError(
																								"variants2" +
																										variantIndex
																						)
																								? this.state
																											.errors[
																											"variants2" +
																													variantIndex
																									][0]
																								: null
																				}
																		/>
																</Grid>
																)
															)}
														</Grid>

														<Grid container spacing={1}>
															<Grid item md={2} xs={12}>
																<Box width="100%">
																	<h5 style={{float: 'left'}}>Add Products</h5>
																	<IconButton color="secondary" aria-label="add products" 
																		onClick={(e) =>
																				this.onOpenProductsOpenModal(e)
																		}
																		style={{float: 'left', marginTop: '10px'}}>
																		<AddIcon />
																	</IconButton>
																</Box>
															</Grid>
															<Grid item md={2} xs={12}>
																<Box width="100%">
																	<h5 style={{float: 'left'}}>Add set product</h5>
																	<IconButton color="secondary" aria-label="add set products" 
																		onClick={(e) =>
																				this.addProduct(e)
																		}
																		style={{float: 'left', marginTop: '10px'}}>
																		<AddIcon />
																	</IconButton>
																</Box>
															</Grid>
															<Grid item md={2} xs={12}>
																<Box width="100%">
																	<h5 style={{float: 'left'}}>Delete all</h5>
																	<IconButton color="secondary" aria-label="add set products" 
																		onClick={(e) =>
																				this.deleteAll(e)
																		}
																		style={{float: 'left', marginTop: '10px'}}>
																		<DeleteIcon />
																	</IconButton>
																</Box>
															</Grid>
														</Grid>
                            
														<TableContainer>
															<Table aria-label="simple table">
																<TableHead>
																	<TableRow>
																		<TableCell>SKU</TableCell>
																		<TableCell align="left">{this.state.product.firstThemeName ? this.state.product.firstThemeName : "First theme value is here" }</TableCell>
																		<TableCell align="left">{this.state.product.secondThemeName ? this.state.product.secondThemeName : "Second theme value is here"}</TableCell>
																		<TableCell align="left">Action</TableCell>
																	</TableRow>
																</TableHead>
																<TableBody>
																	{(this.state.product.products || []).map((product, productIndex) => (
																		<TableRow id={product.sku}>
																			<TableCell component="th" scope="row">
																				<input
																					name="productId"
																					type="hidden"
																					value={product.productId}
																				/>
																				<FormControl
																						variant="outlined"
																						size="small"
																						fullWidth
																				>
																					<OutlinedInput
																							name="sku"
																							readOnly={true}
																							value={product.sku}
																							error={this.hasError(
																									"sku" + productIndex
																							)}
																							helperText={
																									this.hasError(
																											"sku" + productIndex
																									)
																											? this.state.errors[
																														"sku" +
																																productIndex
																												][0]
																											: null
																							}
																							endAdornment={
																									<InputAdornment position="end">
																											<IconButton
																													aria-label="toggle password visibility"
																													onClick={(e) =>
																															this.onOpenModalOne(
																																	e,
																																	productIndex
																															)
																													}
																											>
																													<CreateIcon />
																											</IconButton>
																									</InputAdornment>
																							}
																					/>
																				</FormControl>
																			</TableCell>
																			<TableCell>
																				<FormControl
																					fullWidth
																					variant="outlined"
																					size="small"
																				>
																					<Select
																							name="firstTheme"
																							defaultValue={
																									product.firstTheme ? product.firstTheme : "none"
																							}
																							error={this.hasError(
																									"firstTheme" +
																											productIndex
																							)}
																							helperText={
																									this.hasError(
																											"firstTheme" +
																													productIndex
																									)
																											? this.state.errors[
																														"firstTheme" +
																																productIndex
																												][0]
																											: null
																							}
																					>
																							<MenuItem value="none">
																									<em>None</em>
																							</MenuItem>
																							{(
																									this.state
																											.firstThemeVariants ||
																									[]
																							).map(
																									(
																											firstThemeVariant,
																											index
																									) => (
																											<MenuItem
																													key={index}
																													value={
																															firstThemeVariant
																													}
																											>
																													{
																															firstThemeVariant
																													}
																											</MenuItem>
																									)
																							)}
																					</Select>
																				</FormControl>
																			</TableCell>
																			<TableCell>
																				<FormControl
																						fullWidth
																						variant="outlined"
																						size="small"
																				>
																						<Select
																								name="secondTheme"
																								defaultValue={
																										product.secondTheme ? product.secondTheme : ""
																								}
																								error={this.hasError(
																										"secondTheme" +
																												productIndex
																								)}
																								helperText={
																										this.hasError(
																												"secondTheme" +
																														productIndex
																										)
																												? this.state.errors[
																															"secondTheme" +
																																	productIndex
																													][0]
																												: null
																								}
																						>
																								<MenuItem value="none">
																										<em>None</em>
																								</MenuItem>
																								{(
																										this.state
																												.secondThemeVariants ||
																										[]
																								).map(
																										(
																												secondThemeVariant,
																												index
																										) => (
																												<MenuItem
																														key={
																																"v2-" +
																																index
																														}
																														value={
																																secondThemeVariant
																														}
																												>
																														{
																																secondThemeVariant
																														}
																												</MenuItem>
																										)
																								)}
																						</Select>
																				</FormControl>
																			</TableCell>
																			<TableCell>
																				<IconButton
																						color="primary"
																						aria-label="Product modification"
																						alt="Product modification"
																				>
																						<DeleteIcon
																								onClick={(e) =>
																										this.onRemoveProduct(
																												e,
																												productIndex
																										)
																								}
																						/>
																				</IconButton>
																			</TableCell>
																		</TableRow>
                                )
                            )}
																</TableBody>
															</Table>
														</TableContainer>

                            <Grid container spacing={1} className="mt-20">
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        size="small"
                                    >
                                        Save
                                    </Button>
                                </Grid>
                            </Grid>
                        </PerfectScrollbar>
                    </CardContent>
                </form>

                {/* Find product Popup */}
                <Dialog
                    open={this.state.isOpenModal}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth="lg"
                >
                    {/* Title */}
                    <DialogTitle id="responsive-dialog-title">
                        <h2>Find product</h2>
                    </DialogTitle>
                    <Divider />

                    {/* Content */}
                    <DialogContent>
                        <form
                            id="product-form"
                            onSubmit={this.onSubmitProductForm.bind(this)}
                        >
                            <FindProduct count={this.state.count} />
                        </form>
                    </DialogContent>

                    <Divider />
                    {/* Actions */}
                    <DialogActions>
                        <Button
                            onClick={this.onCloseModal.bind(this)}
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button
                            form="product-form"
                            type="submit"
                            color="primary"
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>


								{/* Find product Popup */}
                <Dialog
                    open={this.state.isOpenModalOne}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth="lg"
                >
                    {/* Title */}
                    <DialogTitle id="responsive-dialog-title">
                        <h2>Find product</h2>
                    </DialogTitle>
                    <Divider />

                    {/* Content */}
                    <DialogContent>
                        <form
                            id="product-form"
                            onSubmit={this.onSubmitProductOneForm.bind(this)}
                        >
                            <SelectOne />
                        </form>
                    </DialogContent>

                    <Divider />
                    {/* Actions */}
                    <DialogActions>
                        <Button
                            onClick={this.onCloseModalOne.bind(this)}
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button
                            form="product-form"
                            type="submit"
                            color="primary"
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
					</Card>
			</React.Fragment>
    }
}

// Redux state to props
const mapStateToProps = (state) => {
    return {
        apolloClient: state.apolloClient,
    };
};

export default withRouter(
    withSnackbar(connect(mapStateToProps, null)(SetNewProduct))
);
