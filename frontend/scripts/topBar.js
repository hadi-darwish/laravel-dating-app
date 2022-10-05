const topBar = () => {
  const topBar_section = `<div class="top-bar">
      <p class="spruce-trolley">
        Dating App
      </p>
      <div class="user-profile-picture" id="profile"><img src="${
        localStorage.getItem("token").profile_pic
      }" alt="" /></div>
    </div>`;

  return topBar_section;
};
document.getElementById("topBar").innerHTML = topBar();

document.getElementById("profile").onclick = () => {
  navHomeBtn.children[0].style.color = "red";
  navFavBtn.children[0].style.color = "red";
  navMessageBtn.children[0].style.color = "red";
  navBlockBtn.children[0].style.color = "red";
  document.getElementById(
    "app-body"
  ).innerHTML = `<div class="sign-container"  id='sign-up-container'>
      <h1>Edit Profile</h1>
      <div class="inputs-container">
        <input placeholder="Full name" id='name' />
        <input placeholder="bio" id='bio'/>
        <input placeholder="age" id='age'/>
        <input placeholder="interests" id='interests'/>
        <input placeholder="location" id='location'/>
      </div>
      <button class="sign-btn" id='sign-up-btn'>Update</button>
    </div>
  </div>
  <div id="logout-container">
  <button class="sign-btn" id="logout">LogOut</button></div>`;

  document.getElementById("sign-up-btn").onclick = () => {
    let update = "http://127.0.0.1:8000/api/update";
    let name = document.getElementById("name").value;
    let bio = document.getElementById("bio").value;
    let age = document.getElementById("age").value;
    let interests = document.getElementById("interests").value;
    let location = document.getElementById("location").value;

    let params = new URLSearchParams();
    params.append("token", localStorage.getItem("token"));
    params.append("name", name);
    params.append("bio", bio);
    params.append("age", age);
    params.append("interests", interests);
    params.append("location", location);

    try {
      axios.post(update, params).then((res) => {
        if (res.data) {
          // alert("Profile Updated");
          console.log(res.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // document.getElementById("sign-body").innerHTML = signUp();
  document.getElementById("logout").onclick = () => {
    localStorage.removeItem("user");
    location.href = "../sgin.html";
  };
};
