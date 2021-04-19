import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";


var routesUser = [
  {
    path: "/dashboard",
    name: "Inicio",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notificaciones",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/admin",
  }
  
  /*
  {
    path: "/user-profile",
    name: "Perfil de Usuario",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin",
  },
  
  {
    path: "/tables",
    name: "Lista de tablas",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: "/admin",
  },*/
];
export default routesUser;
