import React from 'react';
import './App.css';
import Navbar from './Navbar';
import Explore from './component/Explore';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Tag from './component/Tag';
import Photo from './component/Photo';
import axios from 'axios';
import {api_key} from './config';

const url = (page) => (`https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${api_key}&extras=url_m%2C+url_c%2C+owner_name%2C+views%2C+tags%2C+description%2C+date_taken&per_page=20&page=${page}&format=json&nojsoncallback=1`);

const captionStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  maxHeight: "240px",
  overflow: "hidden",
  position: "absolute",
  bottom: "0",
  width: "100%",
  color: "white",
  padding: "10px",
  fontSize: "90%"
};

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      listPhotos: [],
      curPage: 0,
      pages: 0
    }
  }

  loadFunc(page){
    axios.get(url(page))
    .then(res => {
      this.setState({
        listPhotos: [...this.state.listPhotos,...res.data.photos.photo],
        curPage: page,
        pages: res.data.photos.pages
      })
    })
    .catch(err => {

    })
  }

  loadGridPhoto(){
    return this.state.listPhotos.map((photo, index) => {
      return {
        id: photo.id,
        src: photo.url_m,
        thumbnail: photo.url_m,
        thumbnailWidth: parseInt(photo.width_m,10),
        thumbnailHeight: parseInt(photo.height_m,10),
        customOverlay: (
          <div style={captionStyle}>
            <b>{photo.title}</b>
            <div>Owner: {photo.ownername}</div>
            <div>Views: {photo.views}</div>
          </div>)}
    })
  }

  searchTag(tag){
    let photoInTag=[];
    this.state.listPhotos.map((photo,index)=>{
      if(photo.tags.search(tag) !== -1){
        photoInTag.push({
          id: photo.id,
          src: photo.url_m,
          thumbnail: photo.url_m,
          thumbnailWidth: parseInt(photo.width_m,10),
          thumbnailHeight: parseInt(photo.height_m,10),
          customOverlay: (
            <div style={captionStyle}>
              <b>{photo.title}</b>
              <div>Owner: {photo.ownername}</div>
              <div>Views: {photo.views}</div>
            </div>)});
      }
      return '';
    });
    return photoInTag;
  }

  render() {
    return (
      <Router>
        <div>
            <Route render={(props)=><Navbar {...props}/>}/>
            <Route exact path="/" render={(props)=><Explore {...props} photo={this.state}
                    loadFunc={()=>this.loadFunc(this.state.curPage+1)} 
                    loadGridPhoto={()=>{return this.loadGridPhoto()}}/>}/>
            <Route path="/photo" render={(props)=><Photo {...props} photo={this.state} 
                    loadFunc={()=>this.loadFunc(this.state.curPage+1)}/>}/>
            <Route path="/tag" render={(props)=><Tag {...props} photo={this.state}
                    loadFunc={()=>this.loadFunc(this.state.curPage+1)} 
                    loadGridPhoto={(tag)=>{return this.searchTag(tag)}}/>}/>
        </div>
      </Router>
    );
  }
}

export default App;
