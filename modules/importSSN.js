import SSN from "./new-fi-ssn.js";
document.addEventListener('DOMContentLoaded', () => {
    const result1 = document.querySelector('#result1');
    const result2 = document.querySelector('#result2');
    const result3 = document.querySelector('#result3');
    const result4 = document.querySelector('#result4');
    const ssnInput = document.querySelector('#ssnInput');
    const ssnButton = document.querySelector('#ssnButton');
    const ssnEntered = document.querySelector('#ssn-entered');
    const dvvBody = document.querySelector('#dvv-data');

    ssnButton.addEventListener('click', () => {
        let checkSSNEntry = ssnInput.value;
        let newSSN = new SSN();
        let resultingValue = newSSN.validate(checkSSNEntry);

        ssnEntered.innerHTML = '';
        ssnEntered.innerHTML = checkSSNEntry;

        result1.innerHTML = '';
        result2.innerHTML = '';
        result3.innerHTML = '';
        result4.innerHTML = '';

        result1.innerHTML = resultingValue;
        result2.innerHTML = newSSN.valid1800(checkSSNEntry);
        result3.innerHTML = newSSN.valid1900(checkSSNEntry);
        result4.innerHTML = newSSN.valid2000(checkSSNEntry);
        
        const listOfClasses = ['has-background-success-light', 'has-background-danger-light', 'has-text-black'];
        
        result1.classList.remove(...listOfClasses);
        result2.classList.remove(...listOfClasses);
        result3.classList.remove(...listOfClasses);
        result4.classList.remove(...listOfClasses);

        resultingValue ? result1.classList.add('has-background-success-light', 'has-text-black') : result1.classList.add('has-background-danger-light', 'has-text-black');
        newSSN.valid1800(checkSSNEntry) ? result2.classList.add('has-background-success-light', 'has-text-black') : result2.classList.add('has-background-danger-light', 'has-text-black');
        newSSN.valid1900(checkSSNEntry) ? result3.classList.add('has-background-success-light', 'has-text-black') : result3.classList.add('has-background-danger-light', 'has-text-black');
        newSSN.valid2000(checkSSNEntry) ? result4.classList.add('has-background-success-light', 'has-text-black', 'has-text-black') : result4.classList.add('has-background-danger-light', 'has-text-black');
        
    });

    let rowButtons = dvvBody.getElementsByTagName('button');
    for (let i = 0; i < rowButtons.length; i++) {
        rowButtons[i].addEventListener('click', (e) => {
            validateDVVdata(e);
        });
    }


    const validateDVVdata = (e) => {
        const dvvData = e.target.parentNode.parentNode.children[0];
        const dvvDataAttr = dvvData.getAttribute('data-hetu');

        const dvvValid = e.target.parentNode.parentNode.children[1];
        const dvv1800 = e.target.parentNode.parentNode.children[2];
        const dvv1900 = e.target.parentNode.parentNode.children[3];
        const dvv2000 = e.target.parentNode.parentNode.children[4];
        
        let dvvSSN = new SSN();

        dvvValid.innerHTML = dvvSSN.validate(dvvDataAttr);
        dvv1800.innerHTML = dvvSSN.valid1800(dvvDataAttr);
        dvv1900.innerHTML = dvvSSN.valid1900(dvvDataAttr);
        dvv2000.innerHTML = dvvSSN.valid2000(dvvDataAttr);

        dvvSSN.validate(dvvDataAttr) ? dvvValid.classList.add('has-background-success-light', 'has-text-black') : dvvValid.classList.add('has-background-danger-light', 'has-text-black');
        dvvSSN.valid1800(dvvDataAttr) ? dvv1800.classList.add('has-background-success-light', 'has-text-black') : dvv1800.classList.add('has-background-danger-light', 'has-text-black');
        dvvSSN.valid1900(dvvDataAttr) ? dvv1900.classList.add('has-background-success-light', 'has-text-black') : dvv1900.classList.add('has-background-danger-light', 'has-text-black');
        dvvSSN.valid2000(dvvDataAttr) ? dvv2000.classList.add('has-background-success-light', 'has-text-black') : dvv2000.classList.add('has-background-danger-light', 'has-text-black');
    }
});