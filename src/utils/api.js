import data from '../data.json';

// normalize
const tagsByIds = data.tags.reduce((byIds, current) => {
  return { ...byIds, [current.id]: current };
}, {});

function getTagCloud() {
  return fakeApi(tagsByIds);
}

function getTagInfoById(tagId) {
  return fakeApi(tagsByIds.hasOwnProperty(tagId) ? tagsByIds[tagId] : null);
}

function getNeighbors(tagId) {
  let result;

  const tagIds = Object.keys(tagsByIds);
  const index = tagIds.findIndex(el => tagId === el);
  if (index === -1) {
    result = null;
  } else {
    result = {
      prev: tagIds[index === 0 ? tagIds.length - 1 : index - 1],
      next: tagIds[index === tagIds.length - 1 ? 0 : index + 1]
    };
  }
  return fakeApi(result);
}

function fakeApi(result) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(result);
    }, 400);
  });
}

export { getTagCloud, getTagInfoById, getNeighbors };
