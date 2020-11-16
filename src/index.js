import './styles/main.css';

const headerAvatar = document
  .querySelector('.header-profile')
  .querySelector('img');

const mobileNavAvatar = document
  .querySelector('.profile-nav-item')
  .querySelector('img');

const profileName = document
  .querySelector('.profile-nav-item')
  .querySelector('span');

const hamburger = document.querySelector('.hamburger').querySelector('button');

const navItems = document.getElementById('nav-items');

fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    authorization: 'Bearer ' + process.env.API_KEY,
  },
  body: JSON.stringify({
    query: `
      query {
        user(login: "dayojiboye") {
            name
            avatarUrl
            login
        }
      }
      `,
  }),
})
  .then((res) => res.json())
  .then((data) => {
    // console.log(data.data);
    headerAvatar.src = data.data.user.avatarUrl;
    headerAvatar.alt = '@' + data.data.user.login;
    mobileNavAvatar.src = data.data.user.avatarUrl;
    profileName.textContent = data.data.user.login;
  })
  .catch((error) => {
    console.log(error);
  });

hamburger.addEventListener('click', (e) => {
  let isExpanded = e.currentTarget.getAttribute('aria-expanded');
  if (isExpanded === 'true') {
    isExpanded = 'false';
  } else {
    isExpanded = 'true';
  }
  e.currentTarget.setAttribute('aria-expanded', isExpanded);
  navItems.classList.toggle('show');
});
