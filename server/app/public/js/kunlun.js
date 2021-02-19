/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-08-28 17:12:57
 * @LastEditors: 莫卓才
 * @LastEditTime: 2021-02-19 08:50:58
 */
window.onload = function () {
  var height = 0, top = 0;
  /**
   * 事件的节流（throttle）与防抖（debounce）
   * @param fn 是我们需要包装的事件回调
   * @param delay 是时间间隔的阈值
   * @return {Function}
   */
  function throttle (fn, delay) {
    let last = 0, timer = null

    return function () {
      let context = this
      let args = arguments
      let now = +new Date()

      if (now - last < delay) {
        clearTimeout(timer)
        timer = setTimeout(function () {
          last = now
          fn.apply(context, args)
        }, delay)
      } else {
        last = now
        fn.apply(context, args)
      }
    }
  }

  const imgs = document.getElementsByTagName('img')
  const viewHeight = window.innerHeight || document.documentElement.clientHeight
  let num = 0

  /**
   * 图片懒加载
   */
  function imgLazyLoad () {
    for (let i = num; i < imgs.length; i++) {
      let distance = viewHeight - imgs[i].getBoundingClientRect().top
      if (distance >= 0) {
        const dataSrc = imgs[i].getAttribute('data-src')
        if (dataSrc) {
          imgs[i].src = dataSrc;
          num = i + 1
        }
      }
    }
  }
  function headerLogoScroll () {
    height = $(this).scrollTop();
    top < height
      ? $('.header').css('background', 'rgba(255,255,255,.95)')
      : $('.header').css('background', 'unset');
    setTimeout(function () { top = height; }, 0)
  }


  function postUserInfo () {
    var name = $('input[name=name]').val();
    var phone = $('input[name=phone]').val();
    var email = $('input[name=email]').val();
    var title = $('input[name=title]').val();
    var remarks = $('textarea[name=remarks]').val();
    var captcha = $('input[name=captcha]').val();

    $.post('/api/message/create', { name, phone, email, title, remarks, captcha }, res => {
      if (res.code === 0) {
        alert(res.msg);
        location.reload();
      } else {
        alert(res.msg);
        $(".yzm-img img").click();
      }
    })
  }


  imgLazyLoad()
  const btn = document.getElementById('mes-btn');
  const betterScroll = throttle(imgLazyLoad, 10);
  const headerScroll = throttle(headerLogoScroll, 10);

  document.addEventListener('scroll', betterScroll)
  document.addEventListener('scroll', headerScroll)
  btn && btn.addEventListener("click", throttle(postUserInfo, 1000));
}
