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
    Table,
    TableBody,
    TableRow,
    TableCell,
    InputAdornment
} from "@material-ui/core";
class Condition extends React.Component {
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
                    <Grid item md={8} xs={12}>
                        <Table className="mail_table">
                            <TableBody>
                                <TableRow>
                                    <TableCell width="5%"><strong>최소구매수량</strong></TableCell>
                                    <TableCell>
                                        <Grid item md={6} xs={12}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                variant="outlined"
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">개</InputAdornment>,
                                                }}/>
                                        </Grid>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell width="5%"><strong>최대구매수량</strong></TableCell>
                                    <TableCell>
                                        <Grid container md={10} xs={12}>
                                            <Grid item md={3} xs={12}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            color="primary"
                                                            value={true}
                                                            defaultChecked={true}
                                                        />
                                                    }
                                                    label="1회 구매 시 최대"
                                                />
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    variant="outlined"
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end">개</InputAdornment>,
                                                    }}/>
                                            </Grid>
                                        </Grid>
                                        <Grid container md={10} xs={12}>
                                            <Grid item md={3} xs={12}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            color="primary"
                                                            value={true}
                                                        />
                                                    }
                                                    label="1회 구매 시 최대"
                                                />
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    variant="outlined"
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end">개</InputAdornment>,
                                                    }}/>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell width="5%"><strong>포인트</strong></TableCell>
                                    <TableCell>
                                        <Grid container md={10} xs={12} className="mt-12">
                                            <Grid item md={4} xs={12}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            color="primary"
                                                            value={true}
                                                            defaultChecked={true}
                                                        />
                                                    }
                                                    label="상품 구매 시 지급"
                                                />
                                            </Grid>
                                            <Grid item md={4} xs={12}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            color="primary"
                                                            value={true}
                                                        />
                                                    }
                                                    label="상품리뷰 작성 시 지급"
                                                />
                                            </Grid>
                                        </Grid>
                                        
                                        <Grid container md={6} xs={12} className="mt-12">
                                            <TextField
                                                fullWidth
                                                size="small"
                                                variant="outlined"
                                                InputProps={{
                                                    endAdornment: 
                                                    <InputAdornment position="end">
                                                        <FormControl size="small" fullWidth style={{border: "none"}}>
                                                            <InputLabel>원</InputLabel>
                                                            <Select style={{border: "none"}}>
                                                                <MenuItem value="0">원</MenuItem>
                                                                <MenuItem value="1">%</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </InputAdornment>,
                                                }}/>
                                        </Grid>
                                        
                                        <Grid container md={12} xs={12} className="mt-12">
                                            <Grid item md={3} xs={12}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            color="primary"
                                                            value={true}
                                                            defaultChecked={true}
                                                        />
                                                    }
                                                    label="특정 기간만 지급"
                                                />
                                            </Grid>
                                            <Grid container md={9} xs={12}>
                                                <Grid item md={5} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        type="date"
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                                <Grid item md={1} xs={12} className="text-center" style={{paddingTop: "15px"}}>~</Grid>
                                                <Grid item md={5} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        type="date"
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        
                                        <Grid container md={12} xs={12} className="mt-12">
                                            <Grid item md={3} xs={12} style={{textAlign: "center", paddingTop: "15px"}}><InputLabel>텍스트 리뷰 작성</InputLabel></Grid>
                                            <Grid item md={3} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    variant="outlined"
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end">원</InputAdornment>,
                                                    }}/>
                                            </Grid>
                                            <Grid item md={3} xs={12} style={{textAlign: "center", paddingTop: "15px"}}><InputLabel>포토/동영상 리뷰 작성</InputLabel></Grid>
                                            <Grid item md={3} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    variant="outlined"
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end">원</InputAdornment>,
                                                    }}/>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell width="5%"><strong>복수구매할인</strong></TableCell>
                                    <TableCell>
                                        <Grid container md={8} xs={12} style={{marginTop: "10px"}}>
                                            <Grid item md={4} xs={12}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            color="primary"
                                                            value={true}
                                                            defaultChecked={true}
                                                        />
                                                    }
                                                    label="설정함"
                                                />
                                            </Grid>
                                            <Grid item md={4} xs={12}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            color="primary"
                                                            value={true}
                                                        />
                                                    }
                                                    label="설정안함"
                                                />
                                            </Grid>
                                        </Grid>
                                        
                                        <Grid container md={6} xs={12} style={{marginTop: "10px"}}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                variant="outlined"
                                                placeholder="주문금액(판매가기준)/수량"
                                                InputProps={{
                                                    endAdornment: 
                                                    <InputAdornment position="end">
                                                        <FormControl size="small" fullWidth style={{border: "none"}}>
                                                            <InputLabel>원</InputLabel>
                                                            <Select style={{border: "none"}}>
                                                                <MenuItem value="0">원</MenuItem>
                                                                <MenuItem value="1">개</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </InputAdornment>,
                                                }}/>
                                        </Grid>
                                        
                                        <Grid container md={8} xs={12} style={{marginTop: "10px"}}>
                                            <Grid item md={10} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    variant="outlined"
                                                    placeholder="판매가에서"
                                                    InputProps={{
                                                        endAdornment: 
                                                        <InputAdornment position="end">
                                                            <FormControl size="small" fullWidth style={{border: "none"}}>
                                                                <InputLabel>원</InputLabel>
                                                                <Select style={{border: "none"}}>
                                                                    <MenuItem value="0">원</MenuItem>
                                                                    <MenuItem value="1">%</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </InputAdornment>,
                                                    }}/>
                                            </Grid>
                                            <Grid item md={1} xs={12} className="text-center" style={{paddingTop: "10px"}}>
                                                <InputLabel>할인</InputLabel>
                                            </Grid>
                                        </Grid>

                                        <Grid container md={8} xs={12} style={{marginTop: "10px"}}>
                                            <h5>주문금액은 판매가 기준(할인가/ 옵션가 / 추가상품가 제외)이며 <br/>
                                            구매된 수량 만큼 할인이 적용 <br/>
                                            수량이 아닌 주문금액으로 설정 시에도 구매된 수량 만큼 할인이 적용</h5>
                                        </Grid>

                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell width="5%"><strong>사은품</strong></TableCell>
                                    <TableCell>                                        
                                        <Grid container md={12} xs={12} className="mt-12">
                                            <Grid item md={3} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    variant="outlined"/>
                                            </Grid>
                                            <Grid item md={2} xs={12} style={{textAlign: "center", paddingTop: "15px"}}><InputLabel>이상 구매 시</InputLabel></Grid>
                                            <Grid item md={3} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    variant="outlined"/>
                                            </Grid>
                                            <Grid item md={3} xs={12} style={{textAlign: "center", paddingTop: "15px"}}><InputLabel>사은품 증정</InputLabel></Grid>
                                        </Grid>

                                        <Grid container md={12} xs={12} className="mt-12">
                                            <Grid item md={3} xs={12}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            color="primary"
                                                            value={true}
                                                        />
                                                    }
                                                    label="특정 기간만 할인"
                                                />
                                            </Grid>
                                            <Grid container md={8} xs={12}>
                                                <Grid item md={5} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        type="date"
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                                <Grid item md={1} xs={12} className="text-center" style={{paddingTop: "15px"}}>~</Grid>
                                                <Grid item md={5} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        type="date"
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>        
                    </Grid>
                </Grid>
            </CardContent>
        );
    }
}

export default Condition;
