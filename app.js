const grid=document.getElementById('gift-grid');
const punk=gifts.find(g=>g.title==='Панк-Паук');
const noir=gifts.find(g=>g.title==='Spider-Noir');
const glasses=gifts.find(g=>g.title==='Очки для компьютера');
if(punk)punk.links=punk.links.filter(link=>link.url.includes('share.temu.com'));
if(noir)noir.links=[{label:'Посмотреть на Kaspi',url:'https://l.kaspi.kz/shop/4fsBGxEKLUMXZj6?sessionId=942810d2-ecd4-4da0-a619-a59b92626f0c1793788630'}];
if(glasses)glasses.links=[];
gifts.splice(6,0,{title:'Наушники-капельки Redmi',category:'tech',links:[],image:'redmi-earbuds.png',subtitle:'Как у Вики',score:7.5,price:'хз, не помню',priceNote:'Вика знает, где брать',note:'Хочу такие же удобные наушники-капельки, как у Вики. Без ссылки — она сама знает, где их купить.',label:'Как у Вики',id:9});
document.querySelector('.ribbon')?.remove();
const score=g=>String(g.score).replace('.',',');
const escapeText=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const groupDefinitions=[
  {key:'main',heading:'',items:['Samsung Odyssey G5']},
  {key:'tech',heading:'Также из техники хотел бы:',items:['Наушники-капельки Redmi']},
  {key:'games',heading:'Хотел бы поиграть в эти игры:',items:['Crimson Desert','Expedition 33']},
  {key:'collectibles',heading:'А ещё хочу дополнить коллекцию паучков:',items:['Панк-Паук','Spider-Noir']},
  {key:'accessories',heading:'Из полезных аксессуаров:',items:['Механические часы','Очки для компьютера']},
  {key:'kitchen',heading:'Ну и куда же без кухонной утвари:',items:['Стальная сковорода','Разделочные доски']}
];
const byTitle=title=>gifts.find(g=>g.title===title);
const sortByPriority=items=>[...items].sort((a,b)=>b.score-a.score);
const giftCard=(g,position)=>{const index=gifts.indexOf(g);const featured=g.title==='Samsung Odyssey G5';return `<article class="gift ${featured?'featured':''}" data-id="${index}" data-category="${g.category}"><button class="gift-art ${g.category==='games'?'game':''}" data-open="${index}" aria-label="Подробнее: ${escapeText(g.title)}"><span class="gift-tag">${g.label}</span><img src="assets/new/${g.image}" alt="${escapeText(g.title)}" loading="${featured?'eager':'lazy'}"></button><div class="gift-body"><div class="gift-kicker"><span class="gift-num">№ ${String(position).padStart(2,'0')}</span><span class="score">хочу <strong>${score(g)}</strong><small> / 10</small></span></div><h3 class="gift-title">${g.title}</h3><p class="subtitle">${g.subtitle}</p>${featured?`<p class="featured-note">${g.note}</p>`:''}<div class="gift-bottom"><span class="price">${g.price}</span><button class="details-link" data-open="${index}" aria-label="Детали и ссылки: ${escapeText(g.title)}">Детали и ссылки ↗</button></div>${featured?`<div class="price-origin">${g.priceNote}</div>`:''}</div></article>`};
function disableUnavailableCards(){[...grid.querySelectorAll('.gift')].forEach(card=>{const gift=gifts[Number(card.dataset.id)];if(!gift.links.length){card.querySelector('.details-link')?.remove();const art=card.querySelector('.gift-art');if(art){art.removeAttribute('data-open');art.removeAttribute('aria-label');art.disabled=true}}})}
function renderGifts(filter='all'){
  if(filter==='all'){
    let position=0;
    grid.innerHTML=groupDefinitions.map(group=>{const items=sortByPriority(group.items.map(byTitle));const cards=items.map(g=>giftCard(g,++position)).join('');return `<section class="gift-section gift-section-${group.key}"${group.heading?` aria-labelledby="section-${group.key}"`:''}>${group.heading?`<h3 class="gift-section-heading" id="section-${group.key}">${group.heading}</h3>`:''}${cards}</section>`}).join('');
  }else{
    const items=sortByPriority(gifts.filter(g=>g.category===filter));
    grid.innerHTML=`<section class="gift-section gift-section-filter">${items.map((g,index)=>giftCard(g,index+1)).join('')}</section>`;
  }
  disableUnavailableCards();
}
renderGifts();
const giftDialog=document.getElementById('gift-dialog');
const letterDialog=document.getElementById('letter-dialog');
function showDialog(dialog){dialog.showModal();document.body.classList.add('modal-open')}
function showGift(id){const g=gifts[id];document.getElementById('detail-content').innerHTML=`<div class="detail-layout"><div class="detail-art ${g.category==='games'?'game':''}"><img src="assets/new/${g.category==='games'?g.image.replace('.jpg','-poster.jpg'):g.image}" alt="${escapeText(g.title)}"></div><div class="detail-copy"><div class="eyebrow">${g.label} · ХОЧУ ${score(g)} / 10</div><h2>${g.title}</h2><p class="subtitle">${g.subtitle}</p><div class="price">${g.price}</div><div class="price-origin">${g.priceNote}</div><p class="detail-note">${g.note}</p>${g.extra?`<p class="detail-extra">${g.extra}</p>`:''}<div class="detail-links">${g.links.map(l=>`<a href="${escapeText(l.url)}" target="_blank" rel="noopener noreferrer">${escapeText(l.label)}<span>↗</span></a>`).join('')}</div></div></div>`;showDialog(giftDialog)}
grid.addEventListener('click',event=>{const b=event.target.closest('[data-open]');if(b)showGift(Number(b.dataset.open))});
document.getElementById('open-letter').addEventListener('click',()=>showDialog(letterDialog));
[giftDialog,letterDialog].forEach(dialog=>{dialog.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'))});
const filters=[...document.querySelectorAll('.filter')];
filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});const filter=button.dataset.filter;renderGifts(filter);const count=filter==='all'?gifts.length:gifts.filter(g=>g.category===filter).length;document.getElementById('result-count').textContent=count===gifts.length?`Все ${gifts.length} хотелок — здесь.`:`В этой категории: ${count} из ${gifts.length}.`}));
