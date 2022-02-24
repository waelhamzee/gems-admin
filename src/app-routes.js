import { withNavigationWatcher } from './contexts/navigation';
import Gems from './pages/tasks/tasks';
import Axios from 'axios'
import Constants from './core/serverurl';



let routes = [
  {
    path :'/gems',
    component : Gems
  }
]
Axios.get(`${Constants.serverlink}folder/list`,{
  headers : {
    "token" : localStorage.getItem('token')
  }
}).then((response) => {
  if (response.data.length>0 && response.data.status === 200) {
    let c = response.data 
    c.map((e) => {
      for (let i =0; i<e.items.length; i++) {
        routes.push({
          path : e.items[i].path ,
          component : GemCategory
        })

      }
    })
    
  }
});
console.log(routes);
// get folders to get all paths
// const routes = [
//   {
//     path: '/profile',
//     component: ProfilePage
//   },
//   {
//     path: '/gems',
//     component: Gems
//   },
//   {
//     path: '/diamonds',
//     component: GemCategory
//   },
//   {
//     path: '/preciousgems',
//     component: GemCategory
//   },
//   {
//     path: '/semi',
//     component: GemCategory
//   },
//   {
//     path: '/opals',
//     component: GemCategory
//   },
//   {
//     path: '/other',
//     component: GemCategory
//   },
//   {
//     path: '/pearls',
//     component: GemCategory
//   },
//   {
//     path: '/rough',
//     component: GemCategory
//   },
//   {
//     path: '/home',
//     component: HomePage
//   }
// ];


export default routes.map(route => {
  return {
    ...route,
    component: withNavigationWatcher(route.component)
  };
});
