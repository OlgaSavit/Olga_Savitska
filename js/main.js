document.addEventListener('DOMContentLoaded',(e)=>{
    let wrapper=document.querySelector('.products-box');
    let product_item=Array.prototype.slice.call(document.querySelectorAll('.product-box__item'));
    let new_productList=product_item;
    let val_type_filter=0;
    let val_price_filter=0;
    let modal=document.querySelector('.modal');
    let btn_showModal=  document.querySelector('.btn-check');
    let count_basket=document.querySelector('.top-cart-info__item').childNodes[1];
    let price_basket=document.querySelector('.top-cart-info__item').childNodes[3];
    let product_type_filter=document.querySelector('.select-box .select-control');
    let product_price_filter=document.querySelector('.price-select-box .select-control');
    //addProduct
    document.addEventListener('input',({target})=>{
        if(!target.classList.contains('qty__item'))   return;
        let reg=/[-]/g;
        target.value=target.value.replace(reg,'');
        if(target.value===''||target.value==0) target.value=1;
    })
   document.addEventListener('click',({target})=>{
        if(!target.classList.contains('product-box__btn'))   return;
        addProduct(target);
   })
    function addProduct(el){
        let parent=el.closest('.product-box__meta');
        let count=parent.querySelector('.qty__item').value;
        let price=parseInt(parent.childNodes[1].innerText)*count;
        let current_countBasket=count_basket.innerText==='XXX'?0:parseInt(count_basket.innerText);
        count_basket.innerText =current_countBasket+parseInt(count);
        let current_priceBasket=price_basket.innerText==='XXX'?0:parseInt(price_basket.innerText);
        price_basket.innerText =current_priceBasket+parseInt(price);
    }
    //filters
    product_type_filter.addEventListener('change',({target})=>{
        val_type_filter=target.value;
        filterProduct();
   })
    product_price_filter.addEventListener('change',({target})=>{
        val_price_filter=target.value;
        filterProduct();
   })
    function filterProduct(){
        let arr = new_productList.filter((item)=>{
            let price=parseInt(item.querySelector('.product-box__meta').querySelector('p').innerText)
            if(parseInt(val_type_filter)===0){
                if(val_price_filter>0) {
                    if (price <= parseInt(val_price_filter)) return item;
                }
                else return item;
            }
            if(parseInt(val_price_filter)===0){
              if( parseInt(item.getAttribute('data-filter'))===parseInt(val_type_filter)) return item;
            }

            if(parseInt(item.getAttribute('data-filter'))===parseInt(val_type_filter) && price<=parseInt(val_price_filter))
                return item;
        })
        wrapper.innerHTML='';
        arr.map((item)=>{
            wrapper.appendChild(item)
        })
    }
    //modal
    btn_showModal.addEventListener('click',({target})=>{
        modal.classList.add('show')
    })
    document.querySelector('.modal').addEventListener('click',(e)=>{
        e.isClickDropDown=true;
    })
    document.addEventListener('click',(e)=>{
        if(e.isClickDropDown||e.target.classList.contains('btn-check')) return ;
        modal.classList.remove('show')
    })

    //form
    document.addEventListener('click',(e)=>{
        let {target}=e;
        if(!target.classList.contains('btn-submit')) return ;
        e.preventDefault();
        checkFormValid(e);
    })
    function checkFormValid(e){
        let name_inp=document.getElementById('name_inp');
        let email_inp=document.getElementById('email_inp');
        let valid_name=validate(name_inp);
        let valid_email=validate(email_inp);
        valid_email&&valid_name? submitForm(e):alert('Поля заполнени не верно')
    }
    function submitForm(e){
       modal.classList.remove('show');
       alert('Спасибо за покупки');
        count_basket.innerText='XXX';
        price_basket.innerText='XXX'
    }

   function validate(el){
       let str=el.value;
       let reg=/\s+/g;
        str=str.replace(reg,'')
       if(str.length<=0) return false;
       return true;
   }
})

