import React,{Component} from 'react';
import styled from 'styled-components';
import E from 'event-emitter';


const Container = styled.div`
    background-color:#444;
    color: white;
    padding: 16px;
    position: absolute;
    top: ${props=>props.top}px;
    right: 16px;
    z-index:999;
    transition: top 0.5s ease;

    >i{
        margin-left:8px;
    }
`;

const emitter=new E();

export const notify=(msg)=>{
    emitter.emit('notification',msg);
}
export default class Notifications extends Component{

    constructor(props) {
        super(props);
        this.state = {
            top:-100,
            msg:'', 
        };
        this.timeout=null;
        emitter.on('notification',(msg)=>{
            this.onShow(msg);
        });
    }

    onShow=(msg)=>{
        if(this.timeout){
            clearTimeout(this.timeout);
            this.this.setState({top: 25},()=>{
                this.timeout = setTimeout(() => {
                    this.showNotification(msg);}, 500); 
        });
        }
        else
        {
            this.showNotification(msg);
        }
    }
    showNotification=(msg)=>{
        this.this.setState({
            top: 25,
            msg
        },()=>{
        this.timeout = setTimeout(() => {this.this.setState({top: -100})}, 3000); 
        });
    } 
render(){
     return(
         
        <Container top={this.state.top}>Example text.<i className="fa fa-bell"></i></Container>
        
     );
}
}