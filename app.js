const apiKey = "pub_4497323f48fcba0ce165a125a02d3e62b842e";
const apiUrl = "https://newsdata.io/api/1/latest?q=";

window.addEventListener("load", () => fetchNews("Pakistan"));

function reload() {
    window.location.reload();
}


async function fetchNews(query) {
    const res = await fetch(`${apiUrl}${query}&apiKey=${apiKey}`);
    const data = await res.json();
    bindData(data.results);
}



function bindData(results) {
    const cardsContainer = document.getElementById("cards-container");
    const templateNewsCard = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    results.forEach(results => {
        if (!results.image_url) return;
        const cardClone = templateNewsCard.content.cloneNode(true);
        fillDataInCard(cardClone, results);
        cardsContainer.appendChild(cardClone);
    });
}


function fillDataInCard(cardClone, results) {
    const newsImg = cardClone.getElementById("news-img");
    const newsTittle = cardClone.getElementById("news-tittle");
    const newsSource = cardClone.getElementById("news-source");
    const newsDesc = cardClone.getElementById("news-desc");

    let date = moment(results.pubDate).format('LLLL');


    newsImg.src = results.image_url;
    newsTittle.innerHTML = results.title;
    newsSource.innerHTML = `${results.source_id} · ${date}`;
    newsDesc.innerHTML = results.description;


    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(results.link, "_blank");
    })



}

let currentSelectedNav = null;
function getNews(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentSelectedNav?.classList.remove("active");
    currentSelectedNav = navItem;
    currentSelectedNav.classList.add("active");
}

const searchBtn = document.getElementById('search-button');
const searchText = document.getElementById('news-input');


searchBtn.addEventListener("click", () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    currentSelectedNav?.classList.remove("active");
    currentSelectedNav = null;
})

