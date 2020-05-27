import React, { Component } from 'react'
import { Container, Row, Col } from 'react-materialize'
import MessageList from './MessageList'
import moment from 'moment';


const chatList = [];


export default class Chat extends Component {

    constructor(props) {
        super(props)

        this.state = {
            messages: chatList,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        chatList.push({ time: moment().calendar(), text: this.state.value });
        this.setState({ messages: chatList });
        console.log('A message was submitted: ' + this.state.value);
        console.log('state: ', this.state);
    }

    render() {
        return (
            <>
                <h6 className='title'>Social Feed</h6>
                <MessageList messages={this.state.messages} />
                <Row>
                    <Col s={12}>
                        <div className="center-align">
                            <form class="form-signin" onSubmit={this.handleSubmit}>
                                <div
                                    class="alert alert-warning alert-dismissible"
                                    role="alert"
                                >
                                </div>
                                <div className="form-group">
                                    <input
                                        name="message"
                                        value={this.state.value}
                                        type="text"
                                        maxlength="140"
                                        className="form-control"
                                        placeholder="Enter message (max 150 char)"
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <br></br>
                                <button
                                    type="submit"
                                    className="btn btn-flat default-text"
                                >Submit
                                            </button>
                            </form>
                        </div>
                    </Col>
                </Row>
            </>
        )
    }
}