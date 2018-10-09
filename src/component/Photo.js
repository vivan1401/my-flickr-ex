import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import './Photo.css';

class Photo extends Component {
    constructor(props){
        super(props);
        this.state={
            id: this.props.location.pathname.slice(7,this.props.location.pathname.length),
        }
    }

    componentDidMount(){
        if(this.props.photo.listPhotos.length === 0){
            this.props.loadFunc();
            this.props.history.push(`/photo/${this.state.id}`);
        }
    }

    handleClick(id){
        if(id){
            this.props.history.push(`/photo/${id}`);
            this.setState({
                id: id
            })
        }
    }

    render() {
        if(this.props.photo.listPhotos.length !== 0){
            let info;
            let prevId = null, nextId = null;
            for(let i = 0; i < this.props.photo.listPhotos.length;i++){
                if(this.props.photo.listPhotos[i].id === this.state.id){
                    info = this.props.photo.listPhotos[i];
                    nextId = this.props.photo.listPhotos[i+1].id;
                    if(i>0){
                        prevId = this.props.photo.listPhotos[i-1].id;
                    }
                    break;
                }
            }
            return (
                <div>
                    <Row className='PhotoView'>
                        <Col xs="1" onClick={()=>this.handleClick(prevId)}>
                            {this.props.photo.listPhotos[0].id === this.state.id ? "": "<"}
                        </Col>
                        <Col xs="10">
                            <img src={info.url_c}></img>
                        </Col>
                        <Col xs="1" onClick={()=>this.handleClick(nextId)}>
                            {">"}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs='1'></Col>
                        <Col xs="5" className="Owner">
                            {info.ownername}
                        </Col>
                        <Col xs="2">
                            Views: {info.views}
                        </Col>
                        <Col xs="4">
                            Taken on {info.datetaken}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs='1'></Col>
                        <Col xs="5"><div dangerouslySetInnerHTML={{__html: info.description._content}} /></Col>
                        <Col xs="5">Tags: {info.tags} </Col>
                    </Row> 
                </div>
            );
        }
        else{
            return <div></div>
        }
    }
}

export default Photo;