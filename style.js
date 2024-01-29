const url = "https://api.github.com/users"

const searchInputElement = document.getElementById('search_input');
const searchBtnEle = document.getElementById('search_btn');
const profileContainer = document.getElementById('profile_container');
const loadingEle = document.getElementById('loading');


const generateProfile = (profile) =>{
    return `
        <div class="profile-box">
        <div class="top-section">
            <div class="left">
                <div class="avatar">
                    <img src=${profile.avatar_url} alt="avatar" />
                </div>
                <div class="self">
                    <h1>${profile.name}</h1>
                    <h1>${profile.login}</h1>
                </div>
            </div>
            <a href="${profile.html_url}" target="_black">
            <button class="primary_btn">Check Profile</button>
            </a>
        </div>
        <div class="about">
            <h2>About</h2>
            <p>${profile.bio || 'No bio available.'}
            </p>
        </div>

        <div class="status">
            <div class="satus_item">
                <h3>Followers</h3>
                <p>${profile.followers}</p>
            </div>

            <div class="satus_item">
                <h3>Followings</h3>
                <p>${profile.following}</p>
            </div>

            <div class="satus_item">
                <h3>Repos</h3>
                <p>${profile.public_repos}</p>
            </div>
        </div>
    </div>
    `;
}

const fetchProfile = async ()=>{
const username =  searchInputElement.value;

loadingEle.innerText = "loading....";
loadingEle.style.color= "black";

    try {
        const res = await fetch(`${url}/${username}`)

        if (res.status === 404) {
            throw new Error ('User not found');
        }

        const data = await res.json();
    
            loadingEle.innerText ="",
            profileContainer.innerHTML = generateProfile(data);
      
            // loadingEle.innerHTML= data.message;
            // loadingEle.style.color = "red";
            // profileContainer.innerText = "";

    } catch (error) {
        loadingEle.innerText =error.message;
        loadingEle.style.color = "red";
            profileContainer.innerText = "";
    }
};


searchBtnEle.addEventListener('click',()=> {
    profileContainer.innerHTML= "";
 fetchProfile();
});



