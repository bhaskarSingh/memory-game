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
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Move counter
let counter = 0;

/**
 * @description Creates randomize Memory card layout every time
 * the function is called
 */
function createRandomMemoryCardLayout(){
    //Remove the card layout if already present
    if ($('.deck').parent().length){
        $('.deck').remove();
    }
    //get the shuffled cards array;
    const RANDOM = shuffle(HTML_CARD_LIST);
    const DECK = document.createElement("ul");
    DECK.setAttribute('class', 'deck');
    RANDOM.forEach((element) => {
        DECK.insertAdjacentHTML('beforeend', element);
    });
    document.querySelector(".main-container").appendChild(DECK);
}

/**
 * @description This function runs automatically at beginning of the script and "checks"
 * which Animation End handle the browser accept and writes it in the variable animationEnd
 * (in the most cases it's "animationend") and prevents the browser from reacting to animationEnd 2 times.
 */
const ANIMATION_END = (function(el) {
    const ANIMATIONS = {
      animation: 'animationend',
      OAnimation: 'oAnimationEnd',
      MozAnimation: 'mozAnimationEnd',
      WebkitAnimation: 'webkitAnimationEnd',
    };
    for (let t in ANIMATIONS) {
      if (el.style[t] !== undefined) {
        return ANIMATIONS[t];
      }
    }
})(document.createElement('div')); //Fake element

/**
 * @description shows stars according to the number of moves
 * @param {Number} counter --> No of moves
 */
function starRater(counter){
    //show 1 star
    if(counter > 34){
        $('.feedback').text('Better luck next time!');
        $('.stars').find('li:nth-child(2)').children().removeClass('fa fa-star-half');
    //show one and half star
    }else if(counter > 30){
        $('.feedback').text('You can do better!');
        $('.stars').find('li:nth-child(2)').children().attr('class','fa fa-star-half');
    //show 2 stars
    }else if(counter > 26){
        $('.feedback').text('You got some skills there! amazing play, you can do even better');
        $('.stars').find('li:nth-child(3)').children().removeClass('fa fa-star-half');
    //show 2 and a half star
    }else if(counter > 22){
        $('.feedback').text('Wow!you played like a pro');
        $('.stars').find('li:nth-child(3)').children().attr('class','fa fa-star-half');
    //show 3 stars if moves are less than 23
    }else{
        $('.feedback').text('You are the greatest!');
        $('.stars').find('li').children().attr('class','fa fa-star');
    }
}

/**
 * @description Reset the Memory card game, including move counter
 * star rater and timer
 */
function resetGame(){
    $('.deck > li').removeClass('open show animated pulse').removeAttr('id', 'matched-card').addClass('animated flipInX').one(ANIMATION_END, function(){
        //Reset the timer
        $('#timer').timer('reset');
        $('#timer').timer('remove');
        //Reset the move counter
        counter = 0;
        //Reset the star rater
        starRater(counter);
        //show the changed move counter value of 0 in html
        $('.moves').text(parseInt(0));
        //Reset the memory card game
        startGame();
    } );
}

/**
 * @description Shows pop modal on successfully completing the game,
 * with time took to complete the game and play again button
 */
function congratulationsPopup(){
    // When the user clicks on <span> (x), close the modal
    $('.close').click(function(){
        $('#myModal').css('display', 'none');
    });
    //pause the timer
    $('#timer').timer('pause');
    //Get the timer value in seconds
    let time = $('#timer').data('seconds');
    //Convert the timer value in minutes
    const MINUTES = Math.floor(time / 60);
    //store the leftover seconds after converting time into minutes
    const SECONDS = time - MINUTES * 60;
    //set the html showing time took to completed the game
    $('.stats').text(`You took ${MINUTES} minute(s) and ${SECONDS} seconds time and ${counter} moves to complete the game`);
    //Reset the game, on clicking the play again button and hide the pop modal
    $('.playAgain').click(function(){
        $('#myModal').css('display', 'none');
        resetGame();
    });
    //Display the congratulations popup modal
    $('#myModal').css('display', 'block');
}

/**
 * @description sets the timer according to the difficulty mode
 * @param {Number} value --> difficulty mode value
 */
function setDiffcultyModeTimer(value){
    //Select this option if no-time-limit mode is selected
    if(value === 1){
        //start timer
        $('#timer').timer({
            format: '%M:%S'  //Display time as 00:00:00
        });
     //Select this option if normal mode is selected with 30s time limit
    }else if(value === 2){
        $('#timer').timer({
            duration: '30s',
            callback: function() {
                $('#timesUp').css('display', 'block');
            }
        });
    //Select this option if hard mode is selected with 25s time limit
    }else if(value === 3){
        $('#timer').timer({
            duration: '25s',
            callback: function() {
                $('#timesUp').css('display', 'block');
            }
        });
    }
}

