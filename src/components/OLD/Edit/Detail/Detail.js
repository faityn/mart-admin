import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

/**
 * @summary Edit
 * @version 0.1
 * @author Tuguldur Unurtsetseg
 * @package src/components/Users/Edit
 */
export default class Detail extends Component{

	/**
   * @override
   */
	render(){
		return(
			<Mutation mutation={UPDATE_MESSAGE}>
				{updateMessage => (
					<div className="message-container">
						<div className="text-container">Update</div> 
						<div className="moreActions-container">
						<input type='button' value="button"
							  onClick={() => { updateMessage({ variables: { 
									 id: 1, 
									 text: 'Gantsogt',
									 isFavorite: 'false' } });}}/>
						</div>
					</div>
				)}
			</Mutation>
		);
	}
}


const UPDATE_MESSAGE = gql`
mutation updateMessage($id: Int!,
					   $text: String!, 
					   $isFavorite:Boolean! ){
		updateMessage (id: $id,
					   text: $text, 
					   isFavorite:$isFavorite ){
			id,
			text,
			isFavorite
		} 		
}`;