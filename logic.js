(function() {
  $(function(){
  
    var itemCount = 10;
  
    $("#oshuffle").click(function(e) {
      shuffle("o");
    });
    $("#vshuffle").click(function(e) {
      shuffle("v");
    });
    
    $("#ochoose").click(function(e) {
      choose("o");
    });
    $("#vchoose").click(function(e) {
      choose("v");
    });
    
    
    var doesWordExist = function(word, p){
      var toReturn = false;
      $("." + p + "word").each(function(){
        if ($(this).text() == word){
          toReturn = true;
          return false;
        }
      });
      return toReturn;
    }
    
    var showPhrase = function(){
        $("#neta").text($(".oselect:checked").parents("tr").children(".oword").text() + " ＋ " + $(".vselect:checked").parents("tr").children(".vword").text());
    }
    
    var addNewWord = function(p){
        var ary = words[p];
        var newWord;
        
        while (1){
            newWord = ary[Math.floor(Math.random() * ary.length)];
            if (!doesWordExist(newWord, p)) {
                break;
            }
        }      
        
        var iHtml = '';
        iHtml += '<td><label class="checkbox-inline"><input value="option1" type="checkbox" name="' + p + 'hold" class="' + p + 'hold"> </label></td><td><label class="radio-inline"><input value="option1" type="radio" name="' + p + 'select" class="' + p + 'select"> </label></td><td class="' + p + 'word">';
        iHtml += newWord;
        iHtml += '</td>';
        $("#" + p + "table tbody").append($("<tr>").html(iHtml));
    }
      
    var shuffle = function(p){
        $("." + p + "word").each(function(){
            if (!($(this).prevAll().find("." + p + "hold").prop("checked") || $(this).prevAll().find("." + p + "select").prop("checked"))){
                $(this).parents("tr").remove();
            }
        });
        
        while (1 <= itemCount - $("." + p + "word").length){
            addNewWord(p);
        }
        
        $("." + p + "hold").click(function(e) {
            $(this).find("." + p + "hold").prop("checked", !$(this).find("." + p + "hold").prop("checked"))
            setRowColor(this, p)
            e.stopPropagation();
        });
        
        $("#" + p + "table td:has(." + p + "hold)").click(function() {
            $(this).find("." + p + "hold").prop("checked", !$(this).find("." + p + "hold").prop("checked"))
            setRowColor(this, p)
        });
        
        $("#" + p + "table td:not(:has(." + p + "hold))").click(function() {
            $(this).parent("tr").find("." + p + "select").prop("checked", true);
            selectRow(p);
        });
    }
    
    var choose = function(p){
        var btns = $("#" + p + "table ." + p + "select:not(:checked)");
        $(btns.get(Math.floor(Math.random() * btns.length))).prop("checked", true);
        selectRow(p);
    }
    
    shuffle("o");
    shuffle("v");
    
    var selectRow = function(p){
        showPhrase();
        $("#" + p + "table ." + p + "select").each(function(){
            setRowColor(this, p);
        });
    }
    
    var setRowColor = function(elem, p){
        var tr = $(elem).parents("tr");
        tr.removeClass("success");
        tr.removeClass("warning");
        if (tr.find("." + p + "select").prop("checked")){
            tr.addClass("success");
        } else if (tr.find("." + p + "hold").prop("checked")){
            tr.addClass("warning");
        }
    }
  });
})();