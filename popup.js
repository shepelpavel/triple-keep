var storage = browser.storage.local;

function writeText() {
    var value_1 = $('#text_1').val() || '';
    var value_2 = $('#text_2').val() || '';
    var value_3 = $('#text_3').val() || '';
    storage.set({
        field_one: value_1,
        field_two: value_2,
        field_tree: value_3
    });
}

function readText() {
    var content = storage.get();
    content.then(function (result) {
        if (result.field_one) {
            $('#text_1').val(result.field_one);
        } else {
            $('#text_1').val('');
        }
        if (result.field_two) {
            $('#text_2').val(result.field_two);
            $('.item_text_2').addClass('visible');
            $('.js-number-2').addClass('active');
        } else {
            $('#text_2').val('');
            $('.item_text_2').removeClass('visible');
            $('.js-number-2').removeClass('active');
        }
        if (result.field_tree) {
            $('#text_3').val(result.field_tree);
            $('.item_text_3').addClass('visible');
            $('.js-number-3').addClass('active');
        } else {
            $('#text_3').val('');
            $('.item_text_3').removeClass('visible');
            $('.js-number-3').removeClass('active');
        }
    }, function () {
        console.log('error');
        $('.outer').text('error');
        return false;
    });
}

$(document).ready(function () {

    readText();

    $('textarea').bind('input propertychange', function () {
        writeText();
    });

    $('.js-number').on('click', function () {
        var num = '.item_text_' + $(this).attr('data-attr');
        $(num).toggleClass('visible');
        $(this).toggleClass('active');
    })

    $('.js-copy').on('click', function () {
        var trgt_cp_id = $(this).attr('data-attr');
        $('#' + trgt_cp_id).focus().select();
        document.execCommand('copy');
    });

    $('.js-paste').on('click', function () {
        var trgt_ps_id = $(this).attr('data-attr');
        var trgt = document.getElementById(trgt_ps_id);
        trgt.focus();
        trgt.setSelectionRange(trgt.value.length, trgt.value.length);
        document.execCommand('paste');
        writeText();
    });

});
