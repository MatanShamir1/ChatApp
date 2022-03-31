import React, { Component } from "react";
//you can write rce and it gives you a class template!
//create a constructor using the keyword rconst.
//shift+alt+f formatting!
class Chat extends Component {
    render() {
        return (
            <div id="contacts" className="card">
                <ul class="list-group list-group-flush"></ul>
                <Contact name="Coral" />

                <Contact name="Itamar" />

                <Contact name="Amit" />
            </div>
        )
    }
}
export default Chat;