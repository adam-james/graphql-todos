import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const SUBSCRIPTION = gql`
  subscription {
    TodoItem(filter: { mutation_in: [CREATED] }) {
      mutation
      node {
        id
        description
        done
      }
    }
  }
`;

const QUERY = gql`
  {
    allTodoItems {
      id
      description
      done
    }
  }
`;

class TodoItems extends React.Component {
  componentDidMount() {
    this.props.subscribeToNewItems();
  }

  render() {
    if (this.props.error) return <p>An error occurred.</p>;
    if (this.props.loading) return <p>Loading...</p>;

    const { allTodoItems } = this.props.data;

    if (allTodoItems.length < 1) return <p>No items.</p>;

    return (
      <ol>
        {allTodoItems.map(item => (
          <li key={item.id}>{item.description}</li>
        ))}
      </ol>
    );
  }
}

const TodoList = () => (
  <Query query={QUERY}>
    {({ subscribeToMore, ...result }) => (
      <TodoItems
        {...result}
        subscribeToNewItems={() => {
          subscribeToMore({
            document: SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;

              return {
                allTodoItems: [
                  ...prev.allTodoItems,
                  subscriptionData.data.TodoItem.node
                ]
              };
            }
          });
        }}
      />
    )}
  </Query>
);

export default TodoList;
