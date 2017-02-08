# Knowledge-record
record  important knowledge
Start to learn english and managed code// 正式开启学习英语和代码托管之旅
placeholder-->h5新特性代码提示效果，在IE9及以下不支持，可以利用如下函数进行兼容：
<script>
  var JPlaceHolder = {
      //检测
        _check : function(){
            return 'placeholder' in document.createElement('input');
        },
        //初始化
        init : function(){
            if(!this._check()){
                this.fix();
            }
        },
        //修复
        fix : function(){
              jQuery(':input[placeholder]').each(function(index, element) {
                  var self = $(this), txt = self.attr('placeholder');
                  self.wrap($('<div></div>').css({position:'relative', zoom:'1', border:'none', background:'none',    padding:'none', margin:'none'}));
                  var pos = self.position(), h = self.outerHeight(true), paddingleft = self.css('padding-left');
                  console.log(pos);
                  var holder = $('<span></span>').text(txt).css({position:'absolute', left:pos.left, top:pos.top+9, height:h, lienHeight:h, paddingLeft:paddingleft, color:'#aaa'}).appendTo(self.parent());
                  self.focusin(function(e) {
                      holder.hide();
                  }).focusout(function(e) {
                      if(!self.val()){
                          holder.show();
                      }
                  });
                  holder.click(function(e) {
                      holder.hide();
                      self.focus();
                  });
              });
          }
      };
    //执行
    jQuery(function(){
        JPlaceHolder.init();    
    });
</script>
