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
import dateFormat from "dateformat";

const SelectedProductItem = (props) => {
  return (
    <TableRow>
      <TableCell className="text-center" width="20%">
        {props.el.code}
      </TableCell>
      <TableCell className="text-center" width="25%">
        {props.el.barcode}
      </TableCell>

      <TableCell className="text-center" width="">
        {props.el.name}
      </TableCell>

      <TableCell className="text-center" width="25%">
        <TextField
          id={`price${props.el.id}`}
          fullWidth
          defaultValue="0"
          size="small"
          variant="outlined"
        />
      </TableCell>
    </TableRow>
  );
};

export default SelectedProductItem;
