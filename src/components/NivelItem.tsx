import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Button } from "reactstrap";
import Card from "reactstrap/lib/Card";
import ListGroup from "reactstrap/lib/ListGroup";
import ListGroupItem from "reactstrap/lib/ListGroupItem";
import { EstadoMateria, Materia, ModalidadCursada } from "../domain/materia";
import { Nivel } from "../domain/nivel";
import EditarMateriaModal from "./EditarMateriaModal";
import MateriaItem from "./MateriaItem";

interface INivelItemProps extends React.ClassAttributes<NivelItem> {
    nivel: Nivel;
    indice: number;
    onNivelChange: (indice: number, nivel: Nivel) => void;
    onNivelEditClick: (indice: number) => void;
}

interface INivelItemState extends React.ClassAttributes<NivelItem> {
    materiaAEditar: number;
    editandoMateria: boolean;
}

class NivelItem extends React.Component<INivelItemProps, INivelItemState> {
    constructor(props: INivelItemProps) {
        super(props);
        this.handleNuevaMateria = this.handleNuevaMateria.bind(this);
        this.handleMateriaChange = this.handleMateriaChange.bind(this);
        this.handleMateriaBorrada = this.handleMateriaBorrada.bind(this);
        this.handleMateriaClick = this.handleMateriaClick.bind(this);
        this.handleModalToggle = this.handleModalToggle.bind(this);
        this.handleEditNivelButtonClick = this.handleEditNivelButtonClick.bind(this);
        this.RenderNoHayMaterias = this.RenderNoHayMaterias.bind(this);
        this.renderListaMaterias = this.renderListaMaterias.bind(this);
        this.RenderBotonesNivel = this.RenderBotonesNivel.bind(this);
        this.RenderEditarMateriaModal = this.RenderEditarMateriaModal.bind(this);
        this.state = {
            editandoMateria: false,
            materiaAEditar: 0,
        };
    }

    public handleNuevaMateria(): void {
        const {nivel} = this.props;
        nivel.materias.push(new Materia("Nueva materia", ModalidadCursada.Anual, EstadoMateria.Pendiente));
        this.props.onNivelChange(this.props.indice, nivel);
    }

    public handleMateriaChange(materia: Materia): void {
        const {nivel} = this.props;
        nivel[this.state.materiaAEditar] = materia;
        this.props.onNivelChange(this.props.indice, nivel);
    }

    public handleMateriaBorrada(): void {
        const {nivel} = this.props;
        nivel.materias = nivel.materias.slice();
        nivel.materias.splice(this.state.materiaAEditar, 1);
        this.handleModalToggle();
        this.props.onNivelChange(this.props.indice, nivel);
    }

    public handleMateriaClick(indice: number): void {
        this.setState({
            editandoMateria: true,
            materiaAEditar: indice,
        });
    }

    public handleEditNivelButtonClick(): void {
        this.props.onNivelEditClick(this.props.indice);
    }

    public handleModalToggle(): void {
        this.setState({
            editandoMateria: !this.state.editandoMateria,
        });
    }

    public RenderNoHayMaterias() {
        return (
            <ListGroupItem>
                Todavía no hay materias asignadas a este nivel.
            </ListGroupItem>
        );
    }

    public renderListaMaterias() {
        return this.props.nivel.materias.map(
            (materia, indice) => {
                return (
                    <MateriaItem
                        onMateriaClick={this.handleMateriaClick}
                        key={indice}
                        indice={indice}
                        materia={materia}
                    />
                );
            },
        );
    }

    public RenderBotonesNivel() {
        return (
            <ListGroupItem className="d-flex align-items-center bd-highlight">
                <div className="mr-auto">
                    {this.props.nivel.descripcion}
                </div>
                <Button outline={true} color="success" onClick={this.handleNuevaMateria}>
                    <FontAwesomeIcon icon={faPlus}/>
                </Button>
                <Button outline={true} color="info" onClick={this.handleEditNivelButtonClick}>
                    <FontAwesomeIcon icon={faEdit}/>
                </Button>
            </ListGroupItem>
        );
    }

    public RenderEditarMateriaModal() {
        return (
            <EditarMateriaModal
                onModalToggle={this.handleModalToggle}
                isOpen={this.state.editandoMateria}
                materia={this.props.nivel.materias[this.state.materiaAEditar]}
                onMateriaChange={this.handleMateriaChange}
                onMateriaBorrada={this.handleMateriaBorrada}
            />
        );
    }

    public render() {
        return (
            <Card className={(this.props.nivel.estaAprobado() ? "border-success " : "") + "align-self-start"}>
                <ListGroup flush={true}>
                    <this.RenderBotonesNivel/>
                    {this.props.nivel.materias.length === 0 ? this.RenderNoHayMaterias() : this.renderListaMaterias()}
                </ListGroup>
                {this.props.nivel.materias.length === 0 ? null : <this.RenderEditarMateriaModal/>}
            </Card>
        );
    }
}

export default NivelItem;
