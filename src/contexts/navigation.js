import React, { useState, createContext, useContext, useEffect } from 'react';
import Axios from 'axios'
import Constants from '../core/serverurl';
import { useLocation } from 'react-router-dom';
const NavigationContext = createContext({});
const useNavigation = () => useContext(NavigationContext);

function NavigationProvider(props) {
  const location = useLocation()
  const [navigationData, setNavigationData] = useState({});
  const [data,setData] = useState([])
  const [navigation, setNavigation] = useState([])
  const [popupVisible3, setPopupVisible3] = useState(false)
  const [popupVisible4, setPopupVisible4] = useState(false)
  const [popupVisible2, setVisibility] = useState(false)
  function normalizePath () {
    Axios.get(`${Constants.serverlink}folder/list`,{
      headers : {
        "token" : localStorage.getItem('token')
      }
    }).then((response) => {
        let obj = {
          text : 'Main Folder',
          icon : 'folder',
          items : [{
            text : 'Gems',
            path : '/gems'
          }]
        }
        response.data.unshift(obj)
        setNavigation(response.data)
    });
  }

  const callPage = () => {
    if (!navigator.onLine) {
      const data = JSON.parse(localStorage.getItem(location.pathname))
         setData(data)
    } else {
      if (location.pathname === '/gems') {
      Axios.get(`${Constants.serverlink}getgems`, {
        headers : {
          "token" : localStorage.getItem('token')
        }
      }).then((response) => {
        localStorage.setItem(location.pathname, JSON.stringify(response.data))
        setData(response.data);
      });
    } else {
      Axios.get(`${Constants.serverlink}folder/listgems/${location.pathname.split("/")[1]}`,{
        headers : {
          "token" : localStorage.getItem('token')
        }
      }).then((response) => {
        // if (response.data.length>0 && response.status === 200) {
        //  response.data.map((e) => {
        //     for (let i =0; i<e.items.length; i++) {
        //       if (location.pathname === e.items[i].path) {
        //         s = e.items[i].text;
        //         break;
        //       }
        //     }
        //   })
        // }
         setData(response.data)
          //   Axios.get(`${Constants.serverlink}getcategory/${s}`,{
          //   headers : {
          //     "token" : localStorage.getItem('token')
          //   }
          // }).then((response) => {
          //     localStorage.setItem(location.pathname, JSON.stringify(response.data))
          //     setData(response.data);
          // });
      });

    }
  }
  }

  return (
    <NavigationContext.Provider
      value={{ popupVisible2,setVisibility,navigationData, setNavigationData,data,setData,normalizePath,navigation,setNavigation,callPage,popupVisible3,setPopupVisible3,popupVisible4,setPopupVisible4 }}
      {...props}
    />
  );
}
function withNavigationWatcher(Component) {
  return function (props) {
    const { path } = props.match;
    const { setNavigationData } = useNavigation();
    
    useEffect(() => {
      setNavigationData({ currentPath: path });
    }, [path, setNavigationData]);

    return React.createElement(Component, props);
  }
}

export {
  NavigationProvider,
  useNavigation,
  withNavigationWatcher
}
