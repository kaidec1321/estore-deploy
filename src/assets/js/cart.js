$(document).ready(function () {
    // $.get("url", data,
    //     function (data, textStatus, jqXHR) {
            
    //     },
    //     "dataType"
    // );
    console.log(111);
    console.log($('#quantity').val());
    
    
    $('.input-number-decrement').on('click', function () {
        $(this).closest('.cart-item').val($(this).siblings('.quantity')*100);
    });
});