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
                        menuName="운영자 관리"
                        title="운영자 관리"
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
                                    >운영자 등록</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Grid item md={12} xs={12} className="align-items-center">  
                            <Table className="member_table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="15%">검색어</TableCell>
                                        <TableCell colspan={3} className="align-items-center" width="85%">
                                            <Grid container md={10} xs={12} className="align-items-center">
                                                <Grid item md={3} xs={12} className="align-items-center">
                                                    <FormControl size="small" fullWidth variant="outlined">
                                                        <InputLabel>통합검색</InputLabel>
                                                        <Select>
                                                            <MenuItem value="1">아이디</MenuItem>
                                                            <MenuItem value="2">이름</MenuItem>
                                                            <MenuItem value="3">이메일</MenuItem>
                                                            <MenuItem value="4">닉네임</MenuItem>
                                                            <MenuItem value="5">전화번호</MenuItem>
                                                            <MenuItem value="6">휴대폰번호</MenuItem>
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
                                        <TableCell className="align-items-center text-center" width="15%">장기 미로그인</TableCell>
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
                                                        label="장기 미로그인 운영자 (설정된 장기 미로그인 기간 : 1년)"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="15%">SMS 자동발송 수신설정</TableCell>
                                        <TableCell colspan={3} className="align-items-center" width="85%">
                                            <Grid container md={10} xs={12} className="align-items-center">
                                                <Grid item md={1} xs={12}>
                                                    <RadioGroup>
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="전체"
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                                
                                                <Grid item md={2} xs={12}>
                                                    <RadioGroup>
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="SMS 수신 안함"
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                                
                                                <Grid item md={2} xs={12}>
                                                    <RadioGroup>
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="주문 배송 관련"
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
                                                                    label="회원 관련"
                                                                />
                                                            </RadioGroup>
                                                        </Grid>
                                                        
                                                        <Grid item md={4} xs={12}>
                                                            <RadioGroup>
                                                                <FormControlLabel
                                                                    value="true"
                                                                    control={<Radio />}
                                                                    label="프로모션 관련"
                                                                />
                                                            </RadioGroup>
                                                        </Grid>
                                                    
                                                        <Grid item md={4} xs={12}>
                                                            <RadioGroup>
                                                                <FormControlLabel
                                                                    value="true"
                                                                    control={<Radio />}
                                                                    label="프로모션 관련"
                                                                />
                                                            </RadioGroup>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="15%">직원여부</TableCell>
                                        <TableCell width="50%">
                                            <Grid container md={12} xs={12} className="align-items-center">
                                                <Grid item md={3} xs={12}>
                                                    <Grid container>
                                                        <Grid item md={6} xs={12}>
                                                            <RadioGroup>
                                                                <FormControlLabel
                                                                    value="true"
                                                                    control={<Radio />}
                                                                    label="전체"
                                                                />
                                                            </RadioGroup>
                                                        </Grid>
                                                        
                                                        <Grid item md={6} xs={12}>
                                                            <RadioGroup>
                                                                <FormControlLabel
                                                                    value="true"
                                                                    control={<Radio />}
                                                                    label="직원"
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
                                                            label="비정규직"
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                        
                                                <Grid item md={2} xs={12}>
                                                    <RadioGroup>
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="아르바이트"
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
                                                                    label="파견직"
                                                                />
                                                            </RadioGroup>
                                                        </Grid>
                                                        
                                                        <Grid item md={6} xs={12}>
                                                            <RadioGroup>
                                                                <FormControlLabel
                                                                    value="true"
                                                                    control={<Radio />}
                                                                    label="파견직"
                                                                />
                                                            </RadioGroup>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell className="align-items-center text-center" width="5%">부서</TableCell>
                                        <TableCell className="align-items-center text-center" width="30%"></TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="15%">직급</TableCell>
                                        <TableCell width="50%">
                                            <Grid container md={10} xs={12}>
                                                <Grid item md={5} xs={12} className="align-items-center">
                                                    <FormControl size="small" fullWidth variant="outlined">
                                                        <InputLabel>직급선택</InputLabel>
                                                        <Select>
                                                            <MenuItem value="1">회장</MenuItem>
                                                            <MenuItem value="2">사장</MenuItem>
                                                            <MenuItem value="3">대표</MenuItem>
                                                            <MenuItem value="4">전무</MenuItem>
                                                            <MenuItem value="5">상무</MenuItem>
                                                            <MenuItem value="6">이사</MenuItem>
                                                            <MenuItem value="7">부장</MenuItem>
                                                            <MenuItem value="8">차장</MenuItem>
                                                            <MenuItem value="9">과장</MenuItem> 
                                                            <MenuItem value="10">대리</MenuItem>
                                                            <MenuItem value="11">주임</MenuItem>
                                                            <MenuItem value="12">사원</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell className="align-items-center text-center" width="5%">직책</TableCell>
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
                                    <InputLabel>검색 <i style={{color: "#FF0000", fontStyle: "normal"}}><strong>1</strong></i> 개 / 전체 <i style={{color: "#FF0000", fontStyle: "normal"}}><strong>1</strong></i> 개 | 장기 미로그인 운영자 <i style={{color: "#FF0000", fontStyle: "normal"}}><strong>0</strong></i> 개</InputLabel>
                                </Grid>
                                <Grid item md={4} xs={12} className="align-items-center"></Grid>
                                <Grid item md={3} xs={12}>
                                    <Grid container>
                                        <Grid item md={6} xs={12} className="align-items-center">
                                            <FormControl size="small" fullWidth variant="outlined">
                                                <InputLabel>등록일 ↓</InputLabel>
                                                <Select>
                                                    <MenuItem value="1">등록일 ↓</MenuItem>
                                                    <MenuItem value="2">등록일 ↑</MenuItem>
                                                    <MenuItem value="3">최종 로그인 ↓</MenuItem>
                                                    <MenuItem value="4">최종 로그인 ↑</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={6} xs={12} className="align-items-center" style={{paddingLeft: "10px"}}>
                                            <FormControl size="small" fullWidth variant="outlined">
                                                <InputLabel>10개</InputLabel>
                                                <Select>
                                                    <MenuItem value="10">10개</MenuItem>
                                                    <MenuItem value="20">20개</MenuItem>
                                                    <MenuItem value="30">30개</MenuItem>
                                                    <MenuItem value="50">50개</MenuItem>
                                                    <MenuItem value="100">100개</MenuItem>
                                                    <MenuItem value="150">150개</MenuItem>
                                                    <MenuItem value="200">200개</MenuItem>
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
                                        <TableCell className="text-center" width="3%"><strong>선택</strong></TableCell>
                                        <TableCell className="text-center" width="3%"><strong>번호</strong></TableCell>
                                        <TableCell className="text-center"><strong>아이디</strong></TableCell>
                                        <TableCell className="text-center"><strong>이름</strong></TableCell>
                                        <TableCell className="text-center"><strong>담당자 정보</strong></TableCell>
                                        <TableCell className="text-center"><strong>직원/부서/직급/직책</strong></TableCell>
                                        <TableCell className="text-center"><strong>이메일</strong></TableCell>
                                        <TableCell className="text-center"><strong>휴대폰 번호</strong></TableCell>
                                        <TableCell className="text-center"><strong>등록일</strong></TableCell>
                                        <TableCell className="text-center"><strong>최종로그인</strong></TableCell>
                                        <TableCell className="text-center"><strong>정보수정</strong></TableCell>
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
                                        <TableCell className="text-center">홍길동</TableCell>
                                        <TableCell className="text-center">대표 운영자</TableCell>
                                        <TableCell className="text-center">직원/영업부/부장/매니저</TableCell>
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
                                                startIcon={<EditIcon/>}>수정</Button>
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
                                    style={{backgroundColor: "#FF0000", color: "#fff", fontStyle: "normal"}}>선택삭제</Button>
                            </Grid>
                            <Grid item md={4} xs={12} className="align-items-center" style={{paddingLeft: "10px"}}>
                                <Button
                                    fullWidth
                                    size="medium"
                                    variant="contained"     
                                    style={{border: "1px solid #cccbcb"}}>선택 로그인 제한처리</Button>
                            </Grid>
                        </Grid>
                        <Grid item md={7} xs={12} className="align-items-center"></Grid>
                    </Grid>

                    <Dialog open={this.state.isOpenModal} aria-labelledby="responsive-dialog-title" maxWidth="sm" fullWidth>
                        <DialogTitle id="responsive-dialog-title">
                            <h2>운영자 등록</h2>
                        </DialogTitle>
                        
                        <DialogContent>
                            <Grid spacing={2} container md={12} xs={12}> 
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell width="25%"><strong>아이디</strong></TableCell>
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
                                            <TableCell width="25%"><strong>비밀번호</strong></TableCell>
                                            <TableCell width="75%">
                                                <Grid container md={12} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        size="small"  
                                                        variant="outlined"
                                                        placeholder="8~16자의 영문 대소문자와 숫자, 특수문자 사용"
                                                    />
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                        
                                        <TableRow>
                                            <TableCell width="25%"><strong>이름</strong></TableCell>
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
                                            <TableCell width="25%"><strong>담당자 정보</strong></TableCell>
                                            <TableCell width="75%">
                                                <Grid container md={12} xs={12} className="align-items-center">
                                                    <FormControl size="small" fullWidth variant="outlined">
                                                        <InputLabel>담당자 정보 선택</InputLabel>
                                                        <Select>
                                                            <MenuItem value="1">대표 운영자</MenuItem>
                                                            <MenuItem value="2">정산담당자</MenuItem>
                                                            <MenuItem value="3">배송담당자</MenuItem>
                                                            <MenuItem value="4">주문담당자</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell width="25%"><strong>직원 여부</strong></TableCell>
                                            <TableCell width="75%">
                                                <Grid container md={12} xs={12} className="align-items-center">
                                                    <Grid item md={5} xs={12}>
                                                        <FormControl size="small" fullWidth variant="outlined">
                                                            <InputLabel>직원 여부 선택</InputLabel>
                                                            <Select>
                                                                <MenuItem value="1">직원</MenuItem>
                                                                <MenuItem value="2">비정규직</MenuItem>
                                                                <MenuItem value="3">아르바이트</MenuItem>
                                                                <MenuItem value="4">파견직</MenuItem>
                                                                <MenuItem value="5">퇴사자</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item md={2} xs={12} style={{paddingLeft: "5px", textAlign: "center"}}><strong>부서</strong></Grid>
                                                    <Grid item md={5} xs={12} style={{paddingLeft: "5px"}}>
                                                        <FormControl size="small" fullWidth variant="outlined">
                                                            <InputLabel>부서 선택</InputLabel>
                                                            <Select>
                                                                <MenuItem value="1">...</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell width="25%"><strong>직급</strong></TableCell>
                                            <TableCell width="75%">
                                                <Grid container md={12} xs={12} className="align-items-center">
                                                    <Grid item md={5} xs={12}>
                                                        <FormControl size="small" fullWidth variant="outlined">
                                                            <InputLabel>직급 산택</InputLabel>
                                                            <Select>
                                                                <MenuItem value="1">회장</MenuItem>
                                                                <MenuItem value="2">사장</MenuItem>
                                                                <MenuItem value="3">대표</MenuItem>
                                                                <MenuItem value="4">전무</MenuItem>
                                                                <MenuItem value="5">상무</MenuItem>
                                                                <MenuItem value="6">이사</MenuItem>
                                                                <MenuItem value="7">부장</MenuItem>
                                                                <MenuItem value="8">차장</MenuItem>
                                                                <MenuItem value="9">과장</MenuItem>
                                                                <MenuItem value="10">대리</MenuItem>
                                                                <MenuItem value="11">주임</MenuItem>
                                                                <MenuItem value="12">사원</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item md={2} xs={12} style={{paddingLeft: "5px", textAlign: "center"}}><strong>직책</strong></Grid>
                                                    <Grid item md={5} xs={12} style={{paddingLeft: "5px"}}>
                                                        <FormControl size="small" fullWidth variant="outlined">
                                                            <InputLabel>직책 선택</InputLabel>
                                                            <Select>
                                                                <MenuItem value="1">...</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell width="25%"><strong>이메일</strong></TableCell>
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
                                                        >{this.state.isChangeMail === false ? "인증번호 요청" : "인증번호 재요청"}</Button>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>

                                        {this.state.isChangeMail === true ? (
                                            <React.Fragment>
                                                <TableRow>
                                                    <TableCell width="25%"><strong>인증번호 입력</strong></TableCell>
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
                                                                >완료</Button>
                                                            </Grid>
                                                        </Grid>
                                                    </TableCell>
                                                </TableRow>
                                            </React.Fragment>) : null}

                                        <TableRow>
                                            <TableCell width="25%"><strong>휴대폰 번호</strong></TableCell>
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
                                                        >{this.state.isValidationCode === false ? "인증번호 요청" : "인증번호 재요청"}</Button>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>

                                        {this.state.isValidationCode === true ? (
                                            <React.Fragment>
                                                <TableRow>
                                                    <TableCell width="25%"><strong>인증번호 입력</strong></TableCell>
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
                                                                >완료</Button>
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
                            >저장</Button>
                            <Button
                                size="medium"
                                variant="outlined"
                                style={{backgroundColor: "#fff", color: "#000"}}
                                startIcon={<CancelIcon/>}
                                style={{marginLeft: "5px"}}
                                onClick={this.onCloseModal.bind(this)}
                            >취소</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={this.state.isOpenModal2} aria-labelledby="responsive-dialog-title" maxWidth="sm" fullWidth>
                        <DialogTitle id="responsive-dialog-title">
                            <h2>운영자 수정</h2>
                        </DialogTitle>
                        
                        <DialogContent>
                            <Grid spacing={2} container md={12} xs={12}> 
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell width="25%"><strong>아이디</strong></TableCell>
                                            <TableCell width="75%" style={{textAlign: "center"}}><strong>hink39</strong></TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell width="25%"><strong>비밀번호</strong></TableCell>
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
                                                        >비밀번호 변경</Button>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell width="25%"><strong>이름</strong></TableCell>
                                            <TableCell width="75%" style={{textAlign: "center"}}><strong>홍길동</strong></TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell width="25%"><strong>담당자 정보</strong></TableCell>
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
                                            <TableCell width="25%"><strong>직원 여부</strong></TableCell>
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
                                                    <Grid item md={2} xs={12} style={{paddingLeft: "5px", textAlign: "center"}}><strong>부서</strong></Grid>
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
                                            <TableCell width="25%"><strong>직급</strong></TableCell>
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
                                                    <Grid item md={2} xs={12} style={{paddingLeft: "5px", textAlign: "center"}}><strong>직책</strong></Grid>
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
                                            <TableCell width="25%"><strong>이메일</strong></TableCell>
                                            <TableCell width="75%">
                                                <Grid container md={12} xs={12}>
                                                    <Grid item md={5} xs={12} className="align-items-center text-center"><strong>hink39@gmail.com</strong></Grid>
                                                    <Grid item md={2} xs={12} className="align-items-center text-center" style={{paddingLeft: "5px"}}>
                                                        {this.state.isChangeMail === false ? (<InputLabel style={{color: '#33acff'}}>인증완료</InputLabel>) : (<InputLabel style={{color: '#ff0000'}}>인증필요</InputLabel>)}
                                                    </Grid>
                                                    <Grid item md={5} xs={12} className="align-items-center" style={{paddingLeft: "5px"}}>
                                                        <Button
                                                            fullWidth
                                                            size="medium"
                                                            variant="contained"
                                                            style={{backgroundColor: "#0ed297", color: "#fff"}}
                                                            onClick={this.onChangeMail.bind(this)}
                                                        >{this.state.isChangeMail === false ? "이메일 변경" : "인증번호 재요청"}</Button>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>

                                        {this.state.isChangeMail === true ? (
                                            <React.Fragment>
                                                <TableRow>
                                                    <TableCell width="25%"><strong>인증번호 입력</strong></TableCell>
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
                                                                >완료</Button>
                                                            </Grid>
                                                        </Grid>
                                                    </TableCell>
                                                </TableRow>
                                            </React.Fragment>) : null}

                                        <TableRow>
                                            <TableCell width="25%"><strong>휴대폰 번호</strong></TableCell>
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
                                                        <InputLabel style={{color: "#ff0000"}}>인증필요</InputLabel>
                                                    </Grid>
                                                    <Grid item md={4} xs={12} className="align-items-center" style={{paddingLeft: "5px"}}>
                                                        <Button
                                                            fullWidth
                                                            size="medium"
                                                            variant="contained"
                                                            style={{backgroundColor: "#0ed297", color: "#fff"}}
                                                        >인증번호 요청</Button>
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
                            >저장</Button>
                            <Button
                                size="medium"
                                variant="outlined"
                                style={{backgroundColor: "#fff", color: "#000"}}
                                startIcon={<CancelIcon/>}
                                style={{marginLeft: "5px"}}
                                onClick={this.onCloseModal2.bind(this)}
                            >취소</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={this.state.isOpenModal3} aria-labelledby="responsive-dialog-title" maxWidth="sm" fullWidth>
                        <DialogTitle id="responsive-dialog-title">
                            <h2>비밀번호 변경</h2>
                        </DialogTitle>
                        
                        <DialogContent>
                            <Grid spacing={2} container md={12} xs={12}> 
                                <Grid item md={3} xs={12} className="align-items-center">
                                    <h5>새 비밀번호</h5>
                                </Grid>
                                <Grid item md={9} xs={12} className="align-items-center">
                                    <TextField
                                        fullWidth
                                        size="small"  
                                        variant="outlined"
                                        placeholder="새 비밀번호"
                                    />
                                </Grid>
                            </Grid>

                            <Grid spacing={2} container md={12} xs={12}> 
                                <Grid item md={3} xs={12} className="align-items-center">
                                    <h5>새 비밀번호 확인</h5>
                                </Grid>
                                <Grid item md={9} xs={12} className="align-items-center">
                                    <TextField
                                        fullWidth
                                        size="small"  
                                        variant="outlined"
                                        placeholder="새 비밀번호 확인"
                                    />
                                </Grid>
                            </Grid>

                            <Grid spacing={2} container md={12} xs={12}> 
                                <Grid item md={12} xs={12} className="align-items-center">
                                    <InputLabel>8~16자의 영문 대소문자와 숫자, 특수문자 사용</InputLabel>
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
                            >저장</Button>
                            <Button
                                size="medium"
                                variant="outlined"
                                style={{backgroundColor: "#fff", color: "#000"}}
                                startIcon={<CancelIcon/>}
                                style={{marginLeft: "5px"}}
                                onClick={this.onCloseModal3.bind(this)}
                            >취소</Button>
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
