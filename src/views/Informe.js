import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import Pdf from "react-to-pdf";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import {
  chartExample2,
  chartExample3,
  chartExample4,
} from "variables/charts.js";
import fire from "../firebase";

function Informe(props) {
  const [bigChartData, setbigChartData] = useState("gas");
  const [chartData, sethartData] = useState("data1");
  const setBgChartData = (name) => {
    setbigChartData(name);
  };

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
  console.log(size);

  const dateList = data.map((element) => {
    const { Fecha: { seconds = 0 } = {} } = element;
    const dateObject = new Date(seconds * 1000);
    const humanDateFormat = [dateObject.toLocaleString()];

    return humanDateFormat;
  });

  const dataTable = data.slice(size - 10, size).map((element) => {
    var {
      Gas = 0,
      Fecha: { seconds = 0 } = {},
      Temperatura = 0,
      HumedadAmb = 0,
      HumedadSuelo = 0,
      Corriente = 0,
      Agua = 0,
    } = element;
    var dateObject = new Date(seconds * 1000);
    var humanDateFormat = dateObject.toLocaleString();

    return (
      <tr>
        <td style={{ border: "1px solid" }}>{humanDateFormat}</td>
        <td style={{ border: "1px solid" }}>{Gas}</td>
        <td style={{ border: "1px solid" }}>{HumedadAmb}</td>
        <td style={{ border: "1px solid" }}>{HumedadSuelo}</td>
        <td style={{ border: "1px solid" }}>{Temperatura}</td>
        <td style={{ border: "1px solid" }}>{Corriente}</td>
        <td style={{ border: "1px solid" }}>{Agua}</td>
      </tr>
    );
  });

  const dateGas = data.map((element) => {
    var { Gas = 0 } = element;
    var data = Gas.toString();
    return data;
  });

  const dateTemperatura = data.map((element) => {
    var { Temperatura = 0 } = element;
    var data = Temperatura.toString();
    return data;
  });

  const dateHumedadAmb = data.map((element) => {
    var { HumedadAmb = 0 } = element;
    var data = HumedadAmb.toString();
    return data;
  });

  const dateHumedadSuelo = data.map((element) => {
    var { HumedadSuelo = 0 } = element;
    var data = HumedadSuelo.toString();
    return data;
  });

  const dateCorriente = data.map((element) => {
    var { Corriente = 0 } = element;
    var data = Corriente.toString();
    return data;
  });

  const dateAgua = data.map((element) => {
    var { Agua = 0 } = element;
    var data = Agua.toString();
    return data;
  });

  const ListGrafic = () => {
    let chart1_2_options = {
      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent",
            },
            ticks: {
              fontColor: "#9a9a9a",
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              fontColor: "#9a9a9a",
            },
          },
        ],
      },
    };

    var chartExample1 = {
      data1: (canvas) => {
        var ctx = canvas.getContext("2d");

        var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

        //Validador de datos
        const dataList =
          bigChartData === "gas"
            ? dateGas
            : bigChartData === "Temperatura"
            ? dateTemperatura
            : bigChartData === "HumedadAmb"
            ? dateHumedadAmb
            : bigChartData === "HumedadSuelo"
            ? dateHumedadSuelo
            : bigChartData === "Corriente"
            ? dateCorriente
            : dateAgua;
        //Validador de descripcion de datos
        const dataLabel =
          bigChartData === "gas"
            ? "Nivel de gas"
            : bigChartData === "Temperatura"
            ? "Grados"
            : bigChartData === "HumedadAmb"
            ? "Humedad"
            : bigChartData === "HumedadSuelo"
            ? "Humedad del suelo"
            : bigChartData === "Corriente"
            ? "Consumo de corriente"
            : "Consumo de agua";
        return {
          labels: dateList,
          datasets: [
            {
              label: dataLabel,
              fill: true,
              backgroundColor: gradientStroke,
              borderColor: "#1f8ef1",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#1f8ef1",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#1f8ef1",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: dataList,
            },
          ],
        };
      },
    };

    return <Line data={chartExample1["data1"]} options={chart1_2_options} />;
  };

  const referent = React.createRef();

  return (
    <>
      <div className="content">
        <Pdf targetRef={referent} filename="code-example.pdf">
          {({ toPdf }) => <Button onClick={toPdf}>Generar Pdf</Button>}
        </Pdf>
        <div ref={referent} style={{ fontFamily: "auto", margin: "40px" }}>
          <div className="col-md-6 ml-auto mr-auto">
            <h1 style={{ color: "black", marginTop: "40px" }}>
              Informe Hongo App
            </h1>
          </div>
          <p
            style={{
              color: "black",
              fontSize: "14px",
              paddingLeft: "10px",
              width: "750px",
              textAlign: "center",
            }}
          >
            {" "}
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
          </p>

          <Row>
            <Card
              style={{
                background: "transparent",
                boxShadow: "none",
                width: "750px",
                /* display: flex, */
                justifyContent: "space-evenly",
                alignItems: "stretch",
                flexDirection: "column",
                flexWrap: "wrap",
                alignContent: "center",
                paddingLeft:"10px"
              }}
            >
              <CardHeader>
                <CardTitle tag="h3" style={{ color: "black" }}>
                  Historico de las variables
                </CardTitle>
              </CardHeader>
              <CardBody>
                <table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th style={{ border: "1px solid" }}>Fecha</th>
                      <th style={{ border: "1px solid" }}>Gas</th>
                      <th style={{ border: "1px solid" }}>
                        Humedad del Ambiente
                      </th>
                      <th style={{ border: "1px solid" }}>Humedad del Suelo</th>
                      <th style={{ border: "1px solid" }}>Temperatura</th>
                      <th style={{ border: "1px solid" }}>
                        Consumo de Corriente
                      </th>
                      <th style={{ border: "1px solid" }}>Consumo de Agua</th>
                    </tr>
                  </thead>
                  <tbody>{dataTable}</tbody>
                </table>
              </CardBody>
            </Card>
          </Row>
          <div style={{textAlign: "center"}} >
            <p style={{color: "black"}} >Desarrollado Por:</p>
            <span>Joham Argemiro Bohórquez Rueda / Nathalia Pedreros López</span>
          </div>
         
        </div>
      </div>
    </>
  );
}

export default Informe;
