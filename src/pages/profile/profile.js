import React, { useState , useEffect} from 'react';
import './profile.scss';
import {
  AvField,
  AvForm,
} from "availity-reactstrap-validation";
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col, Button
} from "reactstrap";
import  Axios  from 'axios';
import Constants from '../../core/serverurl';
import { useNavigation } from '../../contexts/navigation';

export default function Profile() {
  const [foldername, setFolderName] = useState()
  const [filename, setFileName] = useState()
  const [errorMessage, setError] = useState("")
  const {normalizePath} = useNavigation() 

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError("");
    }, 3000);
    return () => clearTimeout(timeout);
  }, [errorMessage]);

  const createFolder = () => {
    if (!(foldername && filename)) {
      return alert("Please fill out the form")
    }
    Axios.post(`${Constants.serverlink}folder/createupdate`, {
      text : foldername.trim(),
      filename : filename.trim()
  }, {
    headers : {
      "token" : localStorage.getItem('token')
    }
  }).then((response) => {
    if (response.data.message) {
      return setError(response.data.message)
    }
    normalizePath()
  });
  }

  return (
    <>
    <div className="content english">

        <h4></h4>
        <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle>Create Folder</CardTitle>
                </CardHeader>
                <CardBody>
                <div style={{paddingLeft:'50px',paddingRight:'50px'}}>
               <AvForm
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
                <Button onClick={() => createFolder()}>Save</Button>
          </AvForm>

               </div>
                </CardBody>
              </Card>
            </Col>
        </Row>
    </div>
</>
  );
}

