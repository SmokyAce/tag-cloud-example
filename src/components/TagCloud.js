import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import { getTagCloud } from '../utils/api';
import './TagCloud.css';
import placeWords from '../utils/tag-cloud';

function TagCloud() {
  const tags = useTags();
  const width = useWindowWidth();
  const cloud = useCloud(width, tags);

  if (cloud.length === 0) {
    return (
      <div className='cloud-container'>
        <Spinner />
        <div id='word-cloud' />
      </div>
    );
  }

  function getLabel(id) {
    return tags.ids.length > 0 && tags.byIds[id].label;
  }
  return (
    <div className='cloud-container'>
      <div id='word-cloud'>
        {cloud &&
          cloud.map((el, i) => (
            <Link
              className='grow'
              to={`/home/${el.id}`}
              style={{
                fontSize: `${el.score / 3}px`,
                lineHeight: '0.9em',
                color: 'black',
                position: 'absolute',
                bottom: el.pos.bottom,
                width: el.pos.width,
                height: el.pos.height,
                left: el.pos.left,
                right: el.pos.right,
                top: el.pos.top
              }}
              key={i}
            >
              {getLabel(el.id)}
            </Link>
          ))}
      </div>
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
      if (Math.abs(window.innerWidth - width) > 200) {
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

function useCloud(width, tags) {
  const [cloud, setCloud] = useState([]);

  const resolution = ((width / 1920) * 100) ^ 0;

  useEffect(() => {
    const words = tags.ids.map(tagId => ({
      word: tags.byIds[tagId].label,
      score: ((tags.byIds[tagId].sentimentScore * resolution) / 100) ^ 0,
      id: tags.byIds[tagId].id
    }));
    if (words.length > 0) {
      setCloud(placeWords(words));
    }
  }, [tags, width]);

  return cloud;
}

export default TagCloud;
