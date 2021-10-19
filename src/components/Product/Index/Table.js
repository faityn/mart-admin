import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PaginationMaterial from "@material-ui/lab/Pagination";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import SettingsIcon from "@material-ui/icons/Settings";
import CreateIcon from "@material-ui/icons/Create";
import SaveIcon from "@material-ui/icons/Save";
import { Subscription } from "react-apollo";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {
    DELETE_PRODUCT,
    GET_PRODUCTS,
    SUBSCRIPTION_PRODUCT,
    UPDATE_INVENTORY_PLACES,
} from "../Queries";
import {
    Card,
    CardActions,
    CardContent,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    FormControl,
    IconButton,
    TextField,
    Grid,
    Select,
    MenuItem,
    Box,
    Avatar,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
} from "@material-ui/core";
import CKEditor from "ckeditor4-react";
import Premium from "../Popup/Premium";
import moment from "moment";
import { Link } from "react-router-dom";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import { withSnackbar } from "notistack";
import fileDownload from "js-file-download";
import axios from "axios";

import { connect } from "react-redux";
import { SELLER_PRODUCT_REQUEST } from "../Queries";

/**
 * @summary Product list table
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Product
 */
class ProductTable extends React.Component {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        // Merge search states
        this.state = {
            id:null,
            selectedItemId: "",
            reason: null,
            return: false,
            premium: false,
            premiumServices: "",
            requestInfo: "",
            confirmRequest: false,
            confirmRecieve: false,
            checkedProducts: [],
            deletePopupOpen:false,
        };

        this.token = localStorage.getItem(process.env.REACT_ACCESS_TOKEN_NAME);

        // Bind
        this.handleClickOpenReturn = this.handleClickOpenReturn.bind(this);
        this.handleCloseReturn = this.handleCloseReturn.bind(this);
        this.handleClickOpenPremium = this.handleClickOpenPremium.bind(this);
        this.handleClosePremium = this.handleClosePremium.bind(this);
        this.handleClickOpenRequest = this.handleClickOpenRequest.bind(this);
        this.handleCloseRequest = this.handleCloseRequest.bind(this);
        this.handleClickOpenRecieve = this.handleClickOpenRecieve.bind(this);
        this.handleCloseRecieve = this.handleCloseRecieve.bind(this);

        this.onConfirmRequest = this.onConfirmRequest.bind(this);
        this.onConfirmRecieve = this.onConfirmRecieve.bind(this);
        this.onReturnRequest = this.onReturnRequest.bind(this);
        this.onChangeReason = this.onChangeReason.bind(this);
        // 삭제
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    /**
     * @summary Open box
     * @param {event}
     */
    handleClickOpenReturn(e, id) {
        this.setState({
            selectedItemId: id,
            return: true,
        });
    }

    /**
     * @summary Close box
     * @param {event}
     */
    handleCloseReturn() {
        this.setState({ return: false });
    }

    /**
     * @summary onChange
     * @param {String} editor
     */
    onChangeReason(event, editor) {
        this.setState({
            reason: editor.getData(),
        });
    }

    async onReturnRequest() {
        let selectedProduct = this.props.data.getProducts.list.find(
            (f) => f.id === this.state.selectedItemId
        );

        // Mutate
        await this.props.apolloClient.httpClient
            .mutate({
                mutation: SELLER_PRODUCT_REQUEST,
                variables: {
                    product: {
                        productId: this.state.selectedItemId,
                        status:
                            selectedProduct.status === "PENDING2"
                                ? "DECLINED2"
                                : "DECLINED",
                        reason: this.state.reason,
                    },
                },
            })
            .then((result) => {
                if (
                    result &&
                    result.data &&
                    result.data.acceptProduct.statusCode === 200
                ) {
                    this.props.enqueueSnackbar(
                        "Seller request successfully declined",
                        {
                            variant: "warning",
                        }
                    );

                    // Reload list
                    const search = {
                        search: {
                            name: "",
                        },
                    };
                    this.props.search("firstChildsState", search);
                } else {
                    this.props.enqueueSnackbar("Error occured!", {
                        variant: "error",
                    });
                }
            })
            .catch((error) => {
                this.props.enqueueSnackbar("Error occured!", {
                    variant: "error",
                });
            });

        this.setState({ return: false });
    }

    /**
     * @summary Open box
     * @param {event}
     */
    handleClickOpenPremium(e, services) {
        this.setState({
            premium: true,
            premiumServices: services ? services.split(",") : null,
        });
    }

