// Плавная прокрутка при нажатии на якорные ссылки
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Функция для добавления класса активности при прокрутке
function setActiveLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const currentId = section.getAttribute('id');
            // Удаляем класс активности с всех ссылок
            document.querySelectorAll('.wrap a').forEach(link => link.classList.remove('active-link'));
            // Добавляем класс активности к текущей ссылке
            document.querySelector(`a[href="#${currentId}"]`).classList.add('active-link');
        }
    });
}

// Слушаем события прокрутки
window.addEventListener('scroll', setActiveLink);







document.addEventListener('DOMContentLoaded', function() {
    const btnPrev = document.querySelector('.btn-prev');
    const btnNext = document.querySelector('.btn-next');
    const btnSend = document.querySelector('.send'); // Кнопка отправки
    const items = document.querySelectorAll('.item');

    function updateButtonStates() {
        const activeItem = document.querySelector('.item-active');
        btnPrev.disabled = activeItem.classList.contains('item-first');
        btnNext.disabled = activeItem.classList.contains('item-last');
    }

    // Инициализация состояния кнопок
    updateButtonStates();

    btnPrev.addEventListener('click', function(e) {
        e.preventDefault();
        const activeItem = document.querySelector('.item-active');
        if (activeItem.previousElementSibling) {
            activeItem.classList.remove('item-active');
            activeItem.previousElementSibling.classList.add('item-active');
            updateButtonStates();
        }
    });

    btnNext.addEventListener('click', function(e) {
        e.preventDefault();
        const activeItem = document.querySelector('.item-active');
        if (activeItem.nextElementSibling) {
            activeItem.classList.remove('item-active');
            activeItem.nextElementSibling.classList.add('item-active');
            updateButtonStates();
        }
    });

    btnSend.addEventListener('click', function(e) {
        e.preventDefault();
    
        const phoneInput = document.querySelector('#phone');
        const allInputs = document.querySelectorAll('input[type="text"], input[type="tel"], input[type="number"], input[type="radio"]:checked');
        
        const allFilled = Array.from(allInputs).every(input => {
            if (input.type === 'radio') {
                return input.checked; // Проверяем только радиокнопки
            }
            return input.value.trim() !== ''; // Проверяем текстовые и числовые поля
        });
    
        // Проверка, что номер телефона введен полностью
        const phonePattern = /^\+375 \(\d{2}\) \d{3} - \d{2} - \d{2}$/;
        const isPhoneValid = phonePattern.test(phoneInput.value);
    
        if (!allFilled || !isPhoneValid) {
            alert('Заполните пожалуйста все поля корректно!');
        } else {
            console.log('Все поля заполнены. Отправка данных...');
            // Очистка полей формы
            document.querySelector('.calc').reset(); // Сбрасывает все поля формы
            window.location.href = 'thanks.html'; // Перенаправление на страницу "thanks.html"
        }
    });
});






// МАСКА ТЕЛЕФОНА
[].forEach.call(document.querySelectorAll('.tel'), function (input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+375 (__) ___ - __ - __",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function (a) {
                return i < val.length ? val.charAt(i++) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function (a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
            this.value = new_value;
        }
        if (event.type == "blur" && this.value.length < 5) {
            this.value = "";
        }
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);

});