import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";

interface Todo {
  id: number;
  task: string;
  completed: boolean;
  [key: string]: any;
}

interface TodoListProps {
  todos: Todo[];
  handleRemoveTodo: (id: number) => void;
  handleCompleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  handleRemoveTodo,
  handleCompleteTodo,
}) => {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string }>({
    key: "",
    direction: "",
  });

  const onSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <div>
      <h2>Lista de tarefas</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => onSort("id")}>
              ID{" "}
              {sortConfig.key === "id" ? (
                sortConfig.direction === "asc" ? (
                  <i className="bi bi-caret-down-fill"></i>
                ) : (
                  <i className="bi bi-caret-up-fill"></i>
                )
              ) : null}
            </th>
            <th onClick={() => onSort("task")}>
              Tarefa{" "}
              {sortConfig.key === "task" ? (
                sortConfig.direction === "asc" ? (
                  <i className="bi bi-caret-down-fill"></i>
                ) : (
                  <i className="bi bi-caret-up-fill"></i>
                )
              ) : null}
            </th>
            <th onClick={() => onSort("completed")}>
              Concluída{" "}
              {sortConfig.key === "completed" ? (
                sortConfig.direction === "asc" ? (
                  <i className="bi bi-caret-down-fill"></i>
                ) : (
                  <i className="bi bi-caret-up-fill"></i>
                )
              ) : null}
            </th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {sortedTodos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.task}</td>
              <td>{todo.completed ? "Sim" : "Não"}</td>
              <td>
                <Button
                  variant="success"
                  onClick={() => handleCompleteTodo(todo.id)}
                  disabled={todo.completed}
                >
                  Concluir
                </Button>{" "}
                <Button variant="danger" onClick={() => handleRemoveTodo(todo.id)}>
                Remover
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TodoList;
