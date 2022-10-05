const navBar = () => {
  return `<div class="nav-icon" id="nav-home-btn">
    <p style="color: red;" >Home</p>
  </div>
  <div class="nav-icon" id="nav-favorites-btn">
    <p>favorites</p>
  </div>
  <div class="nav-icon" id="nav-messages-btn">
    <p>messages</p>
  </div>
  <div class="nav-icon" id="nav-blocks-btn">
    <p>blocks</p>
  </div>
`;
};

const navBarDom = document.getElementById("navbar");
navBarDom.innerHTML = navBar();
const navHomeBtn = document.getElementById("nav-home-btn");
const navFavBtn = document.getElementById("nav-favorites-btn");
const navMessageBtn = document.getElementById("nav-messages-btn");
const navBlockBtn = document.getElementById("nav-blocks-btn");
const appBody = document.getElementById("app-body");
appBody.innerHTML = "";
let matches = "http://127.0.0.1:8000/api/getMatches";
let params = new URLSearchParams();
params.append("token", localStorage.getItem("token"));
axios.post(matches, params).then((res) => {
  if (res.data) {
    res.data.matches.forEach((match) => {
      appBody.innerHTML += `<div class="product-card">
        <div class="product-card-img-container clicked" id="${match.id}">
          <img
            class="product-card-img "
            src=${match.profile_pic}
            alt=""
            
          />
        </div>
        <div class="card-info">
          <div class="product-card-info">
            <div class="product-name-seller">
              <p class="product-name">${match.name}</p>
             <p class="seller-brand">${match.gender}</p> 
            </div>
  
            <div class="product-price">
              <p class="price">${match.location}</p>
            </div>
            <div class="product-card-icons">
            <div class="product-card-icon">
            <img alt="" class = "block"    data-value="${match.id}" src="./images/remove.svg" />
          </div>
          <div class="product-card-icon">
            <img alt="" class = "like"  data-value="${match.id}" src="./images/like.svg" />
          </div>
            </div>
          </div>
        </div>
      </div>`;
    });
  }
  const like = document.querySelectorAll(".like");
  const block = document.querySelectorAll(".block");
  like.forEach((element) => {
    element.addEventListener("click", () => {
      let favorite = "http://127.0.0.1:8000/api/toggle_favorites";
      console.log(element.getAttribute("data-value"));
      let param = new URLSearchParams();
      param.append("token", localStorage.getItem("token"));
      param.append("favorite_id", element.getAttribute("data-value"));
      axios.post(favorite, param).then((res) => {
        console.log(res.data);
        window.location.reload();
      });
    });
  });

  block.forEach((element) => {
    element.addEventListener("click", () => {
      let block = "http://127.0.0.1:8000/api/toggle_blocks";
      console.log(element.getAttribute("data-value"));
      let param = new URLSearchParams();
      param.append("token", localStorage.getItem("token"));
      param.append("blocked_id", element.getAttribute("data-value"));
      axios.post(block, param).then((res) => {
        console.log(res.data);
        window.location.reload();
      });
    });
  });
});
navHomeBtn.children[0].style.color = "#e20a58";
navFavBtn.children[0].style.color = "red";
navMessageBtn.children[0].style.color = "red";
navBlockBtn.children[0].style.color = "red";
navHomeBtn.addEventListener("click", () => {
  appBody.innerHTML = "";
  let matches = "http://127.0.0.1:8000/api/getMatches";
  let params = new URLSearchParams();
  params.append("token", localStorage.getItem("token"));
  axios.post(matches, params).then((res) => {
    if (res.data) {
      res.data.matches.forEach((match) => {
        appBody.innerHTML += `<div class="product-card">
        <div class="product-card-img-container clicked" id="${match.id}">
          <img
            class="product-card-img "
            src=${match.profile_pic}
            alt=""
            
          />
        </div>
        <div class="card-info">
          <div class="product-card-info">
            <div class="product-name-seller">
              <p class="product-name">${match.name}</p>
             <p class="seller-brand">${match.gender}</p> 
            </div>
  
            <div class="product-price">
              <p class="price">${match.location}</p>
            </div>
            <div class="product-card-icons">
            <div class="product-card-icon">
            <img alt="" class = "block"  data-value="${match.id}" src="./images/remove.svg" />
          </div>
          <div class="product-card-icon">
            <img alt="" class = "like"  data-value="${match.id}" src="./images/like.svg" />
          </div>
            </div>
          </div>
        </div>
      </div>`;
      });
    }
    const like = document.querySelectorAll(".like");
    const block = document.querySelectorAll(".block");
    like.forEach((element) => {
      element.addEventListener("click", () => {
        let favorite = "http://127.0.0.1:8000/api/toggle_favorites";
        console.log(element.getAttribute("data-value"));
        let param = new URLSearchParams();
        param.append("token", localStorage.getItem("token"));
        param.append("favorite_id", element.getAttribute("data-value"));
        axios.post(favorite, param).then((res) => {
          console.log(res.data);
          window.location.reload();
        });
      });
    });
    block.forEach((element) => {
      element.addEventListener("click", () => {
        let block = "http://127.0.0.1:8000/api/toggle_blocks";
        console.log(element.getAttribute("data-value"));
        let param = new URLSearchParams();
        param.append("token", localStorage.getItem("token"));
        param.append("blocked_id", element.getAttribute("data-value"));
        axios.post(block, param).then((res) => {
          console.log(res.data);
          window.location.reload();
        });
      });
    });
  });
  navHomeBtn.children[0].style.color = "#e20a58";
  navFavBtn.children[0].style.color = "red";
  navMessageBtn.children[0].style.color = "red";
  navBlockBtn.children[0].style.color = "red";
});

