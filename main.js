document.addEventListener("DOMContentLoaded", () => {
    const localStorageList = getClientsArr();

    if(localStorageList.length !== 0) {
        localStorageList.forEach(item => clientsList.push(item));

        createClientsTable(clientsList);
    };
});

let clientsList = [];

// СЕРВЕР
function addClientToServer(client) {
    localStorage.setItem(String(client.id), JSON.stringify(client));
};
function deleteClientFromServer(key) {
    localStorage.removeItem(String(key));
};
function changeClientAtServer(newClient, oldClientKey) {
    localStorage.removeItem(String(oldClientKey));
    localStorage.setItem(String(newClient.id), JSON.stringify(newClient));
};
function getClientsArr() {
    const data = {...localStorage};
    let result = [];
    for(const key in data) result.push(JSON.parse(data[key]));

    return result;
};

// ПЕРЕМЕННЫЕ
const headerSearchInput = document.querySelector(".header__search");

const table = document.querySelector(".main-table");
const popupContainerOverlay = document.querySelector(".popup-container__overlay");
popupContainerOverlay.style.display = "none";

const addBtn = document.querySelector(".add-btn");
const addPopup = document.querySelector(".add-popup");
const addPopupCross = document.querySelector(".add-popup__cross");
const addPopupForm = document.querySelector(".add-popup__form");
const addPopupFormInputs = document.querySelectorAll(".add-popup__input");
const addPopupFormInputName = document.querySelector(".add-popup__input--name");
const addPopupFormInputSurName = document.querySelector(".add-popup__input--surname");
const addPopupFormInputLastName = document.querySelector(".add-popup__input--lastname");
const addPopupContactsBtn = document.querySelector(".add-popup__contacts-wrap__btn");
const addPopupFormContactInputs = document.querySelectorAll(".add-popup__contacts-wrap__input");
const addPopupContactsList = document.querySelector(".add-popup__contacts-wrap__list");
const addPopupContactsItemsList = document.querySelectorAll(".add-popup__contacts-wrap__item");
const addPopupFormFieldsError = document.querySelector(".add-popup__error--fields");
const addPopupFormContactsError = document.querySelector(".add-popup__error--contacts");
const addPopupFormContactsCountError = document.querySelector(".add-popup__contactsCount-error");
const addPopupCancelLink = document.querySelector(".add-popup__cancel-link");

const changePopup = document.querySelector(".change-popup");
const changePopupTopSpan = document.querySelector(".change-popup__top").querySelector("span");
const changePopupCross = document.querySelector(".change-popup__cross");
const changePopupForm = document.querySelector(".change-popup__form");
const changePopupFormContactsBtn = document.querySelector(".change-popup__contacts-wrap__btn");
const changePopupFormContactInputs = document.querySelectorAll(".change-popup__contacts-wrap__input");
const changePopupFormContactsList = document.querySelector(".change-popup__contacts-wrap__list");
const changePopupFormContactsItemsList = document.querySelectorAll(".change-popup__contacts-wrap__item");
const changePopupFormFieldsError = document.querySelector(".change-popup__error");
const changePopupFormContactsCountError = document.querySelector(".change-popup__error--contacts-count");
const changePopupFormContactsError = document.querySelector(".change-popup__error");
const changePopupFormInputs = document.querySelectorAll(".change__popup__input");
const changePopupFormInputName = document.querySelector(".change-popup__input--name");
const changePopupFormInputSurName = document.querySelector(".change-popup__input--surname");
const changePopupFormInputLastName = document.querySelector(".change-popup__input--lastname");
const changePopupDeleteLink = document.querySelector(".change-popup__delete-link");

const deletePopupCross = document.querySelector(".delete-popup__cross");
const deletePopupCancelLink = document.querySelector(".delete-popup__cancel-link");
const deletePopup = document.querySelector(".delete-popup");
const deletePopupSubmitBtn = document.querySelector(".delete-popup__submit-btn");
const deletePopupError = document.querySelector(".delete-popup__contacts-error");

const dateObj = new Date();
const currDate = dateObj.getUTCDate() + "." + (0 + String(dateObj.getUTCMonth() + 1)) + "." + dateObj.getUTCFullYear() + " " + dateObj.getUTCHours() + ":" + dateObj.getUTCMinutes();

