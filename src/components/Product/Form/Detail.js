import React from "react";
import {
    Grid,
    CardContent,
    TextField,
    Select,
    MenuItem,
    FormControlLabel,
    FormControl,
    Checkbox,
    InputLabel,
} from "@material-ui/core";
/**
 * @summary Detail
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Product
 */
class Detail extends React.Component {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);
    }
    /**
     * @override
     */
    render() {
        return (
            <CardContent>
                <Grid container spacing={3} className="align-items-center">
                    <Grid item md={2} xs={12}>
                        <h5>상품코드 or 바코드</h5>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            placeholder="상품코드 입력(영문/숫자)"
                            size="small"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={3} className="align-items-center">
                    <Grid item md={2} xs={12}>
                        <h5>상품 키워드</h5>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            placeholder="상품 키워드 40자 이내 입력"
                            size="small"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
                
                <Grid container spacing={3} className="align-items-center">
                    <Grid item md={2} xs={12}>
                        <h5>과세여부</h5>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <FormControl size="small" fullWidth variant="outlined">
                            <InputLabel>과세여부 선택</InputLabel>
                            <Select>
                                <MenuItem value="0">과세</MenuItem>
                                <MenuItem value="2">면세</MenuItem>
                                <MenuItem value="3">영세</MenuItem>
                                <MenuItem value="1">비과세</MenuItem>
                                <MenuItem value="4">영수증여부</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                
                <Grid container spacing={3} className="align-items-center">
                    <Grid item md={2} xs={12}>
                        <h5>원산지</h5>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <FormControl size="small" fullWidth variant="outlined">
                            <InputLabel>원산지 선택</InputLabel>
                            <Select>
                                <MenuItem value="0">영수증여부</MenuItem>
                                <MenuItem value="1">국내산</MenuItem>
                                <MenuItem value="2">국내제조</MenuItem>
                                <MenuItem value="3">수입</MenuItem>
                                <MenuItem value="4">해외OEM</MenuItem>
                                <MenuItem value="5">미국</MenuItem>
                                <MenuItem value="6">캐나다</MenuItem>
                                <MenuItem value="7">러시아</MenuItem>
                                <MenuItem value="8">중국</MenuItem>
                                <MenuItem value="9">태국</MenuItem>
                                <MenuItem value="10">영국</MenuItem>
                                <MenuItem value="11">유럽</MenuItem>
                                <MenuItem value="12">일본</MenuItem>
                                <MenuItem value="13">대만</MenuItem>
                                <MenuItem value="14">싱가포르</MenuItem>
                                <MenuItem value="15">베트남</MenuItem>
                                <MenuItem value="16">인도네시아</MenuItem>
                                <MenuItem value="17">기타국가</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={3} className="align-items-center">
                    <Grid item md={2} xs={12}>
                        <h5>제조사</h5>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            placeholder="제조사는 20자 이하로 입력"
                            size="small"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={3} className="align-items-center">
                    <Grid item md={2} xs={12}>
                        <h5>브랜드</h5>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            placeholder="브랜드는 20자 이하로 입력"
                            size="small"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={3} className="align-items-center">
                    <Grid item md={2} xs={12}>
                        <h5>모델명</h5>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            placeholder="모델명 20자 이하로 입력"
                            size="small"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={3} className="align-items-center">
                    <Grid item md={2} xs={12}>
                        <h5>모델No.</h5>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            placeholder="모델No. 15자 이하로 입력"
                            size="small"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={3} className="align-items-center">
                    <Grid item md={2} xs={12}>
                        <h5>제조일(발행일)</h5>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            size="small"
                            type="date"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={3} className="align-items-center">
                    <Grid item md={2} xs={12}>
                        <h5>인증번호</h5>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            placeholder="인증번호 15자 이하로 입력"
                            size="small"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={3} className="align-items-center">
                    <Grid item md={2} xs={12}>
                        <h5>제조일(발행일)</h5>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <Grid container>
                            <Grid item md={4} xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    type="date"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={1} xs={12} className="text-center" style={{paddingTop: "10px"}}>~</Grid>
                            <Grid item md={4} xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    type="date"
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid container spacing={3} className="align-items-center">
                    <Grid item md={2} xs={12}>
                        <h5>남/여 상품</h5>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <FormControl size="small" fullWidth variant="outlined">
                            <InputLabel>공용</InputLabel>
                            <Select>
                                <MenuItem value="0">공용</MenuItem>
                                <MenuItem value="2">남성용</MenuItem>
                                <MenuItem value="3">여성용</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={3} className="align-items-center">
                    <Grid item md={2} xs={12}>
                        <h5>성인상품</h5>
                    </Grid>
                    <Grid container md={6} xs={12}>
                        <Grid item md={2} xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="primary"
                                        value={true}
                                    />
                                }
                                label="예"
                            />
                        </Grid>
                        <Grid item md={2} xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="primary"
                                        value={false}
                                        defaultChecked={true}
                                    />
                                }
                                label="아니오"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        );
    }
}

export default Detail;