    /**
     * @summary Close box
     * @param {event}
     */
    handleClosePremium() {
        this.setState({ premium: false });
    }

    /**
     * @summary Open box
     * @param {event}
     */
    handleClickOpenRequest(e, id, requestInfo) {
        this.setState({
            selectedItemId: id,
            requestInfo: requestInfo,
            confirmRequest: true,
        });
    }

    /**
     * @summary Close box
     * @param {event}
     */
    handleCloseRequest() {
        this.setState({ confirmRequest: false });
    }

    async onConfirmRequest() {
        let selectedProduct = this.props.data.getProducts.list.find(
            (f) => f.id === this.state.selectedItemId
        );
        let status = "";

        switch (selectedProduct.status) {
            case "PENDING":
                status = "ACCEPTED";
                break;

            case "PENDING2":
                status = "ACCEPTED2";
                break;
        }

        // Mutate
        await this.props.apolloClient.httpClient
            .mutate({
                mutation: SELLER_PRODUCT_REQUEST,
                variables: {
                    product: {
                        productId: this.state.selectedItemId,
                        status: status,
                        reason: null,
                    },
                },
            })
            .then((result) => {
                if (
                    result &&
                    result.data &&
                    result.data.acceptProduct.statusCode === 200
                ) {
                    this.props.enqueueSnackbar(
                        "Seller request successfully accepted",
                        {
                            variant: "success",
                        }
                    );

                    // Reload list
                    const search = {
                        search: {
                            name: "",
                        },
                    };
                    this.props.search("firstChildsState", search);
                } else {
                    this.props.enqueueSnackbar("Error occured!", {
                        variant: "error",
                    });
                }
            })
            .catch((error) => {
                this.props.enqueueSnackbar("Error occured!", {
                    variant: "error",
                });
            });

        this.setState({ confirmRequest: false });
    }

    /**
     * @summary Open box
     * @param {event}
     */
    handleClickOpenRecieve(e, id) {
        this.setState({
            selectedItemId: id,
            confirmRecieve: true,
        });
    }

    /**
     * @summary Close box
     * @param {event}
     */
    handleCloseRecieve() {
        this.setState({ confirmRecieve: false });
    }

    async onConfirmRecieve() {
        // Mutate
        await this.props.apolloClient.httpClient
            .mutate({
                mutation: SELLER_PRODUCT_REQUEST,
                variables: {
                    product: {
                        productId: this.state.selectedItemId,
                        status: "APPROVED",
                        reason: null,
                    },
                },
            })
            // .then((result) => {
            //     if (result && result.data) {
            //         this.props.enqueueSnackbar(
            //             "Seller request successfully approved.",
            //             {
            //                 variant: "success",
            //             }
            //         );

            //         // // Reload list
            //         const search = {
            //             search: {
            //                 name: "",
            //             },
            //         };
            //        this.props.search("firstChildsState", search)
            //     } else {
            //         this.props.enqueueSnackbar("Error occured!", {
            //             variant: "error",
            //         });
            //     }
            // })
            .then((result) => {
                if (
                    result &&
                    result.data &&
                    result.data.acceptProduct.statusCode === 200
                ) {
                    this.props.enqueueSnackbar(
                        "Seller request successfully approved",
                        {
                            variant: "success",
                        }
                    );

                    // Reload list
                    // const search = {
                    //     search: {
                    //         name: "",
                    //     },
                    // };
                    // this.props.search("twoChildsState", search);
                    // window.location.href ="/products"
                    this.props.refetch();
                } else {
                    this.props.enqueueSnackbar("Error occured!", {
                        variant: "error",
                    });
                }
            })
            .catch((error) => {
                console.debug(error)
                this.props.enqueueSnackbar("Error occured!", {
                    variant: "error",
                });
            });

        this.setState({
            confirmRecieve: false,
            return: false,
        });
    }

    /**
     * @summary Toggle product selection
     * @param {MouseEvent} event
     * @param {String} productid
     */
    onSelect(event, productId) {
        event.stopPropagation();

        let checkedProducts = this.state.checkedProducts;
        const index = checkedProducts.indexOf(productId);

        if (index === -1) {
            checkedProducts.push(productId);
        } else {
            checkedProducts.splice(index, 1);
        }

        this.setState({
            checkedProducts: checkedProducts,
        });
    }

