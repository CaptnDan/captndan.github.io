function getCharacters() {
    var characters = [];

    characters.push({
        id: 1,
        name: 'Yooka',
        imageSrc: 'content/images/yooka.png'
    });

    characters.push({
        id: 2,
        name: 'Laylee',
        imageSrc: 'content/images/laylee.png'
    });

    characters.push({
        id: 3,
        name: 'Capital B',
        imageSrc: 'content/images/capitalb.png'
    });

    characters.push({
        id: 4,
        name: 'Queen Phoebee',
        imageSrc: 'content/images/queenphoebee.png'
    });

    characters.push({
        id: 5,
        name: 'Trowzer',
        imageSrc: 'content/images/trowzer.png'
    });

    characters.push({
        id: 6,
        name: 'Vendi',
        imageSrc: 'content/images/vendi.png'
    });

    characters.push({
        id: 7,
        name: 'Dr. Puzz',
        imageSrc: 'content/images/drpuzz.png'
    });

    characters.push({
        id: 8,
        name: 'Dr. Quack',
        imageSrc: 'content/images/drquack.jpg'
    });

    characters.push({
        id: 9,
        name: 'Rextro',
        imageSrc: 'content/images/rextro.png'
    });

    characters.push({
        id: 10,
        name: 'Clara',
        imageSrc: 'content/images/clara.png'
    });

    characters.push({
        id: 11,
        name: 'Kartos',
        imageSrc: 'content/images/kartos.png'
    });
    
    characters.push({
        id: 12,
        name: 'Nimble',
        imageSrc: 'content/images/nimble.png'
    });

    characters.push({
        id: 13,
        name: 'Inept',
        imageSrc: 'content/images/inept.png'
    });

    characters.push({
        id: 14,
        name: 'Ann-Gree',
        imageSrc: 'content/images/ann-gree.jpg'
    });

    characters.push({
        id: 15,
        name: 'Normy',
        imageSrc: 'content/images/normy.jpg'
    });

    characters.push({
        id: 16,
        name: 'Evie',
        imageSrc: 'content/images/evie.png'
    });

    characters.push({
        id: 17,
        name: 'Fee-Dee',
        imageSrc: 'content/images/fee-dee.png'
    });

    characters.push({
        id: 18,
        name: 'Heidi',
        imageSrc: 'content/images/heidi.png'
    });

    characters.push({
        id: 19,
        name: 'Lady Leapalot',
        imageSrc: 'content/images/leapalot.png'
    });

    characters.push({
        id: 20,
        name: 'Lady Lootsalot',
        imageSrc: 'content/images/lootsalot.png'
    });

    characters.push({
        id: 21,
        name: 'Sir Scoffsalot',
        imageSrc: 'content/images/scoffsalot.jpg'
    });

    characters.push({
        id: 22,
        name: 'Sir Shootsalot',
        imageSrc: 'content/images/shootsalot.png'
    });

    characters.push({
        id: 23,
        name: 'Corplet',
        imageSrc: 'content/images/corplet.png'
    });

    return characters;
}
function getCharactersForGame() {
    var allCharacters = getCharacters();

    var charactersForGame = [];

    var characterCount = 0;

    while(characterCount < 8) {
        var randomIndex = Math.floor(Math.random() * (allCharacters.length));
        var character = allCharacters[randomIndex];

        var isAlreadyInPlay =  false;

        for(var i = 0; i < charactersForGame.length; i++) {
            var selectedCharacter = charactersForGame[i];

            if(character.id === selectedCharacter.id) {
                isAlreadyInPlay = true;
            }
        }

        if(isAlreadyInPlay) {
            continue;
        }

        charactersForGame.push(character);
        characterCount++;        
    }

    return charactersForGame;
}
function getCharacterTiles() {
    var characters = getCharactersForGame();

    var addedCounts = {};

    var characterTiles = [];

    var tileCount = 0;

    while (tileCount < 16) {
        var randomIndex = Math.floor(Math.random() * (characters.length));
        var character = characters[randomIndex];

        var addedCount = addedCounts[character.id];

        if (addedCount == 2) {
            continue;
        }

        if (isNaN(addedCount)) {
            addedCount = 0;
        }

        characterTiles.push(character);
        addedCounts[character.id] = addedCount + 1;
        tileCount++;
    }

    return characterTiles;
}

