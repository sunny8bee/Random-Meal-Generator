const search = document.getElementById("search"),
  form = document.getElementById("form"),
  submit = document.getElementById("submit"),
  resultHeading = document.getElementById("resultHeading"),
  mealsEl = document.getElementById("mealsEl"),
  single_mealEl = document.getElementById("single-mealEl");

const searchMeal = async e => {
  e.preventDefault();

  const term = search.value;

  if (term.trim()) {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
    );
    const data = await response.json();

    if (data.meals === null) {
      resultHeading.innerHTML =
        "<p> 검색결과가 없습니다! 다시 시도해주세요. <p>";
    } else {
      resultHeading.innerHTML = `<h2>'${term}' 검색결과: ${data.meals.length}건</h2>`;
      mealsEl.innerHTML = data.meals
        .map(
          meal => `
      <div class="${meal.idMeal}">
        <div class="meal-info" data-mealID="${meal.idMeal}">
          <h3>${meal.strMeal}</h3> 
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
        </div>
      </div>
      `
        )
        .join("");
    }

    //Clear searchText
    search.value = "";
  } else {
    alert("검색어는 1자 이상 입력해주세요");
  }
};

form.addEventListener("submit", searchMeal);
