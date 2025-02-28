const apikey = '221d40d36b4a41a4b41a37448ff0923b';

const blogContainer = document.getElementById('blog-container');

const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomNews(){
    try{
        const apiURL = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apikey=${apikey}`;
        const response = await fetch(apiURL);
        const data = await response.json();//converting to JSON 
        //console.log(data);
        return data.articles;  //articles is predefined

    }
    catch(error){
        console.error("Error fetching random news",error);
        return [];
    }
}


searchButton.addEventListener("click",async()=>{
    const query = searchField.value.trim();

    if(query!=""){
        try{
            const articles = await fetchNewsQuery(query)
            displayBlogs(articles);
        }catch(error){
            console.log("Error fetching news by query",error);
        }
    }
})

async function fetchNewsQuery(query){
    try{
        const apiURL = `https://newsapi.org/v2/everything?q=${query}&pageSize=30&apiKey=${apikey}`;
        const response = await fetch(apiURL);
        const data = await response.json();//converting to JSON 
        //console.log(data);
        return data.articles;  //articles is predefined

    }
    catch(error){
        console.error("Error fetching random news",error);
        return [];
    }
}



function displayBlogs(articles){
    blogContainer.innerHTML="";
    articles.forEach((article)=>{
        const blogCard=document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        const title =document.createElement("h2");
        title.textContent = article.title; 
        const description = document.createElement("p");
        description.textContent = article.description;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);

        blogCard.addEventListener("click",()=>{
            window.open(article.url,"_blank");
        })
    
        blogContainer.appendChild(blogCard);
    });
}


(async ()=>{
    try{
       const articles =  await fetchRandomNews();
       displayBlogs(articles);

    }
    catch(error){
        console.error("Error fetching random news",error);
    }
})

(); //calling














/* 
{
  "status": "ok",
  "totalResults": 100,
  "articles": [ 
    {
      "source": { "id": "cnn", "name": "CNN" },
      "author": "John Doe",
      "title": "Breaking News: Market Hits Record High",
      "description": "Stock market reaches a record high today.",
      "url": "https://cnn.com/news1",
      "urlToImage": "https://cnn.com/image1.jpg",
      "publishedAt": "2025-02-28T12:00:00Z"
    },
    {
      "source": { "id": "bbc", "name": "BBC News" },
      "author": "Jane Smith",
      "title": "New Technology Advancements",
      "description": "AI and machine learning are evolving rapidly.",
      "url": "https://bbc.com/news2",
      "urlToImage": "https://bbc.com/image2.jpg",
      "publishedAt": "2025-02-28T14:00:00Z"
    }
  ]
}

*/