function createSquare(characterTile) {
    var square = document.createElement('div');
    square.setAttribute('class', 'grid-square');

    var content = document.createElement('div');
    content.setAttribute('class', 'character-tile');
    content.setAttribute('data-character-id', characterTile.id);

    var characterImage = document.createElement('img');
    characterImage.setAttribute('src', characterTile.imageSrc);

    content.appendChild(characterImage);

    square.appendChild(content);

    return square;
}
function isMatchChecking() {
    return window['match-checking'] === true;
}
function setMatchChecking(isMatchChecking) {
    window['match-checking'] = isMatchChecking;
}
function isGameInProgress() {
    return window['game-in-progress'] === true;
}
function getRandomSoundPath() {
    var randomSoundNumber = Math.floor(Math.random() * 14) + 1;

    var fileName = randomSoundNumber + '.wav';

    var filePath = 'content/sounds/' + fileName;

    return filePath;
}
function playRandomSound() {
    var soundPath = getRandomSoundPath();

    var sound = new Audio(soundPath);

    sound.play();
}
function doCharacterIdsMatch(firstTile, secondTile) {
    var firstId = $(firstTile).attr('data-character-id');
    var secondId = $(secondTile).attr('data-character-id');

    return firstId === secondId;
}
function playWinSound() {
    var filePath = 'content/sounds/win.wav';
    var winSound = new Audio(filePath);
    winSound.play();
}
function playSuccessfulMatchSound() {
    var filePath = 'content/sounds/match.wav';
    var matchSound = new Audio(filePath);
    matchSound.play();
}
function win() {
    setTimeout(function () {
        stopTimer();
        playWinSound();
        showWinMessage();
    }, 1000);
}

function checkMatch(selectedTiles) {
    setMatchChecking(true);

    var selectedTiles = $('.selected-tile');

    if(selectedTiles.length == 2) {
        var firstTile = selectedTiles[0];
        var secondTile = selectedTiles[1];

        if(doCharacterIdsMatch(firstTile, secondTile)) {
            $(firstTile).addClass('matched-tile');
            $(secondTile).addClass('matched-tile');
            playSuccessfulMatchSound();
        } else {
            playRandomSound();
        }
    } else {
        playRandomSound();
    }

    var remainingTiles = $('.character-tile').not('.matched-tile');

    var isGameComplete = remainingTiles.length === 0;

    if(isGameComplete) {
        win();
        return;
    }

    setTimeout(function () {
        var allTiles = $('.character-tile');
        allTiles.removeClass('selected-tile');

        setMatchChecking(false);
    }, 750);
}
function createGrid() {
    setStartMessage();
    setMatchChecking(false);

    var count = 4;

    var characterTiles = getCharacterTiles();

    var gridHolder = $('#grid-holder');
    var gameWidth = gridHolder.width();

    for (var rows = 0; rows < count; rows++) {
        for (var columns = 0; columns < count; columns++) {
            var characterTile = characterTiles.pop();
            var square = createSquare(characterTile);
            gridHolder.append(square);
        }
    }

    var squareSize = gameWidth / count;

    $('.grid-square').width(squareSize);
    $('.grid-square').height(squareSize);

    $('.grid-square').on('click', function () {
        if (!isGameInProgress() || isMatchChecking()) {
            return;
        }

        var selectedTile = $(this).find('.character-tile')

        if(selectedTile.is('.selected-tile')) {
            return;
        }

        if(selectedTile.is('.matched-tile')) {
            return;
        }
        
        selectedTile.addClass('selected-tile');

        var selectedTiles = $('.selected-tile');

        if (selectedTiles.length > 1) {
            checkMatch(selectedTiles);
        } else {
            playRandomSound();
        }
    });
}

function clearGrid() {
    $('#grid-holder').empty();
}

var seconds = 0, minutes = 0, hours = 0,
    t;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    var timerDisplay = $('#game-timer');
    var newTime = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    timerDisplay.text(newTime);
    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}
function stopTimer() {
    clearTimeout(t);
}
function clearTimer() {
    stopTimer();
    var timerDisplay = $('#game-timer');
    timerDisplay.text('00:00:00');
}
function start() {
    $('#game-start-button').hide();
    $('#game-reset-button').show();
    window['game-in-progress'] = true;
    timer();
}
function stop() {
    window['game-in-progress'] = false;
}
function showWinMessage() {
    clearGrid();

    var winMessage = document.createElement('div');
    winMessage.setAttribute('id', 'win-message-holder');
    winMessage.appendChild(document.createTextNode('You\r\ndid\r\nbeeautifully!'));

    $('#grid-holder').append(winMessage);
}
function setStartMessage() {
    $('#message-holder').text('Some less than beenevolent foe has trapped Yooka, Laylee and company in a classic tile matching game.\r\nCan you buzzt them out? No Buddy Slam required!');
}
function reset() {
    stop();

    $('#game-start-button').show();
    $('#game-reset-button').hide();
    
    clearTimer();
    clearGrid();
    createGrid();
}