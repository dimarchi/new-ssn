"use strict";
class SSN {
    constructor(ssn) {
        this.ssn = ssn;
    }
    validate(ssn) {
        try {
            if (typeof ssn === 'string') {
                // can not be less or more than 11 characters
                if (ssn.length == 11) {

                    // used for validating the ssn
                    const remindersAndDigits = [
                        {
                            "remainder": 0,
                            "digit": '0'
                        },
                        {
                            "remainder": 1,
                            "digit": '1'
                        },
                        {
                            "remainder": 2,
                            "digit": '2'
                        },
                        {
                            "remainder": 3,
                            "digit": '3'
                        },
                        {
                            "remainder": 4,
                            "digit": '4'
                        },
                        {
                            "remainder": 5,
                            "digit": '5'
                        },
                        {
                            "remainder": 6,
                            "digit": '6'
                        },
                        {
                            "remainder": 7,
                            "digit": '7'
                        },
                        {
                            "remainder": 8,
                            "digit": '8'
                        },
                        {
                            "remainder": 9,
                            "digit": '9'
                        },
                        {
                            "remainder": 10,
                            "digit": 'A'
                        },
                        {
                            "remainder": 11,
                            "digit": 'B'
                        },
                        {
                            "remainder": 2,
                            "digit": 'C'
                        },
                        {
                            "remainder": 13,
                            "digit": 'D'
                        },
                        {
                            "remainder": 14,
                            "digit": 'E'
                        },
                        {
                            "remainder": 15,
                            "digit": 'F'
                        },
                        {
                            "remainder": 16,
                            "digit": 'H'
                        },
                        {
                            "remainder": 17,
                            "digit": 'J'
                        },
                        {
                            "remainder": 18,
                            "digit": 'K'
                        },
                        {
                            "remainder": 19,
                            "digit": 'L'
                        },
                        {
                            "remainder": 20,
                            "digit": 'M'
                        },
                        {
                            "remainder": 21,
                            "digit": 'N'
                        },
                        {
                            "remainder": 22,
                            "digit": 'P'
                        },
                        {
                            "remainder": 23,
                            "digit": 'R'
                        },
                        {
                            "remainder": 24,
                            "digit": 'S'
                        },
                        {
                            "remainder": 25,
                            "digit": 'T'
                        },
                        {
                            "remainder": 26,
                            "digit": 'U'
                        },
                        {
                            "remainder": 27,
                            "digit": 'V'
                        },
                        {
                            "remainder": 28,
                            "digit": 'W'
                        },
                        {
                            "remainder": 29,
                            "digit": 'X'
                        },
                        {
                            "remainder": 30,
                            "digit": 'Y'
                        }
                    ];

                    // separator, can be used to determine the century
                    // under which the ssn belongs to
                    const centuryMark = ssn.at(6);
                    // valid separators for the 1800s, 1900s, and 2000s
                    const validSeparators = ['+', '-', 'A', 'B', 'C', 'D', 'E', 'F', 'U', 'V', 'W', 'X', 'Y'];

                    if (validSeparators.includes(centuryMark)) {

                        // separate for the date validation
                        const datePart = ssn.substring(0, 6);
                        // separate for the validity calculation
                        const personalNumber = ssn.substring(7, 10);
                        const digitCheck = ssn.at(10);
                        // generate a number consisting of datePart and personalNumber
                        // and calculate the reminder to see the digit
                        const generateNumber = Number(`${datePart}${personalNumber}`);
                        const reminderCheck = generateNumber % 31;

                        // valid date check
                        // if the date is not valid, the rest is not either
                        let century = 0;

                        // since the birth date is of the format ddmmyy we need to figure out
                        // the correct century based on the separator
                        switch(centuryMark) {
                            case '+' :
                                century = 18;
                                break;
                            case '-' :
                            case 'U' :
                            case 'V' :
                            case 'W' :
                            case 'X' :
                            case 'Y' :
                                century = 19;
                                break;
                            case 'A' :
                            case 'B' :
                            case 'C' :
                            case 'D' :
                            case 'E' :
                            case 'F' :
                                century = 20;
                                break;
                            default :
                                century = 0;
                        }

                        let dayCheck = Number(ssn.substring(0, 2));
                        let monthCheck = Number(ssn.substring(3, 4));
                        let yearCheck = Number(`${century}${ssn.substring(4, 6)}`);

                        let date = new Date(yearCheck, monthCheck - 1, dayCheck, 0, 0, 0);

                        if (date instanceof Date && !isNaN(date.valueOf())) {
                            // valid date
                        } else {
                            return false;
                        }

                        // validating the whole ssn
                        let checkingForValidity = 0;
                        for (const checkingDigit of remindersAndDigits) {
                            if (checkingDigit.remainder === reminderCheck && checkingDigit.digit === digitCheck) {
                                checkingForValidity = 1;
                                break;
                            }
                        }

                        // ssn is either valid or invalid
                        if (checkingForValidity) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } catch (error) {
            return error;
        }
    }
    // the following three validators must first pass the the strict
    // validation before they can be considered for the next part
    //
    // the looser validation would otherwise accept SSNs that are
    // simply not valid (e.g. born on the 33rd day, using as digits
    // letters that are not allowed)
    valid1800(ssn) {
        try {
            const passesGeneralValidation = this.validate(ssn);
            // does it pass the stricter validation?
            // if so, does it pass the looser validation for the 1800s?
            if (passesGeneralValidation) {
                if (typeof ssn === 'string') {
                    const regex = new RegExp('^[0-9]{6}[+][0-9]{3}[A-Z0-9]');
                    if (regex.test(ssn)) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } catch (error) {
            return error;
        }
    }
    valid1900(ssn) {
        try {
            const passesGeneralValidation = this.validate(ssn);
            // does it pass the stricter validation?
            // if so, does it pass the looser validation for the 1900s?
            if (passesGeneralValidation) {
                if (typeof ssn === 'string') {
                    const regex = new RegExp('^[0-9]{6}[-YXWVU][0-9]{3}[A-Z0-9]');
                    if (regex.test(ssn)) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } catch (error) {
            return error;
        }
    }
    valid2000(ssn) {
        try {
            const passesGeneralValidation = this.validate(ssn);
            // does it pass the stricter validation?
            // if so, does it pass the looser validation for the 2000s?
            if (passesGeneralValidation) {
                if (typeof ssn === 'string') {
                    const regex = new RegExp('^[0-9]{6}[ABCDEF][0-9]{3}[A-Z0-9]');
                    if (regex.test(ssn)) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } catch (error) {
            return error;
        }
    }
}

export default SSN;
