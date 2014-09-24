  var client = new WebSocket('ws://localhost:8083');

      
  client.onopen = function (event){

    var box = $('#box');
    box.on('dragenter', doNothing);
    box.on('dragover', doNothing);
    box.text('Drag files here');

    box.on('drop', function (e){

      e.originalEvent.preventDefault();

      var files = e.originalEvent.dataTransfer.files;

      var upload = function (f){
        var a = new FileSlicer({'socket' : client, 'file' : f});

        a.send(function(file) {
          var head = a.pad(a.slices, 18)+a.pad(file.size, 12)+file.name;
          console.log(head);
          return head;
        }, function(part) {
          console.log(part);
          return part;
        });                  
      };

      for (var i = 0, file; file = files[i]; i++){
        $('<div align="center"></div>').append($('<a></a>').text(file.name).prop('href', '/' + file.name)).appendTo('body');
        upload(file);
      }
    });
  };      

  function doNothing(e){
    e.preventDefault();
    e.stopPropagation();
  }