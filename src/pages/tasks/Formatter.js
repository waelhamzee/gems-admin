import React from "react";
import NumberFormat from "react-number-format";

import { Label, FormGroup, Col, Row } from "reactstrap";
import './format.css'

const Formatter = ({
            data,
            changeInput,
            name,
            label,
            error,
            errorMessage = "Required",
            labelW = '2',
            formW = '7',
            placeholder = '',
            onValueChange
}) => {
  if (data) error = false
  return (
    <Row>
      <Label sm={labelW}>{label}</Label>
      <Col sm={formW}>
        <FormGroup>
          <NumberFormat
            placeholder={placeholder}
            name={name}
            thousandsGroupStyle="thousand"
            value={data}
            prefix="$"
            decimalSeparator="."
            displayType="input"
            type="text"
            thousandSeparator={true}
            allowNegative={true}
            // onChange={(e) => changeInput(e)}
            onValueChange={(values) => onValueChange(values,name)}
            className={`${
              error ? "form-controller error-danger" : "form-controller"
            }`}
            autoComplete="none"
            required
          />
          {error ? (
            <p
              style={{
                fontSize: "11px",
                color: "rgb(212, 63, 63)",
                marginTop: "4px",
                marginLeft: "1px",
              }}
            >
              {errorMessage}
            </p>
          ) : null}
        </FormGroup>
      </Col>
    </Row>
  );
};

export default Formatter;
