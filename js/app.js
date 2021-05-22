'use strict';

let attempts = 0;

let maxAttempts = 25;

let attemptsEl = document.getElementById('attempts');
// to get the span element from the html page and count the attempts each time

let products = [];

let productsImagesNames = [];

let productsClicks = [];
let productsViews = [];
// to add the counted number each time any image is clicked or viewed , and local storage them using these arrays

let threeImages = [];

let productsImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];

let lImgEl = document.getElementById('leftImg');
let mImgEl = document.getElementById('middleImg');
let rImgEl = document.getElementById('rightImg');

let leftImgIndex;
let middleImgIndex;
let rightImgIndex;

function ProductImage(productName) {

    this.productName = productName.split('.')[0];
    // we used the split('.') to just target the name without the path ".png"
    this.source = 'img/' + productName;
    this.clicks = 0;
    this.views = 0;
    // the initial value is zero then it will be increased each time the image clicked or viewed
    products.push(this);

    productsImagesNames.push(this.productName);
}


for (let i = 0; i < productsImages.length; i++) {
    new ProductImage(productsImages[i]);
}

function generateImage() {

    return Math.floor(Math.random() * products.length);
}
// use the random function to get the three random images

function settingItems() {

    let data = JSON.stringify(products);
    console.log(data);
    localStorage.setItem('products', data);

}
//using the settingItems function to store the data of the products array when the 25 attempts are completed (local storage)

function gettingItems() {
    let stringObj = localStorage.getItem('products');
    let normalObj = JSON.parse(stringObj);
    if (normalObj !== null) {
        products = normalObj;
    }
//using the gettingItems function to get the data which is stored in the local storage and maybe sotimes we need it at another page .
    renderImg();

}

gettingItems();

function renderImg() {
    leftImgIndex = generateImage();
    middleImgIndex = generateImage();
    rightImgIndex = generateImage();


    while (leftImgIndex === rightImgIndex || leftImgIndex === middleImgIndex || rightImgIndex === middleImgIndex || threeImages.includes(leftImgIndex) || threeImages.includes(middleImgIndex) || threeImages.includes(rightImgIndex)) {
        leftImgIndex = generateImage();
        rightImgIndex = generateImage();
        middleImgIndex = generateImage();

    }
// used this condition to generate three different images in the same attempt and three unique images in the next attempt.

    threeImages[0] = leftImgIndex;
    threeImages[1] = middleImgIndex;
    threeImages[2] = rightImgIndex;


    lImgEl.setAttribute('src', products[leftImgIndex].source);
    lImgEl.setAttribute('title', products[leftImgIndex].source);
    products[leftImgIndex].views++;

    mImgEl.setAttribute('src', products[middleImgIndex].source);
    mImgEl.setAttribute('title', products[middleImgIndex].source);
    products[middleImgIndex].views++;

    rImgEl.setAttribute('src', products[rightImgIndex].source);
    rImgEl.setAttribute('title', products[rightImgIndex].source);
    products[rightImgIndex].views++;
     // view++ will increase the view counter


    attemptsEl.textContent = attempts;
}
renderImg();

lImgEl.addEventListener('click', handelClicks);
mImgEl.addEventListener('click', handelClicks);
rImgEl.addEventListener('click', handelClicks);
//continue generating new images until we reach the maxAttempts which is 25

function handelClicks(event) {
    attempts++;
//increase the attempts counter

    if (attempts <= maxAttempts) {
        console.log(event.target.id)
        if (event.target.id === 'leftImg') {
            products[leftImgIndex].clicks++;
        } else if (event.target.id === 'rightImg') {
            products[rightImgIndex].clicks++;
        } else if (event.target.id === 'middleImg') {
            products[middleImgIndex].clicks++;
        }
// clicks++ will increase the clicks counter
        renderImg();

    } else {

        lImgEl.removeEventListener('click', handelClicks);
        mImgEl.removeEventListener('click', handelClicks);
        rImgEl.removeEventListener('click', handelClicks);
// since we finished the 25 attempt ,then stop generate images ,even when we clicked many times

        let btnEl = document.getElementById('button');
//to target the button elenment from the html page
        settingItems();
//the settingItems function is called here because the attempts "25" is reached and the results is shown so here we need to do the local storage for them

        btnEl.addEventListener('click', function clicking() {


            let ulEl = document.getElementById('results');
            let liEl;
            for (let i = 0; i < products.length; i++) {
                liEl = document.createElement('li');
                ulEl.appendChild(liEl);
                liEl.textContent = `${products[i].productName} has ${products[i].views} views and has ${products[i].clicks} clicks.`
//to create the list for the results and show it after clicking the button
                productsClicks.push(products[i].clicks);
                productsViews.push(products[i].views);

                console.log(productsClicks);
            }

            chartRender();
//use the chartRender function to view the data using the chart
            btnEl.removeEventListener('click', clicking);
//to have the results just one time,even if we clicked the button many times
        })
    }
}

function chartRender() {
    console.log(productsClicks);
    console.log(productsViews);
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productsImagesNames,
            datasets: [{
                label: '# of Clicks',
                data: productsClicks,
                backgroundColor: [
                    'rgb(218,165,32)',
                ],
                borderColor: [
                    'rgb(218,165,32)',
                ],
                borderWidth: 2
            }, {
                label: '# of Views',
                data: productsViews,
                backgroundColor: [
                    'rgba(0,0,0)',
                ],
                borderColor: [
                    'rgb(128,128,128)',
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}




















