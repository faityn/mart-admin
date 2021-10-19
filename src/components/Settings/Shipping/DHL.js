import React from 'react';
import { 
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button, 
  LinearProgress,
  CircularProgress
} from '@material-ui/core';
import BackupIcon from '@material-ui/icons/Backup';
import GetAppIcon from '@material-ui/icons/GetApp';
import {DropzoneDialog} from 'material-ui-dropzone';
import axios from 'axios';
import { withSnackbar } from 'notistack';
import fileDownload from 'js-file-download';

/**
 * @summary DHL
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Settings
 */
class DHL extends React.Component {

  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      files: [],
      processing: 'load',
      dhl: []
    };
    
    this.token = localStorage.getItem(process.env.REACT_ACCESS_TOKEN_NAME);
    this._isMounted = false;
  }

  /**
   * @override
   */
  async componentDidMount() {
    this._isMounted = true;
    let url = process.env.REACT_APP_DOMAIN + "/getDHL"
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
      dhl: response.data,
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
    let url = process.env.REACT_APP_DOMAIN + "/import/dhl";

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
            url: process.env.REACT_APP_DOMAIN + "/getDHL",
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
        dhl: promise.response.data,
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

    const url = process.env.REACT_APP_DOMAIN + "/download/DHL";

    await axios({
      headers: {
        authorization: this.token ? `Bearer ${this.token}` : "",
      },
      method: 'GET',
      url: url,
      responseType: "arraybuffer"
    }).then(response => {
      fileDownload(response.data, "DHL.xlsx");      
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
    if (this.state.processing === 'load') 
      return <LinearProgress />;

    return <React.Fragment>
      <div style={{width: '100%', height: '700px', maxHeight: '700px', overflow: "auto"}}>
        {/* Table */}
        <Table>
          <TableBody>
            <TableRow className="zozo">
              <TableCell></TableCell>
              {(this.state.dhl || []).map((item, index) => {
                return <TableCell key={index}>{item.country}</TableCell>
              })}
            </TableRow>
            
            {((this.state.dhl[0] || {}).datas || []).map((data, index) => {
              return <TableRow key={index}>
                <TableCell>{data.weight}</TableCell>
                {(this.state.dhl || []).map((country, index) => {
                  return <TableCell key={index}>{country.datas.find(f =>f.weight === data.weight).price}</TableCell>
                })}
              </TableRow>
            })}
          </TableBody>
        </Table>
      </div>

      {/* Excel import and export */}
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
      </Grid>

      <DropzoneDialog
        acceptedFiles={['application/vnd.ms-excel', 'text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
        maxFileSize={52428800}
        open={this.state.open}
        filesLimit={1}
        showPreviews={true}
        onSave={this.onUpload.bind(this)}
        onClose={this.handleClose.bind(this)}
      />
    </React.Fragment>
  }
}

export default withSnackbar(DHL);