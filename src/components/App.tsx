import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Alert, Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";
import Button from "reactstrap/lib/Button";
import Collapse from "reactstrap/lib/Collapse";
import Modal from "reactstrap/lib/Modal";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";
import ModalHeader from "reactstrap/lib/ModalHeader";
import NavbarToggler from "reactstrap/lib/NavbarToggler";
import { Archivos } from "../domain/archivos";
import { Carrera } from "../domain/carrera";
import { Parser } from "../domain/parser";
import CarreraItem from "./CarreraItem";

interface IAppProps extends React.ClassAttributes<App> {
  carrera: Carrera;
}

interface IAppState extends React.ClassAttributes<App> {
  carrera: Carrera;
  isOpen: boolean;
  modal: boolean;
}

class App extends React.Component<IAppProps, IAppState> {
  private filePickerInput: React.RefObject<HTMLInputElement>;

  constructor(props: IAppProps) {
    super(props);
    this.handleImportacion = this.handleImportacion.bind(this);
    this.handleExportacion = this.handleExportacion.bind(this);
    this.navbarToggle = this.navbarToggle.bind(this);
    this.verModalImportar = this.verModalImportar.bind(this);
    this.modalToggle = this.modalToggle.bind(this);
    this.handleCarreraChange = this.handleCarreraChange.bind(this);
    this.handleNuevaCarrera = this.handleNuevaCarrera.bind(this);
    this.handleCarreraEjemplo = this.handleCarreraEjemplo.bind(this);
    this.filePickerInput = React.createRef();
    this.state = {
      ...props,
      isOpen: false,
      modal: false,
    };
  }

  public handleNuevaCarrera(): void {
    this.setState({
      carrera: new Carrera("Nueva carrera", "Universidad", "Título"),
    });
  }

  public handleCarreraEjemplo(): void {
    const ejemplo = require("../ejemplo.json");
    this.setState({
      carrera: Parser.Carrera(ejemplo),
      modal: false,
    });
  }

  /**
   * Lee el archivo seleccionado por el usuario y lo parsea.
   */
  public handleImportacion(): void {
    new Archivos().importar(this.filePickerInput.current!.files![0], (resultado) => {
      this.setState({
        carrera: Parser.Carrera(JSON.parse(resultado)),
        modal: false,
      });
    });
  }

  /**
   * Devuelve en formato JSON la carrera actual para ser descargado.
   */
  public handleExportacion(): void {
    new Archivos().exportar(this.state.carrera);
  }

  public verModalImportar(): void {
    this.setState({
      modal: true,
    });
  }

  public navbarToggle(): void {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  public modalToggle(): void {
    this.setState({
      modal: !this.state.modal,
    });
  }

  public handleCarreraChange(carrera: Carrera): void {
    this.setState((prevState) => {
      return {carrera};
    });
  }

  public renderCarrera(): JSX.Element {
    if (this.state.carrera.isNull()) {
      return (
        <Alert color="warning">
          <p>
            Este proyecto está hosteado con
            <span role="img" aria-label="slightly-smiling-face"> 💖 </span>
            <a href="https://github.com/JuanQP/carrera-seguidor">en Github</a>
          </p>
          <p>
            Para empezar, seleccioná una carrera o creá una nueva
            <span role="img" aria-label="slightly-smiling-face"> 🙂</span>
          </p>
        </Alert>);
      }

    return (
      <CarreraItem onCarreraChange={this.handleCarreraChange} carrera={this.state.carrera}/>
    );
  }

  public render() {
    return (
      <div>
        <Navbar dark={true} color={"dark"} expand="md">
          <NavbarBrand href="https://github.com/JuanQP/carrera-seguidor" className={"text-white"}>
            <FontAwesomeIcon icon={faCode}/> Seguidor de Carrera
          </NavbarBrand>
          <NavbarToggler onClick={this.navbarToggle} />
          <Collapse isOpen={this.state.isOpen} navbar={true}>
            <Nav className="ml-auto" navbar={true}>
              <NavItem>
                <NavLink
                  className="btn btn-outline-primary text-white"
                  href="#"
                  onClick={this.handleNuevaCarrera}
                >
                  Nueva carrera
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="btn btn-outline-primary text-white"
                  href="#"
                  onClick={this.handleExportacion}
                >
                  Exportar carrera
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="btn btn-outline-primary text-white"
                  href="#"
                  onClick={this.verModalImportar}
                >
                  Importar carrera
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="btn btn-outline-primary text-white"
                  href="#"
                  onClick={this.handleCarreraEjemplo}
                >
                  Mostrar ejemplo
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        {this.renderCarrera()}

        <Modal isOpen={this.state.modal} toggle={this.modalToggle} backdrop={"static"}>
          <ModalHeader toggle={this.modalToggle}>Importar carrera existente</ModalHeader>
            <ModalBody>
              <input ref={this.filePickerInput} type="file"/>
            </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.handleImportacion}>Importar</Button>{" "}
            <Button color="secondary" onClick={this.modalToggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default App;
