import * as React from "react";
import { Button, FormGroup, Input, Label, ModalFooter } from "reactstrap";
import Modal from "reactstrap/lib/Modal";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalHeader from "reactstrap/lib/ModalHeader";
import { Carrera } from "../domain/carrera";

interface IEditarCarreraModalProps extends React.ClassAttributes<EditarCarreraModal> {
  carrera: Carrera;
  onCarreraChange: (carrera: Carrera) => void;
  isOpen: boolean;
  onModalToggle: () => void;
}

class EditarCarreraModal extends React.Component<IEditarCarreraModalProps> {
  constructor(props: IEditarCarreraModalProps) {
    super(props);
    this.handleActualizacionCarrera = this.handleActualizacionCarrera.bind(this);
  }

  public handleActualizacionCarrera(e: React.ChangeEvent<HTMLInputElement>): void {
    const {carrera} = this.props;
    carrera[e.target.name] = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.props.onCarreraChange(carrera);
  }

  public render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.onModalToggle} backdrop={"static"}>
        <ModalHeader toggle={this.props.onModalToggle}>Datos de la carrera</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Nombre de la Carrera</Label>
            <Input
              name="nombre"
              type="text"
              onChange={this.handleActualizacionCarrera}
              maxLength={100}
              value={this.props.carrera.nombre}
            />
          </FormGroup>
          <FormGroup>
            <Label>Universidad</Label>
            <Input
              name="universidad"
              type="text"
              onChange={this.handleActualizacionCarrera}
              maxLength={100}
              value={this.props.carrera.universidad}
            />
          </FormGroup>
          <FormGroup>
            <Label>Título</Label>
            <Input
              name="titulo"
              type="text"
              onChange={this.handleActualizacionCarrera}
              maxLength={100}
              value={this.props.carrera.titulo}
            />
          </FormGroup>
          <FormGroup check={true}>
            <Label check={true}>
              <Input
                name="tieneTituloIntermedio"
                type="checkbox"
                onChange={this.handleActualizacionCarrera}
                checked={this.props.carrera.tieneTituloIntermedio}
              />
              Tiene título intermedio
            </Label>
          </FormGroup>
          <FormGroup className={this.props.carrera.tieneTituloIntermedio ? "" : "sr-only"}>
            <Label>Título Intermedio</Label>
            <Input
              name="tituloIntermedio"
              type="text"
              onChange={this.handleActualizacionCarrera}
              maxLength={100}
              value={this.props.carrera.tituloIntermedio}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.props.onModalToggle}>Cerrar</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default EditarCarreraModal;
