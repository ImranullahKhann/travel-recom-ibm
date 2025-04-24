async function fetchData() {
    try {
        const response = await fetch('./travel_recommendation_api.json');
        if (!response.ok) {
            throw new Error(`Fetch request failed.`);
        } 
        const data = await response.json();
        return data;
    } 
    catch (error) {
        console.error("Fetching error:", error);
        return null; 
    }
}

function accept_keywords(text) {
    text = text.toLowerCase()
    if (text.includes("beach")) 
        return "beaches"
    else if (text.includes("temple"))
        return "temples"
    else if (text.includes("countr"))
        return "countries"
}

async function display_results(input) {
    const data = await fetchData()
    const results = document.querySelector(".results")
    for (let i = 0; i < data[input].length; i++) {
        const place = data[input][i];
        // const id = place.id
        const name = place.name
        const desc = place.description
        const url = place.imageUrl

        const cont = document.createElement("div")
        cont.className = "res"
        const imgCont = document.createElement("div")
        const img = document.createElement("img")
        img.src = url

        const nameH = document.createElement("h3")
        const descP = document.createElement("p")
        nameH.innerText = name
        descP.innerText = desc
        
        imgCont.appendChild(img)
        cont.appendChild(imgCont)
        cont.appendChild(nameH)
        cont.append(descP)

        results.appendChild(cont)
    }
}

function clear() {
    if (!results.classList.contains("remove"))
        results.classList.add("remove")
    results.innerHTML = ""
}

const searchBtn = document.querySelector(".search-btn")
const resetBtn = document.querySelector(".reset-btn")
const results = document.querySelector(".results")

searchBtn.addEventListener("click", ()=> {
    clear()
    let value = document.querySelector(".search>input").value
    value = accept_keywords(value)
    console.log(results.classList)
    results.classList.remove("remove")
    display_results(value)
})

resetBtn.addEventListener("click", () => {
    clear()
})