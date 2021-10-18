import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import './App.css';
import { useState } from 'react';
import firebaseAuthInitialization from "./Firebase/firebase.init";

firebaseAuthInitialization();

function App() {
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [error, setError]=useState('');
  const [isLogin, setIsLogin]=useState(false);
  const auth = getAuth();

  const toggleLogIn=(e)=>{
     setIsLogin(e.target.checked);
  }

  const handleEmail=(e)=>{
  setEmail(e.target.value);
  }
  const handlePassword=(e)=>{
  setPassword(e.target.value);
  }
  const handleRegisterBtn =(e)=>{
    e.preventDefault();
    if(password.length<6){
      setError('Password should be at least 6 characters');
      return;
    }
    if(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test('password')){
       setError('it contains at least 1 number, 1 upper case, 1 lower case and six character');
       return;

    } 
    isLogin?processLogin(email,password):registerNewUser(email,password) ;      

  }
const processLogin=(email,password)=>{
  signInWithEmailAndPassword(auth, email, password)
  .then((result) => {
    // Signed in 
    const user = result.user;
    setError('');
    console.log(user);
    
  })
  .catch((error) => {    
    setError(error.message)
  });

}

  const registerNewUser=(email,password)=>{
    createUserWithEmailAndPassword(auth, email, password)
     .then((result)=>{
      console.log(email,password);
       const user=result.user;
       setError('');// for clear error when give proper password;
       console.log(user);
     })  
     .catch((error)=>{
       setError(error.message);

     })
  //  e.preventDefault();  // when this is used page will be not reload
  }
  return (
    <div className=" m-5 App">
      <h1>Please {isLogin?"Login":'Register'}</h1>
      <form onSubmit={handleRegisterBtn}>
  <div className="row mb-3">
    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      <input onBlur={handleEmail} type="email" className="form-control" id="inputEmail3" required />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
      <input onBlur={handlePassword} type="password" className="form-control" id="inputPassword3" required />
    </div>
  </div>
 
  <div className="row mb-3">
    <div className="col-sm-10 offset-sm-2">
    <div class="form-check">
        <input onChange={toggleLogIn} class="form-check-input" type="checkbox" id="gridCheck1"/>
        <label class="form-check-label" for="gridCheck1">
          Already Registered?
        </label>
      </div>
     
    </div>
  </div>
  <div className="row mb-3 text-danger">
    {error}
  </div>
  <button type="submit" className="btn btn-primary">{isLogin?'Login':'Register'}</button>
</form>
    </div>
  );
}

export default App;
