$( document ).ready(function() {
    
    var storage = chrome.storage.sync;
    
    storage.get('text_1', function(result) {
        $('#text_1').val(result['text_1']);
    });
    storage.get('text_2', function(result) {
        $('#text_2').val(result['text_2']);
        if (result['text_2'] != '') {
            $('.item_text_2').addClass('visible');
            $('.js-number-2').addClass('active');
        } else {
            $('.item_text_2').removeClass('visible');
            $('.js-number-2').removeClass('active');
        }
    });
    storage.get('text_3', function(result) {
        $('#text_3').val(result['text_3']);
        if (result['text_3'] != '') {
            $('.item_text_3').addClass('visible');
            $('.js-number-3').addClass('active');
        } else {
            $('.item_text_3').removeClass('visible');
            $('.js-number-3').removeClass('active');
        }
    });
    
    function writeText() {
        var value_1 = $('#text_1').val();
        var value_2 = $('#text_2').val();
        var value_3 = $('#text_3').val();
        var data = {
            'text_1' : value_1,
            'text_2' : value_2,
            'text_3' : value_3
        };
        storage.set(data);
    }
    
    $('textarea').bind('input propertychange', function() {
        writeText();
    });
    
    $('.js-number').on('click', function() {
        var num = '.item_text_' + $(this).attr('data-attr');
        $(num).toggleClass('visible');
        $(this).toggleClass('active');
    })
    
    $('.js-copy').on('click', function() {
        var trgt_cp_id = $(this).attr('data-attr');
        $('#' + trgt_cp_id).focus().select();
        document.execCommand('copy');
    });
    
    $('.js-paste').on('click', function() {
        var trgt_ps_id = $(this).attr('data-attr');
        var trgt = document.getElementById(trgt_ps_id);
        trgt.focus();
        trgt.setSelectionRange(trgt.value.length,trgt.value.length);
        document.execCommand('paste');
        writeText();
    });
    
});
