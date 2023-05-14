import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Content from './components/Content';

function App() {
  return (
    <>
      <Header />
      <Nav />
      <Content />
    </>
  );
}

export default App;
