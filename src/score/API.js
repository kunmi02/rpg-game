const scoreSystem = (() => {
  const key = '4A1oDEacyDE8mH3xM7JS'; // dragon slayer game key
  const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`;
  const info = {};
  const postScores = () => {
    if (info.score > 0) {
      const data = info;
      fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data),
      }).then((res) => {
        res.json();
      }).then((json) => json);
    }
  };
  const namer = (name) => {
    info.user = name;
  };

  const scorer = (num) => {
    info.score = num;
  };
  const getScores = () => new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        resolve(json.result);
      }).catch((e) => {
        reject(e);
      });
  });
  return {
    postScores,
    getScores,
    namer,
    scorer,
  };
});
export default scoreSystem();