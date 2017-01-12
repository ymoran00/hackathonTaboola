import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FontIcon from 'material-ui/FontIcon';
import {red500, grey900, blue500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';

export default class ExpandedArticle extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
    return (
      <div className="article-frame show-on-expand">
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <ToolbarTitle text={this.props.publisher} />
            <IconButton touch>
              <FontIcon className="material-icons" color={blue500}><i className="material-icons">open_in_browser</i></FontIcon>
            </IconButton>
            <FontIcon className="material-icons" color={blue500}><i className="material-icons">share</i></FontIcon>
          </ToolbarGroup>
          <ToolbarGroup>
            <FontIcon className="material-icons" color={grey900}><i className="material-icons">clear</i></FontIcon>
          </ToolbarGroup>
        </Toolbar>
        <iframe src={this.props.frameUrl} className=""/>
      </div>
    );
  }
}
