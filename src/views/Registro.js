import classNames from "classnames";
import React, { useState, useEffect } from "react";

import {
  chartExample2,
  chartExample3,
  chartExample4,
} from "variables/charts.js";
import fire from "../firebase";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import { isPropertyDeclaration } from "typescript";

function UserProfile() {
  const [data, setData] = useState([]);
  const [datos, setDatos] = useState({
    proyecto: "",
    correo: "",
    nombre: "",
    rol: "",
    password: "",
  });

  const ref = fire.firestore().collection("Proyectos");

  //Traer datos dde firebase de proeyctos
  const getData = () => {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setData(items);
    });
  };

  const handleInputChange = (event) => {
    console.log(event.target.value);
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const enviarDatos = async (event) => {
    event.preventDefault();
    try {
      const db = fire.firestore();

      await db.collection("Usuarios").add({
        Proyecto: datos.proyecto,
        Correo: datos.correo,
        Nombre: datos.nombre,
        Rol: datos.rol,
      });
      hanldeSingUp(datos.correo, datos.password);
    } catch (error) {
      console.log(error);
    }
  };

  const hanldeSingUp = (email, password) => {
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        alert("Usuario registrado exitosamente!")
      })
      .catch((error) => {
        console.log(error.code);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const proyectosLista = data.map((element) => {
    var { ID = 0, Proyecto = "" } = element;
    return <option value={ID}>{Proyecto}</option>;
  });

  return (
    <>
      <div className="content">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <h5 className="title">Inscribir Usuarios</h5>
              </CardHeader>
              <CardBody>
                <Form onSubmit={enviarDatos}>
                  <Row>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>Proyecto</label>
                        <Input
                          type="select"
                          name="selectMulti"
                          id="exampleSelectMulti1"
                          onChange={handleInputChange}
                        >
                          <option>Seleccione uno...</option>
                          {proyectosLista}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">Correo</label>
                        <Input
                          placeholder="mike@email.com"
                          type="email"
                          onChange={handleInputChange}
                          name="correo"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Nombre</label>
                        <Input
                          placeholder="Nombre"
                          type="text"
                          onChange={handleInputChange}
                          name="nombre"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row></Row>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Rol</label>
                        <Input
                          type="select"
                          name="selectMulti"
                          id="exampleSelectMulti1"
                          onChange={handleInputChange}
                        >
                          <option>Seleccione uno...</option>
                          <option value="Monitoreo">Monitoreo</option>
                          <option value="Usuario">Usuario</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Contraseña</label>
                        <Input
                          placeholder="Pass"
                          type="password"
                          onChange={handleInputChange}
                          name="password"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <CardFooter>
                    <Button className="btn-fill" color="primary" type="submit">
                      Crear Usuario
                    </Button>
                    <Button className="btn-fill" color="primary" type="reset">
                      Cancelar
                    </Button>
                  </CardFooter>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserProfile;
