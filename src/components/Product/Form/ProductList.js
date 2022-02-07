
import React from "react";
import { Grid, TextField, Button, FormControl, Select, MenuItem, InputLabel, Table, TableBody, TableRow, TableCell, FormControlLabel, Checkbox, CardMedia, Link,
    Dialog, DialogTitle, DialogActions, Divider, RadioGroup, Radio} from "@material-ui/core";
const ProductList = props => {
  return (
    <TableRow>
        <TableCell className="text-center">1</TableCell>
        <TableCell className="text-center">
            <FormControlLabel
                control={
                    <Checkbox
                        color="primary"
                        value={true}
                    />
                }
                style={{marginLeft: "18%"}}
            />
        </TableCell>
        <TableCell className="text-center">2020102548</TableCell>
        <TableCell className="text-center">8808945190_A0102</TableCell>
        <TableCell className="text-center">
            <CardMedia
                component="img"
                height="50"
                src="https://source.unsplash.com/user/c_v_r/100x100"
                />
        </TableCell>
        <TableCell className="text-center"><Link onClick={this.onOpenModal.bind(this)}>신라면 20개입 1박스..</Link></TableCell>
        <TableCell className="text-center">9</TableCell>
        <TableCell className="text-center">농심</TableCell>
        <TableCell className="text-center">99</TableCell>
        <TableCell className="text-center">신라면</TableCell>
        <TableCell className="text-center">판매가능</TableCell>
        <TableCell className="text-center">20,000</TableCell>
        <TableCell className="text-center">17,500</TableCell>
        <TableCell className="text-center">전시중</TableCell>
        <TableCell className="text-center">2021.01.01</TableCell>
        <TableCell className="text-center">2021.02.01</TableCell>
    </TableRow>
  );
};

export default ProductList;