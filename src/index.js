import {dbms} from './DBMS';
export {dbms};
export const insert = dbms.insert.bind(this);
export const findAll = dbms.findAll.bind(this);
export const find = dbms.find.bind(this);
export const findById = dbms.findById.bind(this);
export const update = dbms.update.bind(this);
export const del = dbms.remove.bind(this);
