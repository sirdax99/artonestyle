/* Coneccion */ 
 import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js';

const auth_api_array = [{ key: "apiKey", value: "AIzaSyCfHHJCWx1RQ2y4huXsI4SXw-J0aQLIoIs" },{ key: "authDomain", value: "artonestyle-21.firebaseapp.com" },{ key: "projectId", value: "artonestyle-21" },{ key: "storageBucket", value: "artonestyle-21.firebasestorage.app" },{ key: "messagingSenderId", value: "801265390532" },{ key: "appId", value: "1:801265390532:web:0dc4ef28512edfbd38ca91" },{ key: "measurementId", value: "G-MQBQ8RQGLT" }];
const firebaseConfig = {};
auth_api_array.forEach(item => {
    firebaseConfig[item.key] = item.value;
});

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const login = document.getElementById('login');
const cerrar = document.getElementById('cerrar'); // Obtén el elemento "cerrar"

// Define la función signInUserWithEmailAndPassword
async function signInUserWithEmailAndPassword(auth, email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Usuario ha iniciado sesión:", user);
    return userCredential; // Devuelve el objeto userCredential para que puedas acceder a él en el .then()
    // Aquí puedes actualizar la interfaz de usuario
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error; // Lanza el error para que el .catch() pueda capturarlo
    // Aquí puedes mostrar un mensaje de error al usuario
  }
}

// Agrega un listener al botón de inicio de sesión
login.addEventListener('click', (e) => {
  var email = document.getElementById('emaillog').value; // Obtén el valor del email
  var password = document.getElementById('passwordlog').value;

  signInUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
      alert('Usuario Logeado');
      console.log(cred.user);
    })
    .catch(error => {
      const errorCode = error.code;
      console.log(error.code);
      if (errorCode == 'auth/invalid-email')
        alert('El correo no es valido');
      else if (errorCode == 'auth/user-disabled')
        alert('El usuario ha sido deshabilitado');
      else if (errorCode == 'auth/user-not-found')
        alert('El usuario no existe');
      else if (errorCode == 'auth/wrong-password')
        alert('Contraseña Incorrecta');
      else if (errorCode == 'auth/missing-password')
        alert('Contraseña Invalida');
      else if (errorCode == 'auth/invalid-credential')
        alert('Autenticación Incorrecta');
    });
});

cerrar.addEventListener('click', (e) => {
  signOut(auth).then(() => {
    alert('sesión Cerrada');
  }).catch((error) => {
    alert('Error al cerrar sessión');
  });
});

auth.onAuthStateChanged(user => {
  if (user) {
    console.log("usuario activo");
    if (user.emailVerified) { // Usa user.emailVerified
      alert("Usuario Activo");
    } else {
       alert("El usuario aún no está verificado, ingrese a su bandeja de correo del email registrado e ingrese el link enviado a su correo.");
      signOut(auth); // Usa signOut(auth) para cerrar sesión
    }
  } else {
    console.log("Usuario Inactivo");
  }
});
