let Container = Quill.import('blots/container');
let Inline = Quill.import('blots/inline');
let Block = Quill.import('blots/block');
let Delta = Quill.import('delta');
let Parchment = Quill.import('parchment');
let BlockEmbed = Quill.import('blots/block/embed');
let TextBlot = Quill.import('blots/text');


//
//
// CONTAINER TAG
//

class ContainBlot extends Container {
  static create(value) {
    let tagName = 'contain';
    let node = super.create(tagName);
    return node;
  }

  insertBefore(blot, ref) {
    if (blot.statics.blotName == this.statics.blotName) {
      console.log('############################ Not sure this is clean:')
      console.log(blot)
      console.log(blot.children.head)
      super.insertBefore(blot.children.head, ref);
    } else {
      super.insertBefore(blot, ref);
    }
  }

  static formats(domNode) {
    return domNode.tagName;
  }

  formats() {
    // We don't inherit from FormatBlot
    return { [this.statics.blotName]: this.statics.formats(this.domNode) }
  }

  replace(target) {
    if (target.statics.blotName !== this.statics.blotName) {
      let item = Parchment.create(this.statics.defaultChild);
      target.moveChildren(item);
      this.appendChild(item);
    }
    if (target.parent == null) return;
    super.replace(target)
  }
}

ContainBlot.blotName = 'contain';
ContainBlot.tagName = 'contain';
ContainBlot.scope = Parchment.Scope.BLOCK_BLOT;
ContainBlot.defaultChild = 'block';
ContainBlot.allowedChildren = [Block, BlockEmbed, Container];
Quill.register(ContainBlot);


//
//
// CONTAINER TR
//

class TableRow extends Container {
  static create(value) {
    let tagName = 'tr';
    let node = super.create(tagName);
    return node;
  }

  optimize() {
    super.optimize();
    let next = this.next;
    if (next != null && next.prev === this &&
        next.statics.blotName === this.statics.blotName &&
        next.domNode.tagName === this.domNode.tagName) {
      next.moveChildren(this);
      next.remove();
    }
  }

}

TableRow.blotName = 'tr';
TableRow.tagName = 'tr';
TableRow.scope = Parchment.Scope.BLOCK_BLOT;
TableRow.defaultChild = 'td';
Quill.register(TableRow);

//
//
// CONTAINER TABLE
//

class Table extends Container {
  static create(value) {
    let tagName = 'table';
    let node = super.create(tagName);
    return node;
  }

  optimize() {
    super.optimize();
    let next = this.next;
    if (next != null && next.prev === this &&
        next.statics.blotName === this.statics.blotName &&
        next.domNode.tagName === this.domNode.tagName) {
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
Quill.register(Table);

//
//
// CONTAINER TD
//

class TableCell extends ContainBlot {
  static create(value) {
    let node = super.create('td');
    node.setAttribute('id', value);
    return node;
  }

  format() {
    this.getAttribute('id');
  }

  formats() {
    // We don't inherit from FormatBlot
    return { [this.statics.blotName]: this.domNode.getAttribute('id') }
  }

  optimize() {
    super.optimize();

    // Add parent TR and TABLE when missing
    let parent = this.parent;
    console.log('optimizing parent for TD:')
    console.log(parent)
    if (parent != null && parent.statics.blotName != 'tr') {
      let table = Parchment.create('table')
      let tr = Parchment.create('tr')
      table.appendChild(tr);
      tr.appendChild(this);
      parent.appendChild(table);
    }

    // merge same TD id
    let next = this.next;
    if (next != null && next.prev === this &&
        next.statics.blotName === this.statics.blotName &&
        next.domNode.tagName === this.domNode.tagName &&
        next.domNode.getAttribute('id') === this.domNode.getAttribute('id')) {
      next.moveChildren(this);
      next.remove();
    }
    console.log("End of TD optimize")
  }
}

TableCell.blotName = 'td';
TableCell.tagName = 'td';
TableCell.scope = Parchment.Scope.BLOCK_BLOT;
TableCell.defaultChild = 'block';
TableCell.allowedChildren = [Block, BlockEmbed, Container];
Quill.register(TableCell);
TableRow.allowedChildren = [TableCell];





Quill.debug('info');