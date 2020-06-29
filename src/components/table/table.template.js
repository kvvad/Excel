const CODES = {
  A: 65,
  Z: 90
};

function toColumn(col, index) {
  return `
    <div class="column" data-type="resizeable" data-col="${index}">
    ${col}
    <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function toCell(_, col) {
  return `
    <div class="cell" contenteditable data-col="${col}"></div>
  `
}

function createRow(content, num) {
  const resized = num ?
    // eslint-disable-next-line max-len
    `<div class="row-resize" data-resize="row"></div>` :
    ''
  return `
  <div class="row" data-type="resizeable" data-row="${num}">
    <div class="row-info">
    ${num}
    ${resized}
    </div>
    <div class="row-data">${content}</div>
  </div>
`
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  const cells = new Array(colsCount)
      .fill('')
      .map(toCell)
      .join('')

  rows.push(createRow(cols, ''))

  for (let i = 0; i < rowsCount; ) {
    rows.push(createRow(cells, ++i))
  }

  return rows.join('');
}
