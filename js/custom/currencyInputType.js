// $("input[data-type='currency']")[0].form)

$("input[data-type='currency']").each(function () {
    $(this).attr("pattern", "^\$\d{1,3}(,\d{3})*(\.\d+)?$");
})

$("input[data-type='currency']").on({
    input: function () {
        formatCurrency($(this));
    },
    change: function () {
        formatCurrency($(this));
    },
    focus: function () {
        formatCurrency($(this));
    },
    // blur: function () {
    //     formatCurrency($(this), "blur");
    // }
});