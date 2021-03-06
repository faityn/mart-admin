import React from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import { GET_CATEGORIES } from "../Queries";
import PageTitle from "../../../core/common/Partials/PageTitle";
import PaginationMaterial from "@material-ui/lab/Pagination";
import { Grid, TextField, Button, FormControl, Select, MenuItem, InputLabel, Table, TableBody, TableRow, TableCell, FormControlLabel, Checkbox,
        Dialog, DialogContent, DialogActions, Divider, Input} from "@material-ui/core";
import SubjectIcon from '@material-ui/icons/Subject';
import SearchIcon from '@material-ui/icons/Search';
import PrintIcon from '@material-ui/icons/Print';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import CancelIcon from '@material-ui/icons/Cancel';
import ConfirmIcon from '@material-ui/icons/Check';

class ProductStatusPurchased extends React.Component {
    constructor(props) {
        super(props);

        let info = this.props.product ? this.props.product.info : {};

        this.state = {
            isOpenModal: false,
            selectedCategories: {
                firstId: info ? info.firstCategory : "",
                secondId: info ? info.secondCategory : "",
                thirdId: info ? info.thirdCategory : "",
            },
            categories: {
                first: [],
                second: [],
                third: [],
            },
        };

        this.onOpenModal = this.onOpenModal.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
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

    async componentDidMount() {
        const { data } = await this.props.apolloClient.httpClient.query({
            query: GET_CATEGORIES,
        });
    
        if (data) {
            this.setState({
                categories: data.categories,
            });
        }
    }

    /**
    * @summary On change category
    * @param {MouseEvent} event
    */
    onChangeCategory(event, level) {
        event.preventDefault();
        const val = event.target.value;
    
        if (level === 1) {
            this.setState({
                selectedCategories: {
                    firstId: val,
                    secondId: "",
                    thirdId: "",
                },
            });
        } else if (level === 2) {
            this.setState({
                selectedCategories: {
                    firstId: this.state.selectedCategories.firstId,
                    secondId: val,
                    thirdId: "",
                },
            });
        } else if (level === 3) {
            this.setState({
                selectedCategories: {
                    firstId: this.state.selectedCategories.firstId,
                    secondId: this.state.selectedCategories.secondId,
                    thirdId: val,
                },
            });
        }
    }
    
    render() {
        return (
            <React.Fragment>
                <Grid container>
                    <Grid item>
                        <PageTitle
                            menuName="????????????"
                            title="????????????"
                            icon={<SubjectIcon />}
                        />
                    </Grid>
                </Grid> 
                
                <div className="card mt-20">
                    <Grid container spacing={3} md={11} xs={12}>
                        <Grid item md={2} xs={12} className="align-items-center">
                            <h5>????????????</h5>
                        </Grid>

                        <Grid item md={10} xs={12} className="align-items-center"> 
                            <Grid item md={2} xs={12}>
                                <FormControl size="small" fullWidth variant="outlined">
                                    <InputLabel>?????????</InputLabel>
                                    <Select>
                                        <MenuItem value="">...</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid container md={6} xs={12} className="align-items-center">
                                <Grid item md={2} xs={12} style={{paddingLeft: "10px"}}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"
                                        style={{border: "1px solid #cccbcb"}}
                                    >??????
                                    </Button>
                                </Grid>
                                <Grid item md={2} xs={12} style={{paddingLeft: "5px"}}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"
                                        style={{border: "1px solid #cccbcb"}}
                                    >1??????
                                    </Button>
                                </Grid>
                                <Grid item md={2} xs={12} style={{paddingLeft: "5px"}}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"
                                        style={{border: "1px solid #cccbcb"}}
                                    >?????? ???</Button>
                                </Grid>
                                <Grid item md={2} xs={12} style={{paddingLeft: "5px"}}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"
                                        style={{border: "1px solid #cccbcb"}}
                                    >1??????
                                    </Button>
                                </Grid>
                                <Grid item md={2} xs={12} style={{paddingLeft: "5px"}}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"
                                        style={{border: "1px solid #cccbcb"}}
                                    >3??????
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container md={4} xs={12}>
                                <Grid item md={5} xs={12} className="align-items-center">
                                    <TextField
                                        fullWidth
                                        size="small"  
                                        variant="outlined"
                                        type="date"
                                        name="startDate"
                                    />
                                </Grid>
                                <Grid item md={1} xs={12} className="text-center" className="align-items-center" style={{paddingTop: "8px", paddingLeft: "1rem"}}>
                                    <h5>~</h5>
                                </Grid>
                                <Grid item md={5} xs={12} className="align-items-center">
                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        type="date"
                                        name="endDate"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={11} xs={12}>
                        <Grid item md={2} xs={12}>
                            <h5>????????????</h5>
                        </Grid>
                        
                        <Grid item md={10} xs={12} className="align-items-center">
                            <Grid container>
                                <Grid item md={2} xs={12} className="align-items-center">
                                    <FormControl size="small" fullWidth variant="outlined">
                                        <InputLabel>??????</InputLabel>
                                        <Select>
                                            <MenuItem value="">??????</MenuItem>
                                            <MenuItem value="">?????????</MenuItem>
                                            <MenuItem value="">????????????</MenuItem>
                                            <MenuItem value="">?????? ?????????</MenuItem>
                                            <MenuItem value="">????????????</MenuItem>
                                            <MenuItem value="">????????????</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={5} xs={12} className="align-items-center text-center" style={{marginLeft: "10px"}}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={1} xs={12} className="align-items-center text-center" style={{marginLeft: "10px"}}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"
                                        color="primary"
                                        startIcon={<SearchIcon/>}
                                    >??????</Button>
                                </Grid>
                            </Grid>
                        </Grid> 
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12}>
                        <Grid item md={2} xs={12} className="align-items-center">
                            <h5>?????? (???<i style={{color: "#ff0000", fontStyle: "normal"}}><strong> 1 </strong></i>???)</h5>
                        </Grid>
                            
                        <Grid item md={10} xs={12} className="align-items-center">
                            <Grid container>
                                <Grid item md={4} xs={12}></Grid>
                                <Grid item md={1} xs={12} className="align-items-center"><InputLabel>?????? ?????? ??????</InputLabel></Grid>
                                <Grid item md={2} xs={12} className="align-items-center">
                                    <FormControl size="small" fullWidth variant="outlined">
                                        <InputLabel>?????? ???????????????</InputLabel>
                                        <Select>
                                            <MenuItem value="1">?????????</MenuItem>
                                            <MenuItem value="2">???????????????</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={1} xs={12} className="align-items-center" style={{paddingLeft: "10px"}}>
                                    <FormControl size="small" fullWidth variant="outlined">
                                        <InputLabel>10???</InputLabel>
                                        <Select>
                                            <MenuItem value="10">10???</MenuItem>
                                            <MenuItem value="30">30???</MenuItem>
                                            <MenuItem value="50">50???</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={2} xs={12} className="align-items-center" style={{paddingLeft: "10px" }}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained" 
                                        style={{backgroundColor: "#FF5733", color: "#fff"}}
                                        startIcon={<PrintIcon/>}
                                        onClick={this.onOpenModal.bind(this)}>?????? ??????</Button>
                                </Grid>
                                <Grid item md={2} xs={12} className="align-items-center" style={{paddingLeft: "10px" }}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained" 
                                        style={{backgroundColor: "#0eb906", color: "#fff"}}
                                        startIcon={<DownloadIcon/>}>????????? ??????</Button>
                                </Grid>
                            </Grid>
                        </Grid>                                                        
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Grid item md={12} xs={12}>
                            <Table className="order_table">
                                <TableBody>
                                    <TableRow style={{backgroundColor: "#f2f2f2", border: "1px solid #cccccc"}}>
                                        <TableCell className="text-center" width="3%"><strong>No.</strong></TableCell>
                                        <TableCell className="text-center" width="3%"><strong>??????</strong></TableCell> 
                                        <TableCell className="text-center" width="5%"><strong>??????</strong></TableCell>
                                        <TableCell className="text-center" width="10%"><strong>??????????????????</strong></TableCell>
                                        <TableCell className="text-center" width="10%"><strong>?????? ?????????</strong></TableCell>
                                        <TableCell className="text-center" width="14%"><strong>?????????</strong></TableCell>
                                        <TableCell className="text-center" width="3%"><strong>??????</strong></TableCell>
                                        <TableCell className="text-center" width="6%"><strong>????????? ??????</strong></TableCell>
                                        <TableCell className="text-center" width="5%"><strong>????????????</strong></TableCell>
                                        <TableCell className="text-center" width="5%"><strong>????????????</strong></TableCell>
                                        <TableCell className="text-center" width="10%"><strong>??????</strong></TableCell>
                                        <TableCell className="text-center" width="10%"><strong>????????? ?????????</strong></TableCell>
                                        <TableCell className="text-center" width="6%"><strong>????????????</strong></TableCell>
                                        <TableCell className="text-center" width="6%"><strong>?????? ?????????</strong></TableCell>
                                        <TableCell className="text-center" width="6%"><strong>????????????</strong></TableCell>
                                    </TableRow>

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
                                        <TableCell className="text-center">??????</TableCell>
                                        <TableCell className="text-center">2021091013130</TableCell>
                                        <TableCell className="text-center">88545458990</TableCell>
                                        <TableCell className="text-center">?????????????????? 250T X 1??????</TableCell>
                                        <TableCell className="text-center">1</TableCell>
                                        <TableCell className="text-center"><InputLabel style={{color: "#ff0000"}}>?????? ??????</InputLabel></TableCell>
                                        <TableCell className="text-center">?????????</TableCell>
                                        <TableCell className="text-center">?????????</TableCell>
                                        <TableCell className="text-center">?????? ????????? ???????????? 12</TableCell>
                                        <TableCell className="text-center">010-0000-0000</TableCell>
                                        <TableCell className="text-center">????????????</TableCell>
                                        <TableCell className="text-center">????????????</TableCell>
                                        <TableCell className="text-center">????????????</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>

                    <Grid container className="mt-20">
                        <Grid item xs={12}>
                            <PaginationMaterial count={10} color="primary" />
                        </Grid>
                    </Grid>

                    <Dialog open={this.state.isOpenModal} maxWidth="lg" fullWidth>
                        <DialogContent>
                            <Grid container spacing={3} md={12} xs={12}>
                                <Grid item md={12} xs={12}>
                                    <Table className="order_table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell width="15%" className="text-center" style={{backgroundColor: "#f2f2f2", border: "1px solid #cccccc"}}><strong>?????????</strong></TableCell>
                                                <TableCell width="15%" className="text-center"><InputLabel>?????????</InputLabel></TableCell>
                                                <TableCell width="15%" className="text-center" style={{backgroundColor: "#f2f2f2", border: "1px solid #cccccc"}}><strong>?????????</strong></TableCell>
                                                <TableCell width="20%" className="text-center"><InputLabel>010-0000-0000</InputLabel></TableCell>
                                                <TableCell width="15%" className="text-center" style={{backgroundColor: "#f2f2f2", border: "1px solid #cccccc"}}><strong>????????????</strong></TableCell>
                                                <TableCell width="20%" className="text-center" colSpan={2}><InputLabel>2021.02.25 13:00</InputLabel></TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell className="text-center" style={{backgroundColor: "#f2f2f2", border: "1px solid #cccccc"}}><strong>????????????</strong></TableCell>
                                                <TableCell colSpan={6} style={{textAlign: "left"}}><InputLabel>?????? ????????? ???????????? 112(?????? ????????? 101??? 1207???)</InputLabel></TableCell>
                                            </TableRow>

                                            <TableRow style={{backgroundColor: "#f2f2f2", border: "1px solid #cccccc"}}>
                                                <TableCell className="text-center"><strong>No.</strong></TableCell>
                                                <TableCell className="text-center"><strong>????????????</strong></TableCell>
                                                <TableCell className="text-center"><strong>?????? ?????????</strong></TableCell>
                                                <TableCell className="text-center"><strong>?????????</strong></TableCell>
                                                <TableCell className="text-center"><strong>??????</strong></TableCell>
                                                <TableCell className="text-center"><strong>??????</strong></TableCell>
                                                <TableCell className="text-center"><strong>?????????</strong></TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell className="text-center">001</TableCell>
                                                <TableCell className="text-center" rowSpan={5}>0021512</TableCell>
                                                <TableCell className="text-center">22208249</TableCell>
                                                <TableCell className="text-center">2.5kg ??? ???(?????????) 2.5kg</TableCell>
                                                <TableCell className="text-center">1</TableCell>
                                                <TableCell className="text-center">??????</TableCell>
                                                <TableCell className="text-center" rowSpan={5}>?????????</TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell className="text-center">002</TableCell>
                                                <TableCell className="text-center">8809345230019</TableCell>
                                                <TableCell className="text-center">?????? ??????(??????)-1???1??? ?????? 30???</TableCell>
                                                <TableCell className="text-center">1</TableCell>
                                                <TableCell className="text-center">??????</TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell className="text-center">003</TableCell>
                                                <TableCell className="text-center">207972</TableCell>
                                                <TableCell className="text-center">??? ??????(?????????) 100g</TableCell>
                                                <TableCell className="text-center">1</TableCell>
                                                <TableCell className="text-center">??????</TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell className="text-center">004</TableCell>
                                                <TableCell className="text-center">8801391102227</TableCell>
                                                <TableCell className="text-center">????????? ???????????? 400g x 1???</TableCell>
                                                <TableCell className="text-center">1</TableCell>
                                                <TableCell className="text-center">??????</TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell className="text-center">005</TableCell>
                                                <TableCell className="text-center">8801308445386</TableCell>
                                                <TableCell className="text-center">?????? ?????? ????????? 35g x 1???</TableCell>
                                                <TableCell className="text-center">1</TableCell>
                                                <TableCell className="text-center">??????</TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell className="text-center" style={{backgroundColor: "#f2f2f2", border: "1px solid #cccccc"}}><strong>?????????</strong></TableCell>
                                                <TableCell colSpan={6} style={{textAlign: "left"}}><InputLabel>???????????? ?????? 1024# ?????????. ??? ?????? ??? ?????????</InputLabel></TableCell>
                                            </TableRow>
                                            
                                            <TableRow>
                                                <TableCell className="text-center"><strong>?????? ????????????</strong></TableCell>
                                                <TableCell className="text-center" colSpan={2}><InputLabel>?????? 14:00</InputLabel></TableCell>
                                                <TableCell className="text-center"><strong>?????????</strong></TableCell>
                                                <TableCell className="text-center" colSpan={3}><InputLabel>3,000</InputLabel></TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell className="text-center" style={{backgroundColor: "#f2f2f2", border: "1px solid #cccccc"}} colSpan={7}><strong>???????????? ????????????</strong></TableCell>
                                            </TableRow>
                                            
                                            <TableRow>
                                                <TableCell colSpan={4} style={{textAlign: "left"}}><InputLabel>+ ?????? : 070-0000-0000</InputLabel></TableCell>
                                                <TableCell colSpan={3} style={{textAlign: "left"}}><InputLabel>+ ????????????????????? : 866-86-01489</InputLabel></TableCell>
                                            </TableRow>
                                            
                                            <TableRow>
                                                <TableCell colSpan={4} style={{textAlign: "left"}}><InputLabel>+ ???????????? : 09:00~18:00</InputLabel></TableCell>
                                                <TableCell colSpan={3} style={{textAlign: "left"}}><InputLabel>+ ????????????????????? : ??? 00-000-0000 ???</InputLabel></TableCell>
                                            </TableRow>
                                            
                                            <TableRow>
                                                <TableCell colSpan={4} style={{textAlign: "left"}}><InputLabel>+ ????????? ?????? : (08514) ??????????????? ????????? ????????????10??? 9 ??????????????? 7??? G?????????????????????</InputLabel></TableCell>
                                                <TableCell colSpan={3} style={{textAlign: "left"}}><InputLabel>+ ????????? : admin@anibeolsseo.com</InputLabel></TableCell>
                                            </TableRow>
                                            
                                            <TableRow>
                                                <TableCell colSpan={4} style={{textAlign: "left"}}><InputLabel>+ ????????? : ?????????</InputLabel></TableCell>
                                                <TableCell colSpan={3} style={{textAlign: "left"}}><InputLabel>+ ???????????? : www.anibeolsseo.com</InputLabel></TableCell>
                                            </TableRow>
                                            
                                            <TableRow>
                                                <TableCell colSpan={7} style={{textAlign: "left"}}>
                                                    <InputLabel>+ ???????????? ????????? ??????????????? ???????????? ????????? ?????????<br/></InputLabel>
                                                    <InputLabel style={{marginTop: "2vh"}}>+ ???????????? ????????? ?????????(??????)?????? ?????? ?????????<br/></InputLabel>
                                                    <InputLabel style={{marginTop: "2vh"}}>+ (??????, ?????? ??????) ????????? ??????, ????????? 7??? ????????? ???????????????<br/></InputLabel>
                                                    <InputLabel style={{marginTop: "2vh"}}>+ ?????? 1?????? ?????? ?????? ????????????, ?????? ????????? 3,000???, 3?????? ?????? ?????? ??? ????????????.</InputLabel>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>
                        </DialogContent>

                        <Divider />

                        <DialogActions>
                            <Button
                                size="medium"
                                variant="outlined"
                                style={{backgroundColor: "#0eb906", color: "#fff"}}
                                startIcon={<ConfirmIcon/>}
                                onClick={this.onCloseModal.bind(this)}
                            >????????????</Button>
                            <Button
                                size="medium"
                                variant="outlined"
                                style={{backgroundColor: "#FF5733", color: "#fff"}}
                                startIcon={<PrintIcon/>}
                                onClick={this.onCloseModal.bind(this)}
                            >??????</Button>
                            <Button
                                size="medium"
                                variant="outlined"
                                style={{backgroundColor: "#fff", color: "#000"}}
                                startIcon={<CancelIcon/>}
                                onClick={this.onCloseModal.bind(this)}
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

export default withSnackbar(connect(mapStateToProps, null)(ProductStatusPurchased));