// ФУНКЦИИ
function createContactNodesArr(contactsArr) {
    let result = [];

    for(const item of contactsArr) {
        const currContactWrap = document.createElement("div");
        const currContactImg = document.createElement("img");
        const currContactText = document.createElement("span");

        currContactWrap.classList.add("contact-td__wrap");
        currContactWrap.setAttribute("data-tooltip", item.value);
        currContactWrap.style.position = "relative";
        currContactImg.classList.add("contact-td__img");
        currContactImg.setAttribute("data-tooltip", item.value);
        currContactImg.setAttribute("src", `./img/contacts-icons/${item.type}.svg`);
        currContactText.style.position = "absolute";
        currContactText.style.top = "-29px";
        currContactText.style.left = "-43px";

        currContactWrap.addEventListener("mouseover", () => {
            // currContactText.style.display = "inline-block";
            currContactText.classList.remove("none");
        });
        currContactWrap.addEventListener("mouseout", () => {
            // currContactText.style.display = "none";
            currContactText.classList.add("none");
        });

        currContactText.classList.add("contact-td__text");
        currContactText.innerHTML = item.value;
        // currContactText.style.display = "none";
        
        currContactWrap.append(currContactImg, currContactText);
        result.push(currContactWrap);
    };

    return result;
};
function createClientsTable(clientsArr) {
    clearTableFunc();
    clientsArr.forEach(item => table.append(createClientItem(item)));
};
function createClientItem(clientObj) {
    const tr = document.createElement("tr");
    tr.classList.add("main-table__tr");

    const idTd = document.createElement("td");
    idTd.classList.add("main-table__td");
    idTd.innerHTML = clientObj.id;

    const fioTd = document.createElement("td");
    fioTd.innerHTML = clientObj.surName + " " + clientObj.name + " " + clientObj.lastName;
    fioTd.classList.add("main-table__td");

    const createTd = document.createElement("td");
    createTd.innerHTML = `
        <time datetime="${clientObj.createdAt.substr(0, 10)}">
            ${clientObj.createdAt.substr(0, 10)}
            <span>${clientObj.createdAt.slice(11, 18)}</span>
        </time>
    `;
    createTd.classList.add("main-table__td");

    const lastChangeTd = document.createElement("td");
    lastChangeTd.innerHTML = `
        <time datetime="${clientObj.updatedAt.substr(0, 10)}">
            ${clientObj.updatedAt.substr(0, 10)}
            <span>${clientObj.createdAt.slice(11, 18)}</span>
        </time>
    `;
    lastChangeTd.classList.add("main-table__td");

    const contactsTd = document.createElement("td");
    contactsTd.classList.add("main-table__td");

    if (clientObj.contacts.length > 4) {
        const firstFourContactsList = createContactNodesArr(clientObj.contacts.filter((item, index) => index + 1 < 5));
        const otherContactsList = createContactNodesArr(clientObj.contacts.filter((item, index) => index + 1 > 4));
        firstFourContactsList.forEach(item => contactsTd.append(item));

        const spanNode = document.createElement("span");
        spanNode.classList.add("main-table__contacts-td__more-span");
        spanNode.innerHTML = "+" + String(otherContactsList.length);
        spanNode.addEventListener("click", () => {
            otherContactsList.forEach(item => {
                contactsTd.append(item);
                spanNode.style.display = "none";
            });
        });

        contactsTd.append(spanNode);
    } else {
        const allContactsList = createContactNodesArr(clientObj.contacts);
        allContactsList.forEach(item => contactsTd.append(item));
    }

    const changeClientTd = document.createElement("td");
    changeClientTd.innerHTML = `
        <img src="img/edit.svg" alt="Карандаш">
        <span>Изменить</span>
    `;
    changeClientTd.classList.add("main-table__td");

    changeClientTd.addEventListener("click", () => {
        changePopup.style.display = "block";
        popupContainerOverlay.style.display = "flex";
        changePopupTopSpan.innerHTML = "ID: " + clientObj.id;
        changePopupFormInputName.value = clientObj.name;
        changePopupFormInputSurName.value = clientObj.surName;
        changePopupFormInputLastName.value = clientObj.lastName;

        changePopupFormContactsList.innerHTML = "";
        changePopupFormContactsList.style.display = clientObj.contacts.length > 0 ? "flex" : "none";

        clientObj.contacts.forEach((contact, index) => {
            const allContactsList = document.querySelectorAll(".change-popup__contacts-wrap__item");
            const liNode = document.createElement("li");
            liNode.classList.add("change-popup__contacts-wrap__item");
            liNode.setAttribute("id", index + 1);

            const selectNode = document.createElement("select");
            selectNode.classList.add("change-popup__contacts-wrap__select");

            const options = [
                { value: "Телефон", type: "phoneNumber" },
                { value: "Доп. телефон", type: "extraPhoneNumber" },
                { value: "Email", type: "Email" },
                { value: "Vk", type: "Vk" },
                { value: "Facebook", type: "Facebook" }
            ];

            options.forEach(opt => {
                const option = document.createElement("option");
                option.value = opt.value;
                option.innerHTML = opt.value;
                if (opt.type === contact.type) option.selected = true;
                selectNode.append(option);
            });

            const inputNode = document.createElement("input");
            inputNode.classList.add("change-popup__contacts-wrap__input");
            inputNode.setAttribute("type", "text");
            inputNode.setAttribute("required", "");
            inputNode.value = contact.value;

            const btnNode = document.createElement("button");
            btnNode.classList.add("change-popup__contacts-wrap__cross");
            btnNode.setAttribute("type", "button");

            const imgNode = document.createElement("img");
            imgNode.classList.add("change-popup__contacts-wrap__cross--img");
            imgNode.setAttribute("src", "img/contacts-cross.svg");
            imgNode.setAttribute("alt", "Крестик");
            imgNode.addEventListener("click", () => {
                const liNode = imgNode.parentElement.parentElement;
                const contactIndex = Number(liNode.getAttribute("id")) - 1;
                clientObj.contacts.splice(contactIndex, 1);
                liNode.remove();
                    
                for(const item of allContactsList) {
                    changePopupFormContactsList.append(item);
                };

                changeClientAtServer(clientObj, clientObj.id);

                clientsList = getClientsArr();
                createClientsTable(clientsList);

                // changePopupFormContactsList.style.display = clientObj.contacts.length > 0 ? "flex" : "none";
            });
            btnNode.append(imgNode);

            liNode.append(selectNode, inputNode, btnNode);
            changePopupFormContactsList.append(liNode);
        });

        changePopupFormContactsBtn.addEventListener("click", () => {
            changePopupFormContactsList.style.display = "flex";

            const allContactsList = document.querySelectorAll(".change-popup__contacts-wrap__item");
            if (allContactsList.length < 10) {
                const liNode = document.createElement("li");
                liNode.classList.add("change-popup__contacts-wrap__item");
                liNode.setAttribute("id", allContactsList.length + 1);

                const selectNode = document.createElement("select");
                selectNode.classList.add("change-popup__contacts-wrap__select");

                const phoneOption = document.createElement("option");
                phoneOption.setAttribute("value", "Телефон");
                phoneOption.innerHTML = "Телефон";
                const extraPhoneOption = document.createElement("option");
                extraPhoneOption.setAttribute("value", "Доп. телефон");
                extraPhoneOption.innerHTML = "Доп. телефон";
                const emailOption = document.createElement("option");
                emailOption.setAttribute("value", "Email");
                emailOption.innerHTML = "Email";
                const vkOption = document.createElement("option");
                vkOption.setAttribute("value", "Vk");
                vkOption.innerHTML = "Vk";
                const facebookOption = document.createElement("option");
                facebookOption.setAttribute("value", "Facebook");
                facebookOption.innerHTML = "Facebook";

                selectNode.append(phoneOption, extraPhoneOption, emailOption, vkOption, facebookOption);

                const inputNode = document.createElement("input");
                inputNode.classList.add("change-popup__contacts-wrap__input");
                inputNode.setAttribute("type", "text");
                inputNode.setAttribute("required", "");

                const btnNode = document.createElement("button");
                btnNode.classList.add("change-popup__contacts-wrap__cross");
                btnNode.setAttribute("type", "button");

                const imgNode = document.createElement("img");
                imgNode.classList.add("change-popup__contacts-wrap__cross--img");
                imgNode.setAttribute("src", "img/contacts-cross.svg");
                imgNode.setAttribute("alt", "Крестик");
                imgNode.addEventListener("click", () => {
                    const liNode = imgNode.parentElement.parentElement;
                    const contactIndex = Number(liNode.getAttribute("id")) - 1;
                    clientObj.contacts.splice(contactIndex, 1);
                    liNode.remove();
                    
                    for(const item of allContactsList) {
                        changePopupFormContactsList.append(item);
                    };
                    
                    changeClientAtServer(clientObj, clientObj.id);
                    
                    clientsList = getClientsArr();
                    createClientsTable(clientsList);

                    // changePopupFormContactsList.style.display = clientObj.contacts.length > 0 ? "flex" : "none";
                });

                btnNode.appendChild(imgNode);
                liNode.append(selectNode, inputNode, btnNode);
                changePopupFormContactsList.appendChild(liNode);

                changePopupFormContactsCountError.style.display = "none";
            } else {
                changePopupFormContactsCountError.style.display = "block";
            }
        });

        changePopupForm.addEventListener("submit", (e) => {
            e.preventDefault();

            let areAllInputsFilled = true;

            for (const item of changePopupFormInputs) {
                if (item.value.trim() === "") {
                    areAllInputsFilled = false;
                    break;
                }
            }

            let areAllContactInputsFilled = true;
            const contactInputs = changePopupFormContactsList.querySelectorAll(".change-popup__contacts-wrap__input");
            for (const item of contactInputs) {
                if (item.value.trim() === "") {
                    areAllContactInputsFilled = false;
                    break;
                }
            }

            if (areAllInputsFilled && areAllContactInputsFilled && changePopupFormContactsList.children.length <= 10) {
                const changedClientObj = {
                    id: clientObj.id,
                    name: changePopupFormInputName.value,
                    surName: changePopupFormInputSurName.value,
                    lastName: changePopupFormInputLastName.value,
                    createdAt: clientObj.createdAt,
                    updatedAt: currDate,
                    contacts: Array.from(changePopupFormContactsList.children).map(item => {
                        const select = item.querySelector(".change-popup__contacts-wrap__select");
                        const contactTypeValue = {
                            "телефон": "phoneNumber",
                            "доп. телефон": "extraPhoneNumber",
                            "email": "Email",
                            "vk": "Vk",
                            "facebook": "Facebook"
                        }[select.options[select.selectedIndex].text.toLowerCase()];
                        return {
                            type: contactTypeValue,
                            value: item.querySelector(".change-popup__contacts-wrap__input").value
                        };
                    })
                };

                changeClientAtServer(changedClientObj, clientObj.id);
                clientsList = getClientsArr();
                createClientsTable(clientsList);
                closePopup(changePopup, changePopupFormInputs, changePopupFormContactsList, [
                    changePopupFormFieldsError, changePopupFormContactsError, changePopupFormContactsCountError,
                ]);
            } else {
                if (!areAllInputsFilled) changePopupFormFieldsError.style.display = "block";
                if (!areAllContactInputsFilled) changePopupFormContactsError.style.display = "block";
                if (changePopupFormContactsList.children.length > 10) changePopupFormContactsCountError.style.display = "block";
            }
        });

        changePopupCross.addEventListener("click", () => {
            closePopup(changePopup, changePopupFormInputs, changePopupFormContactsList, [
                changePopupFormFieldsError, changePopupFormContactsError, changePopupFormContactsCountError,
            ]);
        });

        changePopupDeleteLink.addEventListener("click", () => {
            deleteClientFromServer(clientObj.id);
            clientsList = getClientsArr();
            createClientsTable(clientsList);
            changePopup.style.display = "none";
            popupContainerOverlay.style.display = "none";
        });
    });

    const deleteClientTd = document.createElement("td");
    deleteClientTd.innerHTML = `
        <img src="img/cancel.svg" alt="Крестик">
        <span>Удалить</span>
    `;
    deleteClientTd.classList.add("main-table__td");

    deleteClientTd.addEventListener("click", () => {
        deletePopup.style.display = "block";
        popupContainerOverlay.style.display = "flex";

        deletePopupSubmitBtn.addEventListener("click", () => {
            deleteClientFromServer(clientObj.id);
            clientsList = getClientsArr();
            createClientsTable(clientsList);
            popupContainerOverlay.style.display = "none";
            deletePopup.style.display = "none";
        });
    });

    tr.append(idTd, fioTd, createTd, lastChangeTd, contactsTd, changeClientTd, deleteClientTd);
    return tr;
};
const clearTableFunc = () => {
    const tableTrs = table.querySelectorAll("tr");
    tableTrs.forEach(item => {
        if(!item.classList.contains("main-table__head-tr")) item.remove();
    });
};

