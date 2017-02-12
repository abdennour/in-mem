import React from 'react';
import {insert, find} from 'in-mem';

class App extends React.Component {

  componentWillMount() {
     const {id} =insert('person', {firstname: 'Ahmed'});
     this.currentUserId = id;
  }
  render() {

    const user= find(this.currentUserId);

    return (<div><h3>in-mem : </h3>
      <p>{JSON.stringify(user)}</p>
    </div>);
  }
}

export default App;
