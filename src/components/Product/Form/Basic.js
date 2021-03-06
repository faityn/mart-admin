import React from "react";
import { Button, Grid, TextField, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem, CardContent, Radio, 
        RadioGroup, FormHelperText, Table,  TableBody, TableRow, TableCell, InputAdornment} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { DropzoneArea } from "material-ui-dropzone";
import { GET_CATEGORIES, GET_PREMIUM_SERVICE } from "../Queries";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import Editor from "./Editor";
import AddIcon from '@material-ui/icons/Add';

function Alert(props) {
return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Basic extends React.Component {
/**
    * @constructor
    */
constructor(props) {
    super(props);

    let info = this.props.product ? this.props.product.info : {};
    let showImageUploadSection1 = true; 
    let showImageUploadSection2 = true; 
    let showImageUploadSection3 = true; 
    let showImageUploadSection4 = true; 
    let showImageUploadSection5 = true; 
    let inputs = [""];

    // Set inputs value
    if (
        this.props.product &&
        this.props.product.images &&
        this.props.product.images.length > 0
    ) {
        showImageUploadSection =
            this.props.product.images[0].imageUrl.substring(0, 4) !==
            "http";

        if (!showImageUploadSection) {
            inputs = [];

            this.props.product.images.map((image) => {
                inputs.push(image.imageUrl);
                return true;
            });
        }
    }
    // Default state
    this.state = {
        showImageUploadSection1: showImageUploadSection1,
        showImageUploadSection2: showImageUploadSection2,
        showImageUploadSection3: showImageUploadSection3,
        showImageUploadSection4: showImageUploadSection4,
        showImageUploadSection5: showImageUploadSection5,
        inputs: inputs,
        images:
            this.props.product && this.props.product.images
                ? this.props.product.images
                : [],
        selectedCategories: {
            firstId: info ? info.firstCategory : "",
            secondId: info ? info.secondCategory : "",
            thirdId: info ? info.thirdCategory : "",
        },
        categories: {
            first: [],
            second: [],
            third: [],
        },
        description: info ? info.description : "",
        premiumServices: [],
        isSellerPolicyMessage: false,
    };

    // Events
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onSwap1 = this.onSwap1.bind(this);
    this.onSwap2 = this.onSwap2.bind(this);
    this.onSwap3 = this.onSwap3.bind(this);
    this.onSwap4 = this.onSwap4.bind(this);
    this.onSwap5 = this.onSwap5.bind(this);
}
/**
    * @summary Swap image upload section
    * @param {MouseEvent} event
    */
onSwap1(event) {
    this.setState({
        showImageUploadSection1: event.target.value !== "url",
        images: [],
        inputs: [""],
    });
}
onSwap2(event) {
    this.setState({
        showImageUploadSection2: event.target.value !== "url",
        images: [],
        inputs: [""],
    });
}
onSwap3(event) {
    this.setState({
        showImageUploadSection3: event.target.value !== "url",
        images: [],
        inputs: [""],
    });
}
onSwap4(event) {
    this.setState({
        showImageUploadSection4: event.target.value !== "url",
        images: [],
        inputs: [""],
    });
}
onSwap5(event) {
    this.setState({
        showImageUploadSection5: event.target.value !== "url",
        images: [],
        inputs: [""],
    });
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
    * @override
    */
async componentDidMount() {
    const { data } = await this.props.apolloClient.httpClient.query({
        query: GET_CATEGORIES,
    });

    if (data) {
        this.setState({
            categories: data.categories,
        });
    }

    // Premium service
    await this.props.apolloClient.httpClient
        .query({
            query: GET_PREMIUM_SERVICE,
        })
        .then((result) => {
            let premiumServices = [];
            result.data.getSellerPremiumServiceList.map((item) => {
                // let service = {};
                // service["field1"] = item.field1;
                premiumServices.push(item.field1);
            });
            this.setState({ premiumServices });
        })
        .catch((error) => {
            this.props.enqueueSnackbar(
                "Sorry, there is an error occurred while fetching data.",
                { variant: "error" }
            );
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
    if (!this.props.isShowForm) return "";

    let info = this.props.product ? this.props.product.info : {};
    let shortDescription = info.shortDescription
        ? info.shortDescription
                .replace(/^<li>/g, "")
                .replace(/<\/li>$/g, "")
                .split("</li><li>")
        : "";

    // ROLE SELLER
    const user = JSON.parse(
        localStorage.getItem(process.env.REACT_LOGGED_USER)
    );
    let isDisabled = false;

    if (user.roleName === "ROLE_SELLER") {
        isDisabled = true;
    }

    // Premium service
    let productPremiumServices = [];
    if (this.props.product) {
        this.props.product.productPremiumServices.map((item) => {
            // let service = {};
            // service["field1"] = item.field1;
            productPremiumServices.push(item.field1);
        });
    }
    // console.log(productPremiumServices);

    return (
        <CardContent>
            {/* Category container */}
            <Grid container spacing={3} className="align-items-center">
                <Grid item md={2} xs={12}>
                    <h5>????????????</h5>
                </Grid>

                {/* First category */}
                <Grid item md={2} xs={12}>
                    <FormControl size="small" fullWidth variant="outlined">
                        <InputLabel id="demo-simple-select-outlined-label">
                            {/* First category */}
                            1??? ????????????
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="First category"
                            name="firstCategory"
                            onChange={(e) => this.onChangeCategory(e, 1)}
                            value={this.state.selectedCategories.firstId}
                            error={this.props.hasError(
                                "info.firstCategory"
                            )}
                            helperText={
                                this.props.hasError("info.firstCategory")
                                    ? this.props.errors[
                                            "info.firstCategory"
                                        ][0]
                                    : null
                            }
                        >
                            <p style={{ display: "none" }}>
                                {this.props.hasError("info.firstCategory")
                                    ? this.props.enqueueSnackbar(
                                            this.props.errors[
                                                "info.firstCategory"
                                            ][0] + "*firstCategory",
                                            {
                                                variant: "error",
                                            }
                                        )
                                    : null}
                            </p>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {(this.state.categories.first || []).map(
                                (category, index) => (
                                    <MenuItem
                                        key={index}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </MenuItem>
                                )
                            )}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Second category */}
                <Grid item md={2} xs={12}>
                    <FormControl fullWidth size="small" variant="outlined">
                        <InputLabel id="demo-simple-select-outlined-label">
                            {/* Second category */}
                            2??? ????????????
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Second category"
                            name="secondCategory"
                            inputProps={{
                                className: "white-label",
                            }}
                            onChange={(e) => this.onChangeCategory(e, 2)}
                            value={this.state.selectedCategories.secondId}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {(
                                this.state.categories.second.filter(
                                    (f) =>
                                        f.parentId ===
                                        this.state.selectedCategories
                                            .firstId
                                ) || []
                            ).map((category, index) => (
                                <MenuItem key={index} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Third category */}
                <Grid item md={2} xs={12}>
                    <FormControl fullWidth size="small" variant="outlined">
                        <InputLabel id="demo-simple-select-outlined-label">
                            {/* Third category */}
                            3??? ????????????
                        </InputLabel>
                        <input
                            name="thirdCategory"
                            type="hidden"
                            value={this.state.selectedCategories.thirdId}
                        />
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Third category"
                            onChange={(e) => this.onChangeCategory(e, 3)}
                            defaultValue={
                                this.state.selectedCategories.thirdId
                            }
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {(
                                this.state.categories.third.filter(
                                    (f) =>
                                        f.parentId ===
                                        this.state.selectedCategories
                                            .secondId
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
            <Grid container spacing={3} className="align-items-center">
                <Grid item md={2} xs={12}>
                    <h5>???????????? ????????????</h5>
                </Grid>

                <Grid item md={9} xs={12}>
                    <InputLabel>???????????? &gt; ??????/?????? &gt; ??????/????????? &gt; ??????/????????????</InputLabel>
                </Grid>
            </Grid>

            {/* Name container */}
            <Grid container spacing={3} className="align-items-center">
                <Grid item md={2} xs={12}>
                    <h5>?????????</h5>
                </Grid>

                {/* Name */}
                <Grid item md={6} xs={6}>
                    <TextField
                        fullWidth
                        id="name-basic"
                        label="?????????+??????+??????+??????"
                        size="small"
                        variant="outlined"
                        placeholder="?????????+??????+??????+??????"
                        InputLabelProps={{
                            className: "white-label",
                        }}
                        name="name"
                        defaultValue={info.name}
                        error={this.props.hasError("info.name")}
                        helperText={
                            this.props.hasError("info.name")
                                ? this.props.errors["info.name"][0]
                                : null
                        }
                    />
                    <p style={{ display: "none" }}>
                        {this.props.hasError("info.name")
                            ? this.props.enqueueSnackbar(
                                    this.props.errors["info.name"][0] +
                                        "*Name",
                                    {
                                        variant: "error",
                                    }
                                )
                            : null}
                    </p>
                </Grid>
            </Grid>

            {/* BarCode container */}
            <Grid container spacing={3} className="align-items-center">
                <Grid item md={2} xs={12}>
                    <h5>?????? ?????????</h5>
                </Grid>

                <Grid item md={6} xs={6}>
                    <TextField
                        fullWidth
                        id="name-basic"
                        label="????????? ?????? ??????"
                        size="small"
                        variant="outlined"
                        placeholder="???????????? ???????????? ??????????????????."
                        InputLabelProps={{
                            className: "white-label",
                        }}
                        name="name"
                        defaultValue={info.name}
                        error={this.props.hasError("info.name")}
                        helperText={
                            this.props.hasError("info.name")
                                ? this.props.errors["info.name"][0]
                                : null
                        }
                    />
                    <p style={{ display: "none" }}>
                        {this.props.hasError("info.name")
                            ? this.props.enqueueSnackbar(
                                    this.props.errors["info.name"][0] +
                                        "*Name",
                                    {
                                        variant: "error",
                                    }
                                )
                            : null}
                    </p>
                </Grid>
            </Grid>                

            {/* Description container */}
            <Grid container spacing={3} className="align-items-center">
                <Grid item md={2} xs={12}>
                    {/* <h5>Description</h5> */}
                    <h5>?????? ????????????</h5>
                </Grid>

                {/* Description */}
                <Grid item md={6} xs={12}>
                    <FormControl fullWidth>
                        <Editor
                            onChangeQuillDescription={
                                this.props.onChangeQuillDescription
                            }
                            body={this.props.description}
                        />
                    </FormControl>
                </Grid>
            </Grid>

            {/*
            <Grid container spacing={3} className="align-items-center">
                <Grid item md={2} xs={12}>
                    <h5>????????? ?????????</h5>
                </Grid>
                <Grid item md={6} xs={12}>
                    <FormControl size="small" fullWidth variant="outlined">
                        <InputLabel> ??????</InputLabel>
                        <Select name="delivery_price_type">
                            <MenuItem value="">??????</MenuItem>
                            <MenuItem value="">?????? 3,000???</MenuItem>
                            <MenuItem value="">????????? ??????</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={3} className="align-items-center">
                <Grid item md={2} xs={12}>
                    <h5>?????? ?????????</h5>
                </Grid>
                <Grid item md={3} xs={12}>
                    <TextField
                        fullWidth
                        label=""
                        size="small"
                        variant="outlined"
                        name="delivery_price"
                        placeholder="0"
                        InputProps={{ endAdornment: (<InputAdornment position="end">???</InputAdornment>),}}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={3} className="align-items-center">
                <Grid item md={2} xs={12}>
                    <h5>????????? ??????</h5>
                </Grid>
                <Grid item md={3} xs={12}>
                    <TextField
                        fullWidth
                        label=""
                        size="small"
                        variant="outlined"
                        name="delivery_price_term"
                        placeholder="0"
                        InputProps={{ endAdornment: (<InputAdornment position="end">???</InputAdornment>),}}
                    />
                </Grid>
                <Grid item md={2} xs={12} style={{textAlign: "left"}}>
                    <h5>?????? ??????</h5>
                </Grid>
            </Grid> */}
            
            {/* PrePaid container 
            <Grid container spacing={3} className="align-items-center">
                <Grid item md={2} xs={12}>
                    <h5>????????????</h5>
                </Grid>
                <Grid item md={2} xs={6}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                color="primary"
                                name="prePaid"
                                value={true}
                            />
                        }
                        label="?????????"
                    />
                </Grid>
            </Grid>*/}
            
            {/* Refund/exchange container */}
            <Grid container spacing={3} className="align-items-center mt-20">
                <Grid item md={2} xs={12}>
                    <h5>??????/??????</h5>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Grid container md={12} xs={12}>
                        <Grid item md={2} xs={12}>
                            <h5>???????????????(??????)</h5>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                name="refund_delivery_price"
                                placeholder="0"
                                InputProps={{ endAdornment: (<InputAdornment position="end">???</InputAdornment>),}}
                            />
                        </Grid>
                    </Grid>
                    <Grid container md={12} xs={12}>
                        <Grid item md={2} xs={12}>
                            <h5>???????????????(??????)</h5>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                name="exchange_delivery_price"
                                placeholder="0"
                                InputProps={{ endAdornment: (<InputAdornment position="end">???</InputAdornment>),}}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            
            {/* A/S container */}
            <Grid container spacing={3} className="align-items-center">
                <Grid item md={2} xs={12}>
                    <h5>A/S, ????????????</h5>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Grid container md={12} xs={12}>
                        <Grid item md={2} xs={12}>
                            <h5>????????????</h5>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                name="as_phone"
                                placeholder="000-0000-0000"
                            />
                        </Grid>
                    </Grid>
                    <Grid container md={12} xs={12}>
                        <Grid item md={2} xs={12}>
                            <h5>????????????</h5>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                name="special_item"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {/* Image container */}
            <Grid container spacing={3} className="align-items-center">
                <Grid item md={2} xs={12}>
                    <h5>?????? ?????????</h5>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Grid container spacing={3} className="align-items-center">
                        <Grid item md={3} xs={12}>
                            <RadioGroup aria-label="file" name="file">
                                <FormControlLabel
                                    value="file"
                                    name="fileOrLink"
                                    control={<Radio />}
                                    label="????????? ?????????"
                                    onChange={this.onSwap1}
                                    checked={this.state.showImageUploadSection1}
                                />
                            </RadioGroup>
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <RadioGroup aria-label="url" name="url">
                                <FormControlLabel
                                    value="url"
                                    name="fileOrLink"
                                    control={<Radio />}
                                    label="URL ????????? ?????????"
                                    onChange={this.onSwap1}
                                    checked={!this.state.showImageUploadSection1}
                                />
                            </RadioGroup>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} className="align-items-center mt-20">
                        {this.state.showImageUploadSection1 ? (
                            <React.Fragment>
                                <FormHelperText>
                                    *????????? ????????? ??????1000px x 1000px??? ???????????????.
                                </FormHelperText>
                                <DropzoneArea
                                    maxFileSize={30000000}
                                    acceptedFiles={["image/jpeg", "image/png"]}
                                    filesLimit={1}
                                />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Grid item md={3} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Url"
                                        size="small"
                                        variant="outlined"
                                        name="links1"
                                    />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        startIcon={<AddIcon />}
                                    >
                                        ?????? ??????
                                    </Button>
                                </Grid>
                            </React.Fragment>
                        )}
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={3} className="align-items-center" style={{marginTop: "40px"}}>
                <Grid item md={2} xs={12}>
                    <h5>?????? ?????????</h5>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Grid container spacing={3} className="align-items-center">
                        <Grid item md={3} xs={12}>
                            <RadioGroup aria-label="file" name="file">
                                <FormControlLabel
                                    value="file"
                                    name="fileOrLink"
                                    control={<Radio />}
                                    label="????????? ?????????"
                                    onChange={this.onSwap2}
                                    checked={this.state.showImageUploadSection2}
                                />
                            </RadioGroup>
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <RadioGroup aria-label="url" name="url">
                                <FormControlLabel
                                    value="url"
                                    name="fileOrLink"
                                    control={<Radio />}
                                    label="URL ????????? ?????????"
                                    onChange={this.onSwap2}
                                    checked={!this.state.showImageUploadSection2}
                                />
                            </RadioGroup>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} className="align-items-center mt-20">
                        {this.state.showImageUploadSection2 ? (
                            <React.Fragment>
                                <FormHelperText>
                                    *????????? ????????? ??????1000px x 1000px??? ???????????????.
                                </FormHelperText>
                                <DropzoneArea
                                    maxFileSize={30000000}
                                    acceptedFiles={["image/jpeg", "image/png"]}
                                    filesLimit={1}
                                />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Grid item md={3} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Url"
                                        size="small"
                                        variant="outlined"
                                        name="links1"
                                    />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        startIcon={<AddIcon />}
                                    >
                                        ?????? ??????
                                    </Button>
                                </Grid>
                            </React.Fragment>
                        )}
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={3} className="align-items-center" style={{marginTop: "40px"}}>
                <Grid item md={2} xs={12}>
                    <h5>?????? ?????????</h5>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Grid container spacing={3} className="align-items-center">
                        <Grid item md={3} xs={12}>
                            <RadioGroup aria-label="file" name="file">
                                <FormControlLabel
                                    value="file"
                                    name="fileOrLink"
                                    control={<Radio />}
                                    label="????????? ?????????"
                                    onChange={this.onSwap3}
                                    checked={this.state.showImageUploadSection3}
                                />
                            </RadioGroup>
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <RadioGroup aria-label="url" name="url">
                                <FormControlLabel
                                    value="url"
                                    name="fileOrLink"
                                    control={<Radio />}
                                    label="URL ????????? ?????????"
                                    onChange={this.onSwap3}
                                    checked={!this.state.showImageUploadSection3}
                                />
                            </RadioGroup>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} className="align-items-center mt-20">
                        {this.state.showImageUploadSection3 ? (
                            <React.Fragment>
                                <FormHelperText>
                                    *????????? ????????? ??????1000px x 1000px??? ???????????????.
                                </FormHelperText>
                                <DropzoneArea
                                    maxFileSize={30000000}
                                    acceptedFiles={["image/jpeg", "image/png"]}
                                    filesLimit={1}
                                />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Grid item md={3} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Url"
                                        size="small"
                                        variant="outlined"
                                        name="links1"
                                    />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        startIcon={<AddIcon />}
                                    >
                                        ?????? ??????
                                    </Button>
                                </Grid>
                            </React.Fragment>
                        )}
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={3} className="align-items-center" style={{marginTop: "40px"}}>
                <Grid item md={2} xs={12}>
                    <h5>?????? ?????????</h5>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Grid container spacing={3} className="align-items-center">
                        <Grid item md={3} xs={12}>
                            <RadioGroup aria-label="file" name="file">
                                <FormControlLabel
                                    value="file"
                                    name="fileOrLink"
                                    control={<Radio />}
                                    label="????????? ?????????"
                                    onChange={this.onSwap4}
                                    checked={this.state.showImageUploadSection4}
                                />
                            </RadioGroup>
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <RadioGroup aria-label="url" name="url">
                                <FormControlLabel
                                    value="url"
                                    name="fileOrLink"
                                    control={<Radio />}
                                    label="URL ????????? ?????????"
                                    onChange={this.onSwap4}
                                    checked={!this.state.showImageUploadSection4}
                                />
                            </RadioGroup>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} className="align-items-center mt-20">
                        {this.state.showImageUploadSection4 ? (
                            <React.Fragment>
                                <FormHelperText>
                                    *????????? ????????? ??????1000px x 1000px??? ???????????????.
                                </FormHelperText>
                                <DropzoneArea
                                    maxFileSize={30000000}
                                    acceptedFiles={["image/jpeg", "image/png"]}
                                    filesLimit={1}
                                />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Grid item md={3} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Url"
                                        size="small"
                                        variant="outlined"
                                        name="links1"
                                    />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        startIcon={<AddIcon />}
                                    >
                                        ?????? ??????
                                    </Button>
                                </Grid>
                            </React.Fragment>
                        )}
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={3} className="align-items-center" style={{marginTop: "40px"}}>
                <Grid item md={2} xs={12}>
                    <h5>?????? ?????????</h5>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Grid container spacing={3} className="align-items-center">
                        <Grid item md={3} xs={12}>
                            <RadioGroup aria-label="file" name="file">
                                <FormControlLabel
                                    value="file"
                                    name="fileOrLink"
                                    control={<Radio />}
                                    label="????????? ?????????"
                                    onChange={this.onSwap5}
                                    checked={this.state.showImageUploadSection5}
                                />
                            </RadioGroup>
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <RadioGroup aria-label="url" name="url">
                                <FormControlLabel
                                    value="url"
                                    name="fileOrLink"
                                    control={<Radio />}
                                    label="URL ????????? ?????????"
                                    onChange={this.onSwap5}
                                    checked={!this.state.showImageUploadSection5}
                                />
                            </RadioGroup>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} className="align-items-center mt-20">
                        {this.state.showImageUploadSection5 ? (
                            <React.Fragment>
                                <FormHelperText>
                                    *????????? ????????? ??????1000px x 1000px??? ???????????????.
                                </FormHelperText>
                                <DropzoneArea
                                    maxFileSize={30000000}
                                    acceptedFiles={["image/jpeg", "image/png"]}
                                    filesLimit={1}
                                />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Grid item md={3} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Url"
                                        size="small"
                                        variant="outlined"
                                        name="links1"
                                    />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        startIcon={<AddIcon />}
                                    >
                                        ?????? ??????
                                    </Button>
                                </Grid>
                            </React.Fragment>
                        )}
                    </Grid>
                </Grid>
            </Grid>

            {/* Price container */}
            <Grid container spacing={3} className="align-items-center" style={{marginTop: "40px"}}>
                <Grid item md={2} xs={12}>
                    <h5>?????? ?????? ??????</h5>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className="text-center" width="10%"><strong>??????</strong></TableCell>
                                <TableCell className="text-center" width="22%"><strong>?????????</strong></TableCell>
                                <TableCell className="text-center" width="22%"><strong>?????????</strong></TableCell>
                                <TableCell className="text-center" width="22%"><strong>?????????</strong></TableCell>
                                <TableCell className="text-center" width="22%"><strong>?????????</strong></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center"><strong>????????????</strong></TableCell>
                                <TableCell className="text-center">
                                    <Grid container md={12} xs={12}>
                                        <Grid item md={10} xs={12} className="align-items-center">
                                            <TextField
                                                fullWidth
                                                id="market_price"
                                                placeholder="0"
                                                name="market_price"
                                                size="small"
                                                variant="outlined"
                                                InputProps={{ endAdornment: (<InputAdornment position="end">???</InputAdornment>),}}
                                            />
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Grid container md={12} xs={12}>
                                        <Grid item md={10} xs={12} className="align-items-center">
                                            <TextField
                                                fullWidth
                                                id="supply_price"
                                                placeholder="0"
                                                name="supply_price"
                                                size="small"
                                                variant="outlined"
                                                InputProps={{ endAdornment: (<InputAdornment position="end">???</InputAdornment>),}}
                                            />
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Grid container md={12} xs={12}>
                                        <Grid item md={10} xs={12} className="align-items-center">
                                            <TextField
                                                fullWidth
                                                id="sale_price"
                                                placeholder="0"
                                                name="sale_price"
                                                size="small"
                                                variant="outlined"
                                                InputProps={{ endAdornment: (<InputAdornment position="end">???</InputAdornment>),}}
                                            />
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Grid container md={12} xs={12}>
                                        <Grid item md={10} xs={12} className="align-items-center">
                                            <TextField
                                                fullWidth
                                                id="profit_price"
                                                placeholder="0"
                                                name="profit_price"
                                                size="small"
                                                variant="outlined"
                                                InputProps={{ endAdornment: (<InputAdornment position="end">%</InputAdornment>),}}
                                            />
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center"><strong>????????????</strong>ss</TableCell>
                                <TableCell className="text-center">
                                    <Grid container md={12} xs={12}>
                                        <Grid item md={10} xs={12} className="align-items-center">
                                            <TextField
                                                fullWidth
                                                id="profit_price"
                                                placeholder="0"
                                                name="profit_price"
                                                size="small"
                                                variant="outlined"
                                                InputProps={{ endAdornment: (<InputAdornment position="end">???</InputAdornment>),}}
                                            />
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell className="text-center" colSpan={3}></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>

            {/* Bonus config container */}
            <Grid container spacing={3} className="align-items-center mt-20">
                <Grid item md={2} xs={12}>
                    <h5>?????? ?????? ??????</h5>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className="text-center"><strong>?????? ??????</strong></TableCell>
                                <TableCell className="text-center"><strong>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                name="isBonusConfig"
                                                value={true}
                                                defaultChecked={true}
                                            />
                                        }
                                        label="?????????"
                                    /></strong>
                                </TableCell>
                                <TableCell className="text-center"><strong>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                name="isBonusConfig"
                                                value={true}
                                            />
                                        }
                                        label="?????? ??????"
                                    /></strong>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center"><strong>??????</strong></TableCell>
                                <TableCell className="text-center">
                                    <Grid container md={12} xs={12}>
                                        <Grid item md={10} xs={12} className="align-items-center">
                                            <TextField
                                                fullWidth
                                                id="discount_amount"
                                                placeholder="0"
                                                name="discount_amount"
                                                size="small"
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item md={2} xs={12}>
                                            <Select name="discount_type" label="???">
                                                <MenuItem value="won">???</MenuItem>
                                                <MenuItem value="percent">%</MenuItem>
                                            </Select>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center"><strong>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                name="hasDiscountDate"
                                                value={true}
                                            />
                                        }
                                        label="???????????? ??? ??????"
                                    /></strong>
                                </TableCell>
                                <TableCell className="text-center" colSpan={2}>
                                    <Grid container md={12} xs={12}>
                                        <Grid item md={4} xs={12}>
                                            <TextField
                                                fullWidth
                                                id="discount_beginDate"
                                                placeholder="0"
                                                name="discount_beginDate"
                                                size="small"
                                                variant="outlined"
                                                type="date"
                                            />
                                        </Grid>
                                        <Grid item md={1} xs={12}>~</Grid>
                                        <Grid item md={4} xs={12}>
                                            <TextField
                                                fullWidth
                                                id="discount_endDate"
                                                placeholder="0"
                                                name="discount_endDate"
                                                size="small"
                                                variant="outlined"
                                                type="date"
                                            />
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center"><strong>?????????</strong></TableCell>
                                <TableCell className="text-center" colSpan={2}>0??? (0??? ??????)</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
        </CardContent>
    );
}
}

// Redux state to props
const mapStateToProps = (state) => {
return {
    apolloClient: state.apolloClient,
};
};

export default withSnackbar(connect(mapStateToProps, null)(Basic));
