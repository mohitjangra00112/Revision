import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import {useForm} from 'react-hook-form';

import Data from './components/data';


function App() {
  const [count, setCount] = useState(0)
    const {register , handleSubmit , } = useForm();
   const handleSubmitForm = (data)=>{
        console.log("Form submitted");
       console.log(data);
   }

  return (
    <>

    <form onSubmit={handleSubmit(handleSubmitForm)}  >
        <label htmlFor='name' >Name : </label>
        <input type="text" id='name' {...register('name')} placeholder='name' />
        <br/> <br/>
        <label htmlFor='emai;' >Email :  </label>
        <input id='email' placeholder='email' {...register('email')} />
        <br/><br/>
        <button type='submit' >Sumbit</button>
    </form>


    <Data />
    </>
  )
}

export default App