    /**
     * @summary Toggle selections
     */
    onSelectAll(event, products) {
        event.stopPropagation();

        let checkedProducts = this.state.checkedProducts;

        if (checkedProducts.length > 0) {
            checkedProducts = [];
        } else {
            (products || []).map((item) => {
                checkedProducts.push(item.id);
            });
        }

        this.setState({
            checkedProducts: checkedProducts,
        });
    }

    /**
     * @summary Updated Invetory
     */
    onBlurInventory(e, id, inventory, price, type) {
        console.log(id);
        if (type === "inventory") {
            this.props.apolloClient.httpClient
                .mutate({
                    mutation: UPDATE_INVENTORY_PLACES,
                    variables: {
                        inventoryPrices: {
                            productId: id,
                            inventory: e.target.value,
                            price: price,
                        },
                    },
                })
                .then((result) => {
                    if (result.data.updateInventoryPrice.statusCode === 200) {
                        this.props.enqueueSnackbar(
                            "Successfully updated inventory.",
                            {
                                variant: "success",
                            }
                        );
                    }
                })
                .catch((error) => {
                    this.props.enqueueSnackbar("Please fill only number", {
                        variant: "error",
                    });
                });
        } else if (type === "price") {
            this.props.apolloClient.httpClient
                .mutate({
                    mutation: UPDATE_INVENTORY_PLACES,
                    variables: {
                        inventoryPrices: {
                            productId: id,
                            inventory: inventory,
                            price: e.target.value,
                        },
                    },
                })
                .then((result) => {
                    if (result.data.updateInventoryPrice.statusCode === 200) {
                        this.props.enqueueSnackbar(
                            "Successfully updated prices.",
                            {
                                variant: "success",
                            }
                        );
                    }
                })
                .catch((error) => {
                    this.props.enqueueSnackbar("Error occured!", {
                        variant: "error",
                    });
                });
        }
    }

    /**
     * @summary Export
     * @param {MouseEvent} event
     */
    async onExport() {
        if (this.state.checkedProducts.length !== 0) {
            const url = process.env.REACT_APP_DOMAIN + "/download/select/products";

            let productExcelRequestDto = this.state.checkedProducts;

            await axios({
                headers: {
                    authorization: this.token ? `Bearer ${this.token}` : "",
                },
                method: "POST",
                url: url,
                data: {
                    ids : productExcelRequestDto
                },
                responseType: "arraybuffer",
            })
                .then((response) => {
                    fileDownload(response.data, "Products.xlsx");
                })
                .catch((error) => {
                    this.props.enqueueSnackbar(
                        "Sorry, there is an error occurred while fetching data.",
                        { variant: "error" }
                    );
                });
        } else {
            this.props.enqueueSnackbar("You should select product", {
                variant: "info",
            });
        }
    }


      /**
   * @summary Process end
   */
  handleClickOpen(e, id) {
    this.setState({
      deletePopupOpen: true,
      id: id
    });
  }

  /**
   * @summary Process start
   */
  handleClose() {
    this.setState({
        deletePopupOpen: false
    });
  }
// 삭제
async deleteProduct() {

    this.setState({
        deletePopupOpen: false
    });
    await this.props.apolloClient.httpClient.mutate({
        mutation:DELETE_PRODUCT,
        variables:{
            id:this.state.id
        }
    }).then((result) => {
        const message = "Success! delete Product!";
        this.props.enqueueSnackbar(message, {variant: 'success'});
          // Reload list
          const search = {
            search: {
                name: "",
            },
        };
        this.props.search("firstChildsState", search);
      }).catch((error) => {
        this.props.enqueueSnackbar('Sorry, there is an error occurred while saving data.', {variant: 'error'});
      });
}

