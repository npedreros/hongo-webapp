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

function Informe() {

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
}
export default Informe;
