function getDeviceStructureMapList() {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/device/structure/map/list.json',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        resolve(data);
      },
      error: function (result) {},
    });
  });
}

function getFaultList() {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/fault/selectFaultList.do',
      dataType: 'json',
      success: function (data) {
        resolve(data);
      },
      error: function (result) {},
    });
  });
}

function getPerformanceDashboardOpTime(obj) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/dashboard/selectEnertalkUsagePerOpTime.do',
      type: 'POST',
      data: obj,
      dataType: 'json',
      success: function (data) {
        resolve(data);
      },
      error: function (result) {},
    });
  });
}

// device
function getSensorTableList({ sname, gname, aptnm }) {
  const qs = `?sname=${sname}&gname=${gname}&aptnm=${aptnm}`;

  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/device/sensor/table/list.json' + qs,
      dataType: 'json',
      success: function (data) {
        resolve(data);
      },
      error: function (result) {},
    });
  });
}

function getControlTableList({ sname, gname, aptnm }) {
  const qs = `?sname=${sname}&gname=${gname}&aptnm=${aptnm}`;

  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/device/control/table/list.json' + qs,
      dataType: 'json',
      success: function (data) {
        resolve(data);
      },
      error: function (result) {},
    });
  });
}

function setDeviceThreshold(obj) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/device/threshold',
      type: 'POST',
      data: JSON.stringify(obj),
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        resolve(data);
      },
      error: function (result) {},
    });
  });
}

function setDeviceThresholdBatch(obj) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/device/threshold/batch',
      type: 'POST',
      data: JSON.stringify(obj),
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        resolve(data);
      },
      error: function (result) {},
    });
  });
}

function getSensorThreshold({ skey, gkey, sensorcd, locationcd, division }) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: 'GET',
      url:
        '/device/sensor/threshold' +
        '?skey=' +
        skey +
        '&gkey=' +
        gkey +
        '&sensorcd=' +
        sensorcd +
        '&locationcd=' +
        locationcd +
        '&division=' +
        mapWordReverse(division),
      contentType: 'application/json; charset=UTF-8',
      success: function (data) {
        resolve(data);
      },
      error: function (result) {},
    });
  });
}

function setSensorManflag(obj) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/device/sensor/manflag',
      type: 'POST',
      data: JSON.stringify(obj),
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        resolve(data);
      },
      error: function (result) {},
    });
  });
}

function setControlManflag(obj) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/device/control/manflag',
      type: 'POST',
      data: JSON.stringify(obj),
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        resolve(data);
      },
      error: function (result) {},
    });
  });
}

// record
function getRecordControlList(data) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/record/selectRecordControlList.do',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(data),
      success: function (data) {
        resolve(data);
      },
      error: function (result) {
        console.error(result);
      },
    });
  });
}

function getRecordFaultList(data) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/record/selectRecordFaultList.do',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(data),
      success: function (data) {
        resolve(data);
      },
      error: function (result) {
        console.error(result);
      },
    });
  });
}

function getRecordFaultHistoryList(data) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/record/selectRecordRepairList.do',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(data),
      success: function (data) {
        resolve(data);
      },
      error: function (result) {
        console.error(result);
      },
    });
  });
}

// statistics
function getStatisticsFaultList(obj) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/fault/selectFaultHistoryList.do',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(obj),
      success: function (data) {
        resolve(data);
      },
      error: function (result) {
        console.error(result);
      },
    });
  });
}

function getDeviceStateList() {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: 'GET',
      url: '/device/state/list.json',
      success: function (data) {
        resolve(data);
      },
      error: function (result) {},
    });
  });
}

function getDeviceStructureList(aptcd) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: 'GET',
      url: '/device/structure/list.json?aptcd=' + aptcd,
      success: function (data) {
        resolve(data);
      },
      error: function (result) {},
    });
  });
}

function getDeviceGatewayList(skey) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: 'GET',
      url: '/device/gateway/list.json?skey=' + skey,
      success: function (data) {
        resolve(data);
      },
      error: function (result) {},
    });
  });
}

//
function getSensorList(skey, gkey) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: 'GET',
      url: '/device/sensor/list.json?skey=' + skey + '&gkey=' + gkey,
      success: function (data) {
        resolve(data);
      },
      error: function (result) {},
    });
  });
}

function getControlList(skey, gkey) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: 'GET',
      url: '/device/control/list.json?skey=' + skey + '&gkey=' + gkey,
      success: function (data) {
        resolve(data);
      },
      error: function (result) {},
    });
  });
}

function setDevice2d(obj) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/device/2d',
      type: 'POST',
      data: JSON.stringify(obj),
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        resolve(data);
      },
      error: function (result) {},
    });
  });
}

function setControlDevice2d(obj) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/device/control/2d',
      type: 'POST',
      data: JSON.stringify(obj),
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        resolve(data);
      },
      error: function (result) {},
    });
  });
}

function setDevice3d(obj) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/device/3d',
      type: 'POST',
      data: JSON.stringify(obj),
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        resolve(data);
      },
      error: function (result) {},
    });
  });
}

function setControlCronManflag(obj) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/control/cron/manflag',
      type: 'POST',
      data: JSON.stringify(obj),
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        resolve(data);
      },
      error: function (result) {},
    });
  });
}

function getfalevelStatisticsData() {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: 'GET',
      url: '/statistics/fault/falevel/data.json',
      success: function (data) {
        resolve(data);
      },
      error: function (result) {},
    });
  });
}

function getLoctioncdSensorcdList(skey, gkey) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: 'GET',
      url:
        '/device/locationcdsensorcd/list.json?skey=' + skey + '&gkey=' + gkey,
      success: function (data) {
        resolve(data);
      },
      error: function (result) {},
    });
  });
}

function getLoctioncdDevicecdList(skey, gkey) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: 'GET',
      url:
        '/device/locationcddevicecd/list.json?skey=' + skey + '&gkey=' + gkey,
      success: function (data) {
        resolve(data);
      },
      error: function (result) {},
    });
  });
}

function getFanUptimeData() {
  return new Promise(function (resolve, reject) {
    const colorSet = new am4core.ColorSet();
    colorSet.saturation = 0.4;

    const date = moment().format('YYYY-MM-DD ');

    const arr = [];
    while (true) {
      const randomHour = parseInt(Math.random() * 24 + 1);
      const randomMinute = parseInt(Math.random() * 59 + 1);

      const date =
        (randomHour >= 10 ? randomHour : '0' + randomHour) +
        ':' +
        (randomMinute >= 10 ? randomMinute : '0' + randomMinute);

      if (arr.indexOf(date) === -1) {
        arr.push(date);
      }

      if (arr.length === 12) break;
    }

    const tempArr = [];
    arr.sort().forEach((v, i) => {
      const idx = parseInt(i / 2);

      if (tempArr[idx] === undefined) tempArr[idx] = [];

      tempArr[idx].push(v);
    });

    const result = [];
    for (list of tempArr) {
      const obj = {
        name: '환기 유닛',
        color: colorSet.getIndex(0).brighten(0),
      };

      for (const idx in list) {
        const key = idx % 2 === 0 ? 'fromDate' : 'toDate';
        obj[key] = date + list[idx];
      }
      result.push(obj);
    }

    resolve(result);
  });
}

function getDashboardPlugChartData() {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: 'GET',
      url: '/dashboard/chart/plugin/data.json',
      success: function (data) {
        resolve(data);
      },
      error: function (result) {},
    });
  });
}
