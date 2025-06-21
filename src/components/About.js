import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const About = () => {
  const a = useContext(noteContext);
  return (
    <div>
        About Page
    </div>
  )
}

export default About
