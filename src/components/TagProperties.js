import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import Spinner from './Spinner';
import List from './List';
import ListItem from './ListItem';
import { getTagInfoById, getNeighbors } from '../utils/api';
import './TagProperties.css';

class TagProperties extends Component {
  state = {
    tagInfo: {},
    neighbors: {}
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.tagId !== prevProps.tagId) {
      this.getData();
    }
  }

  render() {
    const { tagInfo, neighbors } = this.state;

    if (!tagInfo) {
      return <Redirect to='/' />;
    }

    if (!tagInfo.id) {
      return <Spinner />;
    }

    const properties = [];
    properties.push({
      content: `Total Mentions: ${this.getTotalMentions()}`,
      className: 'subheader'
    });
    ['positive', 'neutral', 'negative'].forEach(item => {
      properties.push({
        content: `${this.upperCaseLetter(item)} Mentions: ${this.getMention(
          item
        )}`,
        className: item
      });
    });
    properties.push({
      content: 'List of page types',
      className: 'subheader'
    });
    Object.keys(tagInfo.pageType).forEach(type =>
      properties.push({
        content: `${type}: ${tagInfo.pageType[type]}`
      })
    );

    return (
      <div className='properties'>
        <div className='nav'>
          <Link to={`/home/${neighbors.prev}`}>
            <img src='/img/prev-button.png' alt='Previous tag' />
          </Link>
          <Link className='text-center' to='/home'>
            Home
          </Link>
          <Link className='arrow-right' to={`/home/${neighbors.next}`}>
            <img src='/img/next-button.png' alt='Next tag' />
          </Link>
        </div>
        <h3 className='subheader text-center'>
          {this.upperCaseLetter(tagInfo.label)}
        </h3>
        <List>
          {properties.map((prop, i) => (
            <ListItem key={i} {...prop} />
          ))}
        </List>
      </div>
    );
  }

  getData = () => {
    const { tagId } = this.props;
    if (tagId) {
      Promise.all([getTagInfoById(tagId), getNeighbors(tagId)])
        .then(result => {
          if (!result) throw new Error();

          const [tagInfo, neighbors] = result;
          this.setState({
            tagInfo,
            neighbors
          });
        })
        // eslint-disable-next-line
        .catch(console.log.bind(console));
    }
  };

  getTotalMentions = () => {
    let { tagInfo, total = 0 } = this.state;
    if (tagInfo.sentiment) {
      Object.keys(tagInfo.sentiment).forEach(type => {
        total += tagInfo.sentiment[type];
      });
    }
    return total;
  };

  getMention = type => {
    const { tagInfo } = this.state;
    if (tagInfo.sentiment && tagInfo.sentiment[type]) {
      return tagInfo.sentiment[type];
    }
    return 0;
  };

  upperCaseLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
}

TagProperties.propTypes = {
  tagId: PropTypes.string.isRequired
};

export default TagProperties;
