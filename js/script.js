(function(){
    var d=document,
        w=window;

    

    $.event.props.push("dataTransfer");

    function cancelEvent(e) {
        if (e.preventDefault) 
            e.preventDefault(); // required by FF + Safari
        e.dataTransfer && (e.dataTransfer.dropEffect = 'copy'); // tells the browser what drop effect is allowed here
        return false; // required by IE
	}

    function drop(e) {
        e.preventDefault();

        var files = e.dataTransfer.files;
        var files_count = files.length;

        var file = files[0];

        var img = d.createElement('img');
        var reader = new FileReader();
        reader.onload = (function(aImg, aName) { return function(e) {
            aImg.src = e.target.result;
            aImg.onload = function(){
                var canvas = createImgCanvas(aImg, aImg.width, aImg.height, aName);
                $('#dropzone').append(canvas);
            }
        }; })(img, file.name);
        reader.readAsDataURL(file);
        
        return false;
    }

    function createImgCanvas(img, imgWidth, imgHeight, label) {
        var canvas = document.createElement('canvas');
        canvas.setAttribute('id',label);
        canvas.width = imgWidth;
        canvas.height = imgHeight;
        var imageCanvas2D = canvas.getContext("2d");
        try{
            imageCanvas2D.drawImage(img, 0, 0, imgWidth, imgHeight);
        } catch(err) { alert(err);}
        return canvas;
    }


    $(d).ready(function(){
        $('#wrapper')
            .bind('drop', drop)
            .bind('dragenter', cancelEvent)
            .bind('dragover', cancelEvent)
            .bind('dragleave', cancelEvent);

        /*$('#background').bind('dragover', cancelEvent)
            .bind('dragenter', cancelEvent)
            .bind('drop', function(e){
                if (e.preventDefault) e.preventDefault(); // stops the browser from redirecting off to the text.

                alert('drop');
                return false;
            })*/
    })

    
})()