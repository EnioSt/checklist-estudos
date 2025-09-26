import { useEffect, useState } from "react";
import ToDoContext from "./ToDoContext";

const TODOS = "todos";

const ToDoProvider = ({ children }) => {
  const saveToDo = localStorage.getItem(TODOS);

  const [todos, setTodos] = useState(saveToDo ? JSON.parse(saveToDo) : []);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectdToDo, setSelectedToDo] = useState();

  function abrirModal(todo) {
    if (todo) {
      setSelectedToDo(todo);
    }
    setModalIsOpen(true);
  }

  function fecharModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addToDo(formData) {
    const description = formData.get("description");
    setTodos((prevState) => {
      const todo = {
        id: prevState.length + 1,
        description: description,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      return [...prevState, todo];
    });
  }

  function toggleToDoCompleted(todo) {
    setTodos((prevState) => {
      return prevState.map((t) => {
        if (t.id == todo.id) {
          return {
            ...t,
            completed: !t.completed,
          };
        }
        return t;
      });
    });
  }

  function editToDo(formData) {
    setTodos((prevState) => {
      return prevState.map((t) => {
        if (t.id == selectdToDo.id) {
          return {
            ...t,
            description: formData.get("description"),
          };
        }
        return t;
      });
    });
  }

  function deleteToDo(todo) {
    setTodos((prevState) => {
      return prevState.filter((t) => t.id != todo.id);
    });
  }

  function openModalForEdit(todo) {
    abrirModal(todo);
  }
  return (
    <ToDoContext
      value={{
        todos,
        addToDo,
        toggleToDoCompleted,
        deleteToDo,
        abrirModal,
        fecharModal,
        modalIsOpen,
        openModalForEdit,
        selectdToDo,
        editToDo,
      }}
    >
      {children}
    </ToDoContext>
  );
};

export default ToDoProvider;
