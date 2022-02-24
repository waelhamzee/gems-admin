import React, { useEffect, useMemo, useReducer, useState } from "react";
import {
  DataGrid,
  Editing,
  Column,
  Button,
  RemoteOperations,
  Grouping,
  GroupPanel,
  Paging,
  Pager,
  FilterRow,
  ColumnFixing,
  SearchPanel,
  HeaderFilter,
  Export,
  Scrolling,
} from "devextreme-react/data-grid";
import "bootstrap/dist/css/bootstrap.min.css";
import { Popup } from "devextreme-react/popup";
import { RequiredRule } from "devextreme-react/validator";
import {  Label, Modal } from "reactstrap";
import { useLocation } from 'react-router-dom'
import {
  AvField,
  AvForm,
  AvGroup,
  AvRadioGroup,
  AvRadio,
} from "availity-reactstrap-validation";
import './format.css'
import "./index.css";
import { ScrollView } from "devextreme-react";
import Axios from "axios";
import NumberFormat from "react-number-format";
import Constants from "../../core/serverurl";
import { useNavigation } from "../../contexts/navigation";

const initPopupState = {
  formData: {},
  popupVisible: false,
  popupMode: "",
};
const generateStock = (min, max) => {
  let result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
};
function Gems() {
  const [{ formData, popupVisible, popupMode }, dispatchPopup] = useReducer(
    popupReducer,
    initPopupState
  );
  // const [data, setData] = useState([]);
  const location = useLocation()
  const {data,setData} = useNavigation()
  const [isEditing, setisEditing] = useState(false);
  const [modalClassic, setModalClassic] = useState(false);
  const [isenhancement, showEnhancement] = useState(false);
  const [isothercolorintensity, setisOthercolorintensity] = useState(false);
  const [iscolorintensity, showColorIntensity] = useState(false);
  const [isshades, showShades] = useState(false);
  const [isClarity, setisClarity] = useState({
    isprecious: false,
    isdiamonds: false,
    isotherprecious: false,
  });
  const [isColor, setisColor] = useState({
    colorwhite: false,
    colorbrown: false,
    coloryellow: false,
    isothercolor: false,
  });
  const [isShades, setisShades] = useState({
    blue: false,
    tourmaline: false,
    spinel: false,
    zircon: false,
    isothershades: false,
  });
  const [colorCategory, setColorCategory] = useState({
    isdiamonds: false,
    isprecious: false,
    issemiprecious: false,
    isopals: false,
    ispearls: false,
    isrough: false,
  });
  const [isTypeofgem, setisTypeofgem] = useState({
    isdiamonds: false,
    isprecious: false,
    issemiprecious: false,
    isopals: false,
    ispearls: false,
    isrough: false,
    isroughprecious: false,
    isroughsemiprecious: false,
    isroughopals: false,
  });
  const [isShape, setisShape] = useState({
    faceted: false,
    cabochon: false,
    isothercabochon: false,
    oldeuropean: false,
    fancy: false,
    isotherfaceted: false,
    isotheroldeu: false,
    isprecious: false,
    issemiprecious: false,
    isopals: false,
    ispearls: false,
    isdiamonds: false,
    isotherpearls: false,
  });
  const [isRoughtype, setisRoughtype] = useState({
    isprecious: false,
    issemi: false,
    isopals: false,
    isother: false,
  });
  const [isFormation, setisFormation] = useState({
    isrest: false,
    ispearls: false,
  });
  const [isMinesource, setisMinesource] = useState({
    isrest: false,
    isprecious: false,
    issaphire: false,
    isruby: false,
    isalex: false,
    isemerald: false,
    istanzanite: false,
    iscatseye: false,
    isotherminesource: false,
  });
  const [cost, setCost] = useState({
    perpiece:false,
    percarats : false
  })
  const [price, setPrice] = useState({
    perpiece:false,
    percarats : false
  })
  const [isothertypeogem, setisOthertypeofgem] = useState(false);
  const [isotherformation, setisOtherformation] = useState(false);
  const [isothercategory, setisOthercategory] = useState(false);
  const [state, setState] = useState({
    category: "",
    weight: "",
    typeofgem: "",
    roughtypeofgem: "",
    othertypeofgem: "",
    otherroughtypeofgem: "",
    formation: "",
    otherformation: "",
    shape: "",
    facetedshape: "",
    cabochonshape: "",
    othercabochonshape: "",
    oldeushape: "",
    otherfacetedshape: "",
    otheroldeushape: "",
    specifyshape: "",
    fancyshape: "",
    color: "",
    othercolor: "",
    shades: "",
    clarity: "",
    length: "",
    width: "",
    depth: "",
    cost : "",
    price: "",
    costperpiece: "",
    costpercarat: "",
    totalcost: "",
    priceperpiece: "",
    pricepercarat: "",
    totalprice: "",
    enhancement: "",
    qualitygrade: "",
    description: "",
    quantity: "",
    otherpearlsshape: "",
    specificsource: "",
    minesource: "",
    selectminesource: "",
    otherminesource: "",
    colorintensity: "",
    othercolorintensity: "",
    otherclarity: "",
    listshades: "",
    othershades: "",
    specificshades: "",
    selectroughtypeofgem: "",
    ID: "",
    stocknumber: null,
  });
  const [weight, setWeight] = useState()
  const [costpercarat, setCostPerCarat] = useState()
  const [pricepercarat, setPricePerCarat] = useState()

  const toggleModalClassic = () => {
    setModalClassic(!modalClassic);
  };

  const confirmBtnOptions = useMemo(() => {
    return {
      text: "Confirm",
      type: "success",
      onClick: confirmClick,
    };
  }, [formData]);

  const cancelBtnOptions = useMemo(() => {
    return {
      text: "Cancel",
      onClick: cancelClick,
    };
  }, []);

  function onToolbarPreparing(e) {
    let toolbarItems = e.toolbarOptions.items;

    // customize addRow toolbar button
    for (let i = 0; i < toolbarItems.length; i++) {
      let item = toolbarItems[i];
      if (item.name === "addRowButton") {
        item.options.onClick = addClick;
        break;
      }
    }
  }

  useEffect(() => {
  callPage()
  }, []);

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
      let s;
      Axios.get(`${Constants.serverlink}folder/list`,{
        headers : {
          "token" : localStorage.getItem('token')
        }
      }).then((response) => {
        if (response.data.length>0 && response.status === 200) {
         response.data.map((e) => {
            for (let i =0; i<e.items.length; i++) {
              if (location.pathname === e.items[i].path) {
                s = e.items[i].text;
                break;
              }
            }
          })
        }
            Axios.get(`${Constants.serverlink}getcategory/${s}`,{
            headers : {
              "token" : localStorage.getItem('token')
            }
          }).then((response) => {
              localStorage.setItem(location.pathname, JSON.stringify(response.data))
              setData(response.data);
          });
      });

    }
  }
  }

  const onSpecificShades = (e) => {
    if (e.target.value === "Other") {
      setisShades({ ...isShades, isothershades: true });
      state.listshades = "Other";
    } else {
      state.listshades = e.target.value;
      state.shades = `${state.specificshades} / ${state.listshades}`;
    }
  };

  const onShadesChange = (e) => {
    if (e.target.value === "Blue") {
      setisShades({
        blue: true,
        tourmaline: false,
        spinel: false,
        zircon: false,
        isothershades: false,
      });
      state.specificshades = e.target.value;
      state.othershades = "";
      state.listshades = "";
    } else if (e.target.value === "Tourmaline") {
      setisShades({
        blue: false,
        tourmaline: true,
        spinel: false,
        zircon: false,
        isothershades: false,
      });
      state.specificshades = e.target.value;
      state.othershades = "";
      state.listshades = "";
    } else if (e.target.value === "Spinel") {
      setisShades({
        blue: false,
        tourmaline: false,
        spinel: true,
        zircon: false,
        isothershades: false,
      });
      state.specificshades = e.target.value;
      state.othershades = "";
      state.listshades = "";
    } else if (e.target.value === "Zircon") {
      setisShades({
        blue: false,
        tourmaline: false,
        spinel: false,
        zircon: true,
        isothershades: false,
      });
      state.specificshades = e.target.value;
      state.othershades = "";
      state.listshades = "";
    }
  };

  const onPreciousClarity = (e) => {
    if (e.target.value === "Other") {
      state.clarity = "Other";
      setisClarity({
        isprecious: true,
        isotherprecious: true,
        isdiamonds: false,
      });
    } else {
      state.clarity = e.target.value;
      setisClarity({
        isprecious: true,
        isotherprecious: false,
        isdiamonds: false,
      });
    }
  };

  const onColorIntensity = (e) => {
    if (e.target.value === "Other") {
      state.colorintensity = e.target.value;
      setisOthercolorintensity(true);
    } else {
      setisOthercolorintensity(false);
      state.colorintensity = e.target.value;
    }
  };

  const onSaphireSourceChange = (e) => {
    if (e.target.value === "Other") {
      state.selectminesource = e.target.value;
      setisMinesource({
        ...isMinesource,
        issaphire: true,
        isotherminesource: true,
        isruby: false,
        isalex: false,
        isemerald: false,
        istanzanite: false,
        iscatseye: false,
      });
    } else {
      // state.minesource =  `Sapphire / ${e.target.value}`
      state.selectminesource = e.target.value;
      state.minesource = e.target.value;
      setisMinesource({
        ...isMinesource,
        issaphire: true,
        isotherminesource: false,
        isruby: false,
        isalex: false,
        isemerald: false,
        istanzanite: false,
        iscatseye: false,
      });
    }
  };

  const onAlexSourceChange = (e) => {
    if (e.target.value === "Other") {
      state.selectminesource = e.target.value;
      setisMinesource({
        ...isMinesource,
        issaphire: false,
        isruby: false,
        isalex: true,
        isotherminesource: true,
        isemerald: false,
        istanzanite: false,
        iscatseye: false,
      });
    } else {
      // state.minesource =  `Alexandrite / ${e.target.value}`
      state.selectminesource = e.target.value;
      state.minesource = e.target.value;
      setisMinesource({
        ...isMinesource,
        issaphire: false,
        isotherminesource: false,
        isruby: false,
        isalex: true,
        isemerald: false,
        istanzanite: false,
        iscatseye: false,
      });
    }
  };

  const onEmeraldSourceChange = (e) => {
    if (e.target.value === "Other") {
      state.selectminesource = e.target.value;
      setisMinesource({
        ...isMinesource,
        issaphire: false,
        isotherminesource: true,
        isruby: false,
        isalex: false,
        isemerald: true,
        isotheremerald: true,
        istanzanite: false,
        iscatseye: false,
      });
    } else {
      // state.minesource =  `Emerald / ${e.target.value}`
      state.selectminesource = e.target.value;
      state.minesource = e.target.value;
      setisMinesource({
        ...isMinesource,
        issaphire: false,
        isotherminesource: false,
        isruby: false,
        isalex: false,
        isemerald: true,
        istanzanite: false,
        iscatseye: false,
      });
    }
  };

  const onRubySourceChange = (e) => {
    if (e.target.value === "Other") {
      state.selectminesource = e.target.value;
      setisMinesource({
        ...isMinesource,
        issaphire: false,
        isotherminesource: true,
        isruby: true,
        isotherruby: true,
        isalex: false,
        isemerald: false,
        istanzanite: false,
        iscatseye: false,
      });
    } else {
      // state.minesource =  `Ruby / ${e.target.value}`
      state.selectminesource = e.target.value;
      state.minesource = e.target.value;
      setisMinesource({
        ...isMinesource,
        issaphire: false,
        isotherminesource: false,
        isruby: true,
        isalex: false,
        isemerald: false,
        istanzanite: false,
        iscatseye: false,
      });
    }
  };

  const onTanzaniteSourceChange = (e) => {
    if (e.target.value === "Other") {
      state.selectminesource = e.target.value;
      setisMinesource({
        ...isMinesource,
        issaphire: false,
        isotherminesource: true,
        isruby: false,
        isalex: false,
        isemerald: false,
        istanzanite: true,
        isothertanzanite: true,
        iscatseye: false,
      });
    } else {
      // state.minesource =  `Tanzanite / ${e.target.value}`
      state.selectminesource = e.target.value;
      state.minesource = e.target.value;
      setisMinesource({
        ...isMinesource,
        issaphire: false,
        isotherminesource: false,
        isruby: false,
        isalex: false,
        isemerald: false,
        istanzanite: true,
        iscatseye: false,
      });
    }
  };

  const onMineSourceChange = (e) => {
    if (e.target.value === "Cats Eye") {
      state.specificsource = e.target.value;
      state.selectminesource = "";
      setisMinesource({
        ...isMinesource,
        issaphire: false,
        isotherminesource: false,
        isruby: false,
        isalex: false,
        isemerald: false,
        istanzanite: false,
        iscatseye: true,
      });
    } else if (e.target.value === "Alexandrite") {
      state.specificsource = e.target.value;
      state.selectminesource = "";
      setisMinesource({
        ...isMinesource,
        issaphire: false,
        isotherminesource: false,
        isruby: false,
        isalex: true,
        isemerald: false,
        istanzanite: false,
        iscatseye: false,
      });
    } else if (e.target.value === "Sapphire") {
      state.specificsource = e.target.value;
      state.selectminesource = "";
      setisMinesource({
        ...isMinesource,
        issaphire: true,
        isotherminesource: false,
        isruby: false,
        isalex: false,
        isemerald: false,
        istanzanite: false,
        iscatseye: false,
      });
    } else if (e.target.value === "Ruby") {
      state.specificsource = e.target.value;
      state.selectminesource = "";
      setisMinesource({
        ...isMinesource,
        issaphire: false,
        isotherminesource: false,
        isruby: true,
        isalex: false,
        isemerald: false,
        istanzanite: false,
        iscatseye: false,
      });
    } else if (e.target.value === "Emerald") {
      state.specificsource = e.target.value;
      state.selectminesource = "";
      setisMinesource({
        ...isMinesource,
        issaphire: false,
        isotherminesource: false,
        isruby: false,
        isalex: false,
        isemerald: true,
        istanzanite: false,
        iscatseye: false,
      });
    } else if (e.target.value === "Tanzanite") {
      state.specificsource = e.target.value;
      state.selectminesource = "";
      setisMinesource({
        ...isMinesource,
        issaphire: false,
        isotherminesource: false,
        isruby: false,
        isalex: false,
        isemerald: false,
        istanzanite: true,
        iscatseye: false,
      });
    }
  };

  const onRoughType = (e) => {
    if (e.target.value === "Precious Gems") {
      setisRoughtype({
        isprecious: true,
        issemi: false,
        isopals: false,
        isother: false,
      });
      state.roughtypeofgem = e.target.value;
      state.selectroughtypeofgem = "";
    } else if (e.target.value === "Semi Precious Gems") {
      setisRoughtype({
        isprecious: false,
        issemi: true,
        isopals: false,
        isother: false,
      });
      state.roughtypeofgem = e.target.value;
      state.selectroughtypeofgem = "";
    } else if (e.target.value === "Opals") {
      setisRoughtype({
        isprecious: false,
        issemi: false,
        isopals: true,
        isother: false,
      });
      state.roughtypeofgem = e.target.value;
      state.selectroughtypeofgem = "";
    }
  };

  const onSelectRoughType = (e) => {
    if (e.target.value === "Other") {
      setisRoughtype({
        ...isRoughtype,
        isother: true,
      });
      state.selectroughtypeofgem = "Other";
    } else {
      state.selectroughtypeofgem = e.target.value;
      setisRoughtype({ ...isRoughtype, isother: false });
    }
  };

  const onTypeChange = (e) => {
    if (e.target.value === "Other") {
      state.typeofgem = "Other";
      setisOthertypeofgem(true);
      state.specificsource = ''
      setisMinesource({isrest: false,
        isprecious: true,
        issaphire: false,
        isruby: false,
        isalex: false,
        isemerald: false,
        istanzanite: false,
        iscatseye: false,
        isotherminesource: false})
    } else if (e.target.value === "Precious Gems") {
      state.typeofgem = "Precious Gems";
      setisRoughtype({
        isprecious: true,
        issemi: false,
        isopals: false,
        isother: false,
      });
    } else if (e.target.value === "Semi Precious Gems") {
      state.typeofgem = "Semi Precious Gems";
      setisRoughtype({
        isprecious: false,
        issemi: true,
        isopals: false,
        isother: false,
      });
    } else if (e.target.value === "Opals") {
      setisRoughtype({
        isprecious: false,
        issemi: false,
        isopals: true,
        isother: false,
      });
      state.typeofgem = "Opals";
    } else if (e.target.value === "Sapphire") {
      setColorCategory({
        isdiamonds: false,
        isprecious: true,
        issemiprecious: false,
        isrough: false,
        isopals: false,
        ispearls: false,
      });
      state.typeofgem = "Sapphire";
      setisMinesource({isrest: false,
        isprecious: true,
        issaphire: true,
        isruby: false,
        isalex: false,
        isemerald: false,
        istanzanite: false,
        iscatseye: false,
        isotherminesource: false})
        state.specificsource = 'Sapphire'
    } else if (e.target.value === "Emerald") {
      setColorCategory({
        isdiamonds: false,
        isprecious: true,
        issemiprecious: false,
        isrough: false,
        isopals: false,
        ispearls: false,
      });
      state.typeofgem = "Emerald";
      setisMinesource({isrest: false,
        isprecious: true,
        issaphire: false,
        isruby: false,
        isalex: false,
        isemerald: true,
        istanzanite: false,
        iscatseye: false,
        isotherminesource: false})
        state.specificsource = 'Emerald'
    } else if (e.target.value === "Ruby") {
      setColorCategory({
        isdiamonds: false,
        isprecious: true,
        issemiprecious: false,
        isrough: false,
        isopals: false,
        ispearls: false,
      });
      state.typeofgem = "Ruby";
      setisMinesource({isrest: false,
        isprecious: true,
        issaphire: false,
        isruby: true,
        isalex: false,
        isemerald: false,
        istanzanite: false,
        iscatseye: false,
        isotherminesource: false})
        state.specificsource = 'Ruby'
    } else if (e.target.value === "Tanzanite") {
      setColorCategory({
        isdiamonds: false,
        isprecious: true,
        issemiprecious: false,
        isrough: false,
        isopals: false,
        ispearls: false,
      });
      state.typeofgem = "Tanzanite";
      setisMinesource({isrest: false,
        isprecious: true,
        issaphire: false,
        isruby: false,
        isalex: false,
        isemerald: false,
        istanzanite: true,
        iscatseye: false,
        isotherminesource: false})
        state.specificsource = 'Tanzanite'
    } else if (e.target.value === "Cats Eye") {
      setColorCategory({
        isdiamonds: false,
        isprecious: true,
        issemiprecious: false,
        isrough: false,
        isopals: false,
        ispearls: false,
      });
      state.typeofgem = "Cats Eye";
      setisMinesource({isrest: false,
        isprecious: true,
        issaphire: false,
        isruby: false,
        isalex: false,
        isemerald: false,
        istanzanite: false,
        iscatseye: true,
        isotherminesource: false})
        state.specificsource = 'Cats Eye'
    } else if (e.target.value === "Alexandrite") {
      setColorCategory({
        isdiamonds: false,
        isprecious: true,
        issemiprecious: false,
        isrough: false,
        isopals: false,
        ispearls: false,
      });
      state.typeofgem = "Alexandrite";
      setisMinesource({isrest: false,
        isprecious: true,
        issaphire: false,
        isruby: false,
        isalex: false,
        isemerald: false,
        istanzanite: true,
        iscatseye: false,
        isotherminesource: false})
        state.specificsource = 'Alexandrite'
    } 
    
    else if (e.target.value === "Topaz" || e.target.value === "Tourmaline" || e.target.value === "Spinel" || e.target.value === "Zircon") {
      setColorCategory({
        isdiamonds: false,
        isprecious: false,
        issemiprecious: true,
        isrough: false,
        isopals: false,
        ispearls: false,
      });
      state.typeofgem = e.target.value;
    } 
    
    else {
      state.typeofgem = e.target.value;
      setColorCategory({ ...colorCategory, isprecious: false , issemiprecious:false});
      setisOthertypeofgem(false);
    }
  };

  const onCategoryChange = (e) => {
    if (e.target.value === "Other") {
      handleHidePopup(1);
      setisOthercategory(true);
      state.stocknumber = 0;
      state.category = "Other"
    } else if (e.target.value === "Precious Gems") {
      // NullifyState()
      showEnhancement(true);
      state.stocknumber = generateStock(200000, 300000);
      setisClarity({
        isprecious: true,
        isdiamonds: false,
        isotherprecious: false,
      });
      setisRoughtype({
        isprecious: false,
        issemi: false,
        isopals: false,
        isother: false,
      });
      // setColorCategory({isdiamonds :false, isprecious : true, issemi : false, isrough : false, isopals :false,ispearls : false})
      showColorIntensity(true);
      setColorCategory({
        isdiamonds: false,
        isprecious: false,
        issemi: false,
        isrough: false,
        isopals: false,
        ispearls: false,
      });
      setisTypeofgem({
        isdiamonds: false,
        isprecious: true,
        issemiprecious: false,
        isopals: false,
        ispearls: false,
        isrough: false,
        isroughprecious: false,
        isroughsemiprecious: false,
        isroughopals: false,
      });
      // setColorCategory({})
      setisShape({
        faceted: false,
        oldeuropean: false,
        fancy: false,
        isotherfaceted: false,
        isotheroldeu: false,
        isprecious: true,
        issemiprecious: false,
        isopals: false,
        ispearls: false,
        isdiamonds: false,
      });
      setisColor({
        colorwhite: false,
        colorbrown: false,
        coloryellow: false,
        isothercolor: false,
      });
      setisFormation({ isrest: true, ispearls: false });
      setisMinesource({ ...isMinesource, isrest: false, isprecious: true });
      setisOthercategory(false);
      setisOthertypeofgem(false);
      setisOtherformation(false);
      setisOthercolorintensity(false);
      state.category = e.target.value;
      setisOthercategory(false);
    } else if (e.target.value === "Semi-Precious Gems") {
      // NullifyState()
      showEnhancement(true);
      state.stocknumber = generateStock(300000, 400000);
      setisClarity({
        isprecious: true,
        isdiamonds: false,
        isotherprecious: false,
      });
      setisRoughtype({
        isprecious: false,
        issemi: false,
        isopals: false,
        isother: false,
      });
      setColorCategory({
        isdiamonds: false,
        isprecious: false,
        issemi: true,
        isrough: false,
        isopals: false,
        ispearls: false,
      });
      setisColor({
        colorwhite: false,
        colorbrown: false,
        coloryellow: false,
        isothercolor: false,
      });
      showColorIntensity(true);
      setisTypeofgem({
        isdiamonds: false,
        isprecious: false,
        issemiprecious: true,
        isopals: false,
        ispearls: false,
        isrough: false,
        isroughprecious: false,
        isroughsemiprecious: false,
        isroughopals: false,
      });
      setisShape({
        faceted: false,
        oldeuropean: false,
        fancy: false,
        isotherfaceted: false,
        isotheroldeu: false,
        isprecious: false,
        issemiprecious: true,
        isopals: false,
        ispearls: false,
        isdiamonds: false,
      });
      setisFormation({ isrest: true, ispearls: false });
      setisMinesource({
        isrest: true,
        isprecious: false,
        issaphire: false,
        isruby: false,
        isalex: false,
        isemerald: false,
        istanzanite: false,
        iscatseye: false,
        isotherminesource: false,
      });
      setisOthercategory(false);
      setisOthertypeofgem(false);
      setisOtherformation(false);
      setisOthercolorintensity(false);
      state.category = e.target.value;
    } else if (e.target.value === "Opals") {
      // NullifyState()
      showEnhancement(false);
      state.stocknumber = generateStock(400000, 500000);
      setisClarity({
        isprecious: false,
        isdiamonds: false,
        isotherprecious: false,
      });
      setisRoughtype({
        isprecious: false,
        issemi: false,
        isopals: false,
        isother: false,
      });
      setisColor({
        colorwhite: false,
        colorbrown: false,
        coloryellow: false,
        isothercolor: false,
      });
      setColorCategory({
        isdiamonds: false,
        isprecious: false,
        issemi: false,
        isrough: false,
        isopals: true,
        ispearls: false,
      });
      showColorIntensity(true);
      setisTypeofgem({
        isdiamonds: false,
        isprecious: false,
        issemiprecious: false,
        isopals: true,
        ispearls: false,
        isrough: false,
        isroughprecious: false,
        isroughsemiprecious: false,
        isroughopals: false,
      });
      setisShape({
        faceted: false,
        oldeuropean: false,
        fancy: false,
        isotherfaceted: false,
        isotheroldeu: false,
        isprecious: false,
        issemiprecious: false,
        isopals: true,
        ispearls: false,
        isdiamonds: false,
      });
      setisFormation({ isrest: true, ispearls: false });
      setisMinesource({
        isrest: true,
        isprecious: false,
        issaphire: false,
        isruby: false,
        isalex: false,
        isemerald: false,
        istanzanite: false,
        iscatseye: false,
        isotherminesource: false,
      });
      setisOthercategory(false);
      setisOthertypeofgem(false);
      setisOtherformation(false);
      setisOthercolorintensity(false);
      state.category = e.target.value;
      setisOthercategory(false);
    } else if (e.target.value === "Pearls") {
      // NullifyState()
      showEnhancement(false);
      state.stocknumber = generateStock(600000, 700000);
      setisClarity({
        isprecious: false,
        isdiamonds: false,
        isotherprecious: false,
      });
      setisRoughtype({
        isprecious: false,
        issemi: false,
        isopals: false,
        isother: false,
      });
      setisColor({
        colorwhite: false,
        colorbrown: false,
        coloryellow: false,
        isothercolor: false,
      });
      setColorCategory({
        isdiamonds: false,
        isprecious: false,
        issemi: false,
        isrough: false,
        isopals: false,
        ispearls: true,
      });
      showColorIntensity(true);
      setisTypeofgem({
        isdiamonds: false,
        isprecious: false,
        issemiprecious: false,
        isopals: false,
        ispearls: true,
        isrough: false,
        isroughprecious: false,
        isroughsemiprecious: false,
        isroughopals: false,
      });
      setisShape({
        faceted: false,
        oldeuropean: false,
        fancy: false,
        isotherfaceted: false,
        isotheroldeu: false,
        isprecious: false,
        issemiprecious: false,
        isopals: false,
        ispearls: true,
        isdiamonds: false,
      });
      setisFormation({ isrest: false, ispearls: true });
      setisMinesource({
        isrest: true,
        isprecious: false,
        issaphire: false,
        isruby: false,
        isalex: false,
        isemerald: false,
        istanzanite: false,
        iscatseye: false,
        isotherminesource: false,
      });
      state.category = e.target.value;
      setisOthercategory(false);
      setisOthertypeofgem(false);
      setisOtherformation(false);
      setisOthercolorintensity(false);
    } else if (e.target.value === "Diamonds") {
      // NullifyState()
      showEnhancement(false);
      state.stocknumber = generateStock(100000, 200000);
      setisClarity({
        isprecious: false,
        isdiamonds: true,
        isotherprecious: false,
      });
      setisRoughtype({
        isprecious: false,
        issemi: false,
        isopals: false,
        isother: false,
      });
      setColorCategory({
        isdiamonds: true,
        isprecious: false,
        issemi: false,
        isrough: false,
        isopals: false,
        ispearls: false,
      });
      showColorIntensity(false);
      setisTypeofgem({
        isdiamonds: true,
        isprecious: false,
        issemiprecious: false,
        isopals: false,
        ispearls: false,
        isrough: false,
        isroughprecious: false,
        isroughsemiprecious: false,
        isroughopals: false,
      });
      setisShape({
        faceted: false,
        oldeuropean: false,
        fancy: false,
        isotherfaceted: false,
        isotheroldeu: false,
        isprecious: false,
        issemiprecious: false,
        isopals: false,
        ispearls: false,
        isdiamonds: true,
      });
      setisFormation({ isrest: true, ispearls: false });
      setisMinesource({
        isrest: false,
        isprecious: false,
        issaphire: false,
        isruby: false,
        isalex: false,
        isemerald: false,
        istanzanite: false,
        iscatseye: false,
        isotherminesource: false,
      });
      setisOthercategory(false);
      setisOthertypeofgem(false);
      setisOtherformation(false);
      setisOthercolorintensity(false);
      state.category = e.target.value;
    } else if (e.target.value === "Rough") {
      // NullifyState()
      showEnhancement(false);
      state.stocknumber = generateStock(500000, 600000);
      setisClarity({
        isprecious: false,
        isdiamonds: false,
        isotherprecious: false,
      });
      setisColor({
        colorwhite: false,
        colorbrown: false,
        coloryellow: false,
        isothercolor: false,
      });
      setColorCategory({
        isdiamonds: false,
        isprecious: false,
        issemi: false,
        isrough: true,
        isopals: false,
        ispearls: false,
      });
      showColorIntensity(true);
      setisTypeofgem({
        isdiamonds: false,
        isprecious: false,
        issemiprecious: false,
        isopals: false,
        ispearls: false,
        isrough: true,
        isroughprecious: false,
        isroughsemiprecious: false,
        isroughopals: false,
      });
      setisShape({
        faceted: false,
        oldeuropean: false,
        fancy: false,
        isotherfaceted: false,
        isotheroldeu: false,
        isprecious: false,
        issemiprecious: false,
        isopals: false,
        ispearls: false,
        isdiamonds: false,
      });
      setisFormation({ isrest: true, ispearls: false });
      setisMinesource({
        isrest: true,
        isprecious: false,
        issaphire: false,
        isruby: false,
        isalex: false,
        isemerald: false,
        istanzanite: false,
        iscatseye: false,
        isotherminesource: false,
      });
      setisOthercategory(false);
      setisOthertypeofgem(false);
      setisOtherformation(false);
      setisOthercolorintensity(false);
      state.category = e.target.value;
    } else {
      // state.category = e.target.value;
      // setisShape({
      //   faceted: false,
      //   oldeuropean: false,
      //   fancy: false,
      //   isotherfaceted: false,
      //   isotheroldeu: false,
      //   isprecious: false,
      //   issemiprecious: false,
      //   isopals: false,
      //   ispearls: false,
      //   isdiamonds: false,
      // });
      // setisTypeofgem({
      //   isdiamonds: false,
      //   isprecious: false,
      //   issemiprecious: false,
      //   isopals: false,
      //   ispearls: false,
      //   isrough: false,
      //   isroughprecious: false,
      //   isroughsemiprecious: false,
      //   isroughopals: false,
      // });
      // showEnhancement(false);
      // setisClarity({
      //   isprecious: false,
      //   isdiamonds: false,
      //   isotherprecious: false,
      // });
      // setColorCategory({
      //   isdiamonds: false,
      //   isprecious: false,
      //   issemi: false,
      //   isrough: false,
      //   isopals: false,
      //   ispearls: false,
      // });
      // setisFormation({ isrest: false, ispearls: false });
      // setisMinesource({ ...isMinesource, isrest: false, isprecious: false });
      // setisOthercategory(false);
      // showColorIntensity(false);
      handleHidePopup();
    }
  };

  const onFormationChange = (e) => {
    if (e.target.value === "Other") {
      state.formation = "Other";
      setisOtherformation(true);
    } else {
      state.formation = e.target.value;
      state.otherformation = "";
      setisOtherformation(false);
    }
  };
  const onColorChange = (e) => {
    if (e.target.value === "Other") {
      setisColor({ colorwhite: false, coloryellow: false, colorbrown: false });
      state.color = "Other";
      state.shades = "";
      showShades(false);
      setisColor({
        colorwhite: false,
        coloryellow: false,
        colorbrown: false,
        isothercolor: true,
      });
    } else if (e.target.value === "White" && state.category === "Diamonds") {
      state.color = e.target.value;
      showShades(false);
      setisColor({
        colorwhite: true,
        coloryellow: false,
        colorbrown: false,
        isothercolor: false,
      });
    } else if (e.target.value === "Yellow" && state.category === "Diamonds") {
      state.color = e.target.value;
      showShades(false);
      setisColor({
        colorwhite: false,
        coloryellow: true,
        colorbrown: false,
        isothercolor: false,
      });
    } else if (e.target.value === "Brown" && state.category === "Diamonds") {
      state.color = e.target.value;
      showShades(false);
      setisColor({
        colorwhite: false,
        coloryellow: false,
        colorbrown: true,
        isothercolor: false,
      });
    } else if (
      e.target.value === "Blue" &&
      state.category === "Semi-Precious Gems"
    ) {
      state.color = e.target.value;
      setisColor({
        colorwhite: false,
        coloryellow: false,
        colorbrown: false,
        isothercolor: false,
      });
      showShades(true);
    } else {
      showShades(false);
      setisColor({
        colorwhite: false,
        coloryellow: false,
        colorbrown: false,
        isothercolor: false,
      });
      state.shades = "";
      state.color = e.target.value;
    }
  };

  const onShapeChange = (e) => {
    if (e.target.value === "Fancy") {
      state.specifyshape = e.target.value;
      state.facetedshape = "";
      state.oldeushape = "";
      state.otherfacetedshape = "";
      state.otheroldeushape = "";
      state.cabochonshape = "";
      state.othercabochonshape = "";
      setisShape({
        ...isShape,
        faceted: false,
        oldeuropean: false,
        fancy: true,
        isotheroldeu: false,
        isotherfaceted: false,
        cabochon: false,
      });
    } else if (e.target.value === "Faceted") {
      state.specifyshape = e.target.value;
      state.fancyshape = "";
      state.oldeushape = "";
      state.otheroldeushape = "";
      state.cabochonshape = "";
      state.othercabochonshape = "";
      setisShape({
        ...isShape,
        faceted: true,
        oldeuropean: false,
        fancy: false,
        isotheroldeu: false,
        isotherfaceted: false,
        cabochon: false,
      });
    } else if (e.target.value === "Old European") {
      state.specifyshape = e.target.value;
      state.facetedshape = "";
      state.otherfacetedshape = "";
      state.fancyshape = "";
      state.cabochonshape = "";
      state.othercabochonshape = "";
      setisShape({
        ...isShape,
        faceted: false,
        oldeuropean: true,
        fancy: false,
        isotheroldeu: false,
        isotherfaceted: false,
        cabochon: false,
      });
    } else if (e.target.value === "Cabochon") {
      state.specifyshape = e.target.value;
      state.facetedshape = "";
      state.otherfacetedshape = "";
      state.oldeushape = "";
      state.otheroldeushape = "";
      state.fancyshape = "";
      setisShape({
        ...isShape,
        faceted: false,
        oldeuropean: false,
        fancy: false,
        isotheroldeu: false,
        isotherfaceted: false,
        cabochon: true,
      });
    } else if (e.target.value === "Other") {
      state.specifyshape = e.target.value;
      setisShape({
        ...isShape,
        faceted: false,
        oldeuropean: false,
        fancy: false,
        isotheroldeu: false,
        isotherfaceted: false,
        cabochon: false,
        ispearls: true,
        isotherpearls: true,
      });
    } else {
      state.specifyshape = e.target.value;
      state.shape = e.target.value;
      setisShape({
        ...isShape,
        ispearls: true,
        isotherpearls: false,
      });
    }
  };

  const onCabochonShape = (e) => {
    if (e.target.value === "Other") {
      state.cabochonshape = e.target.value;
      setisShape({
        ...isShape,
        faceted: false,
        oldeuropean: false,
        isotheroldeu: false,
        isotherfaceted: false,
        isothercabochon: true,
        fancy: false,
        cabochon: true,
      });
    } else {
      state.cabochonshape = e.target.value;
      state.shape = `Cabochon / ${state.cabochonshape}`;
      setisShape({
        ...isShape,
        faceted: false,
        oldeuropean: false,
        isotheroldeu: false,
        isothercabochon: false,
        isotherfaceted: false,
        fancy: false,
        cabochon: true,
      });
    }
  };

  const onFacetedShapeChange = (e) => {
    if (e.target.value === "Other") {
      state.facetedshape = e.target.value;
      setisShape({
        ...isShape,
        faceted: true,
        oldeuropean: false,
        isotheroldeu: false,
        isotherfaceted: true,
        fancy: false,
      });
    } else {
      state.facetedshape = e.target.value;
      state.shape = `Faceted / ${state.facetedshape}`;
      setisShape({
        ...isShape,
        faceted: true,
        oldeuropean: false,
        isotheroldeu: false,
        isotherfaceted: false,
        fancy: false,
      });
    }
  };

  const onOldEuShapeChange = (e) => {
    if (e.target.value === "Other") {
      state.oldeushape = e.target.value;
      setisShape({
        ...isShape,
        faceted: false,
        oldeuropean: true,
        isotheroldeu: true,
        isotherfaceted: false,
        fancy: false,
      });
    } else {
      state.oldeushape = e.target.value;
      state.shape = `Old European / ${state.oldeushape}`;
      setisShape({
        ...isShape,
        faceted: false,
        oldeuropean: true,
        isotheroldeu: false,
        isotherfaceted: false,
        fancy: false,
      });
    }
  };

  function editClick(e) {
    // setStateToNull();
    setisOtherformation(false);
    setisOthertypeofgem(false);
    setisOthercategory(false);
    setisEditing(true);
    showPopup("Edit", { ...e.row.data });
    const rowdata = e.row.data;
    state.ID = rowdata._id;
    const editdata = data.find((e) => {
      return e._id === rowdata._id;
    });
    parseInt(editdata.Weight);
    if (editdata.othercategory) {
      setisOthercategory(true)
    }
    if (editdata.cost ==='Per Piece') {
      setCost({perpiece : true,percarats:false})
    } 
    if (editdata.cost ==='Per Carats') {
      setCost({perpiece : false,percarats:true})
    } 
    if (editdata.price ==='Per Piece') {
      setCost({perpiece : true,percarats:false})
    } 
    if (editdata.price ==='Per Piece') {
      setCost({perpiece : false,percarats:true})
    } 
    if (editdata.Category === "Diamonds") {
      setisTypeofgem({ ...isTypeofgem, isdiamonds: true });
      if (
        editdata.othertypeofgem !== "" &&
        editdata.othertypeofgem === editdata.TypeofGem
      ) {
        setisOthertypeofgem(true);
      }
      setisFormation({ ...isFormation, isrest: true });
      if (
        editdata.otherformation !== "" &&
        editdata.otherformation === editdata.Formation
      ) {
        setisOtherformation(true);
      }
      setisShape({ ...isShape, isdiamonds: true });
      if (editdata.facetedshape) {
        setisShape({ ...isShape, faceted: true, isdiamonds: true });
      }
      if (editdata.otherfacetedshape && editdata.facetedshape === "Other") {
        setisShape({
          ...isShape,
          isotherfaceted: true,
          faceted: true,
          isdiamonds: true,
        });
      }
      if (editdata.oldeushape) {
        setisShape({ ...isShape, oldeuropean: true, isdiamonds: true });
      }
      if (editdata.otheroldeushape && editdata.oldeushape === "Other") {
        setisShape({
          ...isShape,
          isotheroldeu: true,
          oldeuropean: true,
          isdiamonds: true,
        });
      }
      if (editdata.fancyshape) {
        setisShape({ ...isShape, fancy: true, isdiamonds: true });
      }
      if (editdata.othercolor && editdata.othercolor === editdata.Color) {
        setisColor({ ...isColor, isothercolor: true });
      }
      setColorCategory({ ...colorCategory, isdiamonds: true });
      if (editdata.Color === "White") {
        setisColor({ ...isColor, colorwhite: true });
      }
      if (editdata.Color === "Yellow") {
        setisColor({ ...isColor, coloryellow: true });
      }
      if (editdata.Color === "Brown") {
        setisColor({ ...isColor, colorbrown: true });
      }
    } else if (editdata.Category === "Precious Gems") {
      setisTypeofgem({ ...isTypeofgem, isprecious: true });
      if (
        editdata.othertypeofgem !== "" &&
        editdata.othertypeofgem === editdata.TypeofGem
      ) {
        setisOthertypeofgem(true);
      }
      if (editdata.TypeofGem === "Sapphire") {
        setColorCategory({ ...colorCategory, isprecious: true });
      }
      setisFormation({ ...isFormation, isrest: true });
      if (
        editdata.otherformation !== "" &&
        editdata.otherformation === editdata.Formation
      ) {
        setisOtherformation(true);
      }
      setisShape({ ...isShape, isprecious: true });
      if (editdata.facetedshape) {
        setisShape({ ...isShape, faceted: true, isprecious: true });
      }
      if (editdata.otherfacetedshape && editdata.facetedshape === "Other") {
        setisShape({
          ...isShape,
          isotherfaceted: true,
          faceted: true,
          isprecious: true,
        });
      }
      if (editdata.cabochonshape) {
        setisShape({ ...isShape, cabochon: true, isprecious: true });
      }
      if (editdata.othercabochonshape && editdata.cabochonshape === "Other") {
        setisShape({
          ...isShape,
          cabochon: true,
          isothercabochon: true,
          isprecious: true,
        });
      }
      if (editdata.fancyshape) {
        setisShape({ ...isShape, fancy: true, isprecious: true });
      }
      if (editdata.othercolor && editdata.othercolor === editdata.Color) {
        setisColor({ ...isColor, isothercolor: true });
      }
      // setColorCategory({ ...colorCategory, isprecious: true });
      setisMinesource({ ...isMinesource, isprecious: true });
      if (editdata.specificsource === "Sapphire") {
        setisMinesource({ ...isMinesource, issaphire: true, isprecious: true });
        setColorCategory({ ...colorCategory, isprecious: true });
        if (editdata.selectminesource === "Other") {
          setisMinesource({
            ...isMinesource,
            isotherminesource: true,
            isprecious: true,
            issaphire: true,
          });
        }
      }
      if (editdata.specificsource === "Alexandrite") {
        setisMinesource({ ...isMinesource, isalex: true, isprecious: true });
        if (editdata.selectminesource === "Other") {
          setisMinesource({
            ...isMinesource,
            isotherminesource: true,
            isprecious: true,
            isalex: true,
          });
        }
      }
      if (editdata.specificsource === "Ruby") {
        setisMinesource({ ...isMinesource, isruby: true, isprecious: true });
        if (editdata.selectminesource === "Other") {
          setisMinesource({
            ...isMinesource,
            isotherminesource: true,
            isprecious: true,
            isruby: true,
          });
        }
      }
      if (editdata.specificsource === "Tanzanite") {
        setisMinesource({
          ...isMinesource,
          istanzanite: true,
          isprecious: true,
        });
        if (editdata.selectminesource === "Other") {
          setisMinesource({
            ...isMinesource,
            isotherminesource: true,
            isprecious: true,
            istanzanite: true,
          });
        }
      }
      if (editdata.specificsource === "Emerald") {
        setisMinesource({ ...isMinesource, isemerald: true, isprecious: true });
        if (editdata.selectminesource === "Other") {
          setisMinesource({
            ...isMinesource,
            isotherminesource: true,
            isprecious: true,
            isemerald: true,
          });
        }
      }
      if (editdata.specificsource === "Cats Eye") {
        setisMinesource({ ...isMinesource, iscatseye: true, isprecious: true });
        // if (editdata.selectminesource === 'Other') {
        //   setisMinesource({
        //     ...isMinesource,
        //     isotherminesource: false,
        //     isprecious: true,
        //     iscatseye: true,
        //   });
        // }
      }
      if (editdata.specificsource === "Other") {
        setisMinesource({
          ...isMinesource,
          isotherminesource: true,
          isprecious: true,
        });
        // if (editdata.otherminesource) {
        //   setisMinesource({
        //     ...isMinesource,
        //     isotherminesource: false,
        //     isprecious: true,
        //     iscatseye: true,
        //   });
        // }
      }
      showColorIntensity(true);
      if (
        editdata.othercolorintensity &&
        editdata.othercolorintensity === editdata.ColorIntensity
      ) {
        setisOthercolorintensity(true);
      }
      setisClarity({ ...isClarity, isprecious: true });
      if (editdata.otherclarity && editdata.otherclarity === editdata.Clarity) {
        setisClarity({ ...isClarity, isprecious: true, isotherprecious: true });
      }
      showEnhancement(true);
    } else if (editdata.Category === "Semi-Precious Gems") {
      setisTypeofgem({ ...isTypeofgem, issemiprecious: true });
      if (
        editdata.othertypeofgem !== "" &&
        editdata.othertypeofgem === editdata.TypeofGem
      ) {
        setisOthertypeofgem(true);
      }
      setisFormation({ ...isFormation, isrest: true });
      if (
        editdata.otherformation !== "" &&
        editdata.otherformation === editdata.Formation
      ) {
        setisOtherformation(true);
      }
      setisShape({ ...isShape, issemiprecious: true });
      if (editdata.facetedshape) {
        setisShape({ ...isShape, faceted: true, issemiprecious: true });
      }
      if (editdata.otherfacetedshape && editdata.facetedshape === "Other") {
        setisShape({
          ...isShape,
          isotherfaceted: true,
          faceted: true,
          issemiprecious: true,
        });
      }
      if (editdata.cabochonshape) {
        setisShape({ ...isShape, cabochon: true, issemiprecious: true });
      }
      if (editdata.othercabochonshape && editdata.cabochonshape === "Other") {
        setisShape({
          ...isShape,
          cabochon: true,
          isothercabochon: true,
          issemiprecious: true,
        });
      }
      if (editdata.fancyshape) {
        setisShape({ ...isShape, fancy: true, issemiprecious: true });
      }
      showColorIntensity(true);
      if (editdata.othercolorintensity) {
        setisOthercolorintensity(true);
      }
      setisClarity({ ...isClarity, isprecious: true });
      if (editdata.otherclarity && editdata.otherclarity === editdata.Clarity) {
        setisClarity({ ...isClarity, isprecious: true, isotherprecious: true });
      }
      showEnhancement(true);
      if (editdata.othercolor && editdata.othercolor === editdata.Color) {
        setisColor({ ...isColor, isothercolor: true });
      }
      if (editdata.TypeofGem === 'Topaz' || editdata.TypeofGem === 'Tourmaline' || editdata.TypeofGem === 'Spinel' || editdata.TypeofGem === 'Zircon') {
        setColorCategory({ ...colorCategory, issemiprecious: true });
      }
      if (editdata.Color === "Blue") {
        showShades(true);
      }
      if (editdata.specificshades === "Spinel") {
        setisShades({ ...isShades, spinel: true });
        if (editdata.othershades && editdata.listshades === 'Other') {
          setisShades({ ...isShades, isothershades: true, spinel: true });
        }
      }
      if (editdata.specificshades === "Zircon") {
        setisShades({ ...isShades, zircon: true });
        if (editdata.othershades && editdata.listshades === 'Other') {
          setisShades({ ...isShades, isothershades: true, zircon: true });
        }
      }
      if (editdata.specificshades === "Tourmaline") {
        setisShades({ ...isShades, tourmaline: true });
        if (editdata.othershades && editdata.listshades === 'Other') {
          setisShades({ ...isShades, isothershades: true, tourmaline: true });
        }
      }
      if (editdata.specificshades === "Blue") {
        setisShades({ ...isShades, blue: true });
        if (editdata.othershades && editdata.listshades === 'Other') {
          setisShades({ ...isShades, isothershades: true, blue: true });
        }
      }
      // if (editdata.othershades && editdata.listshades === 'Other') {
      //   setisShades({ ...isShades, isothershades: true });
      // }
    } else if (editdata.Category === "Opals") {
      setisTypeofgem({ ...isTypeofgem, isopals: true });
      if (
        editdata.othertypeofgem !== "" &&
        editdata.othertypeofgem === editdata.TypeofGem
      ) {
        setisOthertypeofgem(true);
      }
      setisFormation({ ...isFormation, isrest: true });
      if (
        editdata.otherformation !== "" &&
        editdata.otherformation === editdata.Formation
      ) {
        setisOtherformation(true);
      }
      setisShape({ ...isShape, isopals: true });
      if (editdata.facetedshape) {
        setisShape({ ...isShape, faceted: true, isopals: true });
      }
      if (editdata.otherfacetedshape && editdata.facetedshape === "Other") {
        setisShape({
          ...isShape,
          isotherfaceted: true,
          faceted: true,
          isopals: true,
        });
      }
      if (editdata.cabochonshape) {
        setisShape({ ...isShape, cabochon: true, isopals: true });
      }
      if (editdata.othercabochonshape && editdata.cabochon === "Other") {
        setisShape({
          ...isShape,
          cabochon: true,
          isothercabochon: true,
          isopals: true,
        });
      }
      if (editdata.fancyshape) {
        setisShape({ ...isShape, fancy: true, isopals: true });
      }
      if (editdata.othercolor && editdata.othercolor === editdata.Color) {
        setisColor({ ...isColor, isothercolor: true });
      }
      setColorCategory({ ...colorCategory, isopals: true });
      showColorIntensity(true);
      if (
        editdata.othercolorintensity &&
        editdata.othercolorintensity === editdata.ColorIntensity
      ) {
        setisOthercolorintensity(true);
      }
      showEnhancement(true);
      setisMinesource({ ...isMinesource, isrest: true });
    } else if (editdata.Category === "Pearls") {
      setisTypeofgem({ ...isTypeofgem, ispearls: true });
      if (
        editdata.othertypeofgem !== "" &&
        editdata.othertypeofgem === editdata.TypeofGem
      ) {
        setisOthertypeofgem(true);
      }
      setisFormation({ ...isFormation, ispearls: true });
      if (
        editdata.otherformation !== "" &&
        editdata.otherformation === editdata.Formation
      ) {
        setisOtherformation(true);
      }
      setisShape({ ...isShape, ispearls: true });
      if (
        editdata.otherpearlsshape &&
        editdata.otherpearlsshape === editdata.Shape
      ) {
        setisShape({ ...isShape, ispearls: true, isotherpearls: true });
      }
      showColorIntensity(true);
      if (
        editdata.othercolorintensity &&
        editdata.othercolorintensity === editdata.ColorIntensity
      ) {
        setisOthercolorintensity(true);
      }
      setColorCategory({ ...colorCategory, ispearls: true });
      if (editdata.othercolor && editdata.othercolor === editdata.Color) {
        setisColor({ ...isColor, isothercolor: true });
      }
      showEnhancement(true);
      setisMinesource({ ...isMinesource, isrest: true });
    } else if (editdata.Category === "Rough") {
      setisTypeofgem({ ...isTypeofgem, isrough: true });
      if (editdata.roughtypeofgem === "Opals") {
        setisRoughtype({ ...isRoughtype, isopals: true });
        if (
          editdata.otherroughtypeofgem &&
          editdata.selectroughtypeofgem === "Other"
        ) {
          setisRoughtype({ ...isRoughtype, isother: true, isopals: true });
        }
      }
      if (editdata.roughtypeofgem === "Precious Gems") {
        setisRoughtype({ ...isRoughtype, isprecious: true });
        if (
          editdata.otherroughtypeofgem &&
          editdata.selectroughtypeofgem === "Other"
        ) {
          setisRoughtype({ ...isRoughtype, isother: true, isprecious: true });
        }
      }
      if (editdata.roughtypeofgem === "Semi Precious Gems") {
        setisRoughtype({ ...isRoughtype, issemi: true });
        if (
          editdata.otherroughtypeofgem &&
          editdata.selectroughtypeofgem === "Other"
        ) {
          setisRoughtype({ ...isRoughtype, isother: true, issemi: true });
        }
      }
      setisFormation({ ...isFormation, isrest: true });
      if (
        editdata.otherformation !== "" &&
        editdata.otherformation === editdata.Formation
      ) {
        setisOtherformation(true);
      }
      setColorCategory({ ...colorCategory, isrough: true });
      if (editdata.othercolor && editdata.othercolor === editdata.Color) {
        setisColor({ ...isColor, isothercolor: true });
      }
      showColorIntensity(true);
      if (
        editdata.othercolorintensity &&
        editdata.othercolorintensity === editdata.ColorIntensity
      ) {
        setisOthercolorintensity(true);
      }
      showEnhancement(true);
      setisMinesource({ ...isMinesource, isrest: true });
    }

    setState({
      ...state,
      category:
        editdata.othercategory === editdata.Category
          ? "Other"
          : editdata.Category,
      othercategory: editdata.othercategory,
      weight: editdata.Weight,
      width: editdata.Width,
      length: editdata.Length,
      depth: editdata.Depth,
      qualitygrade: editdata.QualityGrade,
      formation:
        editdata.otherformation === editdata.Formation &&
        editdata.Formation !== ""
          ? "Other"
          : editdata.Formation,
      quantity: editdata.Quantity,
      stocknumber: editdata.StockNumber,
      typeofgem:
        editdata.othertypeofgem === editdata.TypeofGem &&
        editdata.TypeofGem !== ""
          ? "Other"
          : editdata.TypeofGem,
      othertypeofgem: editdata.othertypeofgem,
      othercolor: editdata.othercolor,
      otherformation: editdata.otherformation,
      description: editdata.Description,
      clarity:
        editdata.otherclarity === editdata.Clarity && editdata.Clarity !== ""
          ? "Other"
          : editdata.Clarity,
      color:
        editdata.othercolor === editdata.Color && editdata.Color !== ""
          ? "Other"
          : editdata.Color,
      enhancement: editdata.Enhancement,
      pricepercarat: editdata.Pricepercarat,
      priceperpiece: editdata.Priceperpiece,
      totalcost: editdata.TotalCost,
      totalprice: editdata.TotalPrice,
      costpercarat: editdata.Costpercarat,
      costperpiece: editdata.Costperpiece,
      cost : editdata.cost,
      price : editdata.price,
      otherpearlsshape: editdata.otherpearlsshape,
      specificsource: editdata.specificsource,
      minesource: editdata.minesource,
      otherminesource: editdata.otherminesource,
      colorintensity:
        editdata.othercolorintensity === editdata.ColorIntensity &&
        editdata.ColorIntensity !== ""
          ? "Other"
          : editdata.ColorIntensity,
      othercolorintensity: editdata.othercolorintensity,
      otherclarity: editdata.otherclarity,
      listshades: editdata.listshades,
      othershades: editdata.othershades,
      specificshades: editdata.specificshades,
      selectroughtypeofgem: editdata.selectroughtypeofgem,
      shades: editdata.Shades,
      shape: editdata.Shape,
      specifyshape: editdata.specifyshape,
      facetedshape: editdata.facetedshape,
      otherfacetedshape: editdata.otherfacetedshape,
      oldeushape: editdata.oldeushape,
      otheroldeushape: editdata.otheroldeushape,
      fancyshape: editdata.fancyshape,
      roughtypeofgem: editdata.roughtypeofgem,
      otherroughtypeofgem: editdata.otherroughtypeofgem,
      cabochonshape: editdata.cabochonshape,
      othercabochonshape: editdata.othercabochonshape,
      selectminesource: editdata.selectminesource,
    });
  }
  const deleteClick = (e) => {
    setModalClassic(true);
    const rowdata = e.row.data;
    state.ID = rowdata._id;
  };

  function addClick(e) {
    setisEditing(false);
    // setStateToNull();
    setisShape({ faceted: false, oldeuropean: false });
    setisColor({
      colorwhite: false,
      coloryellow: false,
      colorbrown: false,
      isothercolor: false,
    });
    setisOtherformation(false);
    setisOthertypeofgem(false);
    setisOthercategory(false);
    showPopup("Add", {});
  }

  function confirmClick(e) {
    // const data = {
    //   ID: "1",
    //   Weight: weight,
    // };
    // setData([data]);
  }

  const onValueChange = (values, name) => {
    // this.setState({ profit: value });
    const { value } = values;
    setState({ ...state, name: value });
  };

  function cancelClick(e) {
    dispatchPopup({ type: "hidePopup" });
    handleHidePopup();
  }

  function resetScrollPos(selector) {
    var divs = document.querySelectorAll(selector);
    for (var p = 0; p < divs.length; p++) {
      if (Boolean(divs[p].style.transform)) { //for IE(10) and firefox
        divs[p].style.transform = 'translate3d(0px, 0px, 0px)';
      } else { //for chrome and safari
        divs[p].style['-webkit-transform'] = 'translate3d(0px, 0px, 0px)';
      }
    }
  }
  // resetScrollPos('.mblScrollableViewContainer');

  function showPopup(popupMode, data) {
    dispatchPopup({ type: "initPopup", data, popupMode });
    // resetScrollPos('.scroll-top')
    // document.getElementById('scroll-top').scrollIntoView();
  }

  function onHiding() {
    dispatchPopup({ type: "hidePopup" });
    handleHidePopup();
  }

  const handleSubmit = (e) => {
    if (document.getElementById("othertypeofgem")) {
      state.othertypeofgem = document.getElementById("othertypeofgem").value 
    }
    if (document.getElementById("othercategory")) {
      state.othercategory = document.getElementById("othercategory").value 
    }
    if (document.getElementById("otherroughtypeofgem")) {
      state.otherroughtypeofgem = document.getElementById("otherroughtypeofgem").value 
    }
    if (document.getElementById("otherminesource")) {
      state.otherminesource = document.getElementById("otherminesource").value 
    }
    if (document.getElementById("othercolor")) {
      state.othercolor = document.getElementById("othercolor").value 
    }
    if ( document.getElementById("otherformation")) {
      state.otherformation = document.getElementById("otherformation").value 
    }
    if (document.getElementById("othercolorintensity")) {
      state.othercolorintensity = document.getElementById("othercolorintensity").value 
    }
    if (document.getElementById("otherclarity")) {
      state.otherclarity = document.getElementById("otherclarity").value 
    }
    e.preventDefault();
        var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    if (costpercarat && weight) {
      state.totalcost = formatter.format(costpercarat * weight)
    }
    if (pricepercarat && weight) {
      state.totalprice = formatter.format(pricepercarat * weight)
    }
    
    if (state.othercolor) {
      state.shades = "";
    }
    if (state.typeofgem === "Other") {
      state.typeofgem = state.othertypeofgem;
    }
    if (state.otherroughtypeofgem) {
      state.typeofgem = `${state.roughtypeofgem} / ${state.otherroughtypeofgem}`;
    }
    if (
      state.selectroughtypeofgem !== "Other" &&
      state.selectroughtypeofgem !== ""
    ) {
      // state.typeofgem = `${state.roughtypeofgem} / ${state.selectroughtypeofgem}`
      state.typeofgem = state.selectroughtypeofgem;
    }
    if (
      state.selectminesource === "Other" ||
      state.selectminesource === "Cats Eye"
    ) {
      state.minesource = `${state.specificsource} / ${state.otherminesource}`;
    }
    // if (state.minesource === 'Other') {
    //   state.minesource = `${state.specificsource} / ${state.otherminesource}`
    // }
    let req = {
      Category:
        state.category === "Other" ? state.othercategory : state.category,
      TypeofGem: state.typeofgem,
      Formation:
        state.formation === "Other" ? state.otherformation : state.formation,
      Shape: state.shape,
      Weight: state.weight,
      Color: state.color === "Other" ? state.othercolor : state.color,
      Shades: state.shades,
      Clarity: state.clarity === "Other" ? state.otherclarity : state.clarity,
      Length: state.length,
      Width: state.width,
      Depth: state.depth,
      Costperpiece: state.costperpiece,
      cost: state.cost,
      price: state.price,
      Costpercarat: state.costpercarat,
      TotalCost: state.totalcost,
      Priceperpiece: state.priceperpiece,
      Pricepercarat: state.pricepercarat,
      TotalPrice: state.totalprice,
      MineSource: state.minesource,
      Enhancement: state.enhancement,
      QualityGrade: state.qualitygrade,
      Description: document.getElementById("description").innerHTML,
      Quantity: state.quantity,
      StockNumber: state.stocknumber,
      specifyshape: state.specifyshape,
      oldeushape: state.oldeushape,
      facetedshape: state.facetedshape,
      othertypeofgem: state.othertypeofgem,
      othercolor: state.othercolor,
      otherformation: state.otherformation,
      fancyshape: state.fancyshape,
      otherfacetedshape: state.otherfacetedshape,
      otheroldeushape: state.otheroldeushape,
      othercategory: state.othercategory,
      roughtypeofgem: state.roughtypeofgem,
      otherroughtypeofgem: state.otherroughtypeofgem,
      cabochonshape: state.cabochonshape,
      othercabochonshape: state.othercabochonshape,
      otherpearlsshape: state.otherpearlsshape,
      specificsource: state.specificsource,
      otherminesource: state.otherminesource,
      selectminesource: state.selectminesource,
      ColorIntensity:
        state.colorintensity === "Other"
          ? state.othercolorintensity
          : state.colorintensity,
      othercolorintensity: state.othercolorintensity,
      otherclarity: state.otherclarity,
      othershades: state.othershades,
      specificshades: state.specificshades,
      selectroughtypeofgem: state.selectroughtypeofgem,
      listshades: state.listshades,
    };
    if (isEditing) {
      req._id = state.ID;
      Axios.post(`${Constants.serverlink}data`, req,{
        headers : {
          "token" : localStorage.getItem('token')
        }
      }).then(r => callPage())
    } else {
       Axios.post(`${Constants.serverlink}data`, req, {
        headers : {
          "token" : localStorage.getItem('token')
        }
      }).then(r => callPage())
    }
    dispatchPopup({ type: "hidePopup" });
    handleHidePopup();
  };

  const NullifyState = () => {
    setState({
      category: "",
      weight: "",
      typeofgem: "",
      roughtypeofgem: "",
      othertypeofgem: "",
      otherroughtypeofgem: "",
      formation: "",
      otherformation: "",
      shape: "",
      facetedshape: "",
      cabochonshape: "",
      othercabochonshape: "",
      oldeushape: "",
      otherfacetedshape: "",
      otheroldeushape: "",
      specifyshape: "",
      fancyshape: "",
      color: "",
      othercolor: "",
      shades: "",
      clarity: "",
      length: "",
      width: "",
      depth: "",
      costperpiece: "",
      cost: "",
      price: "",
      costpercarat: "",
      totalcost: "",
      priceperpiece: "",
      pricepercarat: "",
      totalprice: "",
      enhancement: "",
      qualitygrade: "",
      description: "",
      quantity: "",
      otherpearlsshape: "",
      specificsource: "",
      minesource: "",
      otherminesource: "",
      selectminesource: "",
      colorintensity: "",
      othercolorintensity: "",
      otherclarity: "",
      listshades: "",
      othershades: "",
      specificshades: "",
      selectroughtypeofgem: "",
      ID: "",
      stocknumber: null,
    });
  };

  const handleHidePopup = (indicator = 0) => {
    setState({
      category: indicator === 1 ? "Other" : "",
      weight: "",
      typeofgem: "",
      roughtypeofgem: "",
      othertypeofgem: "",
      otherroughtypeofgem: "",
      formation: "",
      otherformation: "",
      shape: "",
      facetedshape: "",
      cabochonshape: "",
      othercabochonshape: "",
      oldeushape: "",
      otherfacetedshape: "",
      otheroldeushape: "",
      specifyshape: "",
      fancyshape: "",
      color: "",
      othercolor: "",
      shades: "",
      clarity: "",
      length: "",
      width: "",
      depth: "",
      costperpiece: "",
      cost: "",
      price: "",
      costpercarat: "",
      totalcost: "",
      priceperpiece: "",
      pricepercarat: "",
      totalprice: "",
      enhancement: "",
      qualitygrade: "",
      description: "",
      quantity: "",
      otherpearlsshape: "",
      specificsource: "",
      minesource: "",
      otherminesource: "",
      selectminesource: "",
      colorintensity: "",
      othercolorintensity: "",
      otherclarity: "",
      listshades: "",
      othershades: "",
      specificshades: "",
      selectroughtypeofgem: "",
      ID: "",
      stocknumber: "",
    });
    setisClarity({
      isprecious: false,
      isdiamonds: false,
      isotherprecious: false,
    });
    setisColor({
      colorwhite: false,
      colorbrown: false,
      coloryellow: false,
      isothercolor: false,
    });
    setisShades({
      blue: false,
      tourmaline: false,
      spinel: false,
      zircon: false,
      isothershades: false,
    });
    setColorCategory({
      isdiamonds: false,
      isprecious: false,
      issemiprecious: false,
      isopals: false,
      ispearls: false,
      isrough: false,
    });
    setisTypeofgem({
      isdiamonds: false,
      isprecious: false,
      issemiprecious: false,
      isopals: false,
      ispearls: false,
      isrough: false,
      isroughprecious: false,
      isroughsemiprecious: false,
      isroughopals: false,
    });
    setisShape({
      faceted: false,
      cabochon: false,
      isothercabochon: false,
      oldeuropean: false,
      fancy: false,
      isotherfaceted: false,
      isotheroldeu: false,
      isprecious: false,
      issemiprecious: false,
      isopals: false,
      ispearls: false,
      isdiamonds: false,
      isotherpearls: false,
    });
    setisRoughtype({
      isprecious: false,
      issemi: false,
      isopals: false,
      isother: false,
    });
    setisFormation({ isrest: false, ispearls: false });
    setisMinesource({
      isrest: false,
      isprecious: false,
      issaphire: false,
      isruby: false,
      isalex: false,
      isemerald: false,
      istanzanite: false,
      iscatseye: false,
      isotherminesource: false,
    });
    setCost({perpiece:false,percarat:false})
    setisOthercategory(false);
    setisOthertypeofgem(false);
    setisOtherformation(false);
    setisOthercolorintensity(false);
    showEnhancement(false);
    showColorIntensity(false);
    showShades(false);
    setPricePerCarat(null);
    setCostPerCarat(null);

  };

  const handleDelete = (e) => {
    Axios.post(`${Constants.serverlink}removeGem`, {
      id: state.ID,
    }, {
      headers : {
        "token" : localStorage.getItem('token')
      },
    }).then(r => callPage())
    setModalClassic(false);
  };

  const onCostChange = (e) => {
    state.cost = e.target.value
    if (state.cost === "Per Piece") {
      setCostPerCarat(null)
      state.costpercarat = ""
        setCost({perpiece:true, percarats:false})
    } else if (state.cost === "Per Carats") {
      setCost({perpiece:false, percarats:true})
      state.costperpiece =""
    } else {
      state.costperpiece =""
      state.costpercarat = ""
      setCostPerCarat(null)
      setCost({perpiece:false, percarats:false})
    }
  }

  const onPriceChange = (e) => {
    state.price = e.target.value
    if (state.price === "Per Piece") {
      setPricePerCarat(null)
      state.pricepercarat = ""
        setPrice({perpiece:true, percarats:false})
    } else if (state.price === "Per Carats") {
      state.priceperpiece = ""
      setPrice({perpiece:false, percarats:true})
    } else {
      state.priceperpiece =""
      state.pricepercarat = ""
      setPricePerCarat(null)
      setPrice({perpiece:false, percarats:false})
    }
  }



  return (
    <div style={{padding: '10px'}}>
      <Modal isOpen={modalClassic} toggle={toggleModalClassic}>
        <div className="modal-header justify-content-center">
          <p className="title title-up" style={{ margin: "0" }}>
            Are you sure you want to delete this row
          </p>
        </div>
        <div className="modal-footer-exc">
          <div className="left-side">
            <button onClick={toggleModalClassic}>No</button>
          </div>
          <div className="divider" />
          <div className="right-side">
            <button onClick={handleDelete}>Yes</button>
          </div>
        </div>
      </Modal>
      <DataGrid
        dataSource={data}
        id="grid-container"
        className={"dx-card wide-card .dx-swatch-additional"}
        allowColumnReordering={true}
        allowColumnResizing={true}
        columnAutoWidth={true}
        showColumnLines={true}
        onToolbarPreparing={onToolbarPreparing}
        showRowLines={true}
        showBorders={true}
      >
        <Scrolling columnRenderingMode="virtual" />
        <RemoteOperations groupPaging={true} />
        <Grouping autoExpandAll={true} />
        <GroupPanel visible={true} />
        <Paging defaultPageSize={10} />
        <Export enabled={true}/>
        <Pager
          showPageSizeSelector={true}
          showInfo={true}
          showNavigationButtons={true}
          // displayMode={"full"}
        />
        <HeaderFilter visible={true} />
        <ColumnFixing enabled={true} />
        <FilterRow visible={true} />
        <SearchPanel visible={true} />
        <Editing
          allowUpdating={true}
          allowAdding={location.pathname==='/gems' ? true : false}
          allowDeleting={true}
          useIcons={true}
          mode="popup"
        />
        <Column dataField="Category" caption="Category">
          <RequiredRule />
        </Column>
        <Column dataField="TypeofGem" caption="Type of Gem">
          <RequiredRule />
        </Column>
        <Column dataField="Quantity" dataType={"number"}>
          <RequiredRule />
        </Column>
        <Column dataField="Formation" caption="Formation">
          <RequiredRule />
        </Column>
        <Column dataField="Shape">
          <RequiredRule />
        </Column>
        <Column dataField="MineSource" caption="Mine Source">
          <RequiredRule />
        </Column>
        <Column dataField="Weight" >
          <RequiredRule />
        </Column>
        <Column dataField="Color" caption="Color">
          <RequiredRule />
        </Column>
        <Column dataField="ColorIntensity" caption="Color Intensity">
          <RequiredRule />
        </Column>
        <Column dataField="Shades">
          <RequiredRule />
        </Column>
        <Column dataField="Clarity" caption="Clarity">
          <RequiredRule />
        </Column>
        {/* <Column caption="Dimensions (mm)"> */}
          <Column dataField="Length" caption="Length">
            <RequiredRule />
          </Column>
          <Column dataField="Width" caption="Width">
            <RequiredRule />
          </Column>
          <Column dataField="Depth" caption="Depth">
            <RequiredRule />
          </Column>
        {/* </Column> */}
        <Column
          dataField="Costperpiece"
          caption={"Cost (per piece)"}
        >
          <RequiredRule />
        </Column>
        <Column
          dataField="Costpercarat"
          caption={"Cost (per carat)"}
        >
          <RequiredRule />
        </Column>
        <Column
          dataField="TotalCost"
          caption={"Total Cost"}
        >
          <RequiredRule />
        </Column>
        <Column
          dataField="Priceperpiece"
          caption={"Selling Price (per piece)"}
        >
          <RequiredRule />
        </Column>
        <Column
          dataField="Pricepercarat"
          caption={"Selling Price (per carat)"}
        >
          <RequiredRule />
        </Column>
        <Column
          dataField="TotalPrice"
          caption={"Total Price"}
        >
          <RequiredRule />
        </Column>
        <Column dataField="Enhancement">
          <RequiredRule />
        </Column>
        <Column dataField="QualityGrade" caption="Quality Grade">
          <RequiredRule />
        </Column>
        <Column
          dataField="StockNumber"
          caption={"Stock Number"}
          >
          </Column>
        <Column dataField="Description" width={300}>
          <RequiredRule />
        </Column>
          <RequiredRule />
        <Column type="buttons">
          <Button name="edit" onClick={editClick} />
          <Button name="delete" onClick={deleteClick} />
        </Column>
      </DataGrid>
      <Popup
        title={popupMode}
        closeOnOutsideClick={true}
        visible={popupVisible}
        onHiding={onHiding}
      >
        {/* <ToolbarItem
          widget="dxButton"
          location="after"
          toolbar="bottom"
          options={confirmBtnOptions}
        />
        <ToolbarItem
          widget="dxButton"
          location="after"
          toolbar="bottom"
          options={cancelBtnOptions}
        /> */}
        <ScrollView id="scroll-top" height={'100%'} width={'100%'} useNative={true}>
          <AvForm onSubmit={handleSubmit} id="av-form" method="post">
            <div>
              <div>
                <AvGroup>
                  <AvField
                    label="Cateogry"
                    type="select"
                    name="category"
                    value={state.category}
                    onChange={(e) => onCategoryChange(e)}
                  >
                    <option defaultValue={""}>Select...</option>
                    <option>Diamonds</option>
                    <option>Precious Gems</option>
                    <option>Semi-Precious Gems</option>
                    <option>Opals</option>
                    <option>Pearls</option>
                    <option>Rough</option>
                    <option>Other</option>
                  </AvField>
                </AvGroup>
                {isothercategory && (
                  <AvGroup>
                    <AvField
                      label="Other Category"
                      id="othercategory"
                      name="othercategory"
                      value={state.othercategory}
                      // onChange={(e) =>
                      //   setState({ ...state, othercategory: e.target.value })
                      // }
                    />
                  </AvGroup>
                )}
                {isTypeofgem.isdiamonds && (
                  <AvGroup>
                    <AvField
                      label="Type of Gem"
                      type="select"
                      name="typeofgem"
                      value={state.typeofgem}
                      onChange={(e) => onTypeChange(e)}
                    >
                      <>
                        <option value={""}>Select...</option>
                        <option>Melee (0.15 carat and down)</option>
                        <option>Single (1/4 carat and up)</option>
                        <option>Other</option>
                      </>
                    </AvField>
                  </AvGroup>
                )}
                {isTypeofgem.isprecious && (
                  <AvGroup>
                    <AvField
                      label="Type of Gem"
                      type="select"
                      name="typeofgem"
                      value={state.typeofgem}
                      onChange={(e) => onTypeChange(e)}
                    >
                      <>
                        <option value={""}>Select...</option>
                        <option>Ruby</option>
                        <option>Sapphire</option>
                        <option>Emerald</option>
                        <option>Tanzanite</option>
                        <option>Alexandrite</option>
                        <option>Cats Eye</option>
                        <option>Other</option>
                      </>
                    </AvField>
                  </AvGroup>
                )}
                {isTypeofgem.issemiprecious && (
                  <AvGroup>
                    <AvField
                      label="Type of Gem"
                      type="select"
                      name="typeofgem"
                      value={state.typeofgem}
                      onChange={(e) => onTypeChange(e)}
                    >
                      <>
                        <option value={""}>Select...</option>
                        <option>Amethyst</option>
                        <option>Aquamarine</option>
                        <option>Peridot</option>
                        <option>Topaz</option>
                        <option>Tourmaline</option>
                        <option>Citrine Rhodolite</option>
                        <option>Spinel</option>
                        <option>Chrysoberyl</option>
                        <option>Beryl</option>
                        <option>Quartz</option>
                        <option>Garnet</option>
                        <option>Amber</option>
                        <option>Ametrine</option>
                        <option>Zircon</option>
                        <option>Agate</option>
                        <option>Turquoise</option>
                        <option>Other</option>
                      </>
                    </AvField>
                  </AvGroup>
                )}
                {isTypeofgem.isopals && (
                  <AvGroup>
                    <AvField
                      label="Type of Gem"
                      type="select"
                      name="typeofgem"
                      value={state.typeofgem}
                      onChange={(e) => onTypeChange(e)}
                    >
                      <>
                        <option value={""}>Select...</option>
                        <option>Solid</option>
                        <option>Doublet</option>
                        <option>Triplet</option>
                        <option>Other</option>
                      </>
                    </AvField>
                  </AvGroup>
                )}
                {isTypeofgem.ispearls && (
                  <AvGroup>
                    <AvField
                      label="Type of Gem"
                      type="select"
                      name="typeofgem"
                      value={state.typeofgem}
                      onChange={(e) => onTypeChange(e)}
                    >
                      <>
                        <option value={""}>Select...</option>
                        <option>Fresh-Water</option>
                        <option>Cultured </option>
                        <option>Tahitian</option>
                        <option>Other</option>
                      </>
                    </AvField>
                  </AvGroup>
                )}
                {isTypeofgem.isrough && (
                  <AvRadioGroup
                    inline
                    name="roughtypeofgem"
                    value={state.roughtypeofgem}
                    label={<p style={{fontSize : '15px', marginBottom: '0'}}>Type of Gem</p>}
                    onChange={(e) => onRoughType(e)}
                  >
                    <AvRadio label="Precious Gems" value="Precious Gems" />
                    <AvRadio
                      label="Semi Precious Gems"
                      value="Semi Precious Gems"
                    />
                    <AvRadio label="Opals" value="Opals" />
                  </AvRadioGroup>
                )}

                {isRoughtype.isprecious && (
                  <AvGroup>
                    <AvField
                      label="Rough Precious"
                      type="select"
                      name="selectroughtypeofgem"
                      value={state.selectroughtypeofgem}
                      onChange={(e) => onSelectRoughType(e)}
                    >
                      <>
                        <option value={""}>Select...</option>
                        <option>Ruby</option>
                        <option>Sapphire </option>
                        <option>Emerald</option>
                        <option>Tanzanite</option>
                        <option>Alexandrite</option>
                        <option>Cats Eye</option>
                        <option>Other</option>
                      </>
                    </AvField>
                  </AvGroup>
                )}

                {isRoughtype.issemi && (
                  <AvGroup>
                    <AvField
                      label="Rough Semi Precious"
                      type="select"
                      name="selectroughtypeofgem"
                      value={state.selectroughtypeofgem}
                      onChange={(e) => onSelectRoughType(e)}
                    >
                      <>
                        <option value={""}>Select...</option>
                        <option>Amethyst</option>
                        <option>Aquamarine </option>
                        <option>Peridot</option>
                        <option>Topaz</option>
                        <option>Tourmaline</option>
                        <option>Citrine Rhodolite</option>
                        <option>Spinel</option>
                        <option>Chrysoberyl</option>
                        <option>Beryl</option>
                        <option>Quartz</option>
                        <option>Garnet</option>
                        <option>Amber</option>
                        <option>Ametrine</option>
                        <option>Zircon</option>
                        <option>Agate</option>
                        <option>Turquoise</option>
                        <option>Other</option>
                      </>
                    </AvField>
                  </AvGroup>
                )}

                {isRoughtype.isopals && (
                  <AvGroup>
                    <AvField
                      label="Rough Opals"
                      type="select"
                      name="selectroughtypeofgem"
                      value={state.selectroughtypeofgem}
                      onChange={(e) => onSelectRoughType(e)}
                    >
                      <>
                        <option value={""}>Select...</option>
                        <option>Solid</option>
                        <option>Doublet </option>
                        <option>Triplet</option>
                        <option>Other</option>
                      </>
                    </AvField>
                  </AvGroup>
                )}
                {isRoughtype.isother && (
                  <AvGroup>
                    <AvField
                      label="Other"
                      id="otherroughtypeofgem"
                      name="otherroughtypeofgem"
                      value={state.otherroughtypeofgem}
                      onChange={(e) =>
                        setState({
                          ...state,
                          otherroughtypeofgem: e.target.value,
                        })
                      }
                    />
                  </AvGroup>
                )}
                {isothertypeogem && (
                  <AvGroup>
                    <AvField
                      label="Other Type of Gem"
                      id="othertypeofgem"
                      name="othertypeofgem"
                      value={state.othertypeofgem}
                      // onChange={(e) =>
                      //   setState({ ...state, othertypeofgem: e.target.value })
                      // }
                    />
                  </AvGroup>
                )}
                 <AvGroup>
                 <AvField
                    label="Quantity"
                    id="exampleEmail"
                    name="email"
                    placeholder=""
                    type="number"
                    value={state.quantity}
                    onChange={(e) =>
                      setState({ ...state, quantity: e.target.value })
                    }
                  />
                  </AvGroup>
                {isFormation.isrest && (
                  <AvGroup>
                    <AvField
                      label="Formation"
                      id="exampleEmail"
                      name="formation"
                      type="select"
                      placeholder=""
                      value={state.formation}
                      onChange={(e) => onFormationChange(e)}
                    >
                      <option value={""}>Select...</option>
                      <option>Natural</option>
                      <option>Lab Grown</option>
                      <option>Synthetic</option>
                      <option>Other</option>
                    </AvField>
                  </AvGroup>
                )}
                {isFormation.ispearls && (
                  <AvGroup>
                    <AvField
                      label="Formation"
                      id="exampleEmail"
                      name="formation"
                      type="select"
                      placeholder=""
                      value={state.formation}
                      onChange={(e) => onFormationChange(e)}
                    >
                      <option value={""}>Select...</option>
                      <option>Natural</option>
                      <option>Farm Grown</option>
                      <option>Other</option>
                    </AvField>
                  </AvGroup>
                )}
                {isotherformation && (
                  <AvGroup>
                    <AvField
                      label="Other Formation"
                      id="otherformation"
                      name="otherformation"
                      placeholder=""
                      value={state.otherformation}
                      // onChange={(e) =>
                      //   setState({ ...state, otherformation: e.target.value })
                      // }
                    ></AvField>
                  </AvGroup>
                )}
                {colorCategory.isdiamonds && (
                  <AvGroup>
                    <AvField
                      label="Color"
                      id="exampleEmail"
                      type="select"
                      name="color"
                      placeholder=""
                      value={state.color}
                      onChange={(e) => onColorChange(e)}
                    >
                      <option value={""}>Select...</option>
                      <option>White</option>
                      <option>Black</option>
                      <option>Yellow</option>
                      <option>Brown</option>
                      <option>Other</option>
                    </AvField>
                  </AvGroup>
                )}
                {colorCategory.ispearls && (
                  <AvGroup>
                    <AvField
                      label="Color"
                      id="exampleEmail"
                      type="select"
                      name="color"
                      placeholder=""
                      value={state.color}
                      onChange={(e) => onColorChange(e)}
                    >
                      <option value={""}>Select...</option>
                      <option>White</option>
                      <option>Black</option>
                      <option>Grey</option>
                      <option>Cream</option>
                      <option>Other</option>
                    </AvField>
                  </AvGroup>
                )}

                {colorCategory.isopals && (
                  <AvGroup>
                    <AvField
                      label="Color"
                      id="exampleEmail"
                      type="select"
                      name="color"
                      placeholder=""
                      value={state.color}
                      onChange={(e) => onColorChange(e)}
                    >
                      <option value={""}>Select...</option>
                      <option>White</option>
                      <option>Black</option>
                      <option>Other</option>
                    </AvField>
                  </AvGroup>
                )}
                {colorCategory.isprecious && (
                  <AvGroup>
                    <AvField
                      label="Color"
                      id="exampleEmail"
                      type="select"
                      name="color"
                      placeholder=""
                      value={state.color}
                      onChange={(e) => onColorChange(e)}
                    >
                      <option value={""}>Select...</option>
                      <option disabled>Sapphire List</option>
                      <option>Blue</option>
                      <option>Pink</option>
                      <option>Green</option>
                      <option>Yellow</option>
                      <option>Other</option>
                    </AvField>
                  </AvGroup>
                )}
                {colorCategory.issemiprecious && (
                  <AvGroup>
                    <AvField
                      label="Color"
                      id="exampleEmail"
                      type="select"
                      name="color"
                      placeholder=""
                      value={state.color}
                      onChange={(e) => onColorChange(e)}
                    >
                      <option value={""}>Select...</option>
                      <option disabled>Topaz</option>
                      <option>Blue</option>
                      <option>White</option>
                      <option>Brown</option>
                      <option>Other</option>
                    </AvField>
                  </AvGroup>
                )}
                {isColor.isothercolor && (
                  <AvGroup>
                    <AvField
                      label="Other Color"
                      id="othercolor"
                      name="othercolor"
                      placeholder=""
                      value={state.othercolor}
                      // onChange={(e) =>
                      //   setState({ ...state, othercolor: e.target.value })
                      // }
                    ></AvField>
                  </AvGroup>
                )}
                {isClarity.isdiamonds && (
                  <AvGroup>
                    <AvField
                      label="Clarity"
                      id="exampleEmail"
                      name="clarity"
                      type="select"
                      placeholder=""
                      value={state.clarity}
                      onChange={(e) =>
                        setState({ ...state, clarity: e.target.value })
                      }
                    >
                      <option value="">Select...</option>
                      <option>FL</option>
                      <option>IF</option>
                      <option>VVS1</option>
                      <option>VVS2</option>
                      <option>VS1</option>
                      <option>VS2</option>
                      <option>SI1</option>
                      <option>SI2</option>
                      <option>SI3</option>
                      <option>I1</option>
                      <option>I2</option>
                      <option>I3</option>
                    </AvField>
                  </AvGroup>
                )}
                {isClarity.isprecious && (
                  <AvGroup>
                    <AvField
                      label="Clarity"
                      id="exampleEmail"
                      name="clarity"
                      type="select"
                      placeholder=""
                      value={state.clarity}
                      onChange={(e) => onPreciousClarity(e)}
                    >
                      <option value="">Select...</option>
                      <option> Very very slightly included (VVSI)</option>
                      <option>Very slightly included (VSI)</option>
                      <option>Slightly included (SI)</option>
                      <option>Included (I)</option>
                      <option>Other</option>
                    </AvField>
                  </AvGroup>
                )}
                {isClarity.isotherprecious && (
                  <AvGroup>
                    <AvField
                      label="Other"
                      id="otherclarity"
                      name="otherclarity"
                      placeholder=""
                      value={state.otherclarity}
                      // onChange={(e) =>
                      //   setState({ ...state, otherclarity: e.target.value })
                      // }
                    ></AvField>
                  </AvGroup>
                )}
                {iscolorintensity && (
                  <AvGroup>
                    <AvField
                      label="Color Intensity"
                      id="exampleEmail"
                      name="colorintensity"
                      type="select"
                      placeholder=""
                      value={state.colorintensity}
                      onChange={(e) => onColorIntensity(e)}
                    >
                      <option value="">Select...</option>
                      <option>Very Light</option>
                      <option>Light</option>
                      <option>Medium</option>
                      <option>Intense</option>
                      <option>Other</option>
                    </AvField>
                  </AvGroup>
                )}
                {isothercolorintensity && (
                  <AvGroup>
                    <AvField
                      label="Other Color Intensity"
                      id="othercolorintensity"
                      name="othercolorintensity"
                      placeholder=""
                      value={state.othercolorintensity}
                      // onChange={(e) =>
                      //   setState({
                      //     ...state,
                      //     othercolorintensity: e.target.value,
                      //   })
                      // }
                    />
                  </AvGroup>
                )}
                <AvGroup>
                  <AvField
                    label="Quality Grade"
                    id="exampleEmail"
                    name="qualitygrade"
                    type="select"
                    placeholder=""
                    value={state.qualitygrade}
                    onChange={(e) =>
                      setState({ ...state, qualitygrade: e.target.value })
                    }
                  >
                    <option value={""}>Select...</option>
                    <option>AAAAA untreated heirloom</option>
                    <option>AAAA heirloom</option>
                    <option>AAA excellent</option>
                    <option>AA very good </option>
                    <option>A good</option>
                  </AvField>
                </AvGroup>

                {isColor.colorwhite && (
                  <AvRadioGroup
                    inline
                    name="shades"
                    value={state.shades}
                    label={<p style={{fontSize : '15px', marginBottom: '0'}}>Shades</p>}
                    onChange={(e) =>
                      setState({ ...state, shades: e.target.value })
                    }
                  >
                    <AvRadio label="D" value="D" />
                    <AvRadio label="E" value="E" />
                    <AvRadio label="F" value="F" />
                    <AvRadio label="G" value="G" />
                    <AvRadio label="H" value="H" />
                    <AvRadio label="I" value="I" />
                  </AvRadioGroup>
                )}
                {isColor.coloryellow && (
                  <AvRadioGroup
                    inline
                    name="shades"
                    value={state.shades}
                    label={<p style={{fontSize : '15px', marginBottom: '0'}}>Shades</p>}
                    onChange={(e) =>
                      setState({ ...state, shades: e.target.value })
                    }
                  >
                    <AvRadio label="J" value="J" />
                    <AvRadio label="K" value="K" />
                    <AvRadio label="L" value="L" />
                    <AvRadio label="M" value="M" />
                    <AvRadio label="N" value="N" />
                    <AvRadio label="O" value="O" />
                    <AvRadio label="P" value="P" />
                    <AvRadio label="Q" value="Q" />
                    <AvRadio label="R" value="R" />
                    <AvRadio label="U" value="U" />
                    <AvRadio label="V" value="V" />
                    <AvRadio label="W" value="W" />
                    <AvRadio label="X" value="X" />
                    <AvRadio label="Y" value="Y" />
                    <AvRadio label="Z" value="Z" />
                  </AvRadioGroup>
                )}
                {isColor.colorbrown && (
                  <AvRadioGroup
                    inline
                    name="shades"
                    value={state.shades}
                    label={<p style={{fontSize : '15px', marginBottom: '0'}}>Shades</p>}
                    onChange={(e) =>
                      setState({ ...state, shades: e.target.value })
                    }
                  >
                    <AvRadio label="B" value="B" />
                    <AvRadio label="TLB" value="TLB" />
                    <AvRadio label="TLB1" value="TLB1" />
                    <AvRadio label="TLB2" value="TLB2" />
                    <AvRadio label="TTLB" value="TTLB" />
                    <AvRadio label="TTLB1" value="TTLB1" />
                    <AvRadio label="TTLB2" value="TTLB2" />
                  </AvRadioGroup>
                )}
                {isshades && (
                  <AvRadioGroup
                    inline
                    name="shades"
                    value={state.specificshades}
                    label={<p style={{fontSize : '15px', marginBottom: '0'}}>Shades</p>}
                    onChange={(e) => onShadesChange(e)}
                  >
                    <AvRadio label="Blue" value="Blue" />
                    <AvRadio label="Tourmaline" value="Tourmaline" />
                    <AvRadio label="Spinel" value="Spinel" />
                    <AvRadio label="Zircon" value="Zircon" />
                  </AvRadioGroup>
                )}
                {isShades.blue && (
                  <AvGroup>
                    <AvField
                      label="Blue Shades"
                      id="exampleEmail"
                      name="listshades"
                      type="select"
                      placeholder=""
                      value={state.listshades}
                      onChange={(e) => onSpecificShades(e)}
                    >
                      <option value={""}>Select...</option>
                      <option>London Blue</option>
                      <option>Sky Blue </option>
                      <option>Swiss Blue</option>
                      <option>Aqua Blue </option>
                      <option>Other</option>
                    </AvField>
                  </AvGroup>
                )}
                {isShades.tourmaline && (
                  <AvGroup>
                    <AvField
                      label="Tourmaline Shades"
                      id="exampleEmail"
                      name="listshades"
                      type="select"
                      placeholder=""
                      value={state.listshades}
                      onChange={(e) => onSpecificShades(e)}
                    >
                      <option value={""}>Select...</option>
                      <option>Green</option>
                      <option>Pink</option>
                      <option>Blue</option>
                      <option>Yellow</option>
                      <option>Watermelon</option>
                      <option>Other</option>
                    </AvField>
                  </AvGroup>
                )}
                {isShades.zircon && (
                  <AvGroup>
                    <AvField
                      label="Zircon Shades"
                      id="exampleEmail"
                      name="listshades"
                      type="select"
                      placeholder=""
                      value={state.listshades}
                      onChange={(e) => onSpecificShades(e)}
                    >
                      <option value={""}>Select...</option>
                      <option>Blue</option>
                      <option>Green</option>
                      <option>Red</option>
                      <option>Pink</option>
                      <option>Yellow</option>
                      <option>White</option>
                      <option>Brown</option>
                      <option>Watermelon</option>
                      <option>Other</option>
                    </AvField>
                  </AvGroup>
                )}
                {isShades.spinel && (
                  <AvGroup>
                    <AvField
                      label="Spinel Shades"
                      id="exampleEmail"
                      name="listshades"
                      type="select"
                      placeholder=""
                      value={state.listshades}
                      onChange={(e) => onSpecificShades(e)}
                    >
                      <option value={""}>Select...</option>
                      <option>Red</option>
                      <option>Yellow</option>
                      <option>Other</option>
                    </AvField>
                  </AvGroup>
                )}
                {isShades.isothershades && (
                  <AvGroup>
                    <AvField
                      label="Other Shades"
                      id="othershades"
                      name="othershades"
                      placeholder=""
                      value={state.othershades}
                      onChange={(e) =>
                        setState({
                          ...state,
                          othershades: e.target.value,
                          shades: `${state.specificshades} / ${e.target.value}`,
                        })
                      }
                    ></AvField>
                  </AvGroup>
                )}
              </div>
              <div>
                {isShape.isdiamonds && (
                  <AvGroup>
                    <AvRadioGroup
                      inline
                      name="shape"
                      value={state.specifyshape}
                      label={<p style={{fontSize : '15px', marginBottom: '0'}}>Shape</p>}
                      onChange={(e) => onShapeChange(e)}
                    >
                      <AvRadio label="Faceted" value="Faceted" />
                      <AvRadio label="Old European" value="Old European" />
                      <AvRadio label="Fancy" value="Fancy" />
                    </AvRadioGroup>
                  </AvGroup>
                )}
                {isShape.isprecious && (
                  <AvGroup>
                    <AvRadioGroup
                      inline
                      name="shape"
                      value={state.specifyshape}
                      label={<p style={{fontSize : '15px', marginBottom: '0'}}>Shape</p>}
                      onChange={(e) => onShapeChange(e)}
                    >
                      <AvRadio label="Cabochon" value="Cabochon" />
                      <AvRadio label="Faceted" value="Faceted" />
                      <AvRadio label="Fancy" value="Fancy" />
                    </AvRadioGroup>
                  </AvGroup>
                )}
                {isShape.issemiprecious && (
                  <AvGroup>
                    <AvRadioGroup
                      inline
                      name="shape"
                      value={state.specifyshape}
                      label={<p style={{fontSize : '15px', marginBottom: '0'}}>Shape</p>}
                      onChange={(e) => onShapeChange(e)}
                    >
                      <AvRadio label="Cabochon" value="Cabochon" />
                      <AvRadio label="Faceted" value="Faceted" />
                      <AvRadio label="Fancy" value="Fancy" />
                    </AvRadioGroup>
                  </AvGroup>
                )}
                {isShape.isopals && (
                  <AvGroup>
                    <AvRadioGroup
                      inline
                      name="shape"
                      value={state.specifyshape}
                      label={<p style={{fontSize : '15px', marginBottom: '0'}}>Shape</p>}
                      onChange={(e) => onShapeChange(e)}
                    >
                      <AvRadio label="Cabochon" value="Cabochon" />
                      <AvRadio label="Faceted" value="Faceted" />
                      <AvRadio label="Fancy" value="Fancy" />
                    </AvRadioGroup>
                  </AvGroup>
                )}
                {isShape.ispearls && (
                  <AvGroup>
                    <AvField
                      name="shape"
                      type="select"
                      value={state.specifyshape}
                      label="Shape"
                      onChange={(e) => onShapeChange(e)}
                    >
                      <option value={""}>Select...</option>
                      <option>Round</option>
                      <option>Ovals</option>
                      <option>Tear Drops</option>
                      <option>Other</option>
                    </AvField>
                  </AvGroup>
                )}
                {isShape.isotherpearls && (
                  <AvGroup>
                    <AvField
                      name="otherpearlsshape"
                      value={state.otherpearlsshape}
                      label="Other Shape"
                      onChange={(e) =>
                        setState({
                          ...state,
                          otherpearlsshape: e.target.value,
                          shape: e.target.value,
                        })
                      }
                    ></AvField>
                  </AvGroup>
                )}
                {isShape.cabochon && (
                  <AvGroup>
                    <AvField
                      label="Cabochon Shape"
                      id="exampleEmail"
                      name="cabochonshape"
                      type="select"
                      placeholder=""
                      value={state.cabochonshape}
                      onChange={(e) => onCabochonShape(e)}
                    >
                      <option value={""}>Select...</option>
                      <option>Round</option>
                      <option>Oval</option>
                      <option>Radiant</option>
                      <option>Marquise</option>
                      <option>Square</option>
                      <option>Baguette</option>
                      <option>Pear Shape</option>
                      <option>Emerald Cut</option>
                      <option>Princess</option>
                      <option>Cushion</option>
                      <option>Asscher</option>
                      <option>Heart Shape</option>
                      <option>Checkerboard</option>
                      <option>Other</option>
                    </AvField>
                    {isShape.isothercabochon && (
                      <AvGroup>
                        <AvField
                          label="Other Cabochon Shape"
                          name="othercabochonshape"
                          placeholder=""
                          value={state.othercabochonshape}
                          onChange={(e) =>
                            setState({
                              ...state,
                              othercabochonshape: e.target.value,
                              shape: `Cabochon / ${e.target.value}`,
                            })
                          }
                        ></AvField>
                      </AvGroup>
                    )}
                  </AvGroup>
                )}
                {isShape.faceted && (
                  <AvGroup>
                    <AvField
                      label="Faceted Shape"
                      id="exampleEmail"
                      name="facetedshape"
                      type="select"
                      placeholder=""
                      value={state.facetedshape}
                      onChange={(e) => onFacetedShapeChange(e)}
                    >
                      <option value={""}>Select...</option>
                      <option>Round</option>
                      <option>Oval</option>
                      <option>Radiant</option>
                      <option>Marquise</option>
                      <option>Square</option>
                      <option>Baguette</option>
                      <option>Pear Shape</option>
                      <option>Emerald Cut</option>
                      <option>Princess</option>
                      <option>Cushion</option>
                      <option>Asscher</option>
                      <option>Heart Shape</option>
                      <option>Checkerboard</option>
                      <option>Other</option>
                    </AvField>
                    {isShape.isotherfaceted && (
                      <AvGroup>
                        <AvField
                          label="Other Faceted Shape"
                          name="otherfacetedshape"
                          placeholder=""
                          value={state.otherfacetedshape}
                          onChange={(e) =>
                            setState({
                              ...state,
                              otherfacetedshape: e.target.value,
                              shape: `Faceted / ${e.target.value}`,
                            })
                          }
                        ></AvField>
                      </AvGroup>
                    )}
                  </AvGroup>
                )}
                {isShape.oldeuropean && (
                  <AvGroup>
                    <AvField
                      label="Old European Shape"
                      id="exampleEmail"
                      name="oldeushape"
                      type="select"
                      placeholder=""
                      value={state.oldeushape}
                      onChange={(e) => onOldEuShapeChange(e)}
                    >
                      <option value={""}>Select...</option>
                      <option>Round</option>
                      <option>Oval</option>
                      <option>Radiant</option>
                      <option>Marquise</option>
                      <option>Square</option>
                      <option>Baguette</option>
                      <option>Pear Shape</option>
                      <option>Emerald Cut</option>
                      <option>Princess</option>
                      <option>Cushion</option>
                      <option>Asscher</option>
                      <option>Heart Shape</option>
                      <option>Other</option>
                    </AvField>
                    {isShape.isotheroldeu && (
                      <AvGroup>
                        <AvField
                          label="Other Old European Shape"
                          name="otheroldeushape"
                          placeholder=""
                          value={state.otheroldeushape}
                          onChange={(e) =>
                            setState({
                              ...state,
                              otheroldeushape: e.target.value,
                              shape: `Old European / ${e.target.value}`,
                            })
                          }
                        ></AvField>
                      </AvGroup>
                    )}
                  </AvGroup>
                )}
                {isShape.fancy && (
                  <AvGroup>
                    <AvField
                      label="Fancy Shape"
                      name="fancyshape"
                      placeholder=""
                      value={state.fancyshape}
                      onChange={(e) =>
                        setState({
                          ...state,
                          fancyshape: e.target.value,
                          shape: `Fancy / ${e.target.value}`,
                        })
                      }
                    ></AvField>
                  </AvGroup>
                )}
                {isMinesource.isrest && (
                  <AvGroup>
                    <AvField
                      label="Mine Source"
                      id="exampleEmail"
                      type="text"
                      name="minesource"
                      placeholder=""
                      value={state.minesource}
                      onChange={(e) =>
                        setState({ ...state, minesource: e.target.value })
                      }
                    />
                  </AvGroup>
                )}
                {isMinesource.isprecious && (
                  <AvRadioGroup
                    inline
                    name="specificsource"
                    value={state.specificsource}
                    label={<p style={{fontSize : '15px', marginBottom: '0'}}>Mine Source</p>}
                    onChange={(e) => onMineSourceChange(e)}
                  >
                    <AvRadio label="Sapphire" value="Sapphire" />
                    <AvRadio label="Ruby" value="Ruby" />
                    <AvRadio label="Emerald" value="Emerald" />
                    <AvRadio label="Tanzanite" value="Tanzanite" />
                    <AvRadio label="Alexandrite" value="Alexandrite" />
                    <AvRadio label="Cats Eye" value="Cats Eye" />
                  </AvRadioGroup>
                )}
                {isMinesource.issaphire && (
                  <AvGroup>
                    <AvField
                      label="Sapphire Mine Source"
                      id="exampleEmail"
                      name="selectminesource"
                      type="select"
                      placeholder=""
                      value={state.selectminesource}
                      onChange={(e) => onSaphireSourceChange(e)}
                    >
                      <option value={""}>Select...</option>
                      <option>Australian</option>
                      <option>Ceylon</option>
                      <option>Kashmir</option>
                      <option>Cambodia</option>
                      <option>Madagascar</option>
                      <option>Other</option>
                    </AvField>
                  </AvGroup>
                )}

                {isMinesource.isruby && (
                  <AvGroup>
                    <AvField
                      label="Ruby Mine Source"
                      id="exampleEmail"
                      name="selectminesource"
                      type="select"
                      placeholder=""
                      value={state.selectminesource}
                      onChange={(e) => onRubySourceChange(e)}
                    >
                      <option value={""}>Select...</option>
                      <option>Burmese</option>
                      <option>Thai</option>
                      <option>African</option>
                      <option>Other</option>
                    </AvField>
                  </AvGroup>
                )}

                {isMinesource.isemerald && (
                  <AvGroup>
                    <AvField
                      label="Emerald Mine Source"
                      id="exampleEmail"
                      name="selectminesource"
                      type="select"
                      placeholder=""
                      value={state.selectminesource}
                      onChange={(e) => onEmeraldSourceChange(e)}
                    >
                      <option value={""}>Select...</option>
                      <option>Emerald</option>
                      <option>Brazilian</option>
                      <option>Colombian</option>
                      <option>Zambian</option>
                      <option>Other</option>
                    </AvField>
                  </AvGroup>
                )}

                {isMinesource.istanzanite && (
                  <AvGroup>
                    <AvField
                      label="Tanzanite Mine Source"
                      id="exampleEmail"
                      name="selectminesource"
                      type="select"
                      placeholder=""
                      value={state.selectminesource}
                      onChange={(e) => onTanzaniteSourceChange(e)}
                    >
                      <option value={""}>Select...</option>
                      <option>Tanzania</option>
                      <option>Other</option>
                    </AvField>
                  </AvGroup>
                )}

                {isMinesource.isalex && (
                  <AvGroup>
                    <AvField
                      label="Alexandrite Mine Source"
                      id="exampleEmail"
                      name="selectminesource"
                      type="select"
                      placeholder=""
                      value={state.selectminesource}
                      onChange={(e) => onAlexSourceChange(e)}
                    >
                      <option value={""}>Select...</option>
                      <option>Russia</option>
                      <option>Brazil</option>
                      <option>Sri Lanka</option>
                      <option>East Africa</option>
                      <option>Other</option>
                    </AvField>
                  </AvGroup>
                )}
                {isMinesource.isotherminesource && (
                  <AvGroup>
                    <AvGroup>
                      <AvField
                        label="Other"
                        name="otherminesource"
                        placeholder=""
                        value={state.otherminesource}
                        onChange={(e) =>
                          setState({
                            ...state,
                            otherminesource: e.target.value,
                            minesource: `${state.specificsource} / ${e.target.value}`,
                          })
                        }
                      ></AvField>
                    </AvGroup>
                  </AvGroup>
                )}

                {isMinesource.iscatseye && (
                  <AvGroup>
                    <AvGroup>
                      <AvField
                        label="Cats Eye"
                        name="otherminesource"
                        placeholder=""
                        value={state.otherminesource}
                        onChange={(e) =>
                          setState({
                            ...state,
                            otherminesource: e.target.value,
                            minesource: `${state.specificsource} / ${e.target.value}`,
                          })
                        }
                      ></AvField>
                    </AvGroup>
                  </AvGroup>
                )}

                <div style={{marginBottom:'17.5px'}}>
                   <Label>Weight</Label>
                    <NumberFormat
                      value={state.weight}
                      thousandSeparator={true}
                      decimalSeparator="00"
                      placeholder={`${isTypeofgem.isrough? "(grams)" : "(carats)"}`}
                      suffix={`${isTypeofgem.isrough? " grams" : " carats"}`}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      decimalSeparator={'.'}
                      onValueChange={(values) => {
                        const { formattedValue,floatValue } = values;
                        setWeight(floatValue)
                        setState({ ...state, weight: formattedValue });
                      }}
                      className="form-controller"
                    />
                  </div>

                {isenhancement && (
                  <AvGroup>
                    <AvField
                      label="Enhancement"
                      id="exampleEmail"
                      name="enhancement"
                      type="select"
                      placeholder=""
                      value={state.enhancement}
                      onChange={(e) =>
                        setState({ ...state, enhancement: e.target.value })
                      }
                    >
                      <option value={""}>Select...</option>
                      <option>Treated</option>
                      <option>Untreated</option>
                    </AvField>
                  </AvGroup>
                )}
                <hr/>
                <AvGroup>
                    <AvField
                      label="Cost"
                      id="exampleEmail"
                      name="cost"
                      type="select"
                      placeholder=""
                      value={state.cost}
                      onChange={(e) =>
                        onCostChange(e)
                      }
                    >
                      <option value={""}>Select...</option>
                      <option>Per Piece</option>
                      <option>Per Carats</option>
                    </AvField>
                  </AvGroup>
                  {cost.perpiece && (
                    <AvGroup>
                    <div>
                      <Label>Cost (per piece)</Label>
                      <NumberFormat
                        value={state.costperpiece}
                        thousandSeparator={true}
                        prefix={"$"}
                        decimalScale={2}
                      fixedDecimalScale={true}
                      decimalSeparator={'.'}
                        onValueChange={(values) => {
                          const { formattedValue } = values;
                          setState({ ...state, costperpiece: formattedValue });
                        }}
                        className="form-controller"
                      />
                    </div>
                    </AvGroup>
                  )}

                {cost.percarats && (
                    <AvGroup>
                    <div>
                      <Label>Cost (per carats)</Label>
                      <NumberFormat
                        value={state.costpercarat}
                        thousandSeparator={true}
                        prefix={"$"}
                        decimalScale={2}
                      fixedDecimalScale={true}
                      decimalSeparator={'.'}
                        onValueChange={(values) => {
                          const { formattedValue,floatValue } = values;
                          setCostPerCarat(floatValue)
                          setState({ ...state, costpercarat: formattedValue });
                        }}
                        className="form-controller"
                      />
                    </div>
                    </AvGroup>
                  )}

{cost.perpiece && (
                  <AvGroup>
                  <div>
                    <Label>Total Cost</Label>
                    <NumberFormat
                      value={state.totalcost}
                      thousandSeparator={true}
                      prefix={"$"}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      decimalSeparator={'.'}
                      onValueChange={(values) => {
                        const { formattedValue } = values;
                        setState({ ...state, totalcost: formattedValue });
                        // onTotalCostChange(formattedValue)
                      }}
                      className="form-controller"
                    />
                  </div>
                  </AvGroup>
                )}

                  <AvGroup>
                    <AvField
                      label="Selling Price"
                      id="exampleEmail"
                      name="price"
                      type="select"
                      placeholder=""
                      value={state.price}
                      onChange={(e) =>
                        onPriceChange(e)
                      }
                    >
                      <option value={""}>Select...</option>
                      <option>Per Piece</option>
                      <option>Per Carats</option>
                    </AvField>
                  </AvGroup>


{price.perpiece && (
                    <AvGroup>
                    <div>
                      <Label>Selling Price (per piece)</Label>
                      <NumberFormat
                        value={state.priceperpiece}
                        thousandSeparator={true}
                        prefix={"$"}
                        decimalScale={2}
                      fixedDecimalScale={true}
                      decimalSeparator={'.'}
                        onValueChange={(values) => {
                          const { formattedValue } = values;
                          setState({ ...state, priceperpiece: formattedValue });
                        }}
                        className="form-controller"
                      />
                    </div>
                    </AvGroup>
                  )}

                {price.percarats && (
                    <AvGroup>
                    <div>
                      <Label>Selling Price (per carats)</Label>
                      <NumberFormat
                        value={state.pricepercarat}
                        thousandSeparator={true}
                        prefix={"$"}
                        decimalScale={2}
                      fixedDecimalScale={true}
                      decimalSeparator={'.'}
                        onValueChange={(values) => {
                          const { formattedValue,floatValue } = values;
                          setPricePerCarat(floatValue)
                          setState({ ...state, pricepercarat: formattedValue });
                        }}
                        className="form-controller"
                      />
                    </div>
                    </AvGroup>
                  )}



                
               {price.perpiece && (
                  <AvGroup>
                  <div>
                    <Label>Total Price</Label>
                    <NumberFormat
                      value={state.totalprice}
                      thousandSeparator={true}
                      prefix={"$"}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      decimalSeparator={'.'}
                      onValueChange={(values) => {
                        const { formattedValue } = values;
                        setState({ ...state, totalprice: formattedValue });
                      }}
                      className="form-controller"
                    />
                  </div>
                </AvGroup>
               )}
                <hr/>
               

                 
                  <div style={{display:'grid', gridTemplateColumns:'auto auto auto', gridGap : '20px'}}>
                  <div style={{marginBottom:'17.5px'}}>
                    <Label>Length</Label>
                    <NumberFormat
                      value={state.length}
                      thousandSeparator={true}
                      decimalSeparator="00"
                      suffix={" mm"}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      decimalSeparator={'.'}
                      onValueChange={(values) => {
                        const { formattedValue } = values;
                        setState({ ...state, length: formattedValue });
                      }}
                      className="form-controller"
                    />
                  </div>

                <div style={{marginBottom:'17.5px'}}>
                    <Label>Width</Label>
                    <NumberFormat
                      value={state.width}
                      thousandSeparator={true}
                      suffix={" mm"}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      decimalSeparator={'.'}
                      onValueChange={(values) => {
                        const { formattedValue } = values;
                        setState({ ...state, width: formattedValue });
                      }}
                      className="form-controller"
                    />
                  </div>
                  <div style={{marginBottom:'17.5px'}}>
                    <Label>Depth</Label>
                    <NumberFormat
                      value={state.depth}
                      thousandSeparator={true}
                      decimalSeparator="00"
                      suffix={" mm"}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      decimalSeparator={'.'}
                      onValueChange={(values) => {
                        const { formattedValue } = values;
                        setState({ ...state, depth: formattedValue });
                      }}
                      className="form-controller"
                    />
                  </div>
                  </div>
              
                  <AvField
                    label="Stock Number"
                    id="exampleEmail"
                    name="email"
                    placeholder=""
                    value={state.stocknumber}
                    onChange={(e) =>
                      setState({ ...state, stocknumber: e.target.value })
                    }
                  />
                <AvGroup>
                  <AvField
                    label="Description"
                    id="description"
                    name="email"
                    type="textarea"
                    placeholder=""
                    value={state.description}
                  />
                </AvGroup>
              </div>
            </div>
          </AvForm>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex" }}>
              <button
                type="submit"
                className="avform-button-submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="avform-button-cancel"
                onClick={() => {
                  dispatchPopup({ type: "hidePopup" });
                  // document.getElementById('scroll-top').scrollTop = 0
                  // window.scroll(0, 0);
                  handleHidePopup();
                }}
              >
                Cancel
              </button>
            </div>
            <button
              className="avform-button-reset-form"
              onClick={() => {
                handleHidePopup();
              }}
            >
              Reset Form
            </button>
          </div>
        </ScrollView>
      </Popup>
    </div>
  );
}

export default Gems;

function popupReducer(state, action) {
  switch (action.type) {
    case "initPopup":
      return {
        formData: action.data,
        popupVisible: true,
        popupMode: action.popupMode,
      };
    case "hidePopup":
      return {
        popupVisible: false,
      };
    default:
      break;
  }
}
