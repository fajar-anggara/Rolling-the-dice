'use strict';
let activePlayer = 1;
const rollTheDice = () => {
  return Math.trunc(Math.random() * 6) + 1;
};
const player0 = {
  prop: {
    score: 0,
    current: 0,
  },
};
const player1 = {
  prop: {
    score: 0,
    current: 0,
  },
};
const dom = (theClass, expectedResult = 't', domVal = null) => {
  let ER = null;
  if (expectedResult == 't') {
    domVal
      ? (document.querySelector(theClass).textContent = domVal)
      : (ER = 'textContent');
  } else if (expectedResult == 'v') {
    domVal ? (document.querySelector(theClass).value = domVal) : (ER = 'value');
  } else {
    return document.querySelector(theClass);
  }
  return document.querySelector(theClass)[ER];
};
const action = type => {
  let rolledDice = 0;
  switch (type) {
    case 'new':
      player1.prop.score = 0;
      player1.prop.current = 0;
      player0.prop.current = 0;
      player0.prop.score = 0;
      break;
    case 'roll':
      rolledDice = rollTheDice();
      if (rolledDice == 1) {
        activePlayer ? (player1.prop.current = 0) : (player0.prop.current = 0);
        activePlayer ? (activePlayer = 0) : (activePlayer = 1);
      } else {
        activePlayer
          ? (player1.prop.current = player1.prop.current + rolledDice)
          : (player0.prop.current = player0.prop.current + rolledDice);
      }
      dom(
        activePlayer ? '#current--1' : '#current--0',
        't',
        activePlayer ? player1.prop.current + '' : player0.prop.current + ''
      );
      dom('.dice', null).src = 'dice-' + rolledDice + '.png';
      break;
    case 'hold':
      activePlayer
        ? (player1.prop.score = player1.prop.score + player1.prop.current)
        : (player0.prop.score = player0.prop.score + player0.prop.current);
      dom(
        activePlayer ? '#score--1' : '#score--0',
        't',
        activePlayer ? player1.prop.score + '' : player0.prop.score + ''
      );
      activePlayer ? (player1.prop.current = 0) : (player0.prop.current = 0);
      activePlayer ? (activePlayer = 0) : (activePlayer = 1);
      break;
    default:
      break;
  }
  if (activePlayer) {
    dom('.player--1', null).classList.add('player--active');
    dom('.player--0', null).classList.remove('player--active');
  } else {
    dom('.player--0', null).classList.add('player--active');
    dom('.player--1', null).classList.remove('player--active');
  }
};
dom('.btn--roll', null).addEventListener('click', () => {
  action('roll');
});
dom('.btn--hold', null).addEventListener('click', () => {
  action('hold');
});
dom('.btn--new', null).addEventListener('click', () => {
  action('new');
});
