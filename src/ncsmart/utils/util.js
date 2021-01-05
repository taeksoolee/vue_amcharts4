// utils
const map = {
  integrated: '통합센서',
  filter: '필터 차압 센서',
  duct: '덕트 정압 센서',
  temp_wind: '온도/풍속 센서',
  temp_humi: '온도/습도 센서',
  temp: '온도',
  humi: '습도',
  dust: '미세먼지',
  wind: '풍속',
  pressure: '차압',
  heater: '히터',
  light: '조명',
  fan: '환풍기',
  dust10: '미세먼지 PM 10',
  dust25: '미세먼지 PM 25',
  dust1: '미세먼지 PM 1',
};

function mapWord(word) {
  return map[word] === undefined ? word : map[word];
}

function mapWordReverse(word) {
  let result = word;
  for (let key in map) {
    if (map[key] === word) {
      result = key;
    }
  }
  return result;
}

// 시작데이터(00:00:00) 데이터 없으면 합쳐지지 않음
function execGroupBy(dataList, cd, type, slice) {
  if (typeof dataList === 'undefined') {
    console.error('dataList is undefined');
    return;
  }

  if (dataList.length === 0) {
    console.error('dataList length is 0');
    return;
  }

  const resultList = [];
  const resultCntList = [];

  const keys = Object.keys(dataList[0]).filter((k) => k !== cd);

  for (let d of dataList) {
    let tempDate = null;

    if (typeof d[cd] === 'object') {
      switch (slice) {
        case 'day':
          tempDate = `${d[cd].getFullYear()}-${d[cd].getMonth() + 1}-${d[
            cd
          ].getDate()} 00:00:00`;
          break;
        case 'hour':
          tempDate = `${d[cd].getFullYear()}-${d[cd].getMonth() + 1}-${d[
            cd
          ].getDate()} ${d[cd].getHours()}:00:00`;
          break;
        case 'minute':
          tempDate = `${d[cd].getFullYear()}-${d[cd].getMonth() + 1}-${d[
            cd
          ].getDate()} ${d[cd].getHours()}:${d[cd].getMinutes()}:00`;
          break;
      }
    } else if (typeof d[cd] === 'string') {
      if (d[cd].length === 14) {
        d[cd] =
          d[cd].slice(0, 4) +
          '-' +
          d[cd].slice(4, 6) +
          '-' +
          d[cd].slice(6, 8) +
          ' ' +
          d[cd].slice(8, 10) +
          ':' +
          d[cd].slice(10, 12) +
          ':' +
          d[cd].slice(12, 14);
      }

      switch (slice) {
        case 'day':
          tempDate = d[cd].slice(0, 10) + ' 00:00:00';
          break;
        case 'hour':
          tempDate = d[cd].slice(0, 13) + ':00:00';
          break;
        case 'minute':
          tempDate = d[cd].slice(0, 16) + ':00';
          break;
      }
    }

    let findObj = { obj: {}, i: -1 };
    for (const i in resultList) {
      if (resultList[i][cd] === tempDate) {
        findObj.obj = resultList[i];
        findObj.i = i;
        break;
      }
    }

    if (findObj.i === -1) {
      // 추가
      resultList.push(d);
      resultCntList.push(1);
    } else {
      // 더하기
      keys.forEach((k) => {
        resultList[findObj.i][k] += d[k];
      });
      resultCntList[findObj.i] = parseInt(resultCntList[findObj.i]) + 1;
    }
  }

  if (type === 'avg') {
    for (let i in resultList) {
      keys.forEach((k) => {
        resultList[i][cd] = new Date(resultList[i][cd]);
        resultList[i][k] = (resultList[i][k] / resultCntList[i]).toFixed(2);
      });
    }
  } else {
    for (let i in resultList) {
      keys.forEach((k) => {
        resultList[i][cd] = new Date(resultList[i][cd]);
        resultList[i][k] = resultList[i][k].toFixed(2);
      });
    }
  }

  return resultList;
}

// setFilter
function setStateFilter(startCb, endCb) {
  if (typeof startCb === 'function') {
    startCb();
  }

  setStateSelect(
    (aptcd, cb2, cb3) => {
      setStructureSelect(aptcd, cb2, cb3);
    },
    (skey, cb3) => {
      setStructureSelect(skey, cb3);
    },
    () => {
      if (typeof endCb === 'function') {
        endCb();
      }
    },
  );

  return {
    handleChangeApt: function handleChangeApt() {
      showLoadingImage();
      const aptcd = document.getElementById('stateSelect').value;
      setStructureSelect(
        aptcd,
        (skey, cb3) => {
          setStructureSelect(skey, cb3);
        },
        () => {
          stopLoadingView();
        },
      );
    },
    handleChangeDong: function handleChangeDong() {
      showLoadingImage();
      const skey = document.getElementById('structureSelect').value;
      setGatewaySelect(skey, () => {
        stopLoadingView();
      });
    },
  };
}

// set tree();
async function setStateSelect(cb1, cb2, cb3) {
  const data = await getDeviceStateList();
  let html = '';
  data.forEach((state) => {
    html +=
      '<option value="' + state.STATECD + '">' + state.APTNM + '</option>';
  });
  $('#stateSelect').html(html);
  cb1(data[0].STATECD, cb2, cb3);
}

async function setStructureSelect(statecd, cb2, cb3) {
  const data = await getDeviceStructureList(statecd);
  let html = '';
  data.forEach((s) => {
    html += '<option value="' + s.SKEY + '">' + s.SNAME + '</option>';
  });
  $('#structureSelect').html(html);
  setGatewaySelect(data[0].SKEY, cb3);
}

async function setGatewaySelect(skey, cb3) {
  const data = await getDeviceGatewayList(skey);
  let html = '';
  data.forEach((g) => {
    html += '<option value="' + g.GKEY + '">' + g.GNAME + '</option>';
  });
  $('#gatewaySelect').html(html);
  cb3();
}
