const API_KEY = "8fdf1d62ef99462fadb33bfee2849d34"
const url = "https://newsapi.org/v2/everything?q="
let DATA_ARRAy = [] //article

async function fetchData(query){
    const res =  await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data =  await res.json()
    return data
}

fetchData("all").then(data => renderMain(data.articles))

//render new//
function renderMain(arr){
    let mainHTML = ''
    for(let i = 0 ; i < arr.length ;i++){
        if(arr[i].urlToImage){
        mainHTML += `<div class="card">
                        <a href=${arr[i].url}>
                        <img src=${arr[i].urlToImage}>
                        <h4>${arr[i].title}</h4>
                        <div class="PublishByDate">
                            <p>${arr[i].source.name}</p>
                            <span>•</span>
                            <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
                        </div>
                        <div class="desc">
                            ${arr[i].description}
                        Saving for retirement is a crucial part of everyone’s financial planning. I’ve recommended
                            before that dividing your money into multiple accounts helps you see all your saving goals separately. A
                            big part of that is taking advantage of retirement-specific acc…
                        </div>
                    </div>
        `
        }
    }

    document.querySelector("main").innerHTML = mainHTML
}


const searchBtn = document.getElementById("searchForm")
const searchInput = document.getElementById("searchInput")

searchBtn.addEventListener("submit",async(e)=>{
    e.preventDefault()
    console.log(searchInput.value)

   const data = await fetchData(searchInput.value)
   console.log(data)
   renderMain(data.articles)
})


async function Search(query){
    const data = await fetchData(query)
    renderMain(data.articles)
}