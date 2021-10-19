import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import AddIcon from "@material-ui/icons/Add";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { DropzoneArea } from "material-ui-dropzone";
import {
  Grid,
  TextField,
  Divider,
  IconButton,
  Card,
  CardHeader,
} from "@material-ui/core";

export const Banner = ({
  id,
  banner,
  index,
  moveBanner,
  onClickDelete,
  onDrop,
}) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.BANNER,
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
      moveBanner(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BANNER,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div
      className="card mt-20"
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <Grid container className="mt-20 align-items-center">
        <input type="hidden" name="id" value={banner.id} />
        <Grid item md={2} xs={12}>
          <h5>Main banner {index + 1}</h5>
        </Grid>
        <Grid item md={10} xs={12}>
          <Grid container>
            <Grid item md={12} xs={12} key={index}>
              {banner.imageUrl ? (
                <Card>
                  <CardHeader
                    action={
                      <IconButton
                        color="primary"
                        onClick={(e) => onClickDelete(e, index)}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    }
                    title={
                      <img
                        src={
                          process.env.REACT_APP_CDN_URL +
                          "ads/banner/" +
                          banner.imageUrl
                        }
                        width="100%"
                      />
                    }
                  />
                </Card>
              ) : (
                <DropzoneArea
                  maxFileSize={30000000}
                  acceptedFiles={["image/jpeg", "image/png"]}
                  filesLimit={1}
                  onDrop={(e) => onDrop(e, index)}
                />
              )}
            </Grid>
          </Grid>
          <input type="hidden" name="images" value={banner.imageUrl} />
          <Grid container className="mt-20">
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                id="name-basic"
                label="Url is here"
                size="small"
                variant="outlined"
                name="url"
                defaultValue={banner.url}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
