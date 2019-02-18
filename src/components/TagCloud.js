import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import { getTagCloud } from '../utils/api';
import './TagCloud.css';

function TagCloud() {
  const tags = useTags();
  const width = useWindowWidth();

  function getLabel(id) {
    return tags.ids.length > 0 && tags.byIds[id].label;
  }

  function getFontSize(id) {
    const resolution = ((width / 1920) * 100) ^ 0;
    const score = tags.byIds[id].sentimentScore;
    return (score < 50 ? 0.7 : 1) + (((score * resolution) / 100) ^ 0) / 100;
  }

  if (tags.ids.length === 0) {
    return <Spinner />;
  }

  return (
    <div className='cloud'>
      {tags.ids &&
        tags.ids.map((tagId, i) => (
          <Link
            className='grow'
            to={`/home/${tagId}`}
            style={{
              fontSize: `${getFontSize(tagId)}em`,
              lineHeight: '0.8em',
              color: `#${getRandomColor()}`
            }}
            key={i}
          >
            {getLabel(tagId)}
          </Link>
        ))}
    </div>
  );
}

function useTags() {
  const [state, setState] = useState({
    ids: [],
    byIds: {}
  });
  useEffect(() => {
    getTagCloud()
      .then(tagsByIds => {
        setState({
          ...state,
          ids: Object.keys(tagsByIds),
          byIds: tagsByIds
        });
      })
      // eslint-disable-next-line
      .catch(console.log.bind(console));
  }, []);
  return state;
}

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      if (Math.abs(window.innerWidth - width) > 50) {
        setWidth(window.innerWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width]);
  return width;
}

function getRandomColor() {
  return Math.floor(Math.random() * 16777215).toString(16);
}

export default TagCloud;