function getNextId(clientsArray) {
    return clientsArray.length > 0 ? clientsArray.length + 1 : 1;
};

function closePopup(popup, inputs, contactsList, errorFields) {
    popup.style.display = "none";
    popupContainerOverlay.style.display = "none";
    inputs.forEach((input) => input.value = "");
    contactsList.innerHTML = "";
    contactsList.style.display = "none";
    errorFields.forEach((error) => error.style.display = "none");
};

// ОБРАБОТЧИКИ СОБЫТИЙ
addBtn.addEventListener("click", () => {
    addPopup.style.display = "block";
    popupContainerOverlay.style.display = "flex";
});
addPopupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Валидация
    let areAllInputsFilled = true;
    let areAllContactInputsFilled = true;
    for(const item of addPopupFormInputs) {
        if(item.value.trim() === "") {
            areAllInputsFilled = false;
            break;
        }
    };
    if(addPopupContactsItemsList.length !== 0) {
        for(const item of addPopupFormContactInputs) {
            if(item.value.trim() === "") {
                areAllContactInputsFilled = false;
                break;
            }
        };
    }
    
    if (areAllInputsFilled && areAllContactInputsFilled && addPopupContactsList.children.length <= 10) {
        const clientObj = {
            id: getNextId(clientsList),
            name: addPopupFormInputName.value,
            surName: addPopupFormInputSurName.value,
            lastName: addPopupFormInputLastName.value,
            createdAt: currDate,
            updatedAt: currDate,
            contacts: Array.from(addPopupContactsList.children).map(item => {
                const select = item.querySelector(".add-popup__contacts-wrap__select");
                const contactTypeValue = {
                    "телефон": "phoneNumber",
                    "доп. телефон": "extraPhoneNumber",
                    "email": "Email",
                    "vk": "Vk",
                    "facebook": "Facebook"
                }[select.options[select.selectedIndex].text.toLowerCase()];
                return {
                    type: contactTypeValue,
                    value: item.querySelector(".add-popup__contacts-wrap__input").value
                };
            })
        };

        addClientToServer(clientObj);
        clientsList = getClientsArr();
        createClientsTable(clientsList);
        closePopup(addPopup, addPopupFormInputs, addPopupContactsList, [
            addPopupFormFieldsError,
            addPopupFormContactsError,
            addPopupFormContactsCountError
        ]);
    } else {
        if (!areAllInputsFilled) addPopupFormFieldsError.style.display = "block";
        if (!areAllContactInputsFilled) addPopupFormContactsError.style.display = "block";
        if (addPopupContactsList.children.length > 10) addPopupFormContactsCountError.style.display = "block";
    };
});

