import React, { Component } from "react";
import axios from "axios";

const defaultTodo = {
  title: "",
  finished: false
};

const FormContainer = ({ todo, onChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <input type="text" name="title" value={todo.title} onChange={onChange} />
    {todo._id ? <button>update</button> : <button>Add</button>}
  </form>
);

const ListContainer = ({ todos, updateTodo, removeTodo }) => (
  <ul>
    {todos &&
      todos.map((todo, index) => (
        <Item
          key={index}
          todo={todo}
          updateTodo={() => updateTodo(todo)}
          removeTodo={() => removeTodo(todo._id)}
        />
      ))}
  </ul>
);

const Item = ({ todo, updateTodo, removeTodo }) => {
  return (
    <div>
      <li style={{ float: "left" }} onClick={updateTodo}>
        <input
          type="checkbox"
          checked={todo.finished}
          onChange={e => (todo.finished = !todo.finished)}
        />{" "}
        {todo.title}
      </li>
      <button style={{ float: "center" }} onClick={() => removeTodo(todo._id)}>
        Remove
      </button>
    </div>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: { ...defaultTodo },
      todos: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8081/api/todo").then(res => {
      this.setState({ todos: res.data });
      console.log(this.state.todos);
    });
  }

  onChange = e => {
    const { todo } = this.state;
    todo[e.target.name] = e.target.value;
    this.setState({ todo });
  };

  unfinished() {
    return this.state.todos.filter(todo => !todo.finished).length;
  }

  findIndex(_id) {
    const { todos } = this.state;
    return todos.findIndex(record => record._id === _id);
  }

  updateTodo(record) {
    this.setState({ todo: record });
  }

  removeTodo(_id) {
    console.log("id", _id);
    const { todos } = this.state;
    const findTodoIndex = this.findIndex(_id);
    console.log("findTodoIndex", findTodoIndex);
    axios.delete("http://localhost:8081/api/todo/" + _id).then(result => {
      // this.props.history.push("/");
      todos.splice(findTodoIndex, 1);
      this.setState({ todos: [...todos] });
    });
  }

  onSubmit = e => {
    e.preventDefault();
    const { todo, todos } = this.state;
    if (todo._id) {
      const index = this.findIndex(todo._id);
      todos[index] = todo;
      axios
        .put("http://localhost:8081/api/todo/" + todo._id, todos[index])
        .then(result => {
          // this.props.history.push("/show/" + this.props.match.params.id);
          this.setState({ todos: [...todos], todo: { ...defaultTodo } });
        });
    } else {
      axios
        .post("http://localhost:8081/api/todo", {
          // id: ++todo.id,
          title: todo.title,
          finished: false
        })
        .then(result => {
          // this.props.history.push("/");
          this.setState({
            todos: [result.data, ...todos],
            todo: { ...defaultTodo }
          });
        });
    }
  };

  render() {
    const { todos, todo } = this.state;
    return (
      <div>
        <FormContainer
          todo={todo}
          onChange={e => this.onChange(e)}
          onSubmit={e => this.onSubmit(e)}
        />
        <ListContainer
          todos={todos}
          updateTodo={todo => this.updateTodo(todo)}
          removeTodo={id => this.removeTodo(id)}
        />
        <div>Pending tasks: {this.unfinished()}</div>
      </div>
    );
  }
}

export default App;
