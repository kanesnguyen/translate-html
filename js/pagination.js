const pagination = {
    page: 1,
    pageSize: 10,
    total: 50,
}
const renderPagination = () => {
    $("#pagination").html(`
    <div class="arrow_left" onclick="updateQuery('page', '${(Number(getUrlVars('page'))-1) < 1 ? 1 : Number(getUrlVars('page'))-1}')">
    <img src="../images/arrow-left.svg" alt="/"/>
    </div>
    <div class="button_show">
        
    </div>
    <div class="arrow_right" onclick="updateQuery('page', '${(Number(getUrlVars('page'))) * pagination.pageSize <  pagination.total ? Number(getUrlVars('page'))+1 : Number(getUrlVars('page'))}')">
        <img src="../images/arrow-right.svg" alt="/"/>
    </div>
    `)
}
$(document).ready(function () {
    renderPagination()
    for(let i = 0; i < (pagination.total / pagination.pageSize); i++) {
        $(".button_show").eq(0).append(`<button class="${(getUrlVars('page') || 1) == (i+1) ? 'active' : ''}" onclick="updateQuery('page', '${i+1}')">${i+1}</button>`)
    }
});