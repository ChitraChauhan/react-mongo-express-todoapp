import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: {}
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8081/api/todo/" + this.props.match.params.id)
      .then(res => {
        this.setState({ todo: res.data });
        console.log(this.state.todo);
      });
  }

  delete(id) {
    console.log(id);
    axios.delete("http://localhost:8081/api/todo/" + id).then(result => {
      this.props.history.push("/");
    });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">{this.state.todo.title}</h3>
          </div>
          <div className="panel-body">
            <h4>
              <Link to="/">
                <span
                  className="glyphicon glyphicon-th-list"
                  aria-hidden="true"
                />{" "}
                Todo List
              </Link>
            </h4>
            <dl>
              <dt>Title:</dt>
              <dd>{this.state.todo.title}</dd>
              <dt>Finished:</dt>
              <dd>{this.state.todo.finished}</dd>
            </dl>
            <Link
              to={`/edit/${this.state.todo._id}`}
              className="btn btn-success"
            >
              Edit
            </Link>
            &nbsp;
            <button
              onClick={this.delete.bind(this, this.state.todo._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
