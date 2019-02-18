import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import Spinner from './Spinner';
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

    return (
      <div className='properties'>
        <div className='nav'>
          <Link to={`/home/${neighbors.prev}`}>&#x1F880;</Link>
          <Link className='text-center' to='/home'>
            Home
          </Link>
          <Link to={`/home/${neighbors.next}`}>&#x1F882;</Link>
        </div>
        <h3 className='subheader'>
          {this.upperCaseFirstLetter(tagInfo.label)}
        </h3>
        <ul className='list'>
          <li className='list-item subheader'>
            Total Mentions: {this.getTotalMentions()}
          </li>
          <li className='list-item green'>
            Positive Mentions: {this.getMention('positive')}
          </li>
          <li className='list-item blue'>
            Neutral Mentions: {this.getMention('neutral')}
          </li>
          <li className='list-item red'>
            Negative Mentions: {this.getMention('negative')}
          </li>
          <li className='list-item subheader'>List of page types</li>
          {tagInfo.pageType &&
            Object.keys(tagInfo.pageType).map((type, i) => {
              return (
                <li key={i} className='list-item'>
                  {type}: {tagInfo.pageType[type]}
                </li>
              );
            })}
        </ul>
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

  upperCaseFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
}

TagProperties.propTypes = {
  tagId: PropTypes.string.isRequired
};

export default TagProperties;
