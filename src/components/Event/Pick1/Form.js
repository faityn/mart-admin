import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";
import EventIcon from "@material-ui/icons/Event";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import {
  Grid,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  LinearProgress,
} from "@material-ui/core";
import { withSnackbar } from "notistack";
import validate from "validate.js";
import { connect } from "react-redux";
import SaveIcon from "@material-ui/icons/Save";
import FindProduct from "../FindProduct";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import {
  GET_EVENTPICKONE_AND_STICKER_CATEGORY,
  SAVE_EVENTPICKONE,
  UPLOAD_IMAGE_EVENT,
} from "../../Queries/Event";
import { Card } from "../common/Card";

/**
 * @summary Event pick one
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Settings
 */
class Form extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // state
    this.state = {
      isProcessing: "load",
      uploadImageIndex: null,
      errors: null,
      isOpenModal: false,
      isOpenDropDialog: false,
      files: [],
      stickers: null,
      index: null,
      categories: null,
      eventPick: [],
    };

    // Events
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onRemoveProduct = this.onRemoveProduct.bind(this);
    this.hasError = this.hasError.bind(this);
    this.moveCard = this.moveCard.bind(this);
    this.changeArrayProducts = this.changeArrayProducts.bind(this);
    this._isMounted = false;
  }

  /**
   * @override
   */
  async componentDidMount() {
    this._isMounted = true;

    await this.props.apolloClient.httpClient
      .query({
        query: GET_EVENTPICKONE_AND_STICKER_CATEGORY,
      })
      .then((result) => {
        this._isMounted &&
          this.setState({
            eventPick: result.data.getEventPickOne,
            stickers: result.data.getStickers,
            categories: result.data.categories.first,
          });
      })
      .catch((error) => {
        this._isMounted &&
          this.props.enqueueSnackbar(
            "Sorry, there is an error occurred while fetching data.",
            { variant: "error" }
          );
      });

    this._isMounted &&
      this.setState({
        isProcessing: "",
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
   * @summary Open box
   * @param {event}
   */
  onOpenModal(e, index) {
    if (this.state.eventPick[index].products.length < 4) {
      this.setState({
        index: index,
        isOpenModal: true,
      });
    } else {
      alert(
        "4개 까지 상품 선택 가능합니다.\n추가하시기 위해서는 필요 없는 상품을 제거후 다시 시도 해주시기 바랍니다."
      );
    }
  }

  /**
   * @summary Close box
   * @param {event}
   */
  onCloseModal() {
    this.setState({ isOpenModal: false });
  }

  /**
   * @override
   */
  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * @summary Upload files
   * @param {!Array<Object>} files
   */
  async onDrop(images) {
    this.setState({
      isProcessing: "upload",
      isOpenDropDialog: false,
    });

    this.props.enqueueSnackbar("The uploading process is being started ...", {
      variant: "info",
    });

    let eventPick = this.state.eventPick;
    let index = this.state.index;

    let promise = await images.reduce(
      (accumulatorPromise, image) =>
        accumulatorPromise.then(
          () =>
            new Promise((resolve) => {
              this.props.apolloClient.uploadClient
                .mutate({
                  mutation: UPLOAD_IMAGE_EVENT,
                  variables: {
                    file: image,
                  },
                })
                .then((result) => {
                  if (result.data.uploadEventPickImage) {
                    eventPick[index].imageUrl =
                      result.data.uploadEventPickImage.data;

                    this.setState({
                      eventPick: eventPick,
                    });

                    this.props.enqueueSnackbar(
                      "The uploading process has been completed successfully.",
                      { variant: "success" }
                    );
                  }

                  resolve(true);
                })
                .catch((error) => {
                  this.props.enqueueSnackbar(
                    "The uploading process has been completed with errors.",
                    { variant: "warning" }
                  );

                  resolve(true);
                });
            })
        ),
      Promise.resolve()
    );

    this.setState({
      isProcessing: "",
    });
  }

  /**
   * @summary Open upload image dialog
   * @param {MouseEvent} e
   * @param {number} index
   */
  onDropOpen(e, index) {
    this.setState({
      index: index,
      isOpenDropDialog: true,
      uploadImageIndex: index,
    });
  }

  /**
   * @summary Close upload image dialog
   */
  onDropClose() {
    this.setState({
      isOpenDropDialog: false,
    });
  }

  /**
   * @summary Remove product
   * @param {MouseEvent} event
   */
  onRemoveProduct(e, index, productIndex) {
    let eventPick = this.state.eventPick;
    eventPick[index].products.splice(productIndex, 1);

    this.setState({ eventPick: eventPick });
  }

  /**
   * @summary Remove event
   * @param {MouseEvent} event
   */
  onRemoveEvent(e, index) {
    let eventPick = this.state.eventPick;
    eventPick.splice(index, 1);

    this.setState({ eventPick: eventPick });
  }

  /**
   * @summary Product list form submit
   */
  onSubmitProductForm(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    let productIds = formData.getAll("productId");
    let eventPick = this.state.eventPick;
    let index = this.state.index;
    let sum = eventPick[index].products.length + productIds.length;

    if (sum > 4) {
      alert("4개이상 등록하실수 없습니다. 다시 시도 해주세요.");
      return;
    } else {
      (productIds || []).map((id) => {
        if (!eventPick[index].products.find((f) => f.productId === id))
          eventPick[index].products.push({
            productId: id,
            name: formData.get(id),
          });
      });
    }

    this.setState({
      eventPick: eventPick,
      isOpenModal: false,
    });
  }

  /**
   * @summary Validate data
   * @param {Array} eventPick
   */
  onValidateSubmit(eventPickForValidation) {
    let schema = {};

    Object.keys(eventPickForValidation).map((key) => {
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
    const errors = validate(eventPickForValidation, schema);

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
    let eventPick = [];
    let eventPickForValidation = [];

    // datas
    let ids = formData.getAll("id");
    let names = formData.getAll("name");
    let descriptions = formData.getAll("description");
    let imageUrls = formData.getAll("imageUrl");
    let categoryIds = formData.getAll("categoryId");
    let stickerIds = formData.getAll("stickerId");

    for (let i = 0; i < names.length; i++) {
      let products = this.state.eventPick[i].products
        ? this.state.eventPick[i].products
        : null;
      let image = this.state.eventPick[i].imageUrl
        ? this.state.eventPick[i].imageUrl
        : null;

      eventPick.push({
        id: ids[i],
        name: names[i],
        description: descriptions[i],
        imageUrl: image,
        categoryId: categoryIds[i],
        stickerId: stickerIds[i],
        productIds: products.reduce((accumulator, product) => {
          accumulator.push(product.productId);
          return accumulator;
        }, []),
      });

      eventPickForValidation["name" + i] = names[i];
      eventPickForValidation["description" + i] = descriptions[i];
    }

    // Validate
    if (this.onValidateSubmit(eventPickForValidation)) return;

    this.setState({ isProcessing: "save" });

    // Toast process started
    this.props.enqueueSnackbar("The saving process is being started ...", {
      variant: "info",
    });

    // Mutate
    let promise = await new Promise((resolve) =>
      this.props.apolloClient.httpClient
        .mutate({
          mutation: SAVE_EVENTPICKONE,
          variables: {
            eventPickOne: eventPick,
          },
        })
        .then((result) => {
          if (result.data.saveEventPickOne.statusCode === 200) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((error) => {
          resolve(false);
        })
    );

    if (promise) {
      this._isMounted &&
        this.props.enqueueSnackbar(
          "Event pick one has been successfully updated.",
          { variant: "success" }
        );
    } else {
      this._isMounted &&
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while saving data.",
          { variant: "error" }
        );
    }

    this._isMounted && this.setState({ isProcessing: "" });
  }

  /**
   * @summary Detail
   * @param {Event} childrenName
   */
  onAddEvent() {
    this.setState((prevState) => ({
      eventPick: prevState.eventPick.concat([
        {
          id: "",
          name: "",
          description: "",
          imageUrl: "",
          categoryId: "",
          stickerId: "",
          products: [],
        },
      ]),
    }));
  }

  /**
   * @summary Card Move
   * @param {*} dragIndex
   * @param {*} hoverIndex
   */

  moveCard(dragIndex, hoverIndex) {
    const dragCard = this.state.eventPick[dragIndex];
    this.setState((prevState) => {
      const { eventPick } = update(prevState, {
        eventPick: {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        },
      });
      console.log({ eventPick });
      return { eventPick };
    });
  }

  /**
   * eventPick.Products 배열 순서 변경하기
   * @param {*} listIndex
   * @param {*} targetIdx
   * @param {*} move
   * @returns eventPick[]
   */
  changeArrayProducts(listIndex, targetIdx, move) {
    if (this.state.eventPick.length < 0) return;

    let eventPick = this.state.eventPick;
    let tmp = eventPick[listIndex].products[targetIdx];

    eventPick[listIndex].products[targetIdx] = this.state.eventPick[
      listIndex
    ].products[targetIdx + move];
    eventPick[listIndex].products[targetIdx + move] = tmp;
    console.log(this.state.eventPick[listIndex].products);

    this.setState({
      ...this.state,
      eventPick: eventPick,
    });
  }

  /**
   * @override
   */
  render() {
    const picks = ["", "", "", ""];

    return (
      <React.Fragment>
        {/* Title section */}
        <Grid container>
          <Grid item>
            {/* Title */}
            <PageTitle
              menuName="Event Pick One"
              title="List"
              icon={<EventIcon />}
            />
          </Grid>
        </Grid>
        {this.state.isProcessing === "load" ? (
          <LinearProgress />
        ) : (
          <form
            id="my-form-managemnt"
            onSubmit={this.onHandleSubmit.bind(this)}
          >
            <Grid container>
              <DndProvider backend={HTML5Backend}>
                {this.state.eventPick.map((event, index) => (
                  <Card
                    event={event}
                    key={event.id}
                    index={index}
                    moveCard={this.moveCard}
                    onRemoveEvent={this.onRemoveEvent}
                    hasError={this.hasError}
                    state={this.state}
                    isOpenDropDialog={this.state.isOpenDropDialog}
                    onDropClose={this.onDropClose.bind(this)}
                    onDrop={this.onDrop.bind(this)}
                    onDropOpen={this.onDropOpen.bind(this)}
                    onOpenModal={this.onOpenModal}
                    onRemoveProduct={this.onRemoveProduct}
                    changeArrayProducts={this.changeArrayProducts}
                  />
                ))}
              </DndProvider>
            </Grid>
          </form>
        )}
        <div className="card mt-20">
          <Grid container>
            <Grid item md={12} xs={12}>
              <Button
                form="my-form-managemnt"
                variant="contained"
                size="small"
                color="primary"
                type="submit"
                disabled={this.state.isProcessing !== ""}
                startIcon={
                  this.state.isProcessing === "save" ? (
                    <CircularProgress color="white" size="1rem" />
                  ) : (
                    <SaveIcon fontSize="small" className="mr-10" />
                  )
                }
              >
                Save
              </Button>
              <Button
                className="ml-20 bordered"
                variant="contained"
                color="default"
                size="small"
                onClick={this.onAddEvent.bind(this)}
                startIcon={<NoteAddIcon />}
                disabled={
                  this.state.isProcessing === "save" ||
                  this.state.isProcessing === "load"
                }
              >
                New Event
              </Button>
            </Grid>
          </Grid>
        </div>

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
            <Button autoFocus form="product-form" type="submit" color="primary">
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

export default withSnackbar(connect(mapStateToProps, null)(Form));
