const template = document.createElement("template");
template.innerHTML = `
<style>
  .user-card {
    font-family: sans-serif;
    background: lightgrey;
    width: 500px;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 10px;
    margin-bottom: 15px;
    border-bottom: darkorchid 5px solid;
    border-radius: 10px;
    transition: .5s;
  }

  .user-card img {
    width: 100%;
    transition: .5s;
    border-radius: 10px 0 0 10px;
  }

  .user-card button {
    cursor: pointer;
    background: darkorchid;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    font-weight: bold;
  }

  h3 {
    color: darkblue;
  }

  .container {
    transition: .5s;
  }

</style>
<div class="user-card">
  <img />
  <div class="container">
    <h3>Name</h3>
    <div class="info">
      <p id="email">Email</p>
      <p id="phone">Phone</p> 
    </div>
    <button id="toggle-info">Hide Info</button>
  </div>
</div>
`;

class newComponent extends HTMLElement {
  constructor() {
    super();

    this.showInfo = true

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    if(this.getAttribute("name") == null) {
      this.setAttribute("name", "Name")
    } else {
      this.shadowRoot.querySelector("h3").innerText = this.getAttribute("name");
    }

    if(this.getAttribute("avatar") == null) {
      this.shadowRoot.querySelector("img").src = "https://img.icons8.com/officel/512/circled-user-male-skin-type-6.png"
    } else {
      this.shadowRoot.querySelector("img").src = this.getAttribute("avatar")
    }

    if(this.getAttribute("email") == null) {
      this.setAttribute("email", "Email")
    } else {
      this.shadowRoot.querySelector("#email").innerText = this.getAttribute("email")
    }

    if(this.getAttribute("phone") == null) {
      this.setAttribute("phone", "Phone")
    } else {
      this.shadowRoot.querySelector("#phone").innerText = this.getAttribute("phone")
    }
  }

  toggleInfo() {
    this.showInfo = !this.showInfo
    const info = this.shadowRoot.querySelector(".info")
    const toggleBtn = this.shadowRoot.querySelector("#toggle-info")
    const userCard = this.shadowRoot.querySelector(".user-card")
    const img = this.shadowRoot.querySelector("img")
    const container = this.shadowRoot.querySelector(".container")

    if(this.showInfo) {
        info.style.display = "block"
        toggleBtn.innerText = "Hide Info"
        userCard.style.height = "163.33px"
        img.style.width = "100%"
        container.style.marginLeft = "0px"
    } else {
        info.style.display = "none"
        toggleBtn.innerText = "Show Info"
        userCard.style.height = "100px"
        img.style.width = "100px"
        container.style.marginLeft = "-50px"
    }
  }

  connectedCallback() {
   this.shadowRoot.querySelector("#toggle-info").addEventListener("click", () => this.toggleInfo())
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector("#toggle-info").removeEventListener() 
  }
}

window.customElements.define("new-component", newComponent);

document.querySelector(".addNew").addEventListener("click", function() {
  document.body.append(template)

  
})