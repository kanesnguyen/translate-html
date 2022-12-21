const validate = (inputSelector, method, valid) => {
    if(method === 'isEmpty') {
        validEmpty(inputSelector, valid)
    }
    else {
        alert("Not have method valid")
    }
}

const validEmpty = (inputSelector, valid, message) => {
    const input = $(`${inputSelector}`)
    if (input.val().trim() !== '') {
         if (valid === 'updateQuery') { 
            updateQuery(input.attr('name'), input.val().replaceAll("[^a-zA-Z0-9]", "") )
         }
         return false;
    }
    else {
        input.after(function() {
            return `<p style='color:red;position: absolute;bottom: ${input.height()}; transform: translate(0%, -50%);'>"${message || 'Không được để trống trường này'}"</p>`;
        });
    }
}