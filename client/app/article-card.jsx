import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import ExpandedArticle from './expanded-article';

export default class ArticleCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      expandClass: '',
      frameUrl: '#'
    };

    this.handleExpandChange = this.handleExpandChange.bind(this);
    this.handleCollapse = this.handleCollapse.bind(this);
  }

  fixThumbnailUrl(url) {
    if (url) {
      var newUrl = url.split('!-#');
      if (newUrl && newUrl[0]) {
        return newUrl[0];
      }
    } else {
      return '/dist/res/oops-image.gif';
    }
    return url;
  }

  handleExpandChange(expanded) {
    let newClass = '';
    let frameUrl = '#';
    if (expanded) {
      newClass = 'expanded';
      frameUrl = this.props.data.url;
    }
    this.setState({expanded: expanded, expandClass: newClass, frameUrl: frameUrl});
  }

  handleCollapse() {
    this.handleExpandChange(false);
  }

  render() {
      return (
        <Card className={"card-container " + this.state.expandClass}
          onExpandChange={this.handleExpandChange}>
          <CardMedia className="hide-on-expand"
            overlay={<CardTitle
                  style={{padding: 0+"px"}}
                  titleStyle={{fontSize: 14 + "px", lineHeight: 17+"px", padding: 5+"px"}}
                  subtitleStyle={{fontSize: 14 + "px", lineHeight: 17+"px", padding: 5+"px"}}
                  title={this.props.data.title} subtitle={this.props.data.publisher}/>}
            >
              <img src={this.fixThumbnailUrl(this.props.data.thumbnailUrl)}/>
          </CardMedia>
          <CardText className="abstract hide-on-expand"
            actAsExpander >{this.props.data.text}</CardText>
          <ExpandedArticle frameUrl={this.state.frameUrl} publisher={this.props.data.publisher}
              onCollapse={this.handleCollapse}/>
        </Card>

    );
  }
}