/**
 * @description Function checks whether the two cards matches, if matched
 * it will stay open else both will hide away
 */
function runMemoryCardGame(){
    //List to keep track of clicked cards
    let list = [];
    $( ".deck" ).on( "click", "li", function() {
        //Increments count on every click
        $('.moves').text(parseInt(++counter));
        //Set timer mode according to difficulty mode value
        setDiffcultyModeTimer(value);
        //shows number of stars according to no of moves
        starRater(counter);
        //Makes sure that user doesn't accidently clicks on the clicked
        //item thus preventing self-match bug
        if(!($(this).hasClass('open'))){
            // When the card is clicked it's added to the list
            list.push( $( this ).addClass( "open show" ) );
        }
        //When second card is clicked it checks whether both cards matches or not
        if(list.length === 2){
            //If second card doesn't match with the first one hide back both the cards
            //show the animation of shake and red background and then hide the card
            if(list[0].children().attr('class') !== list[1].children().attr('class')){
                $(list[0]).addClass('animated shake').attr('id' ,'card-error').one(ANIMATION_END, function(){
                    $(this).removeClass('open show animated shake');
                    $(this).removeAttr('id' ,'card-error');
                } );
                $(list[1]).addClass('animated shake').attr('id' ,'card-error').one(ANIMATION_END, function(){
                    $(this).removeClass('open show animated shake');
                    $(this).removeAttr('id' ,'card-error');
                } );
            }else{
                //If both the card matches then don't hide the card
                $(list[0]).addClass('animated pulse').attr('id' ,'matched-card').one(ANIMATION_END, function(){
                    $(this).removeClass('animated pulse');
                } );
                $(list[1]).addClass('animated pulse').attr('id' ,'matched-card').one(ANIMATION_END, function(){
                    $(this).removeClass('animated pulse');
                } );
            }
            //after every second click empty the list so that the function can again
            //check whether both the card matches or not
            list = [];
        }
        //show congratulations popup if user wins the game
        if($('.deck').find('li#matched-card').length === 16){
            congratulationsPopup()
        }
    });
    //When user clicks on reset game button symbol, reset the game
    $('.restart').on('click', function(){
        resetGame();
    });
}
/**
 * start Memory card game
 */
function startGame(){
    createRandomMemoryCardLayout();
    runMemoryCardGame();
}

//Difficulty mode value
let value;
/**
 * @description on difficulty mode selection get the
 * value of selected drop-down menu and keep a look
 * out for if there is any change in the value or not
 * and if yes then update the value
 */
$('#options').on('change', function() {
    //Get the value for the difficulty mode
    value = parseInt(this.value);
    const MODE_INFO =
     `<div class="card-panel blue-grey darken-2">
        <span class="white-text mode-info "></span>
    </div>`;
    //Only Add the mode card info html once and not every time difficulty mode option changes
    if($('.mode-info').length === 0){
        $('#gameStarter').find('.input-field').append(MODE_INFO);
    }
    if(value === 1){
        console.log("No limit");
        //show text on main page with no-time-limit mode selected status
        $('.mode-selected').text('Mode Selected: No-Time-Limit');
        //show info about the no-time-limit difficulty option
        $('.mode-info').text('In this mode you do not have any time restriction to complete the game');
    }else if(value === 2){
        console.log("Normal");
        //show text on main page with normal mode selected status
        $('.mode-selected').text('Mode Selected: Normal');
        //show info about the normal difficulty option
        $('.mode-info').text('In this mode you will have 30 seconds to complete the game');
    }else if(value === 3) {
        console.log("Hard");
        //show text on main page with hard mode selected status
        $('.mode-selected').text('Mode Selected: Hard');
        //show info about the normal difficulty option
        $('.mode-info').text('In this mode you will have 25 seconds to complete the game');
    }
});

//On click "change mode" button display gameStarter modal
$('.change-mode').click(function(){
    $('#gameStarter').css('display', 'block');
});

/**
 * @description on clicking "start game" button
 * check is any difficulty mode is selected that start the game
 * otherwise popup a toast message saying please select a
 * difficulty mode
 */
$('.start-game').click(function(){
    if(value === undefined){
        M.toast({html: 'Please! choose a Difficulty mode'});
    }else{
        $('#gameStarter').css('display', 'none');
        startGame();
        resetGame();
    }
});

/**
 * @description If user is not able to complete the game under
 * normal or hard mode this popup will come up showing an
 * option with "retry again" button to play the respective mode again
 */
$('.retry-again').click(function(){
    $('#timesUp').css('display', 'none');
    resetGame();
});

/**
 * @description Display starter popup as soon as
 * the page loads up and initialize the necessary
 * jquery plugin
 */
(function starterPage(){
    $('select').formSelect();
    $('.collapsible').collapsible();
    $('#gameStarter').css('display', 'block');
}());
