import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

class Toolbar extends React.Component {

  constructor(props) {
		super(props);
		this.state = {
			opened: false,
		};
		this.toggleBox = this.toggleBox.bind(this);
	}
  
	toggleBox() {
		const { opened } = this.state;
		this.setState({
			opened: !opened,
		});
	}

  render(props){

    var { children } = this.props;
		const { opened } = this.state;

    return (
      <div>
        <Button  onClick={this.toggleBox}>Search filter</Button>
        <Button >Export</Button>
        <Link to={'/user/create'}>
          <Button color="primary" variant="contained">
            Add user
          </Button>
        </Link>

        {opened && (					
          <div class="boxContent">
            {children}
          </div>
        )}
      </div>
    );
  }
};


export default Toolbar;
