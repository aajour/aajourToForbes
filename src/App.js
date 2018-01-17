import React, { Component } from "react";
import "./style.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      searchQuery: "",
      page: "1",
      overlaid: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.getPhotos = this.getPhotos.bind(this);
    this.onClick = this.onClick.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }
  getPhotos = () => {
    fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&
      api_key=ebe7ca35ee0281d75cdff334e0935984&tags=${
        this.state.searchQuery
      }&format=json&
      nojsoncallback=1&per_page=10&page=${this.state.page}`,
      { method: "GET" }
    )
      .then(res => res.json())
      .then(result => {
        this.setState(prevState => ({
          ...prevState,
          images: result.photos.photo
        }));
      });
  };
  handleChange(e) {
    this.setState({
      searchQuery: e.target.value
    });
  }
  onClick() {
    this.getPhotos();
  }

  loadMore() {
    const pageNumber = this.state.page++;
    this.setState(function(prevState, props) {
      return { page: prevState.page++ };
    });
    this.getPhotos(this.state.page);
  }
  render() {
    return (
      <div className="page">
        <div className="searchArea">
          <input
            type="text"
            placeholder="search about anything"
            onChange={this.handleChange}
          />
          <button onClick={this.onClick}>Search</button>
        </div>
        <div className="photos_wrapper">
          {this.state.images.map(image => (
            <div key={image.id}>
              <img
                key={image.id}
                alt="flicker"
                src={`https://c1.staticflickr.com/5/${image.server}/${
                  image.id
                }_${image.secret}_z.jpg`}
              />
            </div>
          ))}
        </div>
        <button className="loadBtn" onClick={this.loadMore}>
          Load more photos
        </button>
        <label>done by <a href='https://github.com/aajour'>@aajour</a></label>
      </div>
    );
  }
}

export default App;
