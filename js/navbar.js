const tabs = [
    {
        label: 'Tìm từ',
        slug: ''
    },
    {
        label: 'Đồng âm',
        slug: 'sl'
    },
    {
        label: 'Đồng nghĩa',
        slug: 'ml'
    },
    {
        label: 'Trái nghĩa',
        slug: 'trai-nghia'
    },
    {
        label: 'Tính từ liên quan',
        slug: 'rel_jjb'
    },
    {
        label: 'Danh từ liên quan',
        slug: 'rel_jja'
    },
    {
        label: 'Cùng vần',
        slug: 'sp'
    },
];
$( document ).ready(function() {
    for (const i of tabs) {
        $("nav").eq(0).append(`<p class="link-nav${i.slug === (getUrlVars('type') || '' ) ? ' active' : ''}" data="${i.slug}">${i.label}</p>`)
    }

    $("nav p").click(function() {
        updateQuery('type',`${$(this).attr('data')}`)
    })
});