import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const ADD_TODO = gql`
  mutation($description: String!) {
    createTodoItem(description: $description) {
      id
      description
      done
    }
  }
`;

class TodoFormComponent extends React.Component {
  state = {
    description: ""
  };

  handleChange = event => {
    this.setState({ description: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addTodo({ variables: { description: this.state.description } });
    this.setState({ description: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          onChange={this.handleChange}
          placeholder="New Todo"
          value={this.state.description}
        />
        <button>Save</button>
      </form>
    );
  }
}

const TodoForm = () => (
  <Mutation mutation={ADD_TODO}>
    {addTodo => <TodoFormComponent addTodo={addTodo} />}
  </Mutation>
);

export default TodoForm;