navFavBtn.addEventListener("click", () => {
  appBody.innerHTML = "";
  let matches = "http://127.0.0.1:8000/api/get_favorites";
  let params = new URLSearchParams();
  params.append("token", localStorage.getItem("token"));
  axios.post(matches, params).then((res) => {
    if (res.data) {
      res.data.favorites.forEach((match) => {
        appBody.innerHTML += `<div class="product-card">
          <div class="product-card-img-container clicked" id="${match.id}">
            <img
              class="product-card-img "
              src=${match.profile_pic}
              alt=""

            />
          </div>
          <div class="card-info">
            <div class="product-card-info">
              <div class="product-name-seller">
                <p class="product-name">${match.name}</p>
               <p class="seller-brand">${match.gender}</p>
              </div>

              <div class="product-price">
                <p class="price">${match.location}</p>
              </div>
              <div class="product-card-icons">
                <div class="product-card-icon">
                  <img alt="" class = "block" data-value="${match.id}"  src="./images/remove.svg" />
                </div>
                <div class="product-card-icon">
                  <img alt="" class = "like" data-value="${match.id}" src="./images/like.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>`;
      });
    }
    const like = document.querySelectorAll(".like");
    const block = document.querySelectorAll(".block");
    like.forEach((element) => {
      element.addEventListener("click", () => {
        let favorite = "http://127.0.0.1:8000/api/toggle_favorites";
        console.log(element.getAttribute("data-value"));
        let param = new URLSearchParams();
        param.append("token", localStorage.getItem("token"));
        param.append("favorite_id", element.getAttribute("data-value"));
        axios.post(favorite, param).then((res) => {
          console.log(res.data);
          window.location.reload();
        });
      });
    });
    block.forEach((element) => {
      element.addEventListener("click", () => {
        let block = "http://127.0.0.1:8000/api/toggle_blocks";
        console.log(element.getAttribute("data-value"));
        let param = new URLSearchParams();
        param.append("token", localStorage.getItem("token"));
        param.append("blocked_id", element.getAttribute("data-value"));
        axios.post(block, param).then((res) => {
          console.log(res.data);
          window.location.reload();
        });
      });
    });
  });

  navHomeBtn.children[0].style.color = "red";
  navFavBtn.children[0].style.color = "#e20a58";
  navMessageBtn.children[0].style.color = "red";
  navBlockBtn.children[0].style.color = "red";
});
navMessageBtn.addEventListener("click", () => {
  appBody.innerHTML = "";

  navHomeBtn.children[0].src = "./images/home-icon.svg";
  navHomeBtn.children[1].style.color = "#54549f";
  navPersonBtn.children[0].src = "./images/person-icon.svg";
  navPersonBtn.children[1].style.color = "#54549f";
  navSearchBtn.children[0].src = "./images/search-active-icon.svg";
  navSearchBtn.children[1].style.color = "#e21a58";
  navCartBtn.children[0].src = "./images/cart-icon.svg";
  navCartBtn.children[1].style.color = "#54549f";
  navMoreBtn.children[0].src = "./images/more-icon.svg";
  navMoreBtn.children[1].style.color = "#54549f";
});
navBlockBtn.addEventListener("click", () => {
  appBody.innerHTML = "";
  let matches = "http://127.0.0.1:8000/api/get_blocks";
  let params = new URLSearchParams();
  params.append("token", localStorage.getItem("token"));
  axios.post(matches, params).then((res) => {
    if (res.data) {
      res.data.blocks.forEach((match) => {
        appBody.innerHTML += `<div class="product-card">
          <div class="product-card-img-container clicked" id="${match.id}">
            <img
              class="product-card-img "
              src=${match.profile_pic}
              alt=""

            />
          </div>
          <div class="card-info">
            <div class="product-card-info">
              <div class="product-name-seller">
                <p class="product-name">${match.name}</p>
               <p class="seller-brand">${match.gender}</p>
              </div>

              <div class="product-price">
                <p class="price">${match.location}</p>
              </div>
              <div class="product-card-icons">
                <div class="product-card-icon">
                  <img alt="" class = "block" data-value=${match.id}  src="./images/remove.svg" />
                </div>
                <div class="product-card-icon">
                  <img alt="" class = "like"  data-value=${match.id} src="./images/like.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>`;
      });
    }
    const like = document.querySelectorAll(".like");
    const block = document.querySelectorAll(".block");
    like.forEach((element) => {
      element.addEventListener("click", () => {
        let favorite = "http://127.0.0.1:8000/api/toggle_favorites";
        console.log(element.getAttribute("data-value"));
        let param = new URLSearchParams();
        param.append("token", localStorage.getItem("token"));
        param.append("favorite_id", element.getAttribute("data-value"));
        axios.post(favorite, param).then((res) => {
          console.log(res.data);
          window.location.reload();
        });
      });
    });
    block.forEach((element) => {
      element.addEventListener("click", () => {
        let block = "http://127.0.0.1:8000/api/toggle_blocks";
        console.log(element.getAttribute("data-value"));
        let param = new URLSearchParams();
        param.append("token", localStorage.getItem("token"));
        param.append("blocked_id", element.getAttribute("data-value"));
        axios.post(block, param).then((res) => {
          console.log(res.data);
          window.location.reload();
        });
      });
    });
  });

  navHomeBtn.children[0].style.color = "red";
  navFavBtn.children[0].style.color = "red";
  navMessageBtn.children[0].style.color = "red";
  navBlockBtn.children[0].style.color = "#e20a58";
});
