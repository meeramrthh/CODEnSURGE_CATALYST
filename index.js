let breakingImg = document.querySelector('#breakingImg')
let breakingNews_title = document.querySelector('#breakingNews .title')
let breakingNews_desc = document.querySelector('#breakingNews .description')
let topNews = document.querySelector('.topNews')
let sportsNews = document.querySelector('#sportsNews .newsBox')
let businessNews = document.querySelector('#businessNews .newsBox')
let techNews = document.querySelector('#techNews .newsBox')

let header = document.querySelector('.header')
let toggleMenu = document.querySelector('.bar')
let menu = document.querySelector('nav ul')

//sesarach
function displaySearchResults(articles) {
    const searchResultsDiv = document.getElementById('search-results');
    
    // Clear previous search results
    searchResultsDiv.innerHTML = '';

    if (articles.length === 0) {
        searchResultsDiv.innerHTML = '<p>No results found.</p>';
        return;
    }

    articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('newsItem');

        newsItem.innerHTML = `
            <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
            ${article.urlToImage ? `<img src="${article.urlToImage}" alt="news image">` : ''}
            <p>${article.description || 'No description available'}</p>
        `;

        searchResultsDiv.appendChild(newsItem);
    });
}

function fetchNews(query) {
    const apiKey = '8ab800fbf48241d98f4dcb324ae412c5';
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displaySearchResults(data.articles);
        })
        .catch(error => {
            console.error('Error fetching search results:', error);
            document.getElementById('search-results').innerHTML = '<p>An error occurred while fetching news.</p>';
        });
}

document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-text').value;
    if (!query) return;
    
    // Fetch new results based on search query
    fetchNews(query);
});

//search end

const toggle = (e)=>{
    toggleMenu.classList.toggle('active')
    menu.classList.toggle('activeMenu')
}

toggleMenu.addEventListener('click',toggle)



window.addEventListener('scroll',()=>{
    if(window.scrollY>50){
        header.classList.add('sticky')
    }
    else{
        header.classList.remove('sticky')
    }
    
})


// fetching news data from a website providing api
const apiKey = "8ab800fbf48241d98f4dcb324ae412c5"
const fetchData = async (category,pageSize)=>{

    const url= `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageSize}&apiKey=${apiKey}`
    const data = await fetch(url)
    const response = await data.json()
    console.log(response.articles.map(articles => articles.urlToImage));
    return response.articles
    
}
// fetchData('general',5)

//adding breaking news
const add_breakingNews = (data) => {
    if (!data || data.length === 0) {
        console.error('No breaking news data available');
        return;
    }

    // Find the first news item with both image and title
    const validNews = data.find((item) => item.urlToImage && item.title);

    if (validNews) {
        breakingImg.innerHTML = `<img src=${validNews.urlToImage} alt="image">`;
        breakingNews_title.innerHTML = `<a href="${validNews.url}" target="_blank"><h2>${validNews.title}</h2></a>`;
        breakingNews_desc.innerHTML = `${validNews.description}`;
    } else {
        // If no valid news found, find the first news item with at least a title
        const fallbackNews = data.find((item) => item.title);

        if (fallbackNews) {
            breakingImg.innerHTML = '<p>Image not available.</p>'; // Display a placeholder image or message
            breakingNews_title.innerHTML = `<a href="${fallbackNews.url}" target="_blank"><h2>${fallbackNews.title}</h2></a>`;
            breakingNews_desc.innerHTML = `${fallbackNews.description}`;
        } else {
            // Handle case where no news items meet the criteria
            breakingImg.innerHTML = '<p>No breaking news available.</p>';
            breakingNews_title.innerHTML = 'No title available';
            breakingNews_desc.innerHTML = 'Description not available.';
        }
    }
};

fetchData('general', 5).then(add_breakingNews).catch((error) => {
    console.error('Error fetching data:', error);
    // Handle error gracefully (e.g., display an error message)
    breakingImg.innerHTML = '<p>An error occurred while fetching news.</p>';
    breakingNews_title.innerHTML = 'Error loading title';
    breakingNews_desc.innerHTML = 'Error loading description';
});





const add_topNews = (data) => {
    if (!data || data.length === 0) {
        console.error('No top news data available');
        return;
    }

    let html = '';
    let title = '';

    data.forEach((element) => {
        if (!element.title || element.title.length < 100) {
            title = element.title || 'No Title Available';
        } else {
            title = element.title.slice(0, 100) + '...';
        }

        // Check if both image and title are available
        if (element.urlToImage && element.title) {
            html += `<div class="news">
                <div class="img">
                    <img src=${element.urlToImage} alt="image">
                </div>
                <div class="text">
                    <div class="title">
                        <a href=${element.url} target="_blank"><p>${title}</p></a>
                    </div>
                </div>
            </div>`;
        }
    });

    topNews.innerHTML = html;
};

