let Parchment = Quill.import('parchment');
let Break = Quill.import('blots/break');
let Container = Quill.import('blots/container');
let Inline = Quill.import('blots/inline');
let Block = Quill.import('blots/block');
let Delta = Quill.import('delta');
let Embed = Quill.import('blots/embed');
let BlockEmbed = Quill.import('blots/block/embed');
let TextBlot = Quill.import('blots/text');

//
//
// TABLE TAG
//

class extendedContainer extends Container {

  static create (value) {
    console.log('create' + ' (' + this.blotName.toUpperCase() + ')');
    console.log('*** length() skipped' + ' (' + this.blotName.toUpperCase() + ') ***');
    let node = super.create(value);
    return node;
  }

  static formats(node) {
    console.log('formats' + ' (' + this.domNode.nodeName + ')');
    super.formats(node);
  }

  delta() {
    console.log('delta' + ' (' + this.domNode.nodeName+ ')');
    super.delta();
  }

  format(name, value) {
    console.log('format' + ' (' + this.domNode.nodeName + ')');
    super.format(name, value);
  }

  formatAt(index, length, name, value) {
    console.log('formatAt' + ' (' + this.domNode.nodeName+ ')');
    super.formatAt(index, length, name, value);
  }

  insertBefore(blot, ref) {
    console.log('insertBefore' + ' (' + this.domNode.nodeName + ')');
    super.insertBefore(blot, ref);
  }

  insertAt(index, value, def) {
    console.log('insertAt' + ' (' + this.domNode.nodeName + ')');
    super.insertAt(index, value, def);
  }

  optimize() {
    console.log('optimize' + ' (' + this.domNode.nodeName + ')');
    super.optimize();
  }

  replace(target) {
    console.log('replace' + ' (' + this.domNode.nodeName + ')');
    super.replace(target);
  }

  remove() {
    console.log('remove' + ' (' + this.domNode.nodeName + ')');
    super.remove();
  }

  appendChild(other) {
    console.log('appendChild' + ' (' + this.domNode.nodeName + ')');
    super.appendChild(other);
  }

  attach() {
    console.log('attach' + ' (' + this.domNode.nodeName + ')');
    super.attach();
  }

  deleteAt(index, length) {
    console.log('deleteAt' + ' (' + this.domNode.nodeName + ')');
    super.deleteAt(index, length);
  }

  detach() {
    console.log('detach' + ' (' + this.domNode.nodeName + ')');
    super.detach();
  }

  length() {
    // console.log('length' + ' (' + this.domNode.nodeName + ')');
    super.length();
  }

  moveChildren(targetParent, refNode) {
    console.log('moveChildren' + ' (' + this.domNode.nodeName + ')');
    super.moveChildren(targetParent, refNode);
  }

  path(index, inclusive) {
    console.log('path' + ' (' + this.domNode.nodeName + ')');
    super.path(index, inclusive);
  }

  removeChild(child) {
    console.log('removeChild' + ' (' + this.domNode.nodeName + ')');
    super.removeChild(child);
  }

  split(index, force) {
    console.log('split' + ' (' + this.domNode.nodeName + ')');
    super.split(index, force);
  }

  unwrap() {
    console.log('uwrap' + ' (' + this.domNode.nodeName + ')');
    super.unwrap();
  }

  update(mutations) {
    console.log('uwrap' + ' (' + this.domNode.nodeName + ')');
    super.update(mutations);
  }

}
Quill.register(extendedContainer);

class Td extends extendedContainer {
  static create(value) {
    let node = super.create(value);
    // let block = Block.create(value);
    // node.appendChild(block);
    return node;
  }
}

Td.blotName = 'td';
Td.tagName = 'td';
Td.allowedChildren = [Block, Embed, Break, Inline, TextBlot, Container];
Td.scope = Parchment.Scope.BLOCK_BLOT;
Quill.register(Td);

class Tr extends extendedContainer {
  static create(value) {
    let node = super.create(value);
    let cols = 0;

    if(typeof value === 'string' && value.includes('newtable_')) {
      let value_arr = value.split('_');
      cols = value_arr[2];
    } else {
      alert('error');
    }

    for (let c = 0; c < cols; c++) {
      let td = Td.create(' ');
      node.appendChild(td);
    }

    return node;
  }
}

Tr.blotName = 'tr';
Tr.tagName = 'tr';
Tr.defaultChild = 'td'
Tr.allowedChildren = [Td];
Tr.scope = Parchment.Scope.BLOCK_BLOT;
Quill.register(Tr);

class Tbody extends extendedContainer {
  static create(value) {
    let node = super.create(value);
    let rows = 0;

    if(typeof value === 'string' && value.includes('newtable_')) {
      let value_arr = value.split('_');
      rows = value_arr[1];
    } else {
      alert('error');
    }

    for (let r = 0; r < rows; r++) {
      let tr = Tr.create(value);
      node.appendChild(tr);
    }

    return node;
  }
}

Tbody.blotName = 'tbody';
Tbody.tagName = 'tbody';
Tbody.defaultChild = 'tr'
Tbody.allowedChildren = [Tr];
Tbody.scope = Parchment.Scope.BLOCK_BLOT;
Quill.register(Tbody);

class Table extends extendedContainer {
  static create(value) {
    let node = super.create(value);

    let tbody = Tbody.create(value);
    node.appendChild(tbody);

    // if(value === true || value.includes('newtable_')) {
    //   node = this.generate_empty_table(value, node);
    // } else if(typeof value === 'string' || value.includes('td')) {
    //   node.innerHTML = value;
    // }

    return node;
  }

