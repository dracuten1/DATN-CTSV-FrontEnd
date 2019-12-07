var cognitoUser, sessionUserAttributes; // global variables to handle completeNewPasswordChallenge flow
 
// ...

cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
        // User authentication was successful
    },

    onFailure: function(err) {
        // User authentication was not successful
    },

    mfaRequired: function(codeDeliveryDetails) {
        // MFA is required to complete user authentication.
        // Get the code from user and call
        cognitoUser.sendMFACode(mfaCode, this)
    },

    newPasswordRequired: function(userAttributes, requiredAttributes) {
        // User was signed up by an admin and must provide new
        // password and required attributes, if any, to complete
        // authentication.

        // the api doesn't accept this field back
        delete userAttributes.email_verified;

        // store userAttributes on global variable
        sessionUserAttributes = userAttributes;
    }
});

// ... handle new password flow on your app
handleNewPassword(newPassword) {
  cognitoUser.completeNewPasswordChallenge(newPassword, sessionUserAttributes);
}