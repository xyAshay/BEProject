$(document).ready(() => {
    $('.votebtns').prop('disabled',true);
    $('#sender').on('click', (e) => {
        e.preventDefault();
        if($('#voterID').length && $('#voterID').val().length){
            $('#activity').html("Active");
            $('#activity').css({'color' : 'green'})
            $('#voterID').prop('disabled',true);
            $('.votebtns').prop('disabled',false);
            $('#status').html('<br>Voter ID '+$('#voterID').val() + ' is allowed to vote');  
        }
        else
            alert("Voter ID Empty");
    });
});