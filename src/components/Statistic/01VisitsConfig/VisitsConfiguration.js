import React from 'react';
import { connect } from "react-redux";
import { withSnackbar } from 'notistack';
import {
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
} from '@material-ui/core';
import SettingsIcon from "@material-ui/icons/Settings";

import PageTitle from '../../../core/common/Partials/PageTitle';
// import List from './List';
import TableEntity from './Table';

import { GET_DATA, GET_OBSERVABLE_PAGE, SAVE_OBSERVABLE_PAGE } from "./Queries";

class VisitsConfiguration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isProcessing: false,
            isShowingModal: false,
            editingId: '',
            editingTitle: '',
            editingSelectedDictionary: '',
            editingEnabled: '',
            dictionary: [],
            aObPage: [],
            toggleList: false,
        };

        this.loadData = this.loadData.bind(this);
        this.loadObPages = this.loadObPages.bind(this);
        this.saveObservablePage = this.saveObservablePage.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.setState({
            isProcessing: true,
        }, () => {
            this.props.apolloClient.httpClient.query({
                query: GET_DATA,
                variables: {
                    search: {
                        dictype: 'pageurl',
                    }
                }
            })
                .then((result) => {
                    this.setState({
                        dictionary: [null, undefined].includes(result.data.getDictionaryByType.list) === false ? [...result.data.getDictionaryByType.list] : [],
                        aObPage: [null, undefined].includes(result.data.getObservablePage.list) === false ? [...result.data.getObservablePage.list] : [],
                        isProcessing: false,
                    });
                })
                .catch((error) => {
                    this.setState({
                        dictionary: [],
                        aObPage: [],
                        isProcessing: false,
                    });
                    this.props.enqueueSnackbar(
                        "Sorry, there is an error occurred while fetching data.",
                        { variant: "error" }
                    );
                });
        });
    }

    loadObPages() {
        this.setState({
            isProcessing: true,
        }, () => {
            this.props.apolloClient.httpClient.query({
                query: GET_OBSERVABLE_PAGE
            })
                .then((result) => {
                    this.setState({
                        aObPage: [null, undefined].includes(result.data.getObservablePage.list) === false ? [...result.data.getObservablePage.list] : [],
                        isProcessing: false,
                    });
                })
                .catch((error) => {
                    this.setState({
                        aObPage: [],
                        isProcessing: false,
                    });
                    this.props.enqueueSnackbar(
                        "Sorry, there is an error occurred while fetching data.",
                        { variant: "error" }
                    );
                });
        });
    }

    saveObservablePage() {
        this.setState({
            isProcessing: true,
        }, () => {
            this.props.apolloClient.httpClient.mutate({
                mutation: SAVE_OBSERVABLE_PAGE,
                variables: {
                    observablePage: {
                        ...this.state.editingId === '' ? {} : { id: this.state.editingId },
                        dictionaryId: this.state.editingSelectedDictionary,
                        name: this.state.editingTitle,
                        enabled: this.state.editingEnabled === 'true',
                    },
                },
            })
                .then((result) => {
                    if (result.data.saveObservablePage.statusCode === 200) {
                        this.props.enqueueSnackbar(
                            "Successfully saved.",
                            { variant: "success" }
                        );
                        this.setState({
                            editingId: '', editingTitle: '', editingSelectedDictionary: '', editingEnabled: '', isShowingModal: false
                        }, () => this.loadObPages());
                    } else {
                        this.props.enqueueSnackbar(
                            "Sorry, there is an error occurred while saving data.",
                            { variant: "error" }
                        );
                        this.setState({
                            isProcessing: false,
                        });
                    }
                })
                .catch((error) => {
                    this.props.enqueueSnackbar(
                        "Sorry, there is an error occurred while saving data.",
                        { variant: "error" }
                    );
                    this.setState({
                        isProcessing: false,
                    });
                });
        });
    }

    render() {
        return <>
            <Grid container>
                {/* Title section */}
                <Grid item xs={6}>
                    <PageTitle
                        menuName="통계 페이지 정보"
                        title="통계 페이지 정보"
                        icon={<SettingsIcon />}
                    />
                </Grid>
            </Grid>

            {/* List section */}
            <div className="mt-20">
                <TableEntity
                    data={this.state.aObPage}
                    onClick={item => this.setState({
                        isShowingModal: true,
                        editingId: item.id,
                        editingTitle: item.name,
                        editingSelectedDictionary: item.dictionaryId,
                        editingEnabled: item.enabled.toString(),
                    })}
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: 20,
                }}
            >
                <Button
                    onClick={() => this.setState({ isShowingModal: true, editingId: '' })}
                    color="primary"
                    variant='outlined'
                >
                    추가하기
                </Button>
            </div>
            <Dialog
                open={this.state.isShowingModal}
                onClose={() => this.setState({ isShowingModal: false })}
                fullWidth={true}
                maxWidth={'md'}
                disableBackdropClick={true}
            >
                <DialogTitle>{"통계 페이지 상세정보"}</DialogTitle>
                <DialogContent>
                    <div
                        style={{
                            marginBottom: 20,
                        }}
                    >
                        통계 관련 설정
                    </div>
                    <TextField
                        label="페이지명"
                        variant="outlined"
                        style={{ width: '100%' }}
                        value={this.state.editingTitle}
                        onChange={(event) => this.setState({ editingTitle: event.target.value })}
                    />
                    <FormControl
                        // className={classes.formControl}
                        style={{ width: '100%' }}
                    >
                        <InputLabel id="page_url_selector">페이지 URL</InputLabel>
                        <Select
                            labelId="page_url_selector"
                            value={this.state.editingSelectedDictionary}
                            onChange={event => {
                                if (this.state.editingId === '') {
                                    const oFoundItem = this.state.dictionary.find(element => element.id === event.target.value);
                                    this.setState({
                                        editingSelectedDictionary: event.target.value,
                                        editingTitle: oFoundItem !== undefined ? oFoundItem.dicvalue : '',
                                    });
                                }
                            }}
                            readOnly={this.state.editingId !== ''}
                        >
                            {this.state.dictionary.map(oDic => (
                                <MenuItem key={oDic.id} value={oDic.id}>{`${process.env.REACT_DOMAIN}${oDic.dickey}`}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl
                        style={{ width: '50%' }}
                    >
                        <InputLabel id="is_enabled">사용여부</InputLabel>
                        <Select
                            labelId="is_enabled"
                            value={this.state.editingEnabled}
                            onChange={event => {
                                this.setState({
                                    editingEnabled: event.target.value,
                                })
                            }}
                        >
                            <MenuItem value='true'>사용함</MenuItem>
                            <MenuItem value='false'>사용 안함</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'flex-end' }}>
                    <div>
                        <Button
                            onClick={() => this.setState({ editingSelectedDictionary: '', editingEnabled: '', editingTitle: '', isShowingModal: false })}
                            disabled={this.state.isProcessing}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.saveObservablePage}
                            color="primary"
                            autoFocus
                            disabled={this.state.isProcessing || this.state.editingSelectedDictionary === '' || this.state.editingEnabled === '' || this.state.editingTitle.trim() === ''}
                        >
                            Save
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </>;
    }
}

const mapStateToProps = state => {
    return {
        apolloClient: state.apolloClient,
    };
};

export default withSnackbar(connect(mapStateToProps, null)(VisitsConfiguration));
