import React, {Component} from "react";
 //you can write rce and it gives you a class template!
 //create a constructor using the keyword rconst.
class Contact extends Component {

    constructor(props){
        super(props)
        this.state={
            isCurrent: 'list-group-item list-group-item-action'
        }
        this.changeState = this.changeState.bind(this)
    }

    changeState() {
        if(this.state.isCurrent === 'list-group-item list-group-item-action'){ 
            this.setState((prevState, props)=>(
                {isCurrent:'list-group-item list-group-item-action active'})) //using setState re-renders. anything else doesn't render.
        } else {
            this.setState({isCurrent:'list-group-item list-group-item-action'})//we can send as a second paramter a pointer to a function, that will execute after the setstate.
        }
        
    }

    render(){
        return(
            <li class={this.state.isCurrent} onClick = {this.changeState}>
                <div class="ms-2 me-auto">
                <span class="badge bg-primary rounded-pill to-right">14</span>
                <div class="fw-bold">
                    {this.props.name}
                </div>
                Have you seen the news?
                </div>                
            </li> //do that the onclick will set this to true. it is essential to use () => because the function should know what is the component, "this".
        )
    }
}
export default Contact;