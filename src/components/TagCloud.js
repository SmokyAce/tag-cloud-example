import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import { getTagCloud } from '../utils/api';
import './TagCloud.css';
import placeWords from '../utils/tag-cloud';

function TagCloud() {
  const tags = useTags();
  const width = useWindowWidth();

  function getLabel(id) {
    return tags.ids.length > 0 && tags.byIds[id].label;
  }

  if (tags.ids.length === 0) {
    return (
      <div className='cloud-container'>
        <Spinner />
        <div id='word-cloud' />
      </div>
    );
  }
  const resolution = ((width / 3840) * 100) ^ 0;

  const words = tags.ids.map(tagId => ({
    word: tags.byIds[tagId].label,
    score: (tags.byIds[tagId].sentimentScore * resolution) / 100,
    id: tags.byIds[tagId].id
  }));

  const cloud = placeWords(words);

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

export default TagCloud;
