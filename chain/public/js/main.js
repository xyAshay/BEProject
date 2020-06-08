$(document).ready(() => {
    let flag = 0;
    $('.votebtns').prop('disabled',true);
    $('#sender').on('click', (e) => {
        e.preventDefault();
        vids = [];
        if($('#voterID').length && $('#voterID').val().length){
            $.get(window.location.origin+'/chain',(blocks) => {
                for(let i=1;i<blocks.length;i++){
                    blocks[i].data.forEach(vote => {
                        vids.push(vote.sender);
                    });
                }
                if(!vids.includes($('#voterID').val())){
                   $('#status').html('<br>Voter ID '+$('#voterID').val() + ' is ALLOWED to vote');   
                    $('#activity').html("Active");
                    $('#activity').css({'color' : 'green'})
                    $('#voterID').prop('disabled',true);
                    $('.votebtns').prop('disabled',false);
                }
                else{
                   $('#status').html('<br>Voter ID '+$('#voterID').val() + ' is NOT allowed to vote');   
                }
            });
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