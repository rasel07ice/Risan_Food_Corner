// toggle button
const navMenu = document.querySelector("#nav-menu");
const navLink = document.querySelectorAll(".nav-link");
const hamburger = document.querySelector("#hamburger");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("left-[0]");
  hamburger.classList.toggle("fa-xmark");
});

navLink.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.toggle("left-[0]");
    hamburger.classList.toggle("fa-xmark");
  });
});

//Swiper Carosel

const swiper = new Swiper(".swiper", {
  // Optional parameters
  speed: 400,
  spaceBetween: 30,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  grabcursor: true,
  // breakpoints: {
  //   640: {
  //     slidesPerView: 1,
  //   },
  //   768: {
  //     slidesPerView: 2,
  //   },
  //   1024: {
  //     slidesPerView: 3,
  //   },
  // },
});

let links = document.querySelectorAll(".nav-link");

//Common Function
function bindEvent(callback, eventType, targets) {
  targets.forEach(function (target) {
    target.addEventListener(eventType, callback);
  });
}

getData("Potato");

bindEvent(
  (e) => {
    const searchTerm = e.target.innerText.trim();
    console.log(searchTerm);
    getData(searchTerm);
    links.forEach((link) => {
      link.classList.remove("active");
    });
    e.target.classList.add("active");
    // e.target.href = "#sectionFood";

  },
  "click",
  links
);

// btnSearch.addEventListener("click", function () {
//   getData(inpSearch.value);
// });

function getData(search) {
  debugger;
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      loadList(data.meals);
      // localStorage.setItem('items', JSON.stringify(data.meals))
      // console.log(typeof localStorage.getItem('items'));
    })
    .catch((error) => {
      return { status: "failed", items: [] };
    });
}

const loadList = (data) => {
  debugger;
  let listContainer = document.querySelector("#list-container");
  let childItem = ``;

  data.map((item) => {
    childItem += ` <div
              class="grid row-span-4 grid-rows-subgrid shadow-md border border-gray-200 rounded-md pb-6"
            >
              <div class="p-3">
                <img
                  class="w-full bg-cover rounded-md"
                  src=${item.strMealThumb}
                  alt="meal"
                />
              </div>

              <div class="flex justify-between px-3">
                <p class="text-lg font-semibold">${item.strMeal}</p>
                <p>
                  <i class="fa-regular fa-star"></i>
                </p>
              </div>
              <p
                class="text-lg leading-4 *: font-light justify-self-start px-3"
              >
                Lorem ipsum dolor sit. Lorem ipsum dolor sit amet.
              </p>
              <div class="text-center mt-5 px-3">
                <button
                  class="bg-secondary text-white px-4 py-2 rounded-md max-w-1/5"
                >
                  show Details
                </button>
              </div>
            </div>`;
  });
  listContainer.innerHTML = childItem;
};
