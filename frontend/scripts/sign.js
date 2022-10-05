let signAPI = "http://127.0.0.1:8000/api/login";
let signupAPI = "http://127.0.0.1:8000/api/register";

const signIn = () => {
  return `<div class="sign-container " id='sign-in-container'>
          <h1>Sign in to your account</h1>
          <div class="inputs-container">
            <input placeholder="Email" id='mail' />
            <input placeholder="Password" id='pass'/>
          </div>
          <button class="sign-btn" id='sign-in-btn'>Sign In</button>
          <div class="have-account" id='dont-have'>I dont have an account</div>
        </div>
      </div>`;
};

const signUp = () => {
  return `<div class="sign-container display-none"  id='sign-up-container'>
        <h1>Create new account</h1>
        <div class="inputs-container">
          <input placeholder="Full name" id='name' />
          <input placeholder="Email" id='email' />
          <input placeholder="Password" id='password'/>
          <input placeholder="Gender" id='gender'/>
          <input placeholder="Age" id='age'/>
          <input placeholder="Location" id='location'/>
          <input placeholder="interests" id='interests'/>
        </div>
        <button class="sign-btn" id='sign-up-btn'>Sign Up</button>
        <div class="have-account" id='have-account'>already have an account</div>
      </div>
    </div>`;
};

document.getElementById("sign-body").innerHTML = signIn() + signUp();

// rendering sign page if no user
document.getElementById("have-account").onclick = () => {
  document.getElementById("sign-up-container").classList.add("display-none");
  document.getElementById("sign-in-container").classList.remove("display-none");
};

document.getElementById("dont-have").onclick = () => {
  document.getElementById("sign-up-container").classList.remove("display-none");
  document.getElementById("sign-in-container").classList.add("display-none");
};

// on clicking the sign in button
document.getElementById("sign-in-btn").onclick = () => {
  let params = new URLSearchParams();
  params.append("email", document.getElementById("mail").value);
  params.append("password", document.getElementById("pass").value);
  try {
    axios.post(signAPI, params).then((res) => {
      if (res.data) {
        localStorage.setItem("token", res.data.authorisation.token);
        window.location.replace("../index.html");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

document.getElementById("sign-up-btn").onclick = () => {
  //   document.getElementById("sign-up-container").classList.add("display-none");
  //   document.getElementById("sign-in-container").classList.add("display-none");
  let param = new URLSearchParams();
  param.append("email", document.getElementById("email").value);
  param.append("password", document.getElementById("password").value);
  param.append("gender", document.getElementById("gender").value);
  param.append("name", document.getElementById("name").value);
  param.append("age", document.getElementById("age").value);
  param.append("interests", document.getElementById("interests").value);
  param.append("location", document.getElementById("location").value);

  axios.post(signupAPI, param).then((res) => {
    if (res.data) {
      window.location.reload("../sign.html");
    }
  });
};
