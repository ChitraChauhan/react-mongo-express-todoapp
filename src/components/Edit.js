import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Edit extends Component {
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

  onChange = e => {
    const state = this.state.todo;
    state[e.target.name] = e.target.value;
    this.setState({ todo: state });
  };

  onSubmit = e => {
    e.preventDefault();

    const { title, finished } = this.state.todo;

    axios
      .put("http://localhost:8081/api/todo/" + this.props.match.params.id, {
        title,
        finished
      })
      .then(result => {
        this.props.history.push("/show/" + this.props.match.params.id);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">EDIT todo</h3>
          </div>
          <div className="panel-body">
            <h4>
              <Link to={`/show/${this.state.todo._id}`}>
                <span
                  className="glyphicon glyphicon-eye-open"
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
                  value={this.state.todo.title}
                  onChange={this.onChange}
                  placeholder="Title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="author">Finished:</label>
                <input
                  type="text"
                  className="form-control"
                  name="finished"
                  value={this.state.todo.finished}
                  onChange={this.onChange}
                  placeholder="Finished"
                />
              </div>
              <button type="submit" className="btn btn-default">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