  // static generate_empty_table(value, node) {
  //   let cols = 5;
  //   let rows = 5;
  //   if(typeof value === 'string' && value.includes('newtable_')) {
  //     let value = value.split('_');
  //     rows = value[1];
  //     cols = value[2];
  //   } else {
  //     rows = prompt('Number of rows?', cols);
  //     cols = prompt('Number of cols?', cols);
  //   }
  //   value = [];
  //   for (let r = 0; r < rows; r++) {
  //     value[r] = [];
  //     for (let c = 0; c < cols; c++) {
  //       value[r].push("");
  //     }
  //   }
  //   var tbody = document.createElement('tbody');
  //   value.forEach(row => {
  //     var tr = document.createElement('tr');
  //     tbody.appendChild(tr);
  //     row.forEach(cell => {
  //       let td = document.createElement('td');
  //       td.innerText = cell;
  //       tr.appendChild(td);
  //     })
  //   })
  //   node.appendChild(tbody);
  //   return node;
  // }
}

Table.blotName = 'table';
Table.tagName = 'table';
Table.defaultChild = 'tbody'
Table.allowedChildren = [Tbody];
Table.scope = Parchment.Scope.BLOCK_BLOT;
Quill.register(Table);

// //
// //
// // EMBED TABLE TAG
// //
//
// class StaticInline extends Inline {}
// Quill.register(StaticInline);
//
// class InlineTd extends StaticInline {}
//
// InlineTd.blotName = 'inline_td';
// InlineTd.tagName = 'td';
// Quill.register(InlineTd);
//
// class InlineTr extends StaticInline {}
//
// InlineTr.blotName = 'inline_tr';
// InlineTr.tagName = 'tr';
// Quill.register(InlineTr);
//
// class InlineTbody extends StaticInline {}
//
// InlineTbody.blotName = 'inline_tbody';
// InlineTbody.tagName = 'tbody';
// Quill.register(InlineTbody);
//
// class EmbedTable extends BlockEmbed {
//   static create(value) {
//     let node = super.create(value);
//
//     if(value === true || value.includes('newtable_')) {
//       node = this.generate_empty_table(value, node);
//     } else if(typeof value === 'string' || value.includes('td')) {
//       node.innerHTML = value;
//     }
//
//     return node;
//   }
//
//   static generate_empty_table(value, node) {
//     let cols = 5;
//     let rows = 5;
//     if(typeof value === 'string' && value.includes('newtable_')) {
//       value = value.split('_');
//       rows = value[1];
//       cols = value[2];
//     } else {
//       rows = prompt('Number of rows?', cols);
//       cols = prompt('Number of cols?', cols);
//     }
//     value = [];
//     for (let r = 0; r < rows; r++) {
//       value[r] = [];
//       for (let c = 0; c < cols; c++) {
//         value[r].push("");
//       }
//     }
//     var tbody = document.createElement('tbody');
//     value.forEach(row => {
//       var tr = document.createElement('tr');
//       tbody.appendChild(tr);
//       row.forEach(cell => {
//         let td = document.createElement('td');
//         td.innerText = cell;
//         tr.appendChild(td);
//       })
//     })
//     node.appendChild(tbody);
//     return node;
//   }
//
//   // static value(node) {
//   //   console.log('table value');
//   //   var ret = [];
//   //   if(node.tagName === 'table') {
//   //     let rows = node.rows;
//   //     for (let i = 0; i < rows.length; i++) {
//   //       ret[i] = [];
//   //       for (let j = 0; j < rows[i].cells.length; j++) {
//   //         ret[i].push(rows[i].cells[j].innerText);
//   //       }
//   //     }
//   //   }
//   //   return ret;
//   // }
//
//   // static formats(node) {
//   //   console.log('table formats');
//   //   super.formats(node);
//   // }
//
//   delta() {
//     // console.log('table delta');
//     let d = new Delta().insert({ embed_table: this.domNode.innerHTML });
//     return d;
//   }
//
//   // format(name, value) {
//   //   console.log('table format');
//   //   // super.format(name, value);
//   // }
//
//   // formatAt(index, length, name, value) {
//   //   console.log('table formatAt');
//   //   // super.formatAt(index, length, name, value);
//   // }
//
//   // insertAt(index, value, def) {
//   //   console.log('table insertAt');
//   //   super.insertAt(index, value, def);
//   // }
//
//   // optimize() {
//   //   console.log('table optimize');
//   //   super.optimize();
//   // }
//
//   // replace(target) {
//   //   console.log('table replace');
//   //   super.replace(target);
//   // }
//
//   remove() {
//     console.log('table remove');
//     var remove_table = confirm('Are you sure you want to remove this table?');
//     if (remove_table) super.remove();
//   }
// }
//
// EmbedTable.blotName = 'embed_table';
// EmbedTable.tagName = 'table';
// Quill.register(EmbedTable);

//
//
// PLACEHOLDER TAG
//

const placeholder_tag = 'x-placeholder'

class PlaceholderBlot extends Inline { }

PlaceholderBlot.blotName = 'placeholder';
PlaceholderBlot.tagName = placeholder_tag;
Quill.register(PlaceholderBlot);

//
//
// IF TAG
//

const if_tag = 'x-if'

class IfBlot extends Block {
  static create(value) {
    let node = super.create();
    node.setAttribute('data-variable', value);
    return node;
  }

  static formats(node) {
    return node.getAttribute('data-variable');
  }
}

IfBlot.blotName = 'if';
IfBlot.tagName = 'x-if';
Quill.register(IfBlot);

//
//
// REGISTER NEW HTML ELEMENTS
//

document.registerElement(placeholder_tag, {
  prototype: Object.create(HTMLButtonElement.prototype),
  extends: 'span'
});

document.registerElement(if_tag, {
  prototype: Object.create(HTMLButtonElement.prototype),
  extends: 'div'
});
