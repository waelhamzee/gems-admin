import React, { useState, useEffect } from "react";
import "../profile/profile.scss";
import { AvField, AvForm, AvGroup } from "availity-reactstrap-validation";
// reactstrap components
import { Row, Col, Button } from "reactstrap";
import Axios from "axios";
import Constants from "../../core/serverurl";
import { useNavigation } from "../../contexts/navigation";
import { Popup, ScrollView } from "devextreme-react";
import { AiFillEdit, AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

export default function CreateFolders() {
  const [foldername, setFolderName] = useState();
  const [filename, setFileName] = useState();
  const [errorMessage, setError] = useState("");
  const [visible1, setVisibile1] = useState(false);
  const [visible2, setVisibile2] = useState(false);
  const [visible3, setVisibile3] = useState(false);
  const [visible4, setVisibile4] = useState(false);
  const [visible5, setVisibile5] = useState(false);
  const [visible6, setVisibile6] = useState(false);
  const [newnav, setNewNav] = useState([]);
  const [previousname, setPreviousName] = useState("");
  const [id, setID] = useState("");
  // const { navigation } = useNavigation();
  const [files,setFiles] = useState([])
  // navigation.unshift()

  useEffect(() => {
    renderAccordion()
  },[])

  const renderAccordion = async  () => {
    const response = await  Axios.get(`${Constants.serverlink}folder/list`,{
      headers : {
        "token" : localStorage.getItem('token')
      }
    })
    if (response.data.length>0) {
      setFiles(response.data)
    }
  }
  

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError("");
    }, 3000);
    return () => clearTimeout(timeout);
  }, [errorMessage]);

  const addFile = () => {
    if (!filename) {
      return alert("Please fill out the form");
    }
    Axios.post(
      `${Constants.serverlink}file/createupdate`,
      {
        id: id,
        filename: filename.trim(),
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    ).then((response) => {
      if (response.data.message) {
        return setError(response.data.message);
      }
      setVisibile1(false);
      document.location.reload();
    });
  };

  const deleteFile = () => {
    Axios.post(
      `${Constants.serverlink}file/delete`,
      {
        id: id,
        filename: filename,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    ).then((response) => {
      if (response.data.message) {
        return setError(response.data.message);
      }
      setVisibile6(false);
      document.location.reload();
    });
  };

  const deleteFolder = () => {
    Axios.post(
      `${Constants.serverlink}folder/delete`,
      {
        id: id,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    ).then((response) => {
      if (response.data.message) {
        return setError(response.data.message);
      }
      setVisibile5(false);
      document.location.reload();
    });
  };

  const addFolder = () => {
    if (!foldername) {
      return alert("Please fill out the form");
    }
    Axios.post(
      `${Constants.serverlink}folder/createupdate`,
      {
        text: foldername.trim(),
        // filename : filename.trim()
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    ).then((response) => {
      if (response.data.message) {
        return setError(response.data.message);
      }
      setVisibile2(false);
      document.location.reload();
    });
  };

  const renameFolder = () => {
    if (!foldername) {
      return alert("Please fill out the form");
    }
    Axios.post(
      `${Constants.serverlink}folder/rename`,
      {
        text: foldername.trim(),
        id: id,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    ).then((response) => {
      if (response.data.message) {
        return setError(response.data.message);
      }
      setVisibile3(false);
      document.location.reload();
    });
  };

  const renameFile = () => {
    if (!filename) {
      return alert("Please fill out the form");
    }
    Axios.post(
      `${Constants.serverlink}file/rename`,
      {
        newname: filename.trim(),
        id: id,
        previousname: previousname,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    ).then((response) => {
      if (response.data.message) {
        return setError(response.data.message);
      }
      setVisibile4(false);
      document.location.reload();
    });
  };

  return (
    <>
      <div className="content english">
        <h4></h4>
        <Row>
          <Col md="12">
            <div style={{ marginLeft: "20px" }}>
              <Popup
                height={"auto"}
                width={"auto"}
                title={"Add File"}
                closeOnOutsideClick={true}
                visible={visible1}
                onHiding={() => setVisibile1(false)}
              >
                <ScrollView
                  id="scroll-top"
                  height={"100%"}
                  width={"100%"}
                  useNative={true}
                >
                  {/* <AvGroup> */}
                  <AvForm>
                    <AvField
                      label="File Name"
                      id="exampleEmail"
                      type="text"
                      name="filename"
                      placeholder="Enter file name ..."
                      value={filename}
                      onChange={(e) => setFileName(e.target.value)}
                    />
                  </AvForm>
                  {/* </AvGroup> */}
                  <Button
                    style={{ marginRight: "10px" }}
                    onClick={() => addFile()}
                  >
                    Add
                  </Button>
                  <Button onClick={() => setVisibile1(false)}>Cancel</Button>
                </ScrollView>
              </Popup>
              <Popup
                height={"auto"}
                width={"auto"}
                title={"Rename File"}
                closeOnOutsideClick={true}
                visible={visible3}
                onHiding={() => setVisibile3(false)}
              >
                <ScrollView
                  id="scroll-top"
                  height={"100%"}
                  width={"100%"}
                  useNative={true}
                >
                  {/* <AvGroup> */}
                  <AvForm>
                    <AvField
                      label="File Name"
                      id="exampleEmail"
                      type="text"
                      name="filename"
                      placeholder="Rename file ..."
                      value={filename}
                      onChange={(e) => setFileName(e.target.value)}
                    />
                  </AvForm>
                  {/* </AvGroup> */}
                  <Button
                    style={{ marginRight: "10px" }}
                    onClick={() => renameFile()}
                  >
                    Rename
                  </Button>
                  <Button onClick={() => setVisibile3(false)}>Cancel</Button>
                </ScrollView>
              </Popup>
              <Popup
                height={"auto"}
                width={"auto"}
                title={"Rename Folder"}
                closeOnOutsideClick={true}
                visible={visible4}
                onHiding={() => setVisibile4(false)}
              >
                <ScrollView
                  id="scroll-top"
                  height={"100%"}
                  width={"100%"}
                  useNative={true}
                >
                  {/* <AvGroup> */}
                  <AvForm>
                    <AvField
                      label="Folder Name"
                      id="exampleEmail"
                      type="text"
                      name="foldername"
                      placeholder="Rename folder ..."
                      value={foldername}
                      onChange={(e) => setFolderName(e.target.value)}
                    />
                  </AvForm>
                  {/* </AvGroup> */}
                  <Button
                    style={{ marginRight: "10px" }}
                    onClick={() => renameFolder()}
                  >
                    Rename
                  </Button>
                  <Button onClick={() => setVisibile4(false)}>Cancel</Button>
                </ScrollView>
              </Popup>
              <Popup
                height={"auto"}
                width={"auto"}
                title={"Add Folder"}
                closeOnOutsideClick={true}
                visible={visible2}
                onHiding={() => setVisibile2(false)}
              >
                <ScrollView
                  id="scroll-top"
                  height={"100%"}
                  width={"100%"}
                  useNative={true}
                >
                  {/* <AvGroup> */}
                  <AvForm>
                    <AvField
                      label="Folder Name"
                      id="exampleEmail"
                      type="text"
                      name="foldername"
                      placeholder="Enter folder name ..."
                      value={foldername}
                      onChange={(e) => setFolderName(e.target.value)}
                    />
                  </AvForm>
                  {/* </AvGroup> */}
                  <Button
                    style={{ marginRight: "10px" }}
                    onClick={() => addFolder()}
                  >
                    Add
                  </Button>
                  <Button onClick={() => setVisibile2(false)}>Cancel</Button>
                </ScrollView>
              </Popup>
              <Popup
                height={"auto"}
                width={"auto"}
                title={"Delete File"}
                closeOnOutsideClick={true}
                visible={visible6}
                onHiding={() => setVisibile6(false)}
              >
                <ScrollView
                  id="scroll-top"
                  height={"100%"}
                  width={"100%"}
                  useNative={true}
                >
                  {/* <AvGroup> */}
                  <p>Are you sure you want to delete</p>
                  {/* </AvGroup> */}
                  <Button
                    style={{ marginRight: "10px" }}
                    onClick={() => deleteFile()}
                  >
                    Yes
                  </Button>
                  <Button onClick={() => setVisibile6(false)}>No</Button>
                </ScrollView>
              </Popup>
              <Popup
                height={"auto"}
                width={"auto"}
                title={"Delete Folder"}
                closeOnOutsideClick={true}
                visible={visible5}
                onHiding={() => setVisibile5(false)}
              >
                <ScrollView
                  id="scroll-top"
                  height={"100%"}
                  width={"100%"}
                  useNative={true}
                >
                  {/* <AvGroup> */}
                  <p>Are you sure you want to delete</p>
                  {/* </AvGroup> */}
                  <Button
                    style={{ marginRight: "10px" }}
                    onClick={() => deleteFolder()}
                  >
                    Yes
                  </Button>
                  <Button onClick={() => {
                    setVisibile5(false)
                    setFileName("")
                  }}>No</Button>
                </ScrollView>
              </Popup>
              <Accordion allowMultipleExpanded>  
                {(files.map((item, index) => (
                  <div style={{ display: "flex" }}>
                    <AccordionItem style={{ width: "100%" }} key={index}>
                      <AccordionItemHeading>
                        <AccordionItemButton>{item.text}</AccordionItemButton>
                      </AccordionItemHeading>
                      {item.items.map((i) => {
                        return (
                          <AccordionItemPanel>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <span>{i.text}</span>
                              <div>
                                <button
                                  className="second-one"
                                  onClick={() => {
                                    setVisibile3(true);
                                    setPreviousName(i.text);
                                    setID(item._id);
                                  }}
                                >
                                  <AiFillEdit  style={{fill : '#03a9f4'}} />
                                </button>
                                <button
                                  className="second-one"
                                  onClick={() => {
                                    setVisibile6(true);
                                    setID(item._id);
                                    setFileName(i.text);
                                  }}
                                >
                                  <AiFillDelete  style={{fill : '#03a9f4'}}/>
                                </button>
                              </div>
                            </div>
                          </AccordionItemPanel>
                        );
                      })}
                      <AccordionItemPanel>
                      <button
                      // className="second-one"
                      style={{background:'transparent', border:'none', paddingLeft:'0'}}
                      // style={{paddingLeft:'0'}}
                        onClick={() => {
                          setVisibile1(true);
                          setID(item._id);
                        }}
                      >
                        <AiOutlinePlus  /> New File
                      </button>
                      </AccordionItemPanel>
                    </AccordionItem>
                    <div style={{ width:'min-content' }}>
                      <button
                        className="second-one"
                        onClick={() => {
                          setVisibile4(true);
                          setID(item._id);
                        }}
                      >
                        <AiFillEdit  style={{fill : '#03a9f4'}}/>
                      </button>
                      <button
                        className="second-one"
                        style={{marginTop:'5px'}}
                        onClick={() => {
                          setVisibile5(true);
                          setID(item._id);
                        }}
                      >
                        <AiFillDelete style={{fill : '#03a9f4'}} />
                      </button>
                    </div>
                  </div>
                )))}
                <div style={{ padding: "10px", background: "#f4f4f4" }}>
                  <button
                    className="second-one"
                    onClick={() => setVisibile2(true)}
                  >
                    <AiOutlinePlus  /> New Folder
                  </button>
                </div>
              </Accordion>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

const colCountByScreen = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
};
