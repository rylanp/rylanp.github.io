OkHttpClient client = new OkHttpClient().newBuilder()
    .build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "{\"from\":{\"email\":\"mailtrap@rylanpaul.com\",\"name\":\"Mailtrap Test\"},\"to\":[{\"email\":\"rylan21paul@gmail.com\"}],\"subject\":\"You are awesome!\",\"text\":\"Congrats for sending test email with Mailtrap!\",\"category\":\"Integration Test\"}");
Request request = new Request.Builder()
    .url("https://send.api.mailtrap.io/api/send")
    .method("POST", body)
    .addHeader("Authorization", "Bearer 0a89fa48f2de962c77e8d71d0323185b")
    .addHeader("Content-Type", "application/json")
    .build();
Response response = client.newCall(request).execute();

var fields = {}
document.addEventListener("DOMContentLoaded", function(){
    fields.name = document.getElementById("name");
    fields.email = document.getElementById("email");
    fields.message = document.getElementById("message");
})

function isNotEmpty(value) {
    if (value == null || typeof value == 'undefined' ) return false;
    return (value.length > 0);
   }
function isEmail(email) {
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(String(email).toLowerCase());
}

function fieldValidation(field, validationFunction) {
    if (field == null) return false;

    let isFieldValid = validationFunction(field.value)
    if (!isFieldValid) {
        field.className = 'placeholderRed';
    } else {
        field.className = '';
    }

    return isFieldValid;
}

function isValid() {
    var valid = true;
    
    valid &= fieldValidation(fields.name, isNotEmpty);
    valid &= fieldValidation(fields.message, isNotEmpty);
    valid &= fieldValidation(fields.email, isEmail);
   
    return valid;
}
class User {
    constructor(name, email, message) {
        this.name = name;
        this.email = email;
        this.message = message;
    }
}
function sendContact(){
    if (isValid()) {
        let usr = new User(fields.name.value,  fields.email.value, fields.message.value);
        alert(usr.name + ', thanks for the feedback!')
        sendEmail(usr)
    }else{
        alert('Error submitting feedback')
    }
}
function sendEmail(user){
    alert("u")
}

