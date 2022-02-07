import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Table,
  TableBody,
  TableRow,
  TableCell,
  FormControlLabel,
  Checkbox,
  CardMedia,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Switch } from "react-switch-input";

const ProductItem = (props) => {
  //   const [isChecked, setChecked] = useState(false);
  console.log("CHILD: ", props.checkedItems);
  return (
    <TableRow>
      <TableCell className="text-center">{props.index + 1}</TableCell>
      <TableCell className="text-center">
        <Checkbox
          color="primary"
          inputProps={{ "aria-label": "controlled" }}
          value={props.el.id}
          id={`check${props.el.id}`}
          //   checked={props.checked}
          checked={
            props.checkedItems.find(
              (item) => item.productId === props.el.id
            ) !== undefined
          }
          //   style={{ marginLeft: "18%" }}
          onChange={props.selectProduct}
        />
      </TableCell>
      <TableCell className="text-center">{props.el.code}</TableCell>
      <TableCell className="text-center">{props.el.barcode}</TableCell>
      <TableCell className="text-center">{props.el.categoryName}</TableCell>
      <TableCell className="text-center">
        <CardMedia
          component="img"
          height="50"
          src={`http://ahuyndoghxay9281829.cdn.ntruss.com/${props.el.images[0]}?type=m&w=100&h=100`}
        />
      </TableCell>
      <TableCell className="text-center">
        <Link to="/product-detail" className="text-blue">
          {props.el.name}
        </Link>
      </TableCell>
      <TableCell className="text-center">{props.el.brand}</TableCell>
      <TableCell className="text-center">0</TableCell>

      <TableCell className="text-center">{props.el.defaultPrice}</TableCell>
      <TableCell className="text-center">
        {(() => {
          if (props.el.price) {
            return (
              <TextField
                id={`price${props.el.id}`}
                fullWidth
                defaultValue={props.el.price}
                size="small"
                variant="outlined"
                // onChange={(e) => priceChange(e, el.id)}
                inputProps={{ readOnly: true }}
                disabled
              />
            );
          } else {
            return (
              <TextField
                id={`price${props.el.id}`}
                fullWidth
                defaultValue="0"
                size="small"
                variant="outlined"
                // onChange={(e) => priceChange(e, el.id)}
              />
            );
          }
        })()}
      </TableCell>
      <TableCell className="text-center">
        <TextField
          id={`qty${props.el.id}`}
          fullWidth
          defaultValue={props.el.quantity}
          size="small"
          variant="outlined"
          //   onChange={(e) => qtyChange(e, el.id)}
        />
      </TableCell>
      <TableCell className="text-center">
        <Switch
          name={`sale-${props.el.id}`}
          onChange={() => props.changeSaleStatus(props.el.id)}
          checked={props.el.saleYN === true}
        />
      </TableCell>
      <TableCell className="text-center">
        <Switch
          name={`show-${props.el.id}`}
          onChange={() => props.changeShowStatus(props.el.id)}
          //   labelRight={state.showLabel}
          //   onChange={changeShowStatus.bind(this)}
          checked={props.el.showYN === true}
        />
      </TableCell>
    </TableRow>
  );
};

export default ProductItem;
