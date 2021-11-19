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

                <Dialog open={this.state.isSecondModal} maxWidth="sm" fullWidth>
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
                                                        <Grid item md={5} xs={12} style={{paddingLeft: "10px"}}>
                                                            <Button fullWidth size="medium" variant="contained" color="primary">템플릿 관리</Button>
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
                                                            <Select onChange={this.onChangeFoodProcessedStatus}>
                                                                <MenuItem value={1}>의류</MenuItem>
                                                                <MenuItem value={2}>구두/신발</MenuItem>        
                                                                <MenuItem value={3}>가방</MenuItem>
                                                                <MenuItem value={4}>패션잡화(모자/벨트/액세서리)</MenuItem>
                                                                <MenuItem value={5}>침구류/커튼</MenuItem>
                                                                <MenuItem value={6}>가구(침대/소파/싱크대/DIY제품)</MenuItem>
                                                                <MenuItem value={7}>영상가전(TV류)</MenuItem>
                                                                <MenuItem value={8}>가정용 전기제품(냉장고/세탁기/식기세척기/전자레인지)</MenuItem>
                                                                <MenuItem value={9}>계절가전(에어컨/온풍기)</MenuItem>
                                                                <MenuItem value={10}>사무용기기(컴퓨터/노트북/프린터)</MenuItem>
                                                                <MenuItem value={11}>광학기기(디지털카메라/캠코더)</MenuItem>
                                                                <MenuItem value={12}>소형전자(MP3/전자사전 등)</MenuItem>
                                                                <MenuItem value={13}>휴대폰</MenuItem>
                                                                <MenuItem value={14}>내비게이션</MenuItem>
                                                                <MenuItem value={15}>자동차용품(자동차부품,기타 자동차용품)</MenuItem>
                                                                <MenuItem value={16}>의료기기</MenuItem>
                                                                <MenuItem value={17}>주방용품</MenuItem>
                                                                <MenuItem value={18}>화장품</MenuItem>
                                                                <MenuItem value={19}>귀금속/보석/시계류</MenuItem>
                                                                <MenuItem value={20}>식품(농수산물)</MenuItem>
                                                                <MenuItem value={21}>가공식품</MenuItem>
                                                                <MenuItem value={22}>건강기능식품</MenuItem>
                                                                <MenuItem value={23}>영유아용품</MenuItem>
                                                                <MenuItem value={24}>악기</MenuItem>
                                                                <MenuItem value={25}>스포츠용품</MenuItem>
                                                                <MenuItem value={26}>서적</MenuItem>
                                                                <MenuItem value={27}>호텔/펜션 예약</MenuItem>
                                                                <MenuItem value={28}>여행패키지</MenuItem>
                                                                <MenuItem value={29}>항공권</MenuItem>
                                                                <MenuItem value={30}>자동차 대여 서비스(렌터카)</MenuItem>
                                                                <MenuItem value={31}>물품대여 서비스(정수기,비데,공기청정기 등)</MenuItem>
                                                                <MenuItem value={32}>물품대여 서비스(서적,유아용품,행사용품 등)</MenuItem>
                                                                <MenuItem value={33}>디지털 콘텐츠(음원,게임,인터넷강의 등)</MenuItem>
                                                                <MenuItem value={34}>상품권/쿠폰</MenuItem>
                                                                <MenuItem value={35}>기타</MenuItem>
                                                                <MenuItem value={36}>모바일쿠폰</MenuItem>
                                                                <MenuItem value={37}>기타용역</MenuItem>
                                                                <MenuItem value={38}>영화/공연</MenuItem>
                                                                <MenuItem value={39}>생활화학제품</MenuItem>
                                                                <MenuItem value={40}>살생물제폼</MenuItem>
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
                                                                label="“상품상세참조”로 전체변경"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 제품 소재</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 섬유의 조성 또는 혼용률 백분율로 표시</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 색상</strong></TableCell>
                                                        <TableCell className="text-center">
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 치수</strong></TableCell>
                                                        <TableCell className="text-center">
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4)  제조사, 수입품의 경우<br/>수입자를 함께 표기</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 수입품의 경우 수입자 표기(병행수입의 경우 병행수입 여부로 대체)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 제조국</strong></TableCell>
                                                        <TableCell className="text-center">
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) 세탁방법 및 취급시 <br/>주의사항</strong></TableCell>
                                                        <TableCell className="text-center">
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) 제조년월</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* ex 201211</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) 품질보증기준</strong></TableCell>
                                                        <TableCell className="text-center">
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) A/S 책임자와 전화번호</strong></TableCell>
                                                        <TableCell className="text-center">
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>최종 수정일</strong></TableCell>
                                                        <TableCell><InputLabel>2021-10-10</InputLabel></TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>최종 수정인</strong></TableCell>
                                                        <TableCell><InputLabel>홍길동</InputLabel></TableCell>
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
                                                                label="“상품상세참조”로 전체변경"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 제품 소재</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 운동화인 경우에는 겉감, 안감을 구분하여 표시</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 색상</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 치수</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '발길이##굽높이' 형식으로 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4)  제조사, 수입품의 경우<br/>수입자를 함께 표기</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 수입품의 경우 수입자 표기(병행수입의 경우 병행수입 여부로 대체)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 제조국</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 제조국은 법률상 중요정보이니 정확히 입력</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) 취급시 주의사항</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) 품질보증기준</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) A/S 책임자와 전화번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
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
                                                                label="“상품상세참조”로 전체변경"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 종류</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 소재</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 색상</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) 크기</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '가로##세로##높이' 형식으로 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 제조자, 수입품의 경우<br/>수입자를 함께 표기</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 수입품의 경우 수입자 표기(병행수입의 경우 병행수입 여부로 대체)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) 제조국</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) 취급시 주의사항</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) 품질보증기준</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) A/S 책임자와 전화번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
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
                                                                label="“상품상세참조”로 전체변경"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 종류</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 소재</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 치수</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) 제조자, 수입품의 경우<br/>수입자를 함께 표기</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 수입품의 경우 수입자 표기(병행수입의 경우 병행수입 여부로 대체)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 제조국</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) 취급시 주의사항</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) 품질보증기준</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) A/S 책임자와 전화번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
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
                                                                label="“상품상세참조”로 전체변경"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 종류</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 색상</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 치수</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) 제품구성</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 제조자, 수입품의 경우<br/>수입자를 함께 표기</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 수입품의 경우 수입자 표기(병행수입의 경우 병행수입 여부로 대체)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) 제조국</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) 세탁방법 및 취급시<br/>주의사항</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) 품질보증기준</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) A/S 책임자와 전화번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
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
                                                                label="“상품상세참조”로 전체변경"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 품명</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) KC 인증 필 유무</strong></TableCell>
                                                        <TableCell>
                                                            <Grid item md={12} xs={12}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>해당없음</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>해당없음</MenuItem>
                                                                                <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                                <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                                <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                                <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                                <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                                <MenuItem value={7}>KCC인증</MenuItem>
                                                                                <MenuItem value={8}>MIC인증</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>해당없음</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>해당없음</MenuItem>
                                                                                <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                                <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                                <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                                <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                                <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                                <MenuItem value={7}>KCC인증</MenuItem>
                                                                                <MenuItem value={8}>MIC인증</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>해당없음</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>해당없음</MenuItem>
                                                                                <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                                <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                                <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                                <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                                <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                                <MenuItem value={7}>KCC인증</MenuItem>
                                                                                <MenuItem value={8}>MIC인증</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 가전 등 전기용품, 유아 안전용품 등 해당상품은 필수입력</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 색상</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) 구성품</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 주요 소재</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) 제조자, 수입품의 경우<br/>수입자를 함께 표기</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 수입품의 경우 수입자 표기(병행수입의 경우 병행수입 여부로 대체)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) 제조국</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) 크기</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '가로##세로##높이' 형식으로 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) 배송/설치비용</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) 품질보증기준</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(11) A/S 책임자와 전화번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
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
                                                                label="“상품상세참조”로 전체변경"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 품명 및 모델명</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 안전인증대상 유무</strong></TableCell>
                                                        <TableCell>
                                                            <Grid item md={12} xs={12}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>해당없음</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>해당없음</MenuItem>
                                                                                <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                                <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                                <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                                <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                                <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                                <MenuItem value={7}>KCC인증</MenuItem>
                                                                                <MenuItem value={8}>MIC인증</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>해당없음</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>해당없음</MenuItem>
                                                                                <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                                <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                                <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                                <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                                <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                                <MenuItem value={7}>KCC인증</MenuItem>
                                                                                <MenuItem value={8}>MIC인증</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>해당없음</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>해당없음</MenuItem>
                                                                                <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                                <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                                <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                                <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                                <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                                <MenuItem value={7}>KCC인증</MenuItem>
                                                                                <MenuItem value={8}>MIC인증</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 가전 등 전기용품, 유아 안전용품 등 해당상품은 필수입력 사항</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 정격전압, 소비전력,<br/>에너지소비효율등급</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '정격전압##소비전력##에너지소비효율등급' 형식으로 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) 동일모델의 출시년월</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (예: 20201231)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 제조자, 수입품의 경우<br/>수입자를 함께 표기</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 수입품의 경우 수입자 표기(병행수입의 경우 병행수입 여부로 대체)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) 제조국</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) 크기(용량, 형태포함)</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '가로##세로##높이' 형식으로 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) 품질보증기준</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '가로##세로##높이' 형식으로 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) A/S 책임자와 전화번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
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
                                                                label="“상품상세참조”로 전체변경"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 품명 및 모델명</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 안전인증대상 유무</strong></TableCell>
                                                        <TableCell>
                                                            <Grid item md={12} xs={12}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>해당없음</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>해당없음</MenuItem>
                                                                                <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                                <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                                <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                                <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                                <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                                <MenuItem value={7}>KCC인증</MenuItem>
                                                                                <MenuItem value={8}>MIC인증</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>해당없음</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>해당없음</MenuItem>
                                                                                <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                                <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                                <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                                <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                                <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                                <MenuItem value={7}>KCC인증</MenuItem>
                                                                                <MenuItem value={8}>MIC인증</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>해당없음</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>해당없음</MenuItem>
                                                                                <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                                <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                                <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                                <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                                <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                                <MenuItem value={7}>KCC인증</MenuItem>
                                                                                <MenuItem value={8}>MIC인증</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 가전 등 전기용품, 유아 안전용품 등 해당상품은 필수입력 사항</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 정격전압, 소비전력,<br/>에너지소비효율등급</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '정격전압##소비전력##에너지소비효율등급' 형식으로 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) 동일모델의 출시년월</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (예: 20201231)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 제조자, 수입품의 경우<br/>수입자를 함께 표기</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 수입품의 경우 수입자 표기(병행수입의 경우 병행수입 여부로 대체)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) 제조국</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) 크기(용량, 형태포함)</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '가로##세로##높이' 형식으로 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) 화면사양</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '크기##해상도##화면비율' 형식으로 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) 품질보증기준</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) A/S 책임자와 전화번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
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
                                                                label="“상품상세참조”로 전체변경"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 품명 및 모델명</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 안전인증대상 유무</strong></TableCell>
                                                        <TableCell>
                                                            <Grid item md={12} xs={12}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>해당없음</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>해당없음</MenuItem>
                                                                                <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                                <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                                <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                                <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                                <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                                <MenuItem value={7}>KCC인증</MenuItem>
                                                                                <MenuItem value={8}>MIC인증</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>해당없음</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>해당없음</MenuItem>
                                                                                <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                                <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                                <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                                <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                                <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                                <MenuItem value={7}>KCC인증</MenuItem>
                                                                                <MenuItem value={8}>MIC인증</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>해당없음</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>해당없음</MenuItem>
                                                                                <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                                <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                                <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                                <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                                <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                                <MenuItem value={7}>KCC인증</MenuItem>
                                                                                <MenuItem value={8}>MIC인증</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 가전 등 전기용품, 유아 안전용품 등 해당상품은 필수입력 사항</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 정격전압, 소비전력,<br/>에너지소비효율등급</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '정격전압##소비전력##에너지소비효율등급' 형식으로 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) 동일모델의 출시년월</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (예: 20201231)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 제조자, 수입품의 경우<br/>수입자를 함께 표기</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 수입품의 경우 수입자 표기(병행수입의 경우 병행수입 여부로 대체)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) 제조국</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) 크기(용량, 형태포함)</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '가로##세로##높이' 형식으로 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) 냉난방면적</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '크기##해상도##화면비율' 형식으로 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) 추가설치비용</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) 품질보증기준</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(11) A/S 책임자와 전화번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
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
                                                                label="“상품상세참조”로 전체변경"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 품명 및 모델명</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 안전인증대상 유무</strong></TableCell>
                                                        <TableCell>
                                                            <Grid item md={12} xs={12}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>해당없음</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>해당없음</MenuItem>
                                                                                <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                                <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                                <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                                <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                                <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                                <MenuItem value={7}>KCC인증</MenuItem>
                                                                                <MenuItem value={8}>MIC인증</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>해당없음</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>해당없음</MenuItem>
                                                                                <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                                <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                                <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                                <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                                <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                                <MenuItem value={7}>KCC인증</MenuItem>
                                                                                <MenuItem value={8}>MIC인증</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>해당없음</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>해당없음</MenuItem>
                                                                                <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                                <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                                <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                                <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                                <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                                <MenuItem value={7}>KCC인증</MenuItem>
                                                                                <MenuItem value={8}>MIC인증</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 가전 등 전기용품, 유아 안전용품 등 해당상품은 필수입력 사항</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 정격전압, 소비전력,<br/>에너지소비효율등급</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '정격전압##소비전력##에너지소비효율등급' 형식으로 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) 동일모델의 출시년월</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (예: 20201231)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 제조자, 수입품의 경우<br/>수입자를 함께 표기</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 수입품의 경우 수입자 표기(병행수입의 경우 병행수입 여부로 대체)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) 제조국</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) 크기, 무게(무게는 노트북에 한함)</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '가로##세로##높이' 형식으로 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) 주요사항</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '크기##해상도##화면비율' 형식으로 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) 품질보증기준</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) A/S 책임자와 전화번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
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
                                                                label="“상품상세참조”로 전체변경"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 품명 및 모델명</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 안전인증대상 유무</strong></TableCell>
                                                        <TableCell>
                                                            <Grid item md={12} xs={12}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>해당없음</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>해당없음</MenuItem>
                                                                                <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                                <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                                <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                                <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                                <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                                <MenuItem value={7}>KCC인증</MenuItem>
                                                                                <MenuItem value={8}>MIC인증</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>해당없음</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>해당없음</MenuItem>
                                                                                <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                                <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                                <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                                <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                                <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                                <MenuItem value={7}>KCC인증</MenuItem>
                                                                                <MenuItem value={8}>MIC인증</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>해당없음</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>해당없음</MenuItem>
                                                                                <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                                <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                                <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                                <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                                <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                                <MenuItem value={7}>KCC인증</MenuItem>
                                                                                <MenuItem value={8}>MIC인증</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 가전 등 전기용품, 유아 안전용품 등 해당상품은 필수입력 사항</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 동일모델의 출시년월</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (예: 202010)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) 제조자, 수입품의 경우<br/>수입자를 함께 표기</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 수입품의 경우 수입자 표기(병행수입의 경우 병행수입 여부로 대체)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 제조국</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) 크기, 무게</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '가로##세로##높이' 형식으로 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) 주요사항</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) 품질보증기준</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) A/S 책임자와 전화번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
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
                                                                label="“상품상세참조”로 전체변경"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 품명 및 모델명</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 안전인증대상 유무</strong></TableCell>
                                                        <TableCell>
                                                            <Grid item md={12} xs={12}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>해당없음</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>해당없음</MenuItem>
                                                                                <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                                <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                                <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                                <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                                <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                                <MenuItem value={7}>KCC인증</MenuItem>
                                                                                <MenuItem value={8}>MIC인증</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>해당없음</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>해당없음</MenuItem>
                                                                                <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                                <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                                <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                                <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                                <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                                <MenuItem value={7}>KCC인증</MenuItem>
                                                                                <MenuItem value={8}>MIC인증</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>해당없음</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>해당없음</MenuItem>
                                                                                <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                                <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                                <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                                <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                                <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                                <MenuItem value={7}>KCC인증</MenuItem>
                                                                                <MenuItem value={8}>MIC인증</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 가전 등 전기용품, 유아 안전용품 등 해당상품은 필수입력 사항</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 정격전압, 소비전력</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (에너지이용합리화법 상 의무대상상품에 한함) '정격전압##소비전력' 형식으로 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) 동일모델의 출시년월</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (예: 202010)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 제조자, 수입품의 경우<br/>수입자를 함께 표기</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 수입품의 경우 수입자 표기(병행수입의 경우 병행수입 여부로 대체)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) 제조국</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) 크기, 무게</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '가로##세로##높이' 형식으로 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) 주요사항</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) 품질보증기준</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) A/S 책임자와 전화번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
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
                                                                label="“상품상세참조”로 전체변경"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 품명 및 모델명</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 안전인증대상 유무</strong></TableCell>
                                                        <TableCell>
                                                            <Grid item md={12} xs={12}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>해당없음</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>해당없음</MenuItem>
                                                                                <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                                <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                                <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                                <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                                <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                                <MenuItem value={7}>KCC인증</MenuItem>
                                                                                <MenuItem value={8}>MIC인증</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>해당없음</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>해당없음</MenuItem>
                                                                                <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                                <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                                <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                                <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                                <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                                <MenuItem value={7}>KCC인증</MenuItem>
                                                                                <MenuItem value={8}>MIC인증</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>해당없음</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>해당없음</MenuItem>
                                                                                <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                                <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                                <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                                <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                                <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                                <MenuItem value={7}>KCC인증</MenuItem>
                                                                                <MenuItem value={8}>MIC인증</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 가전 등 전기용품, 유아 안전용품 등 해당상품은 필수입력 사항</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 동일모델의 출시년월</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (예: 202010)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) 제조자, 수입품의 경우<br/>수입자를 함께 표기</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 수입품의 경우 수입자 표기(병행수입의 경우 병행수입 여부로 대체)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 제조국</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) 크기, 무게</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '가로##세로##높이' 형식으로 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) 이동통신사</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) 가입절차</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) 소비자의 추가적인<br/>부담사항</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) 주요사항</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(11) 품질보증기준</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(12) A/S 책임자와 전화번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
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
                                                                label="“상품상세참조”로 전체변경"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 품명 및 모델명</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 안전인증대상 유무</strong></TableCell>
                                                        <TableCell>
                                                            <Grid item md={12} xs={12}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>해당없음</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>해당없음</MenuItem>
                                                                                <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                                <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                                <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                                <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                                <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                                <MenuItem value={7}>KCC인증</MenuItem>
                                                                                <MenuItem value={8}>MIC인증</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>해당없음</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>해당없음</MenuItem>
                                                                                <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                                <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                                <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                                <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                                <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                                <MenuItem value={7}>KCC인증</MenuItem>
                                                                                <MenuItem value={8}>MIC인증</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>해당없음</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>해당없음</MenuItem>
                                                                                <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                                <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                                <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                                <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                                <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                                <MenuItem value={7}>KCC인증</MenuItem>
                                                                                <MenuItem value={8}>MIC인증</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 가전 등 전기용품, 유아 안전용품 등 해당상품은 필수입력 사항</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 정격전압, 소비전력</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (에너지이용합리화법 상 의무대상상품에 한함) '정격전압##소비전력' 형식으로 표시</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) 동일모델의 출시년월</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (예: 202010)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 제조자, 수입품의 경우<br/>수입자를 함께 표기</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 수입품의 경우 수입자 표기(병행수입의 경우 병행수입 여부로 대체)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) 제조국</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) 크기, 무게</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '가로##세로##높이' 형식으로 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) 주요사항</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) 맵 업데이트 비용 및<br/>무상기간</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) 품질보증기준</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(11) A/S 책임자와 전화번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
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
                                                                label="“상품상세참조”로 전체변경"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 품명 및 모델명</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 의료기기법상 허가, 신고<br/>번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 광고 사전 심의 번호는 필수 등록</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) KC인증대상 유무</strong></TableCell>
                                                        <TableCell>
                                                            <Grid item md={12} xs={12}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>해당없음</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>해당없음</MenuItem>
                                                                                <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                                <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                                <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                                <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                                <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                                <MenuItem value={7}>KCC인증</MenuItem>
                                                                                <MenuItem value={8}>MIC인증</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>해당없음</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>해당없음</MenuItem>
                                                                                <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                                <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                                <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                                <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                                <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                                <MenuItem value={7}>KCC인증</MenuItem>
                                                                                <MenuItem value={8}>MIC인증</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                
                                                            <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                                <Grid container>
                                                                    <Grid item md={4} xs={12}>
                                                                        <FormControl size="small" fullWidth variant="outlined">
                                                                            <InputLabel>해당없음</InputLabel>
                                                                            <Select>
                                                                                <MenuItem value={1}>해당없음</MenuItem>
                                                                                <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                                <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                                <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                                <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                                <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                                <MenuItem value={7}>KCC인증</MenuItem>
                                                                                <MenuItem value={8}>MIC인증</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                        <TextField
                                                                            fullWidth
                                                                            size="small"
                                                                            variant="outlined"
                                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 가전 등 전기용품, 유아 안전용품 등 해당상품은 필수입력 사항</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) 정격전압, 소비전력</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (에너지이용합리화법 상 의무대상상품에 한함) '정격전압##소비전력' 형식으로 표시</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 동일모델의 출시년월</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (예: 202010)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) 제조자, 수입품의 경우<br/>수입자를 함께 표기</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 수입품의 경우 수입자 표기(병행수입의 경우 병행수입 여부로 대체)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) 제조국</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) 제품의 사용목적 및<br/>사용방법</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) 취급시 주의사항</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) 품질보증기준</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(11) A/S 책임자와 전화번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
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
                                                                label="“상품상세참조”로 전체변경"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 품명 및 모델명</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 재질</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 구성품</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) 크기</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '가로##세로##높이' 형식으로 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 동일모델의 출시년월</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (예: 202010)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) 제조자, 수입품의 경우<br/>수입자를 함께 표기</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 수입품의 경우 수입자 표기(병행수입의 경우 병행수입 여부로 대체)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) 제조국</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 제조국은 법률상 중요정보이니 정확히 입력</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) 식품위생법에 따른 수입<br/>기구·용기 여부</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) 품질보증기준</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) A/S 책임자와 전화번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
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
                                                                label="“상품상세참조”로 전체변경"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 용량 또는 중량</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 제품 주요 사양</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 피부타입, 색상(호, 번) 등 을 입력</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 사용기한 또는 개봉 후<br/>사용기간</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 개봉 후 사용기간 표기 시 제조년월일 병행표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) 사용방법</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 제조자 및 제조판매업자</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (예: 202010)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) 제조국</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 제조국은 법률상 중요정보이니 정확히 입력</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) 화장품품법에 따라<br/>기재·표시하여야 하는 모든 성분</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 유기농 화장품의 경우 유기농 원료 함량 포함</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) 식품의약품안전청 심사 필 유무</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 기능성 화장품의 경우 화장품법에 따른 식품의약품안전청 심사 필 유무 (미백, 주름개선, 자외선차단 등)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) 사용할 때 주의사항</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) 품질보증기준</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(11) 소비자상담관련 전화번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
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
                                                                label="“상품상세참조”로 전체변경"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 용량(중량), 수량, 크기</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 포장 단위별 용량(중량), 수량, 크기 표기<br/>'가로##세로##높이##용량(중량)##수량' 형식으로 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 생산자(수입자)</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 생산자, 수입품의 경우 수입자를 함께 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 농수산물의 원산지 표시에<br/>관한 법률에 따른 원산지</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 개봉 후 사용기간 표기 시 제조년월일 병행표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) 제조년월일<br/>(포장일 또는 생산연도)</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 유통기한 또는 품질유지기한을 입력 하십시요 (예: 20121101)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 농산물</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 농산물품질관리법상 유전자변형농산물 표시, 지리적표시</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) 축산물</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 축산법에 따른 등급표시, 쇠고기의 경우 이력관리에 따른 표시 유무</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) 수산물</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 수산물품질관리법상 유전자변형수산물 표시, 지리적표시</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) 수입식품여부</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 수입식품에 해당하는 경우 식품위생법에 따른 수입신고를 필함의 문구</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) 상품구성</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) 보관방법 또는 취급방법</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(11) 소비자상담 관련 전화번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(12) 품목 또는 명칭</strong></TableCell>
                                                        <TableCell className="text-center">
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(13) 식품 등의 표시/광고에<br/>관한 법률에 따른 소비자<br/>안전을 위한 주의사항</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
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
                                                                label="“상품상세참조”로 전체변경"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 용량(중량), 수량, 크기</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 생산자 및 소재지</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 수입품의 경우 수입자 함께 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 제조년월일<br/>(포장일 또는 생산연도)</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (예: 20121101)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) 용량(중량), 수량</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 포장 단위별 용량(중량), 수량, 크기 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 원재료명 및 함량</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) 영양성분 표시 대상 여부</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) 유전자변형건강기능식품 여부</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) 표시광고 사전심의 필</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) 수입식품 여부</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) 소비자상담 관련 전화번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(11) 소비자안전을 위한 주의사항</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(12) 제품명</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
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
                                                                label="“상품상세참조”로 전체변경"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 식품의 유형</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 생산자 및 소재지(수입자)</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 생산자 및 소재지, 수입품의 경우 수입자를 함께 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 제조년월일, 유통기한 또는<br/>품질유지기한</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (예: 20121101)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) 포장단위별 용량(중량), 수량</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 포장 단위별 용량(중량), 수량, 크기 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 원재료명 및 함량</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) 영양정보</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) 기능정보</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) 섭취량, 섭취방법 및 섭취 시<br/>주의사항</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) 질병 예방, 치료 의약품 아님<br/>명시</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) 유전자변형건강기능식품<br/>여부</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 유전자변형건강기능식품에 해당하는 경우의 표시</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(11) 표시광고 사전 심의필</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(12) 수입식품 여부</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 수입식품에 해당하는 경우 건강기능식품에 따른 수입신고를 필함의 문구</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(13) 소비자상담 관련 전화번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(14) 제품명</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(15) 소비자안전을 위한<br/>주의사항</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
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
                                                            label="“상품상세참조”로 전체변경"
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                
                                                <TableRow>
                                                    <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 품명 및 모델명</strong></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            
                                                <TableRow>
                                                    <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 어린이제품 안전 특별법<br/>KC인증대상 유무</strong></TableCell>
                                                    <TableCell>
                                                        <Grid item md={12} xs={12}>
                                                            <Grid container>
                                                                <Grid item md={4} xs={12}>
                                                                    <FormControl size="small" fullWidth variant="outlined">
                                                                        <InputLabel>해당없음</InputLabel>
                                                                        <Select>
                                                                            <MenuItem value={1}>해당없음</MenuItem>
                                                                            <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                            <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                            <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                            <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                            <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                            <MenuItem value={7}>KCC인증</MenuItem>
                                                                            <MenuItem value={8}>MIC인증</MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                    <TextField
                                                                        fullWidth
                                                                        size="small"
                                                                        variant="outlined"
                                                                        value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                            
                                                        <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                            <Grid container>
                                                                <Grid item md={4} xs={12}>
                                                                    <FormControl size="small" fullWidth variant="outlined">
                                                                        <InputLabel>해당없음</InputLabel>
                                                                        <Select>
                                                                            <MenuItem value={1}>해당없음</MenuItem>
                                                                            <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                            <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                            <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                            <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                            <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                            <MenuItem value={7}>KCC인증</MenuItem>
                                                                            <MenuItem value={8}>MIC인증</MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                    <TextField
                                                                        fullWidth
                                                                        size="small"
                                                                        variant="outlined"
                                                                        value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                            
                                                        <Grid item md={12} xs={12} style={{marginTop: "10px"}}>
                                                            <Grid container>
                                                                <Grid item md={4} xs={12}>
                                                                    <FormControl size="small" fullWidth variant="outlined">
                                                                        <InputLabel>해당없음</InputLabel>
                                                                        <Select>
                                                                            <MenuItem value={1}>해당없음</MenuItem>
                                                                            <MenuItem value={2}>국가통합인증(KC마크)</MenuItem>
                                                                            <MenuItem value={3}>전기용품 안전인증</MenuItem>
                                                                            <MenuItem value={4}>KPS 안전인증 표시</MenuItem>
                                                                            <MenuItem value={5}>KPS자율안전 확인 표시</MenuItem>
                                                                            <MenuItem value={6}>KPS 어린이 보호포장 표시</MenuItem>
                                                                            <MenuItem value={7}>KCC인증</MenuItem>
                                                                            <MenuItem value={8}>MIC인증</MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                                    <TextField
                                                                        fullWidth
                                                                        size="small"
                                                                        variant="outlined"
                                                                        value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <InputLabel style={{color: "#ff0000"}}><br/>* 어린이제품 안전 특별법 상 안전인증대상어린이제품, 안전확인대상어린이제품, 공급자적합성확인대상어린이제품에 대한 KC인증 필 유무</InputLabel>
                                                    </TableCell>
                                                </TableRow>
                                            
                                                <TableRow>
                                                    <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 크기, 중량</strong></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                        />
                                                        <InputLabel style={{color: "#ff0000"}}><br/>* '가로##세로##높이##중량' 형식으로 표기</InputLabel>
                                                    </TableCell>
                                                </TableRow>
                                            
                                                <TableRow>
                                                    <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) 색상</strong></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            
                                                <TableRow>
                                                    <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 재질</strong></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                        />
                                                        <InputLabel style={{color: "#ff0000"}}><br/>* 섬유의 경우 혼용률 표기</InputLabel>
                                                    </TableCell>
                                                </TableRow>
                                            
                                                <TableRow>
                                                    <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) 사용연령 또는 체중범위</strong></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            
                                                <TableRow>
                                                    <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) 동일모델의 출시년월</strong></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                        />
                                                        <InputLabel style={{color: "#ff0000"}}><br/>* (예: 201211)</InputLabel>
                                                    </TableCell>
                                                </TableRow>
                                            
                                                <TableRow>
                                                    <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) 제조자, 수입품의 경우<br/>수입자를 함께 표기</strong></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                        />
                                                        <InputLabel style={{color: "#ff0000"}}><br/>* 수입품의 경우 수입자 표기(병행수입의 경우 병행수입 여부로 대체)</InputLabel>
                                                    </TableCell>
                                                </TableRow>
                                            
                                                <TableRow>
                                                    <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) 제조국</strong></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                        />
                                                        <InputLabel style={{color: "#ff0000"}}><br/>* 제조국은 법률상 중요정보이니 정확히 입력</InputLabel>
                                                    </TableCell>
                                                </TableRow>
                                            
                                                <TableRow>
                                                    <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) 취급방법 및 주의사항</strong></TableCell>
                                                    <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 취급 시 주의사항, 안전표시 (주의, 경고 등) 내용 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(11) 품질보증기준</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(12) A/S 책임자와 전화번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
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
                                                                label="“상품상세참조”로 전체변경"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 품명 및 모델명</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 크기</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '가로##세로##높이' 형식으로 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 색상</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) 재질</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 섬유의 경우 혼용률 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 제품 구성</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) 동일모델의 출시년월</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (예: 20121101)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) 제조자, 수입품의 경우<br/>수입자를 함께 표기</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 수입품의 경우 수입자 표기(병행수입의 경우 병행수입 여부로 대체)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) 제조국</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 제조국은 법률상 중요정보이니 정확히 입력</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) 상품별 세부 사양</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) 품질보증기준</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(11) A/S 책임자와 전화번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
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
                                                                label="“상품상세참조”로 전체변경"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 품명 및 모델명</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 크기, 중량</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '가로##세로##높이' 형식으로 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 색상</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) 재질</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 섬유의 경우 혼용률 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 제품 구성</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) 동일모델의 출시년월</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* (예: 20121101)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) 제조자, 수입품의 경우<br/>수입자를 함께 표기</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 수입품의 경우 수입자 표기(병행수입의 경우 병행수입 여부로 대체)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) 제조국</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 제조국은 법률상 중요정보이니 정확히 입력</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) 상품별 세부 사양</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) 품질보증기준</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(11) A/S 책임자와 전화번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
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
                                                                label="“상품상세참조”로 전체변경"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 도서명</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 저자, 출판사</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '저자##출판사' 형식으로 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 크기(전자책의 경우<br/>파일의 용량)</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '가로##세로##높이##전자책용량' 형식으로 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) 쪽수(전자책의 경우 제외)</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* 섬유의 경우 혼용률 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 제품 구성(전집 또는 세트일<br/>경우 낱권 구성, CD등)</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) 츌간일</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) 목차 또는 책소개(아동용<br/>학습 교재의 경우 사용연령을<br/>포함)</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
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
                                                                label="“상품상세참조”로 전체변경"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 국가 또는 지역명</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 숙소형태</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 등급, 객실타입</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) 사용가능 인원, 인원 추가 시 비용</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 부대시설, 제공 서비스<br/>(조식 등)</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) 취소 규정(환불, 위약금 등)</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) 예약담당 연락처</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
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
                                                                label="“상품상세참조”로 전체변경"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 제작자 또는 공급자</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 이용조건, 이용기간</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '이용조건##이용기간' 형식으로 표기</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 상품 제공 방식</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* CD, 다운로드, 실시간 스트리밍 등 ,명시</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) 최소 시스템 사양, <br/>필수 소프트웨어</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 청약철회 또는 계약의<br/>해제·해지에 따른 효과</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) 소비자상담 관련 전화번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
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
                                                                label="“상품상세참조”로 전체변경"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 발행자</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 유효기간, 이용조건</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* '이용조건##유효기간' 형식으로 표기<br/>* 스마트스토어의 경우 유효기간의 값은 반드시 숫자여야 함  ex) 7일(x) 7(o)</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 이용 가능 매장</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                            <InputLabel style={{color: "#ff0000"}}><br/>* CD, 다운로드, 실시간 스트리밍 등 ,명시</InputLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) 잔액 환급 조건</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 소비자상담 관련 전화번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
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
                                                                label="“상품상세참조”로 전체변경"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 품명 및 모델명</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                            
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 법에 의한 인증·허가 등을<br/>받았음을 확인할 수 있는<br/>경우 그에 대한 사항</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                        
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 제조국 또는 원산지</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) 제조자, 수입품의 경우<br/>수입자를 함께 표기</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) A/S 책임자와 전화번호 또는<br/>소비자상담 관련 전화번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
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
                                                                label="“상품상세참조”로 전체변경"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 발행자</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 유효기간</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 이용조건(유효기간 경과 시<br/> 보상 기준 포함)</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) 환불조건 및 방법</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 소비자상담 관련 전화번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
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
                                                                label="“상품상세참조”로 전체변경"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 서비스 제공 사업자</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 법에 의한 인증·허가 등을<br/>받았음을 확인할 수 있는 경우<br/>그에 대한 사항</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 이용조건</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) 취소·중도해약·해지 조건 및<br/>환불기준</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 소비자상담 관련 전화번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
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
                                                                label="“상품상세참조”로 전체변경"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 품목 및 제품명</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 용도 및 제형</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 제조연월 및 유통기한</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) 중량, 용량, 매수</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 효과, 효능</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) 수입자(수입제품에 한함),<br/>제조국 및 제조사</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) 어린이 보호포장 대상 제품<br/>유무</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) 제품에 사용된 화학물질<br/>명칭</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) 사용상 주의사항</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) 안전기준 적합확인<br/>신고번호(자가검사번호) 또는<br/>승인번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(11) 소비자 상담관련 전화번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
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
                                                                label="“상품상세참조”로 전체변경"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(1) 제품명 및 제품유형</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(2) 중량 또는 용량 및<br/>표준사용량</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(3) 효능·효과</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(4) 사용대상자 및 사용범위</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(5) 수입자(수입제품에 한함),<br/>제조국 및 제조사</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(6) 어린이 보호포장 대상 제품<br/>유무</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(7) 살생물물질, 나노물질, <br/>유해화학물질(또는 <br/>중점관리물질)의 명칭</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(8) 제품 유해성, 위해성 표시</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(9) 승인번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                
                                                    <TableRow>
                                                        <TableCell style={{textAlign: "right"}} width="35%"><strong>(10) 소비자 상담관련 전화번호</strong></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                value={this.state.isViewProductDetail === true ? "상품상세참조" : ""}
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
