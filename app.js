const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calcWealthBtn = document.getElementById('calculate-wealth');

let data = [];

// Format money
const formatMoney = number => {
    return '$' +number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

// Update the DOM
const updateDOM = (providedData = data) => {
    // Clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    })
};

// Add newUser to the Data arr
const addData = (obj) => {
    data.push(obj);
    updateDOM()
};

// Fetch random user and add money
const getRandomUser = async () => {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };
    addData(newUser)
};

// Double money
const doubleMoney = () => {
    data = data.map(user => {
        return {...user, money: user.money * 2}
    });
    updateDOM();
};

const sortByRichest = () => {
    data.sort((a, b) => b.money - a.money);
    updateDOM()
};

// Filter only millionaires
const showMillionaires = () => {
   data = data.filter(person => person.money > 1000000);
    updateDOM()
};

// Calculate wealth
const calculate = () => {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0)

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <stron>${formatMoney(wealth)}</stron></h3>`
    main.appendChild(wealthEl);
};

// Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calcWealthBtn.addEventListener('click', calculate);

getRandomUser();
getRandomUser();
getRandomUser();

