const renderSearch = () => {
    $("#search").html(`
        <div class="input_valid">
            <input type="text" placeholder="Search" name="word" id="wordSearch" value="${getUrlVars('word') || ''}">
        </div>
        <button type="submit">Search</button>
    `)
}

const renderWords = (data) => {
    $("#list_word").html(``)
    for (const [index, word] of data.slice((Number(getUrlVars('page') || 1) - 1) * 10 || 0, (Number(getUrlVars('page') || 1)) * 10).entries()) {
        $("#list_word").append(`
            <li>
                <h5 data='${word.word}')><span style="color:#000">${index + 1}. </span>${word.word}</h5>
                <ul class="defs_word"></ul>
            </li>
            `)
        if (word.defs) {
            for (const j of word.defs) {
                $(".defs_word").eq(index).append(`
                    <li>
                        <p><i><b>${j.split(/(?=[A-Z])/)[0]}</b></i>: ${j.split(/(?=[A-Z])/).slice(1).join(' ')}</p>
                    </li>
                `)
            }
        }
    }
}

const searchWord = () => {
    validate('#wordSearch', 'isEmpty', 'updateQuery')
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
$(":submit").click(function() {
    searchWord();
})
$(document).on("click", "#list_word h5", function() {
    research($(this).attr('data'))
});
async function getWords() {
    let result;
    try {
        if (getUrlVars('word')) {
            $("#loading").html(`
            <div class="container">
                <div class="bar"></div>
            </div>`)
            result = await $.ajax({
                url: `https://api.onelook.com/words?${getUrlVars('type') || 'ml'}=${getUrlVars('word')}&qe=ml&md=dpfcy&max=50&rif=1&k=olthes_r4`,
                type: 'GET',
            });
            $("#loading").html(``);
        }
        else {
            $("#list_word_container h3").eq(0).html(`Không tìm thấy từ nào, hãy thử tìm kiếm!`).css({"text-align": "center"});
        }
        renderWords(result || [])
        renderPagination({page:1, pageSize:10, total:result?.length})
    } catch (error) {
        console.error(error);
    }
}

getWords()
