let cardNumberInput;
let cardNameInput;
let cardSelectMonth;
let cardSelectYear;
let cardCVVInput;

let cardNumberSpans;
let cardNameDisplay;
let cardExpiresMonth;
let cardExpiresYear;
let cardCVVDisplay;

let cardPreview;
let cardLogoContainers;

const cardLogos = {
  4: "/images/visa.png",
  5: "/images/mastercard.png",
};

const prepareDOMElements = () => {
  cardNumberInput = document.querySelector("#form-number");
  cardNameInput = document.querySelector("#form-name");
  cardSelectMonth = document.querySelector("#form-month");
  cardSelectYear = document.querySelector("#form-year");
  cardCVVInput = document.querySelector("#form-cvv");

  cardNumberSpans = document.querySelectorAll(".card__number-digit");
  cardNameDisplay = document.querySelector("#card-holder");
  cardExpiresMonth = document.querySelector("#card-expires-month");
  cardExpiresYear = document.querySelector("#card-expires-year");
  cardCVVDisplay = document.querySelector("#card-cvv");

  cardLogoContainers = document.querySelectorAll(".card__logo");
  cardPreview = document.querySelector(".card");
};

const prepareDOMEvents = () => {
  cardNumberInput.addEventListener("input", updateCardNumber);
  cardNameInput.addEventListener("input", updateCardName);
  cardCVVInput.addEventListener("input", updateCardCVV);
  cardCVVInput.addEventListener("focus", () => {
    cardPreview.classList.add("flipped");
  });
  cardCVVInput.addEventListener("blur", () => {
    cardPreview.classList.remove("flipped");
  });
  cardSelectMonth.addEventListener("change", updateCardMonthExpires);
  cardSelectYear.addEventListener("change", updateCardYearExpires);
};

const updateCardNumber = () => {
  const truncatedValue = truncateValue(
    cardNumberInput.value,
    cardNumberInput.maxLength,
    "",
  );

  cardNumberInput.value = truncatedValue;

  const digits = truncatedValue.split("");

  cardNumberSpans.forEach((span, index) => {
    const isFadeUp = span.classList.contains("fadeUp");

    if (isFadeUp) {
      span.classList.remove("fadeUp");
    } else {
      span.classList.remove("fadeDown");
    }

    if (index < digits.length) {
      span.textContent = digits[index];
      span.classList.add("fadeDown");
    } else if (span.textContent !== "#") {
      span.textContent = "#";
      span.classList.add("fadeUp");
      span.classList.remove("fadeDown");
    }
  });

  const newSrc = cardLogos[digits[0]] || cardLogos["4"];

  cardLogoContainers.forEach(container => {
    const img = container.querySelector("img");

    if (img) {
      img.setAttribute("src", newSrc);
    }
  });
};

const updateCardName = () => {
  const value = cardNameInput.value.trim() || "Jan Kowalski";

  cardNameDisplay.textContent = value;
};

const updateCardCVV = () => {
  const truncatedValue = truncateValue(
    cardCVVInput.value,
    cardCVVInput.maxLength,
    "XXX",
  );

  cardCVVInput.value = truncatedValue;
  cardCVVDisplay.textContent = truncatedValue;
};

const updateCardMonthExpires = () => {
  const month = cardSelectMonth.value || "MM";

  cardExpiresMonth.textContent = month;

  addFadeDownAnimation(cardExpiresMonth);
};

const updateCardYearExpires = () => {
  const year = cardSelectYear.value ? cardSelectYear.value.slice(2) : "YY";

  cardExpiresYear.textContent = year;

  addFadeDownAnimation(cardExpiresYear);
};

const truncateValue = (value, maxLength, defaultValue = "") => {
  const numericValue = value.replace(/\D/g, "") || defaultValue;

  return numericValue.length > maxLength
    ? numericValue.slice(0, maxLength)
    : numericValue;
};

const addDefaultLogos = () => {
  cardLogoContainers.forEach(container => {
    const img = document.createElement("img");

    img.setAttribute("src", cardLogos["4"]);
    img.setAttribute("alt", "This is image");
    img.setAttribute("title", "This is image");

    container.appendChild(img);
  });
};

const addFadeDownAnimation = element => {
  element.classList.remove("fadeDown");
  setTimeout(() => {
    element.classList.add("fadeDown");
  }, 0);
};

export default function () {
  prepareDOMElements();
  addDefaultLogos();
  prepareDOMEvents();
}
