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

    return characters;
}
function getCharacterTiles() {
    var characters = getCharacters();

    var addedCounts = {};

    var characterTiles = [];

    var tileCount = 0;

    while (tileCount < 20) {
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
    var randomSoundNumber = Math.floor(Math.random() * 10) + 1;

    var fileName = randomSoundNumber + '.wav';

    var filePath = 'content/sounds/' + fileName;

    return filePath;
}
function playRandomSound() {
    var soundPath = getRandomSoundPath();

    var sound = new Audio(soundPath);

    sound.play();
}
function checkMatch(selectedTiles) {
    setMatchChecking(true);

    setTimeout(function () {
        var allTiles = $('.character-tile');
        allTiles.removeClass('selected-tile');

        setMatchChecking(false);
    }, 1000);
}
function createGrid() {
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

        playRandomSound();
        
        selectedTile.addClass('selected-tile');

        var selectedTiles = $('.selected-tile');

        if (selectedTiles.length > 1) {
            checkMatch(selectedTiles);
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
function reset() {
    stop();

    $('#game-start-button').show();
    $('#game-reset-button').hide();
    
    clearTimer();
    clearGrid();
    createGrid();
}