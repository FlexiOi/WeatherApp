form.addEventListener("click", fadein_popup);
resetVendor();


// pop up

let popup_timeout = false;
var popup = document.querySelector(".popuptext");

let doc_hide_popup = document.querySelector("#id_hide_popup");
doc_hide_popup.addEventListener("click", hide_popup);

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function fadein_popup() {
    if (popup_timeout === false) {

        await delay(1000);
        console.log("popup einschalten: (vorher)" + popup_timeout);
        popup_timeout = true;
        console.log("popup einschalten: (nachher)" + popup_timeout);
        popup.classList.toggle("fadeIn1");
    } else {
        console.log("is zu!");
    }
}


async function resetVendor() {
    popup = document.querySelector(".popuptext");
    await delay(500);
    popup.classList.toggle("fadeIn1");
    console.log("an");
    await delay(5);
    popup.classList.toggle("fadeIn1");
    console.log("aus");

}


function hide_popup() {

    console.log("popup ausschalten");
    popup.classList.toggle("fadeIn1");
    popup_timeout = false;
    resetVendor();

}