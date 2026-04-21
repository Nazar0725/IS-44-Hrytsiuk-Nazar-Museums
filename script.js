function userDialog() {
    let userName = prompt("Вітаємо у віртуальному гіді! Як вас звати?", "Відвідувач");
    
    if (userName === null || userName === "") {
        userName = "Шановний гість";
    }

    alert("Приємно познайомитися, " + userName + "!");

    let isInterested = confirm("Чи хотіли б ви пройти коротке опитування про музеї?");
    
    if (isInterested) {
        let choice;
        let running = true;

        while (running) {
            choice = prompt(
                "Яка тематика вам ближча?\n" +
                "1 - Живопис (Лувр/Уффіці)\n" +
                "2 - Археологія (Британський музей)\n" +
                "3 - Вихід з опитування"
            );

            switch (choice) {
                case "1":
                    alert("Тоді вам обов'язково варто відвідати сторінку Лувру або Уффіці!");
                    running = false; 
                    break;
                case "2":
                    alert("Британський музей чекає на вас з колекцією єгипетських мумій.");
                    running = false; 
                    break;
                case "3":
                    alert("Зрозумів. Продовжуйте самостійний огляд.");
                    running = false;
                    break;
                case null:
                    running = false;
                    break;
                default:
                    alert("Будь ласка, введіть число 1, 2 або 3.");
            }
        }
    } else {
        alert("Добре, просто насолоджуйтесь переглядом нашої колекції!");
    }
}

// Функція порівняння рядків (ВИПРАВЛЕНО: прибрано конфлікт імен)
function compareStrings(s1, s2) {
    if (!s1 || !s2) {
        alert("Помилка: один із рядків порожній.");
        return;
    }

    if (s1.length > s2.length) {
        alert("Популярніший: " + s1);
    } else if (s2.length > s1.length) {
        alert("Популярніший: " + s2);
    } else {
        alert("Експонати мають однакову популярність:\n1. " + s1 + "\n2. " + s2);
    }
}

// Зміна фону на 30 сек
const originalBackground = document.body.style.backgroundColor || "#f0f8ff";
document.body.style.backgroundColor = "#fff4d1";
setTimeout(function() {
    document.body.style.backgroundColor = originalBackground;
}, 30000);


// Перехід на іншу сторінку
function redirectToOfficialSite() {
    let confirmRedirect = confirm("Ви покидаєте наш сайт. Перейти на офіційну сторінку путівника?");
    if (confirmRedirect) {
        window.location.href = "https://artsandculture.google.com/";
    }
}

function searchAndModifyElements() {
    const mainHeader = document.getElementById('top');
    if (mainHeader) {
        mainHeader.style.borderBottom = "3px solid #1a5276";
    }

    const links = document.querySelectorAll('.menu-link');  
    links.forEach((link, index) => {
        if (index % 2 === 0) {
            link.style.backgroundColor = "#fdf9e7";
            link.style.color = "#2a2a72";
        }
    });

    const subHeaders = document.querySelectorAll('#main-container h3');
    subHeaders.forEach(h3 => {
        h3.style.borderBottom = "2px solid #d4af37";
    });
}


//Використати наступні властивості DOM-вузла: innerHTML, outerHTML, nodeValue / data, textContent.

// 1. innerHTML — додаємо іконку та змінюємо структуру всередині заголовка
const adminSection = document.getElementById('complex-section');
if (adminSection) {
    adminSection.innerHTML = '<span style="color: gold;">⭐</span> ' + 
                             adminSection.innerHTML 
}

// 2. outerHTML — замінюємо звичайне посилання 
const specialLink = document.getElementById('special-link');
if (specialLink) {
    // Ми повністю видаляємо тег <a> і ставимо на його місце <button>
    specialLink.outerHTML = `
        <button onclick="redirectToOfficialSite()" 
                style="background: #2a2a72; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; margin: 10px;">
            🚀 Відкрити Google Arts
        </button>`;
}

// 3. textContent — змінюємо текст ігноруючи теги
// Знайдемо перший елемент списку в Типах екскурсій
const firstListItem = document.querySelector('.styled-list ul li');
if (firstListItem) {
    firstListItem.textContent = "✨ Ексклюзивні індивідуальні гіди ";
    firstListItem.style.color = "#a04000"; 
}

