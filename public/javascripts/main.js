
var boho = {
    name:"Boho",
    id:"1",
    description:"",
    price:"3000tg"
};
$("#boho").html(boho.name + " curtains can keep the sunlight out while bringing in warmth and style, bathing your room in ocean-inspired colors. Price for meter: " + boho.price);
var buffalo = {
    name:"Buffalo",
    id:"1",
    description:"",
    price:"3500tg"
};
$("#buffalo").html(buffalo.name + " checks are a timeless pattern that lends a bold yet casual touch to just about any room in your home. Price for meter: " + buffalo.price);
var cotton = {
    name:"Cotton",
    id:"1",
    description:"",
    price:"2500tg"
};
$("#cotton").html(cotton.name + " is a versatile fabric used to achieve a range of styles. It offers a crisp, clean feel that suits traditional or modern styles. Price for meter: " + cotton.price);
var lenda = {
    name:"Lenda",
    id:"1",
    description:"",
    price:"2800tg"
};
$("#lenda").html(lenda.name + " curtain provides privacy while letting light pass through, helping to block glare on screens. Price for meter: " + lenda.price);
var luxury = {
    name:"Luxury",
    id:"1",
    description:"",
    price:"3800tg"
};
$("#luxury").html(luxury.name + " makers specialise in bespoke curtains and blinds. Our luxury soft furnishings are available online and throughout the QR. Price for meter: " + luxury.price);
var linen = {
    name:"Linen",
    id:"1",
    description:"",
    price:"3300tg"
};
$("#linen").html(linen.name + " is a classic fabric for evoking comfort and luxury. This is especially the case with linen curtains, which tend to drape beautifully. Price for meter: " + linen.price);
var siam = {
    name:"Siam",
    id:"1",
    description:"",
    price:"2200tg"
};
$("#siam").html(siam.name + " curtain, in interior design, decorative fabric commonly hung to regulate the admission of light at windows and to prevent drafts from door or window openings. Price for meter: " + siam.price);
var window = {
    name:"Window",
    id:"1",
    description:"",
    price:"2300tg"
};
$("#window").html("Adorn your windows with the beautiful brand new curtains " + window.name + ". Price for meter: " + window.price);
$(document).ready(function() {
    $('#preloader').fadeOut(400);
});
function selectColor() {
    $("#myDropdown").toggleClass("show");
  };
$("#red").addEventListener("click", changeToRed());
function changeToRed() {
    $("#mainImage").attr("src","./images/redVelvet.jpg");
    $("#myAudio").play();
};
$("#blue").addEventListener("click", changeToBlue());
function changeToBlue() {
    $("#mainImage").attr("src","./images/blueVelvet.jpg");
    $("#myAudio").play();
};
$("#black").addEventListener("click", changeToBlack());
function changeToBlack() {
    $("#mainImage").attr("src","./images/blackVelvet.jpg");
    $("#myAudio").play();
};
$("i").addEventListener( "mouseover",function(){
    $(this).css("color", "black")
});
