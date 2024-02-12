import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'


//장바구니
const basketStarterEl = document.querySelector('header .basket-starter')
const basketEl = basketStarterEl.querySelector('.basket') //꼭 도큐먼트에서 안찾아도되고 원래 찾아놓은 요소의 자손이라면 그안에서 찾아도됨

basketStarterEl.addEventListener('click', function(event){
  event.stopPropagation()
  if (basketEl.classList.contains('show')) {
    hideBasket()
  } else{
    showBasket()
  }
})

//장바구니 드롭다운 부분을 누르면 똑같이 토글처럼 작동하는것을 방지(장바구니 버튼을 누르면 발생하는 이벤트 버블링을 막는것을 통해)
basketEl.addEventListener('click',function(event){
  event.stopPropagation()
})

window.addEventListener('click',function(){
  hideBasket()
})

function showBasket(){
  basketEl.classList.add('show')
}

function hideBasket(){
  basketEl.classList.remove('show')
}

// 검색창
const headerEl = document.querySelector('header')
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')] //요소들을 배열형태로 만듦
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchShadowEl = searchWrapEl.querySelector('.shadow')
const searchInputEl = searchWrapEl.querySelector('input')
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]

searchStarterEl.addEventListener('click', showSearch) //익명함수대신 실행할 이름이 있는 함수이름을 넣어줘도됨

searchCloserEl.addEventListener('click', hideSearch)

searchShadowEl.addEventListener('click', hideSearch)

function showSearch(){
  headerEl.classList.add('searching')
  document.documentElement.classList.add('fixed') //documentElement는 html 전체를 의미
  headerMenuEls.reverse().forEach(function(el, index){ //헤더메뉴 순차적으로 사라지는 애니메이션 적용
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  searchDelayEls.forEach(function(el, index){
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  setTimeout(function() {
    searchInputEl.focus()
  }, 600)
}

function hideSearch(){
  headerEl.classList.remove('searching')
  document.documentElement.classList.remove('fixed')
  headerMenuEls.reverse().forEach(function(el, index){
    el.computedStyleMap.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  searchDelayEls.reverse().forEach(function(el, index){
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  searchDelayEls.reverse()
  searchInputEl.value = '' //검색바를 닫으면 입력한 검색어가 초기화되는 코드
}


// 요소가 화면에 보이는지 관찰
 //요소가 화면에 관찰되면 실행할 함수
const io = new IntersectionObserver(function(entries){ 
  entries.forEach(function(entry){
    if(!entry.isIntersecting){//요소가 화면에 관찰되는지 확인하는 메소드
      return
    }
    entry.target.classList.add('show')
  })
})
//관찰할 대상들을 정해주는 부분, 관찰 대상들을 io 함수에 등록하겠다는 뜻
const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function(el){
  io.observe(el)
})


//  비디오 재생!
const video = document.querySelector('.stage video');
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click', function(){
  video.play() //요소에서 바로 쓸수있는 메소드
  playBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
})

pauseBtn.addEventListener('click', function(){
  video.pause() // 요소에서 바로 쓸수있는 메소드
  playBtn.classList.remove('hide')
  pauseBtn.classList.add('hide')
})


// '당신에게 맞는 iPadsms? fpsejfld!
const itemsEl = document.querySelector('section.compare .items')
ipads.forEach(function (ipad){
  const itemEl = document.createElement('div') //요소를 생성
  itemEl.classList.add('item')

  let colorList = ''
  ipad.colors.forEach(function (color){
    colorList  += `<li style="background-color: ${color};"></li>`
  })
  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p> <!--toLocaleString은 숫자를 지정한 나라의 표기법에 맞게 변환해주는 메소드-->
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `

  itemsEl.append(itemEl) //itemsEl에 자바스크립트를 통해 만든 요소인 itemEl을 넣는 과정

})


// Footer Navigation

const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(function(nav){
  const mapEl = document.createElement('div')
  mapEl.classList.add('map')

  let mapList = ''
  nav.maps.forEach(function(map){
    mapList += /* HTML */ `
    <li>
      <a href="${map.url}">${map.name}</a>
    </li>`
  })

  mapEl.innerHTML = /* HTML */ `
    <h3>
      <span class="text">${nav.title}</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `

  navigationsEl .append(mapEl)
})


// This-year
const thisYearEl = document.querySelector('span.this-year')
thisYearEl.textContent = new Date().getFullYear()

