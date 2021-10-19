import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import {
    Grid,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
    FormHelperText,
    LinearProgress,
    List,
    IconButton,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import TouchAppIcon from "@material-ui/icons/TouchApp";
import FlipCameraAndroidIcon from "@material-ui/icons/FlipCameraAndroid";
import AddIcon from "@material-ui/icons/Add";
import { withSnackbar } from "notistack";
import validate from "validate.js";
import { connect } from "react-redux";
import { GET_STICKERS, GET_MDPICK, SAVE_MDPICK } from "../../Queries/Queries";
import FindProduct from "./FindProduct";
import Item from "./Item";

/**
 * @summary MD pick
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package MD pick
 */
class Form extends React.Component {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        // state
        this.state = {
            stickers: false,
            isProcessing: false,
            errors: null,
            mdPick: {},
            isOpenModal: false,
        };

        // Events
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
        this.moveCard = this.moveCard.bind(this);
        this.hasError = this.hasError.bind(this);
        this.onRemoveProduct = this.onRemoveProduct.bind(this);
        this.onAllRemoveProduct = this.onAllRemoveProduct.bind(this);
        this.mdPickRandom = this.mdPickRandom.bind(this);

        this._isMounted = false;
    }

    /**
     * @override
     */
    async componentDidMount() {
        this._isMounted = true;

        await this.props.apolloClient.httpClient
            .query({
                query: GET_STICKERS,
            })
            .then((result) => {
                this.setState({
                    stickers: result.data.getStickers,
                });
            })
            .catch((error) => {
                this.props.enqueueSnackbar(
                    "Sorry, there is an error occurred while fetching data.",
                    { variant: "error" }
                );
            });

        await this.props.apolloClient.httpClient
            .query({
                query: GET_MDPICK,
            })
            .then((result) => {
                this.setState({
                    mdPick: result.data.getMdPick,
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
     * @summary Open box
     * @param {event}
     */
    onOpenModal(e) {
        this.setState({
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
     * @summary Remove product
     * @param {MouseEvent} event
     */
    onRemoveProduct(e, index) {
        let mdPick = this.state.mdPick;
        mdPick.products.splice(index, 1);

        this.setState({ mdPick: mdPick });
    }

    onAllRemoveProduct(e) {
        this.setState({
            ...this.state,
            mdPick: { ...this.state.mdPick, products: [] },
        });
    }

    /**
     * @override
     */
    componentWillUnmount() {
        this._isMounted = false;
    }

    /**
     * @summary Check errors
     * @param {String} field
     */
    hasError(field) {
        return this.state.errors && this.state.errors[field] ? true : false;
    }

    /**
     * @summary Validate mdPick
     * @param {Object} mdPick
     */
    onValidateSubmit(mdPick) {
        const schema = {
            products: {
                presence: {
                    allowEmpty: false,
                    message: "^Choose Products!",
                },
            },
            stickerId: {
                presence: {
                    allowEmpty: false,
                    message: "^Sticker field is required.",
                },
            },
        };

        // Validate
        const errors = validate(mdPick, schema);

        this.setState({
            errors: errors,
        });

        return errors;
    }

    /**
     * @summary Product list form submit
     */
    onSubmitProductForm(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        let productIds = formData.getAll("productId");
        let mdPick = this.state.mdPick;

        (productIds || []).map((id) => {
            if (!mdPick.products.find((f) => f.id === id))
                mdPick.products.push({
                    productId: id,
                    name: formData.get(id),
                });
        });

        this.setState({
            mdPick: mdPick,
            isOpenModal: false,
        });
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

        let mdPickProducts = this.state.mdPick.products
            ? this.state.mdPick.products
            : [];

        let id = this.state.mdPick.id ? this.state.mdPick.id : null;

        // Form data to object
        let mdPick = {
            id: id,
            stickerId: formData.get("stickerId"),
            products: mdPickProducts.reduce((accumulator, product, idx) => {
                accumulator.push({ productId: product.productId, idx: idx });
                return accumulator;
            }, []),
        };

        // Validate
        if (this.onValidateSubmit(mdPick)) return;

        this.setState({
            isProcessing: true,
        });

        this.props.enqueueSnackbar("The saving process is being started ...", {
            variant: "info",
        });

        // Mutate
        await this.props.apolloClient.httpClient
            .mutate({
                mutation: SAVE_MDPICK,
                variables: {
                    mdPick: mdPick,
                },
            })
            .then((result) => {
                if (result.data.saveMDPick.statusCode === 200) {
                    const message = id
                        ? "MD's pick has been successfully updated."
                        : "MD's pick has been successfully created.";
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
                id: id,
            });
    }

    /**
     * @summary Card Move
     * @param {*} dragIndex
     * @param {*} hoverIndex
     */
    moveCard(dragIndex, hoverIndex) {
        const dragCard = this.state.mdPick.products[dragIndex];
        this.setState((prevState) => {
            const { mdPick } = prevState;
            const { products } = update(mdPick, {
                products: {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragCard],
                    ],
                },
            });

            this.setState({
                ...this.state,
                mdPick: {
                    ...this.state.mdPick,
                    products: products,
                },
            });
        });
        // this.setState(
        //   update(this.state.mdPick.products, {
        //     $splice: [
        //       [dragIndex, 1],
        //       [hoverIndex, 0, dragCard],
        //     ],
        //   })
        // );
    }
    /**
     * @summary Ramdom products
     */
    mdPickRandom() {
        const products = this.state.mdPick.products;
        let j, x, i;
        for (i = products.length; i; i -= 1) {
            j = Math.floor(Math.random() * 1);
            x = products[i - 1];
            products[i - 1] = products[j];
            products[j] = x;
        }
        this.setState({
            ...this.state,
            mdPick: { ...this.state.mdPick, products: products },
        });
    }
    /**
     * @override
     */
    render() {
        let isShowForm = this.state.stickers || this.state.mdPick;

        if (!isShowForm) return <LinearProgress />;

        let data = this.state.mdPick ? this.state.mdPick : null;

        return (
            <React.Fragment key={data.id}>
                {/* Title section */}
                <Grid container>
                    <Grid item>
                        {/* Title */}
                        <PageTitle
                            menuName="MD’s Pick"
                            title="MD’s Pick"
                            icon={<TouchAppIcon />}
                        />
                    </Grid>
                </Grid>

                <div className="card mt-20">
                    <form id="my-form-managemnt" onSubmit={this.onHandleSubmit}>
                        {/* Selection */}
                        <Grid container>
                            <Grid item md={6}>
                                {/* Name */}
                                <h5>Sticker</h5>
                                <FormControl
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    error={this.hasError("stickerId")}
                                >
                                    <InputLabel id="demo-simple-select-error-label">
                                        Sticker selection
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-error-label"
                                        id="demo-simple-select-error"
                                        label="Sticker selection"
                                        name="stickerId"
                                        defaultValue={data.stickerId}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {(this.state.stickers || []).map(
                                            (item) => (
                                                <MenuItem
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    {item.name}
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>
                                    <FormHelperText>
                                        {this.hasError("stickerId")
                                            ? this.state.errors["stickerId"][0]
                                            : null}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item md={6} xs={12}>
                                <h5>MD’s Pick List</h5>
                                <IconButton
                                    edge="end"
                                    aria-label="comments"
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "600",
                                    }}
                                    onClick={(e) => this.onAllRemoveProduct(e)}
                                >
                                    All Delete
                                    <DeleteIcon />
                                </IconButton>
                                <List>
                                    <DndProvider backend={HTML5Backend}>
                                        {(this.state.mdPick.products || []).map(
                                            (product, index) => {
                                                return (
                                                    <Item
                                                        id={product.id}
                                                        hasError={this.hasError}
                                                        errors={
                                                            this.state.errors
                                                        }
                                                        product={product}
                                                        index={index}
                                                        onRemoveProduct={
                                                            this.onRemoveProduct
                                                        }
                                                        moveCard={this.moveCard}
                                                        key={product.id}
                                                    />
                                                );
                                            }
                                        )}
                                    </DndProvider>
                                </List>
                            </Grid>
                        </Grid>

                        {/* Add buttoncontainer */}
                        <Grid container className="text-right mt-20">
                            {/* Add */}
                            <Grid item md={6} xs={12}>
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    onClick={this.onOpenModal.bind(this)}
                                    startIcon={<AddIcon />}
                                >
                                    Add Product
                                </Button>
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    onClick={this.mdPickRandom}
                                    startIcon={<FlipCameraAndroidIcon />}
                                    style={{ marginLeft: "10px" }}
                                >
                                    Ramdom Product
                                </Button>
                            </Grid>
                        </Grid>

                        <Divider className="mt-20" />

                        <Grid container className="mt-20">
                            <Grid item md={12} xs={12}>
                                <Button
                                    form="my-form-managemnt"
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
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
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
                                <FindProduct />
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
                                form="product-form"
                                type="submit"
                                color="primary"
                            >
                                Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
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
