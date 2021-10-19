import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
    Typography,
    Button,
    Grid,
    TextField,
    FormControlLabel,
    Checkbox,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CardContent,
    Radio,
    TextareaAutosize,
    FormHelperText,
    Input,
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { GET_CATEGORIES, GET_PREMIUM_SERVICE } from "../Queries";
import CKEditor from "ckeditor4-react-advanced";
import moment from "moment";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import Editor from "./Editor";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/**
 * @summary Basic
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Product
 */
class Basic extends React.Component {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        let info = this.props.product ? this.props.product.info : {};

        // Default state
        this.state = {
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
            isAutomaticDate: info.isAutomaticDate ? info.isAutomaticDate : true,
            description: info ? info.description : "",
            premiumServices: [],
            isSellerPolicyMessage: false,
        };

        // Events
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onSwapAutomaticDate = this.onSwapAutomaticDate.bind(this);
    }

    /**
     * @summary Close modal
     * @param {event}
     */
    onOpenModal() {
        this.setState({ isSellerPolicyMessage: true });
    }

    /**
     * @summary Close modal
     * @param {event}
     */
    onCloseModal() {
        this.setState({ isSellerPolicyMessage: false });
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
     * @summary Swap automatic date
     * @param {MouseEvent} event
     */
    onSwapAutomaticDate(event) {
        this.setState({
            isAutomaticDate: !this.state.isAutomaticDate,
        });
    }

    /**
     * @summary Prevent to type white space
     * @param {MouseEvent} event
     */
    onEANKeydown(event) {
        const key = event.keyCode || event.charCode;

        if (key === 32) event.preventDefault();
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
                {/* SELLER POLICY MESSAGE */}
                {user.roleName === "ROLE_SELLER" ? (
                    <Grid container spacing={3} className="align-items-center">
                        <Grid item md={2} xs={12}>
                            {/* <h5>Seller policy</h5> */}
                            <h5>파트너 정책</h5>
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <HelpOutlineIcon
                                style={{ cursor: "pointer" }}
                                onClick={this.onOpenModal.bind(this)}
                            />
                        </Grid>
                    </Grid>
                ) : null}

                {/* Container */}
                <Grid container spacing={3} className="align-items-center">
                    <Grid item md={2} xs={12}>
                        <h5>카테고리</h5>
                    </Grid>

                    {/* First category */}
                    <Grid item md={3} xs={12}>
                        <FormControl size="small" fullWidth variant="outlined">
                            <InputLabel id="demo-simple-select-outlined-label">
                                {/* First category */}
                                1차 카테고리
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
                    <Grid item md={3} xs={12}>
                        <FormControl fullWidth size="small" variant="outlined">
                            <InputLabel id="demo-simple-select-outlined-label">
                                {/* Second category */}
                                2차 카테고리
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
                    <Grid item md={3} xs={12}>
                        <FormControl fullWidth size="small" variant="outlined">
                            <InputLabel id="demo-simple-select-outlined-label">
                                {/* Third category */}
                                3차 카테고리
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

                {/* Name container */}
                <Grid container spacing={3} className="align-items-center">
                    <Grid item md={2} xs={12}>
                        <h5>상품명</h5>
                    </Grid>

                    {/* Name */}
                    <Grid item md={6} xs={6}>
                        <TextField
                            fullWidth
                            id="name-basic"
                            label="Name"
                            size="small"
                            variant="outlined"
                            placeholder="고갱에게 보여지는 상품명입니다."
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

                    {/* Show name */}
                    {/* <Grid item md={4} xs={6}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="primary"
                                    name="isHideName"
                                    value={false}
                                    defaultChecked={
                                        info.isHideName !== undefined
                                            ? info.isHideName
                                            : false
                                    }
                                />
                            }
                            label="숨김"
                        />
                    </Grid> */}
                </Grid>

                {/* English name container
        <Grid container spacing={3} className="align-items-center">
          <Grid item md={2} xs={12}>
            <h5>English name</h5>
          </Grid>

          English name
          <Grid item md={6} xs={6}>
            <TextField
              fullWidth
              id="nameEng-basic"
              label="English name"
              size="small"
              variant="outlined"
              name="nameEng"
              defaultValue={info.nameEng}
              error={this.props.hasError("info.nameEng")}
              helperText={
                this.props.hasError("info.nameEng")
                  ? this.props.errors["info.nameEng"][0]
                  : null
              }
            />
          </Grid>

          {/* Show english name
          <Grid item md={4} xs={6} className="align-items-center">
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  name="isHideNameEng"
                  value={true}
                  defaultChecked={info.isHideNameEng}
                />
              }
              label="숨김	"
            />
          </Grid>
        </Grid> */}

                {/* EAN container */}
                <Grid container spacing={3} className="align-items-center">
                    <Grid item md={2} xs={12}>
                        <h5>EAN 코드 *</h5>
                    </Grid>

                    {/* EAN */}
                    <Grid item md={3} xs={12}>
                        <TextField
                            fullWidth
                            label="EAN"
                            size="small"
                            variant="outlined"
                            name="ean"
                            defaultValue={info.ean}
                            error={this.props.hasError("info.ean")}
                            placeholder="특수 문자를 제외한 13자리 숫자로 입력해주세요."
                            helperText={
                                this.props.hasError("info.ean")
                                    ? this.props.errors["info.ean"][0]
                                    : null
                            }
                            onKeyDown={this.onEANKeydown}
                        />
                        <p style={{ display: "none" }}>
                            {this.props.hasError("info.ean")
                                ? this.props.enqueueSnackbar(
                                      this.props.errors["info.ean"][0] + "*ean",
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
                    <Grid item md={2} xs={12}>
                        {/* <h5>Display on/off</h5> */}
                        <h5>상품 노출 켜기/끄기</h5>
                    </Grid>
                    {/* is Display */}
                    <Grid item md={2} xs={6}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="primary"
                                    name="isDisplay"
                                    // checked
                                    value={true}
                                    disabled={isDisabled}
                                    defaultChecked={info.isDisplay}
                                />
                            }
                            label="Display"
                        />
                    </Grid>
                </Grid>

                {/* Container */}
                <Grid container spacing={3} className="align-items-center">
                    <Grid item md={2} xs={12}>
                        <h5>SKU *</h5>
                    </Grid>

                    {/* TextField */}
                    <Grid item md={8} xs={12}>
                        <TextField
                            fullWidth
                            label="SKU"
                            size="small"
                            variant="outlined"
                            name="sku"
                            defaultValue={info.sku}
                            placeholder="제품 고유의 품목코드를 입력해주세요."
                            error={this.props.hasError("info.sku")}
                            helperText={
                                this.props.hasError("info.sku")
                                    ? this.props.errors["info.sku"][0]
                                    : null
                            }
                        />
                        <p style={{ display: "none" }}>
                            {this.props.hasError("info.sku")
                                ? this.props.enqueueSnackbar(
                                      this.props.errors["info.sku"][0] + "*sku",
                                      {
                                          variant: "error",
                                      }
                                  )
                                : null}
                        </p>
                    </Grid>
                </Grid>

                {/* Date container */}
                <Grid container spacing={3} className="align-items-center">
                    <Grid item md={2} xs={12}>
                        {/* <h5>Registration date</h5> */}
                        <h5>출시일</h5>
                    </Grid>

                    {/* Automatic date */}
                    <Grid item md={3} xs={3}>
                        <FormControlLabel
                            name="isAutomaticDate"
                            value="automatic"
                            control={<Radio />}
                            // label="Automatic registration"
                            label="자동 등록"
                            checked={this.state.isAutomaticDate}
                            onClick={this.onSwapAutomaticDate}
                        />
                    </Grid>

                    {/* Manual date */}
                    <Grid item md={2} xs={3}>
                        <FormControlLabel
                            name="isAutomaticDate"
                            value="manual"
                            control={<Radio />}
                            // label="Manual registration"
                            label="예약 등록"
                            checked={!this.state.isAutomaticDate}
                            onClick={this.onSwapAutomaticDate}
                        />
                    </Grid>

                    {/* Register date */}
                    <Grid item md={3} xs={4}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            type="date"
                            name="registerDate"
                            defaultValue={moment(
                                info.registerDate,
                                "YYYY-MM-DDTHH:mm:ssZ"
                            ).format("YYYY-MM-DD")}
                            error={this.props.hasError("info.registerDate")}
                            helperText={
                                this.props.hasError("info.registerDate")
                                    ? this.props.errors["info.registerDate"][0]
                                    : null
                            }
                        />
                        <p style={{ display: "none" }}>
                            {this.props.hasError("info.registerDate")
                                ? this.props.enqueueSnackbar(
                                      this.props.errors[
                                          "info.registerDate"
                                      ][0] + "*registerDate",
                                      {
                                          variant: "error",
                                      }
                                  )
                                : null}
                        </p>
                    </Grid>
                </Grid>

                {/* Container */}
                <Grid container className="align-items-center mt-20">
                    <Grid item md={2} xs={12}>
                        <h5>간략한 설명</h5>
                    </Grid>

                    {/* TextField */}
                    <Grid item md={10} xs={12}>
                        <Grid container spacing={2}>
                            <Grid item md={7} xs={12}>
                                <TextField
                                    fullWidth
                                    label=""
                                    size="small"
                                    variant="outlined"
                                    name="shortDescription"
                                    placeholder="간략한 상품 설명을 적어주세요."
                                    defaultValue={
                                        shortDescription[0]
                                            ? shortDescription[0]
                                            : ""
                                    }
                                />
                            </Grid>
                            <Grid item md={7} xs={12} className="mt-10">
                                <TextField
                                    fullWidth
                                    label=""
                                    size="small"
                                    variant="outlined"
                                    name="shortDescription"
                                    placeholder="간략한 상품 설명을 적어주세요."
                                    defaultValue={
                                        shortDescription[1]
                                            ? shortDescription[1]
                                            : ""
                                    }
                                />
                            </Grid>
                            <Grid item md={7} xs={12} className="mt-10">
                                <TextField
                                    fullWidth
                                    label=""
                                    size="small"
                                    variant="outlined"
                                    name="shortDescription"
                                    placeholder="간략한 상품 설명을 적어주세요."
                                    defaultValue={
                                        shortDescription[2]
                                            ? shortDescription[2]
                                            : ""
                                    }
                                />
                            </Grid>
                            <Grid item md={7} xs={12} className="mt-10">
                                <TextField
                                    fullWidth
                                    label=""
                                    size="small"
                                    variant="outlined"
                                    name="shortDescription"
                                    placeholder="간략한 상품 설명을 적어주세요."
                                    defaultValue={
                                        shortDescription[3]
                                            ? shortDescription[3]
                                            : ""
                                    }
                                />
                            </Grid>
                            <Grid item md={7} xs={12} className="mt-10">
                                <TextField
                                    fullWidth
                                    label=""
                                    size="small"
                                    variant="outlined"
                                    name="shortDescription"
                                    placeholder="간략한 상품 설명을 적어주세요."
                                    defaultValue={
                                        shortDescription[4]
                                            ? shortDescription[4]
                                            : ""
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Premium service container */}
                {user.roleName === "ROLE_SELLER" ? (
                    <Grid
                        container
                        spacing={3}
                        className="align-items-center mt-20"
                    >
                        <Grid item md={2} xs={12}>
                            {/* <h5>Premium service</h5> */}
                            <h5 style={{ marginBottom: "0" }}>
                                프리미엄 서비스
                            </h5>
                            <p
                                style={{
                                    color: "red",
                                    fontSize: "12px",
                                    letterSpacing: "-1px",
                                    fontWeight: "600",
                                }}
                            >
                                체크 박스 선택시, 추가요금과 함께 해당 사이트에
                                상품이 리스팅 됩니다.
                            </p>
                        </Grid>

                        {/* Premium service */}
                        <Grid item md={10} xs={12}>
                            {this.state.premiumServices.map((item, index) => {
                                return (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="premiumService"
                                                value={item}
                                                color="primary"
                                                defaultChecked={productPremiumServices.includes(
                                                    item
                                                )}
                                                // onChange={(event) =>
                                                //   this.props.checkPremiumService(event, item)
                                                // }
                                            />
                                        }
                                        label={item}
                                    />
                                );
                            })}
                        </Grid>
                    </Grid>
                ) : null}

                {/* Description container */}
                <Grid
                    container
                    spacing={3}
                    className="align-items-center mt-20"
                >
                    <Grid item md={2} xs={12}>
                        {/* <h5>Description</h5> */}
                        <h5 style={{ marginBottom: "0" }}>상품 설명</h5>
                        <p
                            style={{
                                color: "red",
                                fontSize: "12px",
                                letterSpacing: "-1px",
                                fontWeight: "600",
                            }}
                        >
                            전체적인 상품의 설명과 사진을 업로드 해주세요.
                        </p>
                    </Grid>

                    {/* Description */}
                    <Grid item md={10} xs={12}>
                        <FormControl fullWidth>
                            {/* <CKEditor
                                type="classic"
                                name="description"
                                data={info.description}
                                config={{
                                    toolbarGroups: [
                                        {
                                            name: "clipboard",
                                            groups: ["clipboard", "undo"],
                                        },
                                        {
                                            name: "editing",
                                            groups: [
                                                "find",
                                                "selection",
                                                "spellchecker",
                                                "editing",
                                            ],
                                        },
                                        {
                                            name: "document",
                                            groups: [
                                                "mode",
                                                "document",
                                                "doctools",
                                            ],
                                        },
                                        { name: "forms", groups: ["forms"] },
                                        {
                                            name: "basicstyles",
                                            groups: ["basicstyles", "cleanup"],
                                        },
                                        {
                                            name: "paragraph",
                                            groups: [
                                                "list",
                                                "indent",
                                                "blocks",
                                                "align",
                                                "bidi",
                                                "paragraph",
                                            ],
                                        },
                                        { name: "links", groups: ["links"] },
                                        { name: "insert", groups: ["insert"] },
                                        { name: "styles", groups: ["styles"] },
                                        { name: "colors", groups: ["colors"] },
                                        { name: "tools", groups: ["tools"] },
                                        { name: "others", groups: ["others"] },
                                        { name: "about", groups: ["about"] },
                                    ],
                                }}
                                onChange={({ event, editor }) =>
                                    this.onChangeDescription(event, editor)
                                }
                            />
                            <textarea
                                name="description"
                                value={this.state.description}
                                style={{ display: "none" }}
                            /> */}
                            <Editor
                                onChangeQuillDescription={
                                    this.props.onChangeQuillDescription
                                }
                                body={this.props.description}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                {/* Seller policy popup */}
                <Dialog
                    open={this.state.isSellerPolicyMessage}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth="lg"
                >
                    {/* Title */}
                    <DialogTitle id="responsive-dialog-title">
                        <h2>Seller policy</h2>
                    </DialogTitle>
                    <Divider />

                    {/* Content */}
                    <DialogContent>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: this.props.sellerPolicyMessage
                                    .description,
                            }}
                        ></div>
                    </DialogContent>

                    <Divider />
                    {/* Actions */}
                    <DialogActions>
                        <Button
                            color="primary"
                            onClick={this.onCloseModal.bind(this)}
                        >
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
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
