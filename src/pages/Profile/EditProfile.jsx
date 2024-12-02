import React, { useState } from 'react';
import Logo from '../../components/common/Logo';
import Button from "../../components/common/Button";
import './EditProfile.css';

export default function EditProfile() {
  const [input1, setInput1] = useState('기본값1');
  const [input2, setInput2] = useState('기본값2');
  const [input3, setInput3] = useState('기본값3');

  return (
    <div className='EditProfile-container'>
      <Logo/>
      <div className='Edit-title'>EDIT</div>
      <input 
        className='input-field' 
        value={input1} 
        onChange={(e) => setInput1(e.target.value)} 
      />
      <input 
        className='input-field' 
        value={input2} 
        onChange={(e) => setInput2(e.target.value)} 
      />
      <input 
        className='input-field' 
        value={input3} 
        onChange={(e) => setInput3(e.target.value)} 
      />
      <Button text="다음" />
    </div>
  );
}
