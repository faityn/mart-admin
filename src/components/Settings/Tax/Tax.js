import React from 'react';
import PageTitle from '../../../core/common/Partials/PageTitle';
import {
  Grid,
  Button,
  LinearProgress,
  Table,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress
}
from '@material-ui/core';
import {DropzoneDialog} from 'material-ui-dropzone';
import axios from 'axios';
import { withSnackbar } from 'notistack';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import BackupIcon from '@material-ui/icons/Backup';
import GetAppIcon from '@material-ui/icons/GetApp';
import fileDownload from 'js-file-download';

/**
 * @summary Tax
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Settings
 */
class Tax extends React.Component {
  
  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      files: [],
      processing: 'load',
      tax: []
    };
    
    this.token = localStorage.getItem(process.env.REACT_ACCESS_TOKEN_NAME);
    this._isMounted = false;
  }

  /**
   * @override
   */
  async componentDidMount() {
    this._isMounted = true;
    let url = process.env.REACT_APP_DOMAIN + "/getTax";
    let response = [];

    await axios({
      headers: {
        authorization: this.token ? `Bearer ${this.token}` : "",
      },
      method: 'GET',
      url: url,
      responseType: 'json'
    }).then(_response => {
      response = _response;
    }).catch(error => {
      this._isMounted && this.props.enqueueSnackbar('Sorry, there is an error occurred while fetching data.', {variant: 'error'});
    });

    this._isMounted && this.setState({
      tax: response.data,
      processing: ''
    });
  }

  /**
   * @override
   */
  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * @summary Upload file
   * @param {Array} files 
   */
  async onUpload(files) {

    // formData
    const formData = new FormData();

    let file = files ? files[0] : null;
    let url = process.env.REACT_APP_DOMAIN + "/import/taxConfig";

    this.setState({
      processing: 'upload',
      open: false,
    });

    formData.append("file", file);

    this.props.enqueueSnackbar('The saving process is being started ...', {variant: 'info'});

    let promise = await new Promise(resolve => axios({
        url: url,
        method: "POST",
        headers: {
          authorization: this.token ? `Bearer ${this.token}` : "",
        },
        data: formData
      }).then(async _response => {
        if(_response.data === "FAILURE") {
          this._isMounted && this.props.enqueueSnackbar('Sorry, there is an error in excel file.', {variant: 'error'});
          resolve({success: false});
        } else if(_response.data === "SUCCESS") {
          this._isMounted && this.props.enqueueSnackbar('File has been successfully uploaded.', {variant: 'success'});
          this._isMounted && this.props.enqueueSnackbar('Refreshing data table.', {variant: 'info'});
          
          await axios({
            headers: {
              authorization: this.token ? `Bearer ${this.token}` : "",
            },
            method: 'GET',
            url: process.env.REACT_APP_DOMAIN + "/getTax",
            responseType: 'json'
          }).then(_response => {
            resolve({
              success: true,
              response: _response
            })
          }).catch(error => {
            resolve({
              success: false
            })
          });
        } else if(_response.data === "SHEET DOESNT EXISTS") {
          this._isMounted && this.props.enqueueSnackbar('Sorry, there is an error in excel sheet.', {variant: 'error'});
          resolve({success: false});
        }
      }).catch(error => {
        this._isMounted && this.props.enqueueSnackbar('Sorry, there is an error occurred while uploading.', {variant: 'error'});
        resolve({success: false});
      })
    );

    if (promise.success) {
      this._isMounted && this.props.enqueueSnackbar('Data table has been refreshed.', {variant: 'success'});

      this._isMounted && this.setState({
        tax: promise.response.data,
        processing: ''
      });
    }
    else {
      this._isMounted && this.props.enqueueSnackbar('Sorry, there is an error occurred while fetching data.', {variant: 'error'});
      this._isMounted && this.setState({
        processing: ''
      });
    }
  }

  /**
   * @summary Download
   */
  async onDownload() {
    if (this.state.processing === 'download')
      return;

    this.setState({
      processing: 'download'
    });

    const url = process.env.REACT_APP_DOMAIN + "/download/taxConfig";

    await axios({
      headers: {
        authorization: this.token ? `Bearer ${this.token}` : "",
      },
      method: 'GET',
      url: url,
      responseType: "arraybuffer"
    }).then(response => {
      fileDownload(response.data, "Tax.xlsx") ;
    }).catch(error => {
      this._isMounted && this.props.enqueueSnackbar('Sorry, there is an error occurred while downloading.', {variant: 'error'});
    });

    this._isMounted && this.setState({
      processing: ''
    });
  }

  /**
   * @summary Open upload dialog
   */
  handleOpen() {
    this.setState({
      open: true,
    });
  }

  /**
   * @summary Close upload dialog
   */
  handleClose() {
    this.setState({
      open: false
    });
  }

  /**
   * @override
   */
  render() {
    return <React.Fragment>
      {/* Title section */}
      <Grid container>
        <Grid item xs={6}>
          {/* Title */}
          <PageTitle 
            menuName="Tax"
            title="Tax" 
            icon={<LocalAtmIcon />} 
          />
        </Grid>
      </Grid>

      <div className="card mt-20">
        {this.state.processing === 'load' ? <LinearProgress /> : null}

        <div style={{width: '100%', height: '700px', maxHeight: '700px', overflow: "auto"}}>
          {/* Table */}
          <Table>
            <TableBody>
              <TableRow>
                <TableCell></TableCell>
                {(this.state.tax || []).map((item, index) => {
                  return <TableCell key={index}>{item.country}</TableCell>
                })}
              </TableRow>
              
              {((this.state.tax[0] || {}).datas || []).map((data, index) => {
                return <TableRow key={index}>
                  <TableCell>{data.name}</TableCell>
                  {(this.state.tax || []).map((country, index) => {
                    return <TableCell key={index}>{country.datas.find(f =>f.name === data.name).tax}</TableCell>
                  })}
                </TableRow>
              })}
            </TableBody>
          </Table>
        </div>

        {/* Excel import and export */}
        {this.state.processing !== 'load' ? 
          <Grid container className="mt-20">
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={this.state.processing === 'upload' ? <CircularProgress color="white" size="1rem" /> : <BackupIcon />}
                onClick={this.handleOpen.bind(this)}
                disabled={this.state.processing === 'upload'}
              >
                Upload 
              </Button>

              <Button
                variant="outlined"
                color="default"
                size="small"
                startIcon={this.state.processing === 'download' ? <CircularProgress color="white" size="1rem" /> : <GetAppIcon />}
                className="ml-20"
                onClick={this.onDownload.bind(this)}
                disabled={this.state.processing === 'download'}
              >
                Download
              </Button>
            </Grid>
          </Grid> : null
        }

        <DropzoneDialog
          acceptedFiles={['application/vnd.ms-excel', 'text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
          maxFileSize={52428800}
          open={this.state.open}
          filesLimit={1}
          showPreviews={true}
          onSave={this.onUpload.bind(this)}
          onClose={this.handleClose.bind(this)}
        />
      </div>
    </React.Fragment>
  }
}

export default withSnackbar(Tax);