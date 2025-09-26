import { use } from "react";
import { ChecklistsWrapper } from "./components/ChecklistsWrapper";
import { Container } from "./components/Container";
import { FabButton } from "./components/FabButton";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Heading } from "./components/Heading";
import { IconPlus, IconSchool } from "./components/icons";
import Modal from "./components/Modal";
import ToDoProvider from "./components/ToDoProvider";
import { ToDoGorup } from "./components/ToDoGroup";
import ToDoContext from "./components/ToDoProvider/ToDoContext";
import Empty from "./components/Empty";

function App() {
  const {
    todos,
    addToDo,
    modalIsOpen,
    abrirModal,
    fecharModal,
    selectdToDo,
    editToDo,
  } = use(ToDoContext);

  function handleFormSubmit(formData) {
    if (selectdToDo) {
      editToDo(formData);
    } else {
      addToDo(formData);
    }
    fecharModal();
  }

  return (
    <main>
      <Container>
        {modalIsOpen && (
          <Modal
            fecharModal={() => fecharModal()}
            onSubmit={handleFormSubmit}
            defaultValue={selectdToDo?.description}
          />
        )}

        <Header>
          <Heading>
            <IconSchool /> Plano de estudos
          </Heading>
        </Header>
        <ChecklistsWrapper>
          <ToDoGorup
            heading="Para estudar"
            items={todos.filter((t) => !t.completed)}
          />
          {todos.length == 0 && <Empty />}
          <ToDoGorup
            heading="Concluído"
            items={todos.filter((t) => t.completed)}
          />
          <Footer>
            <FabButton onClick={() => abrirModal()}>
              <IconPlus />
            </FabButton>
          </Footer>
        </ChecklistsWrapper>
      </Container>
    </main>
  );
}

export default App;
