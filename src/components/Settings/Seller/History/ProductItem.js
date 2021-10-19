import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Table,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import moment from "moment";
import React, { useEffect, useState } from "react";

const ProductItem = ({ calData }) => {
    return Object.keys(calData).map((item_key, index) => {
        let sum = 0;
        calData[item_key].map((item) => (sum += item.tradePrice));
        return (
            <Accordion square expanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography
                        align="center"
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-around",
                        }}
                    >
                        <span>
                            정산번호 : <strong>{item_key}</strong>
                        </span>
                        <span>
                            정산금액 : <strong>{sum}</strong>
                        </span>
                    </Typography>
                    {/* <Typography align="center">
                                    {e.price}
                                </Typography> */}
                </AccordionSummary>
                <AccordionDetails style={{ flexWrap: "wrap" }}>
                    <Table className="product-list">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">날짜</TableCell>
                                <TableCell align="center">
                                    파트너명
                                </TableCell>
                                <TableCell align="center">금액</TableCell>
                                <TableCell align="center">메모</TableCell>
                            </TableRow>
                        </TableHead>
                        {calData[item_key].map((e, n) => {
                            return (
                                // <></>
                                <>
                                    <TableRow
                                        key={e.id}
                                        style={{ width: "100%" }}
                                    >
                                        <TableCell align="center">
                                            {moment(e.createdDate).format(
                                                "YYYY-MM-DD"
                                            )}
                                        </TableCell>
                                        <TableCell align="center">
                                            {e.sellerName}
                                        </TableCell>
                                        <TableCell align="center">
                                            {e.tradePrice}
                                        </TableCell>
                                        <TableCell align="center">
                                            {e.description}
                                        </TableCell>
                                    </TableRow>
                                </>
                            );
                        })}
                    </Table>
                </AccordionDetails>
            </Accordion>
        );
    });
};

export default ProductItem;
