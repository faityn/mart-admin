import React from "react";
import {
    Grid,
    CardContent,
    TextField,
    InputAdornment,
} from "@material-ui/core";
import moment from "moment";

/**
 * @summary Detail
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Product
 */
class Detail extends React.Component {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        this.widthRef = React.createRef();
        this.lengthRef = React.createRef();
        this.heightRef = React.createRef();
        this.volumeWeightRef = React.createRef();
        this.weightRef = React.createRef();
        this.shippingWeightRef = React.createRef();
        this.onDimensionChange = this.onDimensionChange.bind(this);
    }

    /**
     * @override
     */
    componentDidMount() {
        this.onDimensionChange(null);
        console.log(this.props);
    }

    /**
     * @summary Calculate shipping weight
     * @param {MouseEvent} event
     */
    onDimensionChange(event) {
        let width = this.widthRef.current.querySelector("input").value;
        let length = this.lengthRef.current.querySelector("input").value;
        let height = this.heightRef.current.querySelector("input").value;
        let weight = this.weightRef.current.querySelector("input").value;

        width = parseFloat(width) ? parseFloat(width) : 0;
        length = parseFloat(length) ? parseFloat(length) : 0;
        height = parseFloat(height) ? parseFloat(height) : 0;
        weight = parseFloat(weight) ? parseFloat(weight) : 0;

        const volumeWeight = (width * length * height) / 5000;
        this.volumeWeightRef.current.querySelector("input").value =
            volumeWeight.toFixed(2);
        this.shippingWeightRef.current.querySelector("input").value =
            volumeWeight > weight ? volumeWeight.toFixed(2) : weight.toFixed(2);
    }

    /**
     * @override
     */
    render() {
        if (!this.props.isShowForm) return "";

        let info =
            this.props.product && this.props.product.info
                ? this.props.product.info
                : {};

        // ROLE SELLER
        const user = JSON.parse(
            localStorage.getItem(process.env.REACT_LOGGED_USER)
        );
        let isDisabled = false;
        let price = info.price ? parseFloat(info.price).toFixed(2) : "";
        let inventory = info.inventory;

        if (user.roleName === "ROLE_SELLER") {
            // isDisabled = true;
            // price = 0.0;
            // inventory = 0;
            if (this.props.url === "/product/create") {
                price = 0.0;
                inventory = 0;
            }
        }

        return (
            <CardContent>
                {/* Container */}
                <Grid container spacing={3} className="align-items-center">
                    {/* Title */}
                    <Grid item md={2} xs={12}>
                        <h5 style={{ marginBottom: "0" }}>가격 *</h5>
                        <p
                            style={{
                                color: "red",
                                fontSize: "12px",
                                letterSpacing: "-1px",
                                fontWeight: "600",
                            }}
                        >
                            입고 신청 시 기입하시면 됩니다.
                        </p>
                    </Grid>

                    {/* Price */}
                    <Grid item md={4} xs={12}>
                        {user.roleName === "ROLE_SELLER" ? (
                            <p name="price">{price}$</p>
                        ) : (
                            <TextField
                                fullWidth
                                id="name-basic"
                                label="Price"
                                size="small"
                                variant="outlined"
                                InputLabelProps={{
                                    className: "white-label",
                                }}
                                name="price"
                                defaultValue={info.price}
                                disabled={isDisabled}
                                error={this.props.hasError("info.price")}
                                helperText={
                                    this.props.hasError("info.price")
                                        ? this.props.errors["info.price"][0]
                                        : "Format: 1234.56"
                                }
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            $
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    </Grid>
                </Grid>

                {/* Container */}
                <Grid container spacing={3} className="align-items-center">
                    <Grid item md={2} xs={12}>
                        <h5 style={{ marginBottom: "0" }}>재고 *</h5>
                        <p
                            style={{
                                color: "red",
                                fontSize: "12px",
                                letterSpacing: "-1px",
                                fontWeight: "600",
                            }}
                        >
                            입고 신청 시 기입하시면 됩니다.
                        </p>
                    </Grid>

                    {/* Inventory */}
                    <Grid item md={4} xs={12}>
                        {user.roleName === "ROLE_SELLER" ? (
                            <p name="inventory">{inventory}</p>
                        ) : (
                            <TextField
                                fullWidth
                                id="name-basic"
                                label="Inventory"
                                size="small"
                                variant="outlined"
                                InputLabelProps={{
                                    className: "white-label",
                                }}
                                name="inventory"
                                defaultValue={inventory}
                                disabled={isDisabled}
                                error={this.props.hasError("info.inventory")}
                                helperText={
                                    this.props.hasError("info.inventory")
                                        ? this.props.errors["info.inventory"][0]
                                        : null
                                }
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            #
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                        <p style={{ display: "none" }}>
                            {this.props.hasError("info.inventory")
                                ? this.props.enqueueSnackbar(
                                      this.props.errors["info.inventory"][0] +
                                          "*inventory",
                                      {
                                          variant: "error",
                                      }
                                  )
                                : null}
                        </p>
                    </Grid>
                </Grid>

                {/* Container */}
                <Grid
                    container
                    spacing={3}
                    className="align-items-center flexNoWrap"
                    style={{ flexWrap: "no-wrap" }}
                >
                    {/* Title */}
                    <Grid item md={2} xs={2}>
                        <h5>가로 (cm)*</h5>
                    </Grid>

                    {/* Width */}
                    <Grid item md={2} xs={2}>
                        <TextField
                            fullWidth
                            id="name-basic"
                            size="small"
                            variant="outlined"
                            InputLabelProps={{
                                className: "white-label",
                            }}
                            name="width"
                            defaultValue={
                                parseFloat(info.width)
                                    ? info.width.toFixed(2)
                                    : "0.00"
                            }
                            onChange={this.onDimensionChange}
                            ref={this.widthRef}
                            error={this.props.hasError("info.width")}
                            helperText={
                                this.props.hasError("info.width")
                                    ? this.props.errors["info.width"][0]
                                    : null
                            }
                            autoComplete="off"
                        />
                        <p style={{ display: "none" }}>
                            {this.props.hasError("info.width")
                                ? this.props.enqueueSnackbar(
                                      this.props.errors["info.width"][0] +
                                          "*width",
                                      {
                                          variant: "error",
                                      }
                                  )
                                : null}
                        </p>
                    </Grid>

                    <Grid item md={2} xs={2}>
                        <h5 style={{ textAlign: "right" }}>세로 (cm)*</h5>
                    </Grid>

                    {/* Length */}
                    <Grid item md={2} xs={2}>
                        <TextField
                            fullWidth
                            id="name-basic"
                            size="small"
                            variant="outlined"
                            InputLabelProps={{
                                className: "white-label",
                            }}
                            name="length"
                            defaultValue={
                                parseFloat(info.length)
                                    ? info.length.toFixed(2)
                                    : "0.00"
                            }
                            onChange={this.onDimensionChange}
                            ref={this.lengthRef}
                            error={this.props.hasError("info.length")}
                            helperText={
                                this.props.hasError("info.length")
                                    ? this.props.errors["info.length"][0]
                                    : null
                            }
                            autoComplete="off"
                        />
                        <p style={{ display: "none" }}>
                            {this.props.hasError("info.length")
                                ? this.props.enqueueSnackbar(
                                      this.props.errors["info.length"][0] +
                                          "*length",
                                      {
                                          variant: "error",
                                      }
                                  )
                                : null}
                        </p>
                    </Grid>

                    <Grid item md={2} xs={2}>
                        <h5 style={{ textAlign: "right" }}>높이 (cm)*</h5>
                    </Grid>

                    {/* Height */}
                    <Grid item md={2} xs={2}>
                        <TextField
                            fullWidth
                            id="name-basic"
                            size="small"
                            variant="outlined"
                            InputLabelProps={{
                                className: "white-label",
                            }}
                            name="height"
                            defaultValue={
                                parseFloat(info.height)
                                    ? info.height.toFixed(2)
                                    : "0.00"
                            }
                            onChange={this.onDimensionChange}
                            ref={this.heightRef}
                            error={this.props.hasError("info.height")}
                            helperText={
                                this.props.hasError("info.height")
                                    ? this.props.errors["info.height"][0]
                                    : null
                            }
                            autoComplete="off"
                        />
                        <p style={{ display: "none" }}>
                            {this.props.hasError("info.height")
                                ? this.props.enqueueSnackbar(
                                      this.props.errors["info.height"][0] +
                                          "*height",
                                      {
                                          variant: "error",
                                      }
                                  )
                                : null}
                        </p>
                    </Grid>

                    <Grid item md={2} xs={2}>
                        <h5 style={{ textAlign: "right" }}>실 무게 (g)*</h5>
                    </Grid>
                    {/* Net Weight */}
                    <Grid item md={2} xs={2}>
                        <TextField
                            fullWidth
                            id="name-basic"
                            size="small"
                            variant="outlined"
                            InputLabelProps={{
                                className: "white-label",
                            }}
                            name="weight"
                            defaultValue={
                                info.weight ? info.weight.toFixed(2) : "0.00"
                            }
                            onChange={this.onDimensionChange}
                            ref={this.weightRef}
                            error={this.props.hasError("info.weight")}
                            helperText={
                                this.props.hasError("info.acteight")
                                    ? this.props.errors["info.weight"][0]
                                    : null
                            }
                            autoComplete="off"
                        />
                        <p style={{ display: "none" }}>
                            {this.props.hasError("info.weight")
                                ? this.props.enqueueSnackbar(
                                      this.props.errors["info.weight"][0] +
                                          "*weight",
                                      {
                                          variant: "error",
                                      }
                                  )
                                : null}
                        </p>
                    </Grid>
                </Grid>

                {/* Container */}
                <Grid container spacing={3} className="align-items-center">
                    {/* Title */}
                    <Grid item md={2} xs={12}>
                        <h5>부피무게 (g)</h5>
                    </Grid>

                    {/* Volume Weight */}
                    <Grid item md={4} xs={12}>
                        <TextField
                            fullWidth
                            id="name-basic"
                            size="small"
                            variant="outlined"
                            InputLabelProps={{
                                className: "white-label",
                            }}
                            name="volumeWeight"
                            ref={this.volumeWeightRef}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    {/* 
                    <Grid item md={2} xs={12}>
                        <h5 style={{ textAlign: "right" }}>Net weight (g)*</h5>
                    </Grid> */}

                    {/* Net Weight
                    <Grid item md={2} xs={12}>
                        <TextField
                            fullWidth
                            id="name-basic"
                            size="small"
                            variant="outlined"
                            InputLabelProps={{
                                className: "white-label",
                            }}
                            name="weight"
                            defaultValue={
                                parseFloat(info.weight)
                                    ? info.weight.toFixed(2)
                                    : "0.00"
                            }
                            onChange={this.onDimensionChange}
                            ref={this.weightRef}
                            error={this.props.hasError("info.weight")}
                            helperText={
                                this.props.hasError("info.acteight")
                                    ? this.props.errors["info.weight"][0]
                                    : null
                            }
                            autoComplete="off"
                        />
                        <p style={{ display: "none" }}>
                            {this.props.hasError("info.weight")
                                ? this.props.enqueueSnackbar(
                                      this.props.errors["info.weight"][0] +
                                          "*weight",
                                      {
                                          variant: "error",
                                      }
                                  )
                                : null}
                        </p>
                    </Grid> */}

                    <Grid item md={2} xs={12} style={{ display: "none" }}>
                        <h5 style={{ textAlign: "right" }}>
                            Shipping weight (g)
                        </h5>
                    </Grid>

                    {/* Shipping weight */}
                    <Grid item md={2} xs={12} style={{ display: "none" }}>
                        <TextField
                            fullWidth
                            id="name-basic"
                            size="small"
                            variant="outlined"
                            InputLabelProps={{
                                className: "white-label",
                            }}
                            name="shippingWieght"
                            ref={this.shippingWeightRef}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                </Grid>

                {/* Manufacturer container */}
                <Grid container spacing={3} className="align-items-center">
                    <Grid item md={2} xs={12}>
                        {/* <h5>Manufacturer</h5> */}
                        <h5>제조사</h5>
                    </Grid>

                    {/* Manufacturer */}
                    <Grid item md={4} xs={12}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            name="manufacturer"
                            placeholder="제조사"
                            defaultValue={info.manufacturer}
                        />
                    </Grid>
                </Grid>

                {/* Realese date container */}
                <Grid container spacing={3} className="align-items-center">
                    <Grid item md={2} xs={12}>
                        <h5 style={{ marginBottom: "0" }}>출시일</h5>
                        <p
                            style={{
                                color: "red",
                                fontSize: "12px",
                                letterSpacing: "-1px",
                                fontWeight: "600",
                            }}
                        >
                            출시 전 제품 리스팅 시 선택해주세요.
                        </p>
                    </Grid>

                    {/* Release date */}
                    <Grid item md={4} xs={12}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            type="date"
                            name="releaseDate"
                            defaultValue={moment(
                                info.releaseDate,
                                "YYYY-MM-DDTHH:mm:ssZ"
                            ).format("YYYY-MM-DD")}
                        />
                    </Grid>
                </Grid>

                {/* Brand container */}
                <Grid container spacing={3} className="align-items-center">
                    <Grid item md={2} xs={12}>
                        <h5>브랜드 *</h5>
                    </Grid>

                    {/* Brand */}
                    <Grid item md={4} xs={12}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            name="brand"
                            defaultValue={info.brand}
                            error={this.props.hasError("info.brand")}
                            helperText={
                                this.props.hasError("info.brand")
                                    ? this.props.errors["info.brand"][0]
                                    : null
                            }
                        />
                        <p style={{ display: "none" }}>
                            {this.props.hasError("info.brand")
                                ? this.props.enqueueSnackbar(
                                      this.props.errors["info.brand"][0] +
                                          "*brand",
                                      {
                                          variant: "error",
                                      }
                                  )
                                : null}
                        </p>
                    </Grid>
                </Grid>
            </CardContent>
        );
    }
}

export default Detail;
