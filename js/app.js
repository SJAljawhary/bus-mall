'use strict';



let attempts = 0;
let maxAttempts = 25;
let attemptsEl = document.getElementById('attempts');
let products = [];

let productsImagesNames = [];
let productsClicks = [];
let productsViews = [];

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
    this.source = 'img/' + productName;
    this.clicks = 0;
    this.views = 0;
    products.push(this);

    productsImagesNames.push(this.productName);
}



for (let i = 0; i < productsImages.length; i++) {
    new ProductImage(productsImages[i]);
}

function generateImage() {

    return Math.floor(Math.random() * products.length);
}




function renderImg() {
    leftImgIndex = generateImage();
    middleImgIndex = generateImage();
    rightImgIndex = generateImage();


    while (leftImgIndex === rightImgIndex || leftImgIndex === middleImgIndex || rightImgIndex === middleImgIndex || threeImages.includes(leftImgIndex) || threeImages.includes(middleImgIndex) || threeImages.includes(rightImgIndex) ){
        leftImgIndex = generateImage();
        rightImgIndex = generateImage();
        middleImgIndex = generateImage();

    }

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


 

    attemptsEl.textContent = attempts;

   

}


renderImg();

lImgEl.addEventListener('click', handelClicks);
mImgEl.addEventListener('click', handelClicks);
rImgEl.addEventListener('click', handelClicks);

function handelClicks(event) {
    attempts++;



    if (attempts <= maxAttempts) {
        console.log(event.target.id)
        if (event.target.id === 'leftImg') {
            products[leftImgIndex].clicks++;
        } else if (event.target.id === 'rightImg') {
            products[rightImgIndex].clicks++;
        } else if (event.target.id === 'middleImg') {

            products[middleImgIndex].clicks++;
        }
        renderImg();

   

    } else {

        lImgEl.removeEventListener('click', handelClicks);
        mImgEl.removeEventListener('click', handelClicks);
        rImgEl.removeEventListener('click', handelClicks);


        let btnEl = document.getElementById('button');
        

        btnEl.addEventListener('click', function clicking() 

        {

           

            let ulEl = document.getElementById('results');
            let liEl;
            for (let i = 0; i < products.length; i++) {
                liEl = document.createElement('li');
                ulEl.appendChild(liEl);
                liEl.textContent = `${products[i].productName} has ${products[i].views} views and has ${products[i].clicks} clicks.`

                productsClicks.push(products[i].clicks);
                productsViews.push(products[i].views);

            }
            chartRender();
            btnEl.removeEventListener('click', clicking); 




            }    )

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


 



   
   












