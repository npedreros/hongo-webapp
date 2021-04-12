import React, { useState, useEffect } from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Alert,
  UncontrolledAlert,
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

import {
  chartExample2,
  chartExample3,
  chartExample4,
} from "variables/charts.js";
import fire from "../firebase";

function Notifications() {

  const [data, setData] = useState([]);

  const ref = fire.firestore().collection("primerPiso");

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

  const dateList = data.slice(size-2,size).map((element) => {
    const { Fecha: { seconds = 0 } = {} } = element;
    const dateObject = new Date(seconds * 1000);
    const humanDateFormat = [dateObject.toLocaleString()];

    return humanDateFormat;
  });
  
  const dateGas = data.slice(size-2,size).map((element) => {
    var { Gas = 0 } = element;
    var data = Gas.toString();
    return data;
  });

  const dateTemperatura = data.slice(size-2,size).map((element) => {
    var { Temperatura = 0 } = element;
    var data = Temperatura.toString();
    return data;
  });

  const dateHumedadAmb = data.slice(size-2,size).map((element) => {
    var { HumedadAmb = 0 } = element;
    var data = HumedadAmb.toString();
    return data;
  });

  const dateHumedadSuelo = data.slice(size-2,size).map((element) => {
    var { HumedadSuelo = 0 } = element;
    var data = HumedadSuelo.toString();
    return data;
  });

  const notificationAlertRef = React.useRef(null);
  const notify = (place) => {
    var color = Math.floor(Math.random() * 5 + 1);
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Welcome to <b>Black Dashboard React</b> - a beautiful freebie for
            every web developer.
          </div>
        </div>
      ),
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };
  return (
    <>
    
      <div className="content">

        <div className="react-notification-alert-container">
          <NotificationAlert ref={notificationAlertRef} />
        </div>
        <Row>
          <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Estado de las variables</CardTitle>
              </CardHeader>
              <CardBody>
                <UncontrolledAlert className="alert-with-icon" color="info">
                  <span className="tim-icons icon-bell-55" data-notify="icon" />
                  <span data-notify="message">
                    La variable de gas en el primer piso se encuentra en {dateGas} ppm.
                  </span>
                </UncontrolledAlert>

                <UncontrolledAlert className="alert-with-icon" color="info">
                  <span className="tim-icons icon-bell-55" data-notify="icon" />
                  <span data-notify="message">
                    La temperatura en el primer piso se encuentra sobre los {dateTemperatura} grados centigrados.
                  </span>
                </UncontrolledAlert>

                <UncontrolledAlert className="alert-with-icon" color="info">
                  <span className="tim-icons icon-bell-55" data-notify="icon" />
                  <span data-notify="message">
                    La humedad del ambiente en el segundo piso es {dateHumedadAmb} %.
                  </span>
                </UncontrolledAlert>

                <UncontrolledAlert className="alert-with-icon" color="info">
                  <span className="tim-icons icon-bell-55" data-notify="icon" />
                  <span data-notify="message">
                    Se registra una humedad del {dateHumedadSuelo} % en el compost.
                  </span>
                </UncontrolledAlert>
          
              </CardBody>
            </Card>
          </Col>




          <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Notificaciones y alertas</CardTitle>
              </CardHeader>
              <CardBody>
                <UncontrolledAlert color="primary">
                  <span>
                    <b>Primary - </b>
                    La variable de gas en el primer piso simboliza un riesgo para el cultivo con 
                  </span>
                </UncontrolledAlert>
                <UncontrolledAlert color="info">
                  <span>
                    <b>Info - </b>
                    Para la fecha: {dateList} el estado de las variables son:
                    Temperatura: {dateTemperatura} grados centigrados, 
                    Humedad del suelo: {dateHumedadSuelo} %, 
                    Humedad del ambiente: {dateHumedadAmb} %, 
                    Gas: {dateGas} ppm.
                    </span>
                </UncontrolledAlert>
                <UncontrolledAlert color="success">
                  <span>
                    <b>Success - </b>
                    La temperatura ambiente en el segundo piso es estable y esta dentro de los lineamientos de la etapa productiva del champiñon ({dateTemperatura} grados centigrados) 
                  </span>
                </UncontrolledAlert>
                <UncontrolledAlert color="warning">
                  <span>
                    <b>Warning - </b>
                      La variable de gas en el primer piso simboliza un riesgo para el cultivo con {dateGas} ppm.
                  </span>
                </UncontrolledAlert>
                <UncontrolledAlert color="danger">
                  <span>
                    <b>Danger - </b>
                    La humedad supera un 10% la permitida dentro del sistema, por favor revise los suministros de ventilacion y corrija el margen de error. Temperatura: {dateTemperatura} grados centigrados. 
                  </span>
                </UncontrolledAlert>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Notifications;
