const renderSearch = () => {
    $("#search").html(`
        <input type="text" placeholder="Search" id="wordSearch" value="${getUrlVars('word') || ''}">
        <button id="cobra" onclick="searchWord()">Search</button>
    `)
}

const renderWords = (data) => {
    $("#list_word").html(``)
    for (const [index, word] of data.entries()) {
        $("#list_word").append(`
            <li>
                <h5 style="color:#ee773f" onclick="research('${word.word}')"><span style="color:#000">${index + 1}. </span>${word.word}</h5>
                <p class="defs_word"></p>
                <p class="score">Score: ${word.score}</p>
            </li>
            `)
        if (word.defs) {
            for (const j of word.defs) {
                $(".defs_word").eq(index).append(j)
            }
        }
    }
}

const searchWord = () => {
    const word = $('#wordSearch').val();
    updateQuery('word', word);
}

const research = (word) => {
    updateQuery('word', word);
}

renderSearch()
$('#wordSearch').keypress(function (e) {
    if (e.which === 13) {
        searchWord();
    }
});

async function getWords() {
    let result;
    try {
        $("#loading").html(`
        <div class="container">
            <div class="bar"></div>
        </div>`)
        result = await $.ajax({
            url: `https://api.onelook.com/words?${getUrlVars('type') || 'ml'}=${getUrlVars('word')}&qe=ml&md=dpfcy&max=10&rif=1&k=olthes_r4`,
            type: 'GET',
        });
        $("#loading").html(``);
        renderWords(result)
    } catch (error) {
        console.error(error);
    }
}

getWords()