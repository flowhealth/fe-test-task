// connect JQuery library
$ = document.querySelector.bind(document);

const api = "/api/";

var board, prevState;

function badResponce(resp) {
    resp = JSON.stringify(resp);
    document.body.innerHTML = "ERROR: " + resp.error;
    alert("AHTUNG!!!" + resp.error);
    console.log("Please help!!! " + resp.error);
}

function networkFetch(req, good, bad=badResponce) {
    fetch(api + req.uri, req.opts).then(element=>element.json()).then(element=>{
        if (element.ok) {
            good(element.result)
        } else {
            bad(element);
        }
    });
}

function updateScore() {
    networkFetch({
        uri: "score",
        opts: {
            method: "GET"
        }
    }, renderScore);
}

function renderScore(element) {
    //{"winner":"ai","team":"O","ts":1616098546251}
    $("#iddqd").innerHTML = element.list.map(el=>`<li class="mdc-list-item player${el.team}">
<span class="mdc-list-item__ripple"></span>
<span class="mdc-tab__icon material-icons" aria-hidden="true">` + (el.winner == "ai" ? "thumb_down" : (el.winner == "player" ? "psychology" : "restore_from_trash")) + `</span>
<span class="mdc-list-item__text">
${el.team ? "Winner is: " + el.winner + " (" + el.team + " team)" : "Friendship is a magic"}, ` + luxon.DateTime.fromJSDate(new Date(el.ts)).setLocale("en").toFormat("dd MMMM yyyy GG, HH:mm:ss") + `</span></li>`).join("");

    var layout = {
        height: 300,
        width: 500
    };

    Plotly.newPlot('stat1', [{
        values: [element.X, element.O],
        labels: ['X is Winner', 'O is Winner'],
        type: 'pie'
    }], layout);

    Plotly.newPlot('stat2', [{
        values: [element.ai, element.player],
        labels: ['AI is Winner', 'Player is Winner'],
        type: 'pie'
    }], layout);

}

function updateGame() {
    networkFetch({
        uri: "game",
        opts: {
            method: "GET"
        }
    }, renderGame);
}

function getModnaButton(str) {
    return ( `<button class="mdc-button"><div class="mdc-button__ripple"></div><span class="mdc-button__label">${str}</span></button>`) ;
}

function renderGame(resp) {
    board = {};
    $("#game").innerHTML = resp.board.map((row,rowId)=>"<tr>" + row.map((cell,cellId)=>"<td class=" + (prevState && prevState[rowId][cellId] != cell ? "animate" + cell : "static") + ">" + (cell | 0 == cell ? (board["" + cell] = 0) || getModnaButton(cell) : "<div>" + cell.toUpperCase() + "</div>") + "</td>").join("") + "</tr>").join("");
    [...$("#game").getElementsByTagName("button")].forEach(a=>{

        if (resp.end) {
            a.disabled = true
        } else {
            a.onclick = sendGameMove;
            mdc.ripple.MDCRipple.attachTo(a);
        }
    }
    );
    if (resp.end) {

        const snackbar1 = new mdc.snackbar.MDCSnackbar(document.getElementById('snackbar1'));
        snackbar1.labelText = 'Winner is ' + resp.winner;
        snackbar1.open();

        board = {};
        updateScore();
    }
    prevState = resp.board;
    delete resp.board;
    $("#meta").innerHTML = "<div class=playerX>" + (resp.ai == "X" ? "AI" : "Player") + "</div>" + "<div class=playerO>" + (resp.ai == "O" ? "AI" : "Player") + "</div>";
}

function sendGameMove(id) {
    if (id.target) {
        id = id.target.nextSibling.innerText.trim();
    }
    networkFetch({
        uri: "game/move",
        opts: {
            method: "POST",
            body: JSON.stringify({
                'index': id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }, renderGame);
}

function sendGameReset() {
    networkFetch({
        uri: "game/reset",
        opts: {
            method: "POST"
        }
    }, renderGame);
}

function sendGameNext() {
    networkFetch({
        uri: "game/next",
        opts: {
            method: "GET"
        }
    }, renderGame);
}

function init() {
    $("#erase").addEventListener("click", (e)=>{
        networkFetch({
            uri: "score/reset",
            opts: {
                method: "POST"
            }
        }, renderScore)
    }
    );

    $("#next").addEventListener("click", sendGameNext);
    $("#reset").addEventListener("click", sendGameReset);

    document.body.addEventListener("keydown", e=>{
        if (board.hasOwnProperty(e.key)) {
            sendGameMove(e.key)
        }
    }
    );

    const tabBar = new mdc.tabBar.MDCTabBar(document.querySelector('.mdc-tab-bar'));

    var contentEls = document.querySelectorAll('.content');

    tabBar.listen('MDCTabBar:activated', function(event) {
        try {
            document.querySelector('.content--active').classList.remove('content--active');
        } catch (e) {}
        contentEls[event.detail.index].classList.add('content--active');
    });

    mdc.autoInit();

    updateScore();
    updateGame();

}

document.addEventListener("DOMContentLoaded", a=>init());

