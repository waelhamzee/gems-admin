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

const FileContainer = ({data}) => {
  const [foldername, setFolderName] = useState();
  const [errorMessage, setError] = useState("")
  const [filename, setFileName] = useState("")
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

  return (
      <Row>
        <Col md="12">
          <AvForm
            // onSubmit={() => handleValidSubmit()}
            className="form-horizontal"
            id="TypeValidation"
          >
           
                <AvField
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
                />

                
             

                {errorMessage && <p style={{margin:'0 10 0 10'}}>{errorMessage}</p>}
                <Button onClick={() => saveToFolder()}>Save</Button>
          </AvForm>
        </Col>
      </Row>
  );
};

export default FileContainer;
