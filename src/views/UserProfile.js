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
  const [data2, setData2] = useState([]);

  const ref2 = fire.firestore().collection("Usuarios");
  const ref = fire.firestore().collection("Proyectos");
  //Traer datos dde firebase de usuarios
  const getData = () => {
    ref2.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {

        items.push(doc.data());
      });
      setData(items);
    });
  };
//Traer datos dde firebase de proeyctos
  const getData2 = () => {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setData2(items);
    });
  };

  useEffect(() => {
    getData2();
    getData();
  }, []);

  //Carga de usuarios
const datauser = data.map((element) => {
  var { Correo = 0,Nombre=0,Proyecto=0,Rol=0} = element;
  // Carga de proyectos a los que pertenece el usuario, con un filter
  const proyects = data2.filter(proyecto =>  proyecto.ID == Proyecto).map((el) =>{
    var { Proyecto } = el;
    return (
      <>
      <span>
      - {Proyecto} 
      </span>
      <br/>
      </>
      );
  });

  return(
    <tr>
      <td>{Nombre}</td>
      <td>{Correo}</td>
      <td>{proyects}</td>
      <td>{Rol}</td>
    </tr>
  )
});

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
                      <th>Proyecto</th>
                      <th>Rol</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datauser}
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
