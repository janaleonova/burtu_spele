
  
  
  function startTimer(duration, view_date) {

    var countdown = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(countdown / 60, 10);
        seconds = parseInt(countdown % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        view_date.textContent = minutes + ":" + seconds;

        if (--countdown < 0) {
            //countdown = duration;
            spelesLauks.innerHTML="<div>Spēles beigas</div>"
        }
    }, 1000);
}