addPopupCross.addEventListener("click", () => {
    closePopup(addPopup, addPopupFormInputs, addPopupContactsList, [
        addPopupFormFieldsError,
        addPopupFormContactsError,
        addPopupFormContactsCountError
    ]);
});
addPopupCancelLink.addEventListener("click", () => {
    closePopup(addPopup, addPopupFormInputs, addPopupContactsList, [
        addPopupFormFieldsError,
        addPopupFormContactsError,
        addPopupFormContactsCountError
    ]);
});

addPopupContactsBtn.addEventListener("click", () => {
    addPopupContactsList.style.display = "flex";
    
    if(addPopupContactsItemsList.length < 10) {
        const liNode = document.createElement("li");
        liNode.classList.add("add-popup__contacts-wrap__item");
        
        const selectNode = document.createElement("select");
        selectNode.classList.add("add-popup__contacts-wrap__select");

        const phoneOption = document.createElement("option");
        phoneOption.setAttribute("value", "Телефон");
        phoneOption.innerHTML = "Телефон";
        const extraPhoneOption = document.createElement("option");
        extraPhoneOption.setAttribute("value", "Доп. телефон");
        extraPhoneOption.innerHTML = "Доп. телефон";
        const emailOption = document.createElement("option");
        emailOption.setAttribute("value", "Email");
        emailOption.innerHTML = "Email";
        const vkOption = document.createElement("option");
        vkOption.setAttribute("value", "Vk");
        vkOption.innerHTML = "Vk";
        const facebookOption = document.createElement("option");
        facebookOption.setAttribute("value", "Facebook");
        facebookOption.innerHTML = "Facebook";

        selectNode.append(phoneOption, extraPhoneOption, emailOption, vkOption, facebookOption);

        const inputNode = document.createElement("input");
        inputNode.classList.add("add-popup__contacts-wrap__input");
        inputNode.setAttribute("type", "text");

        const btnNode = document.createElement("button");
        btnNode.classList.add("add-popup__contacts-wrap__cross");
        btnNode.setAttribute("type", "button");
        
        const imgNode = document.createElement("img");
        imgNode.classList.add("add-popup__contacts-wrap__cross--img");
        imgNode.setAttribute("src", "img/contacts-cross.svg");
        imgNode.setAttribute("alt", "Крестик");
        imgNode.addEventListener("click", () => {
            imgNode.parentElement.parentElement.remove();
        });

        btnNode.append(imgNode);

        liNode.append(selectNode, inputNode, btnNode);
        addPopupContactsList.append(liNode);
        addPopupFormContactsCountError.style.display = "none";
    } else {
        addPopupFormContactsCountError.style.display = "block";
    };
});

deletePopupCross.addEventListener("click", () => {
    deletePopup.style.display = "none";
    popupContainerOverlay.style.display = "none";
});
deletePopupCancelLink.addEventListener("click", () => {
    deletePopup.style.display = "none";
    popupContainerOverlay.style.display = "none";
});

// СОРТИРОВКА
function sorting(arr, prop, direction = false) {
    let filteredArr = arr.sort((a, b) => 
    (direction ? a[prop] < b[prop] : a[prop] > b[prop]) ? -1 : 0);

    return filteredArr;
};

const tableTitleId = document.querySelector(".main-table__head-td--id");
const tableTitleFio = document.querySelector(".main-table__head-td--fio");
const tableTitleCreate = document.querySelector(".main-table__head-td--create");
const tableTitleChange = document.querySelector(".main-table__head-td--change");

tableTitleId.addEventListener("click", () => {
    clearTableFunc();

    tableTitleId.classList.contains("sorted") ? createClientsTable(sorting(clientsList, "id", false)) : createClientsTable(sorting(clientsList, "id", true));
    tableTitleId.classList.contains("sorted") ? tableTitleId.classList.remove("sorted") : tableTitleId.classList.add("sorted");
});
tableTitleFio.addEventListener("click", () => {
    clearTableFunc();

    tableTitleFio.classList.contains("sorted") ? createClientsTable(sorting(clientsList, "name", false)) : createClientsTable(sorting(clientsList, "name", true));
    tableTitleFio.classList.contains("sorted") ? tableTitleFio.classList.remove("sorted") : tableTitleFio.classList.add("sorted");
});
tableTitleCreate.addEventListener("click", () => {
    clearTableFunc();

    tableTitleCreate.classList.contains("sorted") ? createClientsTable(sorting(clientsList, "createdAt", false)) : createClientsTable(sorting(clientsList, "createdAt", true));
    tableTitleCreate.classList.contains("sorted") ? tableTitleCreate.classList.remove("sorted") : tableTitleCreate.classList.add("sorted");
});
tableTitleChange.addEventListener("click", () => {
    clearTableFunc();

    tableTitleChange.classList.contains("sorted") ? createClientsTable(sorting(clientsList, "createdAt", false)) : createClientsTable(sorting(clientsList, "createdAt", true));
    tableTitleChange.classList.contains("sorted") ? tableTitleChange.classList.remove("sorted") : tableTitleChange.classList.add("sorted");
});

// ПОИСК
function filterClientsListByFio(arr, value) {
    let result = [];
    copy = [...arr];

    for (const item of copy) {
        if (String(item.surName + " " + item.name + " " + item.lastName).includes(value)) {
            result.push(item);
        }
    };

    return result;
};

headerSearchInput.addEventListener("input", () => {
    const value = headerSearchInput.value.trim();
    createClientsTable(value ? filterClientsListByFio(clientsList, value) : clientsList);
});

createClientsTable(clientsList);

// const exampleObj = {
//     id: 1,
//     name: "Адам",
//     surName: "Черешнюк",
//     lastName: "Викторович",
//     createdAt: "16.05.2025 17:11",
//     updatedAt: "16.05.2025 17:11",
//     contacts: [
//         {type: "phoneNumber", value: "+7 913 242 12-25"},
//         {type: "extraPhoneNumber", value: "extraPhoneNumber"},
//         {type: "email", value: "email"},
//         {type: "vk", value: "vk"},
//         {type: "facebook", value: "facebook"},
//     ]
// };