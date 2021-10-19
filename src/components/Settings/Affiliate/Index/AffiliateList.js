import React from 'react';
import { withSnackbar } from 'notistack';
import { 
    Grid,
    Button,
} from '@material-ui/core';
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';

import PageTitle from '../../../../core/common/Partials/PageTitle';
import List from './List';
import ListProduct from './ListProduct';
import Search from './Search';

class AffiliateTable extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            search: {},
            isShowSearchPanel: false,
            rowsPerPage: 10,
            pageNumber: 1,
        };

        this.toggleSearchPanel = this.toggleSearchPanel.bind(this);
        this.search = this.search.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    toggleSearchPanel() {
        this.setState({
            isShowSearchPanel: !this.state.isShowSearchPanel,
        });
    }

    search(childrenName, childrenState) {
        this.setState({
          search: {
            ...(childrenState.affiliateName.length > 0 ? { affiliateName: childrenState.affiliateName } : {}),
            ...(childrenState.dateStart.length > 0 ? { dateFrom: childrenState.dateStart } : {}),
            ...(childrenState.dateEnd.length > 0 ? { dateTo: childrenState.dateEnd } : {}),
          },
          pageNumber: 1,
        }); 
    }
    
    onReset(event) {
        this.setState({
            search: {},
            pageNumber: 1,
        });
    }

    
    render() {
        return <>
            <Grid container>
                {/* Title section */}
                <Grid item xs={6}>
                    <PageTitle 
                        menuName="Affiliate list" 
                        title="Affiliate list" 
                        icon={<PhotoAlbumIcon />} 
                    />
                </Grid>

                {/* Button section */}
                <Grid item xs={6} className="text-right">
                    {/* Search */}
                    <Button
                        variant="contained" 
                        color="default" 
                        size="small" 
                        startIcon={
                            this.state.isShowSearchPanel ? <ZoomOutIcon /> : <ZoomInIcon />
                        } 
                        onClick={this.toggleSearchPanel}
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>

            {/* List section */}
            <div className="mt-20">
                {/* Search div */}
                {this.state.isShowSearchPanel ?
                    <div className="card">
                        <Search 
                            searchWord={this.search} 
                            onReset={this.onReset}
                        />
                    </div> : null
                }
                
                <List
                    search={this.state.search}
                    rowsPerPage={this.state.rowsPerPage}
                    pageNumber={this.state.pageNumber}
                />
                <ListProduct
                    search={this.state.search}
                    rowsPerPage={this.state.rowsPerPage}
                    pageNumber={this.state.pageNumber}
                />
            </div>
        </>;
    }
}

export default withSnackbar(AffiliateTable);