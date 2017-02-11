import {dbms} from './DBMS';
export {dbms};
export const insert = dbms.insert.bind(this);
export const select = dbms.find.bind(this);
export const update = dbms.update.bind(this);
export const del = dbms.remove.bind(this);
