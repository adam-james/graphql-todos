import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import "./App.css";

const QUERY = gql`
  {
    allTodoItems {
      id
      description
      done
    }
  }
`;

function App() {
  return (
    <div class="App">
      <Query query={QUERY}>
        {({ error, loading, data }) => {
          if (error) return <p>An error occurred.</p>;
          if (loading) return <p>Loading...</p>;

          const { allTodoItems } = data;

          if (allTodoItems.length < 1) return <p>No items.</p>;

          return (
            <ol>
              {allTodoItems.map(item => (
                <li key={item.id}>{item.description}</li>
              ))}
            </ol>
          );
        }}
      </Query>
    </div>
  );
}

export default App;
