import Parchment from 'parchment';


class TableTrick {

  static randomId() {
    return Math.random().toString(36).slice(2)
  }

  static findTd(what, quill) {
    let leaf = quill.getLeaf(quill.getSelection()['index']);
    let blot = leaf[0];
    for(;blot!=null && blot.statics.blotName!=what;) {
      blot=blot.parent;
    }
    return blot; // return TD or NULL
  }

  static appendCol(quill) {
    let td = TableTrick.findTd('td', quill)
    if(td) {
      let table = td.parent.parent;
      let tableId = table.domNode.getAttribute('table_id')
      td.parent.parent.children.forEach(function(tr) {
        let rowId = tr.domNode.getAttribute('row_id')
        let cellId = TableTrick.randomId();
        let td = Parchment.create('td', tableId+'|'+rowId+'|'+cellId);
        tr.appendChild(td);
      });
    }
  }

  static appendRow(quill) {
    let td = TableTrick.findTd('td', quill)
    if(td) {
      let colCount = td.parent.children.length;
      let table = td.parent.parent;
      let newRow = td.parent.clone()
      let tableId = table.domNode.getAttribute('table_id')
      let rowId = TableTrick.randomId();
      newRow.domNode.setAttribute('row_id', rowId)
      for (var i = colCount - 1; i >= 0; i--) {
        let cellId = TableTrick.randomId();
        let td = Parchment.create('td', tableId+'|'+rowId+'|'+cellId);
        newRow.appendChild(td);
      }
      table.appendChild(newRow);
      console.log(newRow); // eslint-disable-line
    }
  }

}


export default TableTrick
