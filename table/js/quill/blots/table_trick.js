let Parchment = Quill.import('parchment');


class TableTrick {
  static random_id() {
    return Math.random().toString(36).slice(2)
  }
  static find_td(what) {
    let leaf = quill.getLeaf(quill.getSelection()['index']);
    let blot = leaf[0];
    for(;blot!=null && blot.statics.blotName!=what;) {
      blot=blot.parent;
    }
    return blot; // return TD or NULL
  }
  static append_col() {
    let td = TableTrick.find_td('td')
    if(td) {
      let table = td.parent.parent;
      let table_id = table.domNode.getAttribute('table_id')
      td.parent.parent.children.forEach(function(tr) {
        let row_id = tr.domNode.getAttribute('row_id')
        let cell_id = TableTrick.random_id();
        let td = Parchment.create('td', table_id+'|'+row_id+'|'+cell_id);
        tr.appendChild(td);
      });
    }
  }
  static append_row() {
    let td = TableTrick.find_td('td')
    if(td) {
      let col_count = td.parent.children.length;
      let table = td.parent.parent;
      let new_row = td.parent.clone()
      let table_id = table.domNode.getAttribute('table_id')
      let row_id = TableTrick.random_id();
      new_row.domNode.setAttribute('row_id', row_id)
      for (var i = col_count - 1; i >= 0; i--) {
        let cell_id = TableTrick.random_id();
        let td = Parchment.create('td', table_id+'|'+row_id+'|'+cell_id);
        new_row.appendChild(td);
      };
      table.appendChild(new_row);
      console.log(new_row);
    }
  }

}


export default TableTrick