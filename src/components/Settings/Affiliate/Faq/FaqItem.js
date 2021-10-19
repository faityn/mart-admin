import React from 'react';
import { IconButton, CircularProgress } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Settings";

class FaqItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showingAnswer: false,
		}

		this.onToggle = this.onToggle.bind(this);
	}

	onToggle() {
		this.setState({ showingAnswer: !this.state.showingAnswer });
	}

	render() {
		return <div style={{ borderBottom: '1px solid grey' }}>
			<div
				style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}
				onClick={this.onToggle}
			>
				<div style={{ display: 'flex', minHeight: 40, alignItems: 'center' }}>
					<div style={{ color: 'red', minWidth: 80, textAlign: 'center' }}>
						Q
					</div>
					{this.props.title}
				</div>
				<div style={{ display: 'flex', alignItems: 'center', paddingRight: 20 }}>
					{this.state.showingAnswer === true && (
						<>
							-
						</>
					)}
					{this.state.showingAnswer === false && (
						<>
							+
						</>
					)}
				</div>
			</div>
			{this.state.showingAnswer === true && (
				<div style={{ display: 'flex', justifyContent: 'space-between', minHeight: 40, backgroundColor: '#efefef', alignItems: 'center' }}>
					<div style={{ display: 'flex' }}>
                        <div style={{ minWidth: 80, textAlign: 'center' }}>
                            A
                        </div>
                        {this.props.description}
                    </div>
                    <div
                        style={{
                            paddingRight: 20,
                        }}
                    >
                        <IconButton
                            size="small"
                            color="primary"
                            disabled={this.props.isProcessing}
                            onClick={this.props.onEdit}
                        >
                            <SaveIcon fontSize="inherit" />
                        </IconButton>
                    </div>
				</div>
			)}
		</div>
	}
}

export default FaqItem;