
const loadPosts = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts#`);
    const data = await res.json();
    const posts = data.posts;
    displayPosts(posts)
}
const searchedPosts = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${id}`);
    const data = await res.json();
    const posts =data.posts
    showSearchResult(posts)
}


const displayPosts = (posts) => {
    const postsContainer = document.getElementById('let-discuss-cards');
    posts.forEach(item => {
        const div = document.createElement('div');
        div.classList ='flex border-2 border-green-400 rounded-xl h-70 p-4 lg:p-10 mb-5'
        div.innerHTML = `

        <div class="h-10 w-16">
            <img class="relative rounded-xl" src="${item.image}" alt="">
            <div class="absolute -mt-12 lg:-mt-16 ml-10 lg:ml-14 rounded-full ${item.isActive ? ' bg-green-600' : 'bg-red-600'} w-3 h-3"></div>
        </div>

        <div class="">
            <div class="flex gap-2 lg:gap-5 ml-4 lg:ml-8 text-lg">
                <div class="">
                    <p># <span>${item.category}</span></p>
                </div>
                <div class="">
                    <p>
                        Author : <span>${item.author.name}</span>
                    </p>
                </div>
            </div>
            <p class="mt-3 ml-4 lg:ml-8 text-xl font-bold">
                <span>
                    ${item.title}
                </span>
            </p>
            <p class="mt-3 ml-4 lg:ml-8 text-base text-slate-400 mb-6">
                ${item.description}
            </p>
            <hr class="ml-4 lg:ml-8 border-dashed  border-2 border-slate-400 mb-8">

            <div class=" flex justify-between ml-4 lg:ml-8 text-xl">
                <div class="flex items-center gap-2 lg:gap-6">
                    <i class="fa-solid fa-comment"></i>
                    <p class="">${item.comment_count}</p>

                    <i class="fa-solid fa-eye"></i>
                    <p class="">${item.view_count}</p>

                    <i class="fa-regular fa-clock"></i>
                    <p class="">${item.posted_time} <span>min</span></p>
                </div>


                <div onclick="markResult('${item.title}',${item.view_count})" id="email-icon" class="email-icon rounded-full bg-[#10B981] w-10 h-10">
                    <i class="fa-solid fa-envelope ml-[10px] mt-3"></i>
                </div>
            </div>

        </div>
        `

        postsContainer.appendChild(div)

    });
 };


 const toggleSpinner = (isLoading ) => {
    const loaderSection = document.getElementById('loading-spinner');
    if(isLoading){
        loaderSection.classList.remove('hidden');
    }
    else{
        loaderSection.classList.add('hidden');
    }

}
const handleSearch = () => {
    toggleSpinner(true);

    const inputField = document.getElementById('search-box');
    const inputText = inputField.value;
    
    handleSearchTimeout = setTimeout(() => {
        searchedPosts(inputText);
    }, 2000);
};
const showSearchResult = (posts) => {
    const postsContainer = document.getElementById('let-discuss-cards');
    postsContainer.textContent = "";
    
    displayPosts(posts);
    toggleSpinner(false);


};


loadPosts();

let count = 0;
const markResult = (title, view_count) => {
    count++;
    const markCount = document.getElementById('seat-count');
    markCount.innerText = count;
    const markTitle = document.getElementById('shoCard');
    const div = document.createElement('div');
    div.classList = "flex justify-between p-3 bg-white mb-5 rounded-2xl"
    div.innerHTML = `
    
    <div>
       <span>
            ${title}
       </span>
    </div>
    <div class="flex gap-3 items-center">
        <i class="fa-solid fa-eye"></i>
        <p class="">${view_count}</p>
    </div>
    `
    markTitle.appendChild(div);

}



const showAllCards = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    const posts = data;
    // console.log(posts);

    const cardContainer = document.getElementById('card-container');
    posts.forEach((cards) => {
        // console.log(cards);

        const div = document.createElement('div');

        div.innerHTML = `
        <div class="p-4 ml-5 lg:ml-0 card w-96 bg-base-100 shadow-xl">
        <figure><img class="rounded-2xl" src="${cards.cover_image}" alt="Shoes" /></figure>
        <div class="card-body">
            <div class="flex gap-3 items-center text-slate-400">
                <i class="fa-solid fa-calendar-days"></i>
                <p>
                    <span>
                        ${cards.author.posted_date || 'No Publish Date'}
                    </span>
                </p>
            </div>
          <h2 class="card-title font-bold text-lg mt-2">
            ${cards.title}
          </h2>
          <p class="mt-2">
            ${cards.description}
          </p>


          <div class="flex  gap-4">
            <div class="h-8 w-14 mt-4">
                <img class="relative rounded-full" src="${cards.profile_image}" alt="">
            </div>
            <div class="pt-6">
                <p class="font-bold">
                    ${cards.author.name}
                </p>
                <p class="text-slate-400">
                    ${cards.author.designation || 'Unknown'}
                </p>
            </div>

          </div>
        </div>
      </div>
        `
        cardContainer.appendChild(div);

    });
}

showAllCards();

