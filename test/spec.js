import 'jsdom-global/register';
import expect from 'expect';
import sinon from 'sinon';

import {
  dbms,
  insert,
  find,
  findAll,
  findById,
  update,
  del
} from '../src';
describe(`in-mem`, () => {

  it(`inserts elements`, () => {
    expect(dbms.length).toEqual(0);
    insert('person', {
      firstname: 'Ahmed',
      m: 'l'
    });
    expect(dbms.length).toEqual(1);
  });

  it(`finds elements`, () => {
    insert('person', {
      firstname: 'Ahmed',
      m: true
    },{
      fullname:'Raki Maki',
      phone: 93340232,
      bestDigits: [4, 7, 9]
    }, {
      firstname: 'Ahmed',
      phone: 9332232
    });
    expect(findAll('person', (r) => r.firstname === 'Ahmed').length).toEqual(2);
  });

   it(`updates element`, () => {
      const elementA = insert('school', {name:'Xxxx', opened: 1330, capacity: 440});
      const id = elementA.id;
      update('school', id, {capacity: 1000} );
      const elementB= findById('school', id );
      expect(elementB.name).toEqual('Xxxx');
      expect(elementB.capacity).toEqual(1000);
    })


})
