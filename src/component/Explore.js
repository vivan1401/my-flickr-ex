import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Gallery from 'react-grid-gallery';

const blockStyle = {
  display: "block",
  minHeight: "1px",
  width: "100%",
  border: "1px solid #ddd",
  overflow: "auto"
}

class Explore extends Component {
  render() {
    let listPhotos = this.props.loadGridPhoto();
    return (
        <InfiniteScroll
          pageStart={1}
          loadMore={()=>this.props.loadFunc()}
          hasMore={this.props.photo.curPage < this.props.photo.pages || this.props.photo.pages === 0 ? true: false}
          loader={<div className="loader" key={0}>Loading ...</div>}
          threshold={100}
        >
          <div style={blockStyle}>
            <Gallery onClickThumbnail={(index)=>{this.props.history.push(`/photo/${listPhotos[index].id}`)}}
              enableImageSelection={false} rowHeight={280}
              images={listPhotos}/>
          </div>
        </InfiniteScroll>
    );
  }
}

export default Explore;
