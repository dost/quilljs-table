import Table from 'table';
import TableRow from 'table_row';
import TableCell from 'table_cell';
import TableTrick from 'table_trick';
import ContainBlot from 'contain';

Quill.register({
  'blots/table'        : Table,
  'blots/table_row'    : TableRow,
  'blots/table_cell'   : TableCell,
  'blots/contain'      : ContainBlot
});
