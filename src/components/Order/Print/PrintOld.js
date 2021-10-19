import React from 'react';
import {
  Grid,
  Button,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  CardContent,
  
} from '@material-ui/core';
import PrintIcon from '@material-ui/icons/Print';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import PerfectScrollbar from 'react-perfect-scrollbar';

class OrderPrint extends React.Component {
  
  render() {
    return ( 
      <div className="card">
      <CardContent>
       <Grid container>
          <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item md={4} xs={12}>
                  <h5>배송 :</h5>
                  <h4>Marek Hamsik</h4>
                  <h4>(12345) Sotetsu Hotels Namdaemunno 5St. 15</h4>
                  <h4>Chunggu, Seoul</h4>
                  <h4>Korea</h4>
                </Grid>
                <Grid item md={7} xs={12}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" width="120px" />
                </Grid>
                <Grid item md={1} xs={12} className="small-btn">
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<PrintIcon />}
                  >
                    Print
                  </Button><br />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<OpenInBrowserIcon />}
                  >
                    Browse
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <h5>주문번호 (주문시간) :  X313131313D (2020.5.30 14:31)</h5>
                </Grid>
                <Grid item md={4} xs={12}>
                  <h5  className="mt-20">ORDER</h5>
          
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Marek Hamsik</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                          <TableCell align="center">Phone</TableCell>
                          <TableCell align="center">+082-010-1234-5678</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">E-Mail</TableCell>
                          <TableCell align="center">Test_customer@naver.com</TableCell>
                        </TableRow>
                    </TableBody>
                  </Table>
            
                  <div className="mt-20">
                    <CardContent>
                      <PerfectScrollbar>
                        <Table>
                          <TableBody>
                              <TableRow>
                                <TableCell align="center">Delivery</TableCell>
                                <TableCell align="center">Standard</TableCell>
                              </TableRow>
                          </TableBody>
                        </Table>
                      </PerfectScrollbar>
                    </CardContent>
                  </div>
                </Grid>
                
                <Grid item md={8} xs={12}>
                  <h5  className="mt-20">Deliver</h5>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Marek Hamsik</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                          <TableCell align="center">Phone</TableCell>
                          <TableCell align="center">+082-010-1234-5678</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">Address 1</TableCell>
                          <TableCell align="center">(12345) Namdaemunno  5St. 15 (Sotetsu hotels)</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">Address 2</TableCell>
                          <TableCell align="center">Chunggu, Seoul</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">Address 3</TableCell>
                          <TableCell align="center">Republic of Korea</TableCell>
                        </TableRow>
                    </TableBody>
                  </Table>
                </Grid>

                <Grid item xs={12}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">SKU</TableCell>
                        <TableCell align="center">123456789012</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                          <TableCell align="center">Item Name</TableCell>
                          <TableCell align="center">Mediheal X BTS Mask Test Item Red L</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">Qty</TableCell>
                          <TableCell align="center">1</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">Unit Price</TableCell>
                          <TableCell align="center">1</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">Discount</TableCell>
                          <TableCell align="center">0</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">Subtotal</TableCell>
                          <TableCell align="center">50</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">Invoice No</TableCell>
                          <TableCell align="center"></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">Status</TableCell>
                          <TableCell align="center">Pending</TableCell>
                        </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
          </Grid>
        </Grid>
      </CardContent>
      </div>);
  }
};

export default OrderPrint;
