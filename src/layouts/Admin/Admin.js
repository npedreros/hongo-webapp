
import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import fire from "../../firebase";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";

import routesUser from "routesUser.js";

import logo from "assets/img/react-logo.png";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";

var ps;
var Rou;



function Admin(props) {

  const location = useLocation();
  const mainPanelRef = React.useRef(null);
  const [sidebarOpened, setsidebarOpened] = React.useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  const ref2 = fire.firestore().collection("Usuarios");
  const ref = fire.firestore().collection("Proyectos");
  //Traer datos de firebase de usuarios
  const getData = () => {
    ref2.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {

        items.push(doc.data());
      });
      setData(items);
    });
  };
//Traer datos de firebase de proyectos
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
  var userr = fire.auth().currentUser;
  var email;
  email= userr.email;

  var rol;
  const datauser = data.map((element) => {
    var { Correo = 0,Nombre=0,Proyecto=0,Rol=0} = element;
    // Carga de proyectos a los que pertenece el usuario, con un filter
    console.log(Correo);
    if( Correo == email ){
      rol=Rol;
    }
    return rol;
  });

  if(rol == "Monitoreo"){
    Rou=routes ;                  // Rol de usaurio o administrador 
  }
  else{
    Rou=routesUser;
  }

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(mainPanelRef.current, {
        suppressScrollX: true,
      });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.classList.add("perfect-scrollbar-off");
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]);
  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };

  const getRoutes = (routes) => {
    return Rou.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const getBrandText = (path) => {
    for (let i = 0; i < Rou.length; i++) {
      if (location.pathname.indexOf(Rou[i].layout + Rou[i].path) !== -1) {
        return Rou[i].name;
      }
    }
    return "Brand";
  };
  const pathLocation = window.location.pathname;
  return (
    <BackgroundColorContext.Consumer>
      {({ color, changeColor }) => (
        <React.Fragment>
          <div className="wrapper">
            {pathLocation !== "/login" ? (
              <Sidebar
              routes={Rou}
              logo={{
                outterLink: "https://hongoapp.web.app/",
                text: "Hongo App",
                imgSrc: logo,
              }}
              toggleSidebar={toggleSidebar}
            />
            ) : ""}
            
            <div className="main-panel" ref={mainPanelRef} data={color}>
            {pathLocation !== "/login" ? (
               <AdminNavbar
               brandText={getBrandText(location.pathname)}
               toggleSidebar={toggleSidebar}
               sidebarOpened={sidebarOpened}
               handleLogout={props.handleLogout}
             />
            ) : ""}
             
              <Switch>
                {getRoutes(routes)}
                <Redirect from="*" to="/admin/dashboard" />
              </Switch>
              {
                // we don't want the Footer to be rendered on map page
                location.pathname === "/admin/maps" ? null : <Footer fluid />
              }
            </div>
          </div>
        </React.Fragment>
      )}
    </BackgroundColorContext.Consumer>
  );
}

export default Admin;
