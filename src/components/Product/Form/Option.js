import React from 'react';
import { 
  Grid, CardContent, TextField, Table, TableBody, TableRow, Checkbox, FormControlLabel,
  TableCell, Button, Dialog, DialogContent, Divider, DialogTitle, DialogActions, InputLabel
  } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

/**
 * @summary Option
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Product/Form
 */
class Option extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenModal: false,
    };

    this.onOpenModal = this.onOpenModal.bind(this);
  }
  
  /**
   * @summary Open box
   * @param {event}
   */
  onOpenModal(e, index) {
    this.setState({
      index: index,
      isOpenModal: true,
    });
  }

  /**
   * @summary Close box
   * @param {event}
   */
  onCloseModal() {
    this.setState({ isOpenModal: false });
  }

  render(){      
    return <CardContent>
      <Grid container spacing={3} className="align-items-center">
        <Grid item md={2} xs={12}>
          <h5>옵션구성 정보입력</h5>
        </Grid>
        <Grid item md={6} xs={12}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-center"><strong>구분</strong></TableCell>
                <TableCell className="text-center"><strong>옵션 명</strong></TableCell>
                <TableCell className="text-center"><strong>옵션 값</strong></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>옵션 1 분류</TableCell>
                <TableCell>
                  <TextField 
                    fullWidth
                    placeholder="예시 : 색상"
                    size="small"
                    variant="outlined"
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <TextField 
                    fullWidth
                    placeholder="예시 : 파랑, 검정"
                    size="small"
                    variant="outlined"
                    disabled
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>옵션 2 분류</TableCell>
                <TableCell>
                  <TextField 
                    fullWidth
                    placeholder="예시 : 사이즈"
                    size="small"
                    variant="outlined"
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <TextField 
                    fullWidth
                    placeholder="예시 : S, M, XL, L, XXL, XXXL, XXXXL, XXXXXL"
                    size="small"
                    variant="outlined"
                    disabled
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-center" colspan={3}>
                  <Button
                    color="primary" 
                    onClick={this.onOpenModal.bind(this)}
                    size="small" variant="contained" startIcon={<SettingsIcon />}>옵션 구성하기</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </Grid>
      
      <Dialog open={this.state.isOpenModal}
        aria-labelledby="responsive-dialog-title"
        maxWidth="lg">
          <DialogTitle id="responsive-dialog-title">
            <h2>옵션 구성하기</h2>
          </DialogTitle> 
          <Divider />

          <DialogContent>
            <form id="product-form">
              <Grid item md={12} xs={12}>
                <Table className="member_table" style={{alignItems: "center"}}>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-center" width="33%">
                        <Grid container md={12} xs={12}>
                          <Grid item md={2} xs={12}>
                            <InputLabel>추가가격</InputLabel>
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                name="refund_delivery_price"
                                placeholder="1000"
                            />
                          </Grid>
                          <Grid item md={1} xs={12}>
                            <InputLabel>원</InputLabel>
                          </Grid>
                          <Grid item md={2} xs={12}>
                            <Button size="small" variant="contained" color="primary">입력</Button>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell className="text-center" width="33%">
                        <Grid container md={12} xs={12}>
                          <Grid item md={2} xs={12}>
                            <InputLabel>공급가</InputLabel>
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                name="refund_delivery_price"
                                placeholder="800"
                            />
                          </Grid>
                          <Grid item md={1} xs={12}>
                            <InputLabel>원</InputLabel>
                          </Grid>
                          <Grid item md={2} xs={12}>
                            <Button size="small" variant="contained" color="primary">입력</Button>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell className="text-center" width="33%">
                        <Grid container md={12} xs={12}>
                          <Grid item md={2} xs={12}>
                            <InputLabel>수량</InputLabel>
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                name="refund_delivery_price"
                                placeholder="100"
                            />
                          </Grid>
                          <Grid item md={1} xs={12}>
                            <InputLabel>개</InputLabel>
                          </Grid>
                          <Grid item md={2} xs={12}>
                            <Button size="small" variant="contained" color="primary">입력</Button>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
              <Grid item md={12} xs={12}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-center"><strong>선택</strong></TableCell>
                      <TableCell className="text-center"><strong>옵션 명</strong></TableCell>
                      <TableCell className="text-center"><strong>추가가격</strong></TableCell>
                      <TableCell className="text-center"><strong>공급가</strong></TableCell>
                      <TableCell className="text-center"><strong>수량</strong></TableCell>
                      <TableCell className="text-center"><strong>옵션관리코드</strong></TableCell>
                      <TableCell className="text-center"><strong>삭제</strong></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-center">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="primary"
                                    name="prePaid"
                                    value={true}
                                />
                            }
                        />
                      </TableCell>
                      <TableCell className="text-center">검정_100</TableCell>
                      <TableCell className="text-center">
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            name="refund_delivery_price"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            name="refund_delivery_price"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            name="refund_delivery_price"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            name="refund_delivery_price"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Button 
                          color="primary" 
                          startIcon={<EditIcon />}
                        >닫다</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-center">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="primary"
                                    name="prePaid"
                                    value={true}
                                />
                            }
                        />
                      </TableCell>
                      <TableCell className="text-center">검정_200</TableCell>
                      <TableCell className="text-center">
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            name="refund_delivery_price"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            name="refund_delivery_price"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            name="refund_delivery_price"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            name="refund_delivery_price"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Button 
                          color="primary" 
                          startIcon={<EditIcon />}
                        >닫다</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-left" colspan={5}>
                        <Button 
                          style={{backgroundColor: "#ff0000", color: "#fff"}}
                          startIcon={<DeleteIcon />}
                        >일괄삭제</Button>
                      </TableCell>
                      <TableCell className="text-right" colspan={2}>
                        <InputLabel>총 6 개의 옵션에서 공급 가능 수량은 총 0 개</InputLabel>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </form>
          </DialogContent>

          <Divider />
          <DialogActions>
            <Button autoFocus onClick={this.onCloseModal.bind(this)} color="primary">닫다</Button>
            {/*}
            <Button autoFocus form="product-form" type="submit" color="primary">
              Confirm
            </Button>*/}
          </DialogActions>
        </Dialog>
    </CardContent>
  }
};

export default Option; 

