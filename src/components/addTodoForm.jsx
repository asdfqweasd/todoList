import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 30px;
`;

const Input = styled.input`
  flex: 1;
  background-color: #f5fffa;
  padding: 10px;
  border: none;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #0077ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
`;

const AddTodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handlerSubmit = (e) => {
    e.preventDefault();
    //prevent page refresh
    if (!value.trim()) return;
    addTodo(value);
    setValue("");
  };

  return (
    <FormContainer onSubmit={handlerSubmit}>
      <Input
        type="text"
        placeholder="Add new .."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
      />
      <Button type="submit">Add</Button>
    </FormContainer>
  );
};
export default AddTodoForm;
