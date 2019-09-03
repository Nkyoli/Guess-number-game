$(document).ready(function(){
    
    var maxGuesses = 5;
    var BiggestNumber = 100;
    var isPlaying = true;
    var guessingNumber = Math.floor(Math.random()*(BiggestNumber + 1)); 
    
    /*### Events ###*/
    
    $(".js-btnGo").click(function() {
        if(isPlaying) {
            writeToLi(guessesCounter, $(".js-guessInput").val());
            $(".js-message").html(setMessage($(".js-guessInput").val()));
            $(".js-guessInput").val("");
            $(".js-guessInput").focus();
        }
    });
    
    $(".js-btnPlay").click(function() {
        $(".js-play").slideToggle(1000);
    });
    
    $(".js-btnSetting").click(function() {
        $(".js-setting").slideToggle(1000);
    });
    
    $(".js-btnNo").click(function() {
        $(".js-play").slideToggle(1000);
        $(".js-guessInput").focus();
    });
    
    $(".js-btnYes").click(function() {
        $(".js-play").slideToggle(1000);
        restart();
    });
    
    $(".js-btnCancel").click(function() {
        $(".js-setting").slideToggle(1000);
        $(".js-guessInput").focus();
    });
    
    $(".js-btnSave").click(function() {
        $(".js-setting").slideToggle(1000);
        $(".js-guessInput").focus();
        restart();
        maxGuesses = parseInt($("#maxGuesses").val());
        BiggestNumber = parseInt($("#highestValue").val());
        if(maxGuesses === 5) {
            $(".js-guesses1").css("display", "none");
            $(".js-guesses2").css("display", "none");
            $(".js-guesses3").css("display", "none");
        }else if(maxGuesses === 10) {
            $(".js-guesses1").css("display", "inline-block");
            $(".js-guesses2").css("display", "none");
            $(".js-guesses3").css("display", "none");
        }else if(maxGuesses === 15) {
            $(".js-guesses1").css("display", "inline-block");
            $(".js-guesses2").css("display", "inline-block");
            $(".js-guesses3").css("display", "none");
        } else if(maxGuesses === 20) {
            $(".js-guesses1").css("display", "inline-block");
            $(".js-guesses2").css("display", "inline-block");
            $(".js-guesses3").css("display", "inline-block");
        }
    });
    /*### Functions ####*/
    
    var guessesCounter = 1;
    var val1 = 0;
    var val2 = BiggestNumber;
    
    function restart() {
        isPlaying = true;
        guessesCounter = 1;
        guessingNumber = Math.floor(Math.random()*(BiggestNumber + 1)); 
        $(".js-message").html("Message");
        $(".js-guessInput").focus();
        val1 = 0;
        val2 = BiggestNumber;
        for(var i = 1; i <= maxGuesses; i++) {
            writeToLi( i, "&nbsp;");
        }
    }
    
    function setMessage(guess) {
        guess = parseInt(guess);
        
        if(isNaN(guess)) {
           return "🙄 <br> Please enter a number between " + val1 + " and " + val2 + "!!";
        }
        
        if(guess < guessingNumber) {
            if(guess > val1) {
                val1 = guess;   
            }
            if(guessesCounter === maxGuesses) {
                isPlaying = false;
                return "😌😌😌 <br>" + guessingNumber + " was the number, You didn't guess it.";
            }
            guessesCounter++;
            return "😒 <br> Higher, the number is between " + val1 + " and " + val2 + ".";    
        } else if(guess > guessingNumber) {
            if(guess < val2) {
                val2 = guess;
            }
            if(guessesCounter === maxGuesses) {
                isPlaying = false;
                return "😌😌😌 <br>" + guessingNumber + " was the number, You didn't guess it.";
            }
            guessesCounter++;
             return "😒 <br> Lower, the number is between " + val1 + " and " + val2 + ".";    
        } else {
            isPlaying = false;
            return "😊 <br> Bingoo, " + guessingNumber + " was the right number.";
        } 
    }
    
    function writeToLi(liValue, guess){
        
        if(guess === "") {
           return;
        }
        
        if(isNaN(guess) && guess !== "&nbsp;") {
           return;
        }
           
        switch(liValue) {
            case 1:
            return $(".js-1").html(guess);
            case 2:
            return $(".js-2").html(guess);
            case 3:
            return $(".js-3").html(guess);
            case 4:
            return $(".js-4").html(guess);
            case 5:
            return $(".js-5").html(guess);
            case 6:
            return $(".js-6").html(guess);
            case 7:
            return $(".js-7").html(guess);
            case 8:
            return $(".js-8").html(guess);
            case 9:
            return $(".js-9").html(guess);
            case 10:
            return $(".js-10").html(guess);
            case 11:
            return $(".js-11").html(guess);
            case 12:
            return $(".js-12").html(guess);
            case 13:
            return $(".js-13").html(guess);
            case 14:
            return $(".js-14").html(guess);
            case 15:
            return $(".js-15").html(guess);
            case 16:
            return $(".js-16").html(guess);
            case 17:
            return $(".js-17").html(guess);
            case 18:
            return $(".js-18").html(guess);
            case 19:
            return $(".js-19").text(guess);
            case 20:
            return $(".js-20").text(guess);
        }
    }
});