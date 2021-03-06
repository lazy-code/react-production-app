export const addTodo = (list, item) => [...list, item];

export const generateId = () => Math.floor(Math.random()*100000);

export const findById = (id, list) => list.find(item => item.id === id);

export const toggleTodo = (todo) => ({...todo, isComplete: !todo.isComplete});

// My way
//export const updateTodo = (list, updated) => {
//  return list.map(item => {
//    return item.id !== updated.id ? item : updated;
//  });
//};

//Tutorial way
export const updateTodo = (list, updated) => {
  const updatedIndex = list.findIndex(item => item.id === updated.id);
  return [
    ...list.slice(0, updatedIndex),
    updated,
    ...list.slice(updatedIndex+1)
  ];
};

// My way
// export const removeTodo = (list, id) => list.filter(item => item.id !== id);

//Tutorial way
export const removeTodo = (list, id) => {
  const removeIndex = list.findIndex(item => item.id === id);
  return [
    ...list.slice(0, removeIndex),
    ...list.slice(removeIndex+1)
  ]
};

export const filterTodos = (list, route) => {
  switch(route) {
    case '/active':
      return list.filter(item => !item.isComplete);
    case '/complete':
      return list.filter(item => item.isComplete);
    default:
      return list;
  }
};