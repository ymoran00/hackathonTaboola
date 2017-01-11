import React from 'react';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(e) {
	  this.setState({searchText: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSearch(this.state.searchText)
    console.log('A name was submitted: ' + this.state.searchText);
  }

  render() {
    return (
      <form className="search-form" onSubmit={this.handleSubmit}>
        <input className="search-bar"
              type="text"
            	placeholder="What would you like to read?"
            	value= {this.state.searchText}
            	onChange={this.handleChange}
          />
          <input className="submit-btn"
            type="submit" value="Submit"/>
      </form>
    );
  }
}
