import { useEffect, useRef } from "react";
import { FabButton } from "../FabButton";
import "./modal.style.css";

const Modal = ({ fecharModal, onSubmit, defaultValue }) => {
  const dialogRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.showModal(); // abre o dialog
    }

    // Foca no input ao abrir
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // Bloqueia scroll do fundo
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.addEventListener("close", fecharModal);
    return () => {
      dialog?.removeEventListener("close", fecharModal);
    };
  }, [fecharModal]);

  return (
    <dialog ref={dialogRef} className="container-modal">
      <div className="inner-modal">
        <div className="div-itens">
          <div className="div-botao">
            <FabButton
              className="botao-fechar"
              onClick={() => {
                dialogRef.current.close();
                fecharModal();
              }}
              ariaLabel="Fechar modal"
            >
              X
            </FabButton>
          </div>
          <form action={onSubmit} className="form">
            <input
              ref={inputRef}
              className="input-modal"
              type="text"
              name="description"
              id="description"
              placeholder="Digite o Item que deseja adicionar"
              required
              defaultValue={defaultValue}
            />
            <button onSubmit={onSubmit}>Salvar Item</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
