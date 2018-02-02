export function init() {
    $("#edit-recipe").on('click',function(){
        $('#modalEdit').show();
    });

    $('#close-edit').on('click',function(){
        $('#modalEdit').hide();
        
    })

    $('#remove-recipe').on('click',function(){
        var result = confirm("Want to delete?");
        if (result) {
            alert('this recipe is deleted');
        }
    })
}
