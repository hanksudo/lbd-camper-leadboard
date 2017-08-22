import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function User(props) {
  return (
    <tr>
      <td>{props.index + 1}</td>
      <td className="username">
        <a href={"https://www.freecodecamp.com/" + props.user.username} target="_blank">
          <figure className="image is-48x48 is-pulled-left">
            <img src={props.user.img} alt={props.user.username} />
          </figure>
          &nbsp;{props.user.username}
        </a>
      </td>
      <td>{props.user.recent}</td>
      <td>{props.user.alltime}</td>
    </tr>
  );
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      sortBy: 'recent',
      users: []
    };
  }
  reloadData(key) {
    var that = this;
    fetch('https://fcctop100.herokuapp.com/api/fccusers/top/' + key)
      .then(response => response.json())
      .then(json => that.setState({users: json}));
  }

  componentWillMount() {
    this.reloadData(this.state.sortBy);
  }
  
  isSorting(key) {
    return (key === this.state.sortBy) ? 'true' : '';
  }

  handleSort(key) {
    if (key === this.state.sortBy) return;
    this.setState({sortBy: key});
    this.reloadData(key);
  }
  render() {
    const userList = this.state.users.map((user, index) => {
      return <User key={index} user={user} index={index} />
    })
    return (
      <table className="table is-bordered is-striped is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th>Camper Name</th>
            <th onClick={() => this.handleSort('recent')} width="25%">
              <abbr 
                title="Sort by past 30 days"
                className={`sorted ${this.isSorting('recent')}`}>Points in past 30 days</abbr>
            </th>
             <th onClick={() => this.handleSort('alltime')} width="25%">
              <abbr
                title="Sort by all time"
                className={`sorted ${this.isSorting('alltime')}`}>All time points</abbr>
            </th>
          </tr>
        </thead>
        <tbody>
          {userList}
        </tbody>
      </table>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));