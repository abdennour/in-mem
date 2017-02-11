import 'jsdom-global/register';
import expect from 'expect';
import sinon from 'sinon';

import {
 dbms,
 insert,
 select,
 update,
 del
} from '../src';
describe(`in-mem`, () => {

  it(`inserts elements`, () => {
     expect(dbms.length).toEqual(0);
     insert('person', {firstname:'Ahmed', m:'l'});
     expect(dbms.length).toEqual(1);
  });

})
