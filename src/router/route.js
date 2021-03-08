function load(component) {
  return (resolve) => require([`pages/${component}`], resolve);
}

const routes = [
  {
    path: "/",
    name: "home",
    component: load("home"),
    meta: {
      title: "首页",
    },
  },
  {
    path: "*",
    redirect: {
      path: "/",
    }, 
  },
];
export default routes;
