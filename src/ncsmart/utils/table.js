function makeTableBody(id, dataList, callback, paramList) {
  const tbody = document.querySelector('#' + id + ' tbody');
  const isExsisteCallback = callback !== undefined;
  for (let i in dataList) {
    const tr = document.createElement('tr');
    if (isExsisteCallback) {
      paramList[i].rownum = parseInt(i) + 1;

      tr.onclick = function () {
        callback(paramList[i]);
      };
    }

    const rownumTd = document.createElement('td');
    rownumTd.innerText = parseInt(i) + 1;
    tr.append(rownumTd);

    for (let key in dataList[i]) {
      const td = document.createElement('td');

      switch (key) {
        case 'button':
          if (/((상한치)|(하한치))/.test(dataList[i].famsg)) {
            const button = document.createElement('button');
            // button.innerText = dataList[i][key].text;
            button.innerHTML = '<i class="fas fa-cog"></i>';

            button.classList.add('btn');
            button.classList.add('btn-info');
            /*
            button.onclick = function () {
              dataList[i][key].cb();
            };
            */
            button.style.fontSize = 'inherit';
            button.onclick = function () {
              location.href = '/control/management.do';
            };

            td.append(button);
            td.style.textAlign = 'center';
          }
          break;
        case 'falevel':
          const div = document.createElement('div');
          const divClassList = div.classList;
          divClassList.add('falevel-icon');
          switch (dataList[i][key]) {
            case 0:
              div.innerText = 'critical';
              divClassList.add('critical-icon');
              break;
            case 1:
              div.innerText = 'major';
              divClassList.add('major-icon');
              break;
            case 2:
              div.innerText = 'minor';
              divClassList.add('minor-icon');
              break;
            case 3:
              div.innerText = 'recovery';
              divClassList.add('recovery-icon');
              break;
          }
          td.append(div);
          break;
        case 'fltflag':
          td.classList.add(dataList[i][key]);
          if (dataList[i][key] === 'normal') {
            td.innerText = '일반';
          } else {
            td.innerText = '고장';
          }
          break;
        case 'onflag':
          switch (dataList[i][key]) {
            case 0:
              td.innerHTML = `<div>OFF</div>`;
              break;
            case 1:
              td.innerHTML = `<div>ON</div>`;
              break;
          }

          break;
        default:
          td.innerText = mapWord(dataList[i][key]);
      }
      tr.append(td);
    }
    tbody.append(tr);
  }
}

function setSearchRangeTime(colIndex) {
  $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
    var start = new Date($('#startTime').val()).getTime();
    var end = new Date($('#endTime').val()).getTime();
    var col = new Date(data[colIndex]).getTime(); // use data for the age column

    if (
      (isNaN(start) && isNaN(end)) ||
      (isNaN(start) && col <= end) ||
      (start <= col && isNaN(end)) ||
      (start <= col && col <= end)
    ) {
      return true;
    }

    return false;
  });
}

function setSearchIndex(dataTable) {
  dataTable
    .on('order.dt search.dt', function () {
      dataTable
        .column(0, { search: 'applied', order: 'applied' })
        .nodes()
        .each(function (cell, i) {
          cell.innerHTML = i + 1;
        });
    })
    .draw();
}

function getDataTableClearParam() {
  return {
    pageLength: 1000,
    searching: false,
    lengthChange: false,
    paging: false,
    info: false,
    ordering: false,
  };
}
