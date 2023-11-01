const baseUrl = "http://localhost:3005/api/users/";

export const getAll = async (page, count, sort, order) => {
    const response = await fetch(`${baseUrl}?page=${page}&limit=${count}}`);

    const result = await response.json();
    console.log(result);

    return result;
};

export const getOne = async (id) => {
    const response = await fetch(`${baseUrl}/${id}`);
    const result = await response.json();

    return result;
};

export const create = async (userData) => {
    const { street, country, city, streetNumber, ...data } = userData;
    data.address = {
        street,
        country,
        city,
        streetNumber,
    };
    const response = await fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
};

export const remove = async (id) => {
    const response = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
    });
    const result = await response.json();
    return result;
};

export const update = async (userData, id) => {
    let { street, country, city, streetNumber, ...data } = userData;
    data.address = {
        country,
        city,
        street,
        streetNumber,
    };
    const response = await fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const result = await response.json();
    return result.user;
};
// Conditional in getAll -> if search && criteria else getAll
export const getFilteredUsers = async (search, criteria) => {
    const response = await fetch(
        `${baseUrl}?search=${search}&criteria=${criteria}`
    );
    const result = await response.json();
    return result.users;
};

export const getSortedUsers = async (sort, order) => {
    const response = await fetch(`${baseUrl}?sort=${sort}&order=${order}`);
    const result = await response.json();
    return result.users;
};
