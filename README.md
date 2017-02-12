[![Build Status](https://travis-ci.org/abdennour/in-mem.svg?branch=master)](https://travis-ci.org/abdennour/in-mem)
[![Coverage Status](https://coveralls.io/repos/github/abdennour/in-mem/badge.svg?branch=master)](https://coveralls.io/github/abdennour/in-mem?branch=master)

# Overview :

In-memory NoSQL database which is accept any Javascript object including JSON data of course.

 In-memory terminology has two meanings according to the side:

      - Client Side : In-memory if the page is not reloaded or left.
      - Server Side : In-memory if the application is still running.

# Install

```bash
npm install in-mem --save;
```

# Example :

```js
import {insert, find} from 'in-mem';

const personA = insert('person', {firstname:'Ahmed'});

find(personA.id) // {id: '...',firstname:"Ahmed", dateCreated: "2017-02-12T07:24:57.612Z"}

```

#Syntax :

```js
insert('table_name', record);
insert('table_name', record1, record2,..., recordN);

findAll('table_name');
findAll('table_name', (record) => record.firstname === 'Ahmed');

findById('table_name', id);

find('table_name', (record) =>  record.firstname === 'Ahmed');

update('table_name', id, {lastname:  'Toto'});

del('table_name') // delete the whole table
del('table_name', id);
```

# License:

MIT .
