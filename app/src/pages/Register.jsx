
import React from 'react';


function RegistroForm() {
  return (
    <>
    <div className="container-fluid container-sign">
      <form action="" className="register-form">
        <input type="text" className="reg-input" placeholder="Nombre" />
        <input type="text" className="reg-input" placeholder="Apellido materno" />
        <input type="text" className="reg-input" placeholder="Apellido paterno" />
        <input type="text" className="reg-input" placeholder="Correo electrónico" />
        <input type="password" className="reg-input" placeholder="Contraseña" />
        <button>Registrarse</button>
      </form>
    </div>
    </>
    
  );
}

export default RegistroForm;
