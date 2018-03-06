var flashCards = [
  { id: '1',
    question: 'Card 1 Question',
    answer: 'Card 1 Answer'
  },
  { id: '2',
    question: 'Card 2 Question',
    answer: 'Card 2 Answer'
  },
  { id: '3',
    question: 'Card 3 Question',
    answer: 'Card 3 Answer'
  },
  { id: '4',
    question: 'Card 4 Question',
    answer: 'Card 4 Answer'
  },
  { id: '5',
    question: 'Card 5 Question',
    answer: 'Card 5 Answer'
  },
  { id: '6',
    question: 'Card 6 Question',
    answer: 'Card 6 Answer'
  },
  { id: '7',
    question: 'Card 7 Question',
    answer: 'Card 7 Answer'
  },
  { id: '8',
    question: 'Card 8 Question',
    answer: 'Card 8 Answer'
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

function editCard(cardId) {
  $('#edit-save').html('Save');

}

function deleteCard(viewingCard) {
  console.log('uhhh, deleting card?')
  flashCards = flashCards.filter( (card) => {
    return card.id !== viewingCard + 1;
  })
}

function fillNextCard(cardIndex) {
  $('#theCard-header').html(`Card #${flashCards[cardIndex].id}`);
  $('#theCard-question').html(flashCards[cardIndex].question);
  $('#theCard-answer').html(flashCards[cardIndex].answer);
}

function flipCard() {
  if (cardMode) {
    viewingCard += 1;
    viewingCard = viewingCard % NUMBER_OF_CARDS;
    fillNextCard(viewingCard);
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



  $(document).on('click', '#show-next', () => {
    cardMode = !cardMode;
    flipCard();
  })

  $(document).on('click', '#edit-save', () => {
    let cardId = $('#theCard').data('id');
    editMode = !editMode;
    editCard(cardId);
  })

  $(document).on('click', '#delete-card', () => {
    deleteCard(viewingCard);
    flipCard();
  })
})