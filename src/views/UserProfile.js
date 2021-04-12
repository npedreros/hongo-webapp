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

function UserProfile() {

  const [data, setData] = useState([]);

  const ref = fire.firestore().collection("Proyectos");
  const ref2 = fire.firestore().collection("Usuarios");
  
  const getData = () => {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setData(items);
    });

  };

  useEffect(() => {
    getData();
  }, []);

  const size = data.length + 1;
  console.log(size)

  const dateAdmin = data.slice(size-2,size).map((element) => {
    var { Administrador = 0 } = element;
    var data = Administrador.toString();
    return data;
  });

  const datePlace = data.slice(size-2,size).map((element) => {
    var { Lugar = 0 } = element;
    var data = Lugar.toString();
    return data;
  });

  const dateProy = data.slice(size-2,size).map((element) => {
    var { Proyecto = 0 } = element;
    var data = Proyecto.toString();
    return data;
  });

  /*
  const dateName = data.slice(size-2,size).map((element) => {
    var { Nombre = 0 } = element;
    var data2 = Nombre.toString();
    return data2;
  });

  const datePermisos = data.slice(size-2,size).map((element) => {
    var { Rol = 0 } = element;
    var data2 = Rol.toString();
    return data2;
  });
*/

  return (
    <>

  <div className="content">
  <Row>     
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Usuarios inscritos</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Nombre usuario</th>
                      <th>Correo</th>
                      <th>Permisos</th>
                      <th>Proyecto</th>
                      <th>Locacion</th>
                      <th>Administrador del proyecto</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr>
                      <th>Nathalia Pedreros</th>
                      <th>npedrerosl@gmail.com</th>
                      <th>Monitoreo</th>
                      <th>{dateProy}</th>
                      <th>{datePlace}</th>
                      <th>{dateAdmin}</th>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
        </Row>

        <Button>
          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
             Nuevo usuario
          </span>
          <span className="d-block d-sm-none">
             <i className="tim-icons icon-single-02" />
          </span>
        </Button>
  </div>
  
  </>
    
  );
}

export default UserProfile;
