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

// initial loading data
getData("Potato");

// Load data by clicking menu
bindEvent(
  (e) => {
    const searchTerm = e.target.innerText.trim();
    console.log(searchTerm);
    getData(searchTerm);
    links.forEach((link) => {
      link.classList.remove("active");
    });
    e.target.classList.add("active");
    e.target.href = "#sectionFood";
  },
  "click",
  links
);

// get data from api function
function getData(search) {
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
    })
    .catch((error) => {
      return { status: "failed", items: [] };
    });
}

// Populating data on list
const loadList = (data) => {
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
                  class="bg-secondary text-white px-4 py-2 rounded-md max-w-1/5" onclick="showDetails(${item.idMeal})"
                >
                  show Details
                </button>
              </div>
            </div>`;
  });
  listContainer.innerHTML = childItem;
};

// Show detail click event
const showDetails = (id) => {
  getDataById(id);
};

function getDataById(id) {
  let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      loadDataDetails(data.meals);
    })
    .catch((error) => {
      return { status: "failed", items: [] };
    });
}

const loadDataDetails = (data) => {
  debugger;
  data = data[0];
  let modal = document.querySelector("#my_modal_1");
  modal.innerHTML = "";
  let dataDetails = ``;
  dataDetails += `<div class="modal-box">
        <h3 class="text-xl font-bold">${data.strMeal}</h3>
        <div class="flex flex-row gap-3 items-center mt-2">
          <img
            class="size-40 rounded-lg shadow-sm"
            src=${data.strMealThumb}
            alt=""
          />
          <div>
            <p class="text-lg">
              <span class="font-semibold">Category: </span>${data.strCategory}
            </p>
            <p class="font-Lobster font-extralight">
              <span class="font-semibold">Ingridients: </span>${
                data.strIngredient1
              }, ${data.strIngredient2}, ${data.strIngredient3}, ${
    data.strIngredient4
  }, ${data.strIngredient5}
            </p>
            <div>
              <a href=${data.strYoutube}
                ><i class="fa-brands fa-youtube"></i
              ></a>
              <a
                href=${data.strSource ? data.strSource : ""}
                ><i class="fa-brands fa-sourcetree"></i
              ></a>
            </div>
          </div>
        </div>

        <p class="py-4">
        ${
          data.strInstructions.length > 100
            ? data.strInstructions.slice(0, 100)
            : data.strInstructions
        }
        </p>
        <div class="modal-action">
          <form method="dialog">
            <button
              class="btn bg-primary text-white border-none hover:bg-secondary"
            >
              Close
            </button>
          </form>
        </div>
      </div>`;

  modal.innerHTML = dataDetails;
  modal.showModal();
};
