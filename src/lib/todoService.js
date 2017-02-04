const baseUrl = 'http://localhost:8080/todos';

export const loadTodos = () => (
  fetch(baseUrl)
    .then((res) => res.json())
);