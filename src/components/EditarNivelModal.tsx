import * as React from "react";
import { Button, FormGroup, Input, Label, ModalFooter } from "reactstrap";
import Modal from "reactstrap/lib/Modal";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalHeader from "reactstrap/lib/ModalHeader";
import { Nivel } from "../domain/nivel";

interface IEditarNivelModalProps extends React.ClassAttributes<EditarNivelModal> {
  nivel: Nivel;
  onNivelChange: (nivel: Nivel) => void;
  onNivelBorrado: () => void;
  isOpen: boolean;
  onModalToggle: () => void;
}

class EditarNivelModal extends React.Component<IEditarNivelModalProps> {
  constructor(props: IEditarNivelModalProps) {
    super(props);
    this.handleActualizacionNivel = this.handleActualizacionNivel.bind(this);
    this.handleBorrarButtonClick = this.handleBorrarButtonClick.bind(this);
  }

  public handleActualizacionNivel(e: React.ChangeEvent<HTMLInputElement>): void {
    const {nivel} = this.props;
    nivel[e.target.name] = e.target.value;
    this.props.onNivelChange(nivel);
  }

  public handleBorrarButtonClick(): void {
    this.props.onNivelBorrado();
  }

  public render() {
    if (this.props.nivel === undefined) {
      return null;
    }

    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.onModalToggle} backdrop={"static"}>
        <ModalHeader toggle={this.props.onModalToggle}>Editar nivel</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Nombre</Label>
            <Input
              name="descripcion"
              type="text"
              onChange={this.handleActualizacionNivel}
              maxLength={100}
              value={this.props.nivel.descripcion}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter className={"justify-content-between"}>
          <Button color="danger" onClick={this.handleBorrarButtonClick}>Eliminar</Button>
          <Button color="secondary" onClick={this.props.onModalToggle}>Cerrar</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default EditarNivelModal;
