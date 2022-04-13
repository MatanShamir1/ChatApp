import React, { Component } from "react";
//you can write rce and it gives you a className template!
//create a constructor using the keyword rconst.
class Message extends Component {

    constructor(props) {
        super(props)
    }

 
    

    render() {
        var float_dir = "justify-content-start";
        var msg_col = "msg-sender";
        if (this.props.content[2] === "rcv") {
            msg_col = "msg-receiver";
            float_dir = "justify-content-end";
        }

        return (
            <div id="check" className="card-body p-4">
                <div className={"d-flex mb-4 " + float_dir}>
                    {float_dir === "justify-content-start" &&
                        (<div className="img_cont_msg">
                            <img src={this.props.source} className="rounded-circle user_img_msg" />
                        </div>)
                    }
                    {this.props.content[1] === "text" && (
                        <div className={"msg_cotainer " + msg_col}>
                            {this.props.content[0]}
                            <span className="msg_time">8:40 AM, Today</span>
                        </div>
                    )}
                    {this.props.content[1] === "image" && (
                        <div>
                            <img src={this.props.content[0]} className="check"></img>
                        </div>
                    )}
                    {this.props.content[1] === "video" && (
                        <video width="240" height="180" controls>
                            <source src={this.props.content[0]} type="video/mp4"></source>
                        </video>
                    )}
                    {this.props.content[1] === "record" && (
                        <audio controls>
                            <source src={this.props.content[0]}></source>
                        </audio>
                    )}
                    {float_dir === "justify-content-end" &&
                        (<div className="img_cont_msg">
                            <img src={this.props.source} className="rounded-circle user_img_msg" />
                        </div>)
                    }
                </div>
            </div>
        )
    }
}
export default Message;