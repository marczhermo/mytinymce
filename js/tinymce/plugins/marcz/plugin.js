tinymce.PluginManager.add('marcz', function (editor, url) {
  // Add a button that opens a window
  editor.addButton('marcz', {
    text: 'Marcz',
    icon: false,
    onclick: function () {
      // Open window
      editor.windowManager.open({
        title: 'Marcz plugin',
        body: [{
          type: 'textbox',
          name: 'title',
          label: 'Title'
        }],
        onsubmit: function (e) {
          console.log(editor);
          var activeEditor = editor;
          // Get the current selection,
          console.log(activeEditor.selection.getContent({
            format: 'text'
          }));
          // Get the HTML contents of the currently active editor
          console.log(activeEditor.getContent());

          // Get the raw contents of the currently active editor
          console.log(activeEditor.getContent({
            format: 'raw'
          }));
          // Insert content when the window form is submitted
          editor.insertContent('Title: ' + e.data.title);
          console.log(e.data);
          activeEditor.dom.addClass(activeEditor.dom.select('p'), 'someclass');
        }
      });
    }
  });

  // Add a button that opens a window
  editor.addButton('hermo', {
    text: 'Hermo',
    icon: false,
    onclick: function () {
      // Open window
      // Creates a new editor instance
      var ed = new tinymce.Editor(
        'mytextarea3', {
          theme: 'modern'
        },
        tinymce.EditorManager
      );

      ed.render();
      var parentArgs = top.tinymce.activeEditor.windowManager.getParams();
      var $ = top.tinymce.dom.DomQuery;
      var parentEditor = top.tinymce.activeEditor;
      var currentNode = parentEditor.selection.getNode();
      console.log(parentEditor.getContent());
      console.log(parentArgs);
      console.log(currentNode);
      editor.setContent(currentNode.innerHTML);
      debugger;
    }
  });

  editor.addSidebar('mysidebar', {
    tooltip: 'My sidebar',
    icon: 'settings',
    onrender: function (api) {
      console.log('Render panel', api.element());
    },
    onshow: function (api) {
      console.log('Show panel', api.element());
      api.element().innerHTML = 'Hello world!';
    },
    onhide: function (api) {
      console.log('Hide panel', api.element());
    }
  });

  // Adds a menu item to the tools menu
  editor.addMenuItem('marcz', {
    text: 'Marcz plugin',
    context: 'tools',
    onclick: function () {
      var activeEditor = editor;
      console.log(activeEditor.selection.getContent({
        format: 'text'
      }));
      editor.notificationManager.open({
        text: 'A test informational notification.'
      });
      // Open window with a specific url
      editor.windowManager.open({
        title: 'A sample website',
        url: 'index.html',
        width: 600,
        height: 300,
        buttons: [{
          text: 'Close',
          onclick: 'close'
        }]
      });
    }
  });

  function getMyParentNode(el) {
    var element = el;
    do {
      var myParent = element.parentNode;
      var hasAttr = element.getAttributeNode("data-tinyleaf");
      if (!hasAttr && myParent) {
        element = myParent;
      }
    }
    while (!hasAttr && myParent);

    return element;
  }

  editor.on('dblclick', function(e){
    var $ = tinymce.dom.DomQuery;
    var tinyLeaf = getMyParentNode(editor.selection.getNode());
    if (!tinyLeaf) return;
    
    console.log(tinyLeaf.getAttributeNode("data-tinyleaf").value);
    console.log(tinyLeaf);
    editor.windowManager.open(
      {
        title: 'A sample website',
        url: 'index.html',
        width: 600,
        height: 300,
        buttons: [{
          text: 'Close',
          onclick: 'close'
        }]
      },
      {
        tinyleaf: tinyLeaf
      }
    );
  });

  return {
    getMetadata: function () {
      return {
        title: "Marcz plugin",
        url: "http://exampleplugindocsurl.com"
      };
    }
  };
});