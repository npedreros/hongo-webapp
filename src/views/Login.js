import React from "react";
// reactstrap components
import {
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
  Card,
  CardBody,
  Col
} from "reactstrap";

function Login(props) {

  const { email,
  setEmail, 
  password,
  setPassword,
  hanldeLogin,
  emailError,
 } = props;
  return (
    <div className="login-center">
        <Col sm="12" md={{ size: 4 }}>
      
<Card>
      <CardBody>
        
          <FormGroup className="success">
            <Label for="exampleEmail">Correo</Label>
            <Input
              type="email"
              id="exampleEmail"
              placeholder="Ingrese su correo"
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormText color="muted">
            {emailError}
            </FormText>
          </FormGroup>
          <FormGroup className="success">
            <Label for="examplePassword">Contrasñea</Label>
            <Input
              type="password"
              id="examplePassword"
              placeholder="Ingrese su contrasñea"
              required value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <Button color="success" onClick={hanldeLogin} className="animation-on-hover">
          Iniciar Sesión
          </Button>
      </CardBody>
    </Card>
    </Col>
    </div>
  );
}

export default Login;
