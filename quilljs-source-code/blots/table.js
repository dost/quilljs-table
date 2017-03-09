import Parchment from 'parchment';
import Container from './container';
import TableTrick from './table_trick';
import TableRow from './table_row';


class Table extends Container {

  static create(value) {
    let quill;
    if(typeof value === 'object') {
      quill = value.quill;
      value = value.value;
    }
    // special adding commands - belongs somewhere else out of constructor
    if(value == 'append-row') {
      let blot = TableTrick.appendRow(quill);
      return blot;
    } else if(value == 'append-col') {
      let blot = TableTrick.appendCol(quill);
      return blot;
    } else {
      // normal table
      let tagName = 'table';
      let node = super.create(tagName);
      node.setAttribute('table_id', value);
      return node;
    }
  }

  optimize() {
    super.optimize();
    let next = this.next;
    if (next != null && next.prev === this &&
        next.statics.blotName === this.statics.blotName &&
        next.domNode.tagName === this.domNode.tagName &&
        next.domNode.getAttribute('table_id') === this.domNode.getAttribute('table_id')) {
      next.moveChildren(this);
      next.remove();
    }
  }

}

Table.blotName = 'table';
Table.tagName = 'table';
Table.scope = Parchment.Scope.BLOCK_BLOT;
Table.defaultChild = 'tr';
Table.allowedChildren = [TableRow];


export default Table;
