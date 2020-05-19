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

    $('.votebtns').on('click', function() {
        let xid = this.id;
        if($('#voterID').length){
            $.ajax({
                type: 'POST',
                url: window.location.origin + '/vote',
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify({"sender":$('#voterID').val(),"toID":xid}),
                success: function(){
                    alert('You Voted For ['+xid+']');
                    window.location.reload();
                }
            });
        }
    });
});