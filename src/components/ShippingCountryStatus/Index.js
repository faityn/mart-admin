import React from 'react';
import PageTitle from '../../core/common/Partials/PageTitle';
import {
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button
}
from '@material-ui/core';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import {DropzoneDialog} from 'material-ui-dropzone';
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataSet1 = [
    {
        name: "Johson",
        amount: 30000,
        sex: 'M',
        is_married: true
    },
    {
        name: "Monika",
        amount: 355000,
        sex: 'F',
        is_married: false
    },
    {
        name: "John",
        amount: 250000,
        sex: 'M',
        is_married: false
    },
    {
        name: "Josef",
        amount: 450500,
        sex: 'M',
        is_married: true
    }
];

var dataSet2 = [
    {
        name: "Johnson",
        total: 25,
        remainig: 16
    },
    {
        name: "Josef",
        total: 25,
        remainig: 7
    }
];


class ShippingCountryStatus extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      files: []
    };
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  handleSave(files) {
    //Saving files to state for further use and closing Modal.
    this.setState({
      files: files,
      open: false
    });
  }

  handleOpen() {
    this.setState({
      open: true,
    });
  }

  render() {
    return <React.Fragment>
      {/* Title section */}
      <Grid container>
        <Grid item xs={6}>
          {/* Title */}
          <PageTitle 
            menuName="Shipping country status"
            title="Shipping country status" 
            icon={<LocalShippingIcon />} 
          />
        </Grid>
      </Grid>

      <div className="card mt-20">
        {/* Main content */}
        <Grid container>
          <Grid item md={12} xs={12}>
            <TableContainer>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={3}>
                      Details
                    </TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Desc</TableCell>
                    <TableCell align="right">Qty.</TableCell>
                    <TableCell align="right">Unit</TableCell>
                    <TableCell align="right">Sum</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        {/* Excel import and export */}
        <Grid container className="mt-20">
          <Grid item xs={12} className="text-right">
            <Button
              variant="contained"
              color="default"
              size="small"
              startIcon={<ImportExportIcon />}
              onClick={this.handleOpen.bind(this)}
            >
              Excel upload 
            </Button>

            <ExcelFile element={<Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<ImportExportIcon />}
              className="ml-20"
            >
              Excel export 
            </Button>}>
              <ExcelSheet data={dataSet1} name="Employees">
                <ExcelColumn label="Name" value="name"/>
                <ExcelColumn label="Wallet Money" value="amount"/>
                <ExcelColumn label="Gender" value="sex"/>
                <ExcelColumn label="Marital Status"
                              value={(col) => col.is_married ? "Married" : "Single"}/>
              </ExcelSheet>
              <ExcelSheet data={dataSet2} name="Leaves">
                <ExcelColumn label="Name" value="name"/>
                <ExcelColumn label="Total Leaves" value="total"/>
                <ExcelColumn label="Remaining Leaves" value="remaining"/>
              </ExcelSheet>
            </ExcelFile>
          </Grid>
        </Grid>
      </div>

      <DropzoneDialog
        maxFileSize={30000000}
        open={this.state.open}
        filesLimit="1"
        showPreviews={true}
        onSave={this.handleSave.bind(this)}
        onClose={this.handleClose.bind(this)}
      />
    </React.Fragment>
  }
}

export default ShippingCountryStatus;