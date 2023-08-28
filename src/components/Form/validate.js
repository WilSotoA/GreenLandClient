export const validate = (data) => {
    const regexName =/^[A-Za-z0-9\s]+$/;
    let errors = {}

    if(!data.name) errors.name = "Product name required.";
    else if (data.name.length < 2) errors.name = "Name is too short.";
    else if (data.name.length > 20) errors.name = "Name is too long.";
    else if (!regexName.test(data.name)) errors.name = "You can only use letters and numbers.";

    if (!data.description) errors.description = "Description required."
    
    if(isNaN(data.price) || data.price <= 0){
        errors.price = "Price must be a POSITIVE number.";
    }

    if (!data.image) {
        errors.image = "Please select an image.";
    }


    if(isNaN(data.stock) || data.stock <= 0){
        errors.stock = "Stock must be a POSITIVE number.";
    }

    if(!data.category.id) errors.category = "You must select one category"

    return errors;
};