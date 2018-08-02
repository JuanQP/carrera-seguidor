import { faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Card, CardBody, Jumbotron, Progress } from "reactstrap";
import Button from "reactstrap/lib/Button";
import CardDeck from "reactstrap/lib/CardDeck";
import { Carrera } from "../domain/carrera";
import { Nivel } from "../domain/nivel";
import EditarCarreraModal from "./EditarCarreraModal";
import EditarNivelModal from "./EditarNivelModal";
import NivelItem from "./NivelItem";

interface ICarreraItemProps extends React.ClassAttributes<CarreraItem> {
  carrera: Carrera;
  onCarreraChange: (carrera: Carrera) => void;
}

interface ICarreraItemState extends React.ClassAttributes<CarreraItem> {
  editandoCarrera: boolean;
  editandoNivel: boolean;
  nivelAEditar: number;
}

class CarreraItem extends React.Component<ICarreraItemProps, ICarreraItemState> {
  constructor(props: ICarreraItemProps) {
    super(props);
    this.handleNivelChange = this.handleNivelChange.bind(this);
    this.handleNivelBorrado = this.handleNivelBorrado.bind(this);
    this.handleCarreraChange = this.handleCarreraChange.bind(this);
    this.handleEditNivelChange = this.handleEditNivelChange.bind(this);
    this.handleNuevoNivel = this.handleNuevoNivel.bind(this);
    this.handleNivelClick = this.handleNivelClick.bind(this);
    this.handleActualizacionCarrera = this.handleActualizacionCarrera.bind(this);
    this.handleEditarNivelModalToggle = this.handleEditarNivelModalToggle.bind(this);
    this.handleEditarCarreraModalToggle = this.handleEditarCarreraModalToggle.bind(this);
    this.RenderMateriasAprobadas = this.RenderMateriasAprobadas.bind(this);
    this.RenderMateriasAprobadasTituloIntermedio = this.RenderMateriasAprobadasTituloIntermedio.bind(this);
    this.state = {
      editandoCarrera: false,
      editandoNivel: false,
      nivelAEditar: 0,
    };
  }

  public handleActualizacionCarrera(carrera: Carrera): void {
    this.props.onCarreraChange(carrera);
  }

  public handleNuevoNivel(): void {
    const {carrera} = this.props;
    carrera.niveles.push(new Nivel("Nuevo nivel", []));
    this.props.onCarreraChange(carrera);
  }

  public handleNivelChange(indice: number, nivel: Nivel): void {
    const {carrera} = this.props;
    carrera.niveles[indice] = nivel;
    this.props.onCarreraChange(carrera);
  }

  public handleNivelBorrado(): void {
    const {carrera} = this.props;
    carrera.niveles = carrera.niveles.slice();
    carrera.niveles.splice(this.state.nivelAEditar, 1);
    this.setState({
      editandoNivel: false,
    });
    this.handleEditarNivelModalToggle();
    this.props.onCarreraChange(carrera);
  }

  public handleEditNivelChange(nivel: Nivel): void {
    const {carrera} = this.props;
    carrera.niveles[this.state.nivelAEditar] = nivel;
    this.props.onCarreraChange(carrera);
  }

  public handleCarreraChange(carrera: Carrera): void {
    this.props.onCarreraChange(carrera);
  }

  public handleEditarNivelModalToggle(): void {
    this.setState({
      editandoNivel: !this.state.editandoNivel,
    });
  }

  public handleNivelClick(indice: number): void {
    this.setState({
      editandoNivel: true,
      nivelAEditar: indice,
    });
  }

  public handleEditarCarreraModalToggle(): void {
    this.setState({
      editandoCarrera: !this.state.editandoCarrera,
    });
  }

  public renderNiveles() {
    const {carrera} = this.props;

    if (carrera.niveles.length === 0) {
      return (
        <Card>
          <CardBody>
            <p>Todavía no hay niveles asignados a esta carrera</p>
          </CardBody>
        </Card>
      );
    }

    return carrera.niveles.map(
      (nivel, indice) => {
        return (
          <NivelItem
            onNivelEditClick={this.handleNivelClick}
            onNivelChange={this.handleNivelChange}
            key={indice}
            indice={indice}
            nivel={nivel}
          />
        );
      },
    );
  }

  public RenderMateriasAprobadasTituloIntermedio() {
    const {carrera} = this.props;
    if (!carrera.tieneTituloIntermedio || carrera.materiasTituloIntermedio() === 0) {
      return null;
    }

    const porcentaje = carrera.porcentajeTituloIntermedio();
    return (
      <div className="col-md">
        <FontAwesomeIcon icon={faUserGraduate}/>
        {" "}Título intermedio <strong>{carrera.tituloIntermedio}</strong>.
        <Progress style={{height: "1.5rem"}} striped={true} className="bg-dark" color="success" value={porcentaje}>
          <div>
            <strong>{carrera.materiasAprobadasTituloIntermedio()} </strong>
            de <strong>{carrera.materiasTituloIntermedio()}</strong> materias
            {Number.isNaN(porcentaje) ? "" : ` (${porcentaje.toFixed(2)}% del título intermedio)`}
          </div>
        </Progress>
      </div>
    );
  }

  public RenderMateriasAprobadas() {
    const {carrera} = this.props;
    if (carrera.materias().length === 0) {
      return (
        <p>No hay materias en esta carrera todavía.</p>
      );
    }

    const porcentaje = carrera.porcentajeAprobadas();
    return (
      <div className="col-md">
        <FontAwesomeIcon icon={faUserGraduate}/>
        {" "}Título de <strong>{carrera.titulo}</strong> en <strong>{carrera.universidad}</strong>.
        <Progress style={{height: "1.5rem"}} striped={true} className="bg-dark" color="success" value={porcentaje}>
          <div>
            <strong>{carrera.materiasAprobadas().length} </strong>
            de <strong>{carrera.materias().length}</strong> materias
            {Number.isNaN(porcentaje) ? "" : ` (${porcentaje.toFixed(2)}% de la carrera)`}
          </div>
        </Progress>
      </div>
    );
  }

  public render() {
    const {carrera} = this.props;

    return (
      <div>
        <Jumbotron className={"p-4"}>
          <h1>{carrera.nombre}</h1>
          <div className="row">
            <this.RenderMateriasAprobadas/>
            <this.RenderMateriasAprobadasTituloIntermedio/>
          </div>
          <div>
            Con los finales rendidos a la fecha, el promedio de la carrera es <strong>{carrera.promedio().toFixed(2)}</strong>
          </div>
          <Button color={"primary"} onClick={this.handleNuevoNivel}>Agregar nivel</Button>
          <Button color={"primary"} onClick={this.handleEditarCarreraModalToggle}>Editar carrera</Button>
        </Jumbotron>

        <div className="container-fluid">
          <CardDeck>
            {this.renderNiveles()}
          </CardDeck>

          <EditarCarreraModal
            onModalToggle={this.handleEditarCarreraModalToggle}
            isOpen={this.state.editandoCarrera}
            carrera={carrera}
            onCarreraChange={this.handleCarreraChange}
          />
          <EditarNivelModal
            onModalToggle={this.handleEditarNivelModalToggle}
            isOpen={this.state.editandoNivel}
            nivel={carrera.niveles[this.state.nivelAEditar]}
            onNivelBorrado={this.handleNivelBorrado}
            onNivelChange={this.handleEditNivelChange}
          />
        </div>
      </div>
    );
  }
}

export default CarreraItem;
