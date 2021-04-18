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
import fire from "../firebase";

function UserProfile() {
    return (
      <>
    <div className="content">

        <Row>
          <Col >
            <Card>
              <CardHeader>
                <h5 className="title">Inscribir Usuarios</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>Proyecto</label>
                        <Input
                          defaultValue="Champiñones"
                          placeholder="Proyecto"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Input placeholder="mike@email.com" type="email" />
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
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Rol</label>
                        <Input
                          defaultValue="Monitoreo"
                          placeholder="Rol"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Contraseña</label>
                        <Input
                          placeholder="Pass"
                          type="password"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="btn-fill" color="primary" type="submit">
                  Crear Usuario
                   

                </Button>
                <Button className="btn-fill" color="primary" type="reset">
                  Cancelar
                </Button>
              </CardFooter>
              
            </Card>
          </Col>
        
        </Row>
      </div>
    
    </>
    
    );
  }

    export default UserProfile;