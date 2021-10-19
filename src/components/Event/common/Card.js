import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import ImageIcon from "@material-ui/icons/Image";
import { DropzoneDialog } from "material-ui-dropzone";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EventIcon from "@material-ui/icons/Event";
import {
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
} from "@material-ui/core";

export const Card = ({
  id,
  event,
  index,
  moveCard,
  onRemoveEvent,
  hasError,
  state,
  isOpenDropDialog,
  onDropClose,
  onDropOpen,
  onDrop,
  onOpenModal,
  onRemoveProduct,
  changeArrayProducts,
}) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      console.log(dragIndex);
      console.log(hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      console.log(id);
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  const picks = ["", "", "", ""];
  return (
    <Grid item md={6} ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      <div className="card" style={{ margin: "20px 20px 0 0" }}>
        <input name="id" type="hidden" value={event.id} />
        <Grid container spacing={3}>
          <Grid item xs={12} className="text-right">
            <IconButton
              aria-label="delete"
              onClick={(e) => onRemoveEvent(e, index)}
            >
              <DeleteForeverIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            {/* Title */}
            <Grid container>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  id="nameEng-basic"
                  label="Event name"
                  size="small"
                  variant="outlined"
                  name="name"
                  defaultValue={event.name}
                  error={hasError("name" + index)}
                  helperText={
                    hasError("name" + index)
                      ? state.errors["name" + index][0]
                      : null
                  }
                />
              </Grid>

              {/* Phrase */}
              <Grid item md={12} xs={12} className="mt-20">
                <TextField
                  fullWidth
                  id="nameEng-basic"
                  label="Event description"
                  size="small"
                  variant="outlined"
                  name="description"
                  defaultValue={event.description}
                  error={hasError("description" + index)}
                  helperText={
                    hasError("description" + index)
                      ? state.errors["description" + index][0]
                      : null
                  }
                />
              </Grid>

              {/* Category */}
              <Grid item md={12} xs={12} className="mt-20">
                <FormControl fullWidth size="small" variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Category"
                    name="categoryId"
                    defaultValue={event.categoryId}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {(state.categories || []).map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Sticker */}
              <Grid item md={12} xs={12} className="mt-20">
                <FormControl fullWidth size="small" variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label">
                    Sticker
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Sticker"
                    name="stickerId"
                    defaultValue={event.stickerId}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {(state.stickers || []).map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Image */}
              <Grid item md={12} xs={12} className="mt-20">
                <div>
                  {event.imageUrl ? (
                    <img
                      src={
                        process.env.REACT_APP_CDN_URL +
                        "product/eventpick/" +
                        event.imageUrl
                      }
                      width="125"
                      height="125"
                    />
                  ) : (
                    <EventIcon
                      fontSize="large"
                      style={{ width: "125px", height: "125px" }}
                    />
                  )}
                </div>
                <div>
                  <Button
                    startIcon={
                      state.isProcessing === "upload" &&
                      state.uploadImageIndex === index ? (
                        <CircularProgress color="white" size="1rem" />
                      ) : (
                        <ImageIcon />
                      )
                    }
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={(e) => onDropOpen(e, index)}
                  >
                    Upload Image
                  </Button>
                  <DropzoneDialog
                    maxFileSize={30000000}
                    acceptedFiles={["image/*"]}
                    filesLimit={1}
                    open={isOpenDropDialog}
                    onClose={onDropClose}
                    onDrop={onDrop}
                  />
                </div>
              </Grid>

              <Grid item md={12} xs={12}>
                <List>
                  <Button
                    onClick={(e) => onOpenModal(e, index)}
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ margin: "10px 0" }}
                  >
                    Product Add
                  </Button>
                  {event.products.map((product, productIndex) => {
                    return (
                      <ListItem
                        className={productIndex === 1 ? "mt-20" : ""}
                        style={{
                          border: productIndex === 0 ? "#cccccc 1px solid" : "",
                        }}
                      >
                        {productIndex !== 0 ? (
                          <IconButton edge="start" aria-label="comments">
                            <ExpandLessIcon
                              onClick={() =>
                                changeArrayProducts(index, productIndex, -1)
                              }
                            />
                          </IconButton>
                        ) : null}
                        {productIndex !== 3 ? (
                          <IconButton edge="start" aria-label="comments">
                            <ExpandMoreIcon
                              onClick={() =>
                                changeArrayProducts(index, productIndex, 1)
                              }
                            />
                          </IconButton>
                        ) : null}
                        <ListItemText
                          id={index}
                          // onClick={(e) => onOpenModal(e, index)}
                          primary={product ? product.name : "SELECT PRODUCT"}
                          // value={product ? product.name : "SELECT PRODUCT"}
                          style={{ cursor: "pointer" }}
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="comments">
                            <DeleteIcon
                              onClick={(e) =>
                                onRemoveProduct(e, index, productIndex)
                              }
                            />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};
