export const getUserInfomation = (state) => {
    const { cognitoUser } = state.auth.cognitoUser;         // cognitoUser được lưu trong state.auth
    if (cognitoUser) {
        cognitoUser.getSession((err, session) => {   // Kiểm tra session còn hoạt động không
            if (err) return;                            // Session không còn tồn tại
            if (session.isValid()) {                // Session hoạt động
                console.log('payload cognito: ', cognitoUser.signInUserSession.accessToken.payload);
                // Payload chứa các thông tin:
                // aud: "32gh8i178tatha2f01gps8k014"
                // auth_time: 1575080523
                // cognito:groups: ["import"]
                // cognito:username: "hello"
                // email: "tuyennguyenleminh@gmail.com"
                // email_verified: true
                // event_id: "606a8153-dc11-40bc-ac06-26114e3bf1c2"
                // exp: 1575084123
                // iat: 1575080523
                // iss: "https://cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_6pX9mWgjh"
                // name: "hello"
                // sub: "38b998c4-c080-4f51-a650-413a77b40966"
                // token_use: "id"
                console.log('payload cognito: ', cognitoUser.signInUserSession.accessToken.jwtToken);
                // Chứa token
            }
        });
    }
};