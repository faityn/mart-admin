import React from "react";

const Product = () => {
  /**
   * @summary Card Move
   * @param {*} dragIndex
   * @param {*} hoverIndex
   */

  const moveCard = (dragIndex, hoverIndex) => {
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
      return { eventPick };
    });
  };
  return (
    <ListItem
      className={pickIndex === 1 ? "mt-20" : ""}
      style={{
        border: pickIndex === 0 ? "#cccccc 1px solid" : "",
      }}
    >
      <ListItemText
        id={pickIndex}
        onClick={(e) => onOpenModal(e, index)}
        primary={
          event.products[pickIndex]
            ? event.products[pickIndex].name
            : "SELECT PRODUCT"
        }
        style={{ cursor: "pointer" }}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="comments">
          <DeleteIcon onClick={(e) => onRemoveProduct(e, index, pickIndex)} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Product;
