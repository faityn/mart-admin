import React from "react";
import {Grid, CardContent, Select, MenuItem, FormControl, InputLabel, Table, TableBody, TableRow, TableCell, Button, TextField, Dialog, DialogContent, 
        DialogTitle, DialogActions, Divider, FormControlLabel, Checkbox
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';

class Confirmation extends React.Component {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        this.state = {
          isOpenModal: false,
          isSecondModal: false,
          isViewProductDetail: false,
          foodProcessedStatus: 0,
        };
    
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onSecondModal = this.onSecondModal.bind(this);
        this.onChangeViewProductDetail = this.onChangeViewProductDetail.bind(this);
        this.onChangeFoodProcessedStatus = this.onChangeFoodProcessedStatus.bind(this);
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
     * @summary Open box
     * @param {event}
     */
    onSecondModal(e, index) {
      this.setState({
        index: index,
        isSecondModal: true,
      });
    }

    /**
     * @summary Open box
     * @param {event}
     */
    onChangeViewProductDetail(e, index) {
        this.setState({isViewProductDetail: !this.state.isViewProductDetail });
    } 
    
    onChangeFoodProcessedStatus = event => {
        this.setState({foodProcessedStatus: event.target.value});
    };

    /**
     * @summary Close box
     * @param {event}
     */
    onCloseModal() {
      this.setState({ isOpenModal: false });
    }
  
    /**
     * @summary Close box
     * @param {event}
     */
    onCloseSecondModal() {
      this.setState({ isSecondModal: false });
    }
  
    /**
     * @override
     */
    render() {
        return (
            <CardContent>
                <Grid container spacing={3} className="align-items-center">
                    <Grid item md={8} xs={12}><h5>????????????</h5></Grid>
                    <Grid item md={8} xs={12}>
                        <Table className="mail_table">
                            <TableBody>
                                <TableRow>
                                    <TableCell width="5%"><strong>???????????? ????????? ????????????</strong></TableCell>
                                    <TableCell>
                                        <Grid container md={10} xs={12}> 
                                            <Grid item md={6} xs={12}>
                                                <FormControl size="small" fullWidth variant="outlined">
                                                    <InputLabel>???????????? ????????? ??????</InputLabel>
                                                    <Select>
                                                        <MenuItem value="">...</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={4} xs={12} style={{marginLeft: "1rem"}}>
                                                <Button
                                                    size="medium"
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={this.onOpenModal.bind(this)}
                                                >
                                                    ????????? ??????
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell width="5%"><strong>?????? ????????????</strong></TableCell>
                                    <TableCell>
                                        <Grid item md={5} xs={12}>
                                            <FormControl size="small" fullWidth variant="outlined">
                                                <InputLabel>????????????</InputLabel>
                                                <Select>
                                                    <MenuItem value="1">??????</MenuItem>
                                                    <MenuItem value="2">??????/??????</MenuItem>
                                                    <MenuItem value="3">??????</MenuItem>
                                                    <MenuItem value="4">????????????(??????/??????, ????????????)</MenuItem>
                                                    <MenuItem value="5">?????????/??????</MenuItem>
                                                    <MenuItem value="6">??????(??????/??????/?????????/DIY??????)</MenuItem>
                                                    <MenuItem value="7">????????????(TV???)</MenuItem>
                                                    <MenuItem value="8">????????? ????????????(?????????/?????????/???????????????/???????????????)</MenuItem>
                                                    <MenuItem value="9">????????????(?????????/?????????)</MenuItem>
                                                    <MenuItem value="10">???????????????(?????????/?????????/?????????)</MenuItem>
                                                    <MenuItem value="11">????????????(??????????????????/?????????)</MenuItem>
                                                    <MenuItem value="12">????????????(MP3/???????????? ???)</MenuItem>
                                                    <MenuItem value="13">?????????</MenuItem>
                                                    <MenuItem value="14">???????????????</MenuItem>
                                                    <MenuItem value="15">???????????????(???????????????, ?????? ???????????????)</MenuItem>
                                                    <MenuItem value="16">????????????</MenuItem>
                                                    <MenuItem value="17">????????????</MenuItem>
                                                    <MenuItem value="18">?????????</MenuItem>
                                                    <MenuItem value="19">?????????/??????/?????????</MenuItem>
                                                    <MenuItem value="20">??????(????????????)</MenuItem>
                                                    <MenuItem value="21">????????????</MenuItem>
                                                    <MenuItem value="22">??????????????????</MenuItem>
                                                    <MenuItem value="23">??????????????????</MenuItem>
                                                    <MenuItem value="24">??????</MenuItem>
                                                    <MenuItem value="25">???????????????</MenuItem>
                                                    <MenuItem value="26">??????</MenuItem>
                                                    <MenuItem value="27">??????/?????? ??????</MenuItem>
                                                    <MenuItem value="28">???????????????</MenuItem>
                                                    <MenuItem value="29">?????????</MenuItem>
                                                    <MenuItem value="30">????????? ?????? ?????????(?????????)</MenuItem>
                                                    <MenuItem value="31">???????????? ?????????(?????????, ??????, ??????????????? ???)</MenuItem>
                                                    <MenuItem value="32">???????????? ?????????(??????, ????????????, ???????????? ???)</MenuItem>
                                                    <MenuItem value="33">????????? ?????????(??????, ??????, ??????????????? ???)</MenuItem>
                                                    <MenuItem value="34">??????</MenuItem>
                                                    <MenuItem value="35">???????????????</MenuItem>
                                                    <MenuItem value="36">????????????</MenuItem>
                                                    <MenuItem value="37">??????/??????</MenuItem>
                                                    <MenuItem value="38">??????????????????</MenuItem>
                                                    <MenuItem value="39">???????????????</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>        
                    </Grid>

                    <Grid item md={8} xs={12}><h5>????????????</h5></Grid>
                    <Grid item md={12} xs={12}>
                        <Table className="order_table">
                            <TableBody>
                                <TableRow>
                                    <TableCell className="text-center" width="15%"><strong>????????????</strong></TableCell>
                                    <TableCell className="text-center" width="15%"><strong>?????????</strong></TableCell>
                                    <TableCell className="text-center" width="15%"><strong>????????????</strong></TableCell>
                                    <TableCell className="text-center" width="15%"><strong>????????????</strong></TableCell>
                                    <TableCell className="text-center" width="25%"><strong>????????????</strong></TableCell>
                                    <TableCell className="text-center" width="15%"><strong>??????</strong></TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <Grid item md={12} xs={12}>
                                            <FormControl size="small" fullWidth variant="outlined">
                                                <InputLabel>??????</InputLabel>
                                                <Select>
                                                    <MenuItem value="1">???????????? ??????</MenuItem>
                                                    <MenuItem value="2">[?????????]????????????</MenuItem>
                                                    <MenuItem value="3">[?????????]??????????????????</MenuItem>
                                                    <MenuItem value="4">[?????????]??????/????????????</MenuItem>
                                                    <MenuItem value="5">[?????????]?????????????????????</MenuItem>
                                                    <MenuItem value="6">[????????????]????????????</MenuItem>
                                                    <MenuItem value="7">[????????????]????????????</MenuItem>
                                                    <MenuItem value="8">[????????????]????????? ???????????????</MenuItem>
                                                    <MenuItem value="9">[?????????????????????]???????????????</MenuItem>
                                                    <MenuItem value="10">[???????????????]????????????</MenuItem>
                                                    <MenuItem value="11">[???????????????]????????? ???????????????</MenuItem>
                                                    <MenuItem value="12">[???????????????]????????????</MenuItem>
                                                    <MenuItem value="13">??????????????????</MenuItem>
                                                    <MenuItem value="14">??????</MenuItem>
                                                    <MenuItem value="15">?????????</MenuItem>
                                                    <MenuItem value="16">?????????</MenuItem>
                                                    <MenuItem value="17">?????????</MenuItem>
                                                    <MenuItem value="18">?????????</MenuItem>
                                                    <MenuItem value="19">?????? ??????/?????????</MenuItem>
                                                    <MenuItem value="20">????????????</MenuItem>
                                                    <MenuItem value="21">??????????????????</MenuItem>
                                                    <MenuItem value="22">?????????????????? ??????????????????</MenuItem>
                                                    <MenuItem value="23">????????????</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </TableCell>
                                    <TableCell>
                                        <Grid item md={12} xs={12}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                variant="outlined"
                                            />
                                        </Grid>
                                    </TableCell>
                                    <TableCell>
                                        <Grid item md={12} xs={12}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                variant="outlined"
                                            />
                                        </Grid>
                                    </TableCell>
                                    <TableCell>
                                        <Grid item md={12} xs={12}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                variant="outlined"
                                            />
                                        </Grid>
                                    </TableCell>
                                    <TableCell>
                                        <Grid container md={12} xs={12}>
                                            <Grid item md={8} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item md={4} xs={12}>                                                
                                                <Button
                                                    size="medium"
                                                    variant="contained"
                                                    color="primary"
                                                >
                                                    ?????? ??????
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                    <TableCell>
                                        <Grid container md={12} xs={12} className="text-center">
                                            <Grid item md={6} xs={12}>
                                                <Button
                                                    size="medium"
                                                    variant="contained"
                                                    color="primary"
                                                    startIcon={<AddIcon/>}
                                                >
                                                    ??????
                                                </Button>
                                            </Grid>
                                            <Grid item md={6} xs={12}>  
                                                <Button
                                                    size="medium"
                                                    variant="contained"
                                                    style={{backgroundColor: "#ff0000", color: "#fff"}}
                                                    startIcon={<DeleteIcon/>}
                                                >
                                                    ??????
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>        
                    </Grid>

                    <Grid container md={12} xs={12} className="mt-12">
                        <Grid item md={6} xs={12} className="text-right">
                            <Button
                                size="medium"
                                variant="contained"
                                color="primary"
                                startIcon={<SaveIcon/>}
                                style={{marginRight: "5px"}}
                            >??????</Button>
                        </Grid>
                        <Grid item md={6} xs={12} className="text-left">
                            <Button
                                size="medium"
                                variant="outlined"
                                style={{backgroundColor: "#fff", color: "#000"}}
                                startIcon={<CancelIcon/>}
                                style={{marginLeft: "5px"}}
                            >??????</Button>
                        </Grid>
                    </Grid>
                </Grid>

                <Dialog open={this.state.isOpenModal}
                    aria-labelledby="responsive-dialog-title" maxWidth="lg">
                    <DialogContent>
                        <form id="product-form">
                            <Grid container spacing={3} className="align-items-center" md={12} xs={12} >
                                <Grid item md={12} xs={12}>
                                    <Table className="member_table" style={{alignItems: "center"}}>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="text-center" width="15%"><InputLabel>????????????</InputLabel></TableCell>
                                                <TableCell width="30%">
                                                    <Grid item md={12} xs={12}>
                                                        <FormControl size="small" fullWidth variant="outlined">
                                                            <InputLabel>??????</InputLabel>
                                                            <Select>
                                                                <MenuItem value="1">???????????? ??????</MenuItem>
                                                                <MenuItem value="2">[?????????]????????????</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </TableCell>
                                                <TableCell className="text-center" width="20%"><InputLabel>???????????? ??????</InputLabel></TableCell>
                                                <TableCell className="text-center" width="35%">
                                                    <Grid container md={12} xs={12}>
                                                        <Grid item md={8} xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                            />
                                                        </Grid>
                                                        <Grid item md={4} xs={12} style={{paddingLeft: "5px"}}>
                                                            <Button size="medium" variant="contained" color="primary">??????</Button>
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} className="align-items-center mt-20">
                                <Grid item md={12} xs={12} className="text-right">
                                    <Button size="medium" variant="contained" color="primary" startIcon={<AddIcon/>} onClick={this.onSecondModal.bind(this)}>????????????</Button>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} className="align-items-center mt-20">
                                <Grid item md={12} xs={12}>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="text-center"><strong>??????</strong></TableCell>
                                                <TableCell className="text-center"><strong>????????? ???</strong></TableCell>
                                                <TableCell className="text-center"><strong>??????</strong></TableCell>
                                                <TableCell className="text-center"><strong>??????</strong></TableCell>
                                                <TableCell className="text-center"><strong>???????????????</strong></TableCell>
                                                <TableCell className="text-center"><strong>???????????????</strong></TableCell>
                                            </TableRow>
                                            
                                            <TableRow>
                                                <TableCell className="text-center">
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                color="primary"
                                                                value={true}
                                                            />
                                                        }
                                                    />
                                                </TableCell>
                                                <TableCell className="text-center">????????????</TableCell>
                                                <TableCell className="text-center">??????(????????????)</TableCell>
                                                <TableCell className="text-center"><Button size="medium" variant="contained" color="primary" startIcon={<EditIcon/>} onClick={this.onSecondModal.bind(this)}>??????</Button></TableCell>
                                                <TableCell className="text-center">?????????</TableCell>
                                                <TableCell className="text-center">2021.01.01</TableCell>
                                            </TableRow>
                                            
                                            <TableRow>
                                                <TableCell className="text-center">
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                color="primary"
                                                                value={true}
                                                            />
                                                        }
                                                    />
                                                </TableCell>
                                                <TableCell className="text-center">????????????</TableCell>
                                                <TableCell className="text-center">????????????</TableCell>
                                                <TableCell className="text-center"><Button size="medium" variant="contained" color="primary" startIcon={<EditIcon/>} onClick={this.onSecondModal.bind(this)}>??????</Button></TableCell>
                                                <TableCell className="text-center">?????????</TableCell>
                                                <TableCell className="text-center">2021.01.01</TableCell>
                                            </TableRow>
                                            
                                            <TableRow>
                                                <TableCell className="text-center">
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                color="primary"
                                                                value={true}
                                                            />
                                                        }
                                                    />
                                                </TableCell>
                                                <TableCell className="text-center">????????????</TableCell>
                                                <TableCell className="text-center">??????</TableCell>
                                                <TableCell className="text-center"><Button size="medium" variant="contained" color="primary" startIcon={<EditIcon/>} onClick={this.onSecondModal.bind(this)}>??????</Button></TableCell>
                                                <TableCell className="text-center">?????????</TableCell>
                                                <TableCell className="text-center">2021.01.01</TableCell>
                                            </TableRow>
                                            
                                            <TableRow>
                                                <TableCell colspan={6} className="text-left">
                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                        style={{backgroundColor: "#ff0000", color: "#fff"}}
                                                        startIcon={<DeleteIcon/>}
                                                    >
                                                        ????????????
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>
                        </form>
                    </DialogContent>

                    <DialogActions>
                        <Button
                            autoFocus
                            size="small"
                            variant="contained"
                            style={{ border: "1px solid #cccbcb" }}
                            startIcon={<CancelIcon/>}
                            onClick={this.onCloseModal.bind(this)}
                        >
                            ??????
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={this.state.isSecondModal} maxWidth="sm" fullWidth>
                    <DialogContent>
                        <form id="product-form">
                            <Grid container spacing={3} className="align-items-center">
                                <Grid item md={12} xs={12}>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell style={{textAlign: "right"}} width="35%"><strong>????????????</strong></TableCell>
                                                <TableCell className="text-center">
                                                    <Grid container md={12} xs={12}>
                                                        <Grid item md={7} xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                            />
                                                        </Grid>
                                                        <Grid item md={5} xs={12} style={{paddingLeft: "10px"}}>
                                                            <Button fullWidth size="medium" variant="contained" color="primary">????????? ??????</Button>
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                            
                                            <TableRow>
                                                <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ??????</strong></TableCell>
                                                <TableCell className="text-center">
                                                    <Grid container md={12} xs={12}>
                                                        <FormControl size="small" fullWidth variant="outlined">
                                                            <InputLabel>????????????</InputLabel>
                                                            <Select onChange={this.onChangeFoodProcessedStatus}>
                                                                <MenuItem value={1}>??????</MenuItem>
                                                                <MenuItem value={2}>??????/??????</MenuItem>        
                                                                <MenuItem value={3}>??????</MenuItem>
                                                                <MenuItem value={4}>????????????(??????/??????/????????????)</MenuItem>
                                                                <MenuItem value={5}>?????????/??????</MenuItem>
                                                                <MenuItem value={6}>??????(??????/??????/?????????/DIY??????)</MenuItem>
                                                                <MenuItem value={7}>????????????(TV???)</MenuItem>
                                                                <MenuItem value={8}>????????? ????????????(?????????/?????????/???????????????/???????????????)</MenuItem>
                                                                <MenuItem value={9}>????????????(?????????/?????????)</MenuItem>
                                                                <MenuItem value={10}>???????????????(?????????/?????????/?????????)</MenuItem>
                                                                <MenuItem value={11}>????????????(??????????????????/?????????)</MenuItem>
                                                                <MenuItem value={12}>????????????(MP3/???????????? ???)</MenuItem>
                                                                <MenuItem value={13}>?????????</MenuItem>
                                                                <MenuItem value={14}>???????????????</MenuItem>
                                                                <MenuItem value={15}>???????????????(???????????????,?????? ???????????????)</MenuItem>
                                                                <MenuItem value={16}>????????????</MenuItem>
                                                                <MenuItem value={17}>????????????</MenuItem>
                                                                <MenuItem value={18}>?????????</MenuItem>
                                                                <MenuItem value={19}>?????????/??????/?????????</MenuItem>
                                                                <MenuItem value={20}>??????(????????????)</MenuItem>
                                                                <MenuItem value={21}>????????????</MenuItem>
                                                                <MenuItem value={22}>??????????????????</MenuItem>
                                                                <MenuItem value={23}>???????????????</MenuItem>
                                                                <MenuItem value={24}>??????</MenuItem>
                                                                <MenuItem value={25}>???????????????</MenuItem>
                                                                <MenuItem value={26}>??????</MenuItem>
                                                                <MenuItem value={27}>??????/?????? ??????</MenuItem>
                                                                <MenuItem value={28}>???????????????</MenuItem>
                                                                <MenuItem value={29}>?????????</MenuItem>
                                                                <MenuItem value={30}>????????? ?????? ?????????(?????????)</MenuItem>
                                                                <MenuItem value={31}>???????????? ?????????(?????????,??????,??????????????? ???)</MenuItem>
                                                                <MenuItem value={32}>???????????? ?????????(??????,????????????,???????????? ???)</MenuItem>
                                                                <MenuItem value={33}>????????? ?????????(??????,??????,??????????????? ???)</MenuItem>
                                                                <MenuItem value={34}>?????????/??????</MenuItem>
                                                                <MenuItem value={35}>??????</MenuItem>
                                                                <MenuItem value={36}>???????????????</MenuItem>
                                                                <MenuItem value={37}>????????????</MenuItem>
                                                                <MenuItem value={38}>??????/??????</MenuItem>
                                                                <MenuItem value={39}>??????????????????</MenuItem>
                                                                <MenuItem value={40}>???????????????</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                            {this.state.foodProcessedStatus === 1 ? 
                                                (<React.Fragment>
                                                    <TableRow>
                                                        <TableCell className="text-left" colspan={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value={true}
                                                                        onChange={this.onChangeViewProductDetail.bind(this)}
                                                                    />
                                                                }
                                                                label="??????????????????????????? ????????????"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ????????? ?????? ?????? ????????? ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) ??????</strong></TableCell>
                                                        <TableCell className="text-center">
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) ??????</strong></TableCell>
                                                        <TableCell className="text-center">
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4)  ?????????, ???????????? ??????<br/>???????????? ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ???????????? ?????? ????????? ??????(??????????????? ?????? ???????????? ????????? ??????)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) ?????????</strong></TableCell>
                                                        <TableCell className="text-center">
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) ???????????? ??? ????????? <br/>????????????</strong></TableCell>
                                                        <TableCell className="text-center">
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ex 201211</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) ??????????????????</strong></TableCell>
                                                        <TableCell className="text-center">
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) A/S ???????????? ????????????</strong></TableCell>
                                                        <TableCell className="text-center">
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2021-10-10</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) : 
                                            this.state.foodProcessedStatus === 2 ?
                                                (<React.Fragment>
                                                    <TableRow>
                                                        <TableCell className="text-left" colspan={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value={true}
                                                                        onChange={this.onChangeViewProductDetail.bind(this)}
                                                                    />
                                                                }
                                                                label="??????????????????????????? ????????????"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ???????????? ???????????? ??????, ????????? ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '?????????##?????????' ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4)  ?????????, ???????????? ??????<br/>???????????? ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ???????????? ?????? ????????? ??????(??????????????? ?????? ???????????? ????????? ??????)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ???????????? ????????? ?????????????????? ????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) ????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) ??????????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) A/S ???????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 3 ?
                                                (<React.Fragment>
                                                    <TableRow>
                                                        <TableCell className="text-left" colspan={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value={true}
                                                                        onChange={this.onChangeViewProductDetail.bind(this)}
                                                                    />
                                                                }
                                                                label="??????????????????????????? ????????????"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '??????##??????##??????' ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) ?????????, ???????????? ??????<br/>???????????? ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ???????????? ?????? ????????? ??????(??????????????? ?????? ???????????? ????????? ??????)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) ????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) ??????????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) A/S ???????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 4 ?
                                                (<React.Fragment>
                                                    <TableRow>
                                                        <TableCell className="text-left" colspan={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value={true}
                                                                        onChange={this.onChangeViewProductDetail.bind(this)}
                                                                    />
                                                                }
                                                                label="??????????????????????????? ????????????"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) ?????????, ???????????? ??????<br/>???????????? ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ???????????? ?????? ????????? ??????(??????????????? ?????? ???????????? ????????? ??????)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) ????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) ??????????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) A/S ???????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 5 ?
                                                (<React.Fragment>
                                                    <TableRow>
                                                        <TableCell className="text-left" colspan={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value={true}
                                                                        onChange={this.onChangeViewProductDetail.bind(this)}
                                                                    />
                                                                }
                                                                label="??????????????????????????? ????????????"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) ?????????, ???????????? ??????<br/>???????????? ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ???????????? ?????? ????????? ??????(??????????????? ?????? ???????????? ????????? ??????)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) ???????????? ??? ?????????<br/>????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) ??????????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) A/S ???????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 6 ?
                                                (<React.Fragment>
                                                    <TableRow>
                                                        <TableCell className="text-left" colspan={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value={true}
                                                                        onChange={this.onChangeViewProductDetail.bind(this)}
                                                                    />
                                                                }
                                                                label="??????????????????????????? ????????????"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) KC ?????? ??? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <Grid item md={12} xs={12}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>????????????</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>????????????</MenuItem>
                                                                                <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                                <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                                <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                                <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                                <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                                <MenuItem value={7}>KCC??????</MenuItem>
                                                                                <MenuItem value={8}>MIC??????</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>????????????</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>????????????</MenuItem>
                                                                                <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                                <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                                <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                                <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                                <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                                <MenuItem value={7}>KCC??????</MenuItem>
                                                                                <MenuItem value={8}>MIC??????</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>????????????</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>????????????</MenuItem>
                                                                                <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                                <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                                <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                                <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                                <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                                <MenuItem value={7}>KCC??????</MenuItem>
                                                                                <MenuItem value={8}>MIC??????</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ?????? ??? ????????????, ?????? ???????????? ??? ??????????????? ????????????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) ?????????, ???????????? ??????<br/>???????????? ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ???????????? ?????? ????????? ??????(??????????????? ?????? ???????????? ????????? ??????)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '??????##??????##??????' ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) ??????/????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) ??????????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(11) A/S ???????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 7 ?
                                                (<React.Fragment>
                                                    <TableRow>
                                                        <TableCell className="text-left" colspan={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value={true}
                                                                        onChange={this.onChangeViewProductDetail.bind(this)}
                                                                    />
                                                                }
                                                                label="??????????????????????????? ????????????"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ?????? ??? ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) ?????????????????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <Grid item md={12} xs={12}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>????????????</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>????????????</MenuItem>
                                                                                <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                                <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                                <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                                <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                                <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                                <MenuItem value={7}>KCC??????</MenuItem>
                                                                                <MenuItem value={8}>MIC??????</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>????????????</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>????????????</MenuItem>
                                                                                <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                                <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                                <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                                <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                                <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                                <MenuItem value={7}>KCC??????</MenuItem>
                                                                                <MenuItem value={8}>MIC??????</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>????????????</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>????????????</MenuItem>
                                                                                <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                                <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                                <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                                <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                                <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                                <MenuItem value={7}>KCC??????</MenuItem>
                                                                                <MenuItem value={8}>MIC??????</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ?????? ??? ????????????, ?????? ???????????? ??? ??????????????? ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) ????????????, ????????????,<br/>???????????????????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '????????????##????????????##???????????????????????????' ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) ??????????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (???: 20201231)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) ?????????, ???????????? ??????<br/>???????????? ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ???????????? ?????? ????????? ??????(??????????????? ?????? ???????????? ????????? ??????)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) ??????(??????, ????????????)</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '??????##??????##??????' ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) ??????????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '??????##??????##??????' ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) A/S ???????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 8 ?
                                                (<React.Fragment>
                                                    <TableRow>
                                                        <TableCell className="text-left" colspan={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value={true}
                                                                        onChange={this.onChangeViewProductDetail.bind(this)}
                                                                    />
                                                                }
                                                                label="??????????????????????????? ????????????"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ?????? ??? ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) ?????????????????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <Grid item md={12} xs={12}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>????????????</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>????????????</MenuItem>
                                                                                <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                                <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                                <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                                <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                                <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                                <MenuItem value={7}>KCC??????</MenuItem>
                                                                                <MenuItem value={8}>MIC??????</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>????????????</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>????????????</MenuItem>
                                                                                <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                                <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                                <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                                <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                                <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                                <MenuItem value={7}>KCC??????</MenuItem>
                                                                                <MenuItem value={8}>MIC??????</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>????????????</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>????????????</MenuItem>
                                                                                <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                                <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                                <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                                <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                                <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                                <MenuItem value={7}>KCC??????</MenuItem>
                                                                                <MenuItem value={8}>MIC??????</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ?????? ??? ????????????, ?????? ???????????? ??? ??????????????? ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) ????????????, ????????????,<br/>???????????????????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '????????????##????????????##???????????????????????????' ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) ??????????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (???: 20201231)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) ?????????, ???????????? ??????<br/>???????????? ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ???????????? ?????? ????????? ??????(??????????????? ?????? ???????????? ????????? ??????)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) ??????(??????, ????????????)</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '??????##??????##??????' ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '??????##?????????##????????????' ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) ??????????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) A/S ???????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 9 ?
                                                (<React.Fragment>
                                                    <TableRow>
                                                        <TableCell className="text-left" colspan={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value={true}
                                                                        onChange={this.onChangeViewProductDetail.bind(this)}
                                                                    />
                                                                }
                                                                label="??????????????????????????? ????????????"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ?????? ??? ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) ?????????????????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <Grid item md={12} xs={12}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>????????????</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>????????????</MenuItem>
                                                                                <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                                <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                                <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                                <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                                <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                                <MenuItem value={7}>KCC??????</MenuItem>
                                                                                <MenuItem value={8}>MIC??????</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>????????????</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>????????????</MenuItem>
                                                                                <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                                <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                                <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                                <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                                <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                                <MenuItem value={7}>KCC??????</MenuItem>
                                                                                <MenuItem value={8}>MIC??????</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>????????????</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>????????????</MenuItem>
                                                                                <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                                <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                                <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                                <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                                <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                                <MenuItem value={7}>KCC??????</MenuItem>
                                                                                <MenuItem value={8}>MIC??????</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ?????? ??? ????????????, ?????? ???????????? ??? ??????????????? ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) ????????????, ????????????,<br/>???????????????????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '????????????##????????????##???????????????????????????' ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) ??????????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (???: 20201231)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) ?????????, ???????????? ??????<br/>???????????? ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ???????????? ?????? ????????? ??????(??????????????? ?????? ???????????? ????????? ??????)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) ??????(??????, ????????????)</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '??????##??????##??????' ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) ???????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '??????##?????????##????????????' ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) ??????????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) ??????????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(11) A/S ???????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 10 ?
                                                (<React.Fragment>
                                                    <TableRow>
                                                        <TableCell className="text-left" colspan={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value={true}
                                                                        onChange={this.onChangeViewProductDetail.bind(this)}
                                                                    />
                                                                }
                                                                label="??????????????????????????? ????????????"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ?????? ??? ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) ?????????????????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <Grid item md={12} xs={12}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>????????????</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>????????????</MenuItem>
                                                                                <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                                <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                                <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                                <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                                <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                                <MenuItem value={7}>KCC??????</MenuItem>
                                                                                <MenuItem value={8}>MIC??????</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>????????????</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>????????????</MenuItem>
                                                                                <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                                <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                                <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                                <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                                <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                                <MenuItem value={7}>KCC??????</MenuItem>
                                                                                <MenuItem value={8}>MIC??????</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>????????????</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>????????????</MenuItem>
                                                                                <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                                <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                                <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                                <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                                <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                                <MenuItem value={7}>KCC??????</MenuItem>
                                                                                <MenuItem value={8}>MIC??????</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ?????? ??? ????????????, ?????? ???????????? ??? ??????????????? ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) ????????????, ????????????,<br/>???????????????????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '????????????##????????????##???????????????????????????' ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) ??????????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (???: 20201231)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) ?????????, ???????????? ??????<br/>???????????? ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ???????????? ?????? ????????? ??????(??????????????? ?????? ???????????? ????????? ??????)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) ??????, ??????(????????? ???????????? ??????)</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '??????##??????##??????' ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '??????##?????????##????????????' ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) ??????????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) A/S ???????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 11 ?
                                                (<React.Fragment>
                                                    <TableRow>
                                                        <TableCell className="text-left" colspan={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value={true}
                                                                        onChange={this.onChangeViewProductDetail.bind(this)}
                                                                    />
                                                                }
                                                                label="??????????????????????????? ????????????"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ?????? ??? ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) ?????????????????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <Grid item md={12} xs={12}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>????????????</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>????????????</MenuItem>
                                                                                <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                                <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                                <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                                <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                                <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                                <MenuItem value={7}>KCC??????</MenuItem>
                                                                                <MenuItem value={8}>MIC??????</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>????????????</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>????????????</MenuItem>
                                                                                <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                                <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                                <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                                <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                                <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                                <MenuItem value={7}>KCC??????</MenuItem>
                                                                                <MenuItem value={8}>MIC??????</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>????????????</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>????????????</MenuItem>
                                                                                <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                                <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                                <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                                <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                                <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                                <MenuItem value={7}>KCC??????</MenuItem>
                                                                                <MenuItem value={8}>MIC??????</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ?????? ??? ????????????, ?????? ???????????? ??? ??????????????? ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) ??????????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (???: 202010)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) ?????????, ???????????? ??????<br/>???????????? ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ???????????? ?????? ????????? ??????(??????????????? ?????? ???????????? ????????? ??????)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) ??????, ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '??????##??????##??????' ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) ??????????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) A/S ???????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 12 ?
                                                (<React.Fragment>
                                                    <TableRow>
                                                        <TableCell className="text-left" colspan={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value={true}
                                                                        onChange={this.onChangeViewProductDetail.bind(this)}
                                                                    />
                                                                }
                                                                label="??????????????????????????? ????????????"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ?????? ??? ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) ?????????????????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <Grid item md={12} xs={12}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>????????????</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>????????????</MenuItem>
                                                                                <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                                <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                                <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                                <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                                <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                                <MenuItem value={7}>KCC??????</MenuItem>
                                                                                <MenuItem value={8}>MIC??????</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>????????????</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>????????????</MenuItem>
                                                                                <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                                <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                                <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                                <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                                <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                                <MenuItem value={7}>KCC??????</MenuItem>
                                                                                <MenuItem value={8}>MIC??????</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>????????????</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>????????????</MenuItem>
                                                                                <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                                <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                                <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                                <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                                <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                                <MenuItem value={7}>KCC??????</MenuItem>
                                                                                <MenuItem value={8}>MIC??????</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ?????? ??? ????????????, ?????? ???????????? ??? ??????????????? ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) ????????????, ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (??????????????????????????? ??? ????????????????????? ??????) '????????????##????????????' ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) ??????????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (???: 202010)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) ?????????, ???????????? ??????<br/>???????????? ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ???????????? ?????? ????????? ??????(??????????????? ?????? ???????????? ????????? ??????)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) ??????, ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '??????##??????##??????' ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) ??????????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) A/S ???????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 13 ?
                                                (<React.Fragment>
                                                    <TableRow>
                                                        <TableCell className="text-left" colspan={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value={true}
                                                                        onChange={this.onChangeViewProductDetail.bind(this)}
                                                                    />
                                                                }
                                                                label="??????????????????????????? ????????????"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ?????? ??? ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) ?????????????????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <Grid item md={12} xs={12}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>????????????</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>????????????</MenuItem>
                                                                                <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                                <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                                <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                                <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                                <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                                <MenuItem value={7}>KCC??????</MenuItem>
                                                                                <MenuItem value={8}>MIC??????</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>????????????</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>????????????</MenuItem>
                                                                                <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                                <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                                <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                                <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                                <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                                <MenuItem value={7}>KCC??????</MenuItem>
                                                                                <MenuItem value={8}>MIC??????</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>????????????</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>????????????</MenuItem>
                                                                                <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                                <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                                <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                                <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                                <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                                <MenuItem value={7}>KCC??????</MenuItem>
                                                                                <MenuItem value={8}>MIC??????</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ?????? ??? ????????????, ?????? ???????????? ??? ??????????????? ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) ??????????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (???: 202010)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) ?????????, ???????????? ??????<br/>???????????? ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ???????????? ?????? ????????? ??????(??????????????? ?????? ???????????? ????????? ??????)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) ??????, ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '??????##??????##??????' ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) ???????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) ???????????? ????????????<br/>????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(11) ??????????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(12) A/S ???????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 14 ?
                                                (<React.Fragment>
                                                    <TableRow>
                                                        <TableCell className="text-left" colspan={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value={true}
                                                                        onChange={this.onChangeViewProductDetail.bind(this)}
                                                                    />
                                                                }
                                                                label="??????????????????????????? ????????????"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ?????? ??? ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) ?????????????????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <Grid item md={12} xs={12}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>????????????</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>????????????</MenuItem>
                                                                                <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                                <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                                <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                                <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                                <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                                <MenuItem value={7}>KCC??????</MenuItem>
                                                                                <MenuItem value={8}>MIC??????</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>????????????</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>????????????</MenuItem>
                                                                                <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                                <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                                <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                                <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                                <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                                <MenuItem value={7}>KCC??????</MenuItem>
                                                                                <MenuItem value={8}>MIC??????</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>????????????</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>????????????</MenuItem>
                                                                                <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                                <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                                <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                                <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                                <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                                <MenuItem value={7}>KCC??????</MenuItem>
                                                                                <MenuItem value={8}>MIC??????</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ?????? ??? ????????????, ?????? ???????????? ??? ??????????????? ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) ????????????, ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (??????????????????????????? ??? ????????????????????? ??????) '????????????##????????????' ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) ??????????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (???: 202010)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) ?????????, ???????????? ??????<br/>???????????? ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ???????????? ?????? ????????? ??????(??????????????? ?????? ???????????? ????????? ??????)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) ??????, ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '??????##??????##??????' ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) ??? ???????????? ?????? ???<br/>????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) ??????????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(11) A/S ???????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 15 ?
                                                (<React.Fragment>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 16 ?
                                                (<React.Fragment>
                                                    <TableRow>
                                                        <TableCell className="text-left" colspan={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value={true}
                                                                        onChange={this.onChangeViewProductDetail.bind(this)}
                                                                    />
                                                                }
                                                                label="??????????????????????????? ????????????"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ?????? ??? ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) ?????????????????? ??????, ??????<br/>??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ?????? ?????? ?????? ????????? ?????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) KC???????????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <Grid item md={12} xs={12}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>????????????</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>????????????</MenuItem>
                                                                                <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                                <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                                <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                                <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                                <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                                <MenuItem value={7}>KCC??????</MenuItem>
                                                                                <MenuItem value={8}>MIC??????</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>????????????</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>????????????</MenuItem>
                                                                                <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                                <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                                <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                                <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                                <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                                <MenuItem value={7}>KCC??????</MenuItem>
                                                                                <MenuItem value={8}>MIC??????</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>????????????</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>????????????</MenuItem>
                                                                                <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                                <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                                <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                                <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                                <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                                <MenuItem value={7}>KCC??????</MenuItem>
                                                                                <MenuItem value={8}>MIC??????</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ?????? ??? ????????????, ?????? ???????????? ??? ??????????????? ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) ????????????, ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (??????????????????????????? ??? ????????????????????? ??????) '????????????##????????????' ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) ??????????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (???: 202010)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) ?????????, ???????????? ??????<br/>???????????? ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ???????????? ?????? ????????? ??????(??????????????? ?????? ???????????? ????????? ??????)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) ????????? ???????????? ???<br/>????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) ????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) ??????????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(11) A/S ???????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 17 ?
                                                (<React.Fragment>
                                                    <TableRow>
                                                        <TableCell className="text-left" colspan={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value={true}
                                                                        onChange={this.onChangeViewProductDetail.bind(this)}
                                                                    />
                                                                }
                                                                label="??????????????????????????? ????????????"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ?????? ??? ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '??????##??????##??????' ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) ??????????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (???: 202010)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) ?????????, ???????????? ??????<br/>???????????? ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ???????????? ?????? ????????? ??????(??????????????? ?????? ???????????? ????????? ??????)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ???????????? ????????? ?????????????????? ????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) ?????????????????? ?????? ??????<br/>?????????????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) ??????????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) A/S ???????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 18 ?
                                                (<React.Fragment>
                                                    <TableRow>
                                                        <TableCell className="text-left" colspan={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value={true}
                                                                        onChange={this.onChangeViewProductDetail.bind(this)}
                                                                    />
                                                                }
                                                                label="??????????????????????????? ????????????"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ?????? ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) ?????? ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ????????????, ??????(???, ???) ??? ??? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) ???????????? ?????? ?????? ???<br/>????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ?????? ??? ???????????? ?????? ??? ??????????????? ????????????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) ????????? ??? ??????????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (???: 202010)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ???????????? ????????? ?????????????????? ????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) ?????????????????? ??????<br/>??????????????????????? ?????? ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ????????? ???????????? ?????? ????????? ?????? ?????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) ???????????????????????? ?????? ??? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ????????? ???????????? ?????? ??????????????? ?????? ???????????????????????? ?????? ??? ?????? (??????, ????????????, ??????????????? ???)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) ????????? ??? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) ??????????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(11) ????????????????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 19 ?
                                                (<React.Fragment>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 20 ?
                                                (<React.Fragment>
                                                    <TableRow>
                                                        <TableCell className="text-left" colspan={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value={true}
                                                                        onChange={this.onChangeViewProductDetail.bind(this)}
                                                                    />
                                                                }
                                                                label="??????????????????????????? ????????????"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ??????(??????), ??????, ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ?????? ????????? ??????(??????), ??????, ?????? ??????<br/>'??????##??????##??????##??????(??????)##??????' ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) ?????????(?????????)</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ?????????, ???????????? ?????? ???????????? ?????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) ??????????????? ????????? ?????????<br/>?????? ????????? ?????? ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ?????? ??? ???????????? ?????? ??? ??????????????? ????????????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) ???????????????<br/>(????????? ?????? ????????????)</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ???????????? ?????? ????????????????????? ?????? ???????????? (???: 20121101)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ??????????????????????????? ???????????????????????? ??????, ???????????????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ???????????? ?????? ????????????, ???????????? ?????? ??????????????? ?????? ?????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ??????????????????????????? ???????????????????????? ??????, ???????????????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) ??????????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ??????????????? ???????????? ?????? ?????????????????? ?????? ??????????????? ????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) ???????????? ?????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(11) ??????????????? ?????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(12) ?????? ?????? ??????</strong></TableCell>
                                                        <TableCell className="text-center">
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(13) ?????? ?????? ??????/?????????<br/>?????? ????????? ?????? ?????????<br/>????????? ?????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 21 ?
                                                (<React.Fragment>
                                                    <TableRow>
                                                        <TableCell className="text-left" colspan={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value={true}
                                                                        onChange={this.onChangeViewProductDetail.bind(this)}
                                                                    />
                                                                }
                                                                label="??????????????????????????? ????????????"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ??????(??????), ??????, ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) ????????? ??? ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ???????????? ?????? ????????? ?????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) ???????????????<br/>(????????? ?????? ????????????)</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (???: 20121101)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) ??????(??????), ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ?????? ????????? ??????(??????), ??????, ?????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) ???????????? ??? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) ???????????? ?????? ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) ????????????????????????????????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) ???????????? ???????????? ???</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) ???????????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) ??????????????? ?????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(11) ?????????????????? ?????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(12) ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 22 ?
                                                (<React.Fragment>
                                                    <TableRow>
                                                        <TableCell className="text-left" colspan={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value={true}
                                                                        onChange={this.onChangeViewProductDetail.bind(this)}
                                                                    />
                                                                }
                                                                label="??????????????????????????? ????????????"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ????????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) ????????? ??? ?????????(?????????)</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ????????? ??? ?????????, ???????????? ?????? ???????????? ?????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) ???????????????, ???????????? ??????<br/>??????????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (???: 20121101)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) ??????????????? ??????(??????), ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ?????? ????????? ??????(??????), ??????, ?????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) ???????????? ??? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) ?????????, ???????????? ??? ?????? ???<br/>????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) ?????? ??????, ?????? ????????? ??????<br/>??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) ?????????????????????????????????<br/>??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ???????????????????????????????????? ???????????? ????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(11) ???????????? ?????? ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(12) ???????????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ??????????????? ???????????? ?????? ????????????????????? ?????? ??????????????? ????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(13) ??????????????? ?????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(14) ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(15) ?????????????????? ??????<br/>????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 23 ?
                                                (<React.Fragment>
                                                <TableRow>
                                                    <TableCell className="text-left" colspan={2}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    color="primary"
                                                                    value={true}
                                                                    onChange={this.onChangeViewProductDetail.bind(this)}
                                                                />
                                                            }
                                                            label="??????????????????????????? ????????????"
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                
                                                <TableRow>
                                                    <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ?????? ??? ?????????</strong></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            
                                                <TableRow>
                                                    <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) ??????????????? ?????? ?????????<br/>KC???????????? ??????</strong></TableCell>
                                                    <TableCell>
                                                        <Grid item md={12} xs={12}>
                                                            <Grid container>
                                                                <Grid item md={4} xs={12}>
                                                                    <FormControl size="small" fullWidth variant="outlined">
                                                                        <InputLabel>????????????</InputLabel>
                                                                        <Select>
                                                                            <MenuItem value={1}>????????????</MenuItem>
                                                                            <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                            <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                            <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                            <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                            <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                            <MenuItem value={7}>KCC??????</MenuItem>
                                                                            <MenuItem value={8}>MIC??????</MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                    <TextField
                                                                        fullWidth
                                                                        size="small"
                                                                        variant="outlined"
                                                                        value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                            
                                                        <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                            <Grid container>
                                                                <Grid item md={4} xs={12}>
                                                                    <FormControl size="small" fullWidth variant="outlined">
                                                                        <InputLabel>????????????</InputLabel>
                                                                        <Select>
                                                                            <MenuItem value={1}>????????????</MenuItem>
                                                                            <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                            <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                            <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                            <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                            <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                            <MenuItem value={7}>KCC??????</MenuItem>
                                                                            <MenuItem value={8}>MIC??????</MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                    <TextField
                                                                        fullWidth
                                                                        size="small"
                                                                        variant="outlined"
                                                                        value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                            
                                                        <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                            <Grid container>
                                                                <Grid item md={4} xs={12}>
                                                                    <FormControl size="small" fullWidth variant="outlined">
                                                                        <InputLabel>????????????</InputLabel>
                                                                        <Select>
                                                                            <MenuItem value={1}>????????????</MenuItem>
                                                                            <MenuItem value={2}>??????????????????(KC??????)</MenuItem>
                                                                            <MenuItem value={3}>???????????? ????????????</MenuItem>
                                                                            <MenuItem value={4}>KPS ???????????? ??????</MenuItem>
                                                                            <MenuItem value={5}>KPS???????????? ?????? ??????</MenuItem>
                                                                            <MenuItem value={6}>KPS ????????? ???????????? ??????</MenuItem>
                                                                            <MenuItem value={7}>KCC??????</MenuItem>
                                                                            <MenuItem value={8}>MIC??????</MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                    <TextField
                                                                        fullWidth
                                                                        size="small"
                                                                        variant="outlined"
                                                                        value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <InputLabel style={{color: "#ff0000"}}><br/>* ??????????????? ?????? ????????? ??? ?????????????????????????????????, ?????????????????????????????????, ???????????????????????????????????????????????? ?????? KC?????? ??? ??????</InputLabel>
                                                    </TableCell>
                                                </TableRow>
                                            
                                                <TableRow>
                                                    <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) ??????, ??????</strong></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                        />
                                                        <InputLabel style={{color: "#ff0000"}}><br/>* '??????##??????##??????##??????' ???????????? ??????</InputLabel>
                                                    </TableCell>
                                                </TableRow>
                                            
                                                <TableRow>
                                                    <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) ??????</strong></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            
                                                <TableRow>
                                                    <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) ??????</strong></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                        />
                                                        <InputLabel style={{color: "#ff0000"}}><br/>* ????????? ?????? ????????? ??????</InputLabel>
                                                    </TableCell>
                                                </TableRow>
                                            
                                                <TableRow>
                                                    <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) ???????????? ?????? ????????????</strong></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            
                                                <TableRow>
                                                    <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) ??????????????? ????????????</strong></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                        />
                                                        <InputLabel style={{color: "#ff0000"}}><br/>* (???: 201211)</InputLabel>
                                                    </TableCell>
                                                </TableRow>
                                            
                                                <TableRow>
                                                    <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) ?????????, ???????????? ??????<br/>???????????? ?????? ??????</strong></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                        />
                                                        <InputLabel style={{color: "#ff0000"}}><br/>* ???????????? ?????? ????????? ??????(??????????????? ?????? ???????????? ????????? ??????)</InputLabel>
                                                    </TableCell>
                                                </TableRow>
                                            
                                                <TableRow>
                                                    <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) ?????????</strong></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                        />
                                                        <InputLabel style={{color: "#ff0000"}}><br/>* ???????????? ????????? ?????????????????? ????????? ??????</InputLabel>
                                                    </TableCell>
                                                </TableRow>
                                            
                                                <TableRow>
                                                    <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) ???????????? ??? ????????????</strong></TableCell>
                                                    <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ?????? ??? ????????????, ???????????? (??????, ?????? ???) ?????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(11) ??????????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(12) A/S ???????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 24 ?
                                                (<React.Fragment>
                                                    <TableRow>
                                                        <TableCell className="text-left" colspan={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value={true}
                                                                        onChange={this.onChangeViewProductDetail.bind(this)}
                                                                    />
                                                                }
                                                                label="??????????????????????????? ????????????"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ?????? ??? ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '??????##??????##??????' ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ????????? ?????? ????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) ??????????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (???: 20121101)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) ?????????, ???????????? ??????<br/>???????????? ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ???????????? ?????? ????????? ??????(??????????????? ?????? ???????????? ????????? ??????)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ???????????? ????????? ?????????????????? ????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) ????????? ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) ??????????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(11) A/S ???????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 25 ?
                                                (<React.Fragment>
                                                    <TableRow>
                                                        <TableCell className="text-left" colspan={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value={true}
                                                                        onChange={this.onChangeViewProductDetail.bind(this)}
                                                                    />
                                                                }
                                                                label="??????????????????????????? ????????????"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ?????? ??? ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) ??????, ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '??????##??????##??????' ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ????????? ?????? ????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) ??????????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (???: 20121101)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) ?????????, ???????????? ??????<br/>???????????? ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ???????????? ?????? ????????? ??????(??????????????? ?????? ???????????? ????????? ??????)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ???????????? ????????? ?????????????????? ????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) ????????? ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) ??????????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(11) A/S ???????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 26 ?
                                                (<React.Fragment>
                                                    <TableRow>
                                                        <TableCell className="text-left" colspan={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value={true}
                                                                        onChange={this.onChangeViewProductDetail.bind(this)}
                                                                    />
                                                                }
                                                                label="??????????????????????????? ????????????"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) ??????, ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '??????##?????????' ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) ??????(???????????? ??????<br/>????????? ??????)</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '??????##??????##??????##???????????????' ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) ??????(???????????? ?????? ??????)</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ????????? ?????? ????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) ?????? ??????(?????? ?????? ?????????<br/>?????? ?????? ??????, CD???)</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) ?????? ?????? ?????????(?????????<br/>?????? ????????? ?????? ???????????????<br/>??????)</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 27 ?
                                                (<React.Fragment>
                                                    <TableRow>
                                                        <TableCell className="text-left" colspan={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value={true}
                                                                        onChange={this.onChangeViewProductDetail.bind(this)}
                                                                    />
                                                                }
                                                                label="??????????????????????????? ????????????"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ?????? ?????? ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) ??????, ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) ???????????? ??????, ?????? ?????? ??? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) ????????????, ?????? ?????????<br/>(?????? ???)</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) ?????? ??????(??????, ????????? ???)</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) ???????????? ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 28 ?
                                                (<React.Fragment>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 29 ?
                                                (<React.Fragment>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 30 ?
                                                (<React.Fragment>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 31 ?
                                                (<React.Fragment>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 32 ?
                                                (<React.Fragment>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 33 ?
                                                (<React.Fragment>
                                                    <TableRow>
                                                        <TableCell className="text-left" colspan={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value={true}
                                                                        onChange={this.onChangeViewProductDetail.bind(this)}
                                                                    />
                                                                }
                                                                label="??????????????????????????? ????????????"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ????????? ?????? ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) ????????????, ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '????????????##????????????' ???????????? ??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) ?????? ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* CD, ????????????, ????????? ???????????? ??? ,??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) ?????? ????????? ??????, <br/>?????? ???????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) ???????????? ?????? ?????????<br/>????????????????? ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) ??????????????? ?????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 34 ?
                                                (<React.Fragment>
                                                    <TableRow>
                                                        <TableCell className="text-left" colspan={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value={true}
                                                                        onChange={this.onChangeViewProductDetail.bind(this)}
                                                                    />
                                                                }
                                                                label="??????????????????????????? ????????????"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) ????????????, ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '????????????##????????????' ???????????? ??????<br/>* ????????????????????? ?????? ??????????????? ?????? ????????? ???????????? ???  ex) 7???(x) 7(o)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) ?????? ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* CD, ????????????, ????????? ???????????? ??? ,??????</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) ?????? ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) ??????????????? ?????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 35 ?
                                                (<React.Fragment>
                                                    <TableRow>
                                                        <TableCell className="text-left" colspan={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value={true}
                                                                        onChange={this.onChangeViewProductDetail.bind(this)}
                                                                    />
                                                                }
                                                                label="??????????????????????????? ????????????"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ?????? ??? ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                            
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) ?????? ?????? ?????????????? ??????<br/>???????????? ????????? ??? ??????<br/>?????? ?????? ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                        
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) ????????? ?????? ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) ?????????, ???????????? ??????<br/>???????????? ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) A/S ???????????? ???????????? ??????<br/>??????????????? ?????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 36 ?
                                                (<React.Fragment>
                                                    <TableRow>
                                                        <TableCell className="text-left" colspan={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value={true}
                                                                        onChange={this.onChangeViewProductDetail.bind(this)}
                                                                    />
                                                                }
                                                                label="??????????????????????????? ????????????"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) ????????????(???????????? ?????? ???<br/> ?????? ?????? ??????)</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) ???????????? ??? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) ??????????????? ?????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 37 ?
                                                (<React.Fragment>
                                                    <TableRow>
                                                        <TableCell className="text-left" colspan={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value={true}
                                                                        onChange={this.onChangeViewProductDetail.bind(this)}
                                                                    />
                                                                }
                                                                label="??????????????????????????? ????????????"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ????????? ?????? ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) ?????? ?????? ?????????????? ??????<br/>???????????? ????????? ??? ?????? ??????<br/>?????? ?????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) ???????????????????????????? ?????? ???<br/>????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) ??????????????? ?????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 38 ?
                                                (<React.Fragment>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 39 ?
                                                (<React.Fragment>
                                                    <TableRow>
                                                        <TableCell className="text-left" colspan={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value={true}
                                                                        onChange={this.onChangeViewProductDetail.bind(this)}
                                                                    />
                                                                }
                                                                label="??????????????????????????? ????????????"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ?????? ??? ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) ?????? ??? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) ???????????? ??? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) ??????, ??????, ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) ??????, ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) ?????????(??????????????? ??????),<br/>????????? ??? ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) ????????? ???????????? ?????? ??????<br/>??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) ????????? ????????? ????????????<br/>??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) ????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) ???????????? ????????????<br/>????????????(??????????????????) ??????<br/>????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(11) ????????? ???????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) :
                                            this.state.foodProcessedStatus === 40 ?
                                                (<React.Fragment>
                                                    <TableRow>
                                                        <TableCell className="text-left" colspan={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value={true}
                                                                        onChange={this.onChangeViewProductDetail.bind(this)}
                                                                    />
                                                                }
                                                                label="??????????????????????????? ????????????"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) ????????? ??? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) ?????? ?????? ?????? ???<br/>???????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) ??????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) ??????????????? ??? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) ?????????(??????????????? ??????),<br/>????????? ??? ?????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) ????????? ???????????? ?????? ??????<br/>??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) ???????????????, ????????????, <br/>??????????????????(?????? <br/>??????????????????)??? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) ?????? ?????????, ????????? ??????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) ????????? ???????????? ????????????</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "??????????????????" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>?????? ?????????</strong></TableCell>
                                                        <TableCell><InputLabel>?????????</InputLabel></TableCell>
                                                    </TableRow>
                                                </React.Fragment>) : null }
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>
                        </form>
                    </DialogContent>

                    <DialogActions>
                        <Button
                            size="medium"
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon/>}
                            style={{marginRight: "5px"}}
                        >??????</Button>
                        <Button
                            size="medium"
                            variant="outlined"
                            style={{backgroundColor: "#fff", color: "#000"}}
                            startIcon={<CancelIcon/>}
                            style={{marginLeft: "5px"}}
                            onClick={this.onCloseSecondModal.bind(this)}
                        >??????</Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        );
    }
}

export default Confirmation;
