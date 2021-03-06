import React from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PageTitle from "../../core/common/Partials/PageTitle";
import { Grid, TextField, Button, FormControl, Select, MenuItem, InputLabel, Table, TableBody, TableRow, TableCell, FormControlLabel, Link,
        Dialog, DialogTitle, DialogContent, DialogActions, RadioGroup, Radio, Checkbox} from "@material-ui/core";
import SubjectIcon from '@material-ui/icons/Subject';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PasswordIcon from '@material-ui/icons/Security';

class UsersList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpenModal: false,
            isOpenModal2: false,
            isOpenModal3: false,
            isChangeMail: false,
            isValidationCode: false,
        };

        this.onOpenModal = this.onOpenModal.bind(this);
        this.onOpenModal2 = this.onOpenModal2.bind(this);
        this.onOpenModal3 = this.onOpenModal3.bind(this);
        this.onChangeMail = this.onChangeMail.bind(this);
        this.onRequestValidationCode = this.onRequestValidationCode.bind(this);
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

    /**
     * @summary Open box
     * @param {event}
     */
    onOpenModal2(e, index) {
        this.setState({
            index: index,
            isOpenModal2: true,
        });
    }

    /**
     * @summary Close box
     * @param {event}
     */
    onCloseModal2() {
        this.setState({ isOpenModal2: false });
    }

    /**
     * @summary Open box
     * @param {event}
     */
    onOpenModal3(e, index) {
        this.setState({
            index: index,
            isOpenModal3: true,
        });
    }

    /**
     * @summary Close box
     * @param {event}
     */
    onCloseModal3() {
        this.setState({ isOpenModal3: false });
    }

    /**
     * @param {event}
     */
     onChangeMail() {
        this.setState({ isChangeMail: true });
    }

    /**
     * @param {event}
     */
     onRequestValidationCode() {
        this.setState({ isValidationCode: true });
    }

    render() {
        return (
            <React.Fragment>
                <Grid container>
                    <Grid item>
                        <PageTitle
                        menuName="????????? ??????"
                        title="????????? ??????"
                        icon={<SubjectIcon />}
                        />
                    </Grid>
                </Grid> 
                
                <div className="card mt-20">
                    <Grid container spacing={3} md={12} xs={12} className="text-right">
                        <Grid item md={10} xs={12}></Grid>
                        <Grid item md={2} xs={12} className="align-items-center text-center">
                            <Grid container>
                                <Grid item md={5} xs={12}></Grid>
                                <Grid item md={7} xs={12}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"
                                        color="primary"
                                        startIcon={<AddIcon/>}
                                        onClick={this.onOpenModal.bind(this)}
                                    >????????? ??????</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Grid item md={12} xs={12} className="align-items-center">  
                            <Table className="member_table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="15%">?????????</TableCell>
                                        <TableCell colspan={3} className="align-items-center" width="85%">
                                            <Grid container md={10} xs={12} className="align-items-center">
                                                <Grid item md={3} xs={12} className="align-items-center">
                                                    <FormControl size="small" fullWidth variant="outlined">
                                                        <InputLabel>????????????</InputLabel>
                                                        <Select>
                                                            <MenuItem value="1">?????????</MenuItem>
                                                            <MenuItem value="2">??????</MenuItem>
                                                            <MenuItem value="3">?????????</MenuItem>
                                                            <MenuItem value="4">?????????</MenuItem>
                                                            <MenuItem value="5">????????????</MenuItem>
                                                            <MenuItem value="6">???????????????</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item md={5} xs={12} className="align-items-center" style={{marginLeft: "10px"}}>
                                                    <TextField
                                                        fullWidth
                                                        size="small"  
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                    
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="15%">?????? ????????????</TableCell>
                                        <TableCell colspan={3} className="align-items-center" width="85%">
                                            <Grid container md={10} xs={12} className="align-items-center">
                                                <Grid item md={6} xs={12} className="align-items-center">
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                color="primary"
                                                                value={true}
                                                            />
                                                        }
                                                        label="?????? ???????????? ????????? (????????? ?????? ???????????? ?????? : 1???)"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="15%">SMS ???????????? ????????????</TableCell>
                                        <TableCell colspan={3} className="align-items-center" width="85%">
                                            <Grid container md={10} xs={12} className="align-items-center">
                                                <Grid item md={1} xs={12}>
                                                    <RadioGroup>
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="??????"
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                                
                                                <Grid item md={2} xs={12}>
                                                    <RadioGroup>
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="SMS ?????? ??????"
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                                
                                                <Grid item md={2} xs={12}>
                                                    <RadioGroup>
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="?????? ?????? ??????"
                                                        />
                                                    </RadioGroup>
                                                </Grid>

                                                <Grid item md={6} xs={12}>
                                                    <Grid container>
                                                        <Grid item md={3} xs={12}>
                                                            <RadioGroup>
                                                                <FormControlLabel
                                                                    value="true"
                                                                    control={<Radio />}
                                                                    label="?????? ??????"
                                                                />
                                                            </RadioGroup>
                                                        </Grid>
                                                        
                                                        <Grid item md={4} xs={12}>
                                                            <RadioGroup>
                                                                <FormControlLabel
                                                                    value="true"
                                                                    control={<Radio />}
                                                                    label="???????????? ??????"
                                                                />
                                                            </RadioGroup>
                                                        </Grid>
                                                    
                                                        <Grid item md={4} xs={12}>
                                                            <RadioGroup>
                                                                <FormControlLabel
                                                                    value="true"
                                                                    control={<Radio />}
                                                                    label="???????????? ??????"
                                                                />
                                                            </RadioGroup>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="15%">????????????</TableCell>
                                        <TableCell width="50%">
                                            <Grid container md={12} xs={12} className="align-items-center">
                                                <Grid item md={3} xs={12}>
                                                    <Grid container>
                                                        <Grid item md={6} xs={12}>
                                                            <RadioGroup>
                                                                <FormControlLabel
                                                                    value="true"
                                                                    control={<Radio />}
                                                                    label="??????"
                                                                />
                                                            </RadioGroup>
                                                        </Grid>
                                                        
                                                        <Grid item md={6} xs={12}>
                                                            <RadioGroup>
                                                                <FormControlLabel
                                                                    value="true"
                                                                    control={<Radio />}
                                                                    label="??????"
                                                                />
                                                            </RadioGroup>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                
                                                <Grid item md={2} xs={12}>
                                                    <RadioGroup>
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="????????????"
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                        
                                                <Grid item md={2} xs={12}>
                                                    <RadioGroup>
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="???????????????"
                                                        />
                                                    </RadioGroup>
                                                </Grid>

                                                <Grid item md={3} xs={12}>
                                                    <Grid container>
                                                        <Grid item md={6} xs={12}>
                                                            <RadioGroup>
                                                                <FormControlLabel
                                                                    value="true"
                                                                    control={<Radio />}
                                                                    label="?????????"
                                                                />
                                                            </RadioGroup>
                                                        </Grid>
                                                        
                                                        <Grid item md={6} xs={12}>
                                                            <RadioGroup>
                                                                <FormControlLabel
                                                                    value="true"
                                                                    control={<Radio />}
                                                                    label="?????????"
                                                                />
                                                            </RadioGroup>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell className="align-items-center text-center" width="5%">??????</TableCell>
                                        <TableCell className="align-items-center text-center" width="30%"></TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="15%">??????</TableCell>
                                        <TableCell width="50%">
                                            <Grid container md={10} xs={12}>
                                                <Grid item md={5} xs={12} className="align-items-center">
                                                    <FormControl size="small" fullWidth variant="outlined">
                                                        <InputLabel>????????????</InputLabel>
                                                        <Select>
                                                            <MenuItem value="1">??????</MenuItem>
                                                            <MenuItem value="2">??????</MenuItem>
                                                            <MenuItem value="3">??????</MenuItem>
                                                            <MenuItem value="4">??????</MenuItem>
                                                            <MenuItem value="5">??????</MenuItem>
                                                            <MenuItem value="6">??????</MenuItem>
                                                            <MenuItem value="7">??????</MenuItem>
                                                            <MenuItem value="8">??????</MenuItem>
                                                            <MenuItem value="9">??????</MenuItem> 
                                                            <MenuItem value="10">??????</MenuItem>
                                                            <MenuItem value="11">??????</MenuItem>
                                                            <MenuItem value="12">??????</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell className="align-items-center text-center" width="5%">??????</TableCell>
                                        <TableCell className="align-items-center text-center" width="30%"></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                    
                    <Grid container spacing={3} md={12} xs={12} style={{marginTop: "15px"}} className="mt-20">
                        <Grid item md={12} xs={12} className="align-items-center">
                            <Grid container>
                                <Grid item md={5} xs={12} className="align-items-center">
                                    <InputLabel>????????<i style={{color: "#FF0000", fontStyle: "normal"}}><strong>1</strong></i> ??? / ????????<i style={{color: "#FF0000", fontStyle: "normal"}}><strong>1</strong></i> ??? | ?????? ???????????? ????????? <i style={{color: "#FF0000", fontStyle: "normal"}}><strong>0</strong></i> ???</InputLabel>
                                </Grid>
                                <Grid item md={4} xs={12} className="align-items-center"></Grid>
                                <Grid item md={3} xs={12}>
                                    <Grid container>
                                        <Grid item md={6} xs={12} className="align-items-center">
                                            <FormControl size="small" fullWidth variant="outlined">
                                                <InputLabel>????????? ???</InputLabel>
                                                <Select>
                                                    <MenuItem value="1">????????? ???</MenuItem>
                                                    <MenuItem value="2">????????? ???</MenuItem>
                                                    <MenuItem value="3">?????? ????????? ???</MenuItem>
                                                    <MenuItem value="4">?????? ????????? ???</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={6} xs={12} className="align-items-center" style={{paddingLeft: "10px"}}>
                                            <FormControl size="small" fullWidth variant="outlined">
                                                <InputLabel>10???</InputLabel>
                                                <Select>
                                                    <MenuItem value="10">10???</MenuItem>
                                                    <MenuItem value="20">20???</MenuItem>
                                                    <MenuItem value="30">30???</MenuItem>
                                                    <MenuItem value="50">50???</MenuItem>
                                                    <MenuItem value="100">100???</MenuItem>
                                                    <MenuItem value="150">150???</MenuItem>
                                                    <MenuItem value="200">200???</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Grid item md={12} xs={12} style={{maxWidth: "100%", overflowX: "auto"}}>
                            <Table className="order_table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="text-center" width="3%"><strong>??????</strong></TableCell>
                                        <TableCell className="text-center" width="3%"><strong>??????</strong></TableCell>
                                        <TableCell className="text-center"><strong>?????????</strong></TableCell>
                                        <TableCell className="text-center"><strong>??????</strong></TableCell>
                                        <TableCell className="text-center"><strong>????????? ??????</strong></TableCell>
                                        <TableCell className="text-center"><strong>??????/??????/??????/??????</strong></TableCell>
                                        <TableCell className="text-center"><strong>?????????</strong></TableCell>
                                        <TableCell className="text-center"><strong>????????? ??????</strong></TableCell>
                                        <TableCell className="text-center"><strong>?????????</strong></TableCell>
                                        <TableCell className="text-center"><strong>???????????????</strong></TableCell>
                                        <TableCell className="text-center"><strong>????????????</strong></TableCell>
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
                                                style={{marginLeft: "18%"}}
                                            />
                                        </TableCell>
                                        <TableCell className="text-center">1</TableCell>
                                        <TableCell className="text-center">Morning</TableCell>
                                        <TableCell className="text-center">?????????</TableCell>
                                        <TableCell className="text-center">?????? ?????????</TableCell>
                                        <TableCell className="text-center">??????/?????????/??????/?????????</TableCell>
                                        <TableCell className="text-center">hink@gmail.com</TableCell>
                                        <TableCell className="text-center">000-0000-0000</TableCell>
                                        <TableCell className="text-center">2021.01.01</TableCell>
                                        <TableCell className="text-center">2021.01.05 13:00:00</TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                size="medium"
                                                variant="contained"    
                                                color="primary"
                                                onClick={this.onOpenModal2.bind(this)}
                                                startIcon={<EditIcon/>}>??????</Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                    
                    <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Grid item md={5} xs={12} className="align-items-center">
                            <Grid item md={3} xs={12}>
                                <Button 
                                    fullWidth
                                    size="medium"
                                    variant="contained"
                                    startIcon={<DeleteIcon/>}
                                    style={{backgroundColor: "#FF0000", color: "#fff", fontStyle: "normal"}}>????????????</Button>
                            </Grid>
                            <Grid item md={4} xs={12} className="align-items-center" style={{paddingLeft: "10px"}}>
                                <Button
                                    fullWidth
                                    size="medium"
                                    variant="contained"     
                                    style={{border: "1px solid #cccbcb"}}>?????? ????????? ????????????</Button>
                            </Grid>
                        </Grid>
                        <Grid item md={7} xs={12} className="align-items-center"></Grid>
                    </Grid>

                    <Dialog open={this.state.isOpenModal} aria-labelledby="responsive-dialog-title" maxWidth="sm" fullWidth>
                        <DialogTitle id="responsive-dialog-title">
                            <h2>????????? ??????</h2>
                        </DialogTitle>
                        
                        <DialogContent>
                            <Grid spacing={2} container md={12} xs={12}> 
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell width="25%"><strong>?????????</strong></TableCell>
                                            <TableCell width="75%">
                                                <Grid container md={12} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        size="small"  
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell width="25%"><strong>????????????</strong></TableCell>
                                            <TableCell width="75%">
                                                <Grid container md={12} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        size="small"  
                                                        variant="outlined"
                                                        placeholder="8~16?????? ?????? ??????????????? ??????, ???????????? ??????"
                                                    />
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                        
                                        <TableRow>
                                            <TableCell width="25%"><strong>??????</strong></TableCell>
                                            <TableCell width="75%">
                                                <Grid container md={12} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        size="small"  
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell width="25%"><strong>????????? ??????</strong></TableCell>
                                            <TableCell width="75%">
                                                <Grid container md={12} xs={12} className="align-items-center">
                                                    <FormControl size="small" fullWidth variant="outlined">
                                                        <InputLabel>????????? ?????? ??????</InputLabel>
                                                        <Select>
                                                            <MenuItem value="1">?????? ?????????</MenuItem>
                                                            <MenuItem value="2">???????????????</MenuItem>
                                                            <MenuItem value="3">???????????????</MenuItem>
                                                            <MenuItem value="4">???????????????</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell width="25%"><strong>?????? ??????</strong></TableCell>
                                            <TableCell width="75%">
                                                <Grid container md={12} xs={12} className="align-items-center">
                                                    <Grid item md={5} xs={12}>
                                                        <FormControl size="small" fullWidth variant="outlined">
                                                            <InputLabel>?????? ?????? ??????</InputLabel>
                                                            <Select>
                                                                <MenuItem value="1">??????</MenuItem>
                                                                <MenuItem value="2">????????????</MenuItem>
                                                                <MenuItem value="3">???????????????</MenuItem>
                                                                <MenuItem value="4">?????????</MenuItem>
                                                                <MenuItem value="5">?????????</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item md={2} xs={12} style={{paddingLeft: "5px", textAlign: "center"}}><strong>??????</strong></Grid>
                                                    <Grid item md={5} xs={12} style={{paddingLeft: "5px"}}>
                                                        <FormControl size="small" fullWidth variant="outlined">
                                                            <InputLabel>?????? ??????</InputLabel>
                                                            <Select>
                                                                <MenuItem value="1">...</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell width="25%"><strong>??????</strong></TableCell>
                                            <TableCell width="75%">
                                                <Grid container md={12} xs={12} className="align-items-center">
                                                    <Grid item md={5} xs={12}>
                                                        <FormControl size="small" fullWidth variant="outlined">
                                                            <InputLabel>?????? ??????</InputLabel>
                                                            <Select>
                                                                <MenuItem value="1">??????</MenuItem>
                                                                <MenuItem value="2">??????</MenuItem>
                                                                <MenuItem value="3">??????</MenuItem>
                                                                <MenuItem value="4">??????</MenuItem>
                                                                <MenuItem value="5">??????</MenuItem>
                                                                <MenuItem value="6">??????</MenuItem>
                                                                <MenuItem value="7">??????</MenuItem>
                                                                <MenuItem value="8">??????</MenuItem>
                                                                <MenuItem value="9">??????</MenuItem>
                                                                <MenuItem value="10">??????</MenuItem>
                                                                <MenuItem value="11">??????</MenuItem>
                                                                <MenuItem value="12">??????</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item md={2} xs={12} style={{paddingLeft: "5px", textAlign: "center"}}><strong>??????</strong></Grid>
                                                    <Grid item md={5} xs={12} style={{paddingLeft: "5px"}}>
                                                        <FormControl size="small" fullWidth variant="outlined">
                                                            <InputLabel>?????? ??????</InputLabel>
                                                            <Select>
                                                                <MenuItem value="1">...</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell width="25%"><strong>?????????</strong></TableCell>
                                            <TableCell width="75%">
                                                <Grid container md={12} xs={12}>
                                                    <Grid item md={7} xs={12} className="align-items-center">
                                                        <TextField
                                                            fullWidth
                                                            size="small"  
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid item md={5} xs={12} className="align-items-center" style={{paddingLeft: "5px"}}>
                                                        <Button
                                                            fullWidth
                                                            size="medium"
                                                            variant="contained"
                                                            style={{backgroundColor: "#0ed297", color: "#fff"}}
                                                            onClick={this.onChangeMail.bind(this)}
                                                        >{this.state.isChangeMail === false ? "???????????? ??????" : "???????????? ?????????"}</Button>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>

                                        {this.state.isChangeMail === true ? (
                                            <React.Fragment>
                                                <TableRow>
                                                    <TableCell width="25%"><strong>???????????? ??????</strong></TableCell>
                                                    <TableCell width="75%">
                                                        <Grid container md={12} xs={12}>
                                                            <Grid item md={9} xs={12} className="align-items-center">
                                                                <TextField
                                                                    fullWidth
                                                                    size="small"  
                                                                    variant="outlined"
                                                                />
                                                            </Grid>
                                                            <Grid item md={3} xs={12} className="align-items-center" style={{paddingLeft: "5px"}}>
                                                                <Button
                                                                    fullWidth
                                                                    size="medium"
                                                                    variant="contained"
                                                                    color="primary"
                                                                >??????</Button>
                                                            </Grid>
                                                        </Grid>
                                                    </TableCell>
                                                </TableRow>
                                            </React.Fragment>) : null}

                                        <TableRow>
                                            <TableCell width="25%"><strong>????????? ??????</strong></TableCell>
                                            <TableCell width="75%">
                                                <Grid container md={12} xs={12}>
                                                    <Grid item md={7} xs={12} className="align-items-center">
                                                        <TextField
                                                            fullWidth
                                                            size="small"  
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid item md={5} xs={12} className="align-items-center" style={{paddingLeft: "5px"}}>
                                                        <Button
                                                            fullWidth
                                                            size="medium"
                                                            variant="contained"
                                                            style={{backgroundColor: "#0ed297", color: "#fff"}}
                                                            onClick={this.onRequestValidationCode.bind(this)}
                                                        >{this.state.isValidationCode === false ? "???????????? ??????" : "???????????? ?????????"}</Button>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>

                                        {this.state.isValidationCode === true ? (
                                            <React.Fragment>
                                                <TableRow>
                                                    <TableCell width="25%"><strong>???????????? ??????</strong></TableCell>
                                                    <TableCell width="75%">
                                                        <Grid container md={12} xs={12}>
                                                            <Grid item md={9} xs={12} className="align-items-center">
                                                                <TextField
                                                                    fullWidth
                                                                    size="small"  
                                                                    variant="outlined"
                                                                />
                                                            </Grid>
                                                            <Grid item md={3} xs={12} className="align-items-center" style={{paddingLeft: "5px"}}>
                                                                <Button
                                                                    fullWidth
                                                                    size="medium"
                                                                    variant="contained"
                                                                    color="primary"
                                                                >??????</Button>
                                                            </Grid>
                                                        </Grid>
                                                    </TableCell>
                                                </TableRow>
                                            </React.Fragment>) : null}
                                    </TableBody>
                                </Table>
                            </Grid>
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
                                onClick={this.onCloseModal.bind(this)}
                            >??????</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={this.state.isOpenModal2} aria-labelledby="responsive-dialog-title" maxWidth="sm" fullWidth>
                        <DialogTitle id="responsive-dialog-title">
                            <h2>????????? ??????</h2>
                        </DialogTitle>
                        
                        <DialogContent>
                            <Grid spacing={2} container md={12} xs={12}> 
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell width="25%"><strong>?????????</strong></TableCell>
                                            <TableCell width="75%" style={{textAlign: "center"}}><strong>hink39</strong></TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell width="25%"><strong>????????????</strong></TableCell>
                                            <TableCell width="75%">
                                                <Grid container md={12} xs={12}>
                                                    <Grid item md={6} xs={12} className="align-items-center text-center">
                                                        <InputLabel><strong>********************</strong></InputLabel>
                                                    </Grid> 
                                                    <Grid item md={6} xs={12} className="align-items-center">
                                                        <Button
                                                            fullWidth
                                                            size="medium"
                                                            variant="contained"
                                                            style={{backgroundColor: "#0ed297", color: "#fff"}}
                                                            startIcon={<PasswordIcon/>}
                                                            onClick={this.onOpenModal3.bind(this)}
                                                        >???????????? ??????</Button>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell width="25%"><strong>??????</strong></TableCell>
                                            <TableCell width="75%" style={{textAlign: "center"}}><strong>?????????</strong></TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell width="25%"><strong>????????? ??????</strong></TableCell>
                                            <TableCell width="75%">
                                                <Grid container md={12} xs={12} className="align-items-center">
                                                    <FormControl size="small" fullWidth variant="outlined">
                                                        <InputLabel></InputLabel>
                                                        <Select>
                                                            <MenuItem value="1">...</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell width="25%"><strong>?????? ??????</strong></TableCell>
                                            <TableCell width="75%">
                                                <Grid container md={12} xs={12} className="align-items-center">
                                                    <Grid item md={5} xs={12}>
                                                        <FormControl size="small" fullWidth variant="outlined">
                                                            <InputLabel></InputLabel>
                                                            <Select>
                                                                <MenuItem value="1">...</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item md={2} xs={12} style={{paddingLeft: "5px", textAlign: "center"}}><strong>??????</strong></Grid>
                                                    <Grid item md={5} xs={12} style={{paddingLeft: "5px"}}>
                                                        <FormControl size="small" fullWidth variant="outlined">
                                                            <InputLabel></InputLabel>
                                                            <Select>
                                                                <MenuItem value="1">...</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell width="25%"><strong>??????</strong></TableCell>
                                            <TableCell width="75%">
                                                <Grid container md={12} xs={12} className="align-items-center">
                                                    <Grid item md={5} xs={12}>
                                                        <FormControl size="small" fullWidth variant="outlined">
                                                            <InputLabel></InputLabel>
                                                            <Select>
                                                                <MenuItem value="1">...</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item md={2} xs={12} style={{paddingLeft: "5px", textAlign: "center"}}><strong>??????</strong></Grid>
                                                    <Grid item md={5} xs={12} style={{paddingLeft: "5px"}}>
                                                        <FormControl size="small" fullWidth variant="outlined">
                                                            <InputLabel></InputLabel>
                                                            <Select>
                                                                <MenuItem value="1">...</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell width="25%"><strong>?????????</strong></TableCell>
                                            <TableCell width="75%">
                                                <Grid container md={12} xs={12}>
                                                    <Grid item md={5} xs={12} className="align-items-center text-center"><strong>hink39@gmail.com</strong></Grid>
                                                    <Grid item md={2} xs={12} className="align-items-center text-center" style={{paddingLeft: "5px"}}>
                                                        {this.state.isChangeMail === false ? (<InputLabel style={{color: '#33acff'}}>????????????</InputLabel>) : (<InputLabel style={{color: '#ff0000'}}>????????????</InputLabel>)}
                                                    </Grid>
                                                    <Grid item md={5} xs={12} className="align-items-center" style={{paddingLeft: "5px"}}>
                                                        <Button
                                                            fullWidth
                                                            size="medium"
                                                            variant="contained"
                                                            style={{backgroundColor: "#0ed297", color: "#fff"}}
                                                            onClick={this.onChangeMail.bind(this)}
                                                        >{this.state.isChangeMail === false ? "????????? ??????" : "???????????? ?????????"}</Button>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>

                                        {this.state.isChangeMail === true ? (
                                            <React.Fragment>
                                                <TableRow>
                                                    <TableCell width="25%"><strong>???????????? ??????</strong></TableCell>
                                                    <TableCell width="75%">
                                                        <Grid container md={12} xs={12}>
                                                            <Grid item md={9} xs={12} className="align-items-center">
                                                                <TextField
                                                                    fullWidth
                                                                    size="small"  
                                                                    variant="outlined"
                                                                />
                                                            </Grid>
                                                            <Grid item md={3} xs={12} className="align-items-center" style={{paddingLeft: "5px"}}>
                                                                <Button
                                                                    fullWidth
                                                                    size="medium"
                                                                    variant="contained"
                                                                    color="primary"
                                                                >??????</Button>
                                                            </Grid>
                                                        </Grid>
                                                    </TableCell>
                                                </TableRow>
                                            </React.Fragment>) : null}

                                        <TableRow>
                                            <TableCell width="25%"><strong>????????? ??????</strong></TableCell>
                                            <TableCell width="75%">
                                                <Grid container md={12} xs={12}>
                                                    <Grid item md={6} xs={12} className="align-items-center">
                                                        <TextField
                                                            fullWidth
                                                            size="small"  
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid item md={2} xs={12} className="align-items-center text-center" style={{paddingLeft: "5px"}}>
                                                        <InputLabel style={{color: "#ff0000"}}>????????????</InputLabel>
                                                    </Grid>
                                                    <Grid item md={4} xs={12} className="align-items-center" style={{paddingLeft: "5px"}}>
                                                        <Button
                                                            fullWidth
                                                            size="medium"
                                                            variant="contained"
                                                            style={{backgroundColor: "#0ed297", color: "#fff"}}
                                                        >???????????? ??????</Button>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Grid>
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
                                onClick={this.onCloseModal2.bind(this)}
                            >??????</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={this.state.isOpenModal3} aria-labelledby="responsive-dialog-title" maxWidth="sm" fullWidth>
                        <DialogTitle id="responsive-dialog-title">
                            <h2>???????????? ??????</h2>
                        </DialogTitle>
                        
                        <DialogContent>
                            <Grid spacing={2} container md={12} xs={12}> 
                                <Grid item md={3} xs={12} className="align-items-center">
                                    <h5>??? ????????????</h5>
                                </Grid>
                                <Grid item md={9} xs={12} className="align-items-center">
                                    <TextField
                                        fullWidth
                                        size="small"  
                                        variant="outlined"
                                        placeholder="??? ????????????"
                                    />
                                </Grid>
                            </Grid>

                            <Grid spacing={2} container md={12} xs={12}> 
                                <Grid item md={3} xs={12} className="align-items-center">
                                    <h5>??? ???????????? ??????</h5>
                                </Grid>
                                <Grid item md={9} xs={12} className="align-items-center">
                                    <TextField
                                        fullWidth
                                        size="small"  
                                        variant="outlined"
                                        placeholder="??? ???????????? ??????"
                                    />
                                </Grid>
                            </Grid>

                            <Grid spacing={2} container md={12} xs={12}> 
                                <Grid item md={12} xs={12} className="align-items-center">
                                    <InputLabel>8~16?????? ?????? ??????????????? ??????, ???????????? ??????</InputLabel>
                                </Grid>
                            </Grid>
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
                                onClick={this.onCloseModal3.bind(this)}
                            >??????</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </React.Fragment>
        );
    }
}

// Redux state to props
const mapStateToProps = (state) => {
    return {
        apolloClient: state.apolloClient,
    };
};

export default withSnackbar(connect(mapStateToProps, null)(UsersList));
