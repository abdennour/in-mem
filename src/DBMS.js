import {deepAssign, getId} from './helper';
import {Autobind} from 'babel-autobind';
/**
 * @name Overview
 * @example
 *  import {insert, find} from 'in-mem';

 *  const personA = insert('person', {firstname:'Ahmed'});

 *  find(personA.id) // {id: '...',firstname:"Ahmed", dateCreated: "2017-02-12T07:24:57.612Z"}
 */
@Autobind
class DBMS extends Array {

  id = getId();

  getId() {
   return getId(...arguments);
  }

  /**
   * Insert data in in-memory database.
   * @method insert
   * @param  {String} table   Table Name of database
   * @param  {Object} records it can be one of multiple records (overloaded function)
   * @return {Object|Array}         the data itself with new attributes which are "id" and "dateCreated"
   *
   * @example
   *    const {insert} = require('in-mem');
   *    insert('person', {firstname: "Ahmed", birth: new Date("1991/10/12")});
   *    insert('product', {name: "مراعي"}, {name: "iPhone"});
   *
   */
   insert(table, ...records) {
    const added = records.map(record => {
      const id = this.getId(table, table),
      updatedRecord= deepAssign(record, {id, dateCreated: new Date()});
      this.push(updatedRecord);
      return updatedRecord;
    });
    if (records.length === 1)
      return added[0]

    return added;

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
