let Container = Quill.import('blots/container');
let Parchment = Quill.import('parchment');
let TableTrick = Quill.import('table_trick');


class Table extends Container {
  static create(value) {
    // special adding commands - belongs somewhere else out of constructor
    if(value == 'append-row') {
      let blot = TableTrick.append_row();
      return blot;
    } else if(value == 'append-col') {
      let blot = TableTrick.append_col();
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

export default Table