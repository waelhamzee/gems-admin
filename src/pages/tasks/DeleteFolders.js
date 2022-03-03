import React, { useState , useEffect} from 'react';
import '../profile/profile.scss';
import {
  AvField,
  AvForm,
} from "availity-reactstrap-validation";
// reactstrap components
import {
    Row,
    Col, Button
} from "reactstrap";
import  Axios  from 'axios';
import Constants from '../../core/serverurl';
import { useNavigation } from '../../contexts/navigation';

export default function DeleteFolders() {
  const [foldername, setFolderName] = useState()
  const [errorMessage, setError] = useState("")
  const {normalizePath,setPopupVisible4} = useNavigation() 


  const delteFolder = () => {
    Axios.get(`${Constants.serverlink}folder/delete/${foldername}`,{
    headers : {
      "token" : localStorage.getItem('token')
    }
  }).then((response) => {
    if (response.data.message) {
      return setError(response.data.message)
    }
    setPopupVisible4(false)
    setFolderName("")
    normalizePath()
  });
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError("");
    }, 3000);
    return () => clearTimeout(timeout);
  }, [errorMessage]);

 

  return (
    <>
    <div className="content english">

        <h4></h4>
        <Row>
            <Col md="12">
                <div>
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
                {errorMessage && <p style={{margin:'0 10 0 10'}}>{errorMessage}</p>}
                <Button onClick={() => delteFolder()}>Delete</Button>
                <Button style={{marginLeft:'10px'}} onClick={() => setPopupVisible4(false)}>Cancel</Button>
          </AvForm>

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
  lg: 4
};
