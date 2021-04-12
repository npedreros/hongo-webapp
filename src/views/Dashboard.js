import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

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

function Dashboard(props) {
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
  console.log(size)

  const dateList = data.map((element) => {
    const { Fecha: { seconds = 0 } = {} } = element;
    const dateObject = new Date(seconds * 1000);
    const humanDateFormat = [dateObject.toLocaleString()];

    return humanDateFormat;
  });

  const dataTable = data.slice(size-10,size).map((element) => {
    var { Gas = 0, Fecha: { seconds = 0 } = {}, Temperatura = 0,  HumedadAmb = 0, HumedadSuelo = 0  } = element;
    var dateObject = new Date(seconds * 1000);
    var humanDateFormat = dateObject.toLocaleString();   
    
    return(
      <tr>
        <td>{humanDateFormat}</td>
        <td>{Gas}</td>
        <td>{HumedadAmb}</td>
        <td>{HumedadSuelo}</td>
        <td>{Temperatura}</td>
      </tr>
    )
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
            : dateHumedadSuelo;
        //Validador de descripcion de datos
        const dataLabel =
          bigChartData === "gas"
            ? "Nivel de gas"
            : bigChartData === "Temperatura"
            ? "Grados"
            : bigChartData === "HumedadAmb"
            ? "Humedad"
            : "Humedad del suelo";
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

  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Total Shipments</h5>
                    <CardTitle tag="h2">Graficas</CardTitle>
                  </Col>
                  <Col sm="12">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "gas",
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => setBgChartData("gas")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Gas
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="1"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "Temperatura",
                        })}
                        onClick={() => setBgChartData("Temperatura")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Temperatura
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-gift-2" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="2"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "HumedadAmb",
                        })}
                        onClick={() => setBgChartData("HumedadAmb")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Humedad del ambiente
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="3"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "HumedadSuelo",
                        })}
                        onClick={() => setBgChartData("HumedadSuelo")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Humedad del suelo
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area" style={{ height: "70vh" }}>
                  {ListGrafic()}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        
        <Row>     
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Historico de las variables</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Fecha</th>
                      <th>Gas</th>
                      <th>Humedad del Ambiente</th>
                      <th>Humedad del Suelo</th>
                      <th>Temperatura</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataTable}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
      
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
