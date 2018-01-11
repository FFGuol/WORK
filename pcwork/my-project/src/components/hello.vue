<template>  
 <div>
  <div class="img">
    <a target="_blank" href="http://static.runoob.com/images/demo/demo1.jpg">
      <img src="http://static.runoob.com/images/demo/demo1.jpg" alt="图片文本描述" width="100%" height="100%">
    </a>
    <div class="desc">这里添加图片文本描述</div>
  </div>
</div>
</template> 

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: '这是首页'
    }
  }
}
</script>
<!-- 书本信息样例 -->
var book = {
img-bg:'https://img3.doubanio.com/view/ark_article_cover/retina/public/8902522.jpg?v=1426663263.0',
  img-sm:'https://img3.doubanio.com/view/ark_article_cover/retina/public/8902522.jpg?v=1426663263.0',
  title:'星球大战8：最后的绝地武士',
  subtitle:'Star Wars:The Last Jedi',
  catalog:'152分钟 动作/科幻/冒险',
  timeplace:'2018-01-05（中国大陆）上映美国'，
  author:' 莱恩·约翰逊（导演）/ 乔治·卢卡斯/马克·哈米尔 / 凯丽·费雪 / 黛西·雷德利',
  book-desc:'《星球大战：最后的绝地武士》承接前作《星球大战：原力觉醒》的剧情，讲述第一军团全面侵袭之下，蕾伊（黛西·雷德利 Daisy Ridley 饰）、芬恩（约翰·博耶加 John Boyega 饰）、波·达默龙（奥斯卡·伊萨克 Oscar Isaac 饰）三位年轻主角各自的抉 择和冒险故事。前作中觉醒强大原力的蕾伊独自寻访隐居的绝地大师卢克·天行者（马克·哈米尔 Mark Hamill 饰），在后者的指导下接受原力训练。芬恩接受了一项几乎不可能完成的任务，为此他不得不勇闯敌营，面对自己的过去。波·达默龙则要适应从战士向领袖的角色转换，这一过程中他也将接受一些血的教训。',
  book-how:'还凑合吧',
  like-book:[]
}
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.img {
    margin: 5px;
    border: 1px solid #ccc;
    float: left;
    width: 180px;
}

div.img:hover {
    border: 1px solid #777;
}

div.img img {
    width: 100%;
    height: auto;
}

div.desc {
    padding: 15px;
    text-align: center;
}
</style>