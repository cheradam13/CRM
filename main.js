document.addEventListener("DOMContentLoaded", () => {
    const localStorageList = getClientsListFromLocalStorage();
    
    if(localStorageList.length > 0) {
        localStorageList.forEach(item => clientsList.push(item));

        createClientsTable(clientsList);
    };
});

// LocalStorage
function addClientToLocalStorage(client) {
    localStorage.setItem(String(client.id), JSON.stringify(client));
};
function removeClientFromLocalStorage(client) {
    localStorage.removeItem(String(client.id));
};
function updateClientAtLocalStorage(newClient, oldClientId) {
    localStorage.removeItem(String(oldClientId));
    addClientToLocalStorage(newClient);
};
function getClientsListFromLocalStorage() {
    const data = {...localStorage};
    let result = [];

    if(Object.entries(data).length <= 0) return [];

    for(const key in data) {
        result.push(JSON.parse(data[key]));
    };

    return result;
};

let clientsList = [];

// Переменные
const mainTable = document.querySelector(".main__table");
const mainAddBtn = document.querySelector(".main__btn--add");

const popupContainerOverlay = document.querySelector(".popup-container__overlay");

const addPopup = document.querySelector(".add-popup");
const addPopupCrossImg = document.querySelector(".add-popup__img--cross");
const addPopupForm = document.querySelector(".add-popup__form");
const addPopupFormInputs = document.querySelectorAll(".add-popup__input");
const addPopupFormInputName = document.querySelector(".add-popup__input--name");
const addPopupFormInputSurName = document.querySelector(".add-popup__input--surname");
const addPopupFormInputLastName = document.querySelector(".add-popup__input--lastname");
const addPopupContactsBtn = document.querySelector(".add-popup__contacts-btn--add");
const addPopupFormContactInputs = document.querySelectorAll(".add-popup__contacts-input");
const addPopupContactsList = document.querySelector(".add-popup__contacts-list");
const addPopupContactsItemsNodes = document.querySelectorAll(".add-popup__contacts-item");
const addPopupFormFieldsError = document.querySelector(".add-popup__error--fields");
const addPopupFormContactsFieldsError = document.querySelector(".add-popup__error--contactsFields");
const addPopupFormContactsCountError = document.querySelector(".add-popup__error--contactsCount");
const addPopupCancelLink = document.querySelector(".add-popup__link--cancel");

const updatePopup = document.querySelector(".update-popup");
const updatePopupSpan = document.querySelector(".update-popup__top").querySelector("span");
const updatePopupCrossImg = document.querySelector(".update-popup__img--cross");
const updatePopupForm = document.querySelector(".update-popup__form");
const updatePopupFormContactsBtn = document.querySelector(".update-popup__contacts-btn--add");
const updatePopupFormContactsList = document.querySelector(".update-popup__contacts-list");
const updatePopupFormContactsItemsNodes = document.querySelectorAll(".update-popup__contacts-item");
const updatePopupFormFieldsError = document.querySelector(".update-popup__error--fields");
const updatePopupFormContactsFieldsError = document.querySelector(".update-popup__error--contactsFields");
const updatePopupFormContactsCountError = document.querySelector(".update-popup__error--contactsCount");
const updatePopupFormInputs = document.querySelectorAll(".update-popup__input");
const updatePopupFormInputName = document.querySelector(".update-popup__input--name");
const updatePopupFormInputSurName = document.querySelector(".update-popup__input--surname");
const updatePopupFormInputLastName = document.querySelector(".update-popup__input--lastname");
const updatePopupRemoveLink = document.querySelector(".update-popup__link--remove");

const removePopup = document.querySelector(".remove-popup");
const removePopupCrossImg = document.querySelector(".remove-popup__img--cross");
const removePopupSubmitBtn = document.querySelector(".remove-popup__btn--submit");
const removePopupCancelLink = document.querySelector(".remove-popup__link--cancel");

const date = new Date();
const currentDate = date.getUTCDate() + "." + (0 + String(date.getUTCMonth() + 1)) + "." + date.getUTCFullYear() + " " + date.getUTCHours() + ":" + date.getUTCMinutes();

// Функции
function clearTable() {
    const tableTrs = mainTable.querySelectorAll(".main__table-tr");
    tableTrs.forEach(item => item.remove());
};
function getNextId(clientsList) {
    return clientsList.length > 0 ? clientsList.length + 1 : 1;
};
function closePopup(popup, inputs, contactsList, errorFields) {
    popup.style.display = "none";
    popupContainerOverlay.style.display = "none";
    inputs.forEach((input) => input.value = "");
    contactsList.innerHTML = "";
    contactsList.style.display = "none";
    errorFields.forEach((error) => error.style.display = "none");
};

function createContactsNodes(contactsList) {
    let result = [];

    contactsList.forEach(contact => {
        const contactDiv = document.createElement("div");
        contactDiv.classList.add("contact-td__wrap");
        contactDiv.setAttribute("data-tooltip", contact.value);
        contactDiv.style.position = "relative";

        const contactImg = document.createElement("img");
        contactImg.classList.add("contact-td__img");
        contactImg.setAttribute("data-tooltip", contact.value);
        contactImg.setAttribute("src", `./img/contacts-icons/${contact.type}.svg`);

        const contactSpan = document.createElement("span");
        contactSpan.classList.add("contact-td__text");
        contactSpan.innerHTML = contact.value;
        contactSpan.style.display = "none";
        contactSpan.style.position = "absolute";
        contactSpan.style.top = "-29px";
        contactSpan.style.left = "-43px";

        contactDiv.addEventListener("mouseover", () => contactSpan.style.display = "block");
        contactDiv.addEventListener("mouseout", () => contactSpan.style.display = "none");
        
        contactDiv.append(contactImg, contactSpan);
        result.push(contactDiv);
    });

    return result;
};
function createClientsTable(clientsList) {
    clearTable();
    clientsList.forEach(client => mainTable.append(createClientItem(client)));
};
function createClientItem(client) {
    const tr = document.createElement("tr");
    tr.classList.add("main__table-tr");

    const idTd = document.createElement("td");
    idTd.classList.add("main__table-td");
    idTd.innerHTML = client.id;

    const fioTd = document.createElement("td");
    fioTd.classList.add("main__table-td");
    fioTd.innerHTML = client.surName + " " + client.name + " " + client.lastName;

    const createdAtTd = document.createElement("td");
    createdAtTd.classList.add("main__table-td");
    createdAtTd.innerHTML = `
        <time datetime="${client.createdAt.substr(0, 10)}">
            ${client.createdAt.substr(0, 10)}
            <span>${client.createdAt.slice(11, 18)}</span>
        </time>
    `;

    const updatedAtTd = document.createElement("td");
    updatedAtTd.classList.add("main__table-td");
    updatedAtTd.innerHTML = `
        <time datetime="${client.updatedAt.substr(0, 10)}">
            ${client.updatedAt.substr(0, 10)}
            <span>${client.createdAt.slice(11, 18)}</span>
        </time>
    `;

    const contactsTd = document.createElement("td");
    contactsTd.classList.add("main__table-td");
    if (client.contacts.length > 4) {
        const firstFourContactsNodes = createContactsNodes(client.contacts.filter((contact, index) => index + 1 <= 4));
        const otherContactsNodes = createContactsNodes(client.contacts.filter((contact, index) => index + 1 > 4));
        firstFourContactsNodes.forEach(contactNode => contactsTd.append(contactNode));

        const spanNode = document.createElement("span");
        spanNode.innerHTML = "+" + String(otherContactsNodes.length);
        spanNode.addEventListener("click", () => {
            spanNode.style.display = "none";
            otherContactsNodes.forEach(contactNode => contactsTd.append(contactNode));
        });

        contactsTd.append(spanNode);
    } else {
        const contactsNodes = createContactsNodes(client.contacts);
        contactsNodes.forEach(contactNode => contactsTd.append(contactNode));
    };

    const updateTd = document.createElement("td");
    updateTd.classList.add("main-table__td");
    updateTd.innerHTML = `
        <img src="img/edit.svg" alt="Карандаш">
        <span>Изменить</span>
    `;
    updateTd.addEventListener("click", () => {
        popupContainerOverlay.style.display = "flex";
        updatePopup.style.display = "block";
        updatePopupSpan.innerHTML = "ID: " + client.id;
        updatePopupFormInputName.value = client.name;
        updatePopupFormInputSurName.value = client.surName;
        updatePopupFormInputLastName.value = client.lastName;
        updatePopupFormContactsList.innerHTML = "";
        updatePopupFormContactsList.style.display = client.contacts.length > 0 ? "flex" : "none";

        client.contacts.forEach((contact, index) => {
            const options = [
                {type: "phoneNumber", value: "Телефон"},
                {type: "extraPhoneNumber", value: "Доп. телефон"},
                {type: "email", value: "Email"},
                {type: "vk", value: "Vk"},
                {type: "facebook", value: "Facebook"},
            ];

            const liNode = document.createElement("li");
            liNode.classList.add("update-popup__contacts-item");
            liNode.setAttribute("id", index + 1);

            const selectNode = document.createElement("select");
            selectNode.classList.add("update-popup__contacts-select");
            options.forEach(option => {
                const optionNode = document.createElement("option");
                optionNode.value = option.value;
                optionNode.innerHTML = option.value;

                if (option.type === contact.type) optionNode.selected = true;
                selectNode.append(optionNode);
            });

            const inputNode = document.createElement("input");
            inputNode.classList.add("update-popup__contacts-input");
            inputNode.value = contact.value ? contact.value : "Введите данные контакта";
            inputNode.setAttribute("type", "text");
            inputNode.setAttribute("required", "");

            const btnNode = document.createElement("button");
            btnNode.classList.add("update-popup__contacts-btn--cross");
            btnNode.setAttribute("type", "button");

            const imgNode = document.createElement("img");
            imgNode.classList.add("update-popup__contacts-img--cross");
            imgNode.setAttribute("src", "img/contacts-cross.svg");
            imgNode.setAttribute("alt", "Крестик");
            btnNode.addEventListener("click", () => {
                imgNode.parentElement.parentElement.remove();
                
                // updatePopupFormContactsItemsNodes.forEach(contactItemNode => updatePopupFormContactsList.append(contactItemNode));
            });

            btnNode.append(imgNode);
            liNode.append(selectNode, inputNode, btnNode);
            updatePopupFormContactsList.append(liNode);
        });

        updatePopupFormContactsBtn.addEventListener("click", () => {
            updatePopupFormContactsList.style.display = "flex";

            if (updatePopupFormContactsItemsNodes.length < 10) {
                const liNode = document.createElement("li");
                liNode.classList.add("update-popup__contacts-item");
                liNode.setAttribute("id", updatePopupFormContactsItemsNodes.length + 1);

                const selectNode = document.createElement("select");
                selectNode.classList.add("update-popup__contacts-select");

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
                inputNode.classList.add("update-popup__contacts-input");
                inputNode.setAttribute("type", "text");
                inputNode.setAttribute("required", "");

                const btnNode = document.createElement("button");
                btnNode.classList.add("update-popup__contacts-btn--cross");
                btnNode.setAttribute("type", "button");

                const imgNode = document.createElement("img");
                imgNode.classList.add("update-popup__contacts-img--cross");
                imgNode.setAttribute("src", "img/contacts-cross.svg");
                imgNode.setAttribute("alt", "Крестик");
                btnNode.addEventListener("click", () => {
                    imgNode.parentElement.parentElement.remove();
                    
                    // updatePopupFormContactsItemsNodes.forEach(contactItemNode => updatePopupFormContactsList.append(contactItemNode));
                });

                btnNode.appendChild(imgNode);
                liNode.append(selectNode, inputNode, btnNode);
                updatePopupFormContactsList.appendChild(liNode);

                updatePopupFormContactsCountError.style.display = "none";
            } else {
                updatePopupFormContactsCountError.style.display = "block";
            };
        });

        updatePopupForm.addEventListener("submit", (e) => {
            e.preventDefault();

            let areAllInputsFilled = true;
            for (const item of updatePopupFormInputs) {
                if (item.value.trim() === "") {
                    areAllInputsFilled = false;
                    break;
                };
            };

            let areAllContactInputsFilled = true;
            const contactInputs = updatePopupFormContactsList.querySelectorAll(".update-popup__contacts-input");
            for (const item of contactInputs) {
                if (item.value.trim() === "") {
                    areAllContactInputsFilled = false;
                    break;
                };
            };

            if (areAllInputsFilled && areAllContactInputsFilled && updatePopupFormContactsList.children.length <= 10) {
                const updatedClient = {
                    id: client.id,
                    name: updatePopupFormInputName.value,
                    surName: updatePopupFormInputSurName.value,
                    lastName: updatePopupFormInputLastName.value,
                    createdAt: client.createdAt,
                    updatedAt: currentDate,
                    contacts: Array.from(updatePopupFormContactsList.children).map(item => {
                        const select = item.querySelector(".update-popup__contacts-select");
                        const contactTypeValue = {
                            "телефон": "phoneNumber",
                            "доп. телефон": "extraPhoneNumber",
                            "email": "Email",
                            "vk": "Vk",
                            "facebook": "Facebook"
                        }[select.options[select.selectedIndex].text.toLowerCase()];
                        return {
                            type: contactTypeValue,
                            value: item.querySelector(".update-popup__contacts-input").value
                        };
                    })
                };

                updateClientAtLocalStorage(updatedClient, client.id);

                clientsList = getClientsListFromLocalStorage();
                createClientsTable(clientsList);

                closePopup(
                    updatePopup, updatePopupFormInputs, updatePopupFormContactsList,
                    [updatePopupFormFieldsError, updatePopupFormContactsFieldsError, updatePopupFormContactsCountError]
                );
            } else {
                if (!areAllInputsFilled) updatePopupFormFieldsError.style.display = "block";
                if (!areAllContactInputsFilled) updatePopupFormContactsFieldsError.style.display = "block";
                if (updatePopupFormContactsList.children.length > 10) updatePopupFormContactsCountError.style.display = "block";
            };
        });

        updatePopupCrossImg.addEventListener("click", () => {
            closePopup(
                updatePopup, updatePopupFormInputs, updatePopupFormContactsList,
                [updatePopupFormFieldsError, updatePopupFormContactsCountError]
            );
        });

        updatePopupRemoveLink.addEventListener("click", () => {
            removeClientFromLocalStorage(client);
            clientsList = getClientsListFromLocalStorage();
            createClientsTable(clientsList);

            updatePopup.style.display = "none";
            popupContainerOverlay.style.display = "none";
        });
    });

    const removeTd = document.createElement("td");
    removeTd.classList.add("main-table__td");
    removeTd.innerHTML = `
        <img src="img/cancel.svg" alt="Крестик">
        <span>Удалить</span>
    `;
    removeTd.addEventListener("click", () => {
        removePopup.style.display = "block";
        popupContainerOverlay.style.display = "flex";

        removePopupSubmitBtn.addEventListener("click", () => {
            removeClientFromLocalStorage(client);

            clientsList = getClientsListFromLocalStorage();
            createClientsTable(clientsList);

            popupContainerOverlay.style.display = "none";
            removePopup.style.display = "none";
        });
    });

    tr.append(idTd, fioTd, createdAtTd, updatedAtTd, contactsTd, updateTd, removeTd);
    return tr;
};

// Обработчики событий
mainAddBtn.addEventListener("click", () => {
    addPopup.style.display = "block";
    popupContainerOverlay.style.display = "flex";
});

addPopupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let areAllInputsFilled = true;
    let areAllContactInputsFilled = true;
    for(const item of addPopupFormInputs) {
        if(item.value.trim() === "") {
            areAllInputsFilled = false;
            break;
        };
    };
    if(addPopupContactsItemsNodes.length !== 0) {
        for(const item of addPopupFormContactInputs) {
            if(item.value.trim() === "") {
                areAllContactInputsFilled = false;
                break;
            };
        };
    };
    
    if (areAllInputsFilled && areAllContactInputsFilled && addPopupContactsList.children.length <= 10) {
        const client = {
            id: getNextId(clientsList),
            name: addPopupFormInputName.value,
            surName: addPopupFormInputSurName.value,
            lastName: addPopupFormInputLastName.value,
            createdAt: currentDate,
            updatedAt: currentDate,
            contacts: Array.from(addPopupContactsList.children).map(item => {
                const select = item.querySelector(".add-popup__contacts-select");
                const contactTypeValue = {
                    "телефон": "phoneNumber",
                    "доп. телефон": "extraPhoneNumber",
                    "email": "Email",
                    "vk": "Vk",
                    "facebook": "Facebook"
                }[select.options[select.selectedIndex].text.toLowerCase()];
                return {
                    type: contactTypeValue,
                    value: item.querySelector(".add-popup__contacts-input").value
                };
            })
        };

        addClientToLocalStorage(client);

        clientsList = getClientsListFromLocalStorage();
        createClientsTable(clientsList);
        
        closePopup(
            addPopup, addPopupFormInputs, addPopupContactsList,
            [addPopupFormFieldsError, addPopupFormContactsFieldsError, addPopupFormContactsCountError]
        );
    } else {
        if (!areAllInputsFilled) addPopupFormFieldsError.style.display = "block";
        if (!areAllContactInputsFilled) addPopupFormContactsFieldsError.style.display = "block";
        if (addPopupContactsList.children.length > 10) addPopupFormContactsCountError.style.display = "block";
    };
});
[addPopupCrossImg, addPopupCancelLink].forEach(item => {
    item.addEventListener("click", () => {
        closePopup(
            addPopup, addPopupFormInputs, addPopupContactsList,
            [addPopupFormFieldsError, addPopupFormContactsFieldsError, addPopupFormContactsCountError]
        );
    });
});
addPopupContactsBtn.addEventListener("click", () => {
    addPopupContactsList.style.display = "flex";
    
    if(addPopupContactsItemsNodes.length < 10) {
        const liNode = document.createElement("li");
        liNode.classList.add("add-popup__contacts-item");
        
        const selectNode = document.createElement("select");
        selectNode.classList.add("add-popup__contacts-select");

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
        inputNode.classList.add("add-popup__contacts-input");
        inputNode.setAttribute("type", "text");

        const btnNode = document.createElement("button");
        btnNode.classList.add("add-popup__contacts-btn--cross");
        btnNode.setAttribute("type", "button");
        
        const imgNode = document.createElement("img");
        imgNode.classList.add("add-popup__contacts-img--cross");
        imgNode.setAttribute("src", "img/contacts-cross.svg");
        imgNode.setAttribute("alt", "Крестик");
        btnNode.addEventListener("click", () => {
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

[removePopupCrossImg, removePopupCancelLink].forEach(item => {
    item.addEventListener("click", () => {
        removePopup.style.display = "none";
        popupContainerOverlay.style.display = "none";
    });
});

// Сортировка
function sorting(arr, prop, direction = false) {
    let result = arr.sort((a, b) => (direction ? a[prop] < b[prop] : a[prop] > b[prop]) ? -1 : 0);

    return result;
};

const mainTableIdTd = document.querySelector(".main__table-th--id");
const mainTableFioTd = document.querySelector(".main__table-th--fio");
const mainTableCreatedAtTd = document.querySelector(".main__table-th--createdAt");
const mainTableUpdatedAtTd = document.querySelector(".main__table-th--updatedAt");

mainTableIdTd.addEventListener("click", () => {
    clearTable();

    mainTableIdTd.classList.contains("sorted") ? createClientsTable(sorting(clientsList, "id", false)) : createClientsTable(sorting(clientsList, "id", true));
    mainTableIdTd.classList.contains("sorted") ? mainTableIdTd.classList.remove("sorted") : mainTableIdTd.classList.add("sorted");
});
mainTableFioTd.addEventListener("click", () => {
    clearTable();

    mainTableFioTd.classList.contains("sorted") ? createClientsTable(sorting(clientsList, "name", false)) : createClientsTable(sorting(clientsList, "name", true));
    mainTableFioTd.classList.contains("sorted") ? mainTableFioTd.classList.remove("sorted") : mainTableFioTd.classList.add("sorted");
});
mainTableCreatedAtTd.addEventListener("click", () => {
    clearTable();

    mainTableCreatedAtTd.classList.contains("sorted") ? createClientsTable(sorting(clientsList, "createdAt", false)) : createClientsTable(sorting(clientsList, "createdAt", true));
    mainTableCreatedAtTd.classList.contains("sorted") ? mainTableCreatedAtTd.classList.remove("sorted") : mainTableCreatedAtTd.classList.add("sorted");
});
mainTableUpdatedAtTd.addEventListener("click", () => {
    clearTable();

    mainTableUpdatedAtTd.classList.contains("sorted") ? createClientsTable(sorting(clientsList, "updatedAt", false)) : createClientsTable(sorting(clientsList, "updatedAt", true));
    mainTableUpdatedAtTd.classList.contains("sorted") ? mainTableUpdatedAtTd.classList.remove("sorted") : mainTableUpdatedAtTd.classList.add("sorted");
});

// Поиск
function filterByFio(arr, searchValue) {
    let result = [];
    copy = [...arr];

    copy.forEach(item => {
        if (String(item.surName + " " + item.name + " " + item.lastName).toLowerCase().includes(searchValue.toLowerCase())) result.push(item);
    });

    return result;
};

const headerSearchInput = document.querySelector(".header__search");
headerSearchInput.addEventListener("input", () => {
    const searchValue = headerSearchInput.value.trim();
    createClientsTable(value ? filterByFio(clientsList, searchValue) : clientsList);
});

createClientsTable(clientsList);