export default function(words) {
  // console.time('timer');

  const config = {
    spiralResolution: 1, //Lower = better resolution
    spiralLimit: 360 * 5,
    lineHeight: 0.9,
    xWordPadding: 2,
    yWordPadding: 3
  };

  words.sort(function(a, b) {
    return -1 * (a.score - b.score);
  });

  const placedWords = [];
  const cloud = document.getElementById('word-cloud');
  const startPoint = {
    x: cloud.offsetWidth / 2,
    y: cloud.offsetHeight / 2 + 104 // header
  };

  function createWordObject(word, score) {
    const wordContainer = document.createElement('a');
    wordContainer.style.position = 'absolute';
    wordContainer.style.fontSize = score / 3 + 'px';
    wordContainer.style.lineHeight = config.lineHeight;
    wordContainer.appendChild(document.createTextNode(word));

    return wordContainer;
  }

  function placeWord(word, x, y, options) {
    word.style.left = x - word.offsetWidth / 2 + 'px';
    word.style.top = y - word.offsetHeight / 2 + 'px';
    placedWords.push({ pos: word.getBoundingClientRect(), ...options });
    cloud.removeChild(word);
  }

  function intersect(word, x, y) {
    cloud.appendChild(word);

    word.style.left = x - word.offsetWidth / 2 + 'px';
    word.style.top = y - word.offsetHeight / 2 + 'px';

    const currentWord = word.getBoundingClientRect();

    for (let i = 0; i < placedWords.length; i += 1) {
      const comparisonWord = placedWords[i].pos;

      if (
        !(
          currentWord.right + config.xWordPadding <
            comparisonWord.left - config.xWordPadding ||
          currentWord.left - config.xWordPadding >
            comparisonWord.right + config.wXordPadding ||
          currentWord.bottom + config.yWordPadding <
            comparisonWord.top - config.yWordPadding ||
          currentWord.top - config.yWordPadding >
            comparisonWord.bottom + config.yWordPadding
        )
      ) {
        cloud.removeChild(word);
        return true;
      }
    }

    return false;
  }

  function spiral(i, callback) {
    const angle = config.spiralResolution * i;
    const x = (1 + angle) * Math.cos(angle);
    const y = (1 + angle) * Math.sin(angle);

    return callback ? callback(x, y) : null;
  }

  function placeWords() {
    for (let i = 0; i < words.length; i += 1) {
      const word = createWordObject(words[i].word, words[i].score);

      for (let j = 0; j < config.spiralLimit; j++) {
        if (
          spiral(j, (x, y) => {
            if (!intersect(word, startPoint.x + x, startPoint.y + y)) {
              placeWord(word, startPoint.x + x, startPoint.y + y, {
                ...words[i]
              });
              return true;
            }
          })
        ) {
          break;
        }
      }
    }
    // console.timeEnd('timer');
    return placedWords;
  }

  return placeWords();
}