    /**
     * @override
     */
    render() {
        return (
            <React.Fragment>
                {/* Save stick and price */}
                <Grid container>
                    <Grid item xs={12} className="text-right">
                        <Button
                            variant="contained"
                            color="default"
                            size="small"
                            startIcon={<ImportExportIcon />}
                            onClick={this.onExport.bind(this)}
                        >
                            Export
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className="ml-20"
                            startIcon={<SaveIcon />}
                            onClick
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>

                <Card className="customListTable mt-20">
                    {/* Rows per page */}
                    <CardActions>
                        <Grid container>
                            <Grid item xs={12} className="text-right">
                                <span className="sort-by-product">
                                    Sort by:{" "}
                                </span>
                                <FormControl size="small" variant="outlined">
                                    <Select
                                        labelId="sort-simple-select-label"
                                        id="sort-simple-select"
                                        onChange={
                                            this.props.handleOrderByProduct
                                        }
                                        value={this.props.orderBy}
                                    >
                                        <MenuItem value="createdDate">
                                           Register Date
                                        </MenuItem>
                                        <MenuItem value="updatedDate">
                                           Updated Date
                                        </MenuItem>
                                        <MenuItem value="code">Code</MenuItem>
                                    </Select>
                                </FormControl>
                                <span className="rows-per-page">
                                    Rows per page:{" "}
                                </span>
                                <FormControl size="small" variant="outlined">
                                    <Select
                                        labelId="rows-simple-select-label"
                                        id="rows-simple-select"
                                        onChange={this.props.handleRowsPerPage}
                                        value={
                                            this.props.pagination.rowsPerPage
                                        }
                                    >
                                        <MenuItem value={50}>50</MenuItem>
                                        <MenuItem value={100}>100</MenuItem>
                                        <MenuItem value={200}>200</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </CardActions>

                    {/* List */}
                    <CardContent>
                        <PerfectScrollbar
                            options={{
                                suppressScrollX: true,
                                maxScrollbarLength: 10,
                            }}
                            containerWidth={50}
                        >
                            <Table className="product-list">
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                value="true"
                                                checked={
                                                    this.state.checkedProducts
                                                        .length ===
                                                    (
                                                        this.props.data
                                                            .getProducts.list ||
                                                        []
                                                    ).length
                                                }
                                                onChange={(e) =>
                                                    this.onSelectAll(
                                                        e,
                                                        this.props.data
                                                            .getProducts.list
                                                    )
                                                }
                                            />
                                        </TableCell>
                                        <TableCell className="w10">
                                            Management
                                        </TableCell>
                                        <TableCell className="w10">
                                            Display
                                        </TableCell>
                                        <TableCell className="w5">
                                            SKU
                                        </TableCell>
                                        <TableCell>Product Name</TableCell>
                                        <TableCell className="w5">
                                            Brand
                                        </TableCell>
                                        <TableCell className="w5">
                                            Register Date
                                        </TableCell>
                                        <TableCell className="w5">
                                            Updated Date
                                        </TableCell>
                                        <TableCell className="w5">
                                            Stock
                                        </TableCell>
                                        <TableCell className="w5">
                                            Price
                                        </TableCell>
                                        <TableCell className="w5">
                                            Registrant
                                        </TableCell>
                                        <TableCell className="w5">
                                            Action
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {(
                                        this.props.data.getProducts.list || []
                                    ).map((item) => {
                                        let status = item.status;

                                        switch (item.status) {
                                            case "ACCEPTED2":
                                                status = "ACCEPTED";
                                                break;
                                            case "PENDING2":
                                                status = "PENDING";
                                                break;
                                            case "DECLINED2":
                                                status = "DECLINED";
                                                break;
                                        }

                                        let imageUrl =
                                            item.imageUrl &&
                                            item.imageUrl.substring(0, 4) !==
                                                "http"
                                                ? process.env
                                                      .REACT_APP_CDN_URL +
                                                  "product/medium/" +
                                                  item.imageUrl
                                                : item.imageUrl;
                                        return (
                                            <TableRow key={item.id}>
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        value="true"
                                                        checked={
                                                            this.state.checkedProducts.indexOf(
                                                                item.id
                                                            ) !== -1
                                                        }
                                                        onChange={(e) =>
                                                            this.onSelect(
                                                                e,
                                                                item.id
                                                            )
                                                        }
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    {item.status ===
                                                        "PENDING" ||
                                                    item.status ===
                                                        "PENDING2" ? (
                                                        <React.Fragment>
                                                            <IconButton
                                                                color="primary"
                                                                aria-label="Approval"
                                                                alt="Approval"
                                                                onClick={(e) =>
                                                                    this.handleClickOpenRequest(
                                                                        e,
                                                                        item.id,
                                                                        item.request
                                                                    )
                                                                }
                                                            >
                                                                <CheckIcon />
                                                            </IconButton>

                                                            <IconButton
                                                                color="primary"
                                                                aria-label="Return"
                                                                alt="Return"
                                                                onClick={(e) =>
                                                                    this.handleClickOpenReturn(
                                                                        e,
                                                                        item.id
                                                                    )
                                                                }
                                                            >
                                                                <ClearIcon />
                                                            </IconButton>
                                                        </React.Fragment>
                                                    ) : null}

                                                    {item.premiumServices !==
                                                    null ? (
                                                        <IconButton
                                                            color="primary"
                                                            aria-label="Premium service"
                                                            alt="Premium service"
                                                            onClick={(e) =>
                                                                this.handleClickOpenPremium(
                                                                    e,
                                                                    item.premiumServices
                                                                )
                                                            }
                                                        >
                                                            <SettingsIcon />
                                                        </IconButton>
                                                    ) : null}
                                                </TableCell>
                                                <TableCell>
                                                    {item.isDisplay
                                                        ? "Yes"
                                                        : "No"}
                                                </TableCell>
                                                <TableCell>
                                                    {item.sku}
                                                </TableCell>
                                                <TableCell>
                                                    <Box
                                                        alignItems="center"
                                                        display="flex"
                                                    >
                                                        <Avatar
                                                            src={imageUrl}
                                                            variant="square"
                                                        ></Avatar>
                                                        <Typography
                                                            color="textPrimary"
                                                            variant="body1"
                                                            className="item-title"
                                                        >
                                                            <span className="product-name">
                                                                {item.name}
                                                            </span>
                                                            {item.manufacturer}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    {item.brand}
                                                </TableCell>
                                                <TableCell>
                                                    {moment(
                                                        item.registerDate
                                                    ).format("YYYY-MM-DD")}
                                                </TableCell>
                                                <TableCell>
                                                    {moment(
                                                        item.updatedDate
                                                    ).format("YYYY-MM-DD")}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <TextField
                                                        fullWidth
                                                        disabled={item.isSeller}
                                                        defaultValue={
                                                            item.inventory
                                                        }
                                                        onBlur={(e) =>
                                                            this.onBlurInventory(
                                                                e,
                                                                item.id,
                                                                item.inventory,
                                                                item.price,
                                                                "inventory"
                                                            )
                                                        }
                                                        variant="outlined"
                                                    />
                                                    {item.status ===
                                                        "ACCEPTED2" ||
                                                    item.status ===
                                                        "PENDING3" ? (
                                                        <div className="mt-12">
                                                            <Button
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                className="btn-check-receipt"
                                                                onClick={(e) =>
                                                                    this.handleClickOpenRecieve(
                                                                        e,
                                                                        item.id
                                                                    )
                                                                }
                                                            >
                                                                Recieved
                                                                {"(" +
                                                                    (item.request
                                                                        ? item
                                                                              .request
                                                                              .count
                                                                        : "0") +
                                                                    ")"}
                                                            </Button>
                                                        </div>
                                                    ) : item.status !== null ? (
                                                        <div className="mt-12">
                                                            <Button
                                                                fullWidth
                                                                size="small"
                                                                variant="contained"
                                                                className="btn-check-receipt"
                                                            >
                                                                {status}
                                                            </Button>
                                                        </div>
                                                    ) : null}
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        fullWidth
                                                        disabled={item.isSeller}
                                                        defaultValue={
                                                            item.price
                                                        }
                                                        onBlur={(e) =>
                                                            this.onBlurInventory(
                                                                e,
                                                                item.id,
                                                                item.inventory,
                                                                item.price,
                                                                "price"
                                                            )
                                                        }
                                                        variant="outlined"
                                                    />
                                                    {item.status !== null ? (
                                                        <div className="mt-16">
                                                            <span>
                                                                {item.request
                                                                    ? item
                                                                          .request
                                                                          .price
                                                                    : "0"}
                                                            </span>
                                                        </div>
                                                    ) : null}
                                                </TableCell>
                                                <TableCell>
                                                    {item.status !== null
                                                        ? "Partner"
                                                        : "Admin"}
                                                </TableCell>
                                                <TableCell>
                                                    <Link
                                                        to={
                                                            "/product/edit/" +
                                                            item.id
                                                        }
                                                    >
                                                        <IconButton
                                                            color="primary"
                                                            aria-label="Product modification"
                                                            alt="Product modification"
                                                            id={item.id}
                                                        >
                                                            <CreateIcon />
                                                        </IconButton>
                                                    </Link>
                                                    <IconButton 
                            color="primary" 
                            aria-label="User modification" 
                            alt="User modification"
                            onClick={(e) => this.handleClickOpen(e, item.id)}
                          >
                            <DeleteForeverIcon />
                          </IconButton>  
                                                </TableCell>

                                                <Subscription
                                                    subscription={
                                                        SUBSCRIPTION_PRODUCT
                                                    }
                                                    variables={{ id: item.id }}
                                                >
                                                    {() => {
                                                        return null;
                                                    }}
                                                </Subscription>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </PerfectScrollbar>
                    </CardContent>
                </Card>

                {/* Pagination  */}
                <Grid container className="mt-20">
                    <Grid item xs={12}>
                        <PaginationMaterial
                            count={Math.ceil(
                                this.props.data.getProducts.totalElements /
                                    this.props.pagination.rowsPerPage
                            )}
                            page={this.props.pagination.pageNumber}
                            onChange={this.props.handlePageNumber}
                            color="primary"
                            // boundaryCount={100}
                        />
                    </Grid>
                </Grid>

                {/* Return popup */}
                <Dialog
                    open={this.state.return}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth="lg"
                >
                    <DialogTitle id="responsive-dialog-title">
                        <h2>Enter the reason for rejection</h2>
                    </DialogTitle>
                    <DialogContent>
                        <FormControl fullWidth>
                            <CKEditor
                                type="classic"
                                name="reason"
                                data={this.state.reason}
                                onChange={({ event, editor }) =>
                                    this.onChangeReason(event, editor)
                                }
                            />
                            <textarea
                                name="reason"
                                value={this.state.reason}
                                style={{ display: "none" }}
                            />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="primary"
                            onClick={this.handleCloseReturn}
                        >
                            Cancel
                        </Button>
                        <Button color="primary" onClick={this.onReturnRequest}>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Premium */}
                <Dialog
                    open={this.state.premium}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        <h2>Premium service exposure</h2>
                    </DialogTitle>
                    <DialogContent>
                        <Premium services={this.state.premiumServices} />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            autoFocus
                            onClick={this.handleClosePremium}
                            color="primary"
                        >
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Request popup */}
                <Dialog
                    open={this.state.confirmRequest}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth="lg"
                >
                    <DialogTitle id="responsive-dialog-title">
                        <h2>Confirm request</h2>
                    </DialogTitle>
                    <DialogContent>
                        <Typography>
                            Do you really want to confirm this product? This
                            action is irreversible.
                        </Typography>
                        <Table className="product-list mt-20">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Created Date</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Cost</TableCell>
                                    <TableCell>Count</TableCell>
                                    <TableCell>Shipment date</TableCell>
                                </TableRow>
                            </TableHead>
                            {this.state.requestInfo ? (
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            {moment(
                                                this.state.requestInfo
                                                    .createdDate
                                            ).format("YYYY-MM-DD")}
                                        </TableCell>
                                        <TableCell>
                                            {this.state.requestInfo.price}
                                        </TableCell>
                                        <TableCell>
                                            {this.state.requestInfo.tradePrice}
                                        </TableCell>
                                        <TableCell>
                                            {this.state.requestInfo.count}
                                        </TableCell>
                                        <TableCell>
                                            {moment(
                                                this.state.requestInfo
                                                    .shipmentDate
                                            ).format("YYYY-MM-DD")}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            ) : null}
                        </Table>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="primary"
                            onClick={this.handleCloseRequest}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="primary"
                            // disabled={this.state.requestInfo === null ? true : false}
                            onClick={this.onConfirmRequest}
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Recieve popup */}
                <Dialog
                    open={this.state.confirmRecieve}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth="lg"
                >
                    <DialogTitle id="responsive-dialog-title">
                        <h2>Confirm recieve</h2>
                    </DialogTitle>
                    <DialogContent>
                        <Typography>
                            This product will be commercially available. Do you
                            really want to confirm?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="primary"
                            onClick={this.handleCloseRecieve}
                        >
                            Cancel
                        </Button>
                        <Button color="primary" onClick={this.onConfirmRecieve}>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
                 {/* Dialog */}
        <Dialog
          open={this.state.deletePopupOpen}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Delete Porduct"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
            Are you really going to delete the product?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.handleClose} color="primary">
              No
            </Button>
            <Button  color="primary" onClick={this.deleteProduct} autoFocus>
              Yes
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

export default withSnackbar(connect(mapStateToProps, null)(ProductTable));
