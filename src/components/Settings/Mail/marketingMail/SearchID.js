import React from "react";

import {
    Grid,
    Button,
    Table,
    TableBody,
    TableRow,
    TableCell,
    FormControlLabel,
    Checkbox,
    TextField,
    FormControl,
    InputLabel,
    Select, MenuItem, TableHead, Radio,
} from "@material-ui/core";

import MenuIcon from '@material-ui/icons/Menu';

import {withSnackbar} from "notistack";
import {connect} from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import CKEditor from "ckeditor4-react";
import SaveIcon from "@material-ui/icons/Save";
import PaginationMaterial from "@material-ui/lab/Pagination/Pagination";
import {GET_MAIL_MARKET_REQS} from "../Queries";
import {countryList} from "../Country";


class SearchID extends React.Component {
    /**
     * @constructor
     */
    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        // Default state
        this.state = {
            mailList: [],
            total: 0,
            pagination: {
                rowsPerPage: 10,
                pageNumber: 1,
            },
            orderBy: "createdDate",
            type: "DESC",
            filter:{
                nation:"",
                role:"",
                age:"",
                gender:"F",
                userId:"F",
                allowMarketingMail:false
            },
            ages:[
                10,
                20,
                30,
                40,
                50
            ]
        };

        this.setFilter = this.setFilter.bind(this)
    }

    setFilter(value, key) {
        if (key == "nation") {
            this.setState({
                filter:{
                    ...this.state.filter,
                    nation: value
                }
            })
        }
        if (key == "role") {
            this.setState({
                filter:{
                    ...this.state.filter,
                    role: value
                }
            })
        }
        if (key == "gender") {
            this.setState({
                filter:{
                    ...this.state.filter,
                    gender: value
                }
            })
        }
        if (key == "age") {
            this.setState({
                filter:{
                    ...this.state.filter,
                    age: value
                }
            })
        }
        if (key == "allowMarketingMail") {
            this.setState({
                filter:{
                    ...this.state.filter,
                    allowMarketingMail: value
                }
            })
        }
        if (key == "userId") {
            this.setState({
                filter:{
                    ...this.state.filter,
                    userId: value
                }
            })
        }
    }

    async componentDidMount() {

        await this.getData(null);


    }

    async getData(page) {

        let mailFilter = {}

        if (this.state.age) {
            mailFilter = {
                "nation": "Mongolia",
                "gender": "F",
                "userId": "",
                "allowMarketingMail": true,
                "role": "",
                "age": 30
            }
        }
        await this.props.apolloClient.httpClient
            .query({
                query: GET_MAIL_MARKET_REQS,
                variables: {
                    "search": mailFilter,
                    page: {
                        limit: this.state.pagination.rowsPerPage,
                        pageNumber: page ? page : this.state.pagination.pageNumber,
                        orderBy: this.state.orderBy,
                        type: this.state.type,
                    },
                },
            })
            .then((result) => {


                this.setState({
                    mailList: result.data.getMailMarketReqs.list,
                    total: result.data.getMailMarketReqs.totalElements
                })


            });
    }
    async handlePageNumber(e, page) {
        this.setState({
            pagination: {
                rowsPerPage: this.state.pagination.rowsPerPage,
                pageNumber: page,
            }
        });

        await this.getData(page);
    }

    /**
     * @override
     */
    render() {
        return (
            <div style={{
                backgroundColor: "#fff",
                border: '2px solid #000',
                padding: "20px",
                height: "80vh",
                overflowY: "auto"
            }}>
                <Grid container spacing={2} className="align-items-center">
                    <Grid item md={12} xs={12}>
                        <h2 id="transition-modal-title">회원 검색</h2>

                    </Grid>
                    <a href="https://docs.google.com/presentation/d/1Cz7nUAh6Y8p_uTsrGNYENnU9KAFWmZw0/edit#slide=id.p60"
                       target="_blank">PPT загвар (Хийсний дараа устгах)</a>
                    <Grid item md={12} xs={12}>
                        <Table aria-label="simple table" className="member_table">
                            <TableBody>
                                <TableRow>
                                    <TableCell>수신자 구분</TableCell>
                                    <TableCell>
                                        <Grid container spacing={1} className="align-items-center">
                                            {this.props.roles.map((role, index) =>
                                                <Grid item md={2} xs={3} key={index} className="align-items-right">
                                                    <FormControlLabel
                                                        control={
                                                            <Radio name="role"
                                                                   checked={this.state.filter.role === role.name}
                                                                   onChange={() => this.setFilter(role.name, "role")}/>
                                                        }
                                                        label={role.name}
                                                    />
                                                </Grid>
                                            )}
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>수신 동의</TableCell>
                                    <TableCell colSpan={2}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name="active"
                                                    color="primary"
                                                    onChange={(e,v)=>{this.setFilter(v, "allowMarketingMail")}}
                                                />
                                            }
                                            label="E-Mail 수신 동의"
                                        />
                                        {/*<Grid container spacing={1} className="align-items-center">*/}
                                        {/*    <Grid item md={8} xs={8}>*/}
                                        {/*        <TextField*/}
                                        {/*            id="name-basic"*/}
                                        {/*            label="E-Mail 수신 동의"*/}
                                        {/*            size="small"*/}
                                        {/*            variant="outlined"*/}
                                        {/*            name="name"*/}
                                        {/*        />*/}
                                        {/*    </Grid>*/}
                                        {/*    <Grid item md={2} xs={2} className="align-items-right">*/}
                                        {/*        <Checkbox*/}
                                        {/*            name="active"*/}
                                        {/*            color="primary"*/}
                                        {/*        />*/}
                                        {/*    </Grid>*/}
                                        {/*</Grid>*/}
                                    </TableCell>
                                    <TableCell>성별</TableCell>
                                    <TableCell colSpan={2}>
                                        <Grid container spacing={1} className="align-items-center">
                                            <Grid item md={4} xs={4} className="align-items-right">
                                                <FormControlLabel
                                                    control={
                                                        <Radio
                                                            name="role"
                                                            checked={this.state.filter.gender === "F"}
                                                            onChange={() => this.setFilter("F", "gender")}

                                                            color="primary"
                                                        />
                                                    }
                                                    label="여"
                                                />
                                            </Grid>
                                            <Grid item md={4} xs={4} className="align-items-right">
                                                <FormControlLabel
                                                    control={
                                                        <Radio
                                                            name="role"
                                                            checked={this.state.filter.gender === ""}
                                                            onChange={() => this.setFilter("", "gender")}
                                                            color="primary"
                                                        />
                                                    }
                                                    label="밝히지 않음"
                                                />
                                            </Grid>
                                            <Grid item md={4} xs={4} className="align-items-right">
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            name="role"
                                                            checked={this.state.filter.gender === "M"}
                                                            onChange={() => this.setFilter("M", "gender")}

                                                            color="primary"
                                                        />
                                                    }
                                                    label="남"
                                                />
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>연령</TableCell>
                                    <TableCell colSpan={2}>
                                        <Grid container spacing={1} className="align-items-center">
                                            {this.state.ages.map((age, index) =>
                                                <Grid item md={2} xs={2} key={index} className="align-items-right">
                                                    <FormControlLabel
                                                        control={
                                                            <Radio name="role" checked={this.state.filter.age === age} onChange={() => this.setFilter(`${age}`, "age")}/>
                                                        }
                                                        label={age == 50 ? `${age}대 이상` :`${age}대`}
                                                    />
                                                </Grid>
                                            )}

                                        </Grid>
                                    </TableCell>
                                    <TableCell>국가</TableCell>
                                    <TableCell colSpan={2}>
                                        <Grid item>
                                            <FormControl size="small" fullWidth variant="outlined">
                                                <InputLabel id="demo-simple-select-outlined-label">Nation</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="demo-simple-select-outlined"
                                                    label="Nation"
                                                    onChange={(e) => this.setFilter(e.target.value, "nation")}
                                                >

                                                    {
                                                        countryList.map((country, index) =>
                                                            <MenuItem key={index}
                                                                      value={country.name}>{country.name}</MenuItem>
                                                        )


                                                    }
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>회원 ID</TableCell>
                                    <TableCell colSpan={5}>
                                        <TextField
                                            id="name-basic"
                                            label=""
                                            size="small"
                                            variant="outlined"
                                            name="name"
                                            onChange={(e) => this.setFilter(e.target.value, "userId")}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                    </Grid>

                </Grid>

                <div className="center">
                    <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        // startIcon={<SaveIcon color="white" size="1rem" />}
                        onClick={() => this.getData(1)}
                    >
                        검색
                    </Button>
                </div>
                <br/>
                <Grid container spacing={2} className="align-items-center">
                    <Grid item md={12} xs={12}>
                        <Table aria-label="simple table" className="mail_table">
                            <TableBody>
                                <TableRow>
                                    <TableCell>회원상태</TableCell>
                                    <TableCell>
                                        <Grid container spacing={1} className="align-items-center">
                                            <Grid item md={3} xs={3}>
                                                <h5>* 검색결과: <span className="color-red">{this.state.total}명</span></h5>
                                            </Grid>
                                            <Grid item md={9} xs={9}>
                                                <h5>총 회원수: <span className="color-red">0,000명</span></h5>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Table aria-label="simple table" className="mail_history_table_1">
                            <TableHead>
                                <TableRow>
                                    <TableCell>

                                    </TableCell>
                                    <TableCell>번호</TableCell>
                                    <TableCell>이름</TableCell>
                                    <TableCell>아이디</TableCell>
                                    <TableCell>회원등급</TableCell>
                                    <TableCell>가입일</TableCell>
                                    <TableCell>방문횟수</TableCell>
                                    <TableCell>주문총액</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    (this.state.mailList || []).map((mail, index) =>
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Radio
                                                    name="role"
                                                    checked={this.props.selectedSender === mail.sender}
                                                    onChange={() => this.props.selectSender(mail.sender)}
                                                    color="primary"
                                                />
                                            </TableCell>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{mail.marketTitle}</TableCell>
                                            <TableCell>{mail.sender}</TableCell>
                                            <TableCell>{mail.receiver}</TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>)
                                }


                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
                <div className="but-right">
                    <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        // startIcon={<SaveIcon color="white" size="1rem" />}
                        onClick={this.props.hideModalUser}
                    >
                        확인
                    </Button>
                </div>

                <Grid container className="mt-20">
                    <Grid item xs={12}>
                        <PaginationMaterial
                            count={Math.ceil(
                                this.state.total /
                                this.state.pagination.rowsPerPage
                            )}
                            page={this.state.pagination.pageNumber}
                            onChange={(e, page) => this.handlePageNumber(e, page)}
                            color="primary"
                        />
                    </Grid>
                </Grid>
            </div>

        );
    }
}

// Redux state to props
const mapStateToProps = (state) => {
    return {
        apolloClient: state.apolloClient,
    };
};

export default withSnackbar(connect(mapStateToProps, null)(SearchID));