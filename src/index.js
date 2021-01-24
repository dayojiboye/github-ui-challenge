import './styles/main.css';

const IMAGES = document.querySelectorAll('img');

const GIT_USER_NAME = document.querySelectorAll('.git-user-login-name');

const PROFILE_AVATAR = document.querySelector('.profile-avatar');

const PROFILE_NAME = document.querySelector('.profile-name');

const PROFILE_STATUS = document.querySelector('.profile-status');

const TAB_IMAGE = document.querySelector('.tab-image');

const MAIN = document.querySelector('main');

const HAMBURGER = document.querySelector('.hamburger').querySelector('button');

const NAV_ITEMS = document.getElementById('nav-items');

const COUNTS = document.querySelectorAll('.repo-count');

const FULL_NAME = document.querySelector('.full-name');

const PROFILE_BIO = document.querySelector('.about');

const REPO_LIST = document.getElementById('list-of-repos');

const PROFILE_STATUS_TEXT = document.querySelectorAll('.profile-status-text');

const STATUS_ICON = document.querySelectorAll('.profile-status-icon');

const NEW_REPO_BTN = document.getElementById('new-repo-btn');

const NEW_REPO_DROPDOWN = document.querySelector('.new-repo-dropdown');

const HEADER_PROFILE_BTN = document.getElementById('header-profile-btn');

const HEADER_PROFILE_DROPDOWN = document.querySelector(
  '.header-profile-dropdown'
);

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
        status {
          emojiHTML
          message
        }
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
    IMAGES.forEach((img) => {
      img.src = data.user.avatarUrl;
      img.alt = '@' + data.user.login;
    });

    FULL_NAME.textContent = data.user.name;
    PROFILE_BIO.textContent = data.user.bio;

    GIT_USER_NAME.forEach((el) => (el.textContent = data.user.login));

    PROFILE_STATUS_TEXT.forEach(
      (el) =>
        (el.textContent = data.status ? data.status.message : 'Set status')
    );

    STATUS_ICON.forEach(
      (el) =>
        (el.innerHTML = data.status
          ? data.status.emojiHTML
          : `<iconify-icon
    data-icon="octicon:smiley-16"
    ></iconify-icon> `)
    );

    COUNTS.forEach((count) => {
      count.textContent = data.user.repositories.totalCount;
    });

    data ? (PROFILE_STATUS.style.display = 'block') : 'none';

    data.user.repositories.nodes.reverse().forEach((repo) => {
      const REPO_LIST_ITEM = document.createElement('li');
      REPO_LIST_ITEM.innerHTML = `
    <div class="repo-info">
    <div class="info">
      <div class="repo-name">
        <h3>
          <a href="/">${repo.name}</a>
        </h3>
      </div>

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

      REPO_LIST.appendChild(REPO_LIST_ITEM);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const isInViewport = (element) => {
  let observer = new IntersectionObserver(
    function (entries) {
      if (entries[0].isIntersecting === false) {
        TAB_IMAGE.style.opacity = 1;
        PROFILE_NAME.style.opacity = 0;
      } else {
        TAB_IMAGE.style.opacity = 0;
        PROFILE_NAME.style.opacity = 1;
      }
    },
    { threshold: [0] }
  );

  observer.observe(element);
};

HAMBURGER.addEventListener('click', (e) => {
  let isExpanded = e.currentTarget.getAttribute('aria-expanded');
  if (isExpanded === 'true') {
    isExpanded = 'false';
  } else {
    isExpanded = 'true';
  }
  e.currentTarget.setAttribute('aria-expanded', isExpanded);
  NAV_ITEMS.classList.toggle('show');
  MAIN.classList.toggle('push');
});

window.addEventListener('scroll', () => {
  isInViewport(PROFILE_AVATAR);
});

NEW_REPO_BTN.addEventListener('click', (e) => {
  e.stopPropagation();
  HEADER_PROFILE_DROPDOWN.classList.remove('show');
  NEW_REPO_DROPDOWN.classList.toggle('show');
});

NEW_REPO_DROPDOWN.querySelector('.new-repo-drop-menu').addEventListener(
  'click',
  (e) => {
    e.stopPropagation();
    NEW_REPO_DROPDOWN.classList.add('show');
  }
);

HEADER_PROFILE_BTN.addEventListener('click', (e) => {
  e.stopPropagation();
  NEW_REPO_DROPDOWN.classList.remove('show');
  HEADER_PROFILE_DROPDOWN.classList.toggle('show');
});

HEADER_PROFILE_DROPDOWN.querySelector(
  '.header-profile-dropdown-menu'
).addEventListener('click', (e) => {
  e.stopPropagation();
  HEADER_PROFILE_DROPDOWN.classList.add('show');
});

window.addEventListener('click', () => {
  NEW_REPO_DROPDOWN.classList.remove('show');
  HEADER_PROFILE_DROPDOWN.classList.remove('show');
});
