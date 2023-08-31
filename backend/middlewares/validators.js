const { body, checkSchema, validationResult } = require("express-validator");

module.exports.validateEmail = body("email").isEmail().normalizeEmail().withMessage("Please enter a valid email address.")

module.exports.validateName = body("name").isLength({min: 1, max: 50}).withMessage("Please enter a valid name.")

module.exports.validatePassword = body("password").isLength({min:8}).trim().withMessage("The password has to be at least 8 character long.");

module.exports.validationResult = validationResult;

module.exports.checkBio = checkSchema({
    email: {
        isEmail: true,
        errorMessage: 'Email address error',
    },
    gender: {
        custom: {
            options: val => {
                return (val == "Male" || val == "Female" ||
                    val == "Other" || val == "Prefer not to say");
            }
        },
        errorMessage: 'Gender field error',
    },
    majors: {
        custom: {
            options: val => {
                console.log(val);
                return (val instanceof Array);
            }
        },
        errorMessage: 'Majors field error',
    },
    year: {
        custom: {
            options: val => {
                return (val == "Freshman" || val == "Sophomore" ||
                    val == "Junior" || val == "Senior");
            }
        },
        errorMessage: 'Year field error',
    },
    extroversion: {
        isInt: true,
        errorMessage: 'Extroversion field error',
    },
    cleanliness: {
        isInt: true,
        errorMessage: 'Cleanliness field error',
    },
    noise: {
        in: ['body'],
        errorMessage: 'Noise field empty',
    },
    sleep: {
        optional: true,
        custom: {
            options: value => {
                return (Number.isInteger(value.start) && Number.isInteger(value.end));
            }
        },
        errorMessage: 'Sleep field error',
    },
    guests: {
        optional: true,
        isInt: true,
    },
    dorm: {
        optional: true,
        custom: {
            options: val => {
                return (val instanceof Array);
            }
        },
    },
    greek: {
        isInt: true,
        optional: true,
    },
    smoke: {
        optional: true,
        custom: {
            options: val => {
                return (val == "Never" || val == "Socially" ||
                    val == "Yes");
            }
        },
    },
    drink: {
        optional: true,
        custom: {
            options: val => {
                return (val == "Never" || val == "Socially" ||
                    val == "Yes");
            }
        },
    },
    hobbies: {
        optional: true,
        custom: {
            options: val => {
                return (val instanceof Array);
            }
        },
    },
    hometown: {
        optional: true,
    },
    music: {
        optional: true,
        custom: {
            options: val => {
                return (val instanceof Array);
            }
        },
    },
    shows: {
        optional: true,
        custom: {
            options: val => {
                return (val instanceof Array);
            }
        },
    },
    pictures: {
        optional: true,
        custom: {
            options: val => {
                return (val instanceof Array);
            }
        },
    },
    instagram: {
        optional: true,
    }
});

module.exports.updateBio = checkSchema({
    email: {
        isEmail: true,
        errorMessage: 'Email address error',
    },
    gender: {
        optional: true,
        custom: {
            options: val => {
                return (val == "Male" || val == "Female" ||
                    val == "Other" || val == "Prefer not to say");
            }
        },
        errorMessage: 'Gender field error',
    },
    majors: {
        optional: true,
        custom: {
            options: val => {
                console.log(val);
                return (val instanceof Array);
            }
        },
        errorMessage: 'Majors field error',
    },
    year: {
        optional: true,
        custom: {
            options: val => {
                return (val == "Freshman" || val == "Sophomore" ||
                    val == "Junior" || val == "Senior");
            }
        },
        errorMessage: 'Year field error',

    },
    extroversion: {
        optional: true,
        isInt: true,
        errorMessage: 'Extroversion field error',
    },
    cleanliness: {
        optional: true,
        isInt: true,
        errorMessage: 'Cleanliness field error',
    },
    noise: {
        optional: true,
        in: ['body'],
        errorMessage: 'Noise field empty',
    },
    sleep: {
        optional: true,
        custom: {
            options: value => {
                return (value.start && value.end && !isNaN(value.start) 
                && !isNaN(value.end));
            }
        },
        errorMessage: 'Sleep field error',
    },
    guests: {
        optional: true,
        isInt: true,
    },
    dorm: {
        optional: true,
        custom: {
            options: val => {
                return (val instanceof Array);
            }
        },
    },
    greek: {
        isInt: true,
        optional: true,
    },
    smoke: {
        isInt: true,
        optional: true,
    },
    drink: {
        isInt: true,
        optional: true,
    },
    hobbies: {
        optional: true,
        custom: {
            options: val => {
                return (val instanceof Array);
            }
        },
    },
    hometown: {
        optional: true,
    },
    music: {
        optional: true,
        custom: {
            options: val => {
                return (val instanceof Array);
            }
        },
    },
    shows: {
        optional: true,
        custom: {
            options: val => {
                return (val instanceof Array);
            }
        },
    },
    pictures: {
        optional: true,
        custom: {
            options: val => {
                return (val instanceof Array);
            }
        },
    },
    instagram: {
        optional: true,
    }
})