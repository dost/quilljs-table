let Container = Quill.import('blots/container');
let Block = Quill.import('blots/block');
let Parchment = Quill.import('parchment');
let BlockEmbed = Quill.import('blots/block/embed');


class TableCell extends ContainBlot {

  static create(value) {
      console.log(value)
    if(value==true) {
      value = TableTrick.random_id()+'|'+TableTrick.random_id()+'|'+TableTrick.random_id();
    }
    let tagName = 'td';
    let node = super.create(tagName);
    let ids = value.split('|')
    node.setAttribute('table_id', ids[0]);
    node.setAttribute('row_id', ids[1]);
    node.setAttribute('cell_id', ids[2]);
    return node;      
  }

  format() {
    this.getAttribute('id');
  }

  formats() {
    // We don't inherit from FormatBlot
    return { [this.statics.blotName]: 
      this.domNode.getAttribute('table_id') + '|' +
      this.domNode.getAttribute('row_id') + '|' +
      this.domNode.getAttribute('cell_id') }
  }

  optimize() {
    super.optimize();

    // Add parent TR and TABLE when missing
    let parent = this.parent;
    if (parent != null && parent.statics.blotName != 'tr') {
      // we will mark td position, put in table and replace mark
      let mark = Parchment.create('block');
      this.parent.insertBefore(mark, this.next);
      let table = Parchment.create('table', this.domNode.getAttribute('table_id'));
      let tr = Parchment.create('tr', this.domNode.getAttribute('row_id'));
      table.appendChild(tr);
      tr.appendChild(this);
      table.replace(mark)
    }

    // merge same TD id
    let next = this.next;
    if (next != null && next.prev === this &&
        next.statics.blotName === this.statics.blotName &&
        next.domNode.tagName === this.domNode.tagName &&
        next.domNode.getAttribute('cell_id') === this.domNode.getAttribute('cell_id')) {
      next.moveChildren(this);
      next.remove();
    }
  }
}

TableCell.blotName = 'td';
TableCell.tagName = 'td';
TableCell.scope = Parchment.Scope.BLOCK_BLOT;
TableCell.defaultChild = 'block';
TableCell.allowedChildren = [Block, BlockEmbed, Container];


export default TableCell