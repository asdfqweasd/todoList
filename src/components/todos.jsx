// this is for buiding todo item
import deleteIcon from "../img/delete.svg";
import { styled } from "styled-components";
import { useState } from "react";

const TodoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  margin: 5px 0 0 0;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const TodoText = styled.span`
  flex: 1 0 auto;
  font-size: 16px;
  margin-right: 10px;
  text-align: left;
`;

const TodoTextInput = styled.input`
  flex: 1 0 auto;
  font-size: 16px;
  margin-right: 10px;
  border: none;
  background: transparent;
`;

const CheckboxInput = styled.input`
  margin-right: 15px;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #999;
  width: 40px;
  &:hover {
    color: #666;
  }
`;

const Todo = ({ todo, deleteTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.data.content);

  const handleEditTodo = () => {
    setIsEditing(true);
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditText(todo.data.content);
  };
  const handleUpdateTodo = (updates) => {
    const { todo, content, complete } = updates;
    updateTodo(
      todo.id,
      content || todo.data.content,
      complete !== undefined ? complete : todo.data.complete
    );
    if (content !== undefined) {
      setIsEditing(false);
    }
  };

  return (
    <TodoItem key={todo.id}>
      <CheckboxInput
        type="checkbox"
        checked={todo.data.complete}
        onChange={() =>
          handleUpdateTodo({ todo, complete: !todo.data.complete })
        }
      />
      {isEditing ? (
        <TodoTextInput
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={() => handleUpdateTodo({ todo, content: editText })}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleUpdateTodo({ todo, content: editText });
            } else if (e.key === "Escape") {
              handleCancelEdit();
            }
          }}
          autoFocus
        />
      ) : (
        <TodoText onClick={handleEditTodo}>
          {todo.data.content.toString()}
        </TodoText>
      )}
      <DeleteButton onClick={() => deleteTodo(todo.data.id)}>
        <img src={deleteIcon} alt="Delete Icon" />
      </DeleteButton>
    </TodoItem>
  );
};

export default Todo;
