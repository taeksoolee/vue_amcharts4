// 이상헌님 api
const shUrl = 'http://121.165.242.171:3500';
const shUrl2 = 'http://121.165.242.171:3500';

function checkTime(obj) {
  if (obj.startdate === undefined || obj.enddate === undefined) {
    const today = moment().format('YYYYMMDD');
    obj.startdate = today + '0000';
    obj.enddate = today + '2359';
  }
}

function forceDashboardObj(obj) {
  const date = new Date();
  obj.startdate = `${date.getFullYear()}${
    date.getMonth() + 1 > 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
  }${date.getDate() > 10 ? date.getDate() : '0' + date.getDate()}000000`;
  date.setDate(date.getDate() + 1);
  obj.enddate = `${date.getFullYear()}${
    date.getMonth() + 1 > 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
  }${date.getDate() > 10 ? date.getDate() : '0' + date.getDate()}000000`;

  if (typeof obj.locations === 'undefined') {
    obj.locations = ['outside', 'room1', 'room2', 'room3', 'livingroom'];
  }
}

function getPerformanceDashboardCo2(obj) {
  checkTime(obj);
  obj.sensor = 'co2';
  forceDashboardObj(obj);
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: shUrl + '/api/perf/integrated-all',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(obj),
      dataType: 'json',
      success: function (data) {
        resolve(data);
      },
      error: function (result) {},
    });
  });
}

function getPerformanceDashboardTemp(obj) {
  checkTime(obj);
  obj.sensor = 'temp';
  forceDashboardObj(obj);

  return new Promise(function (resolve, reject) {
    $.ajax({
      url: shUrl + '/api/perf/integrated-all',
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

function getPerformanceDashboardHumi(obj) {
  checkTime(obj);
  obj.sensor = 'humi';
  forceDashboardObj(obj);
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: shUrl + '/api/perf/integrated-all',
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

function getPerformanceDashboardDust2dot5(obj) {
  checkTime(obj);
  obj.sensor = 'dust_pm25';
  forceDashboardObj(obj);
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: shUrl2 + '/api/perf/integrated-all',
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

function getPerformanceDashboardDust10(obj) {
  checkTime(obj);
  obj.sensor = 'dust_pm10';
  forceDashboardObj(obj);
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: shUrl + '/api/perf/integrated-all',
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

// dashboard - recent
function getRecentPerformanceData(obj, type) {
  const sendObj = JSON.parse(JSON.stringify(obj));

  checkTime(sendObj);
  forceDashboardObj(sendObj);
  const date = new Date();
  sendObj.enddate = `${date.getFullYear()}${
    date.getMonth() + 1 > 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
  }${date.getDate() > 10 ? date.getDate() : '0' + date.getDate()}${
    date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  }${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}00`;
  date.setMinutes(date.getMinutes() - 1);

  sendObj.startdate = `${date.getFullYear()}${
    date.getMonth() + 1 > 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
  }${date.getDate() > 10 ? date.getDate() : '0' + date.getDate()}${
    date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  }${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}00`;

  let reqUri = '/api/perf/integrated-all';
  if (typeof type !== 'undefined') {
    reqUri = '/api/perf/integrated';
    sendObj.type = type;
  }

  return new Promise(function (resolve, reject) {
    $.ajax({
      url: shUrl + reqUri,
      type: 'POST',
      data: JSON.stringify(sendObj),
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        resolve(data);
      },
      error: function (result) {},
    });
  });
}

// statistics
function getStatisticsSensorChartData(obj) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: shUrl + '/api/perf/integrated-all',
      type: 'POST',
      data: JSON.stringify(obj),
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        resolve(data);
      },
      error: function (result) {
        console.error('shservice.getStatisticsSensorChartData');
      },
    });
  });
}

function getStatisticsSensorChartDataPrivate(obj) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: shUrl + '/api/perf/integrated',
      type: 'POST',
      data: JSON.stringify(obj),
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        resolve(data);
      },
      error: function (result) {
        console.error('shservice.getStatisticsSensorChartDataPrivate');
      },
    });
  });
}

function addCron(obj) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: shUrl + '/api/sock/control/new/cron',
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

function modifyCron(obj) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: shUrl + '/api/sock/control/change/cron',
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

function removeCron(obj) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: shUrl + '/api/sock/control/remove/cron',
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

function setControlOnflag(obj) {
  console.log('setControlonflag param ::: ', obj);
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: shUrl + '/api/sock/control/mode',
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

function getRecentIntegratedData(obj) {
  const sendObj = JSON.parse(JSON.stringify(obj));
  const now = new Date();
  sendObj.coldate = `${now.getFullYear()}${
    now.getMonth() + 1 > 10 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1)
  }${now.getDate() > 10 ? now.getDate() : '0' + now.getDate()}000000`;

  sendObj.skey = parseInt(sendObj.skey);
  sendObj.gkey = parseInt(sendObj.gkey);
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: shUrl + '/api/perf/integrated-recent',
      type: 'POST',
      data: JSON.stringify(sendObj),
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        resolve(data);
      },
      error: function (result) {},
    });
  });
}

function getTodayHumanCount() {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: shUrl + '/api/perf/motion-count',
      type: 'POST',
      data: JSON.stringify({
        startdate: moment().format('YYYY-MM-DD 00:00:00'),
        enddate: moment().add(1, 'day').format('YYYY-MM-DD 00:00:00'),
      }),
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        resolve(data);
      },
      error: function (result) {},
    });
  });
}
