function getFood() {

  item = document.getElementById('get_item').value;
  let apiURL = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${item}&action=process&json=1`;
  axios.get(apiURL).then(showResults);

}

let form = document.querySelector("#go");
form.addEventListener("click", getFood);

let itemCounter = 1;
let functionCounter = 5;
const itemNamesAll = [];
const itemKcalAll = [];

function showResults(response) {


  console.log(response.data);
  for (let i = 0; i < functionCounter; i++) {
    itemIcon = response.data.products[i].image_front_small_url;
    itemName = response.data.products[i]["product_name"];
    itemNamesAll.push(itemName);
    itemKcal = response.data.products[i]["nutriments"]["energy-kcal"];
    if (itemName) {
      if (itemIcon) {

        getNameTag = "#itemName" + (itemCounter);
        getKcalTag = "#itemKcal" + (itemCounter);
        getIconTag = "#itemIcon" + (itemCounter);

        change_text = document.querySelector(getNameTag);
        change_text.innerHTML = itemName;

        if (itemKcal)

        {
          change_kcal = document.querySelector(getKcalTag);
          change_kcal.innerHTML = `${Math.round(itemKcal)} kcal pro 100g`;
          itemKcalAll.push(itemKcal);
        } else

        {
          change_kcal = document.querySelector(getKcalTag);
          change_kcal.innerHTML = `keine Kalorienangabe.`;
        }
        change_icon = document.querySelector(getIconTag);
        change_icon.src = `${itemIcon}`;

        itemCounter++;

      } else {
        functionCounter++;
      }
    } else {
      functionCounter++;
    }
  }

}

let buttonID = "";
let valueItem = "";


async function test(clicked_id) {

  buttonID = clicked_id;

  valueItem = prompt("Gib die Menge in Gramm an.");
  console.log(buttonID);


  // console.log(new Date() + ": " + valueItem + " Gramm " + itemNamesAll[buttonID.slice(10)] + " hinzugefügt.");
  console.log(itemNamesAll[buttonID.slice(10)] + ", " + valueItem + ", " + itemKcalAll[buttonID.slice(10)]);
  console.log(itemNamesAll);
  console.log(itemKcalAll);

  const {
    data
  } = await axios.post("https://strapi.blackbox.ms/Testinputs", {
    Date: new Date(),
    Name: itemNamesAll[buttonID.slice(10)],
    Value: valueItem,
    Kcal: itemKcalAll[buttonID.slice(10)],
  });

}