import React from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PageTitle from "../../core/common/Partials/PageTitle";
import PaginationMaterial from "@material-ui/lab/Pagination";
import { Grid, TextField, Button, FormControl, Select, MenuItem, InputLabel, Table, TableBody, TableRow, TableCell, FormControlLabel, Link,
        Dialog, DialogTitle, DialogContent, DialogActions, RadioGroup, Radio, Checkbox} from "@material-ui/core";
import SubjectIcon from '@material-ui/icons/Subject';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import AlertIcon from '@material-ui/icons/AddAlert';
import SMSIcon from '@material-ui/icons/Message';
import MailIcon from '@material-ui/icons/Mail';
import DownloadIcon from '@material-ui/icons/CloudDownload';

class UserList extends React.Component {
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

    render() {
        return (
            <React.Fragment>
                <Grid container>
                    <Grid item>
                        <PageTitle
                        menuName="회원리스트"
                        title="회원리스트"
                        icon={<SubjectIcon />}
                        />
                    </Grid>
                </Grid> 
                
                <div className="card mt-20">
                    <Grid container spacing={3} md={12} xs={12} className="text-right">
                        <Grid item md={2} xs={12} className="align-items-center text-center" style={{marginLeft: "auto"}}>
                            <Button
                                fullWidth
                                size="medium"
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon/>}
                                onClick={this.onOpenModal.bind(this)}
                            >새 회원 추가</Button>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Grid item md={12} xs={12} className="align-items-center">  
                            <Table className="member_table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="10%">검색어</TableCell>
                                        <TableCell colspan={3}>
                                            <Grid container md={8} xs={12} className="align-items-center">
                                                <Grid item md={8} xs={12} className="align-items-center">
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
                                        <TableCell className="align-items-center text-center" width="10%">회원등급</TableCell>
                                        <TableCell width="20%">
                                            <Grid container md={12} xs={12} className="align-items-center">
                                                <Grid item md={4} xs={12}>
                                                    <RadioGroup aria-label="noticeType" name="noticeType">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label=""
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                                
                                                <Grid item md={4} xs={12}>
                                                    <RadioGroup aria-label="noticeType" name="noticeType">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label=""
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                                
                                                <Grid item md={4} xs={12}>
                                                    <RadioGroup aria-label="noticeType" name="noticeType">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label=""
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell className="align-items-center text-center" width="10%">회원가입일</TableCell>
                                        <TableCell width="60%">
                                            <Grid container md={12} xs={12} className="align-items-center">
                                                <Grid container md={5} xs={12} style={{paddingLeft: "5px"}}>
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
                                                <Grid container md={6} xs={12} className="align-items-center">
                                                    <Grid item md={2} xs={12}>
                                                        <Button
                                                            fullWidth
                                                            size="medium"
                                                            variant="contained"
                                                            color="primary"
                                                        >전체
                                                        </Button>
                                                    </Grid>
                                                    <Grid item md={2} xs={12} style={{paddingLeft: "5px"}}>
                                                        <Button
                                                            fullWidth
                                                            size="medium"
                                                            variant="contained"
                                                            style={{border: "1px solid #cccbcb"}}
                                                        >오늘
                                                        </Button>
                                                    </Grid>
                                                    <Grid item md={2} xs={12} style={{paddingLeft: "5px"}}>
                                                        <Button
                                                            fullWidth
                                                            size="medium"
                                                            variant="contained"
                                                            style={{border: "1px solid #cccbcb"}}
                                                        >7일</Button>
                                                    </Grid>
                                                    <Grid item md={3} xs={12} style={{paddingLeft: "5px"}}>
                                                        <Button
                                                            fullWidth
                                                            size="medium"
                                                            variant="contained"
                                                            style={{border: "1px solid #cccbcb"}}
                                                        >1개월</Button>
                                                    </Grid>
                                                    <Grid item md={3} xs={12} style={{paddingLeft: "5px"}}>
                                                        <Button
                                                            fullWidth
                                                            size="medium"
                                                            variant="contained"
                                                            style={{border: "1px solid #cccbcb"}}
                                                        >3개월</Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="10%">가입승인</TableCell>
                                        <TableCell width="20%">
                                            <Grid container md={12} xs={12} className="align-items-center">
                                                <Grid item md={4} xs={12}>
                                                    <RadioGroup aria-label="noticeType" name="noticeType">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="전체"
                                                            checked={true}
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                                
                                                <Grid item md={4} xs={12}>
                                                    <RadioGroup aria-label="noticeType" name="noticeType">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="승인"
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                                
                                                <Grid item md={4} xs={12}>
                                                    <RadioGroup aria-label="noticeType" name="noticeType">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="미승인"
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell className="align-items-center text-center" width="10%">회원 구분</TableCell>
                                        <TableCell width="60%">
                                            <Grid container md={12} xs={12} className="align-items-center">
                                                <Grid item md={2} xs={12}>
                                                    <RadioGroup aria-label="noticeType" name="noticeType">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="전체"
                                                            checked={true}
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                                
                                                <Grid item md={2} xs={12}>
                                                    <RadioGroup aria-label="noticeType" name="noticeType">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="개인회원"
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                                
                                                <Grid item md={2} xs={12}>
                                                    <RadioGroup aria-label="noticeType" name="noticeType">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="사업자회원"
                                                        />
                                                    </RadioGroup>
                                                </Grid>

                                                <Grid item md={3} xs={12}></Grid>

                                                <Grid item md={2} xs={12} className="align-items-center">
                                                    <Button
                                                        fullWidth
                                                        size="medium"
                                                        variant="contained"     
                                                        color="primary"
                                                        startIcon={<SearchIcon/>}>검색</Button>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                    
                    <Grid container spacing={3} md={12} xs={12} style={{marginTop: "15px"}} className="mt-20">
                        <Grid item md={12} xs={12} className="align-items-center">
                            <Grid container>
                                <Grid item md={2} xs={12} className="align-items-center">
                                    <InputLabel>총 <i style={{color: "#FF0000", fontStyle: "normal"}}><strong>456</strong></i> 명</InputLabel>
                                </Grid>
                                <Grid item md={3} xs={12} className="align-items-center"></Grid>
                                <Grid item md={2} xs={12} className="align-items-center" style={{paddingLeft: "10px"}}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained" 
                                        style={{border: "1px solid #ff0000", color: "#ff0000"}}
                                        startIcon={<CancelIcon/>}>선택 탈퇴처리</Button>
                                </Grid>
                                <Grid item md={2} xs={12} className="align-items-center">
                                    <FormControl size="small" fullWidth variant="outlined" style={{paddingLeft: "10px"}}>
                                        <InputLabel>회원가입일</InputLabel>
                                        <Select>
                                            <MenuItem value="1">회원가입일</MenuItem>
                                            <MenuItem value="2">아이디 순</MenuItem>
                                            <MenuItem value="3">이름 순</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={2} xs={12} className="align-items-center" style={{paddingLeft: "10px"}}>
                                    <FormControl size="small" fullWidth variant="outlined">
                                        <InputLabel>50개씩 보기</InputLabel>
                                        <Select>
                                            <MenuItem value="10">10개씩 보기</MenuItem>
                                            <MenuItem value="30">30개씩 보기</MenuItem>
                                            <MenuItem value="50">50개씩 보기</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={1} xs={12} className="align-items-center" style={{paddingLeft: "10px"}}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained" 
                                        style={{border: "1px solid #0eb906", color: "#0eb906"}}
                                        startIcon={<DownloadIcon/>}>엑셀다운</Button>
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
                                        <TableCell className="text-center"><strong>등급</strong></TableCell>
                                        <TableCell className="text-center"><strong>포인트</strong></TableCell>
                                        <TableCell className="text-center"><strong>총상품주문건수</strong></TableCell>
                                        <TableCell className="text-center"><strong>종주문금액</strong></TableCell>
                                        <TableCell className="text-center"><strong>회원가입일</strong></TableCell>
                                        <TableCell className="text-center"><strong>최종로그인</strong></TableCell>
                                        <TableCell className="text-center"><strong>휴면해제일</strong></TableCell>
                                        <TableCell className="text-center"><strong>카카오 알림톡</strong></TableCell>
                                        <TableCell className="text-center"><strong>휴대폰 발송</strong></TableCell>
                                        <TableCell className="text-center"><strong>메일 발송</strong></TableCell>
                                        <TableCell className="text-center" width="3%"><strong>비고</strong></TableCell>
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
                                        <TableCell className="text-center">00001</TableCell>
                                        <TableCell className="text-center">hwang1401</TableCell>
                                        <TableCell className="text-center">홍길동</TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center">15</TableCell>
                                        <TableCell className="text-center">123,000원</TableCell>
                                        <TableCell className="text-center">2019.11.01 12:00:13</TableCell>
                                        <TableCell className="text-center">2021.11.12 12:10:13</TableCell>
                                        <TableCell className="text-center">2021.11.12</TableCell>
                                        <TableCell className="text-center">
                                            hink39@gmail.com
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"    
                                                style={{border: "1px solid #0eb906", color: "#0eb906", marginTop: "10px"}}
                                                onClick={this.onOpenModal.bind(this)}
                                                startIcon={<AlertIcon/>}>발송</Button>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            010-1234-5678
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"   
                                                color="primary"
                                                style={{marginTop: "10px"}}
                                                onClick={this.onOpenModal.bind(this)}
                                                startIcon={<SMSIcon/>}>SMS</Button>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            hink39@gmail.com
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"  
                                                style={{ border: "1px solid #cccbcb", marginTop: "10px"}}
                                                onClick={this.onOpenModal.bind(this)}
                                                startIcon={<MailIcon/>}>E-mail</Button>
                                        </TableCell>
                                        <TableCell className="text-center"></TableCell>
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
                                        <TableCell className="text-center">00001</TableCell>
                                        <TableCell className="text-center">hwang1401</TableCell>
                                        <TableCell className="text-center">홍길동</TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center">15</TableCell>
                                        <TableCell className="text-center">123,000원</TableCell>
                                        <TableCell className="text-center">2019.11.01 12:00:13</TableCell>
                                        <TableCell className="text-center">2021.11.12 12:10:13</TableCell>
                                        <TableCell className="text-center">2021.11.12</TableCell>
                                        <TableCell className="text-center">
                                            hink39@gmail.com
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"    
                                                style={{border: "1px solid #0eb906", color: "#0eb906", marginTop: "10px"}}
                                                onClick={this.onOpenModal.bind(this)}
                                                startIcon={<AlertIcon/>}>발송</Button>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            010-1234-5678
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"   
                                                color="primary"
                                                style={{marginTop: "10px"}}
                                                onClick={this.onOpenModal.bind(this)}
                                                startIcon={<SMSIcon/>}>SMS</Button>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            hink39@gmail.com
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"  
                                                style={{ border: "1px solid #cccbcb", marginTop: "10px"}}
                                                onClick={this.onOpenModal.bind(this)}
                                                startIcon={<MailIcon/>}>E-mail</Button>
                                        </TableCell>
                                        <TableCell className="text-center"></TableCell>
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
                                        <TableCell className="text-center">00001</TableCell>
                                        <TableCell className="text-center">hwang1401</TableCell>
                                        <TableCell className="text-center">홍길동</TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center">15</TableCell>
                                        <TableCell className="text-center">123,000원</TableCell>
                                        <TableCell className="text-center">2019.11.01 12:00:13</TableCell>
                                        <TableCell className="text-center">2021.11.12 12:10:13</TableCell>
                                        <TableCell className="text-center">2021.11.12</TableCell>
                                        <TableCell className="text-center">
                                            hink39@gmail.com
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"    
                                                style={{border: "1px solid #0eb906", color: "#0eb906", marginTop: "10px"}}
                                                onClick={this.onOpenModal.bind(this)}
                                                startIcon={<AlertIcon/>}>발송</Button>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            010-1234-5678
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"   
                                                color="primary"
                                                style={{marginTop: "10px"}}
                                                onClick={this.onOpenModal.bind(this)}
                                                startIcon={<SMSIcon/>}>SMS</Button>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            hink39@gmail.com
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"  
                                                style={{ border: "1px solid #cccbcb", marginTop: "10px"}}
                                                onClick={this.onOpenModal.bind(this)}
                                                startIcon={<MailIcon/>}>E-mail</Button>
                                        </TableCell>
                                        <TableCell className="text-center"></TableCell>
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
                                        <TableCell className="text-center">00001</TableCell>
                                        <TableCell className="text-center">hwang1401</TableCell>
                                        <TableCell className="text-center">홍길동</TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center">15</TableCell>
                                        <TableCell className="text-center">123,000원</TableCell>
                                        <TableCell className="text-center">2019.11.01 12:00:13</TableCell>
                                        <TableCell className="text-center">2021.11.12 12:10:13</TableCell>
                                        <TableCell className="text-center">2021.11.12</TableCell>
                                        <TableCell className="text-center">
                                            hink39@gmail.com
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"    
                                                style={{border: "1px solid #0eb906", color: "#0eb906", marginTop: "10px"}}
                                                onClick={this.onOpenModal.bind(this)}
                                                startIcon={<AlertIcon/>}>발송</Button>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            010-1234-5678
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"   
                                                color="primary"
                                                style={{marginTop: "10px"}}
                                                onClick={this.onOpenModal.bind(this)}
                                                startIcon={<SMSIcon/>}>SMS</Button>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            hink39@gmail.com
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"  
                                                style={{ border: "1px solid #cccbcb", marginTop: "10px"}}
                                                onClick={this.onOpenModal.bind(this)}
                                                startIcon={<MailIcon/>}>E-mail</Button>
                                        </TableCell>
                                        <TableCell className="text-center"></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Grid item md={12} xs={12} className="align-items-center text-center">
                            <PaginationMaterial count={10} color="primary" />
                        </Grid>
                    </Grid>

                    <Dialog open={this.state.isOpenModal} aria-labelledby="responsive-dialog-title" maxWidth="sm" fullWidth>
                        <DialogTitle id="responsive-dialog-title">
                            <h2>새 회원 추가</h2>
                        </DialogTitle>
                        
                        <DialogContent>
                            {/*
                            <Grid spacing={2} container md={12} xs={12}> 
                                <Grid item md={3} xs={12} className="align-items-center">
                                    <h5>아이디</h5>
                                </Grid>
                                <Grid item md={9} xs={12} className="align-items-center">
                                    <FormControl
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                    >
                                        <InputLabel>아이디</InputLabel>
                                        <Select>
                                            <MenuItem value="">...</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid spacing={2} container md={12} xs={12} className="mt-12"> 
                                <Grid item md={3} xs={12} className="align-items-center">
                                    <h5>분류(이름)</h5>
                                </Grid>
                                <Grid item md={9} xs={12} className="align-items-center">
                                    <FormControl
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                    >
                                        <InputLabel>분류(이름)</InputLabel>
                                        <Select>
                                            <MenuItem value="">...</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid spacing={2} container md={12} xs={12} className="mt-12"> 
                                <Grid item md={3} xs={12} className="align-items-center">
                                    <h5>구분</h5>
                                </Grid>
                                <Grid item md={9} xs={12} className="align-items-center">
                                    <FormControl
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                    >
                                        <InputLabel>고객용/ 마트용</InputLabel>
                                        <Select>
                                            <MenuItem value="">...</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid spacing={2} container md={12} xs={12} className="mt-12"> 
                                <Grid item md={3} xs={12} className="align-items-center">
                                    <h5>유형</h5>
                                </Grid>
                                <Grid item md={9} xs={12} className="align-items-center">
                                    <FormControl
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                    >
                                        <InputLabel>유형</InputLabel>
                                        <Select>
                                            <MenuItem value="">...</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} md={12} xs={12} className="mt-12">
                                <Grid item md={3} xs={12} className="align-items-center">
                                    <h5>내용</h5>
                                </Grid>
                                <Grid item md={9} xs={12} className="align-items-center mt-12">
                                    <TextareaAutosize minRows={15} style={{width: "100%", borderRadius: "5px"}} placeholder="내용" />
                                </Grid>
                            </Grid> */}
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

export default withSnackbar(connect(mapStateToProps, null)(UserList));
