const forgetPassword = document.getElementById("forget-password-form");
const emailAddress = document.getElementById("username-forget");
const oldPassword = document.getElementById("old-password-forget");
const newPassword = document.getElementById("new-password-forget");
const confirmPassword = document.getElementById("new-confirm-password-forget");


forgetPassword.addEventListener("submit",function (e){
    const emailAddressValue = emailAddress.value;
    const oldPasswordValue = oldPassword.value;
    const newPasswordValue = newPassword.value;
    const confirmPasswordValue = confirmPassword.value;
    
    e.preventDefault();
    
    const id = localStorage.getItem("id");
	const data = getUserData();
	let userId = data.find((u) => u.id == id);

    if (userId['username'] != emailAddressValue) {
        alert("The Entered Email Doesn't exists in our Record");
        return
    } else
    if (userId['password'] != oldPasswordValue ) {
        alert("Please Enter your Old Password Correctly");
        return
    } else
    if (userId['password'] == newPasswordValue ) {
        alert("New Password Cannot be same as Old Password");
        return
    } else
    if(newPasswordValue == confirmPasswordValue){
        userId['password'] = confirmPasswordValue
        const indexOfUser = data.indexOf(userId);
        data.splice(indexOfUser, 1);
        data.push(userId);
        setUserData(data);
        alert("Hurray! Password Changed Successfully")
    }
    window.location.href = "/index.html"; 
});