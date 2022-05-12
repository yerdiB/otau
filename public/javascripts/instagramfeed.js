// Invoke this function on button click or whatever other use case
function setupInsta(){
    let appId = "XXXXXXXXXXXXXX";
    let redUri = window.location.origin + "/insta";
    let url = `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redUri}&scope=user_profile,user_media&response_type=code`;
    window.open(url, "_blank").focus();
}