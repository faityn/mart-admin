import React from "react";
import {
    Grid,
    TextField,
    FormControlLabel,
    RadioGroup,
    Radio,
    Button,
    Avatar,
    Badge,
    Card,
    CardHeader,
    CardContent,
    IconButton,
    FormHelperText,
} from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { UPLOAD_IMAGE } from "../Queries";
import { connect } from "react-redux";

/**
 * @summary Image
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Product
 */
class Image extends React.Component {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        let showImageUploadSection = true;
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

        // Default states
        this.state = {
            showImageUploadSection: showImageUploadSection,
            inputs: inputs,
            images:
                this.props.product && this.props.product.images
                    ? this.props.product.images
                    : [],
        };

        // Events
        this.onSwap = this.onSwap.bind(this);

        this._isMounted = false;
    }

    /**
     * @override
     */
    componentDidMount() {
        this._isMounted = true;
    }

    /**
     * @override
     */
    componentWillUnmount() {
        this._isMounted = false;
    }

    /**
     * @summary Add image
     * @param {String} url
     */
    onAddImage(url) {
        this._isMounted &&
            this.setState((prevState) => ({
                images: prevState.images.concat([{ imageUrl: url }]),
            }));
    }

    /**
     * @summary Delete Image
     * @param {String} url
     */
    onClickDelete(event, index) {
        event.stopPropagation();

        let images = this.state.images;
        images.splice(index, 1);

        this.setState({
            images: images,
        });
    }

    /**
     * @summary Swap image upload section
     * @param {MouseEvent} event
     */
    onSwap(event) {
        this.setState({
            showImageUploadSection: event.target.value !== "url",
            images: [],
            inputs: [""],
        });
    }

    /**
     * @summary Upload images
     * @param {!Array<Object>} images
     */
    async onDrop(images) {
        this.props.onProcessStart();
        this.props.enqueueSnackbar(
            "The uploading process is being started ...",
            {
                variant: "info",
            }
        );

        let promises = await images.reduce(
            (accumulatorPromise, image) =>
                accumulatorPromise.then(
                    (prevResolve) =>
                        new Promise((resolve) => {
                            this.props.apolloClient.uploadClient
                                .mutate({
                                    mutation: UPLOAD_IMAGE,
                                    variables: { image },
                                })
                                .then((result) => {
                                    if (
                                        result.data.uploadImageProduct
                                            .statusCode === 200
                                    ) {
                                        this.onAddImage(
                                            result.data.uploadImageProduct.data
                                        );
                                        resolve([...prevResolve, ...[true]]);
                                    } else {
                                        this.props.enqueueSnackbar(
                                            "Sorry, there is an error occurred while uploading image.",
                                            { variant: "error" }
                                        );
                                        resolve([...prevResolve, ...[false]]);
                                    }
                                })
                                .catch((error) => {
                                    this.props.enqueueSnackbar(
                                        "Sorry, there is an error occurred while uploading image.",
                                        { variant: "error" }
                                    );
                                    resolve([...prevResolve, ...[false]]);
                                });
                        })
                ),
            Promise.resolve([])
        );

        let message = !promises.find((f) => f === false)
            ? "The uploading process has been completed successfully."
            : "The uploading process has been completed with errors.";
        let variant = !promises.find((f) => f === false)
            ? "success"
            : "warning";

        this.props.enqueueSnackbar(message, { variant: variant });
        this._isMounted && this.props.onProcessEnd();
    }

    /**
     * @summary Add input
     * @param {MouseEvent} event
     */
    onAddInput(event) {
        event.stopPropagation();
        this.setState((prevState) => ({
            inputs: prevState.inputs.concat([""]),
        }));
    }

    /**
     * @override
     */
    render() {
        if (!this.props.isShowForm) return "";

        return (
            <CardContent>
                <Grid container spacing={3} className="align-items-center">
                    {/* Title */}
                    <Grid item md={2} xs={12}>
                        <h5>상세 이미지</h5>
                    </Grid>

                    {/* File upload */}
                    <Grid item md={2} xs={12}>
                        <RadioGroup aria-label="file" name="file">
                            <FormControlLabel
                                value="file"
                                name="fileOrLink"
                                control={<Radio />}
                                label="파일로 올리기"
                                onChange={this.onSwap}
                                checked={this.state.showImageUploadSection}
                            />
                        </RadioGroup>
                    </Grid>

                    {/* URL */}
                    <Grid item md={2} xs={12}>
                        <RadioGroup aria-label="url" name="url">
                            <FormControlLabel
                                value="url"
                                name="fileOrLink"
                                control={<Radio />}
                                label="URL 주소로 업로드"
                                onChange={this.onSwap}
                                checked={!this.state.showImageUploadSection}
                            />
                        </RadioGroup>
                    </Grid>
                </Grid>

                <Grid container spacing={3} className="align-items-center">
                    {this.state.showImageUploadSection ? (
                        <React.Fragment>
                            <FormHelperText>
                                *이미지 크기는 최소512px x 512px를 권장합니다.
                            </FormHelperText>
                            <DropzoneArea
                                maxFileSize={30000000}
                                acceptedFiles={["image/jpeg", "image/png"]}
                                filesLimit={10}
                                onDrop={this.onDrop.bind(this)}
                            />
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {this.state.inputs.map((input, index) => (
                                // Inputs
                                <Grid item md={3} xs={12} key={index}>
                                    <TextField
                                        fullWidth
                                        key={input}
                                        label="Url"
                                        size="small"
                                        variant="outlined"
                                        name="links"
                                        defaultValue={input}
                                    />
                                </Grid>
                            ))}

                            {/* Add button */}
                            <Grid item md={3} xs={12}>
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    onClick={this.onAddInput.bind(this)}
                                >
                                    Add URL
                                </Button>
                            </Grid>
                        </React.Fragment>
                    )}
                </Grid>

                <Grid
                    container
                    spacing={3}
                    className="align-items-center mt-20"
                >
                    {this.state.images.map((image, index) => {
                        let url =
                            image.imageUrl.substring(0, 4) !== "http"
                                ? process.env.REACT_APP_CDN_URL +
                                  "product/medium/" +
                                  image.imageUrl
                                : image.imageUrl;
                        return (
                            <Grid item md={2} key={index}>
                                <input
                                    type="hidden"
                                    name="images"
                                    value={image.imageUrl}
                                />
                                <Card>
                                    <CardHeader
                                        action={
                                            <IconButton
                                                color="primary"
                                                onClick={(e) =>
                                                    this.onClickDelete(e, index)
                                                }
                                            >
                                                <DeleteForeverIcon />
                                            </IconButton>
                                        }
                                        title={<img src={url} width="100%" />}
                                    />
                                </Card>
                            </Grid>
                        );
                    })}
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

export default connect(mapStateToProps, null)(Image);
