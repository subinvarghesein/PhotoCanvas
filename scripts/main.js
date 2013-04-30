define(["filters/manager"], function(tools, filters) {
    var container, initial, wrapper, downloadLink, currentImageCanvas, imageName;
    
    function cacheElements() {
        container = document.getElementById('canvas-container');
        initial = document.getElementById('initial');
        wrapper = document.getElementById('wrapper');
        downloadLink = document.getElementById('download');
    }
    
    function addListeners() {
        function cancelEvent(e) {
            if (e.preventDefault) {
                e.preventDefault(); // required by FF + Safari
            }
            if (e.dataTransfer) {
                e.dataTransfer.dropEffect = 'copy'; // tells the browser what drop effect is allowed here
            }
            return false; // required by IE
        }
        
        function imgDropped(e) {
            var files = e.dataTransfer.files,
                file = files[0],    
                img = document.createElement('img'),
                reader = new FileReader();

            e.preventDefault();
            reader.onload = (function(aImg, aName) { return function(e) {
                aImg.src = e.target.result;
                aImg.onload = function(){
                    var canvas = document.createElement('canvas'),
                        imageCanvas2D = canvas.getContext("2d");
                    canvas.setAttribute('id',aName);
                    canvas.width = aImg.width;
                    canvas.height = aImg.height;
                    try{
                        imageCanvas2D.drawImage(aImg, 0, 0, aImg.width, aImg.height);
                    }
                    catch(err) {
                        alert(err);
                    }
                    
                    container.appendChild(canvas);
                    initial.style.display = 'none';
                };
            }; })(img, file.name);
            reader.readAsDataURL(file);
            
            return false;
        }
        
        wrapper.addEventListener('drop', imgDropped);
        wrapper.addEventListener('dragenter', cancelEvent);
        wrapper.addEventListener('dragover', cancelEvent);
        wrapper.addEventListener('dragleave', cancelEvent);
    }

    function updateDownloadLink(){
        var dataURL    = currentImageCanvas.toDataURL("image/png");
        updateDownloadLink(aName, dataURL);
        downloadLink.href = dataURL;
        downloadLink.download = name;
    }
    
    function init() {
        cacheElements();
        addListeners();
    }
    
    init();
});