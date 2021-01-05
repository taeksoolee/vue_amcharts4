const getGraphqlData = function (query, variables) {
  return new Promise((resolve, reject) => {
    let body = '';
    if (typeof variables === 'undefined') {
      body = JSON.stringify({
        query,
      });
    } else {
      body = JSON.stringify({
        query,
        variables,
      });
    }

    fetch('http://121.165.242.171:7373/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body,
    })
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });
};

const weatherMap = {
  SKY: [null, '맑음', null, '구름많음', '흐림'],
  PTY: [
    '없음',
    '비',
    '비/눈',
    '눈',
    '소나기',
    '빗방울',
    '빗방울/눈날림',
    '눈날림',
  ],
};

const getLatestWeather = async function () {
  const latest_query = `
    query {
      latest {
        T3H
        SKY
        PTY
      }
    }
  `;
  const rst = await getGraphqlData(latest_query);
  const latestData = rst.data.latest;

  const rstData = {
    temp: latestData['T3H'],
  };

  if (latestData.PTY == 0) {
    rstData.weather = weatherMap.SKY[latestData.SKY];
  } else {
    rstData.weather = weatherMap.PTY[latestData.PTY];
  }

  return rstData;
};