fetchData('general', 20).then(add_topNews).catch((error) => {
    console.error('Error fetching data:', error);
    // Handle error gracefully (e.g., display an error message)
    topNews.innerHTML = '<p>An error occurred while fetching news.</p>';
});


// const add_sportsNews = (data) => {
//     let html = '';
//     let title = '';

//     data.forEach((element) => {
//         if (!element.title || element.title.length < 100) {
//             title = element.title || 'No Title Available';
//         } else {
//             title = element.title.slice(0, 100) + '...';
//         }

//         // Check if both image and title are available
//         if (element.urlToImage && element.title) {
//             html += `<div class="newsCard">
//                 <div class="img">
//                     <img src=${element.urlToImage} alt="image">
//                 </div>
//                 <div class="text">
//                     <div class="title">
//                         <a href=${element.url} target="_blank"><p>${title}</p></a>
//                     </div>
//                 </div>
//             </div>`;
//         }
//     });

//     sportsNews.innerHTML = html;
// };

// fetchData('sports', 10).then(add_sportsNews).catch((error) => {
//     console.error('Error fetching data:', error);
//     // Handle error gracefully (e.g., display an error message)
//     sportsNews.innerHTML = '<p>An error occurred while fetching news.</p>';
// });

//tech
const add_techNews = (data) => {
    let html = '';
    let title = '';

    data.forEach((element) => {
        if (!element.title || element.title.length < 100) {
            title = element.title || 'No Title Available';
        } else {
            title = element.title.slice(0, 100) + '...';
        }

        // Check if both image and title are available
        if (element.urlToImage && element.title) {
            html += `<div class="newsCard">
                <div class="img">
                    <img src=${element.urlToImage} alt="image">
                </div>
                <div class="text">
                    <div class="title">
                        <a href=${element.url} target="_blank"><p>${title}</p></a>
                    </div>
                </div>
            </div>`;
        }
    });

    techNews.innerHTML = html;
};

fetchData('technology', 20).then(add_techNews).catch((error) => {
    console.error('Error fetching data:', error);
    // Handle error gracefully (e.g., display an error message)
    techNews.innerHTML = '<p>An error occurred while fetching news.</p>';
});

//business
const add_businessNews = (data) => {
    let html = '';
    let title = '';

    data.forEach((element) => {
        if (!element.title || element.title.length < 100) {
            title = element.title || 'No Title Available';
        } else {
            title = element.title.slice(0, 100) + '...';
        }

        // Check if both image and title are available
        if (element.urlToImage && element.title) {
            html += `<div class="newsCard">
                <div class="img">
                    <img src=${element.urlToImage} alt="image">
                </div>
                <div class="text">
                    <div class="title">
                        <a href=${element.url} target="_blank"><p>${title}</p></a>
                    </div>
                </div>
            </div>`;
        }
    });

    businessNews.innerHTML = html;
};

fetchData('business', 15).then(add_businessNews).catch((error) => {
    console.error('Error fetching data:', error);
    // Handle error gracefully (e.g., display an error message)
    businessNews.innerHTML = '<p>An error occurred while fetching news.</p>';
});

//time
function updateClock() {
    const now = new Date();
    const options = { timeZone: 'Asia/Kolkata', hour12: false }; // Adjust timezone as needed
    const formattedTime = now.toLocaleString('en-US', options);
  
    const timeElement = document.getElementById('live-time');
    timeElement.textContent = formattedTime;
  }
  
  setInterval(updateClock, 1000); // Update every second

  const emailInput = document.getElementById('email-input');
const subscribeButton = document.getElementById('subscribe-button');

subscribeButton.addEventListener('click', handleSubscription);

function handleSubscription() {
  const email = emailInput.value;

  // Validate the email address
  if (!isValidEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Handle the subscription process (e.g., send an email, update database)
  // Replace this with your actual subscription logic
  console.log('Email subscribed:', email);

  // Clear the input field and provide feedback to the user
  emailInput.value = '';
  alert('Thank you for subscribing!');
}


function isValidEmail(email) {
  // Implement your email validation logic here
  // For a basic check, you can use a regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

//theme
var icon = document.getElementById("icon");
        icon.onclick = function(){
            document.body.classList.toggle("lightmode");
        }
        

  //search
 