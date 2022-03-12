import React, { useEffect, useState } from "react";
import {
  AvField,
  AvForm,
} from "availity-reactstrap-validation";
// reactstrap components
import {
  Row,
  Col,
  Button,
} from "reactstrap";
import Axios from "axios";
import Constants from "../../core/serverurl";
import { useNavigation } from "../../contexts/navigation";
import { Accordion, TreeView } from "devextreme-react";

const FileContainer = ({data}) => {
  const [foldername, setFolderName] = useState();
  const [errorMessage, setError] = useState("")
  const [filename, setFileName] = useState("")
  const [files, setFiles] = useState([])
  const { setVisibility }  = useNavigation()

  const saveToFolder = () => {
    Axios.post(`${Constants.serverlink}gems/folder`, {
        folderName : foldername,
        data : data,
        filename : `/${filename.split(" ").join("").toLowerCase()}`
    } , {
      headers: {
        token: localStorage.getItem("token"),
      },
    }).then((response) => {
      if (response.data.message) {
       return setError(response.data.message)
      }
      setVisibility(false)
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError("");
    }, 3000);
    return () => clearTimeout(timeout);
  }, [errorMessage]);

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
      // let arr = response.data 
      // console.log(arr);
      // arr.map((e) => {
      //   if (e.text) {
      //     e.title = e.text 
      //   }
      // })
      setFiles(response.data)
    }
  }

  const selectedItemChanged = (e) => {
    console.log(e);
    if (e.itemData.path) {
      Axios.post(`${Constants.serverlink}gems/folder`, {
        folderName : e.node.parent.text,
        data : data,
        filename : e.itemData.path
    } , {
      headers: {
        token: localStorage.getItem("token"),
      },
    }).then((response) => {
      if (response.data.message) {
       return setError(response.data.message)
      }
      setVisibility(false)
    });
    }
  }

  return (
      <Row>
        <Col md="12">
          <AvForm
            // onSubmit={() => handleValidSubmit()}
            className="form-horizontal"
            id="TypeValidation"
          >
            {errorMessage && <p style={{margin:'0 10 0 10'}}>{errorMessage}</p>}
             <TreeView
          // ref={treeViewRef}
          items={files}
          keyExpr={'path'}
          selectionMode={'single'}
          focusStateEnabled={false}
          expandEvent={'click'}
          onItemClick={selectedItemChanged}
          // onContentReady={onMenuReady}
          // searchEnabled={true}
          width={'100%'}
        />
                {/* <AvField
                  label="Folder Name"
                  id="foldername"
                  name="foldername"
                  value={foldername}
                  onChange={(e) => setFolderName(e.target.value)}
                />

                <AvField
                  label="File Name"
                  id="filename"
                  name="filename"
                  value={filename}
                  onChange={(e) => setFileName(e.target.value)}
                /> */}
                

                
             

                
          </AvForm>
        </Col>
      </Row>
  );
};

export default FileContainer;
