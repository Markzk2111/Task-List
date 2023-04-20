import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "./style.css";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (task: string) => {
    const newTodo = {
      id: todos.length ? todos[todos.length - 1].id + 1 : 1,
      task,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const handleRemoveTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleCompleteTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <Container className="my-4">
      <h1>Minhas Tarefas</h1>
      <TodoForm handleAddTodo={handleAddTodo} />
      <hr />
      <h2>Tarefas Pendentes</h2>
      <TodoList
        todos={todos.filter((todo) => !todo.completed)}
        handleRemoveTodo={handleRemoveTodo}
        handleCompleteTodo={handleCompleteTodo}
      />
      <hr />
      <h2>Tarefas Concluídas</h2>
      {completedTodos.length ? (
        <TodoList
          todos={completedTodos}
          handleRemoveTodo={handleRemoveTodo}
          handleCompleteTodo={handleCompleteTodo}
        />
      ) : (
        <p>Nenhuma tarefa concluída.</p>
      )}
    </Container>
  );
};

export default App;

