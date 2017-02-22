let Inline = Quill.import('blots/inline');
let Block = Quill.import('blots/block');
let Delta = Quill.import('delta');
let BlockEmbed = Quill.import('blots/block/embed');

//
//
// TABLE TAG
//

class StaticInline extends Inline {
  // static formats(node) {
  //   console.log('inline formats');
  // }
  //
  // delta() {
  //   console.log('inline delta');
  // }
  //
  // format(name, value) {
  //   console.log('table format');
  // }
  //
  // formatAt(index, length, name, value) {
  //   console.log('table formatAt');
  // }
  //
  // insertAt(index, value, def) {
  //   console.log('table insertAt');
  // }
  //
  // optimize() {
  //   console.log('inline optimize');
  // }
  //
  // replace(target) {
  //   console.log('inline replace');
  // }
  //
  // remove() {
  //   console.log('inline remove');
  // }
}
Quill.register(StaticInline);

class Td extends StaticInline {}

Td.blotName = 'td';
Td.tagName = 'td';
Quill.register(Td);

class Tr extends StaticInline {}

Tr.blotName = 'tr';
Tr.tagName = 'tr';
Quill.register(Tr);

class Tbody extends StaticInline {}

Tbody.blotName = 'tbody';
Tbody.tagName = 'tbody';
Quill.register(Tbody);

class Table extends BlockEmbed {
  static create(value) {
    let node = super.create(value);

    if(value === true || value.includes('newtable_')) {
      node = this.generate_empty_table(value, node);
    } else if(typeof value === 'string' || value.includes('td')) {
      node.innerHTML = value;
    }

    return node;
  }

  static generate_empty_table(value, node) {
    let cols = 5;
    let rows = 5;
    if(typeof value === 'string' && value.includes('newtable_')) {
      value = value.split('_');
      rows = value[1];
      cols = value[2];
    } else {
      rows = prompt('Number of rows?', cols);
      cols = prompt('Number of cols?', cols);
    }
    value = [];
    for (let r = 0; r < rows; r++) {
      value[r] = [];
      for (let c = 0; c < cols; c++) {
        value[r].push("");
      }
    }
    var tbody = document.createElement('tbody');
    value.forEach(row => {
      var tr = document.createElement('tr');
      tbody.appendChild(tr);
      row.forEach(cell => {
        let td = document.createElement('td');
        td.innerText = cell;
        tr.appendChild(td);
      })
    })
    node.appendChild(tbody);
    return node;
  }

  static value(node) {
    console.log('table value');
    var ret = [];
    if(node.tagName === 'table') {
      let rows = node.rows;
      for (let i = 0; i < rows.length; i++) {
        ret[i] = [];
        for (let j = 0; j < rows[i].cells.length; j++) {
          ret[i].push(rows[i].cells[j].innerText);
        }
      }
    }
    return ret;
  }

  static formats(node) {
    console.log('table formats');
    // super.formats(node);
  }

  delta() {
    // console.log('table delta');
    let d = new Delta().insert({ table: this.domNode.innerHTML });
    return d;
  }

  // format(name, value) {
  //   console.log('table format');
  //   // super.format(name, value);
  // }

  // formatAt(index, length, name, value) {
  //   console.log('table formatAt');
  //   // super.formatAt(index, length, name, value);
  // }

  insertAt(index, value, def) {
    console.log('table insertAt');
    // super.insertAt(index, value, def);
  }

  // optimize() {
  //   console.log('table optimize');
  //   super.optimize();
  // }

  replace(target) {
    console.log('table replace');
    super.replace(target);
  }

  remove() {
    console.log('table remove');
    var remove_table = confirm('Are you sure you want to remove this table?');
    if (remove_table) super.remove();
  }
}

Table.blotName = 'table';
Table.tagName = 'table';
Quill.register(Table);

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
