const authenticate = passport => {
  passport.authenticate("google", { scope: ["profile", "email"] });
};

const successHandler = user => {
  return {
    id: "61da66c793446e3e9f4a114f",
    googleId: "108877747181618390708",
    displayName: "anjar widiyatmoko",
    firstName: "anjar",
    lastName: "widiyatmoko",
    image:
      "https://lh3.googleusercontent.com/a-/AOh14GjD5N_b27h0bS6mE_XKAN9B4I24coM0vGbQamsm=s96-c",
    token:
      "ya29.a0ARrdaM9TDHnfqx7wAHhI1joxbYnJsDVCYIOXTjZRlE6BI2reAa2dsQ6vtpzXyjuZ-WsiNSuruCPnrFsMn-7WcrzFBIS4ib_jSbA3A7hoF_i5y_tUg5s-yykKl-cxaIIOYlZUjZWFSdOhd4YFONUSveltN_4q",
    email: "anjar.widiyatmoko@gmail.com",
    createdAt: "2022-01-09T04:38:31.961Z"
  };
};

module.exports = {
  authenticate,
  successHandler
};
