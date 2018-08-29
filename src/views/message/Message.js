import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Container, TextContainer, Button} from "../../components/constants/components";
import * as actions from '../../api/actions';
import MessageData from './MessageData';
import * as viewActions from "../actions";

class Message extends Component {
    state = {
        edit: false,
        error: false
    };

    toggleEdit = () => {
        this.setState((prevState) => {
            return {edit: !prevState.edit};
        });
    };

    editTaskMessage = (data, id) => {
        this.toggleEdit();
        this.props.editTaskMessage(data, id);
    };

    render() {
        let editTaskMessage = null;
        if (this.state.edit) {
            editTaskMessage = <MessageData id={this.props.id}
                                           edit={this.state.edit}
                                           title={"Edit task message"}
                                           toggleEdit={this.toggleEdit}
                                           editTaskMessage={this.editTaskMessage}
                                           messageNo={this.props.messageNo}
                                           messageText={this.props.messageText}
                                           taskNo={this.props.taskNo}/>
        }

        return (
            <Container key={this.props.id}>
                <TextContainer>
                    {this.props.messageText}
                </TextContainer>
                <Button onClick={this.toggleEdit}>Edit</Button>
                {editTaskMessage}
                <Button onClick={() => this.props.removeTaskMessage(this.props.id)}>Remove</Button>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        apiState: state.apiState
    };
};

const mapDispatchToProps = dispatch => {
    return {
        viewPopup: (popup) => dispatch(viewActions.viewPopup(popup)),
        editTaskMessage: (taskMessage, id) => dispatch(actions.editTaskMessage(taskMessage, id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);