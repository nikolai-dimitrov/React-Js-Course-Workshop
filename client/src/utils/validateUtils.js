export const validateUserForm = (event) => {
    const name = event.target.name;
    const value = event.target.value.trim();
    let err = {};

    if (name === "firstName" && (value.length < 3 || value.length > 20)) {
        err.firstName = "First name should be between 3 and 20 characters.";
    }

    if (name === "lastName" && (value.length < 3 || value.length > 20)) {
        err.lastName = "Last name should be between 3 and 20 characters.";
    }

    if (name === "email" && (value.length < 3 || value.length > 20)) {
        err.email = "Email should be between 3 and 20 characters.";
    }

    if (name === "phoneNumber" && (value.length < 10 || value.length > 10)) {
        err.phoneNumber = "Phone number should be 10 characters";
    }

    if (
        name === "imageUrl" &&
        !value.includes("http://") &&
        !value.includes("https://")
    ) {
        err.imageUrl = "URL field should start with http:// or https://";
    }

    if (name === "country" && (value.length < 3 || value.length > 10)) {
        err.country = "Country should be at least 3 characters";
    }

    if (name === "city" && (value.length < 3 || value.length > 10)) {
        err.city = "City should be at least 3 characters";
    }

    if (name === "street" && (value.length < 3 || value.length > 10)) {
        err.street = "Street should be at least 3 characters";
    }

    if (name === "streetNumber" && Number(value) < 0) {
        err.streetNumber = "Street Number should be at positive number.";
    }
    if (Object.entries(err).length == 0) {
        return { [event.target.name]: "" };
    }
    return err;
};
