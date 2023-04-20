import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface TodoFormProps {
  handleAddTodo: (task: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ handleAddTodo }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.trim()) {
      handleAddTodo(task);
      setTask("");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Nova tarefa</Form.Label>
        <Form.Control
          type="text"
          placeholder="Digite a nova tarefa"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </Form.Group>
      <Button type="submit" variant="primary">
        Adicionar
      </Button>
    </Form>
  );
};

export default TodoForm;
