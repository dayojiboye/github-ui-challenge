import './styles/main.css';

const images = document.querySelectorAll('img');

const navbarProfileName = document
  .querySelector('.profile-nav-item')
  .querySelector('span');

const profileAvatar = document.querySelector('.profile-avatar');

const profileName = document.querySelector('.profile-name');

const profileStatus = document.querySelector('.profile-status');

const tabImage = document.querySelector('.tab-image');

const tabUser = document.querySelector('.tab-user');

const hamburger = document.querySelector('.hamburger').querySelector('button');

const navItems = document.getElementById('nav-items');

const count = document.querySelector('.repo-count');

const fullName = document.querySelector('.full-name');

const nickName = document.querySelector('.nickname');

const profileBio = document.querySelector('.about');

const repoList = document.getElementById('list-of-repos');

fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    authorization: 'Bearer ' + process.env.API_KEY,
  },
  body: JSON.stringify({
    query: `
    query ($number_of_repos: Int!) {
      user(login: "dayojiboye") {
        name
        avatarUrl
        login
        bio
        repositories(last: $number_of_repos, orderBy: {field: PUSHED_AT, direction: ASC}) {
          totalCount
          nodes {
            name
            pushedAt
            shortDescriptionHTML
            stargazerCount
            forkCount
            primaryLanguage {
              name
              color
            }
          }
        }
      }
    }
    `,

    variables: {
      number_of_repos: 20,
    },
  }),
})
  .then((res) => res.json())
  .then((res) => {
    const { data } = res;
    // console.log(data);
    images.forEach((img) => {
      img.src = data.user.avatarUrl;
      img.alt = '@' + data.user.login;
    });

    navbarProfileName.textContent = data.user.login;
    fullName.textContent = data.user.name;
    nickName.textContent = data.user.login;
    profileBio.textContent = data.user.bio;
    tabUser.textContent = data.user.login;
    count.textContent = data.user.repositories.totalCount;
    profileStatus.style.display = 'block';

    data.user.repositories.nodes.reverse().forEach((repo) => {
      const repoListItem = document.createElement('li');
      repoListItem.innerHTML = `
    <div class="repo-info">
    <div class="info">
      <a href="/">${repo.name}</a>

      <div class="repo-desc">
        <p>${repo.shortDescriptionHTML}</p>
      </div>

      <div class="info-footer">
        <span>
          <span class="lang-badge" style="background-color: ${repo.primaryLanguage.color};"></span>${repo.primaryLanguage.name}</span
        >
        <span class="repo-rate">
          <iconify-icon
            data-icon="octicon:star-16"
            class="icon"
          ></iconify-icon>
          <span>${repo.stargazerCount}</span>
        </span>
        <span class="repo-forks">
          <iconify-icon
            data-icon="octicon:repo-forked-16"
            class="icon"
          ></iconify-icon>
          <span>${repo.forkCount}</span>
        </span>
        <span class="repo-time">Updated 
        <relative-time datetime=${repo.pushedAt} class="repo-relative-time">
          April 1, 2014
          </relative-time>
        </span> 
      </div>
    </div>

    <div class="rate">
      <button>
        <iconify-icon
          data-icon="octicon:star-16"
          class="icon"
        ></iconify-icon>
        Star
      </button>
    </div>
  </div>
    `;

      repoList.appendChild(repoListItem);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const isInViewport = (element) => {
  let observer = new IntersectionObserver(
    function (entries) {
      if (entries[0].isIntersecting === false) {
        tabImage.style.opacity = 1;
        profileName.style.opacity = 0;
      } else {
        tabImage.style.opacity = 0;
        profileName.style.opacity = 1;
      }
    },
    { threshold: [0] }
  );

  observer.observe(element);
};

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

window.addEventListener('scroll', () => {
  isInViewport(profileAvatar);
});
