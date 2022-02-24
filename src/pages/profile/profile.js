import React, { useState } from 'react';
import './profile.scss';
import Form from 'devextreme-react/form';
import {
  AvField,
  AvForm,
  AvGroup,
  AvRadioGroup,
  AvRadio,
} from "availity-reactstrap-validation";
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col, Modal, Button
} from "reactstrap";
import  Axios  from 'axios';
import Constants from '../../core/serverurl';

export default function Profile() {
  const [foldername, setFolderName] = useState()
  const [filename, setFileName] = useState()
  const [fileCounter, setFileCounter] = useState([])
  const [folderdelete, setFolderDelete] = useState()

  const handleValidSubmit = () => {
    if (!(filename && foldername)) {
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
      return alert(response.data.message)
    }
    document.location.reload()
  });
  }

  const delteFolder = () => {
    Axios.get(`${Constants.serverlink}folder/delete/${folderdelete}`,{
    headers : {
      "token" : localStorage.getItem('token')
    }
  }).then((response) => {
    if (response.data.message) {
      return alert(response.data.message)
    }
    document.location.reload()
  });
  }

  return (
    <>
    <div className="content english">

        <h4></h4>
        <Row>
            <Col md="12">

                <AvForm  onSubmit={() => handleValidSubmit()}  className="form-horizontal" id="TypeValidation">
                    <Card>
                        <CardBody>
                          <p style={{fontSize:'20px', textDecoration:'underline',color:'grey'}}>Create or Edit Folders</p>
                                    <AvField
                                      label="Folder Name"
                                      id="foldername"
                                      name="foldername"
                                      value={foldername}
                                      onChange={(e) => setFolderName(e.target.value)}
                                    />

                                        <AvField  
                                      label="Category Name"
                                      id="filename"
                                      name="filename"
                                      value={filename}
                                      onChange={(e) => setFileName(e.target.value)}
                                    />
                    </CardBody>

                        <CardFooter className="text-center">
                            {/* <ButtonLoader color="primary" loading={loading}>Save</ButtonLoader> */}
                            <Button>Save</Button>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardBody>
                        <p style={{fontSize:'20px', textDecoration:'underline',color:'grey'}}>Delete Folders</p>
                                    <AvField
                                      label="Folder Name"
                                      id="folderdelete"
                                      name="folderdelete"
                                      value={folderdelete}
                                      onChange={(e) => setFolderDelete(e.target.value)}
                                    />
                    </CardBody>

                        <CardFooter className="text-center">
                            <Button onClick={() => delteFolder()}>Delete</Button>
                        </CardFooter>
                    </Card>
                </AvForm>

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
