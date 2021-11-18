import React from "react";
import {
    Grid,
    CardContent,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Button,
    TextField,
    Dialog,
    DialogContent,
    DialogActions,
    Divider,
    FormControlLabel,
    Checkbox
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
        };
    
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onSecondModal = this.onSecondModal.bind(this);
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
                    <Grid item md={8} xs={12}><h5>품목정보</h5></Grid>
                    <Grid item md={8} xs={12}>
                        <Table className="mail_table">
                            <TableBody>
                                <TableRow>
                                    <TableCell width="5%"><strong>품목정보 템플릿 불러오기</strong></TableCell>
                                    <TableCell>
                                        <Grid container md={10} xs={12}> 
                                            <Grid item md={6} xs={12}>
                                                <FormControl size="small" fullWidth variant="outlined">
                                                    <InputLabel>품목정보 템플릿 선택</InputLabel>
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
                                                    템플릿 관리
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell width="5%"><strong>품목 선택하기</strong></TableCell>
                                    <TableCell>
                                        <Grid item md={5} xs={12}>
                                            <FormControl size="small" fullWidth variant="outlined">
                                                <InputLabel>품목선택</InputLabel>
                                                <Select>
                                                    <MenuItem value="1">의류</MenuItem>
                                                    <MenuItem value="2">구두/신발</MenuItem>
                                                    <MenuItem value="3">가방</MenuItem>
                                                    <MenuItem value="4">패션잡화(모자/벨트, 액세서리)</MenuItem>
                                                    <MenuItem value="5">침구류/커튼</MenuItem>
                                                    <MenuItem value="6">가구(침대/소파/싱크대/DIY제품)</MenuItem>
                                                    <MenuItem value="7">영상가전(TV류)</MenuItem>
                                                    <MenuItem value="8">가정용 전기제품(냉장고/세탁기/식기세척기/전자레인지)</MenuItem>
                                                    <MenuItem value="9">계절가전(에어컨/온풍기)</MenuItem>
                                                    <MenuItem value="10">사무용기기(컴퓨터/노트북/프린터)</MenuItem>
                                                    <MenuItem value="11">광학기기(디지털카메라/캠코더)</MenuItem>
                                                    <MenuItem value="12">소형전자(MP3/전자사전 등)</MenuItem>
                                                    <MenuItem value="13">휴대폰</MenuItem>
                                                    <MenuItem value="14">내비게이션</MenuItem>
                                                    <MenuItem value="15">자동차용품(자동차부품, 기타 자동차용품)</MenuItem>
                                                    <MenuItem value="16">의료기기</MenuItem>
                                                    <MenuItem value="17">주방용품</MenuItem>
                                                    <MenuItem value="18">화장품</MenuItem>
                                                    <MenuItem value="19">귀금속/보석/기계류</MenuItem>
                                                    <MenuItem value="20">식품(농수산물)</MenuItem>
                                                    <MenuItem value="21">가공식품</MenuItem>
                                                    <MenuItem value="22">건강기능식품</MenuItem>
                                                    <MenuItem value="23">영ㆍ유아용품</MenuItem>
                                                    <MenuItem value="24">악기</MenuItem>
                                                    <MenuItem value="25">스포츠용품</MenuItem>
                                                    <MenuItem value="26">서적</MenuItem>
                                                    <MenuItem value="27">호텔/펜션 예약</MenuItem>
                                                    <MenuItem value="28">여행패키지</MenuItem>
                                                    <MenuItem value="29">항공권</MenuItem>
                                                    <MenuItem value="30">자동차 대여 서비스(렌트카)</MenuItem>
                                                    <MenuItem value="31">물품대여 서비스(정수기, 비데, 공기청정기 등)</MenuItem>
                                                    <MenuItem value="32">물품대여 서비스(서적, 유아용품, 행사용품 등)</MenuItem>
                                                    <MenuItem value="33">디지털 콘텐츠(음원, 게임, 인터넷강의 등)</MenuItem>
                                                    <MenuItem value="34">기타</MenuItem>
                                                    <MenuItem value="35">모바일쿠폰</MenuItem>
                                                    <MenuItem value="36">기타용역</MenuItem>
                                                    <MenuItem value="37">영화/공연</MenuItem>
                                                    <MenuItem value="38">생활화학제품</MenuItem>
                                                    <MenuItem value="39">살생물제품</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>        
                    </Grid>

                    <Grid item md={8} xs={12}><h5>인증정보</h5></Grid>
                    <Grid item md={12} xs={12}>
                        <Table className="order_table">
                            <TableBody>
                                <TableRow>
                                    <TableCell className="text-center" width="15%"><strong>인증항목</strong></TableCell>
                                    <TableCell className="text-center" width="15%"><strong>기관명</strong></TableCell>
                                    <TableCell className="text-center" width="15%"><strong>인증번호</strong></TableCell>
                                    <TableCell className="text-center" width="15%"><strong>신고번호</strong></TableCell>
                                    <TableCell className="text-center" width="25%"><strong>첨부파일</strong></TableCell>
                                    <TableCell className="text-center" width="15%"><strong>관리</strong></TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <Grid item md={12} xs={12}>
                                            <FormControl size="small" fullWidth variant="outlined">
                                                <InputLabel>선택</InputLabel>
                                                <Select>
                                                    <MenuItem value="1">인증정보 선택</MenuItem>
                                                    <MenuItem value="2">[공산품]안전인증</MenuItem>
                                                    <MenuItem value="3">[공산품]자율안전확인</MenuItem>
                                                    <MenuItem value="4">[공산품]안전/품질표시</MenuItem>
                                                    <MenuItem value="5">[공산품]어린이보호포장</MenuItem>
                                                    <MenuItem value="6">[전기용품]안전인증</MenuItem>
                                                    <MenuItem value="7">[전기용품]안전확인</MenuItem>
                                                    <MenuItem value="8">[전기용품]공급자 적합성확인</MenuItem>
                                                    <MenuItem value="9">[방송통신기자재]적합성평가</MenuItem>
                                                    <MenuItem value="10">[어린이제품]안전인증</MenuItem>
                                                    <MenuItem value="11">[어린이제품]공급자 적합성확인</MenuItem>
                                                    <MenuItem value="12">[어린이제품]안전확인</MenuItem>
                                                    <MenuItem value="13">수입신고필증</MenuItem>
                                                    <MenuItem value="14">식품</MenuItem>
                                                    <MenuItem value="15">농산물</MenuItem>
                                                    <MenuItem value="16">축산물</MenuItem>
                                                    <MenuItem value="17">수산물</MenuItem>
                                                    <MenuItem value="18">화장품</MenuItem>
                                                    <MenuItem value="19">식품 제조/가공업</MenuItem>
                                                    <MenuItem value="20">의료기기</MenuItem>
                                                    <MenuItem value="21">건강기능식품</MenuItem>
                                                    <MenuItem value="22">위해우려제품 자가검사번호</MenuItem>
                                                    <MenuItem value="23">기타사항</MenuItem>
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
                                                    파일 찾기
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
                                                    추가
                                                </Button>
                                            </Grid>
                                            <Grid item md={6} xs={12}>  
                                                <Button
                                                    size="medium"
                                                    variant="contained"
                                                    style={{backgroundColor: "#ff0000", color: "#fff"}}
                                                    startIcon={<DeleteIcon/>}
                                                >
                                                    삭제
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
                            >저장</Button>
                        </Grid>
                        <Grid item md={6} xs={12} className="text-left">
                            <Button
                                size="medium"
                                variant="outlined"
                                style={{backgroundColor: "#fff", color: "#000"}}
                                startIcon={<CancelIcon/>}
                                style={{marginLeft: "5px"}}
                            >취소</Button>
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
                                                <TableCell className="text-center" width="15%"><InputLabel>품목선택</InputLabel></TableCell>
                                                <TableCell width="30%">
                                                    <Grid item md={12} xs={12}>
                                                        <FormControl size="small" fullWidth variant="outlined">
                                                            <InputLabel>선택</InputLabel>
                                                            <Select>
                                                                <MenuItem value="1">인증정보 선택</MenuItem>
                                                                <MenuItem value="2">[공산품]안전인증</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </TableCell>
                                                <TableCell className="text-center" width="20%"><InputLabel>템플릿명 검색</InputLabel></TableCell>
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
                                                            <Button size="medium" variant="contained" color="primary">검색</Button>
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
                                    <Button size="medium" variant="contained" color="primary" startIcon={<AddIcon/>} onClick={this.onSecondModal.bind(this)}>신규등록</Button>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} className="align-items-center mt-20">
                                <Grid item md={12} xs={12}>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="text-center"><strong>선택</strong></TableCell>
                                                <TableCell className="text-center"><strong>템플릿 명</strong></TableCell>
                                                <TableCell className="text-center"><strong>품목</strong></TableCell>
                                                <TableCell className="text-center"><strong>관리</strong></TableCell>
                                                <TableCell className="text-center"><strong>최종수정자</strong></TableCell>
                                                <TableCell className="text-center"><strong>최종수정일</strong></TableCell>
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
                                                <TableCell className="text-center">가공식품</TableCell>
                                                <TableCell className="text-center">식품(농수산물)</TableCell>
                                                <TableCell className="text-center"><Button size="medium" variant="contained" color="primary" startIcon={<EditIcon/>} onClick={this.onSecondModal.bind(this)}>수정</Button></TableCell>
                                                <TableCell className="text-center">홍길동</TableCell>
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
                                                <TableCell className="text-center">농수산물</TableCell>
                                                <TableCell className="text-center">가공식품</TableCell>
                                                <TableCell className="text-center"><Button size="medium" variant="contained" color="primary" startIcon={<EditIcon/>} onClick={this.onSecondModal.bind(this)}>수정</Button></TableCell>
                                                <TableCell className="text-center">홍길동</TableCell>
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
                                                <TableCell className="text-center">농수산물</TableCell>
                                                <TableCell className="text-center">기타</TableCell>
                                                <TableCell className="text-center"><Button size="medium" variant="contained" color="primary" startIcon={<EditIcon/>} onClick={this.onSecondModal.bind(this)}>수정</Button></TableCell>
                                                <TableCell className="text-center">김철수</TableCell>
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
                                                        일괄삭제
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
                            닫기
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={this.state.isSecondModal}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth="lg">
                    <DialogContent>
                        <form id="product-form">
                            <Grid container spacing={3} className="align-items-center">
                                <Grid item md={12} xs={12}>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell style={{textAlign: "right"}} width="35%"><strong>템플릿명</strong></TableCell>
                                                <TableCell className="text-center">
                                                    <Grid container md={12} xs={12}>
                                                        <Grid item md={7} xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                            />
                                                        </Grid>
                                                        <Grid item md={5} xs={12}>
                                                            <Button fullwidth size="medium" variant="contained" color="primary">템플릿 관리</Button>
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                            
                                            <TableRow>
                                                <TableCell style={{textAlign: "right"}} width="35%"><strong>품목 정보</strong></TableCell>
                                                <TableCell className="text-center">
                                                    <Grid container md={12} xs={12}>
                                                        <FormControl size="small" fullWidth variant="outlined">
                                                            <InputLabel>가공식품</InputLabel>
                                                            <Select>
                                                                <MenuItem value="1">의류</MenuItem>
                                                                <MenuItem value="2">구두/신발</MenuItem>
                                                                <MenuItem value="3">가방</MenuItem>
                                                                <MenuItem value="4">패션잡화(모자/벨트, 액세서리)</MenuItem>
                                                                <MenuItem value="5">침구류/커튼</MenuItem>
                                                                <MenuItem value="6">가구(침대/소파/싱크대/DIY제품)</MenuItem>
                                                                <MenuItem value="7">영상가전(TV류)</MenuItem>
                                                                <MenuItem value="8">가정용 전기제품(냉장고/세탁기/식기세척기/전자레인지)</MenuItem>
                                                                <MenuItem value="9">계절가전(에어컨/온풍기)</MenuItem>
                                                                <MenuItem value="10">사무용기기(컴퓨터/노트북/프린터)</MenuItem>
                                                                <MenuItem value="11">광학기기(디지털카메라/캠코더)</MenuItem>
                                                                <MenuItem value="12">소형전자(MP3/전자사전 등)</MenuItem>
                                                                <MenuItem value="13">휴대폰</MenuItem>
                                                                <MenuItem value="14">내비게이션</MenuItem>
                                                                <MenuItem value="15">자동차용품(자동차부품, 기타 자동차용품)</MenuItem>
                                                                <MenuItem value="16">의료기기</MenuItem>
                                                                <MenuItem value="17">주방용품</MenuItem>
                                                                <MenuItem value="18">화장품</MenuItem>
                                                                <MenuItem value="19">귀금속/보석/기계류</MenuItem>
                                                                <MenuItem value="20">식품(농수산물)</MenuItem>
                                                                <MenuItem value="21">가공식품</MenuItem>
                                                                <MenuItem value="22">건강기능식품</MenuItem>
                                                                <MenuItem value="23">영유아용품</MenuItem>
                                                                <MenuItem value="24">악기</MenuItem>
                                                                <MenuItem value="25">스포츠용품</MenuItem>
                                                                <MenuItem value="26">서적</MenuItem>
                                                                <MenuItem value="27">호텔/펜션 예약</MenuItem>
                                                                <MenuItem value="28">여행패키지</MenuItem>
                                                                <MenuItem value="29">항공권</MenuItem>
                                                                <MenuItem value="30">자동차 대여 서비스(렌트카)</MenuItem>
                                                                <MenuItem value="31">물품대여 서비스(정수기, 비데, 공기청정기 등)</MenuItem>
                                                                <MenuItem value="32">물품대여 서비스(서적, 유아용품, 행사용품 등)</MenuItem>
                                                                <MenuItem value="33">디지털 콘텐츠(음원, 게임, 인터넷강의 등)</MenuItem>
                                                                <MenuItem value="34">기타</MenuItem>
                                                                <MenuItem value="35">모바일쿠폰</MenuItem>
                                                                <MenuItem value="36">기타용역</MenuItem>
                                                                <MenuItem value="37">영화/공연</MenuItem>
                                                                <MenuItem value="38">생활화학제품</MenuItem>
                                                                <MenuItem value="39">살생물제품</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell className="text-left" colspan={2}>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                color="primary"
                                                                value={true}
                                                            />
                                                        }
                                                        label="“상품상세참조”로 전체변경"
                                                    />
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 식품의 유형</strong></TableCell>
                                                <TableCell className="text-center">
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 생산자 및 소재지</strong></TableCell>
                                                <TableCell className="text-center">
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 제조년월일(포장일 or 생산연도)</strong></TableCell>
                                                <TableCell className="text-center">
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) 용량(중량), 수량</strong></TableCell>
                                                <TableCell className="text-center">
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 원재료명 및 함량</strong></TableCell>
                                                <TableCell className="text-center">
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) 영양성분 표시 대상 여부</strong></TableCell>
                                                <TableCell className="text-center">
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) 유전자변형건강기능식품 여부</strong></TableCell>
                                                <TableCell className="text-center">
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) 표시광고 사전심의 필</strong></TableCell>
                                                <TableCell className="text-center">
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) 수입식품 여부</strong></TableCell>
                                                <TableCell className="text-center">
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) 소비자상담 관련 전화번호</strong></TableCell>
                                                <TableCell className="text-center">
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell style={{textAlign: "right"}} width="35%"><strong>(11) 소비자안전을 위한 주의사항</strong></TableCell>
                                                <TableCell className="text-center">
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell style={{textAlign: "right"}} width="35%"><strong>(12) 제품명</strong></TableCell>
                                                <TableCell className="text-center">
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell style={{textAlign: "right"}} width="35%"><strong>최종 수정일</strong></TableCell>
                                                <TableCell><InputLabel>2020-12-31</InputLabel></TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell style={{textAlign: "right"}} width="35%"><strong>최종 수정인</strong></TableCell>
                                                <TableCell><InputLabel>홍길동</InputLabel></TableCell>
                                            </TableRow>
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
                        >저장</Button>
                        <Button
                            size="medium"
                            variant="outlined"
                            style={{backgroundColor: "#fff", color: "#000"}}
                            startIcon={<CancelIcon/>}
                            style={{marginLeft: "5px"}}
                            onClick={this.onCloseSecondModal.bind(this)}
                        >취소</Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        );
    }
}

export default Confirmation;
