const usersUrl = "https://api.github.com/search/users?q=";
const reposUrl = "https://api.github.com/users/";

const form = document.getElementById("github-form");
const input = document.getElementById("search");
const button = document.getElementById("submitBtn");
let userList = document.getElementById("user-list");
const repoList = document.getElementById("repos-list");

const displayRepos = (user) => {
  userList.innerHTML = null;
  let li = document.createElement("li");
  li.innerHTML = `<div class='user'>
  <img src=${user.avatar_url} width='50px'/>
  <p>${user.login}</p>
  </div><hr/>`;
  userList.append(li);

  try {
    fetch(`${reposUrl}${user.login}/repos`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        repoList.innerHTML = null;
        const p = document.createElement("p");
        p.style.textAlign = 'center'
        p.style.color = 'white'
        p.style.textDecoration = 'underline'
        p.style.fontSize = '40px'
        p.innerHTML = "Repositories";
        repoList.append(p);
        data.map((item) => {
          // console.log(item);
          let li = document.createElement("li");
          li.innerHTML = `<div class='repo'>
              <p>${item.name}</p>
              </div><hr/>`;
          repoList.append(li);
        });
      });
  } catch (err) {
    console.log(err.message);
  }
};

const searchGithubUsers = (e) => {
  e.preventDefault();
  try {
    fetch(`${usersUrl}${input.value}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.items.map((item) => {
          console.log(item);
          let li = document.createElement("li");
          li.onclick = () => displayRepos(item);
          li.innerHTML = `<div class='user'>
          <img src=${item.avatar_url} width='50px'/>
          <p>${item.login}</p>
          </div><hr/>`;
          userList.append(li);
        });
      });
  } catch (err) {
    console.log(err.message);
  }
};

form.addEventListener("submit", searchGithubUsers);
