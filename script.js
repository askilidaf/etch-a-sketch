function makeGrid(width) {
    width = !Number.isInteger(width)? 16 :
            width < 4? 4 :
            width > 128? 128 :
            width;
    const container = document.querySelector("#container");
    container.innerHTML = "";
    container.style.setProperty("--width", width);

    for (let i=0; i<width**2; i++) {
        const grid = document.createElement("div");
        grid.classList.add("grid");
        container.appendChild(grid);
    }
    document.querySelector("#size-desc").textContent = `Current size: ${width}x${width}`
}

function rand() {
    return Math.floor(Math.random() * 256);
}

let grey1 = "#eee",
    grey2 = "#ddd";
document.documentElement.style.setProperty("--grey1", grey1);
document.documentElement.style.setProperty("--grey2", grey2);

makeGrid(16);

let rgb = true;

const buttons = document.querySelector(".buttons");
buttons.addEventListener("mouseover", (e) => {
    if (e.target.tagName === "BUTTON")
        e.target.style.backgroundColor = grey2;
});
buttons.addEventListener("mouseout", (e) => {
    if (e.target.tagName === "BUTTON")
        e.target.style.backgroundColor = grey1;
});

const container = document.querySelector("#container");
container.addEventListener("mouseover", (e) => {
    if (e.target.classList.contains("grid")) {
        if (rgb)
            e.target.style.backgroundColor = `rgb(${rand()} ${rand()} ${rand()})`;
        else {
            let opacity = parseFloat(e.target.dataset.opacity || 0);
            opacity = Math.min(1, opacity + 0.167);
            e.target.dataset.opacity = opacity;
            e.target.style.backgroundColor = `rgba(0,0,0,${opacity})`;
        }
    }
});

const resize = document.querySelector("#resize");
resize.addEventListener("click", () => makeGrid(prompt("Enter new width:", 16)-0));

const color = document.querySelector("#color");
color.addEventListener("click", () => {
    rgb = !rgb;
    color.textContent = rgb? "BLACK" : "COLOR";
    document.querySelectorAll(".grid").forEach(cell => {
        cell.style.backgroundColor = "";
        cell.dataset.opacity = 0;
    });
});