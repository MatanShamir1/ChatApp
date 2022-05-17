import React, { Component } from "react";
import { Modal } from 'react-bootstrap';
import './MessageList.css';
//you can write rce and it gives you a className template!
//create a constructor using the keyword rconst.
class Message extends Component {

    constructor(props) {
        super(props)
        this.state = {
            click: false
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        this.setState({
            click: !this.state.click
        })
    }




    render() {
        if (this.props.content.content === "") {
            return <></>;
        }
        var float_dir = "justify-content-start";
        var msg_col = "msg-sender";
        if (this.props.content.sent === false) {
            msg_col = "msg-receiver";
            float_dir = "justify-content-end";
        }
        return (
            <div id="check" className="card-body p-4">
                <div className={"d-flex mb-4 " + float_dir}>
                    {float_dir === "justify-content-start" &&
                        (<div className="img_cont_msg">
                            <img src={this.props.userimg} className="circular-square" />
                        </div>)
                    }
                    {/* {this.props.content[1] === "text" && (
                        <div className={"msg_cotainer " + msg_col}>
                            {this.props.content[0]}
                            <span className="msg_time">{this.props.content[3]}</span>
                        </div>
                    )} */}
                    {true && (
                        <div className={"msg_cotainer " + msg_col}>
                            {this.props.content.content}
                            <span className="msg_time">{this.props.content.created}</span>
                        </div>
                    )}
                    {this.props.content[1] === "image" && (
                        <div>
                            {this.state.click &&
                                (<Modal show={this.state.click} onHide={this.handleClick} >
                                    <Modal.Header closeButton>
                                        <h3>Image</h3>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <img src={this.props.content[0]} className="modalStyle"></img>
                                    </Modal.Body>
                                </Modal>)}
                            <div className={"msg_cotainer " + msg_col}>
                                <img height="130" src={this.props.content[0]} className="check" onClick={this.handleClick} data-toggle="tooltip" data-placement="top" title="Click to zoom"></img>
                                <div className="msg_time_record">{this.props.content[3]}</div>
                            </div>
                        </div>
                    )}
                    {this.props.content[1] === "video" && (
                        <div className={"msg_cotainer " + msg_col}>
                            <video height="130" controls>
                                <source src={this.props.content[0]} type="video/mp4"></source>
                            </video>
                            <div className="msg_time_record">{this.props.content[3]}</div>
                        </div>
                    )}
                    {this.props.content[1] === "record" && (
                        <div className={"msg_cotainer " + msg_col}>
                            <audio controls>
                                <source src={this.props.content[0]}></source>
                            </audio>
                            <div className="msg_time_record">{this.props.content[3]}</div>
                        </div>
                    )}
                    {float_dir === "justify-content-end" &&
                        (<div className="img_cont_msg">
                            <img src={this.props.source} className="circular-square" />
                        </div>)
                    }
                </div>
            </div>
        )
    }
}
export default Message;