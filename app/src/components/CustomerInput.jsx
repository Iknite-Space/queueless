import React from "react";

function CustomerInput(){
 return (
  <div className="input-form-container"> 
  <div>
    <img src="/assets/images/input-form-img.png" alt="customer input form " width={400} />
  </div>
  <div className="customer-input">
    <input></input>
    <input type="email" name="" id="" />
    <input type="number" name="" id="" />
    <input type="submit" value="" />
    <input type="reset" value="" />
  </div>
  </div>
 )
}

export default CustomerInput;