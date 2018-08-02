import * as React from "react";
import { Button, FormGroup, Input, Label, ModalFooter } from "reactstrap";
import Modal from "reactstrap/lib/Modal";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalHeader from "reactstrap/lib/ModalHeader";
import { EstadoMateria, Materia, ModalidadCursada } from "../domain/materia";
import InputFinales from "./InputFinales";

interface IMateriaItemProps extends React.ClassAttributes<EditarMateriaModal> {
  materia: Materia;
  onMateriaChange: (materia: Materia) => void;
  onMateriaBorrada: () => void;
  isOpen: boolean;
  onModalToggle: () => void;
}

class EditarMateriaModal extends React.Component<IMateriaItemProps> {
  constructor(props: IMateriaItemProps) {
    super(props);
    this.handleFinalesChange = this.handleFinalesChange.bind(this);
    this.handleActualizacionMateria = this.handleActualizacionMateria.bind(this);
    this.handleBorrarButtonClick = this.handleBorrarButtonClick.bind(this);
  }

  public handleActualizacionMateria(e: React.ChangeEvent<HTMLInputElement>): void {
    const {materia} = this.props;
    if (e.target.name === "estado") {
      materia[e.target.name] = Number(e.target.value);
    }
    else {
      materia[e.target.name] = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    }
    this.props.onMateriaChange(materia);
  }

  public handleFinalesChange(finales: number[]): void {
    const {materia} = this.props;
    materia.finales = finales;
    this.props.onMateriaChange(materia);
  }

  public handleBorrarButtonClick(): void {
    this.props.onMateriaBorrada();
  }

  public render() {
    if (this.props.materia === undefined) {
      return null;
    }

    const {materia} = this.props;

    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.onModalToggle} backdrop={"static"}>
        <ModalHeader toggle={this.props.onModalToggle}>Editar materia</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Nombre</Label>
            <Input
              name="nombre"
              type="text"
              onChange={this.handleActualizacionMateria}
              maxLength={100}
              value={materia.nombre}
            />
          </FormGroup>
          <FormGroup>
            <Label>Modalidad de Cursada</Label>
            <Input
              name="modalidadCursada"
              type="select"
              onChange={this.handleActualizacionMateria}
              maxLength={100}
              value={materia.modalidadCursada}
            >
              <option value={ModalidadCursada.Anual}>Anual</option>
              <option value={ModalidadCursada.Cuatrimestral}>Cuatrimestral</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>Estado de Cursada</Label>
            <Input
              name="estado"
              type="select"
              onChange={this.handleActualizacionMateria}
              maxLength={100}
              value={materia.estado}
            >
              <option value={EstadoMateria.Pendiente}>Pendiente</option>
              <option value={EstadoMateria.Cursando}>Cursando</option>
              <option value={EstadoMateria.Firmada}>Firmada</option>
              <option value={EstadoMateria.Aprobada}>Aprobada</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>Finales</Label>
            <InputFinales finales={materia.finales} onFinalesChange={this.handleFinalesChange}/>
          </FormGroup>
          <FormGroup check={true}>
            <Label check={true}>
              <Input
                name="esElectiva"
                type="checkbox"
                onChange={this.handleActualizacionMateria}
                checked={materia.esElectiva}
              />
              Materia electiva
            </Label>
          </FormGroup>
          <FormGroup check={true}>
            <Label check={true}>
              <Input
                name="esDeTituloIntermedio"
                type="checkbox"
                onChange={this.handleActualizacionMateria}
                checked={materia.esDeTituloIntermedio}
              />
              Materia necesaria para el título intermedio
            </Label>
          </FormGroup>
        </ModalBody>
        <ModalFooter className={"justify-content-between"}>
          <Button color="danger" onClick={this.props.onMateriaBorrada}>Eliminar</Button>
          <Button color="secondary" onClick={this.props.onModalToggle}>Cerrar</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default EditarMateriaModal;
