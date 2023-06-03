import React from 'react'
import axios from 'axios';
export default function NewBook() {
  
  const handleSubmit = async e => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget).entries());

    try{
      const res = await axios.post('http://localhost:3001/admin/test', formData, {withCredentials: true});

      console.log(res);

    }catch(err){
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="file" id="" />
      <input type="submit" />
    </form>
  )
}
