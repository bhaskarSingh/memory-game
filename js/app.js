/*
 * List of html cards including
 * paper-plane, anchor, bolt, cube, leaf, bicycle, bomb cards
 * each card has it's two copies
 */
const HTML_CARD_LIST = [
    `<li class="card">
        <i class="fa fa-diamond"></i>
    </li>`,
    `<li class="card">
        <i class="fa fa-paper-plane-o"></i>
    </li>`,
    `<li class="card">
        <i class="fa fa-anchor"></i>
    </li>`,
    `<li class="card">
        <i class="fa fa-bolt"></i>
    </li>`,
    `<li class="card">
        <i class="fa fa-cube"></i>
    </li>`,
    `<li class="card">
        <i class="fa fa-anchor"></i>
    </li>`,
    `<li class="card">
        <i class="fa fa-leaf"></i>
    </li>`,
`    <li class="card">
        <i class="fa fa-bicycle"></i>
    </li>`,
`    <li class="card">
        <i class="fa fa-diamond"></i>
    </li>`,
`    <li class="card">
        <i class="fa fa-bomb"></i>
    </li>`,
`    <li class="card">
        <i class="fa fa-leaf"></i>
    </li>`,
    `<li class="card">
        <i class="fa fa-bomb"></i>
    </li>`,
    `<li class="card">
        <i class="fa fa-bolt"></i>
    </li>`,
    `<li class="card">
        <i class="fa fa-bicycle"></i>
    </li>`,
    `<li class="card">
        <i class="fa fa-paper-plane-o"></i>
    </li>`,
    `<li class="card">
        <i class="fa fa-cube"></i>
    </li>`
];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
/**
 * @description Creates randomize Memory card layout every time
 * the function is called
 */
function createRandomMemoryCardLayout(){
    const RANDOM = shuffle(HTML_CARD_LIST);
    const DECK = document.createElement("ul");
    DECK.setAttribute('class', 'deck');
    RANDOM.forEach((element) => {
        DECK.insertAdjacentHTML('beforeend', element);
    });
    document.querySelector(".container").appendChild(DECK);
}
/**
 * @description This function runs automatic at beginning of the script and "checks"
 * which Animation End handle the browser accept and writes if in the variable animationEnd
 * (in the most cases it's "animationend") and prevents the browser from reacting to animationEnd 2 times.
 */
const animationEnd = (function(el) {
    const animations = {
      animation: 'animationend',
      OAnimation: 'oAnimationEnd',
      MozAnimation: 'mozAnimationEnd',
      WebkitAnimation: 'webkitAnimationEnd',
    };
    for (let t in animations) {
      if (el.style[t] !== undefined) {
        return animations[t];
      }
    }
})(document.createElement('div')); //Fake element
/**
 * @description shows stars according to the number of moves
 * @param {*} counter --> No of moves
 */
function starRater(counter){
    if(counter > 36){
        $('.stars').find('li:nth-child(1)').children().attr('class','fa fa-star-half');
    }else if(counter > 32){
        $('.stars').find('li:nth-child(2)').children().removeClass('fa fa-star-half');
    }else if(counter > 28){
        $('.stars').find('li:nth-child(2)').children().attr('class','fa fa-star-half');
    }else if(counter > 24){
        $('.stars').find('li:nth-child(3)').children().removeClass('fa fa-star-half');
    }else if(counter > 20){
        $('.stars').find('li:nth-child(3)').children().attr('class','fa fa-star-half');
    }

}
/**
 * @description Function checks whether the two cards matches, if matched
 * it will stay open else both fill hide away
 */
function runMemoryCardGame(){
    //List to keep track of clicked cards
    let list = [];
    //Move counter
    let counter = 0;
    $( ".deck" ).on( "click", "li", function() {
        //Increments count on every click
        $('.moves').text(parseInt(++counter));
        //shows number of stars according to no of moves
        starRater(counter);
        // When the card is clicked it added to the list
        list.push( $( this ).addClass( "open show" ) );
        //When second card is clicked it checks whether both cards matches or not
        if(list.length === 2){
            //If second card doesn't match with the first one hide back both the cards
            //show the animation of shake and red background and then hide the card
            if(list[0].children().attr('class') !== list[1].children().attr('class')){
                $(list[0]).addClass('animated shake').attr('id' ,'card-error').one(animationEnd, function(){
                    $(this).removeClass('open show animated shake');
                    $(this).removeAttr('id' ,'card-error');
                } );
                $(list[1]).addClass('animated shake').attr('id' ,'card-error').one(animationEnd, function(){
                    $(this).removeClass('open show animated shake');
                    $(this).removeAttr('id' ,'card-error');
                } );
            }else{
                //If both the card matches then don't hide the card
                $(list[0]).addClass('animated pulse').attr('id' ,'matched-card');
                $(list[1]).addClass('animated pulse').attr('id' ,'matched-card');;
            }
            //after every second click empty the list so that the function can again
            //check whether both the card matches or not
            list = [];
        }
    });
}
/**
 * start Memory card game
 */
function startGame(){
    createRandomMemoryCardLayout();
    runMemoryCardGame();
}

startGame();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
