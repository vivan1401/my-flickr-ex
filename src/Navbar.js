import React from 'react';
import {
    Navbar, NavbarBrand, Nav, NavItem,
    InputGroup, Button, InputGroupAddon, Input } from 'reactstrap'
  
export default class TitleBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        input: ""
      };
    }
    handleChange(e) {
        this.setState({
            input: e.target.value
        });
    }

    render() {
        return (
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">My Flickr Explore</NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <InputGroup>
                            <Input placeholder="Search for tag..." onChange={(e)=>this.handleChange(e)} />
                            <InputGroupAddon addonType="append">
                                <Button color="white" onClick={()=>{
                                    if(this.state.input !=="") this.props.history.push('/tag/'+this.state.input)}}>Search</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
  }
