(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function addLoadedClass() {
        window.addEventListener("load", (function() {
            if (document.querySelector("body")) setTimeout((function() {
                document.querySelector("body").classList.add("_loaded");
            }), 200);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    if (sessionStorage.getItem("preloader")) {
        if (document.querySelector(".preloader")) document.querySelector(".preloader").classList.add("_hide");
        document.querySelector(".wrapper").classList.add("_visible");
    }
    if (sessionStorage.getItem("money")) {
        if (document.querySelector(".check")) document.querySelectorAll(".check").forEach((el => {
            el.textContent = sessionStorage.getItem("money");
        }));
    } else {
        sessionStorage.setItem("money", 1e4);
        if (document.querySelector(".check")) document.querySelectorAll(".check").forEach((el => {
            el.textContent = sessionStorage.getItem("money");
        }));
    }
    if (document.querySelector(".game")) if (+sessionStorage.getItem("money") >= 500) {
        sessionStorage.setItem("current-bet", 500);
        document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
    } else {
        sessionStorage.setItem("current-bet", 0);
        document.querySelector(".block-bet__coins").textContent = 0;
    }
    const preloader = document.querySelector(".preloader");
    const wrapper = document.querySelector(".wrapper");
    document.documentElement.clientWidth;
    document.documentElement.clientHeight;
    function deleteMoney(count, block) {
        let money = +sessionStorage.getItem("money");
        sessionStorage.setItem("money", money - count);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.add("_delete-money")));
            document.querySelectorAll(block).forEach((el => el.textContent = sessionStorage.getItem("money")));
        }), 500);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_delete-money")));
        }), 1900);
    }
    function noMoney(block) {
        document.querySelectorAll(block).forEach((el => el.classList.add("_no-money")));
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_no-money")));
        }), 1400);
    }
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function addMoney(count, block, delay, delay_off) {
        let money = Math.floor(+sessionStorage.getItem("money") + count);
        setTimeout((() => {
            sessionStorage.setItem("money", money);
            document.querySelectorAll(block).forEach((el => el.textContent = sessionStorage.getItem("money")));
            document.querySelectorAll(block).forEach((el => el.classList.add("_anim-add-money")));
        }), delay);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_anim-add-money")));
        }), delay_off);
    }
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [ array[j], array[i] ];
        }
        return array;
    }
    let anim_items = document.querySelectorAll(".icon-anim img");
    function getRandomAnimate() {
        let number = getRandom(0, 3);
        let arr = [ "jump", "scale", "rotate" ];
        let random_item = getRandom(0, anim_items.length);
        anim_items.forEach((el => {
            if (el.classList.contains("_anim-icon-jump")) el.classList.remove("_anim-icon-jump"); else if (el.classList.contains("_anim-icon-scale")) el.classList.remove("_anim-icon-scale"); else if (el.classList.contains("_anim-icon-rotate")) el.classList.remove("_anim-icon-rotate");
        }));
        setTimeout((() => {
            anim_items[random_item].classList.add(`_anim-icon-${arr[number]}`);
        }), 100);
    }
    if (document.querySelector(".icon-anim img")) setInterval((() => {
        getRandomAnimate();
    }), 2e4);
    const price_armor = 7500;
    if (document.querySelector(".main") && document.querySelector(".preloader").classList.contains("_hide")) {
        document.querySelector(".main").classList.add("_active");
        drawPriceArmor();
        drawStorrStartArmor();
        drawCountArmor();
    }
    function drawPriceArmor() {
        document.querySelector(".shop__button p").textContent = price_armor;
    }
    function drawStorrStartArmor() {
        if (!sessionStorage.getItem("armor")) sessionStorage.setItem("armor", 0);
    }
    function drawCountArmor() {
        if (!sessionStorage.getItem("armor")) sessionStorage.setItem("armor", 0);
        document.querySelector(".armor__count").textContent = sessionStorage.getItem("armor");
    }
    if (document.querySelector(".game") && document.querySelector(".preloader").classList.contains("_hide")) drawCountArmor();
    const config_game = {
        state: 1,
        current_win: 0,
        numbers: [ 1, 2, 3, 4, 5, 6, 7, 8 ],
        cards: [ 1, 2, 3, 4, 5, 6, 7, 8 ],
        find_card: 0
    };
    const bet_coeffs = {
        coeff_1: .5,
        coeff_2: 1,
        coeff_3: 1.5,
        coeff_4: 2,
        coeff_5: 2.5,
        coeff_6: 3,
        coeff_7: 5
    };
    function drawCurerntCoeff() {
        let bet = +sessionStorage.getItem("current-bet");
        if (bet <= 1e3) {
            bet_coeffs.coeff_1 = .1;
            bet_coeffs.coeff_2 = .7;
            bet_coeffs.coeff_3 = 1;
            bet_coeffs.coeff_4 = 1.2;
            bet_coeffs.coeff_5 = 1.5;
            bet_coeffs.coeff_6 = 1.8;
            bet_coeffs.coeff_7 = 2;
        } else if (bet > 1e3 && bet <= 2e3) {
            bet_coeffs.coeff_2 = 1;
            bet_coeffs.coeff_3 = 1.1;
            bet_coeffs.coeff_4 = 1.3;
            bet_coeffs.coeff_5 = 1.7;
            bet_coeffs.coeff_6 = 2;
            bet_coeffs.coeff_7 = 2.5;
        } else if (bet > 2e3) {
            bet_coeffs.coeff_3 = 1.5;
            bet_coeffs.coeff_4 = 2;
            bet_coeffs.coeff_5 = 2.5;
            bet_coeffs.coeff_6 = 3;
            bet_coeffs.coeff_7 = 5;
        }
    }
    function startGame() {
        deleteMoney(+sessionStorage.getItem("current-bet"), ".check");
        addHoldBetBlock();
        addHoldBtnStart();
        setTimeout((() => {
            deleteCards();
            drawCurerntCoeff();
        }), 500);
        setTimeout((() => {
            config_game.state = 2;
            createAllCards();
        }), 3e3);
    }
    function addHoldBetBlock() {
        document.querySelector(".block-bet__controls").classList.add("_hold");
    }
    function addHoldBtnStart() {
        document.querySelector(".footer__button").classList.add("_hold");
    }
    function removeHoldBtnStart() {
        if (document.querySelector(".footer__button").classList.contains("_hold")) document.querySelector(".footer__button").classList.remove("_hold");
    }
    function removeHoldBetBlock() {
        if (document.querySelector(".block-bet__controls").classList.contains("_hold")) document.querySelector(".block-bet__controls").classList.remove("_hold");
    }
    function deleteCards() {
        document.querySelectorAll(".cards__card").forEach((card => card.classList.add("_remove")));
        setTimeout((() => {
            document.querySelectorAll(".cards__card").forEach((card => card.remove()));
        }), 2e3);
    }
    function createAllCards() {
        translateBet();
        shuffleCards();
        createCard(config_game.cards[0], config_game.numbers[0], 7, ".cards__items_top");
        createCard(config_game.cards[1], config_game.numbers[1], 5, ".cards__items_top");
        createCard(config_game.cards[2], config_game.numbers[2], 3, ".cards__items_top");
        createCard(config_game.cards[3], config_game.numbers[3], 1, ".cards__items_top");
        createCard(config_game.cards[4], config_game.numbers[4], 8, ".cards__items_bottom");
        createCard(config_game.cards[5], config_game.numbers[5], 6, ".cards__items_bottom");
        createCard(config_game.cards[6], config_game.numbers[6], 4, ".cards__items_bottom");
        createCard(config_game.cards[7], config_game.numbers[7], 2, ".cards__items_bottom");
        showFindCard();
    }
    function translateBet() {
        let bet = +sessionStorage.getItem("current-bet");
        if (bet >= 2500) config_game.numbers = [ 1, 1, 1, 4, 5, 6, 7, 8 ]; else if (bet >= 1500) config_game.numbers = [ 1, 1, 3, 4, 5, 6, 7, 8 ];
    }
    function shuffleCards() {
        let numbers = shuffle(config_game.numbers);
        let cards = shuffle(config_game.cards);
        config_game.numbers = numbers;
        config_game.cards = cards;
    }
    function createCard(item, character, style, block) {
        let cards__card = document.createElement("div");
        cards__card.classList.add("cards__card");
        cards__card.classList.add("_show");
        cards__card.setAttribute("style", `--i:${style}`);
        cards__card.setAttribute("data-character", character);
        setTimeout((() => {
            cards__card.classList.remove("_show");
        }), 2e3);
        let cards__front = document.createElement("img");
        setTimeout((() => {
            if (document.documentElement.classList.contains("webp")) cards__front.setAttribute("src", "img/game/card-bg.webp"); else cards__front.setAttribute("src", "img/game/card-bg.png");
        }), 100);
        cards__front.setAttribute("alt", "Image");
        cards__front.classList.add("cards__front");
        let cards__back = document.createElement("img");
        setTimeout((() => {
            if (document.documentElement.classList.contains("webp")) cards__back.setAttribute("src", `img/game/card-${item}.webp`); else cards__back.setAttribute("src", `img/game/card-${item}.png`);
        }), 1e3);
        cards__back.setAttribute("alt", "Image");
        cards__back.classList.add("cards__back");
        let cards__state = document.createElement("div");
        cards__state.classList.add("cards__state");
        let text = document.createElement("p");
        text.textContent = "";
        if (1 == character) text.textContent = "killer"; else if (2 == character) text.textContent = `x${bet_coeffs.coeff_1}`; else if (3 == character) text.textContent = `x${bet_coeffs.coeff_2}`; else if (4 == character) text.textContent = `x${bet_coeffs.coeff_3}`; else if (5 == character) text.textContent = `x${bet_coeffs.coeff_4}`; else if (6 == character) text.textContent = `x${bet_coeffs.coeff_5}`; else if (7 == character) text.textContent = `x${bet_coeffs.coeff_6}`; else if (8 == character) {
            text.textContent = `x${bet_coeffs.coeff_7}`;
            config_game.find_card = item;
        }
        cards__state.append(text);
        cards__card.append(cards__front, cards__back, cards__state);
        document.querySelector(block).append(cards__card);
    }
    function showFindCard() {
        document.querySelector(".info__card img").setAttribute("src", `img/game/card-${config_game.find_card}.png`);
        setTimeout((() => {
            document.querySelector(".info__card").classList.add("_visible");
        }), 1500);
    }
    function checkGameover(number, block) {
        let bet = +sessionStorage.getItem("current-bet");
        let armor = +sessionStorage.getItem("armor");
        setTimeout((() => {
            block.classList.remove("_rotate");
        }), 500);
        if (1 == number && armor > 0) {
            block.classList.add("_shadow-armor");
            useArmor();
        } else if (1 == number && armor <= 0) {
            config_game.state = 1;
            setTimeout((() => {
                block.classList.add("_shadow-loose");
            }), 500);
            setTimeout((() => {
                showAllCards();
                writeLooseInfo();
                document.querySelector(".info__button-reset-box").classList.add("_visible");
            }), 2e3);
        } else if (number > 1 && number < 8) {
            if (2 == number) config_game.current_win = config_game.current_win + bet * bet_coeffs.coeff_1; else if (3 == number) config_game.current_win = config_game.current_win + bet * bet_coeffs.coeff_2; else if (4 == number) config_game.current_win = config_game.current_win + bet * bet_coeffs.coeff_3; else if (5 == number) config_game.current_win = config_game.current_win + bet * bet_coeffs.coeff_4; else if (6 == number) config_game.current_win = config_game.current_win + bet * bet_coeffs.coeff_5; else if (7 == number) config_game.current_win = config_game.current_win + bet * bet_coeffs.coeff_6;
            setTimeout((() => {
                block.classList.add("_shadow-win");
            }), 500);
        } else if (8 == number) {
            config_game.state = 1;
            config_game.current_win = config_game.current_win + bet * bet_coeffs.coeff_7;
            setTimeout((() => {
                block.classList.add("_shadow-win");
            }), 500);
            setTimeout((() => {
                document.querySelector(".info__card-box").classList.add("_found");
            }), 1500);
            setTimeout((() => {
                writeWinCount();
                showAllCards();
                document.querySelector(".info__button-reset-box").classList.add("_visible");
                addMoney(config_game.current_win, ".check");
            }), 2e3);
        }
    }
    function writeWinCount() {
        document.querySelector(".footer__win-info p").textContent = `win ${config_game.current_win}`;
        document.querySelector(".footer__win-info").classList.add("_visible");
    }
    function writeLooseInfo() {
        document.querySelector(".footer__win-info p").textContent = `loose`;
        document.querySelector(".footer__win-info").classList.add("_visible");
    }
    function showAllCards() {
        document.querySelectorAll(".cards__card").forEach((card => {
            if (!card.classList.contains("_open")) card.classList.add("_open");
            if (!card.classList.contains("_shadow-win") && !card.classList.contains("_shadow-loose") && !card.classList.contains("_shadow-armor")) card.classList.add("_rotate-complete");
        }));
    }
    function useArmor() {
        setTimeout((() => {
            document.querySelector(".armor-block__image").classList.add("_use");
        }), 1e3);
        setTimeout((() => {
            document.querySelector(".armor-block__image").classList.remove("_use");
            sessionStorage.setItem("armor", +sessionStorage.getItem("armor") - 1);
            drawCountArmor();
        }), 2e3);
    }
    function resetGame() {
        removeHoldBtnStart();
        removeHoldBetBlock();
        config_game.state = 1;
        config_game.current_win = 0;
        config_game.numbers = [ 1, 2, 3, 4, 5, 6, 7, 8 ];
        if (document.querySelector(".info__card").classList.contains("_visible")) document.querySelector(".info__card").classList.add("_visible");
        if (document.querySelector(".footer__win-info").classList.contains("_visible")) document.querySelector(".footer__win-info").classList.remove("_visible");
        if (document.querySelector(".info__button-reset-box").classList.contains("_visible")) document.querySelector(".info__button-reset-box").classList.remove("_visible");
        if (document.querySelector(".info__card-box").classList.contains("_found")) document.querySelector(".info__card-box").classList.remove("_found");
        document.querySelectorAll(".cards__card").forEach((card => {
            if (card.classList.contains("_shadow-armor")) card.classList.remove("_shadow-armor");
            if (card.classList.contains("_shadow-loose")) card.classList.remove("_shadow-loose");
            if (card.classList.contains("_shadow-win")) card.classList.remove("_shadow-win");
            if (card.classList.contains("_rotate-complete")) card.classList.remove("_rotate-complete");
            if (card.classList.contains("_open")) card.classList.remove("_open");
        }));
        if (document.querySelector(".info__card").classList.contains("_visible")) document.querySelector(".info__card").classList.remove("_visible");
    }
    if (document.querySelector(".main")) {
        const audio_main = document.querySelector(".audio_main");
        audio_main.preload = "auto";
        audio_main.volume = [ .3 ];
        document.addEventListener("click", (e => {
            let targetElement = e.target;
            if (targetElement.closest(".volume")) {
                if (targetElement.closest(".volume") && !targetElement.closest(".volume").classList.contains("_hide")) audio_main.pause(); else if (targetElement.closest(".volume") && targetElement.closest(".volume").classList.contains("_hide")) audio_main.play();
                targetElement.closest(".volume").classList.toggle("_hide");
            }
        }));
    }
    if (document.querySelector(".game")) {
        const audio_game = document.querySelector(".audio_game");
        audio_game.preload = "auto";
        audio_game.volume = [ .3 ];
        document.addEventListener("click", (e => {
            let targetElement = e.target;
            if (targetElement.closest(".volume")) {
                if (targetElement.closest(".volume") && !targetElement.closest(".volume").classList.contains("_hide")) audio_game.pause(); else if (targetElement.closest(".volume") && targetElement.closest(".volume").classList.contains("_hide")) audio_game.play();
                targetElement.closest(".volume").classList.toggle("_hide");
            }
        }));
    }
    document.addEventListener("click", (e => {
        let targetElement = e.target;
        let bank = +sessionStorage.getItem("money");
        let current_bet = +sessionStorage.getItem("current-bet");
        if (targetElement.closest(".preloader__button")) {
            sessionStorage.setItem("preloader", true);
            preloader.classList.add("_hide");
            wrapper.classList.add("_visible");
            if (document.querySelector(".main") && document.querySelector(".preloader").classList.contains("_hide")) {
                document.querySelector(".main").classList.add("_active");
                drawPriceArmor();
                drawStorrStartArmor();
                drawCountArmor();
            }
        }
        if (targetElement.closest(".content-main__button_shop")) document.querySelector(".main__body").classList.add("_shop");
        if (targetElement.closest(".main__button-home")) document.querySelector(".main__body").classList.remove("_shop");
        if (targetElement.closest(".shop__button")) if (bank >= price_armor) {
            deleteMoney(price_armor, ".check");
            sessionStorage.setItem("armor", +sessionStorage.getItem("armor") + 1);
            drawCountArmor();
        } else noMoney(".check");
        if (targetElement.closest(".block-bet__minus")) if (current_bet > 500) {
            sessionStorage.setItem("current-bet", current_bet - 500);
            document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
        }
        if (targetElement.closest(".block-bet__plus")) if (bank - 499 > current_bet) {
            sessionStorage.setItem("current-bet", current_bet + 500);
            document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
        } else noMoney(".check");
        if (targetElement.closest(".block-bet__min")) if (bank >= 500) {
            sessionStorage.setItem("current-bet", 500);
            document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
        } else noMoney(".check");
        if (targetElement.closest(".block-bet__max")) if (bank >= 500) {
            sessionStorage.setItem("current-bet", bank);
            document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
        } else noMoney(".check");
        if (targetElement.closest(".footer__button")) startGame();
        if (targetElement.closest(".cards__card") && 1 == config_game.state) {
            document.querySelector(".footer__button").classList.add("_anim");
            setTimeout((() => {
                document.querySelector(".footer__button").classList.remove("_anim");
            }), 1e3);
        }
        if (targetElement.closest(".cards__card") && 2 == config_game.state) {
            targetElement.closest(".cards__items").classList.add("_active");
            targetElement.closest(".cards__card").classList.add("_rotate");
            setTimeout((() => {
                targetElement.closest(".cards__card").classList.add("_open");
            }), 200);
            setTimeout((() => {
                targetElement.closest(".cards__items").classList.remove("_active");
            }), 1e3);
            checkGameover(+targetElement.closest(".cards__card").dataset.character, targetElement.closest(".cards__card"));
        }
        if (targetElement.closest(".info__button-reset")) resetGame();
    }));
    window["FLS"] = true;
    isWebp();
    addLoadedClass();
})();