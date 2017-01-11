import React from 'react';
import ReactDOM from 'react-dom';

export default class ArticleCard extends React.Component {

constructor(props) {
  super(props);
}
  render() {
      return (
        <div className="article-card-container">
          <img src={this.props.data.thumbnail_url} />
          <div className="article-card-overlay">
            <h2>{this.props.data.title}</h2>
            <h3>{this.props.data.publisher}</h3>
            <span className="abstract">{this.props.data.text}</span>
          </div>
        </div>
    );
  }
}
