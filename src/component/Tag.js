import React, { Component } from 'react';
import Explore from './Explore'
import {Row, Col} from 'reactstrap'

class Tag extends Component {
    constructor(props){
        super(props);
        this.state={
            tag: this.props.location.pathname.slice(5,this.props.location.pathname.length),
        }
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs='1'/>
                    <Col xs='11'><span>Photo have tag <b>{this.state.tag}</b></span></Col>
                </Row>
                <Explore {...this.props} photo={this.props.photo}
                    loadFunc={()=>this.props.loadFunc(this.props.photo.curPage+1)} 
                    loadGridPhoto={()=>{return this.props.loadGridPhoto(this.state.tag)}}/>
            </div>
        );
    }
}

export default Tag;