// 4. nodeValue / data — змінюємо текст безпосередньо у вузлі
const footerText = document.querySelector('p[align="center"] a');
if (footerText && footerText.firstChild) {
    // Змінюємо текст "Повернутися вгору сторінки" на новий
    footerText.firstChild.nodeValue = "🔝 На самий початок галереї";
}

// 1. document.write — цей метод працює миттєво. 
// Додаємо банер ТІЛЬКИ якщо ми на потрібній сторінці.
if (window.location.pathname.includes('british_museum.html')) {
    document.write(`
        <div id="top-banner" style="background: #002344; color: #d4af37; text-align: center; padding: 12px; font-family: 'Georgia', serif; border-bottom: 2px solid #d4af37;">
            📜 Ласкаво просимо до зали Британського музею — головної скарбниці Лондона.
        </div>
    `);
}

window.addEventListener('DOMContentLoaded', () => {
    // ПЕРЕВІРКА: чи ми зараз на сторінці британського музею?
    if (!window.location.pathname.includes('british_museum.html')) {
        return; // Якщо ні — припиняємо роботу скрипта для цієї сторінки
    }

    // Тепер виконуємо маніпуляції ТІЛЬКИ для british_museum.html
    const mainContainer = document.getElementById('main-container');
    const tableBody = document.querySelector('.complex-table tbody');
    const exhibitList = document.querySelector('dl');

    // 2. document.createElement(tag) та document.createTextNode(text)
    const newRow = document.createElement('tr');
    newRow.style.backgroundColor = "#fdf9e7"; 
    
    const cellDept = document.createElement('td');
    const deptName = document.createTextNode("Відділ Стародавнього Єгипту");
    
    // 3. node.append — додаємо текст у комірку
    cellDept.append(deptName);

    const cellTime = document.createElement('td');
    cellTime.textContent = "10:00 – 17:30"; // швидший аналог createTextNode

    const cellWeekend = document.createElement('td');
    cellWeekend.textContent = "11:00 – 18:00";

    // Додаємо комірки в рядок, а рядок в таблицю
    newRow.append(cellDept, cellTime, cellWeekend);
    if (tableBody) tableBody.append(newRow);

    // 4. node.prepend — додаємо блок-попередження на початок контенту
    const ticketNotice = document.createElement('div');
    ticketNotice.style.cssText = "background: #fdf9e7; border: 1px solid #d4af37; padding: 10px; margin-bottom: 20px; border-radius: 5px;";
    ticketNotice.prepend("🎫 Важливо: "); 
    ticketNotice.append("Вхід до музею безкоштовний, але потребує попереднього запису.");
    if (mainContainer) mainContainer.prepend(ticketNotice);

    // 5. node.after — додаємо джерело після списку експонатів
    const sourceInfo = document.createElement('p');
    sourceInfo.style.fontSize = "11px";
    sourceInfo.innerHTML = "<i>Джерело даних: Офіційний каталог British Museum, 2026.</i>";
    if (exhibitList) exhibitList.after(sourceInfo);

    // 6. node.replaceWith — замінюємо звичайний заголовок на стилізований заголовок-блок
    const oldTitle = document.querySelector('h1');
    if (oldTitle) {
        const newHeader = document.createElement('h1');
        newHeader.className = "museum-main-title";
        newHeader.style.color = "#1a5276";
        newHeader.innerHTML = "BRITISH MUSEUM: ЦИФРОВА ЕКСПОЗИЦІЯ";
        oldTitle.replaceWith(newHeader);
    }

    // 7. node.remove() — видаляємо будь-який зайвий елемент (наприклад, пустий параграф)
    const emptyP = document.querySelector('.text-section p:empty');
    if (emptyP) {
        emptyP.remove();
    }
});

// ГОЛОВНИЙ ЗАПУСК (Все зібрано тут)
window.addEventListener('DOMContentLoaded', function() {
    // 1. Діалог з користувачем
    userDialog();

    // 2. Порівняння експонатів (запитуємо і передаємо в функцію)
    let firstInput = prompt("Введіть назву першого експоната:");
    let secondInput = prompt("Введіть назву другого експоната:");
    
    if (firstInput && secondInput) {
        compareStrings(firstInput, secondInput);
    }

    // 3. Зміна дизайну
    searchAndModifyElements();
});
