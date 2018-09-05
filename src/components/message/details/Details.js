import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as apiActions from "../../../api/actions";
import * as viewActions from "../../../views/actions";
import {ButtonContainer, Button} from "../../constants/styles/components";
import {
    Container,
    DetailsContainer,
    DetailsClose,
    CloseButton,
    DetailsTitle,
    DetailsText,
    Label,
    Text,
    Backdrop
} from "../../constants/styles/details";

class TaskMessageDetails extends Component {
    constructor(props) {
        super(props);

        this.toggleEdit = this.toggleEdit.bind(this);
        this.editTaskMessage = this.editTaskMessage.bind(this);
        this.removeTaskMessage = this.removeTaskMessage.bind(this);

        this.state = {
            edit: false
        };
    }

    toggleEdit = () => {
        this.setState((prevState) => {
            return {edit: !prevState.edit};
        });
    };

    editTaskMessage = (data, id) => {
        this.toggleEdit();
        this.props.editTaskMessage(data, id);
    };

    removeTaskMessage = (id) => {
        this.props.removeTaskMessage(id);
        this.props.toggleTaskMessageDetails();
    };

    getTaskMessageDetails = (id) => {
        const taskMessages = this.props.apiState.data.taskMessages;
        return taskMessages.filter((t) => t.messageNo === id);
    };

    render() {
        let taskMessage = null;
        if (this.props.id) {
            const t = this.getTaskMessageDetails(this.props.id);
            const {timePosted, messageText} = t[0];

            taskMessage = (
                <Container>
                    <DetailsContainer>
                        <DetailsClose>
                            <CloseButton onClick={() => this.props.toggleTaskMessageDetails()}>&times;</CloseButton>
                        </DetailsClose>
                        <DetailsText>
                            <DetailsTitle>Message</DetailsTitle>
                            <Text><Label>Time posted:</Label> {timePosted}</Text>
                            <Text><Label>Text:</Label> {messageText}</Text>
                        </DetailsText>
                        <ButtonContainer>
                            <Button onClick={() => this.removeTaskMessage(this.props.id)}>Remove</Button>
                        </ButtonContainer>
                    </DetailsContainer>
                    <Backdrop onClick={() => this.props.toggleTaskMessageDetails()}/>
                </Container>
            );
        }
        return taskMessage;
    }
}

const mapStateToProps = state => {
    return {
        apiState: state.apiState,
        viewState: state.viewState
    };
};

const mapDispatchToProps = dispatch => {
    return {
        editTaskMessage: (taskMessage, id) => dispatch(apiActions.editTaskMessage(taskMessage, id)),
        viewFrame: (view, props) => dispatch(viewActions.viewFrame(view, props)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskMessageDetails);