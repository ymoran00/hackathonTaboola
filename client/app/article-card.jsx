import React from 'react';
import ReactDOM from 'react-dom';

export default class ArticleCard extends React.Component {

  constructor(props) {
    super(props);
  }

  fixThumbnailUrl(url) {
    var newUrl = url.split('!-#');
    if (newUrl && newUrl[0]) {
      return newUrl[0];
    }
    return url;
  }

  render() {
      return (
        <div className="article-card" style={{backgroundImage: "url("+this.fixThumbnailUrl(this.props.data.thumbnailUrl)+")"}}>
          <div className="article-card-overlay ellipsis">
            <h2>{this.props.data.title}</h2>
            <h3>{this.props.data.publisher}</h3>
            <p className="abstract">{this.props.data.text}</p>
          </div>
        </div>
    );
  }
}
