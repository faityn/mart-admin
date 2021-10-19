import React from "react";
import { withSnackbar } from "notistack";
import PageTitle from "../../../../core/common/Partials/PageTitle";
import { connect } from "react-redux";
import SubjectIcon from '@material-ui/icons/Subject';
import SaveIcon from "@material-ui/icons/Add";
import DeleteIcon from '@material-ui/icons/Delete';
import { CircularProgress, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import FaqItem from './FaqItem';
import { GET_AFFILIATE_FAQ, SAVE_AFFILIATE_FAQ, DELETE_AFFILIATE_FAQ } from "../../../Queries/Affiliate";

class Term extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // state
    this.state = {
      isProcessing: false,
      items: [],
      editingId: '',
      editingTitle: '',
      editingDesc: '',
      isShowingModal: false,
    };

    // Events
    this.loadData = this.loadData.bind(this);
    this.saveEditingFaq = this.saveEditingFaq.bind(this);
    this.deleteEditingFaq = this.deleteEditingFaq.bind(this);
  }

  /**
   * @override
   */
  async componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.setState({
      isProcessing: true,
    }, () => {
      this.props.apolloClient.httpClient.query({
        query: GET_AFFILIATE_FAQ,
      })
      .then((result) => {
        this.setState({
          items: [null, undefined].includes(result.data.getAffiliateFaqs.list) === false ? [...result.data.getAffiliateFaqs.list] : [],
          isProcessing: false,
        });
      })
      .catch((error) => {
        this.setState({
          items: [],
          isProcessing: false,
        });
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while fetching data.",
          { variant: "error" }
        );
      });
    });
  }

  saveEditingFaq() {
    if (this.state.isProcessing) return;

    if (this.state.editingTitle.length === 0 || this.state.editingDesc.length === 0) {
      this.props.enqueueSnackbar("Question or answer is empty", {
        variant: "info",
      });
      return;
    }
    
    this.props.enqueueSnackbar("The saving process is being started ...", {
      variant: "info",
    });

    this.setState({
      isProcessing: true,
    }, () => {
      this.props.apolloClient.httpClient.mutate({
        mutation: SAVE_AFFILIATE_FAQ,
        variables: {
          faq: {
            id: this.state.editingId,
            title: this.state.editingTitle,
            description: this.state.editingDesc,
          },
        },
      })
      .then((result) => {
        if (result.data.saveAffiliateFaq.statusCode === 200) {
          this.props.enqueueSnackbar(
            "FAQ has been successfully saved.",
            { variant: "success" }
          );
          this.setState({
            editingId: '', editingTitle: '', editingDesc: '', isShowingModal: false
          });
          this.loadData();
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

  deleteEditingFaq() {
    if (this.state.isProcessing) return;
    
    if (this.state.editingId.length === 0) return;

    this.props.enqueueSnackbar("The saving process is being started ...", {
      variant: "info",
    });

    this.setState({
      isProcessing: true,
    }, () => {
      this.props.apolloClient.httpClient.mutate({
        mutation: DELETE_AFFILIATE_FAQ,
        variables: {
          id: this.state.editingId,
        },
      })
      .then((result) => {
        if (result.data.deleteAffiliateFaq.statusCode === 200) {
          this.props.enqueueSnackbar(
            "FAQ has been successfully deleted.",
            { variant: "success" }
          );
          this.setState({
            editingId: '', editingTitle: '', editingDesc: '', isShowingModal: false
          });
          this.loadData();
        } else {
          this.props.enqueueSnackbar(
            "Sorry, there is an error occurred while deleting data.",
            { variant: "error" }
          );
          this.setState({
            isProcessing: false,
          });
        }
      })
      .catch((error) => {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while deleting data.",
          { variant: "error" }
        );
        this.setState({
          isProcessing: false,
        });
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        {/* Title section */}
        <Grid container>
          <Grid item>
            {/* Title */}
            <PageTitle
              menuName="FAQ for affiliate"
              title="FAQ for affiliate"
              icon={<SubjectIcon />}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item md={10}>
            <div className="card mt-20" >
              <div style={{ borderTop: '1px solid grey' }}>
                {this.state.items.map(item => {
                  return (
                    <FaqItem
                      key={item.id}
                      title={item.title}
                      description={item.description}
                      isProcessing={this.state.isProcessing}
                      onEdit={() => this.setState({ editingId: item.id, editingTitle: item.title, editingDesc: item.description, isShowingModal: true })}
                    />
                  );
                })}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 30 }}>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  disabled={this.state.isProcessing}
                  startIcon={
                    this.state.isProcessing ? (
                      <CircularProgress color="white" size="1rem" />
                    ) : (
                      <SaveIcon fontSize="small" className="mr-10" />
                    )
                  }
                  onClick={() => this.setState({ editingId: '', editingTitle: '', editingDesc: '', isShowingModal: true })}
                >
                  New FAQ
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
        <Dialog
          open={this.state.isShowingModal}
          onClose={() => this.setState({ isShowingModal: false })}
        >
          <DialogTitle>{"Editing FAQ"}</DialogTitle>
          <DialogContent>
            <TextField
              label="Question"
              variant="outlined"
              style={{ width: '100%' }}
              value={this.state.editingTitle}
              onChange={(event) => this.setState({ editingTitle: event.target.value })}
            />
            <TextField
              label="Answer"
              multiline
              rows={4}
              variant="outlined"
              style={{ width: '100%', marginTop: 20 }}
              value={this.state.editingDesc}
              onChange={(event) => this.setState({ editingDesc: event.target.value })}
            />
          </DialogContent>
          <DialogActions style={{ justifyContent: 'space-between' }}>
            <div>
              {this.state.editingId !== '' && (
                <Button
                  onClick={this.deleteEditingFaq}
                  disabled={this.props.isProcessing}
                >
                  <DeleteIcon/>
                </Button>
              )}
            </div>
            <div>
              <Button
                color="primary"
                onClick={() => this.setState({ editingId: '', editingTitle: '', editingDesc: '', isShowingModal: false })}
                disabled={this.props.isProcessing}
              >
                Cancel
              </Button>
              <Button
                onClick={this.saveEditingFaq}
                color="primary"
                autoFocus
                disabled={this.props.isProcessing}
              >
                Save
              </Button>
            </div>
          </DialogActions>
        </Dialog>
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

export default withSnackbar(connect(mapStateToProps, null)(Term));
