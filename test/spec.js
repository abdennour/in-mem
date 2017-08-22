import 'jsdom-global/register';
import expect from 'expect';
import sinon from 'sinon';
import { fixtures } from './helper';
import {
  dbms,
  insert,
  find,
  findAll,
  findById,
  findByLocalId,
  update,
  del,
  count
} from '../src';

describe(`in-mem`, () => {
  beforeEach(() => {
    dbms.splice(0); // clear in-mem database
  });
  it(`inserts elements`, () => {
    expect(dbms.length).toEqual(0);
    insert('person', {
      firstname: 'Ahmed',
      m: 'l'
    });
    expect(dbms.length).toEqual(1);
  });

  it(`finds elements`, () => {
    insert(
      'person',
      {
        firstname: 'Ahmed',
        m: true
      },
      {
        fullname: 'Raki Maki',
        phone: 93340232,
        bestDigits: [4, 7, 9]
      },
      {
        firstname: 'Ahmed',
        phone: 9332232
      }
    );
    expect(findAll('person', r => r.firstname === 'Ahmed').length).toEqual(2);
  });

  it(`updates element`, () => {
    const elementA = insert('school', {
      name: 'Xxxx',
      opened: 1330,
      capacity: 440
    });
    const localId = elementA.$$id;
    update('school', r => r.name === 'Xxxx', {
      capacity: 1000
    });
    const elementB = findByLocalId('school', localId);
    expect(elementB.name).toEqual('Xxxx');
    expect(elementB.capacity).toEqual(1000);
  });

  it(`updates element with accessing to current through callback`, () => {
    const elementA = insert('school', {
      name: 'Xxxx',
      opened: 1330,
      capacity: 440
    });
    const localId = elementA.$$id;
    update(
      'school',
      r => r.name === 'Xxxx',
      current => ({ capacity: current.capacity + 10 }) // new Record returned from callback to leverage the current record
    );
    const elementB = findByLocalId('school', localId);
    expect(elementB.name).toEqual('Xxxx');
    expect(elementB.capacity).toEqual(440 + 10);
  });

  it('removes element', () => {
    insert('event', {
      name: 'How to learn Js',
      location: {
        lat: 33,
        long: 45
      }
    });

    insert('event', {
      name: 'Presentation',
      location: {
        lat: 33,
        long: 45
      }
    });
    const sizeBeforeRemove = dbms.length;
    del('event', event => event.name === 'Presentation');
    expect(dbms.length).toEqual(sizeBeforeRemove - 1);
  });
  it('removes the whole table', () => {
    fixtures();
    expect(findAll('product').length).toEqual(33);
    del('product');
    expect(findAll('product').length).toEqual(0);
  });

  it('counts elements of table', () => {
    fixtures();
    expect(count('product')).toEqual(findAll('product').length);
  });

  it(`counts elements of the whole store`, () => {
    fixtures();
    expect(count()).toEqual(dbms.length);
  });
});
