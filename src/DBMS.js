import {deepAssign, getId} from './helper';
import {Autobind} from 'babel-autobind';

@Autobind
class DBMS extends Array {

  id = getId();

  insert(table, record) {
    const id = getId(table, table),updatedRecord= deepAssign(record, {id});
    this.push(updatedRecord);
    return updatedRecord;
  }

  update(table , id , newRecord, override = false) {
    const recordIndex= this.findIndex((record) =>  DBMS.isBelongsTo(record, table) && record.id === id);
    if (recordIndex >= 0) {
      this[recordIndex]= override ? deepAssign({id:this[recordIndex].id }, newRecord) : deepAssign(this[recordIndex], newRecord);
      return this[recordIndex];
    }
  }

  find(table, where = ((record, i) => true)) {
    if (arguments.length === 1)
      return this.filter((record) => DBMS.isBelongsTo(record, table));
    else
      return this.filter((record, i) => DBMS.isBelongsTo(record, table) && where(record, i));
  }

  remove(table, where) {

    if (arguments.length === 1)
      this.removeIf((record) => DBMS.isBelongsTo(record, table))
    else
      this.removeIf((record, i) => DBMS.isBelongsTo(record, table) && where(record, i))
  }

  removeIf(callback) {
    let i = this.length;
    while (i--) {
      if (callback(this[i], i)) {
        this.splice(i, 1);
      }
    }
  }



  static isBelongsTo(record, table) {
    return record.id.startsWith(table) && record.id.endsWith(table);
  }

}

export const dbms= new DBMS();
export default DBMS;
