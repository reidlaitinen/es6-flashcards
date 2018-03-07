var flashCards = [
  { question: "What is this: () => {} ",
    answer: 'An arrow function'
  },
  { question: 'Difference between let and var?',
    answer: "let isn't hoisted, which allows for better scoping."
  },
  { question: 'What is the shorthand for obj = { x: x, y: y }',
    answer: 'obj = { x, y }'
  },
  { question: `for (let n of fibonacci) {\n
    if (n > 1000)\n
        break\n
    console.log(n)
}
The above is an example of...`,
    answer: 'A for n loop'
  },
  { question: 'Use backticks and ${} to perform...',
    answer: 'string interpolation'
  },
  { question: `console.log(sum(...numbers));\n
                the above is an example of:`,
    answer: 'Spread operator'
  },
  { question: 'Difference betwen a Set and an Array?',
    answer: 'A Set has unique values.'
  },
  { question: 'What do promises do?',
    answer: 'Allow us to write asynchronous code that looks synchronous'
  }
]


/* use this to find a card with ID_TO_FIND
var foundCard = flashCards.find( (card) => {
  return card.id === ID_TO_FIND
}
*/

const NUMBER_OF_CARDS = flashCards.length;
var viewingCard = 0;
var editingCard;
var cardMode = true; //true = front, false = back
var editMode = false;

function saveCard(cardIndex, cardQuestion, cardAnswer) {
  flashCards[cardIndex].question = cardQuestion;
  flashCards[cardIndex].answer = cardAnswer;

}

function editCard(cardIndex) {
  $('#save').html('Save');
  $('#theCard-question').html(`<div class="field"><input id = 'new-question' type='text' value='${flashCards[cardIndex].question}'></div>`)
  $('#theCard-answer').html(`<div class="field"><input id = 'new-answer' type='text' value='${flashCards[cardIndex].answer}'></div>`)
  $(document).on('click', '#save', () => {
    $('#save').attr('id', '#edit');
    $('#edit').html('Edit');
    flashCards[cardIndex].question = $('#new-question').val();
    flashCards[cardIndex].answer = $('#new-answer').val();
    editMode = !editMode;
    viewingCard -= 1;
    flipCard();
  })

}

function deleteCard(cardIndex) {
  flashCards.splice(cardIndex, 1);
  viewingCard -= 1;
}

function fillNextCard(cardIndex) {
  $('#theCard-header').html(`Card #${cardIndex}`);
  $('#theCard-question').html(flashCards[cardIndex].question);
  $('#theCard-answer').html(flashCards[cardIndex].answer);
}

function flipCard() {
  cardMode = !cardMode;
  if (cardMode) {
    viewingCard += 1;
    viewingCard = viewingCard % flashCards.length;
    fillNextCard(viewingCard);
    $('#theCard').data('index', viewingCard);
    $('.back').hide();
    $('#show-next').html("Show Answer");
    $('.front').show();

  } else {
    $('#show-next').html("Next Card");
    $('.back').show();
  }
}

$(document).ready( () => {
  $('.back').hide();
  fillNextCard(viewingCard);
  $('#theCard').data('id',viewingCard)


  $(document).on('click', '#show-next', () => {
    flipCard();
  })

  $(document).on('click', '#edit', () => {
    $('#edit').attr('id', 'save')
    let cardIndex = $('#theCard').data('index');
    editMode = !editMode;
    editCard(cardIndex);
    
  })

  $(document).on('click', '#delete-card', () => {
    let cardToDelete = $('#theCard').data('index');
    console.log(`calling deleteCard with card id ${cardToDelete}`);
    deleteCard(cardToDelete);
    flipCard();
  })
})