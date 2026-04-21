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

//Частина 3

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
        return; 
    }

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
    cellTime.textContent = "10:00 – 17:30";

    const cellWeekend = document.createElement('td');
    cellWeekend.textContent = "11:00 – 18:00";

    // Додаємо комірки в рядок, а рядок в таблицю
    newRow.append(cellDept, cellTime, cellWeekend);
    if (tableBody) tableBody.append(newRow);

    // 4. node.prepend — додаємо блок-попередження на початок контенту
  // Створюємо унікальний блок, якого точно немає в HTML
const ticketNotice = document.createElement('div');
ticketNotice.id = "js-ticket-notice"; // Новий ID
ticketNotice.style.cssText = "background: #2a2a72; color: white; padding: 15px; margin: 20px 0; border: 3px solid gold; border-radius: 10px; font-size: 18px; text-align: center;";

ticketNotice.prepend("🎫 Важливо: "); 
ticketNotice.append("Вхід до музею безкоштовний, але потребує попереднього запису.");

// Шукаємо заголовок і вставляємо ПІСЛЯ нього, щоб було краще видно
const header = document.querySelector('h1');
if (header) {
    header.after(ticketNotice);
}

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

    // 7. node.remove() 
 // Знаходимо блок "Цікавий факт" за його класом
const factBox = document.querySelector('.sidebar-info');

// Перевіряємо, чи він існує, і видаляємо
if (factBox) {
    setTimeout(function() {
        factBox.remove();
    }, 5000); 
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


// 4 РОБОТА З ПОДІЯМИ


// АВДАННЯ 1: Подія миші (Атрибут та Властивість)

// 1.1 Функція-обробник
function mouseAttributeHandler() {
    alert(" Нічні екскурсії доступні лише по п'ятницях!");
}

function mousePropertyHandler() {
    mouseAttributeHandler(); 

    this.style.backgroundColor = "#d4af37";
    this.style.color = "white";
}
// 1.2 Призначення через властивість (Property)
const propBtn = document.getElementById('property-btn');
if (propBtn) {
    propBtn.onclick = mousePropertyHandler;
}


// ЗАВДАННЯ 2: addEventListener та декілька обробників 

const multiBtn = document.getElementById('multi-handler-btn');

function handlerOne() {
    alert(" Дякуємо за підписку!");
}

function handlerTwo() {
    this.innerText = "✅ Ви підписані";
    this.disabled = true;
}

if (multiBtn) {
    multiBtn.addEventListener('click', handlerOne);
    multiBtn.addEventListener('click', handlerTwo);
}


// ЗАВДАННЯ 3 та 4: Об'єкт як обробник та видалення події

// Об'єкт-обробник
let museumGuide = {
    handleEvent(event) {
 
        let element = event.currentTarget;
        
        switch(event.type) {
            case 'mousedown':
                element.style.border = "3px solid gold";
                alert("Гід активований");
                break;
            case 'mouseup':
                element.style.border = "1px solid #16a085";
                break;
        }
    }
};

const guideBox = document.getElementById('museum-guide-box');
const stopBtn = document.getElementById('stop-guide-btn');

if (guideBox) {

    guideBox.addEventListener('mousedown', museumGuide);
    guideBox.addEventListener('mouseup', museumGuide);
}

// ЗАВДАННЯ 4: Видалення обробника 
if (stopBtn && guideBox) {
    stopBtn.onclick = function() {
        guideBox.removeEventListener('mousedown', museumGuide);
        guideBox.removeEventListener('mouseup', museumGuide);
        guideBox.innerHTML = "❌ Гід більше не реагує .";
        guideBox.style.background = "#eee";
        alert("Гід вимкнений.");
    };
}


// ЛОГІКА ДЛЯ ГАЛЕРЕЇ УФФІЦІ


document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Делегування: Підсвічування списку художників
    const artistList = document.getElementById('artist-list');
    if (artistList) {
        artistList.onclick = function(event) {
            // Використовуємо event.target, щоб знайти на що натиснули
            let target = event.target;
            if (target.tagName !== 'LI') return;

            // Знімаємо підсвічування з інших і додаємо поточному
            let allItems = artistList.querySelectorAll('li');
            allItems.forEach(li => li.classList.remove('selected-artist'));
            
            target.classList.add('selected-artist');
        };
    }

    // 2. Делегування: Меню сервісів через data-action
    const uffiziServices = document.getElementById('uffizi-services');
    const serviceActions = {
        buyTicket() {
            alert("Переспрямування на сторінку оплати квитків в Уффіці...");
        },
        virtualTour() {
            alert("Запуск 3D-панорами зали Боттічеллі...");
        },
        toggleMap() {
            const map = document.getElementById('museum-map');
            if (map) map.hidden = !map.hidden;
        }
    };

    if (uffiziServices) {
        uffiziServices.onclick = function(event) {
            let action = event.target.dataset.action;
            if (action && serviceActions[action]) {
                serviceActions[action]();
            }
        };
    }

    // 3. Прийом "Поведінка": Глобальний обробник для data-counter
    document.addEventListener('click', function(event) {
        let target = event.target.closest('[data-counter]'); 
        if (target) {
            let span = target.querySelector('span');
            if (span) {
                span.textContent = parseInt(span.textContent) + 1;
            }
        }
    });
});

// ==========================================
// ЗАВДАННЯ: ПОДІЇ МИШІ ТА DRAG-AND-DROP
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Перевіряємо, чи ми на сторінці Уффіці
    if (!window.location.pathname.includes('uffizi.html')) return;

    const dragItem = document.getElementById('draggable-exhibit');
    const zoneStart = document.getElementById('zone-start');
    const zoneEnd = document.getElementById('zone-end');

    // Функція для налаштування логіки зони (щоб не дублювати код для обох квадратів)
    function setupDropZone(zone) {
        // Дозволяємо скидання
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.style.background = "#e67e22"; // Підсвітка при наведенні
        });

        // Повертаємо фон, якщо об'єкт винесли за межі зони
        zone.addEventListener('dragleave', () => {
            zone.style.background = "";
        });

        // Логіка самого скидання
        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.style.background = ""; // Скидаємо фон
            
            const id = e.dataTransfer.getData('text/plain');
            const draggableElement = document.getElementById(id);
            
            // Якщо ми повертаємо в початкову зону, можемо додати текст назад
            if (zone.id === 'zone-start') {
                zone.append(draggableElement);
            } else {
                // Якщо в зону реставрації — очищуємо напис і кладемо картинку
                zone.innerHTML = ''; 
                zone.append(draggableElement);
                alert("Експонат у залі реставрації!");
            }
        });
    }

    if (dragItem && zoneStart && zoneEnd) {
        // Налаштовуємо початковий стан картинки
        dragItem.setAttribute('draggable', true);

        dragItem.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
            dragItem.style.opacity = "0.5";
        });

        dragItem.addEventListener('dragend', () => {
            dragItem.style.opacity = "1";
        });

        // Активуємо обидві зони для прийому об'єктів
        setupDropZone(zoneStart);
        setupDropZone(zoneEnd);
    }
});