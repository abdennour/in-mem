import {deepAssign, getId} from './helper';
import {Autobind} from 'babel-autobind';

@Autobind
class DBMS extends Array {

  id = getId();

  getId() {
   return getId(...arguments);
  }

  insert(table, record) {
    const id = this.getId(table, table),
    updatedRecord= deepAssign(record, {id, dateCreated: new Date()});
    this.push(updatedRecord);
    return updatedRecord;
  }

  update(table , id , newRecord, override = false) {
    const recordIndex= this.findIndex((record) =>  DBMS.isBelongsTo(record, table) && record.id === id);
    if (recordIndex >= 0) {
      newRecord= deepAssign( newRecord, {id: this[recordIndex].id, lastUpdated: new Date() });
      this[recordIndex]= override ? newRecord: deepAssign(this[recordIndex], newRecord);
      return this[recordIndex];
    }
  }

  findAll(table, where = ((record, i) => true)) {
    if (arguments.length === 1)
      return this.filter((record) => DBMS.isBelongsTo(record, table));
    else
      return this.filter((record, i) => DBMS.isBelongsTo(record, table) && where(record, i));
  }

  find() {
   const results = this.findAll(...arguments);
   if (results.length)
    return results[0];
  }

  findById(table, id) {
   return this.find(table, (record) => record.id === id);
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

  count(table) {
   if (!arguments.length)
    return this.length;
   return this.findAll(table).length;
  }

  static isBelongsTo(record, table) {
    return record.id.startsWith(table) && record.id.endsWith(table);
  }

}

export const dbms= new DBMS();
export default DBMS;
