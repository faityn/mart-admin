import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";
import {
    Card,
    CardHeader,
    MenuItem,
    Grid,
    Button,
    TextField,
    InputLabel,
    Select,
    CircularProgress,
    FormControl,
    IconButton,
    Radio,
    RadioGroup,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    FormControlLabel,
    FormHelperText,
} from "@material-ui/core";
import { withSnackbar } from "notistack";
import validate from "validate.js";
import { connect } from "react-redux";
import {
    GET_FREE_SHIPPING,
    GET_STICKERS,
    SAVE_FREE_SHIPPING,
} from "../../Queries/Queries";
import moment from "moment";
import FindProduct from "./FindProduct";

// Icon
import DeleteIcon from "@material-ui/icons/Delete";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { setClearSelectedProduct } from "../../../core/redux/Actions";
import { isThisSecond } from "date-fns";

class Free extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isProcessing: false,
            isOpenModal: false,
            stickers: null,
            freeShipping: [],
            errors: [],
        };

        // Event

        this._isMounted = false;
    }

    async componentDidMount() {
        this._isMounted = true;

        await this.props.apolloClient.httpClient
            .query({
                query: GET_FREE_SHIPPING,
            })
            .then((result) => {
                this.setState({
                    freeShipping: result.data.getFreeShipping,
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
    }

    /**
     * @summary Open box
     * @param {event}
     */
    onOpenModal(e, index) {
        this.setState({
            index: index,
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
    onRemoveProduct(e, index, productIndex) {
        let freeShipping = this.state.freeShipping;
        freeShipping[index].products.splice(productIndex, 1);

        this.setState({ freeShipping: freeShipping });
    }

    /**
     * @summary Product list form submit
     */
    onSubmitProductForm(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        // let productIds = formData.getAll("productId");
        let products = this.props.selectedProducts;
        let freeShipping = this.state.freeShipping;
        let index = this.state.index;

        (products || []).map((product) => {
            for (let i = 0; i < freeShipping.length; i++) {
                if (
                    freeShipping[i].products.find(
                        (p) => p.productId === product.id
                    )
                ) {
                    alert(
                        "선택하신 상품중 이미 등록되어 있는 상품이 존재합니다. 확인해주세요."
                    );
                    this.setState({
                        isOpenModal: false,
                    });
                    return false;
                }
            }
            freeShipping[index].products.push({
                productId: product.id,
                name: product.name,
            });
            this.setState({
                isOpenModal: false,
            });
        });

        // if (this.state.findProduct) {
        //     this.setState({
        //         isOpenModal: false,
        //     });
        // } else {
        //     freeShipping[index].push({
        //         productId: id,
        //         name: formData.get(id),
        //     });
        // }

        this.props.setClearSelectedProduct();
    }

    /**
     * @summary Validate freeShupping
     * @param {Object} freeShupping
     */
    onValidateSubmit(freeShupping) {
        const schema = {
            isHideAddToCart: {
                presence: {
                    allowEmpty: false,
                    message: "^Add to card field is required.",
                },
            },
            stickerId: {
                presence: {
                    allowEmpty: false,
                    message: "^Sticker field is required.",
                },
            },
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
                    message: "^Discount type field is required.",
                },
            },
        };

        const freeShuppingErrors = freeShupping.reduce(
            (errors, item, index) => {
                const error = validate(item, schema);
                if (error) errors[index] = error;
                return errors;
            },
            []
        );

        this.setState({
            errors: freeShuppingErrors,
        });

        return freeShuppingErrors;
    }

    /**
     * @summary Handle submit form
     * @param {MouseEvent} event
     */
    async onHandleSubmit(event) {
        event.preventDefault();
        // Form data
        const formData = new FormData(event.target);

        // FreeShipping
        let freeShipping = [];

        // datas
        let ids = formData.getAll("id");
        let stickerIds = formData.getAll("stickerId");
        let startDates = formData.getAll("startDate");
        let endDates = formData.getAll("endDate");
        let totals = formData.getAll("total");

        for (let i = 0; i < stickerIds.length; i++) {
            let productIds = this.state.freeShipping[i].products
                ? this.state.freeShipping[i].products
                : null;

            let discountTypes = formData.get("discountType" + [i]);

            let discount = "";

            if (discountTypes === "gram") {
                discount = formData.getAll("gram");
            } else if (discountTypes === "dollar") {
                discount = formData.getAll("dollar");
            } else {
                discount = "";
            }

            freeShipping.push({
                id: ids[i],
                isHideAddToCart:
                    formData.get("isHideAddToCart" + [i]) === "true"
                        ? true
                        : false,
                stickerId: stickerIds[i],
                startDate: startDates[i],
                endDate: endDates[i],
                discountType: discountTypes,
                discount: discount ? discount[i] : "FREE",
                total: totals ? totals[i] : "",
                productIds: productIds.reduce((accumulator, product) => {
                    accumulator.push(product.productId);
                    return accumulator;
                }, []),
            });
        }

        // Validate
        if (this.onValidateSubmit(freeShipping).length !== 0) return;

        this.setState({ isProcessing: true });

        // Toast process started
        this.props.enqueueSnackbar("The saving process is being started ...", {
            variant: "info",
        });

        console.log(freeShipping);

        // Mutate
        await this.props.apolloClient.httpClient
            .mutate({
                mutation: SAVE_FREE_SHIPPING,
                variables: {
                    freeShipping: freeShipping,
                },
            })
            .then((result) => {
                if (result.data.saveFreeShipping.statusCode === 200) {
                    this.props.enqueueSnackbar(
                        "Free shipping has been successfully updated.",
                        {
                            variant: "success",
                        }
                    );
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

        this.setState({ isProcessing: false });
    }

    /**
     * @summary Detail
     * @param {Event} childrenName
     */
    onAddFreeShipping() {
        this.setState((prevState) => ({
            freeShipping: prevState.freeShipping.concat([
                {
                    id: "",
                    isHideAddToCart: "",
                    stickerId: "",
                    startDate: "",
                    endDate: "",
                    discountType: "",
                    discount: "",
                    total: "",
                    products: [],
                },
            ]),
        }));
    }

    /**
     * @summary Delete free shipping
     * @param {Event} delete
     */
    onClickDeleteFreeShipping(e, index) {
        let freeShipping = this.state.freeShipping.splice(index, 1);

        this.setState({ freeShipping: freeShipping });
    }

    /**
     * @summary Remove free shipping
     * @param {MouseEvent} event
     */
    onClickDeleteFreeShipping(e, index) {
        let freeShipping = this.state.freeShipping;
        freeShipping.splice(index, 1);

        this.setState({ freeShipping: freeShipping });
    }

    render() {
        if (!this.state.freeShipping) return null;

        return (
            <React.Fragment>
                <Grid container>
                    <Grid item>
                        {/* Title */}
                        <PageTitle
                            menuName="Free Shipping setting"
                            title="Free Shipping setting"
                            icon={<LocalShippingIcon />}
                        />
                    </Grid>
                </Grid>

                <form
                    id="my-form-management"
                    onSubmit={this.onHandleSubmit.bind(this)}
                >
                    {this.state.freeShipping.map((free, index) => (
                        <div className="card mt-20" key={index}>
                            <input type="hidden" name="id" value={free.id} />
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <h5>FREE SHIPPING</h5>
                                </Grid>
                                <Grid item xs={6} className="text-right">
                                    <IconButton
                                        color="primary"
                                        onClick={(e) =>
                                            this.onClickDeleteFreeShipping(
                                                e,
                                                index
                                            )
                                        }
                                    >
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item md={5} xs={12}>
                                    {/* Radio group */}
                                    <RadioGroup
                                        aria-label="isHideAddToCart"
                                        name={"isHideAddToCart" + [index]}
                                        defaultValue={free.isHideAddToCart.toString()}
                                    >
                                        <FormControlLabel
                                            value="true"
                                            control={<Radio />}
                                            label="Hide “add to cart” button"
                                        />
                                        <FormControlLabel
                                            value="false"
                                            control={<Radio />}
                                            label="Display “add to cart” button"
                                        />
                                    </RadioGroup>
                                    <FormHelperText
                                        error={
                                            this.state.errors &&
                                            this.state.errors[index] &&
                                            this.state.errors[index][
                                                "isHideAddToCart"
                                            ]
                                                ? true
                                                : false
                                        }
                                    >
                                        {this.state.errors &&
                                        this.state.errors[index] &&
                                        this.state.errors[index][
                                            "isHideAddToCart"
                                        ]
                                            ? this.state.errors[index][
                                                  "isHideAddToCart"
                                              ][0]
                                            : null}
                                    </FormHelperText>

                                    {/* Sticker */}
                                    <h5>Sticker</h5>
                                    <FormControl
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                    >
                                        <InputLabel id="demo-simple-select-outlined-label">
                                            Sticker
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            label="Sticker"
                                            name={"stickerId"}
                                            defaultValue={free.stickerId}
                                            style={{
                                                marginLeft: "28px",
                                                width: "420px",
                                            }}
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
                                        <FormHelperText
                                            error={
                                                this.state.errors &&
                                                this.state.errors[index] &&
                                                this.state.errors[index][
                                                    "stickerId"
                                                ]
                                                    ? true
                                                    : false
                                            }
                                        >
                                            {this.state.errors &&
                                            this.state.errors[index] &&
                                            this.state.errors[index][
                                                "stickerId"
                                            ]
                                                ? this.state.errors[index][
                                                      "stickerId"
                                                  ][0]
                                                : null}
                                        </FormHelperText>
                                    </FormControl>

                                    {/* Duration */}
                                    <h5>Duration</h5>
                                    <TextField
                                        size="small"
                                        variant="outlined"
                                        type="date"
                                        name="startDate"
                                        style={{
                                            width: "187px",
                                            marginLeft: "28px",
                                        }}
                                        error={
                                            this.state.errors &&
                                            this.state.errors[index] &&
                                            this.state.errors[index][
                                                "startDate"
                                            ]
                                                ? true
                                                : false
                                        }
                                        helperText={
                                            this.state.errors &&
                                            this.state.errors[index] &&
                                            this.state.errors[index][
                                                "startDate"
                                            ]
                                                ? this.state.errors[index][
                                                      "startDate"
                                                  ][0]
                                                : null
                                        }
                                        defaultValue={moment(
                                            free.startDate,
                                            "YYYY-MM-DDTHH:mm:ssZ"
                                        ).format("YYYY-MM-DD")}
                                    />
                                    <TextField
                                        size="small"
                                        variant="outlined"
                                        type="date"
                                        name="endDate"
                                        style={{
                                            width: "187px",
                                            marginLeft: "43px",
                                        }}
                                        error={
                                            this.state.errors &&
                                            this.state.errors[index] &&
                                            this.state.errors[index]["endDate"]
                                                ? true
                                                : false
                                        }
                                        helperText={
                                            this.state.errors &&
                                            this.state.errors[index] &&
                                            this.state.errors[index]["endDate"]
                                                ? this.state.errors[index][
                                                      "endDate"
                                                  ][0]
                                                : null
                                        }
                                        defaultValue={moment(
                                            free.endDate,
                                            "YYYY-MM-DDTHH:mm:ssZ"
                                        ).format("YYYY-MM-DD")}
                                    />

                                    <h5>Discount type</h5>
                                    <RadioGroup
                                        aria-label="discountType"
                                        name={"discountType" + [index]}
                                        defaultValue={free.discountType}
                                    >
                                        <FormControlLabel
                                            value="gram"
                                            label="End"
                                            control={<Radio />}
                                            label={
                                                <TextField
                                                    fullWidth
                                                    id="rate-basic"
                                                    label="Gram"
                                                    size="small"
                                                    variant="outlined"
                                                    name="gram"
                                                    style={{ margin: "5px 0" }}
                                                    defaultValue={
                                                        free.discountType ===
                                                        "gram"
                                                            ? free.discount
                                                            : null
                                                    }
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            value="dollar"
                                            label="End"
                                            control={<Radio />}
                                            label={
                                                <TextField
                                                    fullWidth
                                                    id="amount-basic"
                                                    label="Dollar"
                                                    size="small"
                                                    variant="outlined"
                                                    name="dollar"
                                                    style={{ margin: "5px 0" }}
                                                    defaultValue={
                                                        free.discountType ===
                                                        "dollar"
                                                            ? free.discount
                                                            : null
                                                    }
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            value="noCondition"
                                            label="End"
                                            control={<Radio />}
                                            label="No condition"
                                        />
                                    </RadioGroup>
                                    <FormHelperText
                                        error={
                                            this.state.errors &&
                                            this.state.errors[index] &&
                                            this.state.errors[index][
                                                "discountType"
                                            ]
                                                ? true
                                                : false
                                        }
                                    >
                                        {this.state.errors &&
                                        this.state.errors[index] &&
                                        this.state.errors[index]["discountType"]
                                            ? this.state.errors[index][
                                                  "discountType"
                                              ][0]
                                            : null}
                                    </FormHelperText>
                                </Grid>

                                <Grid item md={7} xs={12}>
                                    <h5>Products</h5>
                                    <List>
                                        {console.log(free)}
                                        {(free.products || []).map(
                                            (product, productIndex) => {
                                                return (
                                                    <ListItem>
                                                        <ListItemText
                                                            id={productIndex}
                                                            primary={
                                                                product.name
                                                            }
                                                        />
                                                        <ListItemSecondaryAction>
                                                            <IconButton
                                                                edge="end"
                                                                aria-label="comments"
                                                            >
                                                                <DeleteIcon
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        this.onRemoveProduct(
                                                                            e,
                                                                            index,
                                                                            productIndex
                                                                        )
                                                                    }
                                                                />
                                                            </IconButton>
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                );
                                            }
                                        )}
                                    </List>
                                    <Grid item xs={12} className="mt-20">
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color="primary"
                                            onClick={(e) =>
                                                this.onOpenModal(e, index)
                                            }
                                            startIcon={<AddIcon />}
                                        >
                                            Add Product
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    ))}
                </form>

                <Grid container className="card mt-20">
                    <Grid item>
                        <Button
                            form="my-form-management"
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
                        <Button
                            className="ml-20 bordered"
                            variant="contained"
                            size="small"
                            color="default"
                            onClick={this.onAddFreeShipping.bind(this)}
                            startIcon={<AddIcon />}
                        >
                            New Free Shipping
                        </Button>
                    </Grid>
                </Grid>

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
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        apolloClient: state.apolloClient,
        selectedProducts: state.selectedProducts,
    };
};

export default withSnackbar(
    connect(mapStateToProps, {
        setClearSelectedProduct,
    })(Free)
);
