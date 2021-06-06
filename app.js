$(document).ready(function () {
    // variables
    let sentences = ['ten ate neite ate nee enet ite ate inet ent eate',
        'Too ato too nOt enot one totA not anot tOO aNot',
        'oat itain oat tain nate eate tea anne inant nean',
        'itant eate anot eat nato inate eat anot tain eat',
        'nee ene ate ite tent tiet ent ine ene ete ene ate'];
    let sentenceCounter = 0
    let letterCounter = 0
    let mistakeCounter = 0
    let blockPixels = 15
    let timerOne = 0
    let timerTwo = 0
    let gameCompleted = false

    // setting Upper Case Keyboard to hidden by default
    $(`#keyboard-upper-container`).hide();

    // Inserting Sentence Variable
    $(`#sentence`).append(sentences[sentenceCounter]);

    // Display Current Letter
    $("#target-letter").append(sentences[sentenceCounter].charAt(letterCounter));

    // Keydown event
    $(document).keydown(function (e) {

        // If Game is Not Completed, Following if statesments will trigger (This was added to stop counters from increasing on Final Screen)
        if (gameCompleted == false) {
            //Checking if correct key was typed
            if (e.key == sentences[sentenceCounter][letterCounter]) {
                // Starting and Stopping timer at first correct key press and last correct key press
                if (letterCounter == 0 && sentenceCounter == 0) {
                    let d = new Date
                    timerOne = { minutes: d.getMinutes(), seconds: d.getSeconds() }
                } else if (letterCounter == sentences[4].length - 1 && sentenceCounter == 4) {
                    let d = new Date
                    timerTwo = { minutes: d.getMinutes(), seconds: d.getSeconds() }
                };
                // in addition, a correct key press increases letter counter, displays a check mark in feedback div, and advances the block Pixel variable
                letterCounter++
                $("#feedback").empty();
                if (e.key == ` `) {
                    $("#feedback").append(`Space: ✅ `);
                } else {
                    $("#feedback").append(`${e.key}: ✅ `);
                }
                blockPixels += 17.5
            // shift visible Keyboard had to be placed within the if statement to not incur more "mistakes" when hitting shift
            } else if (e.which == 16) {
                $(`.keyboard-container`).toggle();
            // if incorrect key is pressed, mistake counter is increased and feedback is given
            } else {
                mistakeCounter++
                $("#feedback").empty();
                $("#feedback").append(` ❌ `);
            }
        }

        //Checking if game was completed or just a sentence was completed
        // If game was completed, Player Score/Mistakes are displayed instead of sentences.  A button is provided to reset game.
        if (letterCounter == sentences[sentenceCounter].length && sentenceCounter == sentences.length - 1) {
            gameCompleted = true

            let score = Math.round(54 / (((timerTwo.minutes * 60 + timerTwo.seconds) - (timerOne.minutes * 60 + timerOne.seconds)) / 60) - (2 * mistakeCounter))
            $("#sentence").empty();
            $("#sentence").append(`Words Per Minute: ${score} </br>Mistakes: ${mistakeCounter} </br><button class="reset">Play Again</button>`)
            $(`button.reset`).click(function () {
                sentenceCounter = 0
                letterCounter = 0
                mistakeCounter = 0
                timerOne = 0
                timerTwo = 0
                blockPixels = 15
                gameCompleted = false
                $(`#yellow-block`).css("left", `${blockPixels}px`)
                $(`#yellow-block`).css("visibility", "visible")
                $("#sentence").empty();
                $("#sentence").append(sentences[0]);
                $("#target-letter").append(sentences[0].charAt(0))
            })
            $(`#yellow-block`).css("visibility", "hidden")
            $("#feedback").empty();
            // If only a sentence was completed, Letter Counter and Yellow Block is reset.  Feedback div is also cleared out.
        } else if (letterCounter == sentences[sentenceCounter].length) {
            sentenceCounter++
            letterCounter = 0
            blockPixels = 15
            $("#feedback").empty();
        }

    });

    // Keyup event
    $(document).keyup(function (e) {

        // shift visible Keyboard
        if (e.which == 16) {
            $(`.keyboard-container`).toggle();
        };
        // reset Keyboard background color
        $(`.key`).css("background-color", "#f5f5f5")

        // delete the current target letter and append the next
        $("#target-letter").empty();
        if (sentences[sentenceCounter].charAt(letterCounter) == ' ') {
            $("#target-letter").append(`Space`)
        } else {
            $("#target-letter").append(sentences[sentenceCounter].charAt(letterCounter));
        }

        // If the game is still running, delete the current sentence and append the next upon key up
        if (letterCounter !== sentences[sentenceCounter].length && sentenceCounter !== sentences.length) {
            $("#sentence").empty();
            $(`#sentence`).append(sentences[sentenceCounter]);
        }

        // moving the yellow block
        $(`#yellow-block`).css("left", `${blockPixels}px`)

    });

    // Keypress event
    $(document).keypress(function (e) {

        // highlight corresponding Key
        $(`#${e.which}`).css("background-color", "yellow");

    })

});