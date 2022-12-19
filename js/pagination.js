const renderPagination = (pagination) => {
    $("#pagination").html(`
    <div id="arrow_left">
    <img src="../images/arrow-left.svg" alt="/"/>
    </div>
    <div id="button_show"></div>
    <div id="arrow_right">
        <img src="../images/arrow-right.svg" alt="/"/>
    </div>
    `)
    for (let i = 0; i < (pagination.total / pagination.pageSize); i++) {
        $("#button_show").append(`<button class="${(getUrlVars('page') || 1) == (i + 1) ? 'active' : ''}" data-index="${i+1}">${i + 1}</button>`)
    }
    $(document).on("click", "#arrow_left", function() {
        updateQuery('page', `${(Number(getUrlVars('page')) - 1) < 1 ? 1 : Number(getUrlVars('page')) - 1}`)
    });
    $(document).on("click", "#arrow_right", function() {
        updateQuery('page', `${(Number(getUrlVars('page'))) * pagination.pageSize < pagination.total ? Number(getUrlVars('page')) + 1 : Number(getUrlVars('page'))}`)
    });
    $(document).on("click", "#button_show button", function() {
        updateQuery('page', `${$(this).attr('data-index')}`)
    });
}
    