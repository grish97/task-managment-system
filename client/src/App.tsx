import React, { lazy, useEffect } from 'react';
import { toast } from 'react-toastify';
import Routing from 'routes/Routing';
import './assets/app.scss';

toast.configure({
  hideProgressBar: true,
  position: 'bottom-right',
});

function App() {
  return (
    <div className="App">
      <Routing />
    </div>
  );
}

export default App;
