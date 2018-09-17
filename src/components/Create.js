import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Create extends Component {
  constructor() {
    super();
    this.state = {
      todo: {
        title: "",
        finished: false
      }
    };
  }
  onChange = e => {
    const { todo } = this.state;
    todo[e.target.name] = e.target.value;
    this.setState({ todo });
  };

  onSubmit = e => {
    e.preventDefault();
    const { title,finished } = this.state.todo;
    axios
      .post("http://localhost:8081/api/todo", {
        title,
        finished
      })
      .then(result => {
        this.props.history.push("/");
      });
  };

  render() {
    const { todo } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">ADD Todo</h3>
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
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={todo.title}
                  onChange={this.onChange}
                  placeholder="Title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="finished">Finished:</label>
                <input
                  type="text"
                  className="form-control"
                  name="finished"
                  value={todo.finished}
                  onChange={this.onChange}
                  placeholder="Finished"
                />
              </div>
              <button className="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
