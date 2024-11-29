import React from 'react';
import Logo from '../../components/common/Logo';
import Button from "../../components/common/Button";
import './EditProfile.css';


export default function EditProfile() {
  return <>
  <div className='EditProfile-container'>
    <Logo/>
    <div className='Edit-title'>EDIT</div>
    <input className='input-field'></input>
    <input className='input-field'></input>
    <input className='input-field'></input>
    <Button text="다음" />
  </div>
  </>;
}
