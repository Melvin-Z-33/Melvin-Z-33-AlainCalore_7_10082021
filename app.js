/* eslint-disable */
const searchInput = document.getElementById('search');
const results = document.getElementById('result-cards');

let bookOfRecipes;
let searchTerm = '';

//JSON REQUEST
const fetchRecipes = async () => {
	bookOfRecipes = await fetch('./recipes.json').then((res) => res.json());
};

//DISPLAY GENERAL INFO

// const showAllRecipes = async () => {
// 	await fetchRecipes();
// 	let displayRecipes = [];
// 	let arrayForIngredients = [];

// 	for (recipe of bookOfRecipes.recipes) {
// 		for (objet of recipe.ingredients) {
// 			if (
// 				objet.hasOwnProperty('ingredient') &&
// 				objet.hasOwnProperty('quantity') &&
// 				objet.hasOwnProperty('unit')
// 			) {
// 				arrayForIngredients.push(
// 					`<div>${objet.ingredient} : ${objet.quantity} ${objet.unit}</div> `,
// 				);
// 			} else if (objet.hasOwnProperty('ingredient') && objet.hasOwnProperty('quantity')) {
// 				arrayForIngredients.push(`<div>${objet.ingredient} : ${objet.quantity} </div> `);
// 			} else if (objet.hasOwnProperty('ingredient')) {
// 				arrayForIngredients.push(`<div>${objet.ingredient}  </div> `);
// 			}
// 		}

// 		let a = `
// 			<div class="card col-md-4 mb-6 text center ">
// 				<img class="" src="http://via.placeholder.com/10">
// 				<div class="card-body container">
// 					<div class=" justify-content-between">
// 						<h2 class="card-title lato-bold col-8">${recipe.name}</h2>
// 						<p class="card-timer lato-bold col-4 text-end"><i class="far fa-clock"></i> ${recipe.time} min</p>
// 						<div class="card-ingredient col-6">
// 							<p class='text-justify '>${arrayForIngredients.join('')}</p>
// 						</div>
// 						<div class="card-text col-6 text-start text-wrap">
// 							<p>${recipe.description}</p>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 			`;
// 		results.insertAdjacentHTML('beforeend', a);
// 		arrayForIngredients = [];
// 		a = '';
// 	}
// };

//showAllRecipes();
//SEARCH GENERAL
const searchRecipes = async () => {
	await fetchRecipes();

	let arrayIngredients = [``];
	let pieces;
	results.innerHTML = bookOfRecipes.recipes
		.filter((recipe) => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()))

		.map((recipe) => {
			let foo = '';
			for (ing of recipe.ingredients) {
				if (
					ing.hasOwnProperty('ingredient') &&
					ing.hasOwnProperty('quantity') &&
					ing.hasOwnProperty('unit')
				) {
					foo += `<p><span class="lato-bold">${ing.ingredient}</span> : ${ing.quantity} ${ing.unit}</p> `;
				} else if (ing.hasOwnProperty('ingredient') && ing.hasOwnProperty('quantity')) {
					foo += `<p><span class="lato-bold">${ing.ingredient}</span> : ${ing.quantity} </p> `;
				} else if (ing.hasOwnProperty('ingredient')) {
					foo += `<p><span class="lato-bold">${ing.ingredient}</span>  </p> `;
				}
			}

			return `
			<div class="card  col-sm-12 col-md-3 mx-4 ">
					<img class="" alt="" src="http://via.placeholder.com/10">

				<div class="card-body container">
					<div class="row justify-content-between">
						<h2  class="card-title lato-bold text-hidden col-8">${recipe.name}</h2>
						<p class="card-timer lato-bold col-4 text-end"><i class="far fa-clock"></i> ${recipe.time} min</p>
						<div class="card-ingredient  col-6">${foo}</div>
						<div class="card-text   col-6 text-start ">
							<p class=" description lato-regular ">${recipe.description}</p>
						</div>
					</div>
				</div>
			</div>
				`;
		})
		.join('');
};

//INPUT SETUP
searchInput.addEventListener('input', (e) => {
	searchTerm = e.target.value;
	searchRecipes();
});
searchRecipes();

//** DROPDOWN */
const comboIngredient = document.getElementById('combo-ingredient');

const ingredients = async () => {
	await fetchRecipes();
	console.log(bookOfRecipes.recipes);
	let tab = [];
	for (let recipe of bookOfRecipes.recipes) {
		for (let ingredient of recipe.ingredients) {
			console.log(ingredient.ingredient);
		}
	}
};
comboIngredient.insertAdjacentHTML('beforeend', 'ff');

ingredients();
