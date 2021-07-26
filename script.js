{/* <style>
    #rec332450804 {
        display: none;
    }
</style> */}

{/* <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js" ></script>
<script src="https://gitcdn.xyz/repo/lmgonzalves/path-slider/master/dist/path-slider.min.js" ></script>
  */}


  document.body.style.overflow = "hidden";
  window.addEventListener('DOMContentLoaded', () => {
 

  
	const id = 332082432; //Куда засовываем слайдер с крутящимися продуктами
	
	const linkToProd = 'https://store.tildacdn.com/api/getproductslist/?storepartuid=112304677071';
    
  if (!document.querySelector('.main-slider')) {
		const newSlider = document.createElement('div');
		document.querySelector(`[data-artboard-recid="${id}"]`).prepend(newSlider);
		newSlider.classList.add('main-slider');
	}
	
  const mag = document.querySelector('#rec332450804');  
	const magTargetId = '332181843';
	
	const prodWrapper = document.querySelector("#rec" + magTargetId);
	const prodWrapperInner = document.createElement('div');

	prodWrapperInner.classList.add('food_wrapper');

	prodWrapper.prepend(prodWrapperInner); 
	prodWrapper.style.position = 'relative';

	const productMS = document.createElement('div');
	productMS.classList.add('product_mainscreen');

	const productMSWrapper = document.createElement('div');
	productMSWrapper.classList.add('product_mainscreen_wrapper');
 
	document.querySelector(`#rec${id} .main-slider`).prepend(productMS);
	productMS.appendChild(productMSWrapper);
	
	
  async function getData(url) { 
    const request = await window.fetch(url)
    
      if (request.status === 200) {
          const data =  await request.text()
          return data   
      }  
  }
    
  getData(linkToProd).then(data => {
        return  JSON.parse(data);
        
  }).then(data => {
        
    console.log(data)
      
    data.products.forEach(data => {

        const product = document.createElement('div');
    
        const text = data.descr
            .replace(/[</]+(strong)>|[</]+(ul)>|<li>/gi, "") 
            .split(/<\/li>/); 
    
        const img = JSON.parse(data.gallery) 
          
        const dataProductLid =  data.uid; //elem.getAttribute('data-product-lid');
        const dataProductUid = data.uid; //elem.getAttribute('data-product-uid');
        const dataProductGenUid = data.uid; //elem.getAttribute('data-product-gen-uid');
        const jsProductSku = data.sku; //elem.querySelector('.js-store-prod-sku').getAttribute('field');
    
        const productOptions = data.prod_variants;
        const btnText = "Заказать";
        const productSubtitle = 'Классический ланч';
        const title = data.title;
        const price = data.price.split('.')[0];
        const options = data.prod_variants.split('\n');
        
        console.log(price)
    
        const imgSlider = document.createElement('img'); 
        imgSlider.setAttribute('src', img.length > 1 ? img[1].img : img[0].img);
          
        document.querySelector('.main-slider').append(imgSlider);
        imgSlider.classList.add('path-slider__item');
    
        const mainProduct = document.createElement('div');
            
        mainProduct.classList.add('js-product');
        mainProduct.setAttribute('data-product-img', `${img[0].img}`);
        mainProduct.setAttribute('data-product-inv', dataProductUid);
        mainProduct.setAttribute('data-product-lid', dataProductLid);
        mainProduct.setAttribute('data-product-gen-uid', dataProductGenUid);
        mainProduct.setAttribute('data-product-url', data.url);
    
        mainProduct.innerHTML = `
          <div class="js-product-img mainProduct" >
            <img  class="mainProduct_img" src="${img[0].img }" alt="${title}">
          </div>
    
          <div class="mainProduct-card"> 
            <div class="mainProduct_title js-store-prod-name js-product-name">${title.split(' ')[0] } <em>${title.split(' ')[1]}</em> </div>
            <div class="t-store__card__sku t-descr t-descr_xxs" style=" display:none; ">SKU: 
            <span class="js-store-prod-sku js-product-sku" field="st_sku__${data.uid}" data-redactor-toolbar="no">${data.sku}</span></div>
        
            <div class="mainProduct_grams"><span>${text[text.length - 2].split("—")[0]}</span> —  ${text[text.length - 2].split("—")[1]}</div>
            <div class="mainProduct_text"> ${text[0]} </div>
            
            <div class="mainProduct_price js-store-price-wrapper">
                <a href="#order">${btnText}</a>
              <div class="js-store-price-wrapper  mainProduct_price_wrapper"> 
                <div class=" js-product-price js-store-prod-price-val" data-product-price-def="${price}" data-product-price-def-str="${price}">${price} </div>
                <div class="t-store__card__price-currency" style="margin-left: 4px;">MDL</div>
              </div> 
            </div>
          </div> 
        `;
     
        productMSWrapper.append(mainProduct);
    
        product.classList.add('food', 'js-product');
        product.setAttribute('data-product-img', img[0].img);
        product.setAttribute('data-product-inv', dataProductUid);
        product.setAttribute('data-product-lid', dataProductLid);
        product.setAttribute('data-product-gen-uid', dataProductGenUid);
        product.setAttribute('data-product-url', data.url);
    
        product.innerHTML = `
          <div class='food_redline'> </div>
          <div class="food_img js-product-img" >
              <img src=${img[0].img} alt="${title}">
          </div>
          <div class="food_block"> 
            <div class="food_block_descr">${productSubtitle}</div>
            <div class="food_block_title js-store-prod-name js-product-name">${title}</div>
            <div class="t-store__card__sku t-descr t-descr_xxs" style=" display:none; ">SKU: 
            <span class="js-store-prod-sku js-product-sku" field="st_sku__${data.uid}" data-redactor-toolbar="no">${data.sku}</span></div>
            
            <div class="food_block_info">
              <div class="food_block_info_elem">
                <div class="food_block_info_elem_title">${text[1].split(' ')[0]}</div>
                <div class="food_block_info_elem_numbers">${text[1].split(' ')[1]}</div>
                <div class="food_block_info_elem_descr">грамм</div>
              </div>
              <div class="food_block_info_elem">
                <div class="food_block_info_elem_title">${text[2].split(' ')[0]}</div>
                <div class="food_block_info_elem_numbers">${text[2].split(' ')[1]}</div>
                <div class="food_block_info_elem_descr">грамм</div>
              </div>
              <div class="food_block_info_elem">
                <div class="food_block_info_elem_title">${text[3].split(' ')[0]}</div>
                <div class="food_block_info_elem_numbers"> ${text[3].split(' ')[1]}</div>
                <div class="food_block_info_elem_descr">грамм</div>
              </div>
            </div>
            <div class="food_block_grams">${text[4].split("—")[0]} — <strong>${text[4].split("—")[1]}</strong></div>
            <div class="food_block_text"> ${text[0]} </div>
            
            <div class="food_block_price js-store-price-wrapper">
              <div class="js-store-price-wrapper food_block_price_wrapper"> 
                <div class=" js-product-price js-store-prod-price-val" data-product-price-def="${price}" data-product-price-def-str="${data.price}">${price} </div>
                <div class="t-store__card__price-currency" style="margin-left: 4px;">MDL</div>
              </div>
              <a href="#order">${btnText}</a>
            </div>
          </div> 
          `;
    
        prodWrapperInner.append(product);
        
        addOptions(product, options)
        addOptions(mainProduct, options)
    
 
    })
        
    }).then(() => {
      	// Initialize the slider using our SVG path, items, and options  
      const options = {
        startLength: 600, // start positioning the slider items at the beginning of the SVG path
        duration: 2000, // animation duration (used by anime.js)
        stagger: 0, // incrementally delays between items, producing a staggering effect
        easing: 'easeOutElastic', // easing function (used by anime.js)
        activeSeparation: 500,
        elasticity: 250, // elasticity factor (used by anime.js)
        rotate: false, // This indicates that items should be rotated properly to match the SVG path curve
        begin : (params) => {
          if(params.selected){
              sliderMainScreenNext(params.index);
          } 
	    } 
	};
        
      const foodWrapper = document.querySelectorAll(`[data-artboard-recid="${magTargetId}"]`);
    	const jsHeight = parseInt(window.getComputedStyle(document.querySelector('.food_wrapper')).height) + 200;
    
    	foodWrapper.forEach(block => {
        block.style.height = `${jsHeight}px`;
    	});
     
    	// Creating SVG and path elements and insert to DOM
    	
    	const svgNS = 'http://www.w3.org/2000/svg';
    	const svgEl = document.createElementNS(svgNS, 'svg');
    	const pathEl = document.createElementNS(svgNS, 'circle');
    
    	svgEl.setAttribute('xmlns', svgNS);
    	svgEl.style.position = "absolute";
    	svgEl.style.overflow = "visible";
    	svgEl.style.zIndex = "-1";
    
    	pathEl.setAttribute('class', 'path-slider__path');
    	pathEl.setAttribute('stroke', 'black');
    	pathEl.setAttribute('stroke-width', '0px');
    
    	document.querySelector(`#rec${id} .main-slider`).append(svgEl);
    	svgEl.appendChild(pathEl);
        
    	const slider = new PathSlider('.path-slider__path', '.path-slider__item', options);
 
    	window.addEventListener('resize', function () {
        slider.updatePositions();
    	});
    
    	document.querySelector('.path-slider-prev').addEventListener('click', (e) => {
    		e.preventDefault();
    		slider.selectPrevItem();
    	})
    
    	document.querySelector('.path-slider-next').addEventListener('click', (e) => {
    		e.preventDefault();
    		slider.selectNextItem(); 
    	})
     
    	function sliderMainScreenNext(index ){  
    	    document.querySelector('.product_mainscreen_wrapper').style.transform = `translateX(-${index  * 500}px)`;
    	}
    
        document.querySelector('.main-slider').addEventListener('touchstart', handleTouchStart, false);        
        document.querySelector('.main-slider').addEventListener('touchmove', handleTouchMove, false);
        
        var xDown = null;                                                        
        var yDown = null;
        
        function getTouches(evt) {
          return evt.touches ||             // browser API
                 evt.originalEvent.touches; // jQuery
        }                                                     
        
        function handleTouchStart(evt) {
          const firstTouch = getTouches(evt)[0];                                      
          xDown = firstTouch.clientX;                                      
          yDown = firstTouch.clientY;                                      
        };                                                
        
        function handleTouchMove(evt) {
          if ( ! xDown || ! yDown ) {
              return;
          }
      
          var xUp = evt.touches[0].clientX;                                    
          var yUp = evt.touches[0].clientY;
      
          var xDiff = xDown - xUp;
          var yDiff = yDown - yUp;
      
          if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
              if ( xDiff > 0 ) {
                  /* left swipe */ 
                  slider.selectNextItem();
              } else {
                  
                  slider.selectPrevItem();
                  /* right swipe */
              }                       
          } else {
              if ( yDiff > 50 ) {
                  
                  /* up swipe */ 
              } else { 
                  /* down swipe */
              }                                                                 
          }
          /* reset values */
          xDown = null;
          yDown = null;                                             
        };  
    })
    .then(() => { 
      const preloader = document.querySelector('.preloader');
      preloader.classList.add('preloader-end'); 
      document.body.style.overflow = "auto";
    })
    
    function addOptions(parent, options) {
      const mainProductOption = document.createElement('div');
      mainProductOption.classList.add('js-product-controls-wrapper','t-store__card__prod-controls-wrapper')
      
      const optionsSelect = []; 
      options.forEach(data => {
        const option = document.createElement('option');
        const value = data.split("=");
        
        option.setAttribute('value', value[0]);
        option.setAttribute('data-product-variant-price', value[1] );
        option.innerText = value[0]; 
        optionsSelect.push(option);
      })

      mainProductOption.innerHTML = ` 
        <div class="js-product-option t-product__option">
          <div class="js-product-option-name t-product__option-title t-descr t-descr_xxs">Первое блюдо:</div>
            <div class="t-product__option-variants t-product__option-variants_regular">
                <select class="js-product-option-variants t-product__option-select t-descr t-descr_xxs">
                </select>
            </div>
        </div> 
		`; 
		parent.querySelector('.js-store-price-wrapper').insertAdjacentElement('beforebegin', mainProductOption)
		
        optionsSelect.forEach(option => {
          mainProductOption.querySelector('.js-product-option-variants').append(option)
        })
        
    parent.querySelectorAll('.js-product-controls-wrapper')
      .forEach(option => {
        option.addEventListener('change', function(e){
        
            const priceBtn = this.nextElementSibling.querySelector('.js-product-price');
            const initialPrice = +priceBtn.getAttribute('data-product-price-def-str');
  
            const optionPrice = +e.target.value.replace(/\D/gi, "");
            
            priceBtn.setAttribute('data-product-price-def', initialPrice + optionPrice);
            priceBtn.innerText = initialPrice + optionPrice; 
        }) 
      }) 
    }
 
	mag.remove();
 
///HEADER DROP DOWN///////////////////////////////////

  	const links = document.querySelectorAll('.header_nav_link a');
	const navHeader = document.createElement('div');
 
	navHeader.innerHTML = `
		<ul>
		
		</ul>
	`;
	document.body.prepend(navHeader);
	navHeader.classList.add('header_dropdown');

	const navHeaderUl = navHeader.querySelector('ul');

	links.forEach((elem, index) => {
 
		const elemText = elem.innerText;
		const elemLink = elem.getAttribute('href'); 
		const newElemLi = document.createElement('li');
		const newElemA = document.createElement('a'); 
 
		if (index === 0) {  
			newElemA.innerHTML = `
				<img src="https://static.tildacdn.com/tild3366-3031-4630-b539-613461306365/house.svg" alt="${elemText}">
				${elemText}
			`; 
			newElemLi.append(newElemA); 
			newElemA.classList.add('header_dropdown_items');
			newElemA.setAttribute('href', elemLink);

		} else { 
      if (index % 2 ) {
          newElemA.innerHTML = ` 
            ${elemText.split(' ')[0]} <em>&nbsp;${elemText.split(' ')[1] || ' '}</em>
          `; 

          newElemLi.append(newElemA); 
          newElemA.classList.add('header_dropdown_items');
          newElemA.setAttribute('href', elemLink); 
          
      } else {
          newElemA.innerHTML = ` 
            <em>${elemText.split(' ')[0]}</em>&nbsp;${elemText.split(' ')[1] || ' '} 
          `; 
          newElemLi.append(newElemA); 
          newElemA.classList.add('header_dropdown_items');
          newElemA.setAttribute('href', elemLink); 
      }
		}  
		navHeaderUl.append(newElemLi);  
	})
	
	//HEADER ICON CLOSE / OPEN //////

  const headerMenuBtnWrapper = document.createElement('div');
  headerMenuBtnWrapper.classList.add('header-menu-btn-wrapper');
  
  const headerMenuBtn = document.createElement('div');
  headerMenuBtn.classList.add('header-menu-btn');
  
  headerMenuBtn.innerHTML = ` 
    <div class="header-menu-btn-line"></div>
    <div class="header-menu-btn-line"></div>
    <div class="header-menu-btn-line"></div>
  `;
  
  document.body.prepend(headerMenuBtnWrapper);
  headerMenuBtnWrapper.append(headerMenuBtn);
  
  headerMenuBtnWrapper.addEventListener('click', function(){
    this.classList.toggle('header-menu-btn-wrapper-clicked');
    navHeader.classList.toggle('nav-header-open');
    document.body.classList.toggle('stop');
  })
})  