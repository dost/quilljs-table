import Module from '../core/module';
import Parchment from 'parchment';
import Quill from '../core/quill';

import Table from '../blots/table';
import TableRow from '../blots/table_row';
import TableCell from '../blots/table_cell';
import ContainBlot from '../blots/contain';


Quill.register({
  'blots/table'        : Table,
  'blots/table_row'    : TableRow,
  'blots/table_cell'   : TableCell,
  'blots/contain'      : ContainBlot
})


class TableHandler extends Module {

  randomId() {
    return Math.random().toString(36).slice(2)
  }

  findTd(what) {
    let leaf = this.quill.getLeaf(this.quill.getSelection()['index']);
    let blot = leaf[0];
    for(;blot != null && blot.statics.blotName != what;) {
      blot = blot.parent;
    }
    return blot; // return TD or NULL
  }

  appendCol() {
    let td = this.findTd('td');
    let _this = this;
    if(td) {
      let table = td.parent.parent;
      let tableId = table.domNode.getAttribute('table_id')
      td.parent.parent.children.forEach(function(tr) {
        let rowId = tr.domNode.getAttribute('row_id');
        let cellId = _this.randomId();
        let td = Parchment.create('td', tableId + '|' + rowId + '|' + cellId);
        tr.appendChild(td);
      });
    }
  }

  appendRow() {
    let td = this.findTd('td');
    if(td) {
      let colCount = td.parent.children.length;
      let table = td.parent.parent;
      let newRow = td.parent.clone();
      let tableId = table.domNode.getAttribute('table_id');
      let rowId = this.randomId();
      newRow.domNode.setAttribute('row_id', rowId);
      for (var i = colCount - 1; i >= 0; i--) {
        let cellId = this.randomId();
        let td = Parchment.create('td', tableId + '|' + rowId + '|' + cellId);
        newRow.appendChild(td);
      }
      table.appendChild(newRow);
      console.log(newRow); // eslint-disable-line
    }
  }

}


export default TableHandler
