[![Build Status](https://travis-ci.org/abdennour/in-mem.svg?branch=master)](https://travis-ci.org/abdennour/in-mem)
[![Coverage Status](https://coveralls.io/repos/github/abdennour/in-mem/badge.svg?branch=master)](https://coveralls.io/github/abdennour/in-mem?branch=master)

# Overview :

In-memory NoSQL database which accepts any Javascript object including JSON data of course.

In-memory terminology has two meanings according to the side:

- Client Side : In-memory 👉🏼 if the page is not reloaded or left.

- Server Side : In-memory 👉🏼 if the application is still running.

# Install

```bash
npm install in-mem --save;
```
or as CDN :

 ```html
<script src="https://cdn.rawgit.com/abdennour/in-mem/9b5f99b7/cdn/in-mem-latest.min.js" type="text/javascript"></script>
```

# Example :

```js
import {insert, find} from 'in-mem';

const personA = insert('person', {firstname:'Ahmed'});

find(personA.id) // {id: '...',firstname:"Ahmed", dateCreated: "2017-02-12T07:24:57.612Z"}

```

# Example when using CDN not NPM:

```html
<script src="https://cdn.rawgit.com/abdennour/in-mem/9b5f99b7/cdn/in-mem-latest.min.js" type="text/javascript"></script>
<script >
 const {insert, find} = inMem;

 const personA = insert('person', {firstname:'Ahmed'});

 find(personA.id) // {id: '...',firstname:"Ahmed", dateCreated: "2017-02-12T07:24:57.612Z"}

</script>
```

# Syntax :

```js
insert('table_name', record);
insert('table_name', record1, record2,..., recordN);

findAll('table_name');
findAll('table_name', (record) => record.firstname === 'Ahmed');

findById('table_name', id);

find('table_name', (record) =>  record.firstname === 'Ahmed');

update('table_name', (record) => record.firstname === 'Ahmed', id, {lastname:  'Toto'});

del('table_name') // delete the whole table
del('table_name', id);
```


# License:

MIT